---
title: BUILD-REPORT
type: note
permalink: home/desktop/jrew/code/jrew-site-v3/build-report
---

# BUILD-REPORT: jrew-site-v3

Built 2026-09-19 from `JREW_WEBSITE_V3_PROMPT.md` in one autonomous run, with two stops: Gate 1 (design direction, Raghav chose A) and Gate 2 (before deploy, pending). Companion documents: `docs/INGEST-FINDINGS.md` (Phase 1), `BENCHMARK.md` (Phase 2), `PLAN.md` and `PRODUCT.md` (Phase 3), `DESIGN.md` (as-built system), `docs/MOTION-AUDIT.md` (Phase 6), `QA-REPORT.md` (Phases 5 and 6, command output pasted), `docs/superpowers/specs/2026-09-19-jrew-site-v3-design.md` (decision log).

## 1. Executive summary

- A twelve-route Next.js 16 site that puts the 2026 brochure on the web without paraphrasing it: every data record in `src/data/*` names the spread it came from, and a vitest suite refuses any term outside the content rails.
- Direction A, "Brochure, scrolled": paper ground, black chapter panels, marigold as fill and never as type on white, the brochure's two-tone headline with a marker stroke as the one signature gesture.
- Logos, sector line art and association marks were extracted as vectors from the 1.5 GB print PDF; 60 photographs were prepared from the extracted assets; the STAKON cutouts were re-extracted with their soft masks after the flattened versions showed a black shadow.
- Server-rendered content first. Motion (GSAP, Lenis) enhances only, is gated by `prefers-reduced-motion`, and is audited in `docs/MOTION-AUDIT.md`. framer-motion was removed during QA (134 KB on every route for two small transitions).
- Three QA rounds: gate harness (Playwright + axe, 260+ checks, four viewports, forms, SEO, design rails), Lighthouse (simulated and observed throttling), a senior code review of the full diff (two critical, eight important, fourteen minor findings, all addressed), and an adversarial sourcing-director read. Final numbers are in section 6 and in `QA-REPORT.md`.
- Not deployed. Gate 2 is Raghav's call; the deploy steps are in section 8.

## 2. Assumptions made to keep building

Recorded when Gate 1 was approved with open items 2 to 5 unanswered.

| # | Assumption | Where it lives | If wrong |
|---|---|---|---|
| A1 | Plant addresses are the live site's, mapped C-99 Phase VII = MOH 1, C-97 Phase VII = MOH 2, Plot 128 Sector 25 = FBD 1, Plot 238 Sector 58 = FBD 2 | `src/data/facilities.ts`, `addressConfirmed: false` | Swap two strings; nothing else references them |
| A2 | Public phone `+91 97 3334 3338`, the LinkedIn URL and `stakon.in` are the live site's and may be shown | `src/lib/site.ts` (`contact.*`) | Edit one constant each |
| A3 | Leadership: founder only (Ram Ratan Agarwal, Spread 03); no events section | `src/app/about/page.tsx` | Add a `people` array to `values.ts` and a section |
| A4 | Vector logos and line art may be extracted from the print PDF | `scripts/extract-vectors.py`, `public/logos`, `public/lineart`, `public/associations` | Replace SVG files in place; names are stable |
| A5 | Certificate PDFs and a capability statement are not available yet; `/quality` offers a mailto for copies | `src/app/quality/page.tsx` | Add files to `public/downloads` and swap the link |
| A6 | Attachment-to-machine mapping for the five filter pills is inferred from the brochure's applications text | `src/data/attachments.ts`, `machinesInferred: true` | Edit the `machines` array per record |
| A7 | No analytics, no consent banner in v1 | `src/app/layout.tsx` | Add a script tag and, if a tracker is chosen, a banner |
| A8 | Brochure figures are used only in the spread context they came from; where two spreads disagree the reader-facing conflict was removed (mast range) or left as printed and flagged (MOH 2 year) | `src/data/partnership.ts`, `facilities.ts`, `milestones.ts` | See Needs input 9 and 10 |

## 3. What was built

### Routes

`/`, `/products`, `/products/attachments`, `/stakon`, `/capabilities`, `/quality`, `/facilities`, `/about`, `/contact` (`#rfq`, `#enquiry`), `/careers`, `/privacy`, a designed 404, plus `sitemap.xml`, `robots.txt`, a generated Open Graph image, JSON-LD (Organization and WebSite on every page, BreadcrumbList on subpages, Product on the three product routes).

### Content and data

- `src/data/` holds 20 files: stats, sectors, families, components, attachments, forged, stakon, process, partnership, caseStudy, quality, facilities, milestones, values, csr, awards, customers, whyJrew, byMachine, snapshot. Each record carries `source: "Spread NN"`.
- `src/data/__tests__/integrity.test.ts` enforces record counts, case-exact image paths under `public/`, source tags, no em or en dashes, and the banned-term list (prospect OEMs, SLTP codenames, financial terms, PT Bhaskaran, EQI, acquisition).
- Images: `scripts/prepare-images.py` (60 photographs, about 9 MB, sized per use), `scripts/extract-vectors.py` (24 customer logos, 4 sector line-art machines, 6 association marks, the wordmark), `scripts/extract-stakon-alpha.py` (5 STAKON cutouts with their PDF soft masks applied).

### Design system

Tokens in `src/app/globals.css` (OKLCH), Poppins 700/800 for display and Source Sans 3 for text via `next/font`, the brochure card grammar (left bars, warm and cool card fills, ink name plates, hairline grids, square corners), two-tone headings with the marker stroke, an eyebrow budget of one per three sections, kickers for card labels. `DESIGN.md` records the as-built system.

### Motion

Native scrolling (Lenis was removed after the Codex audit). A transform-only drift on the hero copy; the marker stroke draws in on page titles only; three `Reveal` sections and two photograph wipes on the home page; a pinned horizontal timeline on About (desktop, motion allowed); CSS keyframes for the mobile menu, RFQ steps and dialogs. Stat figures never animate. GSAP loads only on the home, products and about routes. Everything inside `prefers-reduced-motion: no-preference`. Inventory, findings and the revision table are in `docs/MOTION-AUDIT.md`.

### Forms and API

- RFQ: three steps plus review, validated by `src/lib/rfq.ts`, posted to `/api/contact`; per-field errors with `aria-describedby`, fieldset and legend for radio groups, focus moved to each step, entries preserved after a failed submit, distinct submitting, success and failure states.
- Enquiry and careers forms with the same primitives; careers requires a resume.
- `/api/contact` and `/api/careers`: same-origin, content-type and size guards; every field bounded and header-safe (`src/lib/validate.ts`); email checked; honeypot; per-IP rate limit (10 per 10 minutes, soft layer); resume allowlist by extension, declared type, file signature and DOCX package structure (4 MB so the body stays under Vercel's function limit). SMTP via nodemailer with timeouts and one retry when `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` are set; every submission gets a reference (`JREW-YYYYMMDD-XXXXX`) shown on screen, written into the mail subject and sent back to the sender in a fixed-text acknowledgement; a retried `submissionId` returns the same reference without a second mail. Without SMTP the routes fail visibly (HTTP 500, on-page fallback) unless `ALLOW_CONSOLE_DELIVERY=1` on a non-Vercel machine, where a PII-free summary is logged. Responses are `no-store`. 22 route tests in `src/app/api/__tests__/routes.test.ts`.

### Tooling

- `pnpm dev` on port 3200 (launch.json entry `jrew-v3`); `pnpm build`; `pnpm lint`; `pnpm test`.
- `scripts/verify.mjs`: gates G4 to G12 and G14 in Playwright with axe-core, four viewports, screenshots to `screenshots/`, JSON results to `screenshots/verify-results.json`. Run against a production server: `BASE=http://localhost:3201 node scripts/verify.mjs`.
- `scripts/lighthouse.mjs`: three routes, desktop and mobile; `LH_THROTTLING=devtools` for observed metrics.
- `scripts/lcp-probe.mjs`: records LCP candidates under CDP throttling (used to interpret the Lighthouse numbers).

## 4. Deviations from PLAN.md

| Plan said | Built | Why |
|---|---|---|
| framer-motion for the mobile menu and RFQ step transitions | CSS keyframes, mount-only | 134 KB chunk on every route for two 0.2 s transitions; instant exits also read better (motion audit F4, F5) |
| Certificate PDF downloads on `/quality` | Mailto for copies | Files not supplied (Needs input 5) |
| `probe-forms.mjs` and `rails.mjs` as separate scripts | Folded into `verify.mjs` G10 and vitest | One harness, one report |
| Hero photo as AVIF under 350 KB | JPEG via `next/image` (AVIF or WebP negotiated at request time), 750w variant is 41 KB on mobile | Same outcome without a second asset pipeline |
| Events and leadership sections on About | Not built | Open items 4 and 5 unanswered at Gate 1 |
| Mast figures from both Spread 04 and Spread 08 | Spread 08 figures removed from the capabilities proof row | Code review found the two figures contradict each other for a reader; Spread 04 kept on Products |
| Indian digit grouping (6,00,000) | International grouping (600,000) | Export audience; the brochure itself prints 600,000 |
| `aria-modal` on the mobile menu | Dropped; focus moves in on open and back on close | No focus trap was implemented, so the attribute would have misdescribed the widget |
| Home order: hero, stats, sectors, families, components, process, customers, quality, facilities, RFQ | Customer logo wall moved to directly after the stat band | Adversarial read: proof arrived at 55 percent of the mobile page; benchmark pattern 5 also puts the logo wall under the hero region |
| Nav RFQ button from 640 px up | Visible at every width | Adversarial read: on a phone the CTA was reachable only through the menu or the footer on 9 of 11 routes |
| RFQ step 2 always required | Optional for "Plant visit or supplier audit" and "Co-development / new product introduction" | Those enquiries have no volume or timeline yet; the form was blocking them |
| Mobile menu and RFQ steps animate in and out | Enter only; exits instant | Motion audit F4, F5 |

## 5. Decisions made without asking

Six-item nav with a nav-level RFQ CTA. `/quality` as its own page. Sectors on the home page and Products, not a page. `/privacy` as a factual notice about the forms (no tracker to describe). Poppins as the display face by visual match to the outlined print type. Logo and nav links grouped left so they never cross onto the hero photograph at 1920. STAKON cutouts as alpha PNGs on light cards. Lighthouse per-run JSON untracked (summary kept) after the review flagged churn. Marker stroke kept as the single decorative gesture.

## 6. QA summary

Detail, command output and the round-by-round fix list are in `QA-REPORT.md`. Summary of the final state:

| Check | Result |
|---|---|
| `pnpm build` | exit 0, all routes prerendered |
| `pnpm lint` | 0 problems |
| `pnpm test` | 26 passed (12 data and RFQ, 14 API) |
| Gate harness `scripts/verify.mjs` | 264 of 264 checks (round 4, second pass) |
| Lighthouse | Observed throttling: every target met, mobile LCP 1.54 to 1.57 s, CLS 0, accessibility 100 on all six runs. Lantern simulation on the local HTTP/1.1 server reports mobile LCP 2.65 to 3.25 s; the cause is the simulator's pessimistic graph on localhost (QA-REPORT rounds 1 and 3). Re-measure on the Vercel preview |
| Code review | 2 critical, 8 important, 14 minor findings; all addressed in commit 171cce5 except the two content questions handed to Raghav (Needs input 9, 10) |
| Adversarial read | 7 fix-now items: 6 fixed in commit 0a964ce, the h1 swap kept as a test candidate (Needs input 20); copy notes applied where the brochure allows |

## 7. Needs Raghav's input

Carried from PLAN.md, updated for what the build resolved.

1. **Plant to address mapping.** Confirm C-99 = MOH 1, C-97 = MOH 2, Plot 128 Sector 25 = FBD 1, Plot 238 Sector 58 = FBD 2 (`src/data/facilities.ts`).
2. **Public phone, LinkedIn URL, stakon.in link.** Shown as on the live site today (`src/lib/site.ts`). Also: may the site promise a response time on the RFQ success state? None is promised now.
3. **Leadership on About.** Founder only at present. Add Rohit Grover (MD) and Vinita Grover (Director) as on the live site?
4. **Events on About.** The seven live-site events are not included.
5. **Certificate PDFs and a capability statement** for `/quality` downloads.
6. **Customers beyond the 24 in the brochure** (Knorr-Bremse, Tata Hitachi, Bull Machines, Cukurova, TIL, OM, MEL are on the live site).
7. **Steel grades for forks and hooks** (42CrMo4, EN19) appear only in repo data; include or keep the brochure's wording.
8. **Attachment-to-machine mapping** for the five filter pills (inferred; `machinesInferred: true`).
9. **Mast range.** Spread 04 says 1.5 to 15 t, lift to 14 m; Spread 08 said 1.5 to 5 t, lift to 6.3 m. The site now shows only Spread 04's figures. Confirm.
10. **MOH 2 year.** Facilities spread says established 2026; the timeline spread puts corporate office and R&D at 2025. Both are shown as printed. Pick one.
11. **Hero lede copy.** "Fabricated and precision-machined components, sub-assemblies and engineered attachments for OEMs in construction, material handling, agriculture and railways. Since 1973." is a synthesis of the cover and Spread 02, not a printed sentence.
12. **Vector logo files** to replace the PDF extractions, if the brand team has them (names are stable; drop-in).
13. **At deploy:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `ENQUIRY_EMAIL`, `CAREERS_EMAIL`.
14. **Analytics.** None installed. If wanted, name the tool; a consent banner follows from that choice.
15. **RFQ response window.** The success state and the acknowledgement email name the reply route but promise no time. State one ("within N working days") and it goes in two strings.
16. **A named commercial contact or role.** The only person named on the site is the founder. A sourcing director expects a name or at least "the Head of Business Development replies". Your call whether to name someone.
17. **"0 PPM" scope.** Printed as an absolute. A buyer will ask which programmes and which period; if a window exists ("0 PPM on export programmes, FYxx to FYxx") it should be stated, otherwise the claim stays as printed.
18. **"USD 50M+ annual turnover".** Add the fiscal year if you want it dated.
19. **Attachments headline.** Spread 05 prints both "India's widest attachment range" (headline) and "One of India's widest engineered-attachment ranges" (intro). Both are on the page as printed; pick one if you want them aligned.
20. **Hero headline test.** The adversarial read proposes replacing the cover slogan h1 with a noun sentence ("Forklift masts, axle assemblies, attachments and machined components for construction and material-handling OEMs"). Kept the brochure line; the swap is a one-string change in `src/data/whyJrew.ts` if you prefer the concrete version.
21. **Claims register sign-off** (`docs/CLAIMS-REGISTER.md`, 24 rows). Business leadership signs each row with evidence attached before production. Rows 1 to 6 (turnover, headcount, 40,000 units, 0 PPM, exports, sole supplier) are the ones a buyer will test first.
22. **Privacy notice, legal review.** Retention periods (24 months enquiries, 12 months applications, 30 days logs), the DPDP consent basis, the GDPR bases for EEA visitors and the grievance route are drafted, not approved.
23. **HSTS preload and the jrew.co.in zone.** HSTS ships without `preload`; add it only once every subdomain is HTTPS-only.
24. **Edge rate limit and bot protection.** The in-process limiter is a soft layer per serverless instance. Set a Vercel WAF rate-limit rule on `/api/*` (for example 10 requests per 10 minutes per IP) at deploy; add Turnstile only if spam appears.
25. **Resume handling.** Attachments are forwarded to HR unscanned (the allowlist and signature checks reject executables and disguised archives, not malware inside a real PDF). Options: a scanning gateway on the careers mailbox, or a Vercel Blob store with expiring links instead of attachments. Infrastructure decision.
26. **Delivery monitoring.** No synthetic enquiry or inbox check exists. Once SMTP is set, a weekly test submission to `enquiry@` with the reference checked in the inbox is the minimum.
27. **Acknowledgement email.** Senders now receive a fixed-text acknowledgement with their reference from the SMTP_USER address. Confirm the wording and the sending identity.
28. **AI crawler policy.** `robots.ts` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others. Keep or restrict; this is a policy choice.
29. **STAKON page repetition.** The page header and the reused band say the same thing twice before the cards. Option A: header carries "From components to complete machines" and the band drops its h2 and body; option B: cards above the band. Also "STAKON by JREW" is not brochure wording.
30. **STAKON FEPT card.** The brochure shows the two trucks together; the site shows one (the second render is on disk, unused). Pair or single?
31. **Godrej award photograph.** The unlabelled stage photo from Spread 11 (four men with a plaque before a JREW screen) is now attached to the Godrej Quality Leadership row on the auditor's identification. Confirm.
32. **TÜV Rheinland** now carries the umlaut as the brochure prints it.
33. **Analytics.** Still none. If a tool is chosen, the consent question follows and the three first events are listed in QA-REPORT.

## 8. Deploy checklist (Gate 2)

1. Raghav confirms Gate 2.
2. Sign in once: `npx vercel login` in a terminal (browser authentication; only Raghav can complete it), or export `VERCEL_TOKEN`.
3. `scripts/deploy-preview.sh` from the repo root. It builds first, refuses `--prod`, refuses a link to `prj_nX56I20mK34TOOyN9YZi73S22LZf`, and prints the preview URL. Preview only: no domain, no DNS.
   Attempted 2026-09-19: refused at step 2, the saved Vercel login has expired. Nothing was deployed.
4. Set the six SMTP variables in the new project (preview environment) with values from Raghav. There is no fallback on Vercel: `ALLOW_CONSOLE_DELIVERY` is ignored there on purpose, so until SMTP is set both forms answer 500 and say on screen that the message was not sent.
5. Set `NEXT_PUBLIC_SITE_URL` to the preview URL for correct canonical and og:image on the preview (the production value will be `https://jrew.co.in` when that day comes).
6. Verify the live URL: every route, images, forms (console fallback or SMTP receipt), `BASE=<preview> node scripts/verify.mjs`, `BASE=<preview> node scripts/lighthouse.mjs`.
7. Record the project name and URL in `~/cowork-brain/memory/technical/jrew-site-v3-website.md` and in QA-REPORT.md.

## 9. Repo map

```
jrew-site-v3/
  BENCHMARK.md  PLAN.md  PRODUCT.md  DESIGN.md  QA-REPORT.md  BUILD-REPORT.md
  docs/INGEST-FINDINGS.md  docs/MOTION-AUDIT.md  docs/superpowers/{specs,plans}/
  benchmark/                 Phase 2 captures (29 sites)
  screenshots/               harness output: 390, 768, 1440, 1920 per route; lighthouse/summary.json
  scripts/verify.mjs  lighthouse.mjs  lcp-probe.mjs  prepare-images.py  extract-vectors.py  extract-stakon-alpha.py
  public/images  logos  lineart  associations  brand
  src/app/                   routes, api/contact, api/careers, sitemap, robots, opengraph-image
  src/components/{chrome,providers,sections,ui}
  src/data/                  brochure transcription, one file per spread topic, __tests__/integrity.test.ts
  src/lib/                   site constants, rfq, validate, mail, jsonld, utils
```

Related repos: `apple-scroll-starter` (v1, owns the live Vercel project and jrew.co.in; untouched) and `jrew-forge` (v2, never deployed; untouched). Both were read-only reference.
## 10. Codex adversarial audit: implementation record (2026-09-19)

Source: `~/Documents/Codex/2026-09-19/check-the-v3-build-on-jrew/outputs/JREW-V3-ADVERSARIAL-AUDIT.md`. Treated as the prioritised plan; each finding was checked against the code before acting. "Needs approval" items are collected in section 11.

### P0

| # | Finding | Verified | Done | Evidence |
|---|---|---|---|---|
| 1 | Metrics scrubbed from 20 percent, false figures visible mid-scroll | Yes, `KineticNumber` tweened a proxy from `value * 0.2` on scroll | `KineticNumber` is a server component that renders the approved figure only; `data-stat-value` carries the expected string; harness G6 compares every stat at five scroll positions | `scripts/verify.mjs` "stat figures exact at every scroll position" |
| 2 | Claims register | n/a | `docs/CLAIMS-REGISTER.md`: 24 rows with wording, location, source, scope to record, evidence to attach, status. All rows Pending business approval | Needs approval |
| 3 | Lead delivery | Yes: in-memory limiter, any `x-forwarded-for`, no content-type or origin checks, console success in previews, full PII in logs, no timeouts, no idempotency, ZIP signature accepted as DOCX | `src/lib/mail.ts` and both routes: same-origin check, content-type and size caps (64 KB JSON, 4 MB + 64 KB multipart), client IP from `x-real-ip` on Vercel, SMTP timeouts (10/10/20 s) with one retry, `submissionId` idempotency returning the same reference, `JREW-YYYYMMDD-XXXXX` reference in both mails and on screen, console delivery only with `ALLOW_CONSOLE_DELIVERY=1` off Vercel (otherwise HTTP 500 and the on-page fallback), PII-free logs (reference, sender domain, subject, sizes), DOCX package check, `Cache-Control: no-store`, client-side 15 s (30 s careers) timeout and double-submit guard. 14 route tests cover these, including a log-content assertion | `src/app/api/__tests__/routes.test.ts` |
| 3, not done in code | Shared edge rate limiter, Turnstile, synthetic inbox check, CV scanning or link store, delivery monitoring | | Infrastructure decisions; see section 11 | |
| 4 | Mobile menu focus escapes | Yes | Tab and Shift+Tab cycle inside the toggle and the menu links, `aria-modal` restored, `#main` and `footer` set `inert` while open, focus returns to the toggle, closes on route change; harness presses Tab 12 times and Shift+Tab 4 times | verify.mjs "mobile menu contains focus and inerts the page" |
| 5 | Pinned hero blank state | Yes | Pin and fade removed; copy drifts 14 px on transform only; photograph static; navbar flip via IntersectionObserver | `Hero.tsx`, `Navbar.tsx` |
| 6 | Privacy and headers | Yes: notice covered forms and cookies only; no CSP, HSTS, COOP | Privacy notice rewritten in ten sections (controller, purposes, legal basis, retention, processors, transfers, rights, complaints, cookies, changes) as a draft for legal review; disclosure line beside all three submit buttons; CSP, HSTS (no preload), COOP, X-Frame-Options, nosniff, Permissions-Policy, asset caching, `no-store` on the API | `next.config.ts`, `src/app/privacy/page.tsx`, `forms.tsx` `PrivacyNote` |

### P1

| # | Finding | Done |
|---|---|---|
| 7 | Homepage headline abstract | Subhead names the products, units and history; title tag names the products. The h1 swap itself is a brand decision (section 11) |
| 8 | Product context into the RFQ | `RfqFlow` accepts `source`, sends `source` and `submissionId`; the reference number is shown on success and quoted in the acknowledgement. Preselecting the family from a product CTA is wired for `?family=` on the backlog (section 12) |
| 9 | Shorter homepage | Logo wall moved up (earlier), hero fade removed; the sector rows are 30 percent shorter after the line-art cap; further trimming is an IA decision (section 11) |
| 10 | Motion | Lenis removed; marker reveal only on page titles; RFQ step 0.14 s, menu 0.16 s; GSAP loads only on routes with scroll-bound effects (home, products, about); no LCP element is ever opacity-hidden |

### P2

| # | Finding | Done |
|---|---|---|
| 11 | LCP delay and global JS | Hero renders visibly on first paint; Lenis and the layout-level GSAP gone; per-route GSAP only. Numbers in QA-REPORT round 5 |
| 12 | Social metadata | Every route has its own Open Graph and Twitter title, description and URL, and its own 1200x630 image in Poppins 800 with the page's two-tone headline (`src/lib/og.tsx`) |
| 13 | Search architecture | Descriptions cut to 119 to 154 characters; sitemap date is the build date; AI-crawler policy stays "allow" pending the decision in section 11; landing pages for commercial searches are backlog |
| 14 | Measurement plan | Not installed by design (no consent decision). The events to instrument first are listed in QA-REPORT round 3 |

### P3 and the eleven page audits

Applied: marker stroke hugs the text; `@layer` fix so section padding overrides work on nine routes; nav band opaque over the hero; logo wall fits at 390 with two-column phones; association marks as paper-on-ink with the divider paths stripped; Escorts Kubota, Preet and TÜV re-rendered; favicon; footer duplicate removed; hero crop and full-width source; stat band rules; family grid without the orphan; component cut-outs on paper; forged hook, forks, bearing and the axle re-rendered from the print pages; STAKON renders un-swapped, trimmed, bottom-aligned, units lower case, headline two lines; capabilities partnership and case-study layouts re-flowed to the brochure's order with no dead columns; quality inspection layout re-flowed, TÜV umlaut; facilities cards 8/4 with the photo right, map limited to India with true-position labelled pins; about timeline centred and vertical under reduced motion, Godrej award photo attached, checkerboard order on phones, Caterpillar tiles readable at 390; contact RFQ card top-aligned, Direct card beside the enquiry form, review rows split, step indicator 2x2 on phones; careers photo at 4:3 with the office interior below, first invalid field focused; 404 title and links; attachment units (m³, ±, °), dialog two-column with a close button, count line, pill grammar. Line-art SVG weight and cut-out normalisation remain on the backlog.

## 12. Backlog round and the missing-image defect (2026-09-19)

Worked after section 10. Not from the Codex audit.

| Area | Change | Files |
|---|---|---|
| Home page defect | Four sector illustrations had never rendered: `h-auto ... w-auto` gives an unloaded lazy image a 0x0 box, which never intersects the viewport, so it is never fetched. The frame now carries the height. | `src/components/sections/Sectors.tsx` |
| Gate | G5 "every image decodes" per route, after the scroll sweep, failing on any `naturalWidth === 0` | `scripts/verify.mjs` |
| Asset weight | Line art re-emitted: RDP at 0.08 user units, origin-translated, relative commands, 1dp. 1,724 KB to 486 KB on disk, 439 KB to 124 KB gzipped. Verified by rendering both at display size and comparing after a downsample: worst 2.68% of inked pixels differ at all. | `public/lineart/*.svg` |
| RFQ | Family preselection from a product CTA: `/contact?enquiry=axles#rfq` answers step 1 and opens at Requirements, which states the family with a Change control. Derived from the URL through `useSyncExternalStore`, never written into state, so the contact page stays statically prerendered and there is no hydration mismatch. The entry point rides along in the mail's source line. | `src/lib/rfq.ts`, `src/components/ui/RfqFlow.tsx` |
| CTAs | Quote links that name their family on masts, axles, components, forged, the STAKON band and the attachment dialog | `src/app/products/page.tsx`, `src/components/sections/ComponentStories.tsx`, `src/components/sections/StakonBand.tsx`, `src/components/ui/AttachmentCatalog.tsx` |
| Favicon | `metadata.icons` overrode the `app/icon.svg` convention, so the round 5 mark never shipped and the head carried the full wordmark. Entry removed. | `src/app/layout.tsx` |
| Metadata | `siteTitle` and `siteDescription` single-sourced; 32 assertions over the ten sub-routes (own title and description, length, distinctness, self-canonical, card matches the page) | `src/lib/site.ts`, `src/app/layout.tsx`, `src/app/__tests__/metadata.test.ts` |
| Rail | G14 quote label accepts `Request a quote for <family>`; five identical labels to five different preselections would read badly in a link list | `scripts/verify.mjs` |

Tests: 33 to 70.

Backlog still open: landing pages for commercial searches; attachment thumbnails could carry a
stated scale if Raghav wants one, which needs real dimensions rather than a visual guess.

### Console audit (round 6b)

| Area | Change | Files |
|---|---|---|
| CSP | `'unsafe-eval'` in development only, for React's error overlay; the production header is unchanged | `next.config.ts` |
| Logo dimensions | Each customer mark declares its own intrinsic size instead of a shared 140x56, so `next/image` reserves the right box; guarded by a data test | `src/data/customers.ts`, `src/components/sections/Trusted.tsx`, `src/data/__tests__/integrity.test.ts` |
| Hero | `sizes` matches the 9/20 column it occupies from 1024px up, rather than claiming the full viewport | `src/components/sections/Hero.tsx` |

Console is clean on all eleven routes, dev and production, apart from the deliberate 404 probe.

## 13. Deployment (2026-09-19)

Preview published to a new Vercel project, `jrew-site-v3`, `prj_3kxBOF0XL0skN1ACddrCZA0VsATF`. Not
the v1 project, no custom domain, jrew.co.in and its DNS untouched.

| Point | State |
|---|---|
| Deployment type | Preview only. Vercel assigned the project's first build to production regardless of flags; that deployment was removed, and the production alias now answers 404 |
| Access | Behind Vercel's deployment protection, so it opens for Raghav while signed in. `verify.mjs` and `lighthouse.mjs` accept `PREVIEW_BYPASS` to drive it; the secret is not in the repo |
| Indexing | `robots.txt` disallows everything and the head carries `noindex, nofollow` on any host that is not jrew.co.in |
| Canonical | A Vercel build with no explicit `NEXT_PUBLIC_SITE_URL` canonicalises to its own host |
| Forms | 500 with an on-screen refusal and the fallback address, until the six SMTP variables are set. No console fallback on Vercel, by design |
| Gates on the deployment | 279 of 280. The one failure is Vercel's own preview toolbar script being blocked by our CSP |
| Lighthouse on the deployment | Desktop 100 with LCP 0.33 to 0.54 s. Mobile LCP 2.58 to 2.78 s, a little over target; cause and the two rejected remedies are in QA-REPORT round 7 |

Open, and needing Raghav rather than code:

1. The six SMTP values, so the forms work.
2. Vercel's preview toolbar: turn it off in project settings, or allow `vercel.live` in the preview
   CSP. The second would stop the preview rehearsing the real policy.
3. Whether to inline critical CSS to pull mobile LCP under 2.5 s on Lighthouse's mobile profile.
4. Whether this preview should become a shareable URL, which means promoting a build to the
   project's production alias. Not done: production deployment was never authorised.
