// Spread 09, right: quality assurance. Spread 10, left: people and progress.
export const qualityIntro = {
  eyebrow: "Quality assurance",
  headline: { lead: "Quality is engineered in,", mark: "not inspected afterwards" },
  body:
    "Stringent checks plus continual upskilling of technical staff. We monitor and improve across procurement, manufacturing, quality, logistics, packaging and sales using Six Sigma, TQM, Poka-Yoke and 5S, backed by curriculum-based training.",
  certifier: "ISO certifications by TÜV Rheinland, Germany",
  source: "Spread 09",
} as const;

export interface Certification {
  code: string;
  scope: string;
  source: "Spread 09";
}

export const certifications: Certification[] = [
  { code: "ISO 9001:2015", scope: "Quality management", source: "Spread 09" },
  { code: "ISO 14001:2015", scope: "Environmental management", source: "Spread 09" },
  { code: "ISO 45001:2018", scope: "Occupational health and safety", source: "Spread 09" },
  { code: "EN ISO 3834-2", scope: "Fusion welding quality", source: "Spread 09" },
  { code: "CII GreenCo", scope: "Sustainability goals", source: "Spread 09" },
];

export const inspection = {
  title: "Inspection infrastructure",
  rows: [
    "Fixed CMMs, bridge-type with Renishaw probe",
    "Portable FARO arm CMMs with 3D scanning for large fabricated parts",
    "Full NDT with Level II staff: DPT, MPI, RT, UT",
    "Destructive testing: universal testing machine and weld-penetration equipment",
    "Dedicated material-testing labs and a standards room",
    "Laser marking: only quality-approved parts get data plates before dispatch",
  ],
  images: [
    { src: "/images/quality/passed-part.jpg", alt: "Gloved hand on a stamped forging carrying a green PASSED sticker" },
    { src: "/images/quality/faro-arm-cmm.jpg", alt: "Engineer measuring a large ring with a FARO arm CMM" },
  ],
  source: "Spread 09",
} as const;

export const people = {
  eyebrow: "People and progress",
  headline: { lead: "Built by people.", mark: "Ready for tomorrow." },
  body: "Precision starts with people. We invest in curriculum-based technical training, cross-functional skill development and continuous improvement.",
  rows: [
    { title: "Technical development", body: "Curriculum-based training and continuous upskilling across manufacturing, engineering and quality functions." },
    { title: "Health and well-being", body: "Health-awareness sessions, medical camps and safer workplaces supported by ISO 45001 systems." },
    { title: "Employee engagement", body: "Annual recognition programmes and family-inclusive events that strengthen participation and belonging." },
  ],
  future: [
    { year: "2026", title: "Epicor ERP", body: "Real-time production visibility across all units, connecting planning, quality, inventory and delivery." },
    { year: "2027", title: "Rajpura greenfield", body: "600,000 sq ft, ERP/MES-integrated and automation-ready, built to support larger global OEM programmes and export growth." },
  ],
  images: [
    { src: "/images/people/visual-management-board.jpg", alt: "Supervisor briefing a team at a visual-management board" },
    { src: "/images/people/office-interior.jpg", alt: "Corporate office interior with yellow partitions" },
  ],
  source: "Spread 10",
} as const;
