// The security headers are the one thing a preview must not quietly relax. Development adds
// 'unsafe-eval' so React's error overlay works; nothing else may widen the policy, and no
// third-party origin may appear in it, whatever a preview-only convenience would gain.
import { describe, expect, it, vi } from "vitest";

async function cspFor(env: string): Promise<string> {
  vi.resetModules();
  vi.stubEnv("NODE_ENV", env);
  const config = (await import("../../../next.config")).default;
  const groups = await config.headers!();
  const all = groups.find((g) => g.source === "/:path*");
  const csp = all?.headers.find((h) => h.key === "Content-Security-Policy")?.value ?? "";
  vi.unstubAllEnvs();
  vi.resetModules();
  return csp;
}

describe("security headers", () => {
  it("keeps the production policy to this origin only", async () => {
    const csp = await cspFor("production");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("object-src 'none'");
    // no remote origin anywhere in the policy: not a CDN, not an analytics host, not vercel.live
    expect(csp).not.toMatch(/https?:\/\//);
  });

  it("allows eval in development only, for React's error overlay", async () => {
    expect(await cspFor("development")).toContain("'unsafe-eval'");
  });

  it("still carries the transport and framing protections", async () => {
    vi.resetModules();
    const config = (await import("../../../next.config")).default;
    const groups = await config.headers!();
    const all = groups.find((g) => g.source === "/:path*");
    const value = (k: string) => all?.headers.find((h) => h.key === k)?.value;
    expect(value("Strict-Transport-Security")).toContain("max-age=31536000");
    // no preload until the whole zone is confirmed HTTPS-only: BUILD-REPORT, needs approval
    expect(value("Strict-Transport-Security")).not.toContain("preload");
    expect(value("X-Frame-Options")).toBe("SAMEORIGIN");
    expect(value("X-Content-Type-Options")).toBe("nosniff");
    expect(value("Cross-Origin-Opener-Policy")).toBe("same-origin");
    expect(groups.find((g) => g.source === "/api/:path*")?.headers[0].value).toBe("no-store");
  });
});
