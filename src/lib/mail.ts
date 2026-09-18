// Server-only helpers shared by the two API routes: SMTP transport, the production policy
// for a missing SMTP configuration, and a small per-IP rate limit.
import nodemailer from "nodemailer";

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/** Production is the Vercel production environment only; previews and local keep the console fallback. */
export function isProduction(): boolean {
  return process.env.VERCEL_ENV === "production";
}

export function transport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_PORT === "465",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

// ── Rate limit: fixed window per client IP, in-memory (adequate per serverless instance) ────────
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const buckets = new Map<string, { count: number; reset: number }>();

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : request.headers.get("x-real-ip") || "unknown").trim();
}

/** True when this request should be refused with 429. */
export function rateLimited(key: string, now = Date.now()): boolean {
  const b = buckets.get(key);
  if (!b || b.reset <= now) {
    buckets.set(key, { count: 1, reset: now + WINDOW_MS });
    if (buckets.size > 5000) for (const [k, v] of buckets) if (v.reset <= now) buckets.delete(k);
    return false;
  }
  b.count += 1;
  return b.count > MAX_PER_WINDOW;
}

/** Test hook. */
export function resetRateLimit() {
  buckets.clear();
}
