// "Browse by machine": what JREW supplies for each machine type, assembled only from what the
// brochure names on spreads 02, 04, 05, 06 and 09. Links point at the family sections.
export interface MachinePanel { id: string; label: string; items: { text: string; href?: string; source: string }[] }

export const byMachine: MachinePanel[] = [
  { id: "backhoe-loaders", label: "Backhoe loaders", items: [
    { text: "Assembled, painted front axles (300 kg) with hydraulic steering cylinder, direct-on-line", href: "/products#axles", source: "Spread 04" },
    { text: "JREW-designed 2WD steering axle, adopted by Doosan Bobcat India and Preet Agro", href: "/products#axles", source: "Spread 04" },
    { text: "Loader arms, crossrails, structural fabrications and machined linkages", source: "Spread 02" },
    { text: "Dipper baseplate for JCB's 15 ft 6 in dipper", href: "/products#components", source: "Spread 04" },
    { text: "Grabs, shovels, forks and fork frames from the attachment range", href: "/products/attachments", source: "Spread 05" },
  ] },
  { id: "skid-steers", label: "Skid steers", items: [
    { text: "Skid steer pallet fork, 42 in / 48 in forks, 2 t rated", href: "/products/attachments", source: "Spread 05" },
    { text: "Multi shovel, manure fork with grab, grapple scrap with industrial grab", href: "/products/attachments", source: "Spread 05" },
    { text: "Work-tool attachments manufactured at Faridabad", href: "/facilities", source: "Spread 07" },
  ] },
  { id: "telehandlers", label: "Telehandlers", items: [
    { text: "Side-shifter carriage co-developed to series supply (case study)", href: "/capabilities#case-study", source: "Spread 09" },
    { text: "Latch assembly for rapid work-tool changeover, to Manitou drawings", href: "/products#components", source: "Spread 04" },
    { text: "Precision placer, 4,000 kg, Q-fit carriage; side tilt-rotate carriage, 5,443 kg", href: "/products/attachments", source: "Spread 05" },
    { text: "Man basket, 4-person, working height to 17 m; fork frame", href: "/products/attachments", source: "Spread 05" },
  ] },
  { id: "forklifts", label: "Forklifts", items: [
    { text: "Mast assemblies 1.5-15 t, lift heights to 14 m, with carriage assemblies", href: "/products#masts", source: "Spread 04" },
    { text: "Steer axles and special steel profiles", href: "/products#forged", source: "Spread 02" },
    { text: "Forged forks 1-6 t, 1,000-2,000 mm blade lengths", href: "/products#forged", source: "Spread 06" },
    { text: "Drum handler for 200-litre drums; side tilt-rotate carriage", href: "/products/attachments", source: "Spread 05" },
  ] },
  { id: "cranes", label: "Cranes", items: [
    { text: "Man basket for pick-n-carry cranes, 4-person, working height to 17 m", href: "/products/attachments", source: "Spread 05" },
    { text: "Pole planter, 180 degree rotation, for pole erection", href: "/products/attachments", source: "Spread 05" },
    { text: "Forged lifting hooks 6.3-25 t SWL to IS 15560, every hook load-tested", href: "/products#forged", source: "Spread 06" },
  ] },
  { id: "compactors", label: "Soil compactors", items: [
    { text: "Compactor drum, 12 mm wall x 635.3 mm diameter, 1.6 m and 1.8 m lengths, to Caterpillar drawings", href: "/products#components", source: "Spread 04" },
    { text: "Suspension bearing machined from 40 mm high-tensile plate, for Kubota", href: "/products#components", source: "Spread 04" },
    { text: "Oil-filled unbalanced mass, for Kubota", href: "/products#components", source: "Spread 04" },
  ] },
  { id: "excavators", label: "Excavators and wheel loaders", items: [
    { text: "Excavator bucket fabricated and machined to Caterpillar drawings, container-loaded for North America", href: "/products#components", source: "Spread 04" },
    { text: "Structural fabrications and machined linkages", source: "Spread 02" },
  ] },
  { id: "harvesters", label: "Combine harvesters", items: [
    { text: "Machined plate to CLAAS drawings, exported to Germany", href: "/products#components", source: "Spread 04" },
    { text: "Ball race and rotation ring half-pairs, plated to CLAAS's norm, shipped monthly", href: "/products#components", source: "Spread 04" },
    { text: "Straw and sugarcane grabs", href: "/products/attachments", source: "Spread 02" },
  ] },
  { id: "graders", label: "Motor graders", items: [
    { text: "Motor-grader front axle, fully assembled and painted, direct-on-line", href: "/products#axles", source: "Spread 04" },
  ] },
  { id: "rail", label: "Rail and metro", items: [
    { text: "Precision components for railway equipment makers", source: "Spread 02" },
    { text: "Pole planter for rail-track, metro and power-transmission work", href: "/products/attachments", source: "Spread 05" },
  ] },
];
