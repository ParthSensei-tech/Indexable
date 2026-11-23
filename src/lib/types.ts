export type CheckSeverity = "critical" | "warning" | "pass";

export interface AuditCheckItem {
  id: string;
  title: string;
  status: CheckSeverity;
  pointsEarned: number;
  maxPoints: number;
  summary: string;
  whyItMatters: string;
  technicalDetails?: string;
}

export interface ProductSchemaData {
  found: boolean;
  name?: string;
  description?: string;
  brand?: string;
  sku?: string;
  gtin?: string;
  hasOffer: boolean;
  price?: number | string;
  currency?: string;
  availability?: string;
  hasReturnPolicy: boolean;
  returnPolicyDetails?: string;
  hasShippingDetails: boolean;
  shippingDetails?: string;
  rawJsonLd?: any;
}

export interface BotAccessStatus {
  gptBotAllowed: boolean;
  perplexityBotAllowed: boolean;
  googleExtendedAllowed: boolean;
  claudeBotAllowed: boolean;
  robotsTxtFound: boolean;
  rawRobotsTxt?: string;
}

export interface LlmsTxtStatus {
  found: boolean;
  statusCode: number;
  contentPreview?: string;
}

export interface AuditResult {
  storeUrl: string;
  targetUrl: string;
  domain: string;
  productTitle?: string;
  productImage?: string;
  score: number;
  grade: "AI Ready" | "Needs Optimization" | "Invisible to AI";
  gradeBadgeColor: "emerald" | "amber" | "rose";
  checks: AuditCheckItem[];
  productData: ProductSchemaData;
  botAccess: BotAccessStatus;
  llmsTxt: LlmsTxtStatus;
  generatedFix: {
    jsonLdSnippet: string;
    llmsTxtSnippet: string;
  };
  scannedAt: string;
  discoverySource: "direct" | "products_json" | "internal_link" | "sample_cache";
}

export interface AuditRequest {
  url: string;
}
