---
title: INGEST-FINDINGS
type: note
permalink: home/desktop/jrew/code/jrew-site-v3/docs/ingest-findings
---

# Ingest Findings - JREW website v3

Date: 2026-09-18. Phase 1 of `JREW_WEBSITE_V3_PROMPT.md`. Sources read in full: `05_Brochure_2026_Visual_Extraction.md` + all 12 spread renders, `02_Global_Best_Practices.md`, `01_Brochure_Page_Analysis.md`, apple-scroll-starter (AUDIT-REPORT, AUDIT-ASSETS, ARCHITECTURE, globals.css, 27 sections, ui, subpages, API routes, data), jrew-forge (PRODUCT, DESIGN, BUILD-REPORT, spec, plan, site.ts, data, chrome, RFQ flow, verify.mjs).

## 1. What content exists (brochure = authoritative)

| Block | Source | Web-ready? |
|---|---|---|
| Cover headline "PRECISION ENGINEERING FOR TOMORROW'S MACHINERY", strapline "ENGINEERING-LED MANUFACTURING · SINCE 1973" | Spread 12-right | Yes |
| Vision / Mission / ICARE values / UPLIFT principles | Spread 01-left | Yes (values + principles verbatim) |
| "A single partner, from engineering to supply chain" intro + 3 arrow bullets | Spread 01-right | Yes, hero-grade copy |
| 6 snapshot stats (1973, USD 50M+, 1,000+, 40,000+, 10+, 0 PPM) + 4-row spec table | Spread 02-left | Yes |
| 4 sectors with copy + line-art (excavator, forklift, combine, locomotive) | Spread 02-right | Copy yes; line art is vector in the PDF, not among the 70 extracted rasters |
| 18-milestone timeline in 3 eras, 1973-2027 | Spread 03 | Yes |
| Mast systems + axle assemblies (specs, 4 pills, 5 axle variants) | Spread 04-left | Yes |
| 8 component cards, each naming the OEM and why the tolerance matters | Spread 04-right | Yes; images 250-620 px, card-grade only |
| 14 attachment cards with spec + applications, 5 category pills | Spread 05 | Yes; cut-outs 440-750 px |
| Forged products (hooks 6.3-25 t SWL to IS 15560, forks 1-6 t, profiles) + 4-icon strip | Spread 06-left | Yes |
| STAKON range: FE / SE / FEPT 2000, 6.3 m, 2,000 kg, 14 models | Spread 06-right | Yes; transparent stacker PNG 1527x1678 is hero-grade |
| 4 facilities with est. year, sq ft, equipment lists | Spread 07-left | Yes |
| 9-row Plate to Product process table | Spread 07-right | Yes, build as a real table |
| 4-step engineering partnership + 4 proof rows + 0 PPM / APQP / Quality Circles panel | Spread 08 | Yes |
| Side-shifter carriage case study (OEM unnamed) | Spread 09-left | Yes, keep unnamed |
| 5 certification chips (TUV Rheinland) + 6-row inspection infrastructure | Spread 09-right | Yes |
| People (3 rows) + 2026 ERP / 2027 Rajpura 600,000 sq ft panel | Spread 10-left | Yes |
| CSR (600+ children, medical, funeral van) + ESG cards + founder + JREW Foundation | Spread 10-right | Yes |
| Awards: Caterpillar SER 2023/24/25, JCB, CII x Godrej, Godrej, ET NOW | Spread 11-left | Yes; 5 photos 780-1600 px |
| 24 customer logos | Spread 11-right | Names yes; logo files are the weak point (see 3) |
| Why JREW: 4 numbered reasons + "Let's engineer together" CTA + 5 association logos | Spread 12-left | Yes |

Photography usable at hero scale: `p01_x197` plant exterior 2768x1958, `p02_x3/4/5` shop floor ~2400 px, `p09_x85` paint booth 2405x1805, `p09_x86` FARO CMM 2517x1886, `p08_x80` robotic welding 1986x1053, `p06_x63` forging panorama 2425x838, `p10_x95` office 2437x1827, `p07_x73/x74` laser cutting and container loading ~1500 px.

Reusable from the repos: `/api/contact` and `/api/careers` nodemailer contract with console fallback, `jsonld.ts` builders (Organization, WebSite, Breadcrumb, FAQ, Product), `robots.ts` AI-crawler allowlist, jrew-forge `rfq.ts` + vitest tests, `SmoothScrollProvider` (GSAP-ticker-owned Lenis, reduced-motion bypass), `Reveal` (SSR-complete, gsap.from at runtime), `KineticNumber` (SSR ships final value), `ProductsCatalog` native `<dialog>`, `verify.mjs` gate harness, apple-scroll-starter's pin/scrub patterns (SectorsShowcase crossfade, StickySection, TextReveal, ProductsShowcase), CategoryFilter, ProductModal keyboard handling.

## 2. What is missing (not in the brochure, needed by a website)

- Plant street addresses and a phone number. Live-site data has C-97 and C-99 Industrial Area Phase VII Mohali, Plot 238 Sector 58 and Plot 128 Sector 25 Faridabad, phone +91 97 3334 3338, CIN U29219PB1994PLC039807. Which plot is FBD 1 (mother) vs FBD 2 (feeder) must be confirmed.
- Leadership. Brochure names only the founder. Live site lists Rohit Grover (MD) and Vinita Grover (Director) with portraits.
- Events (Bauma 2018/2023, EXCON 2019, MachAuto 2022, CII visit, customer visit, eye camp) exist only in the live-site data.
- Careers copy and open roles. Only a form contract exists.
- Downloadable capability statement / certificate PDFs. The live footer links to `/JREW-Capability-Statement.pdf` and `/certificates/*.pdf` which do not exist in `public/` (broken links today).
- Privacy and Terms pages (live footer links go to `#`).
- Customer logo vectors. The 24 brochure logos are outlined vectors inside the PDF; on disk there are only 30 186x186 JPEGs with white boxes. Linde, CNH Industrial and separate Doosan / Bobcat marks have no file at all.
- Sector line-art as SVG. Exists only as vector paths inside the PDF.
- Association logos (iCEMA, Make in India, GreenCo, CII, TUV Rheinland) at usable size; extracted rasters are 154x154 and 234x132.
- STAKON website URL confirmation (`stakon.in` is used by both repos).
- SMTP credentials and ENQUIRY_EMAIL / CAREERS_EMAIL values.

## 3. Conflicts between sources (brochure wins unless noted)

| Topic | Brochure 2026 | apple-scroll-starter (live) | jrew-forge | Resolution |
|---|---|---|---|---|
| Headcount | 1,000+ | 1,500+ (stats), 800+ (about) | 1,010 | 1,000+ |
| Turnover | USD 50M+ | $35M, Rs 290 Cr FY24 | not shown | USD 50M+; INR figure off site |
| Export countries | 10+ | 12 / 12+ | 7 regions | 10+ |
| Floor area | 50K + 60K + 10K + 40K = 160,000 sq ft | 200,000+ / 210,000 | 210,000 | Per-unit figures only; no invented total |
| Rajpura | 600,000 sq ft campus, Phase 1 operations 2027 | 120,000 sq ft, commissioning 2027 | 120,000 sq ft PEB, Q4 2026 - Q1 2027 | 600,000 sq ft, 2027. No capex, no headcount |
| Machining tolerance | 0.05 mm | not stated | +/-0.012 mm, H7 | 0.05 mm (spread 07) |
| Forks | 1-6 t, 1,000-2,000 mm blades | 1.5-10 T, ITA II-IV, 42CrMo4 | 1.5-10 T | Brochure spec; grades only if Raghav confirms |
| Hooks | IS 15560, 6.3-25 t SWL | IS 3815 / DIN 15401 | IS 3815 / DIN 15401 | IS 15560, 6.3-25 t SWL |
| Mast capacity | 1.5-15 t, lift to 14 m (spread 04) vs 1.5-5 t, lift to 6.3 m (spread 08) | 25-tonne | 1.5-5 t | Spread 04 for the product family; spread 08 line used verbatim inside its proof row. Flag internal inconsistency |
| Certifications | ISO 9001 / 14001 / 45001, EN ISO 3834-2, CII GreenCo | ISO 9001 / 14001 / OHSAS 18001 | ISO 9001 / 14001 / 45001 / 3834 | Brochure set; OHSAS 18001 retired |
| Milestones | 18 (1973-2027) | 15 (1973-2024, incl. 2013 merger, 2022 C-97) | 15 | Brochure 18 |
| MOH 2 date | Card says EST. 2026, timeline says 2025 corporate office and R&D | 2022 | 2022 | Brochure; flag the 2025/2026 discrepancy |
| Customers | 24 named | 20 (incl. Knorr-Bremse, Tata Hitachi, Bull Machines, Cukurova, OM, TIL, MEL files) | 20 + Knorr-Bremse | 24 only; extras listed for Raghav |
| Prospects on site | none | Crown (sectors, explorer, FAQ) | removed | Off site per rails |
| Revenue shares | none | "~60% of Revenue" etc. | none | Off site per rails |
| Quality claims | 0 PPM, APQP/PPAP, Quality Circles | "Approved since 2005", "150 part numbers", "Level 3 PPAP" | none | Brochure only |
| STAKON | FE / SE / FEPT 2000, 14 models | CE/ET/HT/TT series | Trion-25 etc. roadmap | Brochure names only |
| Sole-supplier axle | 40,000+/yr, 20+ years | none | none | Brochure |
| Company age | "Fifty years" copy, 1973-2027 rail | 50+ | 53 | Use "since 1973"; avoid a computed year count in copy |

## 4. Repo audit carried forward

apple-scroll-starter (Raghav's preferred web craft): broken opacity scale, no section background variation, sector overlays too heavy, mid-sentence dimming in headlines, scroll cue in hero, eyebrow on every section, hand-rolled SVG icons, tiny white-box logo JPEGs, stock and wrong-context sector photos, `[Year]` and `[OEM Placeholder]` strings shipped, prospect names and revenue shares in copy, OHSAS 18001, `window` scroll listener in Navbar via GSAP body trigger. Keep: pin + scrub mechanics, text reveal, sector crossfade, horizontal product gallery, count-up, marquee, map with pills, navbar blur, footer with locations, subpage route group, JSON-LD and robots work.

jrew-forge: keep RAF ownership, SSR-complete doctrine, reduced-motion as a first tier, RFQ lib and flow, tabular numerals, native dialog, verify.mjs gates, case-exact image path audit. Do not carry: dark graphite palette, custom cursor, grain overlay, R3F scenes, SLTP codenames, Rajpura 120K sq ft, +/-12 um claim, prospect regions on the map.

## 5. Needs Raghav's input (running list, finalised in the plan)

1. Which Faridabad plot is FBD 1 (2007, mother) and which is FBD 2 (2024, feeder); confirm C-99 = MOH 1 and C-97 = MOH 2.
2. Public phone number and whether LinkedIn URL is correct.
3. Include leadership (MD, Director) from the live site, or founder only.
4. Include the 7 events from the live site, or drop the events page.
5. Whether Knorr-Bremse, Tata Hitachi, Bull Machines, Cukurova, TIL, OM, MEL may appear as customers (on the live site, not in the brochure).
6. Steel grades for forks and hooks (42CrMo4 etc.) appear only in repo data, not the brochure.
7. Vector customer logos, association logos and sector line-art, or approval to crop from a high-DPI render of the print PDF.
8. Capability statement PDF and ISO certificate PDFs for download links.
9. SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / ENQUIRY_EMAIL / CAREERS_EMAIL at deploy time.
10. STAKON site URL (stakon.in) and whether to link it.
11. MOH 2 established 2025 or 2026.