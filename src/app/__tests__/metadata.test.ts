// Every route's own metadata, checked as data rather than by eye. A search result and a social
// card are the first thing a sourcing engineer sees, so a route that silently falls back to the
// layout defaults, repeats another page's title, or overruns the snippet is a regression.
//
// The home page is deliberately absent: it has no metadata export because the layout defaults
// (siteTitle / siteDescription) are its own. Every other route must override them.
import { describe, expect, it, vi } from "vitest";
import type { Metadata } from "next";
import { routes, siteDescription, siteTitle } from "@/lib/site";

// static specifiers: a template literal would leave the page modules unresolvable at build time
const MODULES = {
  "/products": () => import("../products/page"),
  "/products/attachments": () => import("../products/attachments/page"),
  "/stakon": () => import("../stakon/page"),
  "/capabilities": () => import("../capabilities/page"),
  "/quality": () => import("../quality/page"),
  "/facilities": () => import("../facilities/page"),
  "/about": () => import("../about/page"),
  "/contact": () => import("../contact/page"),
  "/careers": () => import("../careers/page"),
  "/privacy": () => import("../privacy/page"),
};

const loaded = await Promise.all(
  Object.entries(MODULES).map(async ([path, load]) => {
    const m = (await load()) as { metadata?: Metadata };
    return { path, meta: m.metadata };
  }),
);

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const block = (v: unknown) => (v ?? undefined) as { url?: string; card?: string; title?: string; description?: string } | undefined;

describe("route metadata", () => {
  it("covers every indexable route except the home page", () => {
    expect(Object.keys(MODULES).sort()).toEqual(routes.filter((r) => r !== "/").slice().sort());
  });

  it.each(loaded)("$path declares its own title and description", ({ path, meta }) => {
    expect(meta, `${path} exports no metadata`).toBeDefined();
    const title = str(meta!.title);
    const description = str(meta!.description);
    expect(title.length, `${path} title`).toBeGreaterThan(2);
    expect(title, `${path} repeats the site-wide title`).not.toBe(siteTitle);
    expect(description.length, `${path} description`).toBeGreaterThan(40);
    // a snippet past roughly 160 characters gets truncated in the result
    expect(description.length, `${path} description is ${description.length} chars`).toBeLessThanOrEqual(160);
    expect(description, `${path} repeats the site-wide description`).not.toBe(siteDescription);
  });

  it("gives every route a distinct title and description", () => {
    const titles = loaded.map((r) => str(r.meta?.title).toLowerCase());
    const descriptions = loaded.map((r) => str(r.meta?.description).toLowerCase());
    expect(new Set(titles).size, `duplicate titles: ${titles.join(" | ")}`).toBe(titles.length);
    expect(new Set(descriptions).size, "two routes share a description").toBe(descriptions.length);
  });

  it.each(loaded)("$path is self-canonical", ({ path, meta }) => {
    expect(meta!.alternates?.canonical, `${path} canonical`).toBe(path);
  });

  it.each(loaded)("$path carries a social card that matches the page", ({ path, meta }) => {
    const og = block(meta!.openGraph);
    const tw = block(meta!.twitter);
    expect(og, `${path} has no openGraph block`).toBeDefined();
    expect(og!.url, `${path} openGraph url`).toBe(path);
    expect(tw?.card, `${path} twitter card type`).toBe("summary_large_image");
    // the card repeats the page's own description, never the site-wide one
    expect(str(og!.description)).toBe(str(meta!.description));
    expect(str(tw!.description)).toBe(str(meta!.description));
    expect(str(og!.title)).toContain(str(meta!.title));
  });
});

// The canonical host is the only one that may be indexed. Everywhere else this is a preview of
// copy nobody has signed off: the claims register is unsigned and the privacy notice is a draft.
describe("indexing posture", () => {
  it("names one canonical origin and derives the flag from it", async () => {
    const { CANONICAL_ORIGIN, SITE_URL, isCanonicalHost } = await import("@/lib/site");
    expect(CANONICAL_ORIGIN).toBe("https://jrew.co.in");
    expect(isCanonicalHost).toBe(SITE_URL === CANONICAL_ORIGIN);
  });

  it("offers nothing to crawlers when the site is not on that origin", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://jrew-site-v3.vercel.app");
    const robots = (await import("../robots")).default;
    const rules = robots().rules;
    expect(Array.isArray(rules) ? rules : [rules]).toEqual([{ userAgent: "*", disallow: "/" }]);
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("allows crawling on the canonical origin", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://jrew.co.in");
    const robots = (await import("../robots")).default;
    const r = robots();
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    expect(rules[0]).toMatchObject({ userAgent: "*", allow: "/" });
    expect(r.sitemap).toBe("https://jrew.co.in/sitemap.xml");
    vi.unstubAllEnvs();
    vi.resetModules();
  });
});
