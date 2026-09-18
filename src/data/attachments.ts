// Spread 05: "India's widest attachment range". Five category pills and 14 cards, verbatim.
// Machine mapping per card is inferred from the printed spec and application lines and is
// flagged for Raghav to confirm (PLAN.md, Needs input 12).
export type MachineCategory = "backhoe-loaders" | "skid-steers" | "telehandlers" | "forklifts" | "cranes";

export const attachmentCategories: { key: MachineCategory; label: string }[] = [
  { key: "backhoe-loaders", label: "Backhoe loaders" },
  { key: "skid-steers", label: "Skid steers" },
  { key: "telehandlers", label: "Telehandlers" },
  { key: "forklifts", label: "Forklifts" },
  { key: "cranes", label: "Cranes" },
];

export const attachmentsIntro = {
  eyebrow: "Attachments and work tools",
  headline: { lead: "India's widest", mark: "attachment range" },
  body:
    "One of India's widest engineered-attachment ranges, over 100 varieties, for backhoe loaders, skid steer loaders, telehandlers, forklifts and cranes. Each is built to OEM drawings with Hardox wear surfaces, hydraulic grab systems, anti-load-spill guards and OEM-compatible mountings, and is field-proven across construction, agriculture, industrial and municipal duty cycles. Fourteen are shown with specifications; the full range is quoted on request.",
  footer: "A dedicated line, globally sourced, packaged and container-stuffed on JREW premises for North America and Europe.",
  footerTag: "100% export-inspected",
  source: "Spread 05",
} as const;

export interface Attachment {
  id: string;
  name: string;
  spec: string;
  applications: string;
  machines: MachineCategory[];
  machinesInferred: true;
  image: string;
  imageAlt: string;
  source: "Spread 05";
}

export const attachments: Attachment[] = [
  { id: "hd-fork-with-grab", name: "HD Fork with Grab", spec: "72 in width; 36 in Hardox-400 tines; hydraulic top grab with wide opening and high clamping force", applications: "Solid and agricultural waste, logs, planks and lumber; straw-pack stacking; sugarcane handling", machines: ["backhoe-loaders", "telehandlers"], machinesInferred: true, image: "/images/attachments/hd-fork-with-grab.jpg", imageAlt: "Heavy-duty fork with hydraulic top grab", source: "Spread 05" },
  { id: "power-grab", name: "Power Grab", spec: "2.0 m3 capacity; 92 in width; double-arm grab with top grab", applications: "Garbage and waste-rag handling; straw-pack stacking; sugarcane handling", machines: ["backhoe-loaders"], machinesInferred: true, image: "/images/attachments/power-grab.jpg", imageAlt: "Power grab with double arms and tines", source: "Spread 05" },
  { id: "multi-shovel", name: "Multi Shovel", spec: "0.75 / 1.0 / 1.25 m3 capacities; top grab for secure retention", applications: "Solid and agricultural waste, logs and lumber, straw packs, sugarcane handling", machines: ["backhoe-loaders", "skid-steers"], machinesInferred: true, image: "/images/attachments/multi-shovel.jpg", imageAlt: "Multi-purpose shovel with top grab", source: "Spread 05" },
  { id: "manure-fork-with-grab", name: "Manure Fork with Grab", spec: "66 in width; 0.56 m3 single-ram top grab with knife-shaped arms to minimise spillage", applications: "Muck and waste handling; farm applications", machines: ["backhoe-loaders", "skid-steers"], machinesInferred: true, image: "/images/attachments/manure-fork-with-grab.jpg", imageAlt: "Manure fork with single-ram top grab", source: "Spread 05" },
  { id: "grapple-scrap", name: "Grapple Scrap with Industrial Grab", spec: "66 in width; 0.56 m3 split grab with independent cylinders for load flexibility", applications: "Garbage, waste rags and solid waste, straw packs", machines: ["backhoe-loaders", "skid-steers"], machinesInferred: true, image: "/images/attachments/grapple-scrap-with-industrial-grab.jpg", imageAlt: "Scrap grapple with split industrial grab", source: "Spread 05" },
  { id: "cotton-grab", name: "Cotton Grab", spec: "69 in width; 40 in Hardox tines; upper tines stabilise soft, spongy loads", applications: "Cotton and soft-load handling, waste, wooden logs", machines: ["backhoe-loaders", "telehandlers"], machinesInferred: true, image: "/images/attachments/cotton-grab.jpg", imageAlt: "Cotton grab with perforated backplate and tines", source: "Spread 05" },
  { id: "sugarcane-grab", name: "Sugarcane Grab", spec: "1.25 m3 anti-wear strips on grab arms; wide jaw opening with high clamping force", applications: "Sugar mills; sugarcane loading and unloading; straw and wood handling", machines: ["backhoe-loaders", "telehandlers"], machinesInferred: true, image: "/images/attachments/sugarcane-grab.jpg", imageAlt: "Circular sugarcane grab", source: "Spread 05" },
  { id: "drum-handler", name: "Drum Handler", spec: "Handles 200-litre metal drums; quick fork-mount design needs only the machine operator", applications: "Manufacturing, assembly lines, refineries, filling agencies, warehouses", machines: ["forklifts", "telehandlers"], machinesInferred: true, image: "/images/attachments/drum-handler.jpg", imageAlt: "Fork-mounted drum handler", source: "Spread 05" },
  { id: "pole-planter", name: "Pole Planter", spec: "180 degree rotation; picks poles from natural stacking; minimal crew required", applications: "Roadside lighting and electrical pole erection; rail-track, metro and power-transmission work", machines: ["backhoe-loaders", "cranes"], machinesInferred: true, image: "/images/attachments/pole-planter.jpg", imageAlt: "Pole planter attachment", source: "Spread 05" },
  { id: "man-basket", name: "Man Basket", spec: "4-person capacity; working height to 17 m; mounts on Loadall and pick-n-carry cranes", applications: "Construction, municipal and industrial maintenance; airports, malls, ports, metro", machines: ["telehandlers", "cranes"], machinesInferred: true, image: "/images/attachments/man-basket.jpg", imageAlt: "Four-person man basket platform", source: "Spread 05" },
  { id: "skid-steer-pallet-fork", name: "Skid Steer Pallet Fork", spec: "42 in / 48 in forks, 2 t rated; lifts 500-700 kg; anti-load-spill guard", applications: "Stacking, loading and unloading palletised loads; port operations", machines: ["skid-steers"], machinesInferred: true, image: "/images/attachments/skid-steer-pallet-fork.jpg", imageAlt: "Skid steer pallet fork with load guard", source: "Spread 05" },
  { id: "fork-frame", name: "Fork Frame", spec: "42 in forks, 3 t rated; lifts 700-1,000 kg; rear rollers add stability at rest", applications: "Loading and stacking palletised loads", machines: ["backhoe-loaders", "telehandlers"], machinesInferred: true, image: "/images/attachments/fork-frame.jpg", imageAlt: "Fork frame with rear rollers", source: "Spread 05" },
  { id: "precision-placer", name: "Precision Placer", spec: "Fork positioning from 299 mm to 1013 mm with +/-167 mm side shift; 4,000 kg capacity, Q-fit carriage", applications: "Mixed-pallet handling, block and brick placement, site material distribution", machines: ["telehandlers"], machinesInferred: true, image: "/images/attachments/precision-placer.jpg", imageAlt: "Precision placer carriage with positioning forks", source: "Spread 05" },
  { id: "side-tilt-rotate-carriage", name: "Side Tilt-Rotate Carriage", spec: "+/-10 degree hydraulic side tilt; 5,443 kg capacity, in 1,270 mm and 1,829 mm carriage widths", applications: "Rough-terrain pallet placement, uneven-ground stacking, agricultural and construction site handling", machines: ["telehandlers", "forklifts"], machinesInferred: true, image: "/images/attachments/side-tilt-rotate-carriage.jpg", imageAlt: "Side tilt-rotate carriage", source: "Spread 05" },
];
