---
title: DESIGN
type: note
permalink: home/desktop/jrew/code/jrew-site-v3/design
---

# DESIGN.md - jrew.co.in v3 visual system (as built)

Direction A, "Brochure, scrolled". Light-first paper with black chapter panels, the printed 2026 Corporate Profile's grammar carried to the web. Approved by Raghav at Gate 1 on 2026-09-19.

## Theme

One theme, light. Black is used for chapters, not as a mode: the hero (the cover), the Plate to Product chain, the 0 PPM proof panel, the timeline (spread 03 is black in print), the Rajpura panel, the footer (the back cover). Sections never invert mid-thought; a black chapter is a whole section.

Scene: a supplier-quality engineer at 10:40 on a Tuesday under office fluorescents, with the brochure PDF open on the second monitor. The site must read as the same document.

## Colour

Tokens live in `src/app/globals.css` as OKLCH on `:root`, exposed to Tailwind through `@theme inline`.

| Token | OKLCH | Reference | Role |
|---|---|---|---|
| `--paper` | 1 0 0 | #FFFFFF | body |
| `--card-warm` | 0.965 0.005 80 | #F6F4F0 | alternating row fill (print's pale warm grey) |
| `--card-cool` | 0.955 0.006 240 | #EEF1F5 | alternating row fill (print's pale blue-grey) |
| `--line` | 0.90 0.004 80 | #E3E1DC | hairlines |
| `--line-strong` | 0.80 0.004 80 | | input borders |
| `--ink` | 0.22 0 0 | #1A1A1A (print) | text, plates, panels |
| `--ink-2` | 0.42 0 0 | #4A4A4A | secondary text, 7.8:1 on paper |
| `--ink-3` | 0.53 0 0 | #6B6B6B | eyebrows and labels, 5.3:1 on paper |
| `--ink-panel` | 0.22 0 0 | | chapter background |
| `--ink-panel-2` | 0.27 0 0 | | hover on ink |
| `--ink-line` | 0.36 0 0 | | hairlines on ink |
| `--on-ink` | 0.97 0.004 80 | #F7F5F1 | text on ink |
| `--on-ink-2` | 0.80 0.004 80 | | secondary text on ink, 9.5:1 |
| `--on-ink-3` | 0.66 0.004 80 | | labels on ink, 6:1 |
| `--marigold` | 0.83 0.16 81 | #FBBA2D (print) | the only accent |
| `--marigold-deep` | 0.70 0.15 75 | #C98A12 | hover of marigold fills; small numerals on paper |
| `--marigold-soft` | 0.95 0.06 85 | | reserved |

**The marigold rule.** On paper, marigold is a fill: the highlight behind a headline phrase, pills, bars, stat underscores, buttons. It is never type on paper (about 1.8:1, below WCAG). On ink, marigold is type. Both states are printed grammar: the pills are ink-on-marigold, the cover is marigold-on-ink. The gate harness checks this (G14).

Strategy: Committed. Marigold carries roughly 15 percent of the surface, black chapters about 20 percent.

## Typography

- Display: **Poppins** 800 (700 for `.display-md`), all caps for `.display`, tracking -0.02em, line-height 1.02, `clamp()` ceilings 5.5rem (hero) and 3rem (section headings). Closest Google Fonts face to the printed geometric grotesque; the print text is outlined so the exact face cannot be read.
- Body: **Source Sans 3** 400 and 600, 17px, line-height 1.55, measure 56 to 66ch.
- Numerals: Poppins with `font-variant-numeric: tabular-nums lining-nums` (`.tnum`) wherever digits appear.
- Pairing axis: geometric display against humanist body. No monospace.
- `text-wrap: balance` on h1 to h3, `pretty` on paragraphs.

## The two-tone headline

`TwoToneHeading` renders a lead phrase and a marked phrase. On paper the marked phrase is ink type on a marigold highlight (`.hl`, background-size animated from 0 to 100 percent once on entry, following line wraps via `box-decoration-break: clone`). On ink the marked phrase is marigold type. The cover uses the marked phrase first (`markFirst`).

## Eyebrow

`.eyebrow`: Source Sans 600, 13px, tracking 0.14em, uppercase, `--ink-3`. Rationed: it appears only where the printed spread carried one and the section opens a chapter, at most ceil(sections / 3) per page. The harness counts it.

## Card grammar (from print)

- Left bar (`.bar`, 4px ink; `.bar-marigold`) on list rows, alternating with `--card-warm` and `--card-cool` fills.
- Ink name plate with marigold part name and white customer (component cards).
- Marigold pill with ink text for product names (attachments).
- Certification chips: ink plate, marigold code, small uppercase scope.
- Hairline grids: `gap-px` on a `--line` (or `--ink-line`) background.
- Square corners everywhere; 0 radius. The brochure has none.

## Layout

12-column intent, shell `max-width: 85rem`, gutters `clamp(1.25rem, 4vw, 3.5rem)`, section padding `clamp(4rem, 8vw, 7.5rem)`. Headline blocks stack eyebrow, heading, lede. Nav 72px. Sticky sub-nav on Products at 72px. Everything verified at 390, 768, 1440 and 1920.

Z-scale: nav 40, sticky sub-nav 30, dialog 60 (native `<dialog>`), skip link 100.

## Motion

Weighting: Jakub Krehel primary (production polish), Emil Kowalski secondary (restraint on nav, filters, forms), Jhey Tompkins only for the timeline rail.

| Moment | Mechanism | Purpose |
|---|---|---|
| Hero entrance | GSAP stagger 80ms, 0.7s expo.out, y 22 and autoAlpha | orientation |
| Hero exit (lg only) | one pin per page, +55 percent, scrub | sequence into the stat band |
| Marker stroke | background-size 0 to 100 percent, 0.6s expo.out, once | marks the claim in each headline |
| Stat count-up | scrubbed proxy over the element's own window; SSR ships the final value | quantifying |
| Sector line art | clip-path wipe left to right, 1.1s expo.out, once | drawing the machine |
| Section reveals | `Reveal`: y 24 and autoAlpha, 0.7s, stagger 50 to 80ms, once, only on lists | reading order |
| Timeline rail (lg only) | pinned horizontal pan, scrub 0.6 | the three eras as a sequence |
| Nav flip | class swap, 300ms colour transition | state |
| Filter and tabs | instant (Emil) | high frequency |
| RFQ steps | 0.28s crossfade with 10px y | state transition |
| Buttons | 1px press on active, 200ms colour | feedback |

Rules: transform, opacity, clip-path and background-size only; easing `cubic-bezier(0.16, 1, 0.3, 1)`; exits subtler than entrances; nothing loops; every effect is inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`, and Lenis is never constructed under reduced motion. Content is complete in server HTML before any effect runs (G6, G8).

## Components

Chrome: `Navbar`, `Footer`. Primitives: `TwoToneHeading`, `Eyebrow`, `SectionShell`, `Button`, `PageHeader`, `StickySubnav`, `Reveal`, `KineticNumber`, `Wipe`, `ProcessTable`, `IndiaMap`, `TimelineRail`, `ByMachineTabs`, `AttachmentCatalog`, `RfqFlow`, `EnquiryForm`, `CareerForm`, form primitives. Sections: `Hero`, `StatBand`, `Sectors`, `FamilyGrid`, `ComponentStories`, `ProcessChain`, `Trusted`, `QualityBand`, `FacilityStrip`, `WhyJrewRfq`, `StakonBand`.

## Assets

- Photography: 60 brochure images staged to `public/images/**` at up to 2400 px, JPEG q82, named by subject (`scripts/prepare-images.py`).
- Logos: 24 customer marks and 6 association marks extracted as standalone SVGs from the print PDF's vector paths (`scripts/extract-vectors.py`), optimised with svgo.
- Line art: the four machines from spread 02 as SVG (413 KB total after optimisation).
- Wordmark: `public/brand/jrew-logo-on-ink.svg` (cover) and `jrew-logo-on-paper.svg` (recoloured).