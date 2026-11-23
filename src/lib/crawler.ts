import * as cheerio from "cheerio";
import { BotAccessStatus, LlmsTxtStatus, ProductSchemaData } from "./types";

const CRAWLER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 (compatible; IndexableBot/2.4; +https://indexable.dev)";

// Security: Disallow private IP addresses and loopbacks to prevent SSRF
const BLOCKED_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^0\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./, // Cloud metadata endpoint (AWS / GCP / Azure)
  /^\[?::1\]?$/,
  /^\[?fc00:/i,
  /^\[?fe80:/i,
  /\.local$/i,
  /\.internal$/i,
  /\.lan$/i,
];

export function isSafePublicUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
    const hostname = parsed.hostname.toLowerCase();
    for (const pattern of BLOCKED_HOST_PATTERNS) {
      if (pattern.test(hostname)) {
        return false;
      }
    }
    // Must contain a dot in the domain (e.g. brand.com)
    if (!hostname.includes(".")) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function normalizeUrl(input: string): {
  normalizedUrl: string;
  storeOrigin: string;
  domain: string;
  isProductUrl: boolean;
  isValid: boolean;
} {
  // Sanitize input: strip control characters, limit length
  let sanitized = input.trim().replace(/[\x00-\x1F\x7F]/g, "");
  if (sanitized.length > 500) {
    return {
      normalizedUrl: "",
      storeOrigin: "",
      domain: "",
      isProductUrl: false,
      isValid: false,
    };
  }

  if (!sanitized.startsWith("http://") && !sanitized.startsWith("https://")) {
    sanitized = `https://${sanitized}`;
  }

  try {
    const parsed = new URL(sanitized);
    if (!isSafePublicUrl(parsed.toString())) {
      return {
        normalizedUrl: "",
        storeOrigin: "",
        domain: "",
        isProductUrl: false,
        isValid: false,
      };
    }

    const domain = parsed.hostname.toLowerCase().replace(/^www\./, "");
    const storeOrigin = `${parsed.protocol}//${parsed.host}`;
    const isProductUrl = parsed.pathname.includes("/products/");

    return {
      normalizedUrl: parsed.toString(),
      storeOrigin,
      domain,
      isProductUrl,
      isValid: true,
    };
  } catch {
    return {
      normalizedUrl: "",
      storeOrigin: "",
      domain: "",
      isProductUrl: false,
      isValid: false,
    };
  }
}

export async function fetchWithTimeout(
  url: string,
  timeoutMs: number = 6000
): Promise<{ ok: boolean; status: number; text: string }> {
  if (!isSafePublicUrl(url)) {
    return { ok: false, status: 400, text: "" };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": CRAWLER_USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,*/*;q=0.7",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // Security: protect against memory exhaustion attacks by capping read size (2MB max)
    const reader = res.body?.getReader();
    if (!reader) {
      const text = await res.text();
      return { ok: res.ok, status: res.status, text: text.slice(0, 2000000) };
    }

    const chunks: Uint8Array[] = [];
    let receivedBytes = 0;
    const maxBytes = 2 * 1024 * 1024; // 2 MB cap

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        receivedBytes += value.length;
        if (receivedBytes > maxBytes) {
          reader.cancel();
          break;
        }
        chunks.push(value);
      }
    }

    const totalBuffer = new Uint8Array(receivedBytes);
    let offset = 0;
    for (const chunk of chunks) {
      totalBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    const text = new TextDecoder("utf-8").decode(totalBuffer);
    return { ok: res.ok, status: res.status, text };
  } catch {
    clearTimeout(timeoutId);
    return { ok: false, status: 0, text: "" };
  }
}

export async function discoverProductUrl(
  storeOrigin: string
): Promise<{ productUrl?: string; source: "products_json" | "internal_link" | "none"; sampleProductMeta?: any }> {
  // Strategy 1: Check standard Shopify /products.json
  try {
    const jsonRes = await fetchWithTimeout(`${storeOrigin}/products.json?limit=2`, 5000);
    if (jsonRes.ok && jsonRes.text) {
      const data = JSON.parse(jsonRes.text);
      if (data && Array.isArray(data.products) && data.products.length > 0) {
        const product = data.products[0];
        if (product && product.handle) {
          return {
            productUrl: `${storeOrigin}/products/${encodeURIComponent(product.handle)}`,
            source: "products_json",
            sampleProductMeta: product,
          };
        }
      }
    }
  } catch {
    // Proceed to Strategy 2
  }

  // Strategy 2: Fetch homepage and extract links to /products/
  try {
    const homeRes = await fetchWithTimeout(storeOrigin, 5000);
    if (homeRes.ok && homeRes.text) {
      const $ = cheerio.load(homeRes.text);
      let foundHref: string | undefined;

      $('a[href*="/products/"]').each((_, elem) => {
        if (!foundHref) {
          const href = $(elem).attr("href");
          if (href && !href.includes("/collections/") && !href.startsWith("javascript:")) {
            foundHref = href.startsWith("http")
              ? href
              : `${storeOrigin}${href.startsWith("/") ? "" : "/"}${href}`;
          }
        }
      });

      if (foundHref && isSafePublicUrl(foundHref)) {
        return {
          productUrl: foundHref,
          source: "internal_link",
        };
      }
    }
  } catch {
    // Ignore
  }

  return { source: "none" };
}

export function parseRobotsTxt(robotsTxtContent: string): BotAccessStatus {
  if (!robotsTxtContent || robotsTxtContent.trim().length === 0) {
    return {
      gptBotAllowed: true,
      perplexityBotAllowed: true,
      googleExtendedAllowed: true,
      claudeBotAllowed: true,
      robotsTxtFound: false,
    };
  }

  const lines = robotsTxtContent.split("\n").map((l) => l.trim().toLowerCase());
  let currentAgents: string[] = [];
  const disallows: Record<string, string[]> = {};

  for (const line of lines) {
    if (line.startsWith("#") || !line) continue;

    if (line.startsWith("user-agent:")) {
      const agent = line.replace("user-agent:", "").trim();
      currentAgents.push(agent);
    } else if (line.startsWith("disallow:")) {
      const path = line.replace("disallow:", "").trim();
      for (const agent of currentAgents) {
        if (!disallows[agent]) disallows[agent] = [];
        disallows[agent].push(path);
      }
    } else {
      currentAgents = [];
    }
  }

  const isBlocked = (agentName: string) => {
    const paths = disallows[agentName.toLowerCase()] || [];
    const wildcardPaths = disallows["*"] || [];
    return paths.includes("/") || (wildcardPaths.includes("/") && paths.length === 0);
  };

  return {
    gptBotAllowed: !isBlocked("gptbot"),
    perplexityBotAllowed: !isBlocked("perplexitybot"),
    googleExtendedAllowed: !isBlocked("google-extended"),
    claudeBotAllowed: !isBlocked("claudebot"),
    robotsTxtFound: true,
    rawRobotsTxt: robotsTxtContent.slice(0, 500),
  };
}

export function extractSchemaFromHtml(html: string): {
  productData: ProductSchemaData;
  allSchemas: any[];
} {
  const $ = cheerio.load(html);
  const allSchemas: any[] = [];
  let productSchema: any = null;

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const content = $(el).html();
      if (!content) return;
      const parsed = JSON.parse(content.trim());

      const explore = (item: any) => {
        if (!item || typeof item !== "object") return;
        if (Array.isArray(item)) {
          item.forEach(explore);
          return;
        }
        allSchemas.push(item);

        const type = item["@type"];
        const isProduct =
          type === "Product" ||
          (Array.isArray(type) && type.includes("Product")) ||
          (typeof type === "string" && type.toLowerCase().includes("product"));

        if (isProduct && !productSchema) {
          productSchema = item;
        }

        if (item["@graph"] && Array.isArray(item["@graph"])) {
          explore(item["@graph"]);
        }
      };

      explore(parsed);
    } catch {
      // Ignore unparseable blocks
    }
  });

  if (!productSchema) {
    const ogTitle = $('meta[property="og:title"]').attr("content") || $("title").text();
    const ogPrice = $('meta[property="product:price:amount"]').attr("content");
    const ogCurrency = $('meta[property="product:price:currency"]').attr("content");

    return {
      productData: {
        found: false,
        name: ogTitle ? ogTitle.trim().slice(0, 150) : undefined,
        hasOffer: !!ogPrice,
        price: ogPrice || undefined,
        currency: ogCurrency || "USD",
        hasReturnPolicy: false,
        hasShippingDetails: false,
      },
      allSchemas,
    };
  }

  const name = productSchema.name ? String(productSchema.name).trim().slice(0, 150) : $("title").text().trim().slice(0, 150);
  const description = productSchema.description ? String(productSchema.description).slice(0, 300) : undefined;
  const brand =
    typeof productSchema.brand === "string"
      ? productSchema.brand.slice(0, 80)
      : productSchema.brand?.name ? String(productSchema.brand.name).slice(0, 80) : undefined;
  const sku = productSchema.sku ? String(productSchema.sku).slice(0, 50) : undefined;
  const gtin =
    productSchema.gtin ||
    productSchema.gtin13 ||
    productSchema.gtin14 ||
    productSchema.gtin8 ||
    productSchema.mpn ||
    undefined;

  let rawOffers = productSchema.offers;
  let offer = Array.isArray(rawOffers) ? rawOffers[0] : rawOffers;
  const hasOffer = !!offer && typeof offer === "object";

  const price = offer?.price;
  const currency = offer?.priceCurrency || "USD";
  const availability = offer?.availability;

  const hasReturnPolicy =
    Boolean(offer?.hasMerchantReturnPolicy) ||
    Boolean(productSchema?.hasMerchantReturnPolicy);

  const hasShippingDetails =
    Boolean(offer?.shippingDetails) ||
    Boolean(productSchema?.shippingDetails);

  return {
    productData: {
      found: true,
      name,
      description,
      brand,
      sku,
      gtin: gtin ? String(gtin).slice(0, 50) : undefined,
      hasOffer,
      price,
      currency,
      availability,
      hasReturnPolicy,
      returnPolicyDetails: hasReturnPolicy ? JSON.stringify(offer?.hasMerchantReturnPolicy || productSchema?.hasMerchantReturnPolicy).slice(0, 500) : undefined,
      hasShippingDetails,
      shippingDetails: hasShippingDetails ? JSON.stringify(offer?.shippingDetails || productSchema?.shippingDetails).slice(0, 500) : undefined,
      rawJsonLd: productSchema,
    },
    allSchemas,
  };
}
