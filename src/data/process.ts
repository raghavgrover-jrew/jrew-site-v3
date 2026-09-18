// Spread 07, right: "Every stage engineered for repeatability". Nine-row table, verbatim.
export interface ProcessStage {
  stage: string;
  capability: string;
  source: "Spread 07";
}

export const processIntro = {
  eyebrow: "Plate to product",
  headline: { lead: "Every stage engineered", mark: "for repeatability" },
  lede: "Every process that touches the part is ours. Tolerances are held across operations rather than negotiated between vendors, which is why the parts arrive ready to fit, not ready to rework.",
  source: "Spread 07",
} as const;

export const processStages: ProcessStage[] = [
  { stage: "Cutting", capability: "CNC laser to 25 mm, HD plasma to 40 mm, oxy-fuel to 200 mm across 4 centres (Max Elite ProArc 12 kW and 6 kW; Kjellberg ProArc 300 A)", source: "Spread 07" },
  { stage: "Forming", capability: "Rolling, CNC press-brake bending, large-format levelling of plate to 40 mm", source: "Spread 07" },
  { stage: "Fabrication and welding", capability: "Manual and robotic MIG/MAG to EN ISO 3834-2 with SAW long-seam automation; OTC NB61 6-axis robots and qualified welders to documented WPS", source: "Spread 07" },
  { stage: "Machining", capability: "Boring, milling, turning, grinding on Doosan VMCs/VTLs, Hyundai HMCs and CNC turning centres to 0.05 mm", source: "Spread 07" },
  { stage: "Forging", capability: "Hooks 6.3-25 t SWL and forks to 6 t, with NDT and destructive testing including MPI", source: "Spread 07" },
  { stage: "Surface treatment", capability: "Shot blasting plus conveyorised multi-coat wet painting and curing", source: "Spread 07" },
  { stage: "Assembly", capability: "Hydraulic/mechanical sub-assembly, JIT Kanban-sequenced: 40,000+ axle assemblies/year across 10+ variants", source: "Spread 07" },
  { stage: "Heat treatment", capability: "Limited in-house furnaces; majority through qualified partners", source: "Spread 07" },
  { stage: "Packaging and dispatch", capability: "In-house woodworking and metal shop builds pallets, racks and stillages for containerised export from JREW premises", source: "Spread 07" },
];
