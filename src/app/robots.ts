import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Search and AI crawlers are allowed; only the form endpoints are excluded.
export default function robots(): MetadataRoute.Robots {
  const bots = ["OAI-SearchBot", "GPTBot", "Claude-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot", "meta-externalagent"];
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }, ...bots.map((b) => ({ userAgent: b, allow: "/" }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
