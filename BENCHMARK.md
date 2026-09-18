---
title: BENCHMARK
type: note
permalink: home/desktop/jrew/code/jrew-site-v3/benchmark-1
---

# BENCHMARK - competitor and best-in-class research for jrew.co.in v3

Date: 2026-09-18. Extends `02_Global_Best_Practices.md` (Apr 2026, brochure-oriented) with live-site structure captured on 18 Sep 2026. Method: 29 sites captured headlessly at 1440x900 (fold + full-page screenshots in `benchmark/screens/`, extracted nav, headings, forms and CTA labels in `benchmark/capture.json`, summary in `benchmark/capture-table.md`), plus 20 deep-dive visits in the built-in browser for the qualification path and for the eight sites that blocked automation (Cascade, Parker, Linamar, Siemens, Safran, Endurance, Sundaram Clayton, Igloo). Visual design was not copied from any site; only structure, qualification path, proof mechanics, native web elements, motion and performance posture were extracted.

## 1. Coverage

| Group | Site | Captured | Notes |
|---|---|---|---|
| Indian peer | Bharat Forge | headless + browser | Hero banners failed to load headlessly (broken image slots); chairman + vice-chairman portraits above the fold; Facilities as a nav group |
| Indian peer | CIE Automotive India | headless | Single-page brochure site, 180 DOM nodes, technology tiles, "Enquiry Form" in footer |
| Indian peer | Sundaram Clayton | headless | Splash page only (globe + language buttons) |
| Indian peer | Ramkrishna Forgings | headless + browser | Stat strip directly under hero (44 years, 22 plants, 23 countries, 333,400 MTPA), sector tiles, global-presence map, investor-heavy nav |
| Indian peer | Endurance Technologies | browser (Cloudflare blocked headless) | Persistent bottom utility bar: Partners / Product Finder / Enquiry / Dealer Locator / Download |
| Indian peer | Uno Minda | headless | Product-first mega menu, dark hero, 68-year counter, technology and innovation tiles |
| MH specialist | Bolzoni | headless + browser | Group profile + products by country + information request; events list; dated layout |
| MH specialist | Cascade | browser (Access Denied headless) | Video hero, 21 product families as flat tile grid, "Contact Cascade" on every page, "Why choose Cascade" with a concrete engineering anecdote, 27 pages of news on home |
| MH specialist | TVH | headless | Search-first hero, "Become a customer" CTA, four value props under hero |
| MH specialist | Hyster-Yale | headless + browser | Corporate and investor site; brands split Lift Trucks / Attachments (Bolzoni) / Energy |
| Component major | Linamar | browser (403 headless) | Dark cinematic hero, hamburger-only nav, four stats (37k+, 87, 19, 18), three segment tiles, investor dashboard |
| Component major | Martinrea | headless + browser | Four-slide hero, counters (2 decades, 10 countries, 57 locations, 16,000), product offerings with a 3D engine-block render |
| Component major | Parker Hannifin | browser (Access Denied headless; 404 page reached) | Footer utilities: CAD files, cross-reference tool, request a catalog, where to buy |
| Best-in-class | Hilti Group | headless + browser | Corporate group site: location chooser, news |
| Best-in-class | Trumpf | headless + browser | Product-first nav (Products / Solutions / Company), campaign slider with one CTA each, stats band, locations with contact |
| Best-in-class | Liebherr | headless + browser | Product programme as 13-icon grid, highlights grid, worldwide map, dark mega footer |
| Best-in-class | Atlas Copco Group | headless | 9,461 px editorial page, dark-green blocks, "The Group in 2025" stats, quotes |
| Best-in-class | Komatsu | headless + browser | 22-category equipment icon row directly under hero; "Get in touch" block with Contact / Request a quote / My Komatsu / Find a location |
| Best-in-class | Sandvik Coromant | headless + browser | Search-first, product category list, account gives 2D/3D drawings, "Make a quotation", catalogues |
| Best-in-class | SKF | headless + browser | Product landing with "Ask AI"; consent-heavy |
| Best-in-class | Siemens | blocked (human verification) | Not usable as evidence |
| Best-in-class | Safran | browser (Cloudflare blocked headless) | Mission headline + site search + news + expertise list + single "Contact us" |
| Web craft | Apple iPhone | headless + browser | Sticky family sub-nav, lineup comparison cards, horizontal feature scroller, 15,736 px page |
| Web craft | Linear | headless + browser | Dark, one message per fold, product UI as hero image, staggered reveals, 5,201 DOM nodes |
| Web craft | Stripe | headless + browser | Light, logo wall directly under hero, stats band (135+, US$1.8tn, 99.999%, 200M+), light/dark band alternation |
| Web craft | Igloo Inc. | blank in both (WebGL-only, no DOM content) | Confirms the risk of gating content behind canvas |
| Web craft | Rivian | headless | Full-bleed photography, giant single letters, dark/light alternation |
| Web craft | McLaren Racing (partners) | headless | Dark team site; partners page redirected to home |
| Web craft | Brembo (F1 supplier) | headless | "First Equipment: Success Stories" as OEM proof, solutions by vehicle type |

## 2. Comparison matrix

Legend for qualification path: number of clicks from the home page to (a) a spec or capability statement, (b) a certification, (c) a quote or RFQ entry. Estimated from nav and page text where the site was reached.

| Site | Nav model | Depth | Capability vs product | Qualification path (spec / cert / RFQ) | Proof mechanics | Native web elements | Motion | Perf and a11y posture |
|---|---|---|---|---|---|---|---|---|
| Bharat Forge | Hamburger mega menu, 8 groups | 3 | Separate: Facilities (process) vs Business (sector) | 2 / 2 / none (Contact only) | Leadership portraits, awards page, certifications page, financial results | Downloads (PDF) | Banner slider (broke headlessly) | 1,280 nodes; hero images not lazy-safe |
| Ramkrishna Forgings | Top nav + mega, investor-first | 3 | Separate: Facilities (process chain incl. Metallurgy, Heat Treatment) vs Industries | 2 / 2 / none | Stat strip, "India's biggest integrated" claim, certifications page | Sign in / Register portal, downloads | Hero slider | 736 nodes; stock icons |
| Uno Minda | Product-first mega menu | 3 | Products by system | 2 / 2 / Contact | 68-year counter, technology partners | Product search | Dark hero video | 873 nodes |
| Endurance | Hamburger + persistent bottom utility bar | 2 | Products by process (die casting, suspension, transmission, braking) | 1 / 2 / 1 (Enquiry in the bar) | Test-track imagery, news | Product Finder, Dealer Locator, Download in a persistent bar | Kinetic hero type | Cloudflare gate |
| Cascade | Top nav, product families grid | 2 | Products only; capability inside "Why choose Cascade" | 2 / n.a. / 1 (Contact Cascade on every page) | Concrete anecdote (Sweden port tower clamp), 80 years, 33 locations | Parts ordering, manual search, rental | Video hero | Bot wall on headless; heavy news feed |
| Bolzoni | Hamburger | 2 | Products by country selector | 2 / n.a. / 1 (Information request) | Group profile, events | Country selector, info request form | None | 985 nodes; dated |
| TVH | Top nav + search | 2 | Parts catalogue | 1 (search) / n.a. / 1 (Become a customer) | Four value props under hero | Parts search, 4 forms | Slider | 1,447 nodes |
| Linamar | Hamburger | 2 | Segments (Mobility, Access, Agriculture) | 2 / 2 / Contact | Four stats under hero, investor dashboard | None for buyers | Cinematic dark hero, reveal on scroll | 403 to bots |
| Martinrea | Top nav | 2 | Solutions vs Innovations | 2 / n.a. / Contact | Counters, 3D render of a product | None for buyers | Four-slide hero | 898 nodes; 8,795 px |
| Parker | Top nav + sign-in | 3 | Products by division | 1 / n.a. / Request a catalog | Distribution network | CAD files, cross-reference tool, request a catalog, where to buy | None | Bot wall |
| Trumpf | Product-first mega menu | 3 | Products vs Solutions vs Company | 2 / 2 / Contact | Stats band, since-1923, locations | Cost calculator, machine technical-data tables | Campaign slider, one CTA per slide | 1,594 nodes; consent wall |
| Liebherr | Hamburger + product programme grid | 3 | Product programme (13 icons) vs Components | 2 / 2 / Contact | 75 years, 55,000 employees, worldwide map | Location finder, used equipment marketplace | Numbered hero slider 01-05 | 1,498 nodes; consent wall |
| Komatsu | Top nav Products / Services / Technology / Company | 2 | Equipment icon row (22) vs Technology | 1 / n.a. / 1 (Request a quote tile) | Century heritage, Smart Construction | Request a quote, find a location, parts portal | Space hero, static | 1,119 nodes |
| Sandvik Coromant | Search-first + category list | 2 | Products by tool type vs Services | 1 (search) / n.a. / 1 (Make a quotation) | Account benefits list | Search, 2D/3D drawings behind account, catalogues, tool guide, quotation | Minimal | 1,036 nodes; consent wall |
| Atlas Copco | Top nav corporate | 3 | Business areas | 3 / 3 / Contact | Group stats, CEO quote | None for buyers | Long editorial scroll | 1,559 nodes; 9,461 px |
| Hilti Group | Hamburger, location chooser | 3 | Corporate only (products on country sites) | 3 / 3 / Contact via location | Sales growth headline, DGNB plant ratings | Location chooser | Static | 1,547 nodes; 18-partner consent wall |
| Safran | Hamburger + site search | 2 | Expertise list (5) | 2 / n.a. / Contact us | Press releases as proof | Search for all content | Static | Cloudflare gate |
| Apple iPhone | Global nav + sticky family sub-nav | 2 | Lineup vs features | n.a. | Comparison cards, pricing | Compare, sticky chapter nav, horizontal card scroller | Scroll-driven feature reveals | 4,421 nodes; 15,736 px |
| Linear | Top nav 5 items | 1 | Product features | n.a. | Customer logos, product UI itself | Live UI demos | Staggered entrances, one idea per fold | 5,201 nodes; 9.2 s to settle |
| Stripe | Top nav + mega | 2 | Products vs Solutions | n.a. | Logo wall directly under hero, stats band | Interactive demos | Gradient hero, light/dark alternation | 2,854 nodes; 14,613 px |
| Rivian | Minimal nav | 2 | Vehicles | n.a. | Photography | None | Full-bleed image transitions | 799 nodes |
| Brembo | Top nav by vehicle | 2 | Solutions by vehicle vs Racing | 2 / n.a. / Contact | "First Equipment: Success Stories" (OEM fitment proof) | Success-story index | Dark hero video | 1,378 nodes |

## 3. Findings that transfer

### 3.1 Information architecture

1. **Product-first, then capability, then company.** Komatsu (22-category icon row under the hero), Liebherr (13-icon product programme), Cascade (21 family tiles), Sandvik (category list) all put the product taxonomy in the first fold. The Indian peers invert this: Bharat Forge, RKFL and CIE lead with heritage, leadership and investor material, and the product taxonomy sits two clicks deep. Evidence: `benchmark/screens/komatsu-fold.png`, `liebherr-full.png`, Cascade products page visit, `ramkrishna-forgings-full.png`. Transfer: the six families (brochure spread 04) belong in the first or second fold of the home page.
2. **Capability is separated from product everywhere it is done well.** Bharat Forge and RKFL have a Facilities group (Design, Tool and Die, Forging, Machining, Testing, Quality) separate from Business or Industries; Trumpf separates Products from Solutions; Liebherr separates the product programme from Components. Transfer: a dedicated Capabilities page for the nine-row Plate to Product table, engineering partnership steps and process proof, distinct from Products.
3. **Flat, shallow trees win for time-poor buyers.** Best-performing qualification paths are depth 2 with at most 6 top-level items (Komatsu, Sandvik, Trumpf, Endurance). Sites with 8+ groups and investor-first menus (Bharat Forge, RKFL, Atlas Copco) push specs and certifications to depth 3. Transfer: six top-level items maximum, every spec and certificate reachable in two clicks.
4. **Quality and certifications earn a top-level entry on supplier sites.** Bharat Forge, RKFL and Hyster-Yale expose Certifications or Quality in the primary nav; component majors bury them. Transfer: a Quality page (certifications, inspection infrastructure, 0 PPM, APQP/PPAP) rather than folding quality into infrastructure as jrew-forge did.

### 3.2 Qualification path

5. **Typed entry points beat a single Contact link.** Komatsu's four-tile "Get in touch" block (Contact us / Request a quote / My Komatsu / Find a location), Endurance's persistent bar (Product Finder / Enquiry / Dealer Locator / Download) and Sandvik's "Make a quotation" reduce the buyer's decision at the point of intent. Transfer: RFQ, general enquiry, plant-visit request and downloads as distinct, always-visible entry points; the RFQ CTA lives in the nav on every page.
6. **Engineer utilities are the strongest signal of a serious supplier.** Sandvik (2D/3D drawings, catalogues, tool guide), Parker (CAD files, cross-reference tool, request a catalog), Trumpf (technical-data tables, cost calculator). Transfer: downloadable capability statement and certificate PDFs, spec tables that can be copied, and a filterable attachment catalogue with a specification line per item.
7. **Multi-step intake is acceptable when it mirrors the buyer's brief.** Sandvik's quotation flow and jrew-forge's tested RFQ lib both structure intake as family, requirements, contact. Transfer: keep the three-step RFQ with review and per-field errors; fall back to a two-field enquiry for everything else.

### 3.3 Proof mechanics

8. **A stat strip directly after the hero.** RKFL (44 years, 22 plants, 23 countries, 333,400 MTPA), Linamar (37k+, 87, 19, 18), Martinrea (2 decades, 10 countries, 57 locations, 16,000), Stripe (135+, US$1.8tn, 99.999%, 200M+), Trumpf. Every credible site quantifies scale within one fold of the hero. Transfer: the brochure's six snapshot stats (spread 02) directly under the hero, as tabular numerals.
9. **Logo wall directly under the hero, logos only.** Stripe places OpenAI, Amazon, NVIDIA and Ford under the hero with no captions; Linear likewise. Cascade and Bolzoni do not show customers at all. Transfer: the 24 brochure logos (spread 11) as an early trust band, plus the "sole supplier / direct-on-line" sentence once, above it.
10. **Named OEM fitment is the most persuasive proof.** Brembo's "First Equipment: Success Stories" and Cascade's one concrete anecdote (a Swedish port's tower clamp designed across two continents) outperform generic "quality" copy. Transfer: the eight component cards on spread 04 (each naming the OEM and why the tolerance matters) and the side-shifter case study get first-class, full-width treatment rather than a thumbnail grid.
11. **Certifications as labelled chips with the certifying body.** Trumpf and RKFL show certificate names; none show the body. The brochure's "ISO certifications by TUV Rheinland, Germany" is a stronger version. Transfer: five chips plus the certifier line, with PDF download where files exist.
12. **Footprint as a map with a plant list, not pins for every country.** Liebherr and RKFL pair a map with a location list. Transfer: an India map with the four plants and Rajpura, and export regions as text (North America, Europe, Asia since 2010), with no invented country pins.

### 3.4 Native web elements that outperform brochure translations

13. **Filterable catalogue.** Cascade's 21 families and Sandvik's category list are flat tile grids; neither filters in place. The brochure's five category pills on spread 05 already imply a filter over 14 attachment cards. Transfer: real filter buttons with `aria-pressed`, all cards server-rendered, filtering only hides.
14. **Capability matrix as a real table.** Trumpf's machine pages use technical-data tables; the brochure's nine-row Plate to Product table is the same object. Transfer: an HTML table with a sticky header on desktop and stacked rows on mobile, not prose or cards.
15. **Sticky chapter navigation on long product pages.** Apple's iPhone sub-nav lets a visitor jump between families without scrolling 15,000 px. Transfer: a sticky family sub-nav on the Products page (Masts / Axles / Components / Attachments / Forged / STAKON).
16. **Scroll-sequenced timeline.** Liebherr and RKFL have history pages as vertical lists; the brochure's three-era horizontal rail (spread 03) is richer. Transfer: a horizontal rail pinned and scrubbed on desktop, a vertical list on mobile and under reduced motion, all 18 milestones in the HTML.

### 3.5 Motion

17. **One idea per fold with a single CTA.** Trumpf's campaign slides and Linear's sections each carry one message and one action. Transfer: section discipline; no section with two competing CTAs.
18. **Motion earns its place at three kinds of moment:** revealing sequence (Apple feature scroller, Linear staggered entrances), quantifying (count-ups on stats), and navigating (sticky sub-nav state). Decorative motion (Martinrea's four-slide hero, Liebherr's numbered slider, Bharat Forge's broken banner slider) adds load time and hides content. Transfer: scroll-driven motion on the timeline, the stat band and the sector line art; no hero slider; every animated element present in server HTML.
19. **Canvas-gated content is a liability.** Igloo rendered as an empty grey page in both browsers; nothing indexable exists. Transfer: no WebGL, content complete before any animation runs.
20. **Light-first is the industrial majority; dark is used for chapters.** Stripe, Apple, Trumpf, Liebherr, Sandvik, Bharat Forge, RKFL, Cascade are light; Linear, Rivian, Linamar, Brembo, Uno Minda are dark. Stripe, Apple, Atlas Copco and Rivian alternate light and dark bands for rhythm. Transfer: light body with black panels as deliberate chapters, which is also exactly the printed brochure's grammar (spreads 03 and 12 are black, the rest light).

### 3.6 Performance and accessibility posture

21. DOM size ranged from 180 nodes (CIE) to 5,201 (Linear); industrial sites cluster at 900 to 1,600 nodes and 3,500 to 9,500 px page height. Time to settle after DOMContentLoaded plus 2.5 s ranged 3.7 s (Endurance, blocked) to 9.2 s (Linear). Consent walls covered the first fold on 12 of 29 sites and were the main first-impression defect. Transfer: no third-party analytics or consent wall in v1 of this site; budget under 1,500 DOM nodes on the home page; LCP image preloaded; page heights under 9,000 px.
22. Bot walls (Cascade, Parker, Linamar, Siemens, Safran, Endurance) and blank WebGL pages (Igloo) mean those sites are invisible to crawlers and AI search. Transfer: server-rendered HTML, `robots.ts` allowlist carried from v1, JSON-LD on every page.

## 4. Ranked patterns to adopt

| Rank | Pattern | Evidence | Brochure source it serves |
|---|---|---|---|
| 1 | Six product families in the first two folds, as a grid that links to spec sections | Komatsu, Liebherr, Cascade, Sandvik | Spread 04 |
| 2 | Stat strip directly under the hero, tabular numerals, no card chrome | RKFL, Linamar, Martinrea, Stripe, Trumpf | Spread 02 |
| 3 | RFQ as a nav-level CTA plus typed entry points (RFQ / enquiry / visit / downloads) | Komatsu, Endurance, Sandvik | Spread 12-left CTA |
| 4 | Named-OEM component proof, full-width, one card per fold or in a two-column story grid | Brembo, Cascade anecdote | Spread 04-right |
| 5 | Logo wall directly under the hero region, logos only, sole-supplier line once | Stripe, Linear | Spread 11-right |
| 6 | Capabilities page with the nine-row process table as a real table | Trumpf technical data, Bharat Forge and RKFL Facilities group | Spread 07-right, 08 |
| 7 | Quality page with certifier-labelled chips and PDF downloads | RKFL, Bharat Forge, Trumpf; Sandvik and Parker utilities | Spread 09-right |
| 8 | Filterable attachment catalogue with a spec line per card | Cascade families, Sandvik categories, brochure pills | Spread 05 |
| 9 | Horizontal timeline rail, scrubbed on desktop, vertical on mobile | Liebherr and RKFL history pages (as the weaker baseline) | Spread 03 |
| 10 | Sticky family sub-nav on the Products page | Apple iPhone | Spread 04 to 06 |
| 11 | Footprint as India map plus plant list, export regions as text | Liebherr, RKFL | Spread 07-left, 02 |
| 12 | Light body with black chapter panels | Stripe, Apple, Atlas Copco, the brochure itself | Spreads 03, 08, 09, 12 |
| 13 | One idea per fold, one CTA per section, no hero slider | Trumpf, Linear; anti-evidence Martinrea, Bharat Forge | All |
| 14 | No consent wall, no canvas-gated content, complete server HTML | Igloo (negative), 12 consent walls (negative) | n.a. |

## 5. Patterns to avoid

- Investor-first navigation and chairman portraits above the fold (Bharat Forge, RKFL, Hyster-Yale): the site's audience is a sourcing engineer, not a shareholder.
- News feeds on the home page (Cascade's 27 pages, Trumpf, Liebherr, Safran): JREW has no newsroom; events are optional and belong on About.
- Hero sliders (Bharat Forge, Martinrea, Trumpf, Liebherr): they hide the value proposition and broke headlessly.
- Splash pages and language gates (Sundaram Clayton, Hilti location chooser).
- Stock icons and clip-art stats (RKFL), text-only logo walls, tiny white-box logo JPEGs (v1).
- Canvas-only heroes (Igloo) and custom cursors (jrew-forge).
- Consent walls covering the first fold; the site will not ship third-party tracking.

## 6. Brochure-implied patterns checked against the benchmarks

| Brochure element | Benchmark verdict |
|---|---|
| Spread 05 category pills as a filter over 14 attachments | Confirmed: Cascade and Sandvik present taxonomies as tile grids and lists but neither filters in place; a real filter is a step beyond the category leaders and matches the brochure's own UI |
| Spread 07 nine-row process table | Confirmed: Trumpf's technical-data tables are the credible form; RKFL and Bharat Forge split the same content into a Facilities sub-menu, which adds clicks |
| Spread 03 three-era timeline as a scroll sequence | Confirmed as differentiator: Liebherr and RKFL bury history in a list page; a scrubbed rail on the About page with all 18 milestones in HTML is both indexable and distinctive |
| Spread 04 eight component cards naming OEMs | Confirmed as the single strongest proof: Brembo's success stories are the only comparable device found; treat as a full-width story grid, not thumbnails |
| Spread 11 24 logos plus sole-supplier line | Confirmed: Stripe and Linear place logos under the hero; the sole-supplier sentence is unique to JREW and should appear once, above the wall |
| Spread 12-left four numbered reasons | Confirmed: Cascade's "Why choose Cascade" and TVH's four value props sit before the contact CTA; the four reasons become the pre-RFQ section on the home page and the Contact page |