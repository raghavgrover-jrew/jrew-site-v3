// Server-only helpers shared by the two API routes: SMTP transport with timeouts and one retry,
// the delivery policy (SMTP, or an explicit console mode for local development only), request
// guards (trusted client IP, origin, content type, size), a per-IP rate limit, idempotent
// submission references, and PII-safe logging. Codex audit P0-3.
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

// ── Delivery policy ────────────────────────────────────────────────────────────
export function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Console delivery (log the submission, report success) is a local-development convenience only.
 * It must be switched on explicitly; a deployed environment without SMTP fails visibly instead.
 */
export function consoleDeliveryAllowed(): boolean {
  return process.env.ALLOW_CONSOLE_DELIVERY === "1" && !process.env.VERCEL;
}

export function transport() {
  const opts: SMTPTransport.Options = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_PORT === "465",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  };
  return nodemailer.createTransport(opts);
}

/** One retry after a short pause; the caller's idempotency key keeps a retry from duplicating a lead. */
export async function sendWithRetry(fn: () => Promise<unknown>, attempts = 2): Promise<void> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      await fn();
      return;
    } catch (e) {
      last = e;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 600));
    }
  }
  throw last;
}

// ── Request guards ─────────────────────────────────────────────────────────────
/** Client IP from headers the hosting proxy controls. On Vercel `x-real-ip` is set by the edge; elsewhere fall back to x-forwarded-for's first hop. */
export function clientIp(request: Request): string {
  const h = request.headers;
  const fwd = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const real = h.get("x-real-ip")?.trim();
  return (process.env.VERCEL ? real || fwd : fwd || real) || "unknown";
}

/** A browser-originated POST must come from this site. Requests without an Origin header (server to server, tests) pass. */
export function originProblem(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return "Bad origin.";
  }
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  return originHost === host ? null : "Cross-site submissions are not accepted.";
}

export function contentTypeProblem(request: Request, expected: "json" | "multipart"): string | null {
  const ct = (request.headers.get("content-type") || "").toLowerCase();
  if (expected === "json" && !ct.startsWith("application/json")) return "Send JSON.";
  if (expected === "multipart" && !ct.startsWith("multipart/form-data")) return "Send multipart form data.";
  return null;
}

export function sizeProblem(request: Request, maxBytes: number): string | null {
  const len = parseInt(request.headers.get("content-length") || "0", 10);
  return len > maxBytes ? "Request is too large." : null;
}

/** JSON reply that is never cached by a browser or CDN. */
export function reply(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}

// ── Rate limit: fixed window per client IP, in-memory ──────────────────────────
// Per serverless instance only. The hard limit belongs at the edge (Vercel WAF rate-limit rule
// on /api/*), documented in BUILD-REPORT.md deploy checklist; this is the soft, in-process layer.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const buckets = new Map<string, { count: number; reset: number }>();

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

// ── Idempotency and references ─────────────────────────────────────────────────
// The client sends a random submissionId with each form; a retry after a timeout carries the same id,
// so the second arrival returns the first reference instead of sending a second email.
const SEEN_MS = 15 * 60 * 1000;
const seen = new Map<string, { ref: string; at: number }>();

export function makeReference(now = new Date()): string {
  const d = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}`;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let tail = "";
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  for (const b of bytes) tail += alphabet[b % alphabet.length];
  return `JREW-${d}-${tail}`;
}

/** Returns an existing reference for a repeated submissionId, else records a new one. */
export function claimSubmission(submissionId: string | undefined, now = Date.now()): { ref: string; duplicate: boolean } {
  if (submissionId && /^[\w-]{8,64}$/.test(submissionId)) {
    const prior = seen.get(submissionId);
    if (prior && now - prior.at < SEEN_MS) return { ref: prior.ref, duplicate: true };
    const ref = makeReference(new Date(now));
    seen.set(submissionId, { ref, at: now });
    if (seen.size > 5000) for (const [k, v] of seen) if (now - v.at >= SEEN_MS) seen.delete(k);
    return { ref, duplicate: false };
  }
  return { ref: makeReference(new Date(now)), duplicate: false };
}

/** Test hook. */
export function resetRateLimit() {
  buckets.clear();
  seen.clear();
}

// ── PII-safe logging ───────────────────────────────────────────────────────────
/** What routine logs may carry: a reference, the sender's domain, a subject, sizes. Never a name, address, phone or message. */
export function logSummary(ref: string, email: string, subject: string, extra: Record<string, string | number> = {}) {
  const domain = email.includes("@") ? email.slice(email.lastIndexOf("@") + 1) : "unknown";
  return { ref, senderDomain: domain, subject: subject.slice(0, 80), ...extra };
}
