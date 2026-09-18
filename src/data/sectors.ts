// Spread 02, right: "Four sectors, one platform".
export interface Sector {
  id: string;
  name: string;
  description: string;
  lineArt: string;
  lineArtAlt: string;
  source: "Spread 02";
}

export const sectorsIntro =
  "Components and assemblies for four equipment sectors. Each list names what JREW makes for those machines today.";

export const sectors: Sector[] = [
  {
    id: "construction",
    name: "Construction equipment",
    description:
      "Assembled steer front axles, loader arms, crossrails structural fabrications, machined linkages, compactor components and work-tool attachments for backhoe loaders, wheel loaders, excavators, telehandlers, skid steers and soil compactors.",
    lineArt: "/lineart/excavator.svg",
    lineArtAlt: "Line drawing of a tracked excavator",
    source: "Spread 02",
  },
  {
    id: "material-handling",
    name: "Material handling",
    description:
      "Mast assemblies, carriages, steer axles, special steel profiles, forged forks and attachments for forklift trucks; electric stackers and warehouse equipment.",
    lineArt: "/lineart/forklift.svg",
    lineArtAlt: "Line drawing of a counterbalance forklift",
    source: "Spread 02",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    description:
      "Precision components and handling attachments, from straw and sugarcane grabs to large-format combine-harvester components.",
    lineArt: "/lineart/combine-harvester.svg",
    lineArtAlt: "Line drawing of a combine harvester",
    source: "Spread 02",
  },
  {
    id: "railways",
    name: "Railways",
    description:
      "Precision components for railway equipment makers, plus rail-side infrastructure attachments such as pole erection for rail tracks and metro projects.",
    lineArt: "/lineart/locomotive.svg",
    lineArtAlt: "Line drawing of a diesel locomotive",
    source: "Spread 02",
  },
];
