# Indexable — AI-Search (GEO) & JSON-LD Schema Auditor for Shopify

> **Indexable** is an open-source Generative Engine Optimization (GEO) platform and live auditing engine for Shopify e-commerce merchants. It diagnoses structured data gaps that cause Shopify stores to be omitted by ChatGPT Search, Perplexity AI, and Google AI Overviews.

---

## The Core Problem

When shoppers ask conversational AI engines like ChatGPT or Perplexity for product recommendations (*"Find me trail runners under $150 with free returns"*), AI models do not read raw marketing prose or blog posts. They parse structured Schema.org JSON-LD entities.

Standard Shopify themes frequently omit:
1. **Merchant Return Policy (`hasMerchantReturnPolicy`)**: Conversational models avoid recommending products with unknown return fees or undefined return windows.
2. **Shipping Details (`OfferShippingDetails`)**: AI assistants cannot answer "Can this arrive by Friday?" without structured transit rates and handling times.
3. **Product Barcodes (`gtin13`, `gtin`, `sku`, `brand`)**: Required to cross-reference product authenticity and web reviews.
4. **AI Crawler Map (`/llms.txt`)**: Without a lightweight markdown index, bot crawlers like `GPTBot` and `PerplexityBot` hit token budgets and time out scraping theme assets.

---

## Features

- **Real-Time Live Store Crawler**:
  - Automatically queries public `/products.json` catalog endpoints and parses internal product links.
  - Concurrently fetches HTML, `/robots.txt`, and `/llms.txt`.
  - Extracts and parses all `<script type="application/ld+json">` blocks.
- **Weighted AI-Search Readiness Score (0–100)**:
  - Product Schema Present (20 pts)
  - Offer & Pricing Completeness (15 pts)
  - Merchant Return Policy (15 pts)
  - Shipping Details (15 pts)
  - Product Identifiers (10 pts)
  - `/llms.txt` Standard (15 pts)
  - AI Bot Access in `robots.txt` (10 pts)
- **Auto-Generated Fix Generator**:
  - Dynamically synthesizes validated Schema.org `Product` JSON-LD with embedded return policies and shipping details.
  - Automatically generates an `/llms.txt` markdown index tailored to the merchant's catalog.
- **Robinhood-Style Milestone Early Access Waitlist**:
  - Tracks cohort capacity toward 1,000 verified Shopify merchants.
  - Dynamic progress tracker and viral referral queue position system.
- **Shopify OAuth Readiness**:
  - Secure OAuth initiation and callback endpoints with CSRF nonce verification and regex domain sanitization.
- **Hardened Security**:
  - Built-in SSRF protection blocking private subnets, loopbacks, and cloud metadata endpoints.
  - Memory-safe stream reader capping response size at 2MB.
  - Rate limiting per client IP.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom Dark Pista Crushed Velvet theme
- **Parsing**: Native `fetch` + `cheerio`
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v20/v22)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ParthSensei-tech/Indexable.git -b development
cd Indexable

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Security & Architectural Guarantees

- **SSRF Hardening**: Requests to `localhost`, `127.0.0.1`, `169.254.169.254`, `10.0.0.0/8`, `192.168.0.0/16`, and private TLDs are rejected before initiating network calls.
- **Zero Demo Accounts**: Every audit performs a genuine live network inspection of the merchant's public domain.
- **Concentric Radius Geometry**: Strict mathematical alignment ($\text{inner\_radius} = \text{outer\_radius} - \text{padding}$) across all UI components.

---

## License

MIT License. Designed and engineered for the modern e-commerce AI search era.
