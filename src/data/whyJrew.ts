// Spread 12, left (back cover): "Why JREW" and the closing CTA. Spread 12, right: the cover.
export interface Reason { n: number; title: string; body: string; source: "Spread 12" }

export const whyIntro = { eyebrow: "Why JREW", headline: { lead: "One integrated platform.", mark: "A sole-supplier track record." }, source: "Spread 12" } as const;

export const whyJrew: Reason[] = [
  { n: 1, title: "An integrated platform", body: "One partner from raw-material development and hot-rolled profiles through cutting, forming, robotic welding, CNC machining, finishing and assembly, under one roof, backed by ISO 9001/14001/45001 and EN ISO 3834-2.", source: "Spread 12" },
  { n: 2, title: "Functional parts expertise", body: "Large, complex fabricated and machined attachments, work-tools and functional assemblies with multiple components integrated into a harmonious assembly, from mast assemblies to steer axles and beyond, engineered via PPAP/APQP discipline, with in-house designs adopted as OEM standard fitment.", source: "Spread 12" },
  { n: 3, title: "India cost-advantaged, China-plus-one ready", body: "A stable export base serving Europe and North America since 2010, with 100% inspection on export jobs.", source: "Spread 12" },
  { n: 4, title: "A sole-supplier track record", body: "Direct-on-line, sole-supplier status with most major OEMs, including a front-axle programme at 40,000+ a year as sole supplier for 20+ years, earned through zero-PPM quality.", source: "Spread 12" },
];

export const closingCta = {
  headline: "Let's engineer together.",
  body: "A component supplier, an engineering development partner, or a strategic India source: talk to our team.",
  source: "Spread 12",
} as const;

export const cover = {
  headline: { mark: "Precision", lead: "engineering for tomorrow's machinery" },
  strapline: "Engineering-led manufacturing · Since 1973",
  tagline: "Empowering machines",
  source: "Spread 12",
} as const;
