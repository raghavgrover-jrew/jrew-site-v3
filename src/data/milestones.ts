// Spread 03: "Five decades of engineering progress". Three eras, 18 milestones, verbatim.
export interface Era { id: string; range: string; title: string; body: string; source: "Spread 03" }
export interface Milestone { year: number; era: string; title: string; body: string; source: "Spread 03" }

export const timelineIntro = {
  eyebrow: "Our journey",
  headline: { lead: "Five decades of", mark: "engineering progress" },
  range: "1973-2027",
  rangeLabel: "50+ years of continuous evolution",
  body: "From a Chandigarh bright-bar workshop to a multi-location engineering enterprise serving global equipment manufacturers, built through steady shifts in capability, scale and ambition.",
  source: "Spread 03",
} as const;

export const eras: Era[] = [
  { id: "foundation", range: "1973-1998", title: "Building the foundation", body: "From bright bars to engineered components and material-handling profiles.", source: "Spread 03" },
  { id: "scaling", range: "2001-2016", title: "Scaling manufacturing capability", body: "New locations, export programs, attachments and a proprietary brand.", source: "Spread 03" },
  { id: "next", range: "2017-2027", title: "Engineering the next chapter", body: "Proprietary products, specialist capacity and connected operations.", source: "Spread 03" },
];

export const milestones: Milestone[] = [
  { year: 1973, era: "foundation", title: "Founded in Chandigarh", body: "Bright-bar manufacturing begins, serving Swaraj, Eicher and HMT.", source: "Spread 03" },
  { year: 1980, era: "foundation", title: "Fabricated components", body: "The range expands into fabricated tractor components.", source: "Spread 03" },
  { year: 1987, era: "foundation", title: "Material handling", body: "Forklift mast profiles open a new engineering chapter.", source: "Spread 03" },
  { year: 1992, era: "foundation", title: "Construction equipment", body: "Capability grows for off-highway machines.", source: "Spread 03" },
  { year: 1994, era: "foundation", title: "Customer expansion", body: "Deeper OEM partnerships broaden the portfolio.", source: "Spread 03" },
  { year: 1996, era: "foundation", title: "Integrated assemblies", body: "Value moves from fabricated parts to engineered sub-assemblies.", source: "Spread 03" },
  { year: 1998, era: "foundation", title: "Foundation complete", body: "A stronger base sets up the next phase of growth.", source: "Spread 03" },
  { year: 2001, era: "scaling", title: "Mohali expansion", body: "A larger facility adds capacity, processes and engineering depth.", source: "Spread 03" },
  { year: 2007, era: "scaling", title: "Faridabad operations", body: "Just-in-time supply of assembled front axles begins for JCB and NCR customers.", source: "Spread 03" },
  { year: 2010, era: "scaling", title: "Export markets", body: "International programmes extend JREW beyond India.", source: "Spread 03" },
  { year: 2014, era: "scaling", title: "Attachments portfolio", body: "New attachments widen the offering for equipment makers.", source: "Spread 03" },
  { year: 2016, era: "scaling", title: "STAKON launched", body: "A proprietary material-handling brand marks a shift from build-to-print.", source: "Spread 03" },
  { year: 2017, era: "next", title: "Steering axle developed", body: "An in-house 2WD backhoe-loader steering axle is adopted by Doosan Bobcat and Preet Agro.", source: "Spread 03" },
  { year: 2019, era: "next", title: "Faridabad expansion", body: "Shop floor grows to 60,000 sq ft, absorbing larger and more complex programs.", source: "Spread 03" },
  { year: 2024, era: "next", title: "Faridabad Unit 2", body: "A feeder plant strengthens sub-assembly, fabrication and machining capacity.", source: "Spread 03" },
  { year: 2025, era: "next", title: "Corporate office and R&D", body: "A dedicated facility deepens engineering, design and product development capability.", source: "Spread 03" },
  { year: 2026, era: "next", title: "Digital transformation", body: "Global ERP-enabled operations connect planning, quality and delivery.", source: "Spread 03" },
  { year: 2027, era: "next", title: "Rajpura production", body: "Phase 1 of the greenfield campus begins operations.", source: "Spread 03" },
];
