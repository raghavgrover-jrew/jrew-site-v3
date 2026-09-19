import type { MetadataRoute } from "next";
import { SITE_URL, routes } from "@/lib/site";

const priority: Record<string, number> = { "/": 1, "/products": 0.9, "/products/attachments": 0.9, "/contact": 0.9, "/capabilities": 0.8, "/quality": 0.8, "/facilities": 0.8, "/about": 0.7, "/stakon": 0.7, "/careers": 0.5, "/privacy": 0.2 };

export default function sitemap(): MetadataRoute.Sitemap {
  // the date of the build that produced this sitemap (prerendered at build time)
  const lastModified = new Date();
  return routes.map((r) => ({ url: `${SITE_URL}${r === "/" ? "" : r}`, lastModified, changeFrequency: "monthly", priority: priority[r] ?? 0.5 }));
}
