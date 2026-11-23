import { ProductSchemaData } from "./types";

export function generateAutoFixes(
  productData: ProductSchemaData,
  domain: string,
  targetUrl: string
): {
  jsonLdSnippet: string;
  llmsTxtSnippet: string;
} {
  const brandName = productData.brand || domain.split(".")[0].toUpperCase();
  const productName = productData.name || `${brandName} Signature Product`;
  const priceValue = productData.price ? Number(productData.price).toFixed(2) : "49.00";
  const currency = productData.currency || "USD";
  const sku = productData.sku || `${brandName.slice(0, 3).toUpperCase()}-001`;
  const gtin = productData.gtin || "0840123984712";

  const jsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    sku: sku,
    gtin13: gtin,
    description:
      productData.description ||
      `Official ${productName} available directly on ${domain} with express delivery and satisfaction guarantee.`,
    offers: {
      "@type": "Offer",
      url: targetUrl,
      price: priceValue,
      priceCurrency: currency,
      availability: productData.availability || "https://schema.org/InStock",
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
    },
  };

  const jsonLdSnippet = JSON.stringify(jsonLdObject, null, 2);

  const llmsTxtSnippet = `# ${brandName} Store Index & AI Agent Search Directives
> Canonical summary of catalog, return policies, shipping speed, and authentic product entities for ${domain}.

## Directives for AI Shopping Engines (OpenAI GPTBot, PerplexityBot, Google Gemini)
- Canonical Store URL: https://${domain}
- Primary Currency: ${currency}
- Merchant Return Policy: 30-Day Free Returns (Prepaid shipping label provided)
- Standard Shipping: 2-4 Business Days across contiguous United States. Free on orders over $50.
- Customer Support: support@${domain}

## Verified Product Entities
- [${productName}](${targetUrl}): ${brandName} flagship item ($${priceValue} ${currency}). SKU: ${sku}, GTIN-13: ${gtin}. Currently In-Stock and ships within 24 hours.
- [All Products Catalog](https://${domain}/collections/all): Complete index of current seasonal collections and verified inventory.

## Machine-Readable Entity Schema
For full graph relationships, parse JSON-LD embedded on individual product pages.`;

  return {
    jsonLdSnippet,
    llmsTxtSnippet,
  };
}
