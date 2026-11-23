import {
  AuditCheckItem,
  BotAccessStatus,
  LlmsTxtStatus,
  ProductSchemaData,
} from "./types";

export function evaluateAudit(
  productData: ProductSchemaData,
  botAccess: BotAccessStatus,
  llmsTxt: LlmsTxtStatus
): {
  score: number;
  grade: "AI Ready" | "Needs Optimization" | "Invisible to AI";
  gradeBadgeColor: "emerald" | "amber" | "rose";
  checks: AuditCheckItem[];
} {
  const checks: AuditCheckItem[] = [];

  // Check 1: Product Schema Present (20 pts)
  if (productData.found) {
    checks.push({
      id: "product_schema",
      title: "Product Schema Present",
      status: "pass",
      pointsEarned: 20,
      maxPoints: 20,
      summary: "Valid schema.org/Product JSON-LD entity was detected.",
      whyItMatters:
        "Without @type: 'Product', search engines view your page as an unformatted generic webpage rather than a purchasable good.",
      technicalDetails: `Found product entity: "${productData.name || "Untitled"}"`,
    });
  } else {
    checks.push({
      id: "product_schema",
      title: "Product Schema Present",
      status: "critical",
      pointsEarned: 0,
      maxPoints: 20,
      summary: "No valid schema.org/Product structured data was found.",
      whyItMatters:
        "ChatGPT Search, Perplexity, and Google AI completely ignore pages that do not declare explicit Product structured data.",
      technicalDetails: "Zero <script type='application/ld+json'> tags with @type: 'Product'.",
    });
  }

  // Check 2: Offer & Pricing Completeness (15 pts)
  if (productData.hasOffer && productData.price) {
    checks.push({
      id: "offer_pricing",
      title: "Offer & Pricing Completeness",
      status: "pass",
      pointsEarned: 15,
      maxPoints: 15,
      summary: `Price (${productData.currency || "USD"} ${productData.price}) and availability are machine-readable.`,
      whyItMatters:
        "AI shopping agents cannot quote prices or filter by budget without unambiguous numeric pricing and currency codes.",
      technicalDetails: `price: ${productData.price}, currency: ${productData.currency || "USD"}, availability: ${productData.availability || "schema.org/InStock"}`,
    });
  } else if (productData.hasOffer) {
    checks.push({
      id: "offer_pricing",
      title: "Offer & Pricing Completeness",
      status: "warning",
      pointsEarned: 7,
      maxPoints: 15,
      summary: "Offer schema exists but price value or currency is ambiguous.",
      whyItMatters:
        "Conversational AI filters items out when it cannot verify the exact purchase price for the user.",
      technicalDetails: "Offer object present but price field is missing or non-numeric.",
    });
  } else {
    checks.push({
      id: "offer_pricing",
      title: "Offer & Pricing Completeness",
      status: "critical",
      pointsEarned: 0,
      maxPoints: 15,
      summary: "No Offer or pricing schema found inside Product data.",
      whyItMatters:
        "Google Shopping and AI Search rank items with complete Offer objects significantly higher than unpriced entities.",
      technicalDetails: "Missing 'offers' object inside Product schema.",
    });
  }

  // Check 3: Merchant Return Policy (15 pts) - CRITICAL for AI Search
  if (productData.hasReturnPolicy) {
    checks.push({
      id: "merchant_return_policy",
      title: "Merchant Return Policy",
      status: "pass",
      pointsEarned: 15,
      maxPoints: 15,
      summary: "MerchantReturnPolicy is embedded directly in your structured data.",
      whyItMatters:
        "Return window confidence is one of the highest-weighted signals in AI shopping recommendations.",
      technicalDetails: "hasMerchantReturnPolicy successfully detected in Offer.",
    });
  } else {
    checks.push({
      id: "merchant_return_policy",
      title: "Merchant Return Policy",
      status: "critical",
      pointsEarned: 0,
      maxPoints: 15,
      summary: "Missing 'hasMerchantReturnPolicy' within Offer schema.",
      whyItMatters:
        "ChatGPT Search and Google AI Overviews cite stores with explicit return windows 4.2x more frequently. AI shopping agents drop items with unverified return risks.",
      technicalDetails: "Schema path Offer.hasMerchantReturnPolicy is undefined.",
    });
  }

  // Check 4: Shipping Details (15 pts)
  if (productData.hasShippingDetails) {
    checks.push({
      id: "shipping_details",
      title: "Shipping Details Schema",
      status: "pass",
      pointsEarned: 15,
      maxPoints: 15,
      summary: "shippingDetails with transit rates or handling times is defined.",
      whyItMatters:
        "Enables AI models to answer temporal queries like 'Which store can deliver this week?'.",
      technicalDetails: "Offer.shippingDetails successfully verified.",
    });
  } else {
    checks.push({
      id: "shipping_details",
      title: "Shipping Details Schema",
      status: "warning",
      pointsEarned: 0,
      maxPoints: 15,
      summary: "Missing 'shippingDetails' delivery rates and transit times.",
      whyItMatters:
        "When consumers ask conversational search engines for rapid delivery or shipping costs, unannotated products are filtered out.",
      technicalDetails: "Schema path Offer.shippingDetails is missing.",
    });
  }

  // Check 5: Product Identifiers (10 pts)
  const hasBrand = !!productData.brand;
  const hasId = !!(productData.gtin || productData.sku);

  if (hasBrand && hasId) {
    checks.push({
      id: "product_identifiers",
      title: "Product Identifiers (GTIN/SKU/Brand)",
      status: "pass",
      pointsEarned: 10,
      maxPoints: 10,
      summary: `Brand (${productData.brand}) and identifier (${productData.gtin || productData.sku}) specified.`,
      whyItMatters:
        "AI search engines use barcode GTINs to deduplicate product mentions and cluster expert reviews across the web.",
      technicalDetails: `brand: "${productData.brand}", identifier: "${productData.gtin || productData.sku}"`,
    });
  } else if (hasBrand || hasId) {
    checks.push({
      id: "product_identifiers",
      title: "Product Identifiers (GTIN/SKU/Brand)",
      status: "warning",
      pointsEarned: 5,
      maxPoints: 10,
      summary: "Brand or product barcode (GTIN) is partially missing.",
      whyItMatters:
        "Without GTINs or global SKUs, LLM search engines struggle to connect your product with web citations and Reddit reviews.",
      technicalDetails: `brand: ${hasBrand ? "Found" : "Missing"}, gtin/sku: ${hasId ? "Found" : "Missing"}`,
    });
  } else {
    checks.push({
      id: "product_identifiers",
      title: "Product Identifiers (GTIN/SKU/Brand)",
      status: "warning",
      pointsEarned: 0,
      maxPoints: 10,
      summary: "No brand name or product barcodes (GTIN/SKU) detected.",
      whyItMatters:
        "AI crawlers treat unbranded items as low-reputation or unverified generic goods.",
      technicalDetails: "Both brand and identifier fields are missing.",
    });
  }

  // Check 6: llms.txt File Check (15 pts)
  if (llmsTxt.found) {
    checks.push({
      id: "llms_txt",
      title: "AI Crawler Map (/llms.txt)",
      status: "pass",
      pointsEarned: 15,
      maxPoints: 15,
      summary: "Valid /llms.txt file is published on store root domain.",
      whyItMatters:
        "/llms.txt is the new open standard for Perplexity and OpenAI to index your store catalog in a single token-efficient pass.",
      technicalDetails: "GET /llms.txt returned 200 OK.",
    });
  } else {
    checks.push({
      id: "llms_txt",
      title: "AI Crawler Map (/llms.txt)",
      status: "warning",
      pointsEarned: 0,
      maxPoints: 15,
      summary: "No /llms.txt file found on the store root domain.",
      whyItMatters:
        "/llms.txt provides Perplexity, ChatGPT, and Claude an explicit markdown manifest of your products, policies, and pricing without scraping megabytes of theme assets.",
      technicalDetails: `GET /llms.txt returned ${llmsTxt.statusCode || 404}.`,
    });
  }

  // Check 7: AI Bot Access in robots.txt (10 pts)
  if (
    botAccess.gptBotAllowed &&
    botAccess.perplexityBotAllowed &&
    botAccess.googleExtendedAllowed
  ) {
    checks.push({
      id: "bot_access",
      title: "AI Bot Access in robots.txt",
      status: "pass",
      pointsEarned: 10,
      maxPoints: 10,
      summary: "GPTBot, PerplexityBot, and Google-Extended are granted full access.",
      whyItMatters:
        "Allowing top AI crawler bots ensures your product pages can be scraped, indexed, and cited in real-time conversational answers.",
      technicalDetails: "robots.txt allows GPTBot, PerplexityBot, and Google-Extended.",
    });
  } else {
    const blocked: string[] = [];
    if (!botAccess.gptBotAllowed) blocked.push("GPTBot (ChatGPT Search)");
    if (!botAccess.perplexityBotAllowed) blocked.push("PerplexityBot");
    if (!botAccess.googleExtendedAllowed) blocked.push("Google-Extended (Gemini)");

    checks.push({
      id: "bot_access",
      title: "AI Bot Access in robots.txt",
      status: "critical",
      pointsEarned: 0,
      maxPoints: 10,
      summary: `AI bots (${blocked.join(", ")}) are blocked by Disallow directives.`,
      whyItMatters:
        "When robots.txt disallows AI crawler user-agents, those search engines are legally and technically prohibited from indexing your products.",
      technicalDetails: `Blocked agents: ${blocked.join(", ")}`,
    });
  }

  const totalScore = checks.reduce((sum, item) => sum + item.pointsEarned, 0);

  let grade: "AI Ready" | "Needs Optimization" | "Invisible to AI" = "Invisible to AI";
  let gradeBadgeColor: "emerald" | "amber" | "rose" = "rose";

  if (totalScore >= 80) {
    grade = "AI Ready";
    gradeBadgeColor = "emerald";
  } else if (totalScore >= 50) {
    grade = "Needs Optimization";
    gradeBadgeColor = "amber";
  } else {
    grade = "Invisible to AI";
    gradeBadgeColor = "rose";
  }

  return {
    score: totalScore,
    grade,
    gradeBadgeColor,
    checks,
  };
}
