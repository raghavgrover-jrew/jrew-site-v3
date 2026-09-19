---
title: CLAIMS-REGISTER
type: note
permalink: home/desktop/jrew/code/jrew-site-v3/docs/claims-register
---

# Claims register: jrew.co.in v3

Controlled list of every quantitative, exclusivity, facility, certification, customer and forward-looking claim on the site (Codex audit P0-2). Each row needs written business approval before production launch. Source "Spread NN" means the wording is printed in the 2026 Corporate Profile; that establishes what the company has already published, not that the evidence is on file. Owner for every row: Raghav Grover (Director) unless reassigned. Approval and review dates are blank until signed.

Status key: **Printed** (in the brochure, evidence to be attached), **Inferred** (derived by the build, needs confirmation), **Pending** (not yet approved), **Approved** (date filled).

| # | Claim (exact wording on site) | Where | Source | Scope and period to record | Evidence to attach | Status |
|---|---|---|---|---|---|---|
| 1 | USD 50M+ annual turnover | Stat band (/), snapshot | Spread 02 | Fiscal year, currency basis (INR converted at what rate) | Audited accounts FY | Printed, Pending |
| 2 | 1,000+ employees | Stat band (/) | Spread 02 | Headcount date, whether contract staff are included | HR headcount report | Printed, Pending |
| 3 | 40,000+ axle assemblies a year, 10+ variants | Stat band (/), capabilities proof row | Spread 02, Spread 08 | Product scope, year measured | Production records | Printed, Pending |
| 4 | 0 PPM (quality record, global; "zero-PPM performance for components supplied globally") | Stat band (/), quality panel (/, /capabilities, /quality) | Spread 02, Spread 09 | Which customers, which programmes, which period | Customer PPM reports | Printed, Pending |
| 5 | 10+ export countries; exports to North America, Europe and Asia since 2010 | Stat band, snapshot, why JREW | Spread 02, Spread 12 | Country list, first export year | Export records | Printed, Pending |
| 6 | Sole supplier for 20+ years to multiple customers; most customers shown buy as sole supplier or direct-on-line | /capabilities proof row, customers intro (/) | Spread 08, Spread 11 | Which customers, which parts | Supply agreements or customer letters | Printed, Pending |
| 7 | "India's widest attachment range" (headline) and "one of India's widest engineered-attachment ranges, over 100 varieties" (intro) | /products/attachments | Spread 05 | Basis of comparison; count of varieties | Product catalogue count | Printed, Pending (two wordings; pick one) |
| 8 | 100+ attachment varieties | Snapshot table, /products, /products/attachments | Spread 02, 05 | As row 7 | | Printed, Pending |
| 9 | 14 STAKON models across FE, SE and FEPT series; 500 kg to 2,000 kg; lift to 6.3 m | /stakon, /products | Spread 06 | Model list | STAKON price list | Printed, Pending |
| 10 | Mast systems 1.5 to 15 t, lift heights to 14 m | /products, /  | Spread 04 | Product scope | Engineering spec | Printed, Pending (Spread 08 prints 1.5 to 5 t / 6.3 m; removed from site) |
| 11 | Machining to 0.05 mm; laser to 25 mm, plasma to 40 mm, oxy-fuel to 200 mm; robotic welding to EN ISO 3834-2 | /capabilities table | Spread 07 | Machine list | Plant equipment list, WPS | Printed, Pending |
| 12 | ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, EN ISO 3834-2 (TUV Rheinland); CII GreenCo | /quality, hero proof line, footer marks | Spread 09 | Certificate numbers, validity dates | Certificate PDFs (Needs input 5) | Printed, Pending |
| 13 | Caterpillar Supplier Excellence Recognition Award 2023, 2024, 2025 (3 years running); JCB Supplier Appreciation; CII x Godrej Sustainability Partner; Godrej and ET NOW Quality Leadership | /about awards, Trusted (/), hero proof line | Spread 11 | Award letters; permission to name the giver | Award certificates | Printed, Pending |
| 14 | 24 customer logos and 5 association marks displayed | Trusted (/), footer | Spread 11 | Written permission per mark for web use (print use does not imply web use) | Permission emails | Printed, Pending |
| 15 | Four units: MOH 1 (2001, 50,000 sq ft), FBD 1 (2007, 60,000), FBD 2 (2024, 10,000), MOH 2 (2026 or 2025, 40,000) with street addresses | /facilities, footer, JSON-LD | Spread 07; addresses from the live site | Address to unit mapping; MOH 2 year (Spread 03 says 2025) | Lease or title documents | Inferred, Pending (Needs input 1, 10) |
| 16 | Rajpura greenfield 600,000 sq ft, Phase 1 operations 2027; Epicor ERP 2026 | /facilities roadmap, /about timeline, footer | Spread 03, 07 | Forward-looking; approval to publish dates | Board minutes | Printed, Pending |
| 17 | Founded 1973 in Chandigarh; public limited since 1994; CIN | Stat band, /about, footer | Spread 02, 03; MCA record | | Certificate of incorporation | Printed, Pending |
| 18 | Attachment to machine mapping (five filter pills) | /products/attachments | Build inference from Spread 05 applications text | Engineering confirmation per attachment | | Inferred, Pending (Needs input 8) |
| 19 | Steel grades named for forks and hooks (42CrMo4, EN19, S355 in placeholders) | /products, RFQ placeholder | Repo data, not brochure | | | Inferred, Pending (Needs input 7) |
| 20 | Public phone +91 97 3334 3338; LinkedIn URL; stakon.in | Footer, /contact, JSON-LD | Live site | | | Inferred, Pending (Needs input 2) |
| 21 | Response commitments: "the commercial team replies from enquiry@jrew.co.in"; "we answer within 30 days" (privacy rights) | RFQ success, /privacy | Build copy | Confirm the team and the window | | Pending (Needs input 15) |
| 22 | Retention periods: 24 months (enquiries), 12 months (applications), 30 days (logs) | /privacy | Build proposal | Legal review | | Pending, legal |
| 23 | Doosan Bobcat India and Preet Agro standard fitment of the JREW 2WD steering axle | /capabilities, /about | Spread 08 | Customer confirmation to name them | | Printed, Pending |
| 24 | Side-shifter carriage case study (OEM unnamed): "prototype to series in record time" | /capabilities | Spread 08 | Programme reference | | Printed, Pending |

## Process

1. Business owner attaches evidence per row and signs the approval column with a date.
2. Any row without approval by the launch gate is removed from the site or reworded to the approved form; the data lives in `src/data/*` and each row names its file.
3. Review annually, or when the brochure is reissued, whichever comes first; the review date is recorded here.
4. New claims enter the site only through this register.