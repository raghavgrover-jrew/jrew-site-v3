// Spread 01: vision, mission, ICARE values, UPLIFT principles, and "Who we are".
export const whoWeAre = {
  eyebrow: "Who we are",
  headline: { lead: "A single partner,", mark: "from engineering to supply chain" },
  intro:
    "Fifty years of building the parts that carry the load. JREW engineers and manufactures fabricated and precision-machined components, sub-assemblies and engineered attachments for OEMs in construction, material handling, agriculture and railways, from the first design review to the crate on your production line.",
  bullets: [
    "We start at the drawing, not the purchase order. In-house design; DFM and tolerance-stack analysis; FEA and prototyping all run alongside your engineering team through APQP and PPAP. Several JREW-originated designs are now standard fitment on OEM machines.",
    "Every process that touches the part is ours. Plate to painted product across four units in Punjab and Haryana. Tolerances are held across operations rather than negotiated between vendors, which is why the parts arrive ready to fit, not ready to rework.",
    "We finish where your line starts. We JIT-sequence deliveries direct-on-line to OEM plants in India, and we inspect, pack and container-stuff export consignments on our own premises for North America and Europe.",
  ],
  image: { src: "/images/hero/plant-exterior-mohali.jpg", alt: "JREW Engineering plant exterior in Mohali with signage and landscaped lawn" },
  source: "Spread 01",
} as const;

export const vision = { title: "Vision", body: "To be the precision manufacturing partner that global OEMs trust for their hardest work.", mark: "Built in India, proven worldwide.", source: "Spread 01" } as const;
export const mission = { title: "Mission", body: "We solve our customers' toughest manufacturing challenges in metal from single component to finished assembly, with", mark: "zero compromise on quality or delivery.", source: "Spread 01" } as const;

export const icare = {
  title: "Values",
  lead: "We act with ICARE",
  items: [
    { letter: "I", word: "Integrity", body: "Do the right thing, the right way, every time." },
    { letter: "C", word: "Courage", body: "Speak up, take responsible risks, and tell the truth early." },
    { letter: "A", word: "Accountability", body: "Own outcomes; close the loop; learn from misses." },
    { letter: "R", word: "Respect", body: "Dignity at work; listen, include, and disagree well." },
    { letter: "E", word: "Environment", body: "Act responsibly for people's safety and the planet's health." },
  ],
  source: "Spread 01",
} as const;

export const uplift = {
  title: "Principles",
  lead: "Six ways we UPLIFT",
  items: [
    { letter: "U", word: "Urgency and ownership", body: "Decide fast when a call is reversible; escalate early when it is not. No \"that's not my job.\"" },
    { letter: "P", word: "People first", body: "Dignity on the floor; advancement earned by contribution, not tenure." },
    { letter: "L", word: "Lean and safe", body: "Everyone goes home safe. Treat time, capital and inventory like cash." },
    { letter: "I", word: "Improve at the source", body: "Go to the gemba and see for yourself. Standardise first, then kaizen." },
    { letter: "F", word: "First-time-right", body: "Design quality in; defects don't move to the next station." },
    { letter: "T", word: "Trust through transparency", body: "Open books, open problems, open fixes." },
  ],
  source: "Spread 01",
} as const;
