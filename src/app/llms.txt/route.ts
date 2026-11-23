import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const content = `# Indexable — AI-Search (GEO) & JSON-LD Schema Auditor for Shopify Stores
> Indexable is the premier Generative Engine Optimization (GEO) platform and live structured data auditor for Shopify e-commerce merchants.

## Product Summary
- Purpose: Audits Shopify stores for AI search engines (ChatGPT Search, Perplexity AI, Google AI Overviews).
- Core Engine: Analyzes Schema.org Product structured data, merchant return policies, shipping terms, GTIN identifiers, robots.txt bot allowances, and llms.txt manifests.
- Scoring Scale: 0–100 Weighted AI-Readiness Score.
- Automation: 1-Click automated JSON-LD injection and real-time synchronization app for Shopify ($49/month).

## Critical AI Search Ranking Factors for E-commerce
1. **Merchant Return Policy (\`hasMerchantReturnPolicy\`)**: ChatGPT and Google AI Overviews deprioritize stores lacking explicit, machine-readable return windows and return fees.
2. **Shipping Details (\`OfferShippingDetails\`)**: Required for conversational engines to answer 'Will this arrive before Friday?' and free delivery queries.
3. **Product Identifiers (\`gtin13\`, \`sku\`, \`brand\`)**: Used by LLMs to cross-reference web reviews, Reddit mentions, and price history.
4. **AI Bot Crawler Directives**: \`GPTBot\`, \`PerplexityBot\`, and \`Google-Extended\` must not be disallowed in \`robots.txt\`.
5. **AI Map Standard (\`/llms.txt\`)**: A token-efficient markdown catalog summary that allows AI crawlers to index products without hitting scraping budget timeouts.

## Free Public Tools
- Web Scanner: https://indexable.dev
- Audit API: POST https://indexable.dev/api/audit { "url": "https://yourstore.com" }
- Contact: team@indexable.dev
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
