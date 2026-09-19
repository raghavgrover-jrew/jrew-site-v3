// Site-wide constants: routes, nav, contact. Content that belongs to the brochure lives in src/data.

// An explicit NEXT_PUBLIC_SITE_URL wins; that is how the real domain is named at build time.
// Otherwise a Vercel build canonicalises to its own host, so every preview is self-consistent and
// none of them claims to be jrew.co.in. A local build falls back to the real domain so the sitemap
// and JSON-LD read the way they will in production.
const vercelHost = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || vercelHost || "https://jrew.co.in").trim();
/** Absolute origin without a trailing slash; a bare host gets https. */
export const SITE_URL = (/^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`).replace(/\/+$/, "");

/** The only host that may be indexed. Anything else is a preview or a staging copy. */
export const CANONICAL_ORIGIN = "https://jrew.co.in";
export const isCanonicalHost = SITE_URL === CANONICAL_ORIGIN;

export const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Quality", href: "/quality" },
  { label: "Facilities", href: "/facilities" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * The home page's own title and description. They are the layout defaults too, so they live here
 * rather than inline in layout.tsx: a route that forgets its own metadata falls back to these, and
 * the metadata test asserts that none of them does.
 */
export const siteTitle = "JREW Engineering | Masts, axles, attachments and machined components for OEMs";
export const siteDescription =
  "Precision-machined components, sub-assemblies and attachments for construction, material handling, agriculture and rail OEMs. Four plants in India, exporting since 2010.";

export const rfqHref = "/contact#rfq";

/** Every indexable route, used by sitemap.ts and the verify harness. */
export const routes = [
  "/",
  "/products",
  "/products/attachments",
  "/stakon",
  "/capabilities",
  "/quality",
  "/facilities",
  "/about",
  "/contact",
  "/careers",
  "/privacy",
] as const;

export const contact = {
  email: "enquiry@jrew.co.in", // Spread 12-left
  careersEmail: "careers@jrew.co.in", // existing API default
  web: "jrew.co.in", // Spread 12-left
  /** Live-site value, not in the brochure. Confirm with Raghav before production. */
  phone: "+91 97 3334 3338",
  phoneHref: "tel:+919733343338",
  /** Live-site value, not in the brochure. Confirm with Raghav before production. */
  linkedin: "https://www.linkedin.com/company/jrew-engineering",
  /** Both prior repos link here. Confirm with Raghav before production. */
  stakonUrl: "https://stakon.in",
  /** From jrew-forge site.ts. Confirm with Raghav before production. */
  cin: "CIN U29219PB1994PLC039807",
  legalName: "JREW Engineering Limited",
};
