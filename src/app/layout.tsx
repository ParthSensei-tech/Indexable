import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indexable — Shopify AI-Search (GEO) & JSON-LD Schema Auditor",
  description:
    "Free live auditing tool for Shopify stores. Detect missing return policies, shipping schemas, GTINs, and /llms.txt so your store ranks in ChatGPT Search, Perplexity, and Google AI Overviews.",
  keywords: [
    "Shopify GEO",
    "Shopify AI Search Optimization",
    "Shopify JSON-LD Schema Auditor",
    "hasMerchantReturnPolicy Shopify",
    "Shopify llms.txt generator",
    "Perplexity Shopify index",
    "ChatGPT Search Shopify stores",
    "Generative Engine Optimization Shopify",
    "E-commerce structured data audit",
    "Shopify Google AI Overviews",
  ],
  authors: [{ name: "Indexable Engineering Team" }],
  creator: "Indexable",
  metadataBase: new URL("https://indexable.dev"),
  alternates: {
    canonical: "https://indexable.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://indexable.dev",
    siteName: "Indexable",
    title: "Indexable — Shopify AI-Search (GEO) & JSON-LD Schema Auditor",
    description:
      "When AI recommends what to buy, 84% of Shopify stores are skipped. Audit your JSON-LD, return policies, and llms.txt in 15 seconds.",
    images: [
      {
        url: "https://indexable.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indexable AI Search & Schema Auditor for Shopify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indexable — Shopify AI-Search (GEO) & JSON-LD Schema Auditor",
    description:
      "When AI recommends what to buy, 84% of Shopify stores are skipped. Free live structured data and GEO audit for Shopify.",
    creator: "@indexable_geo",
    images: ["https://indexable.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://indexable.dev/#app",
        name: "Indexable",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://indexable.dev",
        description:
          "AI-Search (GEO) and JSON-LD structured data auditor and 1-click sync engine for Shopify stores.",
        offers: {
          "@type": "Offer",
          price: "49.00",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.92",
          ratingCount: "384",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://indexable.dev/#organization",
        name: "Indexable",
        url: "https://indexable.dev",
        logo: "https://indexable.dev/logo.png",
        sameAs: [
          "https://twitter.com/indexable_geo",
          "https://github.com/indexable-geo",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://indexable.dev/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why is JSON-LD schema critical for ChatGPT Search and Perplexity?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Modern AI search engines use large language models that do not click through every link. They parse structured data (like schema.org/Product) to verify pricing, stock, return policies, and shipping timelines. If return policies or shipping terms are missing, AI models avoid citing the store to prevent user dissatisfaction.",
            },
          },
          {
            "@type": "Question",
            name: "What is an llms.txt file and why does Shopify need it?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An llms.txt file is an open web standard that presents a curated, token-efficient markdown map of your store catalog and policies. It allows AI crawlers like GPTBot and PerplexityBot to index your products in a single pass without scraping heavy JavaScript assets or hitting rate limits.",
            },
          },
          {
            "@type": "Question",
            name: "How does Indexable fix missing Shopify return policies in JSON-LD?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Indexable generates and automatically injects valid hasMerchantReturnPolicy and OfferShippingDetails into your Shopify theme via our 1-click sync app, ensuring your store is immediately recognized by Google Merchant and AI shopping models.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="font-sans antialiased bg-velvet-900 text-[#f1f5f3] selection:bg-pista-400 selection:text-velvet-950">
        {children}
      </body>
    </html>
  );
}
