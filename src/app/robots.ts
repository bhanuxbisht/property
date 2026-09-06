import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "Anthropic-ai",
          "Bytespider",
          "CCBot",
          "Amazonbot",
          "cohere-ai",
          "Meta-ExternalAgent",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/admin", "/api/admin/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
