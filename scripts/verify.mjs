// Gate harness for jrew-site-v3. Run with a server on BASE (default http://localhost:3200).
// Gates: G4 console, G5 network, G6 SSR content, G7 a11y (axe + keyboard probes), G8 reduced motion,
// G9 responsive 390/768/1440/1920 + screenshots, G10 forms, G11 links, G12 SEO, G14 design rails.
// Prints PASS/FAIL per check and writes screenshots/verify-results.json.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:3200";
const ROUTES = ["/", "/products", "/products/attachments", "/stakon", "/capabilities", "/quality", "/facilities", "/about", "/contact", "/careers", "/privacy"];
const SHOTS = "screenshots";
fs.mkdirSync(SHOTS, { recursive: true });
const name = (r) => (r === "/" ? "home" : r.slice(1).replace(/\//g, "-"));

const results = [];
const note = (ok, gate, label, detail = "") => {
  results.push({ ok, gate, label, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${gate}  ${label}${detail ? "  :: " + String(detail).slice(0, 220) : ""}`);
};

// G6 expected server-rendered strings per route
const SSR = {
  "/": ["Five decades,", "Four sectors,", "Six families,", "Machined to", "Every stage engineered", "Trusted by", "Quality is engineered in,", "Four units. Two states.", "One integrated platform.", "40,000", "USD", "0 PPM", "Precision"],
  "/products": ["Mast systems,", "Direct-on-line,", "Dipper baseplate", "Compactor drum", "Lifting hooks", "STAKON"],
  "/products/attachments": ["HD Fork with Grab", "Power Grab", "Multi Shovel", "Manure Fork with Grab", "Grapple Scrap with Industrial Grab", "Cotton Grab", "Sugarcane Grab", "Drum Handler", "Pole Planter", "Man Basket", "Skid Steer Pallet Fork", "Fork Frame", "Precision Placer", "Side Tilt-Rotate Carriage"],
  "/stakon": ["STAKON FE Series", "STAKON SE Series", "STAKON FEPT 2000", "6.3 m", "2,000 kg"],
  "/capabilities": ["Cutting", "Forming", "Fabrication and welding", "Machining", "Forging", "Surface treatment", "Assembly", "Heat treatment", "Packaging and dispatch", "0.05 mm", "side-shifter carriage"],
  "/quality": ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "EN ISO 3834-2", "CII GreenCo", "TUV Rheinland", "FARO"],
  "/facilities": ["MOH 1", "FBD 1", "FBD 2", "MOH 2", "6,00,000", "2027"],
  "/about": ["Ram Ratan Agarwal", "1973", "2027", "ICARE", "UPLIFT", "JREW Foundation", "Public limited since 1994"],
  "/contact": ["Start with", "enquiry@jrew.co.in"],
  "/careers": ["Open application"],
  "/privacy": ["Forms."],
};

const browser = await chromium.launch();

// ── Pass 1: desktop 1440, console, network, screenshots, axe, alt, SEO, rails ──────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const consoleIssues = [];
  const bad = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") consoleIssues.push(`[${m.type()}] ${page.url()} :: ${m.text().slice(0, 160)}`);
  });
  page.on("pageerror", (e) => consoleIssues.push(`[pageerror] ${page.url()} :: ${e.message.slice(0, 160)}`));
  page.on("response", (r) => {
    if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`);
  });

  const titles = new Map();
  const internalHrefs = new Set();
  for (const route of ROUTES) {
    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    note(res && res.status() === 200, "G5", `route ${route} responds 200`, res?.status());
    await page.waitForTimeout(600);
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SHOTS}/1440-${name(route)}.png`, fullPage: true });

    // G7 axe
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const serious = axe.violations.filter((v) => ["serious", "critical"].includes(v.impact));
    note(serious.length === 0, "G7", `axe serious/critical on ${route}`, serious.map((v) => `${v.id}(${v.nodes.length})`).join(", "));
    const missingAlt = await page.evaluate(() => [...document.images].filter((i) => !i.hasAttribute("alt")).length);
    note(missingAlt === 0, "G7", `alt attributes complete on ${route}`, missingAlt ? `${missingAlt} missing` : "");

    // G12 SEO
    const seo = await page.evaluate(() => {
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try {
          return JSON.parse(s.textContent);
        } catch {
          return null;
        }
      });
      const types = ld.filter(Boolean).map((d) => d["@type"]);
      return {
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.content ?? "",
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
        og: document.querySelector('meta[property="og:image"]')?.content ?? "",
        ldOk: ld.every(Boolean),
        types,
        h1: document.querySelectorAll("h1").length,
      };
    });
    note(seo.title.length > 10 && !titles.has(seo.title), "G12", `unique title on ${route}`, seo.title);
    titles.set(seo.title, route);
    note(seo.desc.length > 50, "G12", `meta description on ${route}`, `${seo.desc.length} chars`);
    note(seo.canonical.length > 0, "G12", `canonical on ${route}`, seo.canonical);
    note(seo.ldOk && seo.types.includes("Organization"), "G12", `JSON-LD parses with Organization on ${route}`, seo.types.join(","));
    if (route !== "/") note(seo.types.includes("BreadcrumbList"), "G12", `BreadcrumbList on ${route}`);
    if (["/products", "/products/attachments", "/stakon"].includes(route)) note(seo.types.includes("Product"), "G12", `Product JSON-LD on ${route}`);
    note(seo.h1 === 1, "G7", `exactly one h1 on ${route}`, `${seo.h1}`);
    if (route === "/") note(seo.og.length > 0, "G12", "og:image declared on home", seo.og);
    if (route === "/" && seo.og) {
      const ogRes = await page.request.get(seo.og.replace(/^https?:\/\/[^/]+/, BASE));
      note(ogRes.status() === 200 && (ogRes.headers()["content-type"] || "").includes("image"), "G12", "og:image resolves", `${ogRes.status()} ${ogRes.headers()["content-type"]}`);
    }

    // G11 collect links
    const hrefs = await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => ({ href: a.getAttribute("href"), rel: a.getAttribute("rel"), target: a.getAttribute("target") })));
    for (const h of hrefs) {
      if (!h.href) continue;
      if (h.href.startsWith("http")) {
        if (h.target === "_blank") note((h.rel || "").includes("noopener"), "G11", `external link has noopener on ${route}`, h.href);
      } else if (!h.href.startsWith("mailto:") && !h.href.startsWith("tel:") && !h.href.startsWith("#")) internalHrefs.add(h.href.split("#")[0] || "/");
    }

    // G14 design rails
    const rails = await page.evaluate(() => {
      const sections = document.querySelectorAll("main section, main header").length;
      const eyebrows = document.querySelectorAll("main .eyebrow").length; // .kicker (card labels) is excluded by design
      const marigoldTypeOnPaper = [...document.querySelectorAll(".text-marigold")].filter((el) => !el.closest(".on-ink")).length;
      const wraps = [...document.querySelectorAll('a[class*="bg-ink"], a[class*="bg-marigold"], button[class*="bg-ink"], button[class*="bg-marigold"]')]
        .filter((el) => el.offsetParent !== null)
        .filter((el) => {
          const lh = parseFloat(getComputedStyle(el).lineHeight) || 24;
          const range = document.createRange();
          range.selectNodeContents(el);
          return range.getBoundingClientRect().height > lh * 1.5;
        })
        .map((el) => el.textContent.trim().slice(0, 40));
      const quoteLabels = [...new Set([...document.querySelectorAll("a, button")].map((e) => e.textContent.trim()).filter((t) => /quote/i.test(t) && t.length < 40))];
      const dashes = (document.body.innerText.match(/[—–]/g) || []).length;
      return { sections, eyebrows, marigoldTypeOnPaper, wraps, quoteLabels, dashes };
    });
    note(rails.eyebrows <= Math.ceil(rails.sections / 3), "G14", `eyebrow budget on ${route}`, `${rails.eyebrows} of ceil(${rails.sections}/3)=${Math.ceil(rails.sections / 3)}`);
    note(rails.marigoldTypeOnPaper === 0, "G14", `no marigold type on paper on ${route}`, `${rails.marigoldTypeOnPaper}`);
    note(rails.wraps.length === 0, "G14", `no wrapped CTA labels at 1440 on ${route}`, rails.wraps.join(" | "));
    note(rails.quoteLabels.every((l) => l === "Request a quote" || l === "Submit RFQ"), "G14", `one quote CTA label on ${route}`, rails.quoteLabels.join(" | "));
    note(rails.dashes === 0, "G14", `no em or en dashes rendered on ${route}`, `${rails.dashes}`);
  }

  // G6 raw HTML without JS
  for (const route of ROUTES) {
    const html = await (await page.request.get(BASE + route)).text();
    const missing = (SSR[route] || []).filter((s) => !html.includes(s));
    note(missing.length === 0, "G6", `server HTML carries content on ${route}`, missing.join(" | "));
  }

  // G11 internal link sweep
  for (const href of [...internalHrefs].sort()) {
    const r = await page.request.get(BASE + href);
    note(r.status() === 200, "G11", `internal link ${href}`, r.status());
  }

  // G12 sitemap + robots
  const sm = await page.request.get(BASE + "/sitemap.xml");
  const smText = await sm.text();
  note(sm.status() === 200 && ROUTES.every((r) => smText.includes(r === "/" ? "<loc>" : r)), "G12", "sitemap lists every route", `${sm.status()}`);
  const rb = await page.request.get(BASE + "/robots.txt");
  note(rb.status() === 200 && (await rb.text()).includes("Sitemap:"), "G12", "robots.txt present with sitemap", `${rb.status()}`);

  // G7 keyboard probes
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  note(first === "Skip to content", "G7", "first tab stop is the skip link", String(first));
  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  note((await page.evaluate(() => location.hash)) === "#main", "G7", "skip link targets #main");

  await page.goto(BASE + "/products/attachments", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Telehandlers" }).click();
  const pressed = await page.getByRole("button", { name: "Telehandlers" }).getAttribute("aria-pressed");
  const visibleCards = await page.evaluate(() => [...document.querySelectorAll("ul li")].filter((li) => li.querySelector("img") && !li.hidden && li.closest("ul")?.classList.contains("grid")).length);
  note(pressed === "true" && visibleCards > 0 && visibleCards < 14, "G7", "attachment filter toggles aria-pressed and hides cards", `pressed=${pressed} visible=${visibleCards}`);
  await page.getByRole("button", { name: "All attachments" }).click();
  await page.locator("ul.grid li:not([hidden]) button").first().click();
  await page.waitForTimeout(300);
  note(await page.evaluate(() => document.querySelector("dialog")?.open === true), "G7", "attachment dialog opens");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  note(await page.evaluate(() => document.querySelector("dialog")?.open !== true), "G7", "attachment dialog closes on Esc");

  await page.goto(BASE + "/products", { waitUntil: "networkidle" });
  const firstTab = page.getByRole("tab").first();
  await firstTab.focus();
  await page.keyboard.press("ArrowRight");
  const selected = await page.evaluate(() => [...document.querySelectorAll('[role=tab][aria-selected="true"]')].map((t) => t.textContent)[0]);
  note(selected === "Skid steers", "G7", "by-machine tabs move with ArrowRight", String(selected));

  const realConsole = consoleIssues.filter((c) => !/React DevTools|GL Driver|GPU stall|SwiftShader|\[HMR\]|Fast Refresh/i.test(c));
  note(realConsole.length === 0, "G4", "console clean across routes", realConsole.slice(0, 3).join(" || "));
  const realBad = bad.filter((b) => !b.includes("/_next/webpack-hmr"));
  note(realBad.length === 0, "G5", "zero failed requests incl. images", realBad.slice(0, 4).join(" || "));
  await ctx.close();
}

// ── Pass 2: 1920 fold screenshots ────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${SHOTS}/1920-${name(route)}.png` });
  }
  await ctx.close();
}

// ── Pass 3: reduced motion ────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  note((await page.evaluate(() => document.querySelectorAll(".pin-spacer").length)) === 0, "G8", "no pins under reduced motion (home)");
  note(!(await page.evaluate(() => document.documentElement.classList.contains("lenis"))), "G8", "Lenis not constructed under reduced motion");
  const hidden = await page.evaluate(() => [...document.querySelectorAll("main li, main h2, main img")].filter((e) => getComputedStyle(e).visibility === "hidden" || getComputedStyle(e).opacity === "0").length);
  note(hidden === 0, "G8", "all home content visible without motion", `${hidden} hidden`);
  const clipped = await page.evaluate(() => [...document.querySelectorAll("main *")].filter((e) => /inset\(0(px)? 100%/.test(getComputedStyle(e).clipPath)).length);
  note(clipped === 0, "G8", "no clip-path wipes left closed", `${clipped}`);
  await page.screenshot({ path: `${SHOTS}/reduced-motion-home.png`, fullPage: true });
  await page.goto(BASE + "/about", { waitUntil: "networkidle" });
  note((await page.evaluate(() => document.querySelectorAll(".pin-spacer").length)) === 0, "G8", "timeline not pinned under reduced motion");
  await ctx.close();
}

// ── Pass 4: 390 and 768 ───────────────────────────────────────────────────────
for (const [w, h, mobile] of [[390, 844, true], [768, 1024, false]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const overflow = await page.evaluate(() => document.scrollingElement.scrollWidth - window.innerWidth);
    note(overflow <= 0, "G9", `no horizontal overflow at ${w} on ${route}`, `${overflow}px`);
    await page.screenshot({ path: `${SHOTS}/${w}-${name(route)}.png`, fullPage: w === 390 });
    if (mobile) {
      const small = await page.evaluate(() =>
        [...document.querySelectorAll("a, button")]
          .filter((e) => e.offsetParent !== null && !e.closest("p, dd, dt, td"))
          .map((e) => ({ t: e.textContent.trim().slice(0, 30), h: e.getBoundingClientRect().height, w: e.getBoundingClientRect().width }))
          .filter((b) => b.h > 0 && (b.h < 44 || b.w < 44)),
      );
      note(small.length === 0, "G7", `touch targets >= 44px on ${route}`, small.slice(0, 4).map((s) => `${s.t}(${Math.round(s.w)}x${Math.round(s.h)})`).join(" | "));
    }
  }
  if (mobile) {
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.waitForTimeout(300);
    note(!!(await page.$("#mobile-menu")), "G9", "mobile menu opens");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    note(!(await page.$("#mobile-menu")), "G9", "mobile menu closes on Esc");
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${SHOTS}/390-menu.png` });
  }
  await ctx.close();
}

// ── Pass 5: forms ─────────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  // validation: Continue without a choice
  await page.getByRole("button", { name: "Continue" }).first().click();
  note((await page.locator("[role=alert]").count()) >= 1, "G10", "RFQ step 1 shows a validation error");
  await page.getByLabel("Enquiry").getByText("Axle and steering assemblies").click();
  await page.getByRole("button", { name: "Continue" }).first().click();
  await page.getByLabel("Annual quantity").getByText("500-5,000 a year").click();
  await page.getByLabel("Sourcing timeline").getByText("Within 3 months").click();
  await page.getByRole("button", { name: "Continue" }).first().click();
  await page.fill("#contact-name", "Verify Bot");
  await page.fill("#contact-company", "Harness Ltd");
  await page.fill("#contact-email", "verify@example.com");
  await page.getByRole("button", { name: "Continue" }).first().click();
  // failure path: abort the API
  await page.route("**/api/contact", (r) => r.abort());
  await page.getByRole("button", { name: "Submit RFQ" }).click();
  await page.waitForTimeout(600);
  const failText = await page.locator("[role=alert]").allTextContents();
  note(failText.some((t) => /did not send/i.test(t)), "G10", "RFQ failure shows the error banner", failText.join(" | ").slice(0, 120));
  note(await page.evaluate(() => document.body.textContent.includes("Axle and steering assemblies")), "G10", "RFQ entries intact after failure");
  await page.unroute("**/api/contact");
  // success path via console fallback
  const [resp] = await Promise.all([page.waitForResponse("**/api/contact"), page.getByRole("button", { name: "Submit RFQ" }).click()]);
  const body = await resp.json().catch(() => ({}));
  note(resp.status() === 200 && body.success === true, "G10", "RFQ submits (console fallback or SMTP)", JSON.stringify(body));
  await page.waitForTimeout(400);
  note(await page.evaluate(() => document.body.textContent.includes("We have your enquiry")), "G10", "RFQ success state shown");

  // enquiry validation
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Send enquiry" }).click();
  note((await page.locator("#enquiry [role=alert]").count()) === 3, "G10", "enquiry form shows three field errors when empty", `${await page.locator("#enquiry [role=alert]").count()}`);

  // careers: no resume
  await page.goto(BASE + "/careers", { waitUntil: "networkidle" });
  await page.fill("#ca-name", "Verify Bot");
  await page.fill("#ca-email", "verify@example.com");
  await page.getByRole("button", { name: "Submit application" }).click();
  const caErr = await page.locator("[role=alert]").allTextContents();
  note(caErr.some((t) => /resume/i.test(t)), "G10", "careers form requires a resume", caErr.join(" | "));
  await ctx.close();
}

await browser.close();
const failures = results.filter((r) => !r.ok);
fs.writeFileSync(`${SHOTS}/verify-results.json`, JSON.stringify({ base: BASE, at: new Date().toISOString(), results }, null, 2));
console.log(`\n${results.length - failures.length}/${results.length} checks passed${failures.length ? `, ${failures.length} FAILURES:` : ""}`);
for (const f of failures) console.log(`  - ${f.gate} ${f.label} ${f.detail}`);
process.exit(failures.length ? 1 : 0);
