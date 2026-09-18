---
title: PLAN
type: note
permalink: home/desktop/jrew/code/jrew-site-v3/plan
---

# PLAN - jrew.co.in v3

Date: 2026-09-19. Phase 3 deliverable of `JREW_WEBSITE_V3_PROMPT.md`. Inputs: `docs/INGEST-FINDINGS.md`, `BENCHMARK.md`, `PRODUCT.md`. Numbers in brackets like [B-5] cite finding 5 in BENCHMARK.md section 3; "Spread NN" cites `05_Brochure_2026_Visual_Extraction.md`.

Status: awaiting Approval Gate 1 (design direction). No site code has been written.

---

## 1. Sitemap and information architecture

Six top-level items plus one nav-level CTA, every spec, certificate and RFQ entry within two clicks [B-3, B-5]. Twelve routes.

| Route | Purpose | Justification |
|---|---|---|
| `/` | The qualification path in ten sections (below) | Product-first, stats early, proof, then RFQ [B-1, B-8, B-9, B-10] |
| `/products` | Six families with sticky family sub-nav; eight component proof cards; "by machine" tabs; STAKON teaser | Product taxonomy is the buyer's entry point [B-1]; sticky chapter nav for a long page [B-15] |
| `/products/attachments` | The 14 attachment cards behind the five category pills, real filter, detail dialog, Product JSON-LD | Filter over a real taxonomy [B-13]; brochure spread 05 already draws it |
| `/stakon` | FE Series, SE Series, FEPT 2000; 6.3 m, 2,000 kg, 14 models | Own brand deserves its own page; kept off the home fold so the OEM story leads |
| `/capabilities` | Nine-row Plate to Product table, four-step engineering partnership, four process-proof rows, side-shifter case study | Capability separated from product [B-2]; table as table [B-14] |
| `/quality` | Five certification chips with certifier and PDF downloads, inspection infrastructure, 0 PPM / APQP+PPAP / Quality Circles panel, people and training | Quality earns a top-level entry on supplier sites [B-4]; engineer utilities [B-6] |
| `/facilities` | MOH 1, FBD 1, FBD 2, MOH 2 cards with equipment lists; Rajpura 2027; Epicor ERP 2026; India map | Footprint as map plus plant list [B-12] |
| `/about` | Who we are; vision, mission, ICARE, UPLIFT; 18-milestone timeline; people and progress; responsibility and ESG; awards; optional leadership; optional events | Heritage after product, not before [B-1]; timeline as scroll sequence [B-16] |
| `/contact` | Three-step RFQ, general enquiry, plant addresses, plant-visit request | Typed entry points [B-5, B-7] |
| `/careers` | Open application form, ICARE and UPLIFT | Secondary audience; existing API contract |
| `/privacy` | Factual notice on what the forms do with data; no analytics | Footer links in v1 pointed at `#` |
| `/404` | On-brand not found | v1 and v2 both had one |

Primary nav: Products, Capabilities, Quality, Facilities, About, Contact, plus the CTA "Request a quote" (anchors to the RFQ on `/contact`). Footer: STAKON, Careers, Privacy, downloads, plants, associations, CIN.

### Home page, section by section

| # | Section | Job in the qualification path | Eyebrow? |
|---|---|---|---|
| 1 | Hero: the cover | State what JREW is in one breath, over the real plant | no |
| 2 | Snapshot stats | Quantify scale in one fold [B-8] | no |
| 3 | Four sectors with line art | Answer "do you make parts for my machine" | yes: INDUSTRIES WE SERVE |
| 4 | Six families grid | Product taxonomy, links to `/products` anchors [B-1] | no |
| 5 | Machined to OEM drawings: eight proof cards | Named-OEM fitment proof [B-10] | yes: STRUCTURAL & PRECISION COMPONENTS |
| 6 | Plate to Product teaser | Show the integrated chain; link to the full table [B-14] | no |
| 7 | Trusted by industry leaders: sole-supplier line, 24 logos, awards strip | Trust proof [B-9, B-11] | no |
| 8 | Quality is engineered in: five chips, 0 PPM panel | Certification gate [B-11] | yes: QUALITY ASSURANCE |
| 9 | Four units, two states: facility strip, Rajpura 2027 | Capacity and continuity [B-12] | no |
| 10 | Why JREW plus RFQ: four numbered reasons, three-step intake | Close [B-5, B-7] | yes: WHY JREW |
| F | Footer: back cover | Associations, plants, contact, CIN | no |

Eyebrow budget: 4 of 10 sections, within the ceiling of ceil(10/3) = 4. Rule carried into DESIGN.md: an eyebrow appears only where the printed spread had one and the section opens a chapter.

---

## 2. Content map

Every block and its source. "Brochure" means `05_Brochure_2026_Visual_Extraction.md`. "Live data" means `apple-scroll-starter/src/data/*.ts` (scraped from the public jrew.co.in, not in the brochure, flagged). Anything marked NEEDS INPUT is not written by me.

### Home

| Block | Copy source | Image source |
|---|---|---|
| Hero headline "PRECISION ENGINEERING FOR TOMORROW'S MACHINERY", strapline "ENGINEERING-LED MANUFACTURING · SINCE 1973" | Spread 12-right | `p01_x197` plant exterior 2768x1958 |
| Hero lede | Spread 01-right intro: "Fifty years of building the parts that carry the load..." | |
| Hero CTAs "Request a quote", "See capabilities" | Labels mine; intents from Spread 12-left CTA | |
| Six stats and four-row table | Spread 02-left | |
| Four sectors, copy per card | Spread 02-right | Line art: vector export from spread 02 of the print PDF (see risks) |
| Six families names and one-line specs | Spread 04-left (masts, axles), 04-right (structural and precision), 05 (attachments), 06-left (forged, profiles), 06-right (STAKON) | Cut-outs `p04_x14`, `p04_x15`, `p05_*`, `p06_x52..54`, `p06_x56` |
| Eight component cards, OEM and "why it matters" | Spread 04-right table, verbatim | `p04_x17..x29` |
| Plate to Product teaser rows | Spread 07-right | `p07_x73` laser cutting |
| Sole-supplier sentence | Spread 11-right intro | |
| 24 customer logos | Spread 11-right list | Vector export from spread 11 (see risks) |
| Awards: Caterpillar SER 2023, 2024, 2025; JCB; CII x Godrej; Godrej; ET NOW | Spread 11-left | `p11_x140..x144` |
| Five certification chips, certifier line | Spread 09-right | |
| 0 PPM / APQP+PPAP / Quality Circles | Spread 08-right panel | `p08_x80` robotic welding |
| Four facility cards, Rajpura 600,000 sq ft 2027, Epicor 2026 | Spread 07-left, Spread 10-left panel | `p07_x69..x72` |
| Four numbered reasons | Spread 12-left, verbatim | |
| "Let's engineer together." and sub-line | Spread 12-left | |
| Footer association logos (iCEMA, Make in India, GreenCo, CII, TUV Rheinland) | Spread 12-left | Vector export from spread 12 |
| Footer email enquiry@jrew.co.in, site jrew.co.in | Spread 12-left | |
| Footer phone, addresses, CIN, LinkedIn | Live data and `jrew-forge/src/lib/site.ts`: NEEDS INPUT to confirm | |

### Products

| Block | Source |
|---|---|
| Page header "Six families, one source." and intro | Spread 04-left |
| By-machine tabs: backhoe loaders, skid steers, telehandlers, forklifts, cranes, plus compactors, combine harvesters, rail | Spread 05 pills; Spread 02-right sector copy; Spread 04-right parts named per machine |
| Mast systems: 1.5-15 t, lift to 14 m, C and I profiles, four pills | Spread 04-left |
| Axle and steering assemblies: five variants incl. 300 kg BHL axle, 165 kg Caterpillar axle, motor-grader axle, JREW-designed 2WD steering axle adopted by Doosan Bobcat India and Preet Agro; 40,000+/yr, 10+ variants | Spread 04-left |
| Eight component cards | Spread 04-right |
| Attachments summary and link | Spread 05 intro and footer bar "100% export-inspected" |
| Forged products: hooks IS 15560 6.3-25 t SWL, forks 1-6 t 1,000-2,000 mm, profiles hot-rolled; materials, testing, applications, development strip | Spread 06-left |
| STAKON teaser | Spread 06-right |
| Product JSON-LD per family | Built from the above |

### Products / attachments

| Block | Source |
|---|---|
| Header "India's widest attachment range" and intro | Spread 05 |
| Five category pills as filter | Spread 05 |
| 14 cards: name, spec line, applications line | Spread 05 table, verbatim |
| Category assignment per card (which pills show which cards) | Inferred from spread 05 text: Man Basket and Precision Placer mount on Loadall or cranes; Skid Steer Pallet Fork on skid steers; Side Tilt-Rotate Carriage and Fork Frame on forklifts and telehandlers; grabs, shovels, forks on backhoe loaders. NEEDS INPUT: confirm the mapping |
| Card images | `p05_x33..x48` |
| Footer bar "A dedicated line, globally sourced, packaged and container-stuffed on JREW premises for North America and Europe. 100% export-inspected." | Spread 05 |

### STAKON

| Block | Source |
|---|---|
| Header "From components to complete machines" and intro | Spread 06-right |
| 6.3 m max lift, 2,000 kg max load; four bullets; 14 models | Spread 06-right |
| FE Series, SE Series, FEPT 2000 cards | Spread 06-right table |
| Stacker render | `p06_x56` transparent PNG |
| Link to STAKON site | `stakon.in` in both repos: NEEDS INPUT to confirm |

### Capabilities

| Block | Source |
|---|---|
| Header "Every stage engineered for repeatability" | Spread 07-right |
| Nine-row table | Spread 07-right, verbatim |
| "An engineering-first partner, from concept to production" and four steps | Spread 08-left |
| "Engineered proof. Proven in production." four rows | Spread 08-right |
| Case study: side-shifter carriage, JREW delivered, why it matters | Spread 09-left, OEM unnamed |
| Photos | `p08_x78`, `p08_x79`, `p09_x85`, `p09_x84`, `p07_x74` |

### Quality

| Block | Source |
|---|---|
| Header "Quality is engineered in, not inspected afterwards" and intro | Spread 09-right |
| Five chips and "ISO certifications by TUV Rheinland, Germany" | Spread 09-right |
| Inspection infrastructure, six rows | Spread 09-right |
| 0 PPM, APQP+PPAP, Quality Circles | Spread 08-right |
| People and progress: technical development, health, engagement | Spread 10-left |
| Certificate PDFs for download | NEEDS INPUT (files) |
| Photos | `p09_x86` FARO CMM, `p09_x87`, `p10_x94` |

### Facilities

| Block | Source |
|---|---|
| Header "Four units. Two states. One greenfield rising." and intro | Spread 07-left |
| Four unit cards: est. year, sq ft, description, key equipment | Spread 07-left, verbatim |
| Rajpura: 600,000 sq ft, ERP/MES-integrated, automation-ready, Phase 1 operations 2027 | Spread 10-left panel, Spread 03 |
| Epicor ERP 2026 | Spread 10-left panel |
| Street addresses | Live data: NEEDS INPUT to confirm mapping (C-99 MOH 1, C-97 MOH 2, Plot 128 Sector 25 vs Plot 238 Sector 58 for FBD 1 and FBD 2) |
| India map | dotted-map server SVG; plant coordinates Mohali 30.70 N 76.69 E, Faridabad 28.41 N 77.31 E, Rajpura 30.48 N 76.59 E from `jrew-forge/src/lib/site.ts` |
| Export regions text: North America, Europe and Asia, since 2010 | Spread 02-left |

### About

| Block | Source |
|---|---|
| "A single partner, from engineering to supply chain", intro, three arrow bullets | Spread 01-right |
| Vision, mission, ICARE, UPLIFT | Spread 01-left, verbatim |
| "Five decades of engineering progress", 18 milestones in three eras | Spread 03 |
| People and progress | Spread 10-left |
| "No business runs in isolation": founder Sh. Ram Ratan Agarwal, CSR three rows, ESG three cards, JREW Foundation, public limited since 1994 | Spread 10-right |
| Awards | Spread 11-left |
| Leadership: MD and Director | Live data `directors.ts`: OPTIONAL, NEEDS INPUT |
| Events: Bauma 2018 and 2023, EXCON 2019, MachAuto 2022, CII visit, customer visit, eye camp | Live data `events.ts`: OPTIONAL, NEEDS INPUT |
| Photos | `p01_x197`, `p02_x3`, `p10_x91..x93`, `p10_x95`, `p11_x140..x144` |

### Contact and careers

| Block | Source |
|---|---|
| RFQ families | The six brochure families plus STAKON and co-development |
| Quantity bands, drawing status, timelines | `jrew-forge/src/lib/site.ts` option sets (neutral, no claims) |
| "Response within 2 business days" | jrew-forge copy: NEEDS INPUT to confirm the SLA or drop |
| Plant addresses, phone | NEEDS INPUT |
| Careers areas | `jrew-forge/src/components/ui/CareerForm.tsx` list, edited to brochure functions |

### Not on the site (rails)

Crown, JLG, Sany, Toyota Material Handling, HAMM, Genie; any revenue share or margin; SLTP codenames; the side-shifter OEM's name; Godrej acquisition; EQI terms; PT Bhaskaran; OHSAS 18001; 200,000 or 210,000 sq ft totals; Rajpura 120,000 sq ft; +/-12 um; "approved since 2005" and "150 part numbers"; Knorr-Bremse, Tata Hitachi, Bull Machines, Cukurova, TIL, OM, MEL unless Raghav clears them.

---

## 3. Design directions

All three keep the brand constants: near-black and marigold, white, the two-tone headline device, eyebrow-and-rule grammar, left bars, alternating pale card fills, black proof panels, tabular numerals, real photography and cut-outs. All three weight apple-scroll-starter's mechanics over jrew-forge's identity, and all three take jrew-forge's server-rendered-first and reduced-motion discipline.

### The light-versus-dark decision, resolved

The printed brochure is ten light spreads and two black ones (the timeline and the cover). apple-scroll-starter is black-first and its audit found the darkness itself was the systemic failure. jrew-forge was graphite-first by design. The benchmarks split: the industrial majority is light (Stripe, Apple, Trumpf, Liebherr, Sandvik, Cascade, Bharat Forge, RKFL) and the dark sites are consumer or dev-tool brands (Linear, Rivian, Brembo, Linamar) [B-20].

Decision for the recommended direction: **light-first body with black chapters**, which is exactly the brochure's own rhythm and the Apple pattern of a dark hero over a light page. It also solves two asset problems for free: the 24 logos and the product cut-outs are on white. Direction B inverts this deliberately for Raghav to compare.

A second tension surfaced during planning: **marigold type on white fails WCAG** (about 1.8:1, below the 3:1 floor for large text). The brochure gets away with it in print; the web cannot. Token rule for every direction: on light grounds marigold is a fill (highlight bar behind ink type, pills, rules, left bars, numerals' underscores), never type; on ink grounds marigold is type. The two-tone headline therefore has two states: on white, line two is ink type on a marigold highlight stroke; on black, line two is marigold type. Both states are brochure grammar (the yellow pills are ink-on-marigold; the cover is marigold-on-ink).

### Direction A: "Brochure, scrolled" (recommended)

- **Read:** B2B qualification site for sourcing engineers, in the printed brochure's own language, with apple-scroll-starter's scroll craft at three earned moments. Dials: VARIANCE 6, MOTION 5, DENSITY 5.
- **Theme scene:** a supplier-quality engineer at 10:40 on a Tuesday, office fluorescents, the brochure PDF open on the second monitor. The site must read as the same document.
- **Colour tokens (OKLCH, hex for reference):**
  - `--paper` oklch(1 0 0) #FFFFFF body
  - `--card-warm` oklch(0.965 0.005 80) #F6F4F0 alternating row fill (print's pale warm grey)
  - `--card-cool` oklch(0.955 0.006 240) #EEF1F5 alternating row fill (print's pale blue-grey)
  - `--line` oklch(0.90 0.004 80) #E3E1DC hairlines
  - `--ink` oklch(0.21 0 0) #1A1A1A body text, black panels
  - `--ink-2` oklch(0.42 0 0) #4A4A4A secondary text (7.8:1 on paper)
  - `--ink-3` oklch(0.53 0 0) #6B6B6B eyebrows and labels (5.3:1 on paper)
  - `--marigold` oklch(0.81 0.16 80) #F5B324 the only accent; fill on paper, type on ink
  - `--marigold-deep` oklch(0.70 0.15 75) #C98A12 hover state of marigold fills
  - `--on-ink` oklch(0.97 0.004 80) #F7F5F1 text on black panels; `--on-ink-2` #C9C5BC
  - Strategy: Committed. Marigold carries about 15 percent of the surface as highlight strokes, pills, bars and stat underscores; black panels carry about 20 percent.
- **Type:** Display **Poppins** 800 and 700, all caps, tracking -0.02em, `clamp(2rem, 5.2vw, 5.25rem)` (the closest Google Fonts face to the printed geometric grotesque; the PDF's text is outlined so the exact face cannot be read). Body **Source Sans 3** 400 and 600, 17px, 66ch, `text-wrap: pretty`. Numerals in Poppins with `font-variant-numeric: tabular-nums`. No monospace. Pairing axis: geometric display against humanist body.
- **Grid:** 12 columns, shell `max-w-[85rem]`, gutters `clamp(1.25rem, 4vw, 3.5rem)`, section padding `clamp(4rem, 8vw, 7.5rem)`. Headline blocks stack eyebrow, two-tone headline, lede (no split headers). Lists use the brochure's left bar and alternating fills. Tables are tables. Radius 4px on chips and inputs only; cards and panels are square like print.
- **Motion vocabulary:** (1) hero text entrance 0.6 s ease-out-expo then apple-scroll's pinned exit cascade over 80 percent of a viewport; (2) the marigold highlight stroke draws in left to right (scaleX, 0.5 s, once) as a headline enters; (3) stat numerals count up scrubbed over their own scroll window, server HTML ships the final value; (4) the timeline rail pins and pans horizontally on desktop, vertical list on mobile; (5) sector line art draws itself (stroke-dashoffset) on entry; (6) attachment filter crossfades with layout animation; (7) nav flips from transparent-over-hero to white with a hairline. Reduced motion: everything static, Lenis never constructed. Easing `cubic-bezier(0.16, 1, 0.3, 1)`, durations 0.4 to 0.85 s, staggers 50 to 70 ms.
- **Signature element:** the **marker stroke**: the marigold highlight that backs the closing phrase of every section headline and draws in as the section arrives; on black panels the phrase itself turns marigold. Secondary: the four machines drawing themselves in single-weight line art.
- **Why it suits a metals-and-tolerances audience:** it is the datasheet they already hold, at web scale. White grounds keep cut-outs, tables and 24 logos legible; black panels isolate the proof (0 PPM, the case study, the timeline); marigold marks the claim in each headline rather than decorating; numerals are tabular and quotable. Motion appears only where it sequences (timeline), quantifies (stats) or navigates (sub-nav, nav flip).

### Direction B: "Black plate"

- **Read:** apple-scroll-starter's dark cinematic continuity, corrected. Dials: VARIANCE 7, MOTION 7, DENSITY 4.
- **Theme scene:** the same engineer at 19:00, lights low, the cover spread and the timeline spread as the body of the site, the light spreads as chapters.
- **Colour tokens:** `--plate` oklch(0.17 0 0) #121212 body; `--plate-2` #1A1A1A and `--plate-3` #222222 for section variation (the audit's fix); `--on-plate` #F4F2EE; `--on-plate-2` #B8B4AD (7:1); `--line` #2E2E2E; `--marigold` #F5B324 as type and fill; light "sheet" chapters `--sheet` #FFFFFF and `--sheet-2` #F6F4F0 for the product catalogue, logo wall, tables and facility cards, with `--ink` #1A1A1A type. Strategy: Drenched dark with light sheets.
- **Type:** Display **Manrope** 800, all caps, tracking -0.025em, ceiling 5.5rem; body **Source Sans 3**; tabular numerals. Light type on dark gets line-height +0.05.
- **Grid:** as A, with wider section padding (`clamp(5rem, 10vw, 9rem)`) and edge-to-edge sheets.
- **Motion vocabulary:** A's set plus apple-scroll's sector crossfade chapter (pinned, four line-art machines swapping on scrub) and the horizontal product gallery for the eight component cards. One pin per page maximum stays the rule.
- **Signature element:** the **plate**: content sits on machined black plates and the second headline line is marigold everywhere, because dark passes contrast.
- **Why it suits the audience:** dramatic, continuous with the site Raghav likes, and the cover and timeline spreads look this way. Cost: the brochure is ten light spreads to two dark; every catalogue, logo and table becomes a theme flip; the v1 audit's contrast discipline must be enforced token by token; photos need scrims.

### Direction C: "Datasheet"

- **Read:** the engineering-document register, lowest motion. Dials: VARIANCE 4, MOTION 3, DENSITY 6.
- **Theme scene:** the engineer prints the page. White ground, pale warm and cool rows exactly as the brochure's card fills, hairlines, the footer the only black.
- **Colour tokens:** A's palette without the black chapters; marigold as fills only.
- **Type:** Display **Archivo** 800 at width 112 (jrew-forge's face, upright and wide) with body **Source Sans 3**; numerals in **Geist Mono** inside tables and spec lines only, justified by the technical register.
- **Grid:** denser 8-column content grid inside the 12; definition lists and tables dominate; sticky sub-nav on every long page.
- **Motion vocabulary:** count-ups and crossfades only; native scroll, no Lenis, no pins.
- **Signature element:** the **spec card**: every part presented with the brochure's black name plate, a two-column spec and application list, and a left bar that fills as the card enters.
- **Why it suits the audience:** the purest for a sourcing engineer and the fastest to load. Cost: weakest brand impression, leaves apple-scroll's craft unused, risks reading as a catalogue template.

### Recommendation

Direction A. It is the only one that is recognisably the 2026 brochure, passes contrast without abandoning marigold, keeps logos and cut-outs on white, and still spends apple-scroll-starter's craft where the benchmarks say motion earns its place. If Raghav wants more of B's drama, A can take B's pinned sector chapter as a fourth motion moment without changing tokens.

---

## 4. Component inventory

### Reused from apple-scroll-starter (mechanics, restyled)

| Component | What is kept | What changes |
|---|---|---|
| `JrewHero` pinned exit timeline | pin + scrub + staggered exits | light nav flip, cover-spread composition, no scroll cue, no dimmed words |
| `StickySection` | pin scaffold with `onTimeline` | used once per page at most |
| `SectorsShowcase` | pinned crossfade mechanic | Direction B only, with line art instead of photos |
| `ProductsShowcase` horizontal cards | gallery layout | Direction B only |
| `CategoryFilter` | pill filter with parent state | `aria-pressed`, keyboard, brochure pill styling |
| `ProductModal` | Esc, arrow keys, body scroll lock | replaced by native `<dialog>` (jrew-forge pattern) keeping the key handling |
| `MilestonesTimeline` | data-driven rail idea | rebuilt as the three-era horizontal rail |
| `Navbar` | transparent-to-solid on scroll, mobile overlay as sibling | GSAP body trigger replaced with a ScrollTrigger on the hero; light theme |
| `JrewFooter` | five-band structure, locations grid | back-cover composition, association logos, no `#` links |
| `robots.ts`, `sitemap.ts`, `jsonld.ts` | AI-crawler allowlist, builders | new routes, brochure facts |
| `api/contact`, `api/careers` | nodemailer contract with console fallback | unchanged contract |
| `SubpageHero` | page header idea | replaced by `PageHeader` with two-tone headline |

### Reused from jrew-forge (verbatim or near)

`SmoothScrollProvider` (GSAP ticker owns Lenis, reduced-motion bypass, fonts-ready refresh), `Reveal`, `KineticNumber`, `RfqFlow` + `lib/rfq.ts` + tests, `EnquiryForm`, `CareerForm`, `ProductsCatalog` dialog pattern, `hooks.ts`, `scripts/verify.mjs` (extended), `probe-rfq-failure.mjs`.

### New

`TwoToneHeading` (with highlight-stroke motion and ink/marigold state), `Eyebrow` (rationed), `SectionShell`, `BarRow` and `AltRows` (left bar, alternating fills), `StatBand`, `FamilyGrid`, `ComponentStoryGrid`, `ProcessTable`, `CertChips`, `LogoWall` (SVG logos), `AwardsStrip`, `WhyJrew`, `FacilityCards`, `IndiaMap` (dotted-map server SVG), `TimelineRail` (horizontal pin, vertical fallback), `MachineLineArt` (SVG from the PDF), `AttachmentCatalog` (filter + dialog + Product JSON-LD), `ByMachineTabs`, `StakonBand`, `PageHeader`, `StickySubnav`, `Footer`, `DownloadList`, `ContentRailsTest` (data integrity tests).

Data layer: `src/data/brochure/*.ts` written fresh from the extraction (stats, sectors, families, components, attachments, forged, stakon, process, partnership, proof, caseStudy, quality, facilities, milestones, people, csr, esg, awards, customers, whyJrew), each record carrying a `source: "Spread NN"` field so the content map is machine-checkable.

---

## 5. Tech stack

| Layer | Choice | Note |
|---|---|---|
| Framework | Next.js 16.2.x App Router, React 19.2, TypeScript 5 | Same as both reference repos; server components by default, client islands for motion |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`, tokens in `@theme inline` over OKLCH CSS variables | Verified against current docs via context7 |
| Scroll motion | GSAP 3.14 + `@gsap/react` (`useGSAP`, `gsap.matchMedia` for reduced motion), Lenis 1.3 with `autoRaf: false` driven by the GSAP ticker | Contract verified via context7; Lenis never constructed under reduced motion |
| UI motion | framer-motion 12 | Kept as `framer-motion` so jrew-forge's `RfqFlow`, `Navbar` overlay and dialog transitions port unchanged; `motion/react` migration is a later refactor |
| 3D | none | Deviation from the default list: the brochure supplies photography, cut-outs and line art; WebGL added a 300 KB bundle and the graphite identity to v2, and the benchmark's canvas-only site (Igloo) rendered blank. The `three@0.182.0` pin note is recorded for any future scene |
| Map | dotted-map 3 rendered server-side to inline SVG | India footprint only |
| Forms | nodemailer 8 behind `/api/contact` and `/api/careers`; console fallback when SMTP is unset | Existing contract |
| Fonts | `next/font/google`: Poppins, Source Sans 3 (A); Manrope (B); Archivo, Geist Mono (C) | `display: swap`, subsets latin |
| Images | `next/image`, AVIF/WebP, hero preloaded with `priority`, source assets copied from `extracted-assets/` and downsized to at most 2400 px | Case-exact paths audited by test |
| Tests | vitest 4 (rfq lib, data integrity, content rails), Playwright 1.59 + `@axe-core/playwright` (gates), Lighthouse 12 via `npx lighthouse` | Chromium already installed |
| Tooling | pnpm 10, Node 20.20.1, ESLint 9 with `eslint-config-next` | Same as reference repos |
| Dev server | `jrew-v3` in `~/.claude/launch.json`, port 3200 | 3001 and 3100 are taken |
| Hosting | brand-new Vercel project, preview deploy only | Never `prj_nX56I20mK34TOOyN9YZi73S22LZf`; never touch `jrew.co.in` DNS |

---

## 6. Verification plan (Phase 5 gates)

Ported from `jrew-forge/scripts/verify.mjs` and extended. Every gate prints PASS or FAIL with the evidence; QA-REPORT.md pastes the output.

| Gate | Check | Pass condition |
|---|---|---|
| G1 | `pnpm build` | exit 0, all routes prerendered, zero TypeScript errors |
| G2 | `pnpm lint` | 0 problems |
| G3 | `pnpm test` (vitest) | rfq lib; data integrity: every image path exists case-exactly, 24 customers, 14 attachments, 18 milestones, 8 components, 9 process rows; content rails: no em or en dash in data or components, none of Crown, JLG, Sany, Toyota, HAMM, Genie, Trion, Quadron, HR-7, Lyfton, Bhaskaran, OHSAS, "of Revenue", "[Year]", "TBD", "lorem" |
| G4 | Playwright console + pageerror per route, desktop and 390 px | 0 after filtering headless GL chatter |
| G5 | Playwright network per route | 0 responses >= 400, including every image |
| G6 | Raw HTML fetch per route without JS | every section heading, every stat value and every table row present in server HTML |
| G7 | axe-core per route, plus skip link first tab stop, dialog Esc, filter `aria-pressed`, sub-nav keyboard, 44 px targets under `pointer: coarse` | 0 serious or critical violations |
| G8 | Reduced-motion context | 0 `.pin-spacer`, no `lenis` class, all content visible, timeline vertical, stats at final values |
| G9 | Screenshots at 390, 768, 1440, 1920 for every route to `screenshots/` | 0 px horizontal overflow at 390 |
| G10 | Forms | RFQ happy path (console fallback logs payload); RFQ with `fetch` rejected shows the error banner with entries intact; enquiry and careers show per-field errors and refuse submit; careers refuses without resume |
| G11 | Link sweep | every internal `href` in every route resolves 200; external links carry `rel="noopener noreferrer"` |
| G12 | SEO | unique title and description per route, canonical set, `sitemap.xml` and `robots.txt` 200, OG image 200, JSON-LD on every page parses and contains `Organization`, `BreadcrumbList` on subpages, `Product` on products and attachments |
| G13 | Lighthouse desktop and mobile on `/`, `/products/attachments`, `/contact` | LCP < 2.5 s, CLS < 0.1, accessibility >= 95 |
| G14 | Design rails | eyebrow count per page <= ceil(sections / 3); no marigold type on light grounds (computed style audit); no CTA label wraps at 1440; no two CTAs with the same intent on a page |
| Motion audit | `design-motion-principles` audit mode over every animation | findings fixed or justified in QA-REPORT.md |

Rounds (Phase 6): round 1 correctness (G1 to G12 green), round 2 craft (typography, rhythm, motion timing, copy, `superpowers:requesting-code-review`), round 3 adversarial sourcing-director read, then repeat until a full pass finds nothing new.

---

## 7. Risks and open questions

### Risks

| Risk | Mitigation |
|---|---|
| Customer logos, association logos and sector line art exist only as vector paths inside the 1.5 GB print PDF | Verified: PyMuPDF opens the file instantly, renders a 600 DPI region in 0.3 s, and spread 11 contains 783 vector drawings. Plan: export logo and line-art regions as SVG with `page.get_svg_image(clip)`, falling back to 600 DPI PNG crops; the 12 raster images on spread 11 are checked case by case. Raghav's vector files replace these if provided |
| Marigold type on white fails WCAG | Token rule: fill on paper, type on ink; two-state two-tone headline |
| Content volume against one idea per fold | Depth lives on six subpages; the home page is ten sections and under 9,000 px |
| Lenis and pins at 390 px | One pin per page, `anticipatePin`, `matchMedia` shortens or removes pins on mobile, verified by G8 and G9 |
| Unconfirmed addresses, phone, SLA | Shown as they appear on the live site today, listed under Needs input, easy to edit in one data file |
| SMTP not configured | Console fallback; forms never fail silently; preview deploy states this |
| Exact print typeface unknown (text outlined) | Poppins chosen by visual match; swap is a one-line `next/font` change |
| Hero photo weight | 2768 px source downsized to 2400 px AVIF, target under 350 KB, preloaded |
| Timeline pin length with 18 milestones | Pan distance computed from track width; vertical list on mobile and reduced motion |
| Brochure internal inconsistencies (MOH 2 2025 or 2026; mast 1.5-15 t or 1.5-5 t) | Use each figure only in its own spread's context; flagged for Raghav |

### Decisions made without asking

Six-item nav with a nav-level RFQ CTA; `/quality` as its own page; sectors on the home page and `/products`, not a page; events and leadership optional pending Raghav; no third-party analytics or consent banner in v1; `/privacy` as a factual notice about the forms; framer-motion kept over `motion/react` for component reuse; no WebGL.

### Needs Raghav's input

1. Design direction: A (recommended), B or C.
2. Which Faridabad plot is FBD 1 (2007, mother) and which is FBD 2 (2024, feeder); confirm C-99 is MOH 1 and C-97 is MOH 2.
3. Public phone number, LinkedIn URL, and whether "response within 2 business days" may be promised.
4. Leadership on About: founder only, or founder plus Rohit Grover (MD) and Vinita Grover (Director) from the live site.
5. Events on About: include the seven live-site events, or drop.
6. Customers beyond the 24: Knorr-Bremse, Tata Hitachi, Bull Machines, Cukurova, TIL, OM, MEL are on the live site but not in the brochure.
7. Steel grades for forks and hooks (42CrMo4, EN19 and similar) appear only in repo data; include or leave to the brochure's wording.
8. Vector logo and line-art files, or approval to extract from the print PDF.
9. Capability statement PDF and ISO certificate PDFs for the download links.
10. STAKON URL (stakon.in) and whether to link it.
11. MOH 2 established 2025 or 2026; mast family capacity range to quote on the Products page.
12. Attachment-to-machine mapping for the five filter pills (my inference is listed in the content map).
13. At deploy: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_EMAIL, CAREERS_EMAIL.