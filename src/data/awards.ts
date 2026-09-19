// Spread 11, left: "Recognition built on results".
export interface Award { id: string; giver: string; title: string; years?: number[]; note?: string; image?: string; imageAlt?: string; source: "Spread 11" }

export const awardsIntro = { eyebrow: "Awards and recognition", headline: { lead: "Recognition built", mark: "on results" }, body: "Recognition from customers and industry institutions across quality, delivery, manufacturing and partnership.", source: "Spread 11" } as const;

export const awards: Award[] = [
  { id: "cat-ser", giver: "Caterpillar", title: "Supplier Excellence Recognition Award", years: [2023, 2024, 2025], note: "3 years running", image: "/images/awards/caterpillar-2025.jpg", imageAlt: "JREW team receiving the Caterpillar 2025 Supplier Excellence Recognition award", source: "Spread 11" },
  { id: "jcb", giver: "JCB", title: "Supplier Appreciation Award", image: "/images/awards/jcb.jpg", imageAlt: "JREW team on stage receiving the JCB Supplier Appreciation Award", source: "Spread 11" },
  { id: "cii-godrej", giver: "CII x Godrej", title: "Sustainability Partner Award", image: "/images/awards/cii-godrej.jpg", imageAlt: "Award presentation for the CII and Godrej Sustainability Partner Award", source: "Spread 11" },
  { id: "godrej", giver: "Godrej", title: "Quality Leadership Award", image: "/images/awards/godrej-quality-leadership.jpg", imageAlt: "JREW team receiving the Godrej Quality Leadership Award", source: "Spread 11" },
  { id: "et-now", giver: "ET NOW", title: "Quality Leadership Award", image: "/images/awards/et-now.jpg", imageAlt: "Award presentation on the ET NOW stage", source: "Spread 11" },
];

export const caterpillarYears = [
  { year: 2023, image: "/images/awards/caterpillar-2023.jpg" },
  { year: 2024, image: "/images/awards/caterpillar-2024.jpg" },
  { year: 2025, image: "/images/awards/caterpillar-2025.jpg" },
] as const;
