import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3201";
const browser = await chromium.launch();
for (const route of ["/", "/contact"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 160)); });
  await page.addInitScript(() => {
    window.__lcp = [];
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__lcp.push({ t: Math.round(e.startTime), size: e.size, tag: e.element?.tagName, cls: e.element?.className?.toString().slice(0, 60), txt: (e.element?.textContent ?? e.element?.currentSrc ?? "").slice(0, 60) });
    }).observe({ type: "largest-contentful-paint", buffered: true });
    window.__fontEvents = [];
    document.fonts?.addEventListener?.("loadingdone", () => window.__fontEvents.push(Math.round(performance.now())));
  });
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  const r = await page.evaluate(() => ({ lcp: window.__lcp, fonts: window.__fontEvents, res: performance.getEntriesByType("resource").filter((r) => /woff2|chunks\/[^/]+\.js$/.test(r.name)).map((r) => ({ n: r.name.split("/").pop().slice(0, 40), end: Math.round(r.responseEnd) })) }));
  console.log(route, JSON.stringify(r, null, 1));
  console.log("console:", errs);
  await ctx.close();
}
await browser.close();
