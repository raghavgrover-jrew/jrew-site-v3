import type { NextConfig } from "next";

// Security and caching headers (Codex audit P0-6). The CSP is deliberately nonce-free so every route
// stays statically prerendered: Next.js and the inline JSON-LD need 'unsafe-inline' for scripts, and
// next/font plus Tailwind need it for styles. Everything else is locked to this origin; no remote
// scripts, frames, objects or connections are permitted. HSTS carries no `preload` until the whole
// jrew.co.in zone is confirmed HTTPS-only (see BUILD-REPORT, Needs approval).
// React's development build uses eval() to rebuild call stacks for the error overlay. Without this
// the overlay reports a CSP violation on every page in `next dev`. The production header is unchanged.
const devEval = process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devEval}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// Public assets are not content-hashed, so they get a day of caching with a week of stale-while-revalidate
// rather than `immutable`; Next.js already serves /_next/static with immutable one-year caching.
const assetCache = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
      ...["images", "logos", "lineart", "associations", "brand"].map((dir) => ({ source: `/${dir}/:path*`, headers: assetCache })),
    ];
  },
};

export default nextConfig;
