import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "Google-Extended",
          "ClaudeBot",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://indexable.dev/sitemap.xml",
  };
}
