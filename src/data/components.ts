// Spread 04, right: "Machined to OEM drawings". Eight component cards, each naming the OEM
// and why the tolerance matters. Copy verbatim from the printed brochure.
export interface ComponentCard {
  id: string;
  part: string;
  customer: string;
  detail: string;
  image: string;
  imageAlt: string;
  source: "Spread 04";
}

export const componentsIntro = { eyebrow: "Structural and precision components", headline: { lead: "Machined to", mark: "OEM drawings" } } as const;

export const components: ComponentCard[] = [
  {
    id: "dipper-baseplate",
    part: "Dipper baseplate",
    customer: "JCB",
    detail:
      "Machined to drawing for the inner dipper assembly on JCB's 15 ft 6 in dipper, cleared on first article. Every mounting feature sets the geometry of the arm above it.",
    image: "/images/components/dipper-baseplate.jpg",
    imageAlt: "Long machined dipper baseplate for a backhoe-loader inner dipper",
    source: "Spread 04",
  },
  {
    id: "machined-plate",
    part: "Machined plate",
    customer: "CLAAS",
    detail:
      "Machined to CLAAS drawings on a drilling-and-chamfering fixture that JREW's own tool room designed and built for the job, then packed in a purpose-engineered export box for Germany.",
    image: "/images/components/machined-plate.jpg",
    imageAlt: "Triangular machined steel plate with a central bore and bolt pattern",
    source: "Spread 04",
  },
  {
    id: "suspension-bearing",
    part: "Suspension bearing",
    customer: "Kubota",
    detail:
      "Machined from 40 mm high-tensile plate to OEM drawings, the joint that isolates drum vibration, so bore alignment and finish decide how the compactor feels to run.",
    image: "/images/components/suspension-bearing.jpg",
    imageAlt: "Machined suspension bearing block for a vibratory compactor",
    source: "Spread 04",
  },
  {
    id: "latch-assembly",
    part: "Latch assembly",
    customer: "Manitou",
    detail:
      "Precision-machined locking interface for rapid work-tool changeover, built to Manitou drawings. Fit is gauged on every unit before dispatch; the operator cannot correct it in the field.",
    image: "/images/components/latch-assembly.jpg",
    imageAlt: "Yellow latch assembly for a telehandler quick-change interface",
    source: "Spread 04",
  },
  {
    id: "unbalanced-mass",
    part: "Unbalanced mass",
    customer: "Kubota",
    detail:
      "Fabricated hollow mass, oil-filled to smooth the motion and take the noise out of the vibration. Fill and balance are set at build; neither is correctable once closed.",
    image: "/images/components/unbalanced-mass.jpg",
    imageAlt: "Yellow fabricated unbalanced mass for a compactor vibration system",
    source: "Spread 04",
  },
  {
    id: "excavator-bucket",
    part: "Excavator bucket",
    customer: "Caterpillar",
    detail:
      "Fabricated and machined to Caterpillar drawings, then palletized to the customer's packing drawing and container-loaded for North America, untouched from our floor to their line.",
    image: "/images/components/excavator-bucket.jpg",
    imageAlt: "Fabricated excavator bucket with teeth",
    source: "Spread 04",
  },
  {
    id: "ball-race",
    part: "Ball race and rotation ring",
    customer: "CLAAS",
    detail:
      "Matched large-diameter half-ring pairs, precision machined and surface-plated to CLAAS's own norm, then shipped to Germany monthly. Hundreds per release, running continuously.",
    image: "/images/components/ball-race-rotation-ring.jpg",
    imageAlt: "Large-diameter machined half ring for a rotation bearing",
    source: "Spread 04",
  },
  {
    id: "compactor-drum",
    part: "Compactor drum",
    customer: "Caterpillar",
    detail:
      "Rolled and long-seam welded cylinder, 12 mm wall x 635.3 mm diameter, in 1.6 m and 1.8 m lengths. Painted and fitted with vibro-motor studs.",
    image: "/images/components/compactor-drum.jpg",
    imageAlt: "Rolled and welded compactor drum cylinder",
    source: "Spread 04",
  },
];
