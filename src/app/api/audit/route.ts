import { NextRequest, NextResponse } from "next/server";
import {
  discoverProductUrl,
  extractSchemaFromHtml,
  fetchWithTimeout,
  normalizeUrl,
  parseRobotsTxt,
} from "@/lib/crawler";
import { evaluateAudit } from "@/lib/auditor";
import { generateAutoFixes } from "@/lib/fix-generator";
import { AuditResult } from "@/lib/types";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Simple in-memory rate limiting to prevent backend abuse
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + 60000 }); // 1 min window
    return false;
  }
  if (record.count >= 20) {
    return true; // max 20 audits per minute per IP
  }
  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous-client";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many audit requests. Please wait a minute before scanning again." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const rawUrl = body?.url;

    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json(
        { error: "Please enter a valid Shopify store or product URL." },
        { status: 400 }
      );
    }

    const { normalizedUrl, storeOrigin, domain, isProductUrl, isValid } = normalizeUrl(rawUrl);

    if (!isValid || !domain) {
      return NextResponse.json(
        { error: "Invalid or restricted URL. Please enter a public Shopify store domain (e.g. storename.com or store.myshopify.com)." },
        { status: 400 }
      );
    }

    // Determine target product URL
    let targetProductUrl = normalizedUrl;
    let discoverySource: AuditResult["discoverySource"] = isProductUrl ? "direct" : "internal_link";
    let sampleProductMeta: any = undefined;

    if (!isProductUrl) {
      const discovery = await discoverProductUrl(storeOrigin);
      if (discovery.productUrl && discovery.source !== "none") {
        targetProductUrl = discovery.productUrl;
        discoverySource = discovery.source;
        sampleProductMeta = discovery.sampleProductMeta;
      } else {
        // Fall back to homepage
        targetProductUrl = storeOrigin;
        discoverySource = "internal_link";
      }
    }

    // Concurrently fetch:
    // 1. Target page HTML
    // 2. /robots.txt
    // 3. /llms.txt
    const [pageRes, robotsRes, llmsRes] = await Promise.all([
      fetchWithTimeout(targetProductUrl, 8000),
      fetchWithTimeout(`${storeOrigin}/robots.txt`, 5000),
      fetchWithTimeout(`${storeOrigin}/llms.txt`, 5000),
    ]);

    // Check reachability
    if (!pageRes.ok && pageRes.status === 0 && !robotsRes.ok) {
      return NextResponse.json(
        { error: `Could not reach ${domain}. Please verify the domain is online and publicly accessible.` },
        { status: 404 }
      );
    }

    // Parse robots.txt
    const botAccess = parseRobotsTxt(robotsRes.text || "");

    // Check llms.txt
    const llmsTxt = {
      found: llmsRes.ok && (llmsRes.text || "").trim().length > 20,
      statusCode: llmsRes.status || 404,
      contentPreview: llmsRes.ok ? llmsRes.text.slice(0, 300) : undefined,
    };

    // Parse product schema
    let { productData } = extractSchemaFromHtml(pageRes.text || "");

    // If schema wasn't fully formed but we found product metadata from /products.json, enrich it
    if (sampleProductMeta && (!productData.name || !productData.price)) {
      productData = {
        ...productData,
        found: true,
        name: productData.name || sampleProductMeta.title,
        brand: productData.brand || sampleProductMeta.vendor,
        sku: productData.sku || sampleProductMeta.variants?.[0]?.sku,
        price: productData.price || sampleProductMeta.variants?.[0]?.price,
        hasOffer: true,
        currency: productData.currency || "USD",
      };
    }

    // Evaluate score & checks
    const evaluation = evaluateAudit(productData, botAccess, llmsTxt);

    // Generate tailored 1-click fixes
    const generatedFix = generateAutoFixes(productData, domain, targetProductUrl);

    const auditResponse: AuditResult = {
      storeUrl: storeOrigin,
      targetUrl: targetProductUrl,
      domain,
      productTitle: productData.name || `${domain} Product`,
      score: evaluation.score,
      grade: evaluation.grade,
      gradeBadgeColor: evaluation.gradeBadgeColor,
      checks: evaluation.checks,
      productData,
      botAccess,
      llmsTxt,
      generatedFix,
      scannedAt: new Date().toISOString(),
      discoverySource,
    };

    return NextResponse.json(auditResponse);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Unable to complete store audit. Please check that the URL is public and accessible.",
      },
      { status: 500 }
    );
  }
}
