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

Lenis smooth scroll with GSAP owning the RAF; hero entrance and pinned exit (desktop only); marker stroke on headings; three `Reveal` sections; scrubbed stat counters; two photograph wipes; a pinned horizontal timeline on About (desktop only); CSS keyframes for the mobile menu, RFQ steps and dialogs. Everything inside `prefers-reduced-motion: no-preference`. Inventory and findings in `docs/MOTION-AUDIT.md`.

### Forms and API

- RFQ: three steps plus review, validated by `src/lib/rfq.ts`, posted to `/api/contact`; per-field errors with `aria-describedby`, fieldset and legend for radio groups, focus moved to each step, entries preserved after a failed submit, distinct submitting, success and failure states.
- Enquiry and careers forms with the same primitives; careers requires a resume.
- `/api/contact` and `/api/careers`: every field bounded and header-safe (`src/lib/validate.ts`), email checked, honeypot field, per-IP rate limit (10 per 10 minutes), resume allowlist by extension, declared type and file signature (PDF, DOC, DOCX, 4 MB so the body stays under Vercel's function limit). SMTP via nodemailer when `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` are set. Without SMTP: preview and local log the submission and return success (so the path can be exercised); production returns 500 and logs an error so a misconfiguration is never silent. 14 route tests in `src/app/api/__tests__/routes.test.ts`.

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

## 8. Deploy checklist (Gate 2)

1. Raghav confirms Gate 2.
2. `npx vercel` from the repo root, answer "set up and deploy", **create a new project** (never link `prj_nX56I20mK34TOOyN9YZi73S22LZf`), accept the detected Next.js settings. Preview only: no `--prod`, no domain, no DNS.
3. Set the six SMTP variables in the new project (preview environment) with values from Raghav, or leave unset for the console fallback and say so on the preview.
4. Set `NEXT_PUBLIC_SITE_URL` to the preview URL for correct canonical and og:image on the preview (the production value will be `https://jrew.co.in` when that day comes).
5. Verify the live URL: every route, images, forms (console fallback or SMTP receipt), `BASE=<preview> node scripts/verify.mjs`, `BASE=<preview> node scripts/lighthouse.mjs`.
6. Record the project name and URL in `~/cowork-brain/memory/technical/jrew-site-v3-website.md` and in QA-REPORT.md.

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