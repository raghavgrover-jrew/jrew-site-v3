---
title: HANDOVER
type: note
permalink: home/desktop/jrew/code/jrew-site-v3/handover
---

# Handover

For the developer taking over implementation and hosting of the JREW Engineering site (v3).

Read this first, then `BUILD-REPORT.md` for what was built and why, and `QA-REPORT.md` for how it was
verified. `DESIGN.md` holds the design system. Everything else is reference.

---

## 1. What this is

A static-first marketing and RFQ site for JREW Engineering Limited (precision manufacturing, Mohali
and Faridabad). Eleven routes, all prerendered at build time. Two server endpoints, both for forms.
No database, no CMS, no user accounts, no sessions. Content lives in TypeScript files under
`src/data/` and comes from the company's 2026 brochure.

| | |
|---|---|
| Framework | Next.js 16.3.5, App Router, React 19.2, TypeScript 5.9 |
| Styling | Tailwind v4 (`@theme inline`, OKLCH tokens in `src/app/globals.css`) |
| Animation | GSAP 3.15 on the home, products and about routes only |
| Mail | nodemailer over SMTP |
| Package manager | pnpm 10.33, Node 20 |
| Hosting now | Vercel, project `jrew-site-v3`, preview deployments only |

## 2. Running it

```bash
pnpm install
cp .env.local.example .env.local   # ALLOW_CONSOLE_DELIVERY=1 is enough for local form work
pnpm dev                           # http://localhost:3200
```

| Command | What it does |
|---|---|
| `pnpm build` | Production build. Every route should prerender; a route turning dynamic is a regression |
| `pnpm lint` | ESLint. Must be zero, including the React Compiler rules |
| `pnpm test` | Vitest, 77 tests: validation, API routes, data integrity, route metadata, security headers |
| `pnpm verify` | Playwright and axe harness, 282 checks over all eleven routes. Needs a server running |
| `pnpm lighthouse` | Lighthouse on three routes, desktop and mobile |

The two harnesses take a `BASE` URL and run against anything:

```bash
BASE=http://localhost:3201 pnpm verify
BASE=https://your-deployment.vercel.app LH_THROTTLING=devtools pnpm lighthouse
```

`LH_THROTTLING=devtools` measures observed timings; `simulate` uses Lighthouse's Lantern model, which
is pessimistic against a local HTTP/1.1 server. `PREVIEW_BYPASS=<secret>` lets either harness drive a
Vercel deployment that sits behind deployment protection.

## 3. Environment variables

| Variable | Needed for | Notes |
|---|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Both forms | **Not yet supplied.** Without all of them both forms answer HTTP 500 and say on screen that the message was not sent |
| `ENQUIRY_EMAIL` | Contact and RFQ | Defaults to `enquiry@jrew.co.in` |
| `CAREERS_EMAIL` | Careers | Defaults to `careers@jrew.co.in` |
| `ALLOW_CONSOLE_DELIVERY` | Local only | Logs a PII-free summary instead of sending. Deliberately ignored on Vercel, so a deployment can never silently swallow a lead |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs | Leave unset: a Vercel build then canonicalises to its own host. Set it to `https://jrew.co.in` only on the real production deployment |

**Indexing is tied to that last variable.** `src/lib/site.ts` names one canonical origin. On anything
else, `robots.txt` disallows everything and every page carries `noindex, nofollow`. This is
deliberate, not a leftover: see section 6.

## 4. Where things are

```
src/app/            routes, each with its own metadata and opengraph-image
  api/contact/      RFQ and general enquiry endpoint
  api/careers/      application endpoint, handles the resume upload
src/components/
  chrome/           navbar, footer
  sections/         page sections, mostly server components
  ui/               primitives, forms, the RFQ flow
src/data/           all brochure content, typed; change copy here, not in components
src/lib/            site constants, validation, mail, RFQ model, JSON-LD, OG image
scripts/            verify.mjs, lighthouse.mjs, deploy-preview.sh, asset extraction (Python)
public/             images, logos, line art, brand marks
docs/               claims register, motion audit, ingest findings
```

Two things worth knowing before editing:

- **Content is data.** Headlines, specs and figures live in `src/data/*.ts`. A test asserts that
  every figure on the site traces to an approved source and that banned terms never appear.
- **Tailwind v4 cascade layers.** Primitives are in `@layer components`, element rules in
  `@layer base`. Unlayered CSS beats `@layer utilities`, which silently broke section padding on nine
  routes once. Keep new primitives in a layer.

## 5. Form handling

Both endpoints are hardened beyond the obvious, because a lost enquiry is the expensive failure:

- Same-origin check, content-type and body-size caps, per-IP soft rate limit, honeypot field.
- SMTP connect, greeting and send timeouts, with one retry.
- An idempotency key, so a double submit returns the same reference rather than two emails.
- Every submission gets a reference like `JREW-20261010-X7K2P`, shown on screen and in the subject.
- Logs carry the reference and the sender's domain, never the address or the message.
- Resumes: size-capped, extension and magic-byte checked, and a `.docx` must really be a zip
  containing `[Content_Types].xml` and `word/`.

**Forms never fail silently.** If mail is not configured the endpoint answers 500 and the page tells
the visitor to email directly. Please keep that property.

## 6. What is NOT approved yet

The site is complete as a build. It is not approved as a publication.

- **`docs/CLAIMS-REGISTER.md` lists 24 factual claims, all still "Pending".** Turnover, headcount,
  the 40,000-units figure, the 0 PPM record, export history and sole-supplier claims need Raghav's
  sign-off before this goes near the real domain.
- **`/privacy` is a draft for legal review.** Ten sections, written against DPDP and GDPR, but not
  reviewed by a lawyer.
- Both are why every non-canonical host is `noindex`. Please do not remove that until the sign-offs
  exist.

`BUILD-REPORT.md` section 7 holds the full list of open questions, numbered, including several that
are commercial rather than technical.

## 7. Hosting

Currently on Vercel: project `jrew-site-v3`, `prj_3kxBOF0XL0skN1ACddrCZA0VsATF`, preview deployments
only, deployment protection off so the link is public. Nothing is on a custom domain.

```bash
scripts/deploy-preview.sh      # builds, then publishes a preview; refuses --prod
```

There is nothing Vercel-specific in the code beyond `VERCEL_URL` being read as a canonical fallback,
and `ALLOW_CONSOLE_DELIVERY` being ignored when `VERCEL` is set. It is a standard Next.js app: it
will run on any Node host, or as a container, with no changes. If you move it, the two things to
carry over are the security headers in `next.config.ts` and the asset cache rules.

**Hard constraints that have applied throughout, and still do:**

1. **Do not point this at `jrew.co.in` or touch its DNS** without Raghav saying so explicitly. The
   current site is live on that domain and is a separate thing.
2. **Do not link the old Vercel project** `prj_nX56I20mK34TOOyN9YZi73S22LZf`. `deploy-preview.sh`
   refuses it.
3. `apple-scroll-starter` and `jrew-forge` are read-only references. Never commit to them.

## 8. State of the build

| Gate | Result |
|---|---|
| Build | Clean, all eleven routes prerendered |
| Lint | Zero |
| Tests | 77 passing |
| Harness | 282 of 282 locally; 279 of 280 on the deployment |
| Lighthouse, desktop | 100 performance, largest paint 0.33 to 0.54 s |
| Lighthouse, mobile | Largest paint 2.58 to 2.78 s, a little over the 2.5 s threshold |

The one harness failure on the deployment is Vercel injecting its own preview feedback toolbar, which
the site's Content-Security-Policy blocks. It is not in our HTML and will not exist in production.

**The open performance question.** Mobile's largest paint is text, waiting on a render-blocking
stylesheet that shares a throttled connection with the font and image preloads. Two remedies were
tried on the real deployment and measured: dropping font preloads buys about 0.15 s on mobile but
costs up to 1.2 s on desktop and introduces layout shift. Both were reverted. The remaining lever is
inlining critical CSS. The measurements are in `QA-REPORT.md` round 7 if you want to pick it up.

## 9. Suggested first session

1. `pnpm install && pnpm build && pnpm test` to confirm the toolchain works on your machine.
2. `pnpm dev`, then read `BUILD-REPORT.md` with the site open beside it.
3. `BASE=http://localhost:3201 pnpm verify` against a production server, to see what the gates cover.
4. Then the three things that actually block launch, in order: the SMTP credentials, the claims
   sign-off, and the legal review of `/privacy`.

Questions about intent rather than code are best put to Raghav directly; the reasoning behind most
decisions is recorded in `BUILD-REPORT.md` and `DESIGN.md` rather than in commit messages.