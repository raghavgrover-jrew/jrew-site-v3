// Lighthouse runner for G13. Usage: BASE=http://localhost:3201 node scripts/lighthouse.mjs
// Runs desktop and mobile on /, /products/attachments, /contact and prints LCP, CLS, scores.
import { execSync } from "node:child_process";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:3201";
// "simulate" (Lantern, the Lighthouse default) or "devtools" (observed metrics under real throttling). See QA-REPORT.md.
const THROTTLING = process.env.LH_THROTTLING ?? "simulate";
const ROUTES = ["/", "/products/attachments", "/contact"];
// A Vercel preview sits behind deployment protection; PREVIEW_BYPASS carries the project's
// automation bypass secret so Lighthouse can reach the real deployment. Never committed.
const extraHeaders = process.env.PREVIEW_BYPASS
  ? ` --extra-headers='${JSON.stringify({ "x-vercel-protection-bypass": process.env.PREVIEW_BYPASS, "x-vercel-set-bypass-cookie": "true" })}'`
  : "";
fs.mkdirSync("screenshots/lighthouse", { recursive: true });
const rows = [];
for (const route of ROUTES) {
  for (const form of ["desktop", "mobile"]) {
    const out = `screenshots/lighthouse/${form}-${route === "/" ? "home" : route.slice(1).replace(/\//g, "-")}.json`;
    const preset = form === "desktop" ? "--preset=desktop" : "";
    // Lighthouse occasionally fails to record the navigation trace (NO_NAVSTART); one retry is enough.
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        execSync(`npx --yes lighthouse "${BASE}${route}" ${preset} --only-categories=performance,accessibility,best-practices,seo --throttling-method=${THROTTLING} --output=json --output-path="${out}" --chrome-flags="--headless=new --no-sandbox" --quiet${extraHeaders}`, { stdio: "inherit" });
        break;
      } catch (e) {
        if (attempt === 2) throw e;
        console.warn(`lighthouse retry for ${route} (${form})`);
      }
    }
    const j = JSON.parse(fs.readFileSync(out, "utf8"));
    const a = j.audits;
    rows.push({
      route, form,
      perf: Math.round(j.categories.performance.score * 100),
      a11y: Math.round(j.categories.accessibility.score * 100),
      bp: Math.round(j.categories["best-practices"].score * 100),
      seo: Math.round(j.categories.seo.score * 100),
      lcp: +(a["largest-contentful-paint"].numericValue / 1000).toFixed(2),
      cls: +a["cumulative-layout-shift"].numericValue.toFixed(3),
      tbt: Math.round(a["total-blocking-time"].numericValue),
    });
  }
}
console.log("\nroute | form | perf | a11y | best | seo | LCP s | CLS | TBT ms");
for (const r of rows) console.log(`${r.route} | ${r.form} | ${r.perf} | ${r.a11y} | ${r.bp} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.tbt}`);
const fails = rows.filter((r) => r.lcp >= 2.5 || r.cls >= 0.1 || r.a11y < 95);
console.log(fails.length ? `\n${fails.length} rows outside targets (LCP < 2.5 s, CLS < 0.1, a11y >= 95)` : "\nALL LIGHTHOUSE TARGETS MET");
fs.writeFileSync("screenshots/lighthouse/summary.json", JSON.stringify(rows, null, 2));
process.exit(fails.length ? 1 : 0);
