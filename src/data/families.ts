// Spread 04, left: "Six families, one source." plus the mast and axle family detail.
export interface Family {
  id: string;
  name: string;
  short: string;
  headline: { lead: string; mark: string };
  href: string;
  image: string;
  imageAlt: string;
  source: "Spread 04" | "Spread 05" | "Spread 06";
}

export const familiesIntro =
  "From forklift mast systems and front axles to structural components, engineered attachments, forged products and our own STAKON equipment, engineered to OEM drawings and shipped worldwide.";

export const families: Family[] = [
  {
    id: "masts",
    name: "Forklift mast systems and carriage assemblies",
    short: "1.5-15 t capacity, lift heights to 14 m, proprietary hot-rolled C and I profiles",
    headline: { lead: "Mast systems,", mark: "fully operational" },
    href: "/products#masts",
    image: "/images/products/mast-assembly.jpg",
    imageAlt: "Two-stage forklift mast assembly with carriage, cut out on white",
    source: "Spread 04",
  },
  {
    id: "axles",
    name: "Axle and steering assemblies",
    short: "40,000+ assemblies a year across 10+ variants, delivered direct-on-line",
    headline: { lead: "Direct-on-line,", mark: "sole-supplier axles" },
    href: "/products#axles",
    image: "/images/products/front-axle-assembly.jpg",
    imageAlt: "Fabricated and machined backhoe-loader front axle assembly with steering cylinder",
    source: "Spread 04",
  },
  {
    id: "components",
    name: "Structural and precision components",
    short: "Machined to OEM drawings for JCB, CLAAS, Kubota, Manitou and Caterpillar",
    headline: { lead: "Machined to", mark: "OEM drawings" },
    href: "/products#components",
    image: "/images/components/latch-assembly.jpg",
    imageAlt: "Yellow precision-machined latch assembly for a telehandler work-tool interface",
    source: "Spread 04",
  },
  {
    id: "attachments",
    name: "Attachments and work tools",
    short: "100+ varieties for backhoe loaders, skid steers, telehandlers, forklifts and cranes",
    headline: { lead: "India's widest", mark: "attachment range" },
    href: "/products/attachments",
    image: "/images/attachments/hd-fork-with-grab.jpg",
    imageAlt: "Heavy-duty fork with hydraulic top grab and Hardox tines",
    source: "Spread 05",
  },
  {
    id: "forged",
    name: "Forged products and special steel profiles",
    short: "Lifting hooks 6.3-25 t SWL to IS 15560, forks 1-6 t, hot-rolled profiles",
    headline: { lead: "Forged,", mark: "load-tested" },
    href: "/products#forged",
    image: "/images/forged/forged-forks.jpg",
    imageAlt: "Pair of forged forklift forks",
    source: "Spread 06",
  },
  {
    id: "stakon",
    name: "STAKON material handling equipment",
    short: "Electric and semi-electric stackers and pallet trucks, 500 kg to 2,000 kg, lifting to 6.3 m",
    headline: { lead: "From components to", mark: "complete machines" },
    href: "/stakon",
    image: "/images/stakon/stacker-hero.png",
    imageAlt: "STAKON fully electric pallet stacker",
    source: "Spread 06",
  },
];

// Spread 04, left: mast family
export const mastFamily = {
  eyebrow: "Forklift mast systems and carriage assemblies",
  headline: { lead: "Mast systems,", mark: "fully operational" },
  body:
    "Precision-engineered, fully operational mast assemblies from 1.5-15 t capacity and lift heights up to 14 metres. Built on proprietary C and I profiles hot-rolled and mountable on forklifts of any brand with a compatible arrangement. Carriage assemblies included.",
  pills: ["Compatibility across brands", "Up to 15 tonnes capacity", "Up to 14 metres height", "Proprietary steel profiles"],
  image: "/images/products/mast-assembly.jpg",
  source: "Spread 04",
} as const;

// Spread 04, left: axle family
export const axleFamily = {
  eyebrow: "Axle and steering assemblies",
  headline: { lead: "Direct-on-line,", mark: "sole-supplier axles" },
  body:
    "Fully fabricated, machined, assembled and painted axle assemblies delivered direct-on-line to OEM production facilities, many under sole-supplier arrangements, over 40,000 assemblies a year across 10+ variants.",
  variants: [
    "Backhoe-loader front axle (300 kg) with hydraulic steering cylinder, fully assembled and painted, direct-on-line to most Indian OEMs",
    "Front axle variant with unbalanced steering cylinder and track rod",
    "Fabricated and precision-machined front axle (165 kg) to Caterpillar drawings and standards",
    "Motor-grader front axle, fully assembled and painted, direct-on-line",
    "JREW-designed 2WD backhoe-loader steering axle, designed, built, assembled and painted in-house; adopted by Doosan Bobcat India and Preet Agro",
  ],
  image: "/images/products/front-axle-assembly.jpg",
  source: "Spread 04",
} as const;
