---
title: MOTION-AUDIT
type: note
permalink: home/desktop/jrew/code/jrew-site-v3/docs/motion-audit
---

# Motion audit, jrew-site-v3

Audit mode of the design-motion-principles skill, run 2026-09-19 against the as-built site before QA round 2. Weighting: Jakub Krehel's principles are primary (purpose, restraint, asymmetry of enter and exit, motion never gating content), Emil Kowalski's are secondary (durations, easing families, one property per intent, reduced motion as a first-class state), and Jhey Tompkins' work informs the scroll-pinned timeline only.

The site is a supplier's catalogue read by sourcing directors and engineers, so the register is "quiet and mechanical". Motion should feel like a well-damped machine: nothing bounces, nothing loops, nothing waits on the reader.

## 1. Inventory (as built)

| # | Where | Effect | Trigger | Duration | Ease | Reduced motion |
|---|---|---|---|---|---|---|
| M1 | Whole site | Lenis smooth scroll, lerp 0.1, GSAP ticker owns RAF | always | continuous | linear interpolation | Lenis never constructed |
| M2 | Home hero | copy stagger in: y 22 to 0, alpha 0 to 1, stagger 0.08, delay 0.1 | mount | 0.7 s | expo.out | skipped (matchMedia) |
| M3 | Home hero | photograph scale 1.04 to 1, alpha 0 to 1 | mount | 1.1 s | expo.out | skipped |
| M4 | Home hero, lg only | pinned exit: copy y -60 and fades, photo y -30, over 55 percent of viewport | scrub | scroll-bound | none | skipped |
| M5 | Two-tone headings on paper | marker stroke draws in: background-size 0 to 100 percent | enters 85 percent | 0.6 s | expo.out | skipped (final state in CSS) |
| M6 | StatBand, ComponentStories, Trusted | Reveal: y and alpha in, once | enters 88 percent | 0.55 s | expo.out | skipped |
| M7 | StatBand numbers | KineticNumber count-up, scrubbed between 90 and 45 percent | scrub 0.5 | scroll-bound | none | final value in HTML |
| M8 | Sectors, ComponentStories | Wipe: clip-path inset right 100 to 0 percent, once | enters 80 percent | 1.1 s | expo.out | skipped |
| M9 | About timeline, lg only | TimelineRail pinned horizontal scrub, anticipatePin, invalidateOnRefresh | scrub 0.6 | scroll-bound | none | vertical list, no pin |
| M10 | Navbar | background and border colour on scroll past hero | state | 0.3 s | default | CSS kill switch |
| M11 | Navbar hamburger | two bars rotate into a cross | state | 0.2 s | default | kill switch |
| M12 | Navbar mobile overlay | drop-in: y -8 to 0, alpha 0 to 1, unmount is instant | mount | 0.22 s | ease-out (custom) | kill switch |
| M13 | RFQ step panels | rise-in: y 10 to 0, alpha 0 to 1, only after the first step change | mount per step | 0.28 s | ease-out | kill switch |
| M14 | Native dialogs | dialog-in: y 6 to 0, alpha | open | 0.22 s | ease-out | kill switch |
| M15 | Buttons, pills, tabs | colour transitions, active translate 1 px | hover, active | 0.2 s | expo-out | kill switch |
| M16 | Skip link | top position | focus | 0.2 s | default | kill switch |

Kill switch: `@media (prefers-reduced-motion: reduce)` collapses every animation and transition to 0.01 ms, and no GSAP tween runs outside a `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` block. Verified by gate G8 (reduced-motion context: no pin spacers, no `lenis-on` class, every section visible, timeline vertical, stats at final values).

## 2. Findings and what changed

Findings are graded against the primary principles first. "Fixed" means the change is in the tree at the commit noted.

### F1. Reveal was applied to too many sections (Jakub: restraint; every entrance costs attention)

Before the audit ten section wrappers carried `Reveal`, so nearly every scroll position had something fading in. Sourcing directors skim; the page must be readable at any scroll speed. Fixed in commit 0c0410e: `Reveal` now wraps only StatBand, ComponentStories and Trusted, the three sections whose content benefits from being introduced (a number band, a story grid, a logo wall). Everything else is static on scroll.

### F2. Attachment cards scaled on hover (Jakub: content never moves under the pointer)

`group-hover:scale-[1.03]` on catalogue photographs made 14 images shift while a reader scanned specifications. Fixed in 0c0410e: hover is a border and colour change only.

### F3. Reveal duration 0.7 s read as slow (Emil: 0.2 to 0.6 s for most UI, longer only for large spatial moves)

Reduced to 0.55 s in 0c0410e. The hero (M2, M3) keeps 0.7 s and 1.1 s because it is a one-time page opening and the photograph is large.

### F4. Mobile menu had no exit and the dialogs appeared instantly (Emil: enter with intent, exit faster or not at all)

The overlay used framer-motion `AnimatePresence` for a 0.22 s enter and a 0.22 s exit. framer-motion was the only reason a 134 KB chunk shipped on every route. Replaced in 98cdd02 with a mount-only CSS keyframe (`.anim-drop`, 0.22 s) and an instant unmount. Instant exit is the deliberate choice: the reader has already decided where to go. Dialogs gained `dialog-in` (0.22 s) in 0c0410e.

### F5. RFQ step transitions used a symmetric enter and exit (Jakub: asymmetry)

Enter 0.28 s with y 10, exit 0.28 s with y -6, both via framer-motion `mode="wait"`, which also added a 0.28 s wait before the next step appeared. Replaced in 98cdd02 with a keyed panel and a mount-only `.anim-rise` (0.28 s); the previous panel disappears immediately. The first render carries no animation (a `moved` flag), so the form is static on page load.

### F6. Everything scroll-bound is scrubbed, nothing is time-based (Jhey: scroll is the clock)

M4, M7 and M9 use `scrub` so the reader's finger owns the timeline. KineticNumber's count is scrubbed rather than a fixed count-up, so a fast scroll never leaves a number mid-count. No change needed.

### F7. Pinned sections exist only above 1024 px and only with motion allowed

M4 and M9 are inside `(min-width: 1024px)` matchMedia blocks with `anticipatePin` set. On phones the timeline is a vertical list and the hero scrolls normally. No change needed; verified by G8 and by the 390 screenshots.

### F8. Content is complete in server HTML before any tween

Every tween is `gsap.from` or `fromTo` toward the CSS resting state, so SSR ships the final values and a reader without JavaScript, or with reduced motion, sees the same page. Gate G6 (raw HTML fetch without JS) checks every heading, stat and table row. No change needed.

### F9. Marker stroke on two-tone headings (M5) is the one decorative flourish

Kept on purpose: it is the brochure's signature mark, it runs once per heading, it never hides the type (the highlight draws behind ink text that is already visible), and it costs 0.6 s at most. This is the single "brand" gesture on the page and is applied consistently.

## 3. Residual notes (not changed)

- Lenis smooth scroll (M1) is a taste decision from Direction A. It is disabled under reduced motion and destroyed on unmount. If Raghav prefers native scroll on touch devices, the change is one option in `SmoothScrollProvider`.
- Wipe (M8) at 1.1 s is the longest non-hero tween. It is used twice and only for photographs; acceptable, but 0.9 s would also read well.
- No motion runs on a timer, none loops, none autoplays media. There is nothing to pause.

## 4. Verification

- `pnpm exec tsc --noEmit`, `pnpm lint`: clean after each change.
- Gate G8 (reduced motion) passes in verify rounds 1 and 2.
- The framer-motion removal is visible in the build: no chunk in `.next/static/chunks` contains `framer` or `AnimatePresence` after 98cdd02.