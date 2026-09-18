// Spread 06, right: "From components to complete machines". Printed model names only.
export const stakon = {
  eyebrow: "Material handling equipment",
  headline: { lead: "From components to", mark: "complete machines" },
  body:
    "Designed and manufactured at our dedicated Mohali facility, the in-house STAKON range covers electric and semi-electric pallet stackers, electric pallet trucks and hand pallet trucks, 500 kg to 2,000 kg, lifting to 6.3 m. Built for demanding warehouse and industrial applications.",
  stats: [
    { value: "6.3 m", label: "Max lift height" },
    { value: "2,000 kg", label: "Max load capacity" },
  ],
  bullets: [
    "Curtis/ZAPI control, AC drive and European hydraulics",
    "Three-stage telescopic mast to 6.3 m, no deflection at height",
    "Solid steel body and mast assemblies throughout",
    "500 kg to 2,000 kg across 14 models",
  ],
  hero: { image: "/images/stakon/stacker-hero.png", alt: "STAKON fully electric pallet stacker with telescopic mast" },
  models: [
    { type: "Fully electric pallet stacker", name: "STAKON FE Series", body: "Electric lift and travel. 1,200-1,500 kg, telescopic mast to 6.3 m. Curtis/ZAPI control and European hydraulics for high-density racking.", image: "/images/stakon/fe-series.png", alt: "STAKON FE Series fully electric pallet stacker" },
    { type: "Semi-electric pallet stacker", name: "STAKON SE Series", body: "Electric lift, manual travel. 500-1,500 kg, masts to 3.5 m. Compact steel build for intermittent stacking of dies, moulds and fixtures.", image: "/images/stakon/se-series.png", alt: "STAKON SE Series semi-electric pallet stacker" },
    { type: "Fully electric pallet truck", name: "STAKON FEPT 2000", body: "Electric lift and travel. 2,000 kg at 600 mm load centre. Curtis/ZAPI control, AC drive, solid steel body. Pedestrian or stand-on operation.", image: "/images/stakon/fept-2000.png", alt: "STAKON FEPT 2000 fully electric pallet truck" },
  ],
  source: "Spread 06",
} as const;
