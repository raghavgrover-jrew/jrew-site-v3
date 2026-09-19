import type { MetadataRoute } from "next";
import { SITE_URL, isCanonicalHost } from "@/lib/site";

// On jrew.co.in search and AI crawlers are welcome and only the form endpoints are excluded.
// Anywhere else this is a preview of unapproved copy, so nothing is offered for crawling: the
// claims register is unsigned and the privacy notice is still a draft for legal review.
export default function robots(): MetadataRoute.Robots {
  if (!isCanonicalHost) return { rules: [{ userAgent: "*", disallow: "/" }] };

  const bots = ["OAI-SearchBot", "GPTBot", "Claude-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot", "meta-externalagent"];
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }, ...bots.map((b) => ({ userAgent: b, allow: "/" }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
