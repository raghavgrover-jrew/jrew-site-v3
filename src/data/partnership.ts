// Spread 08: engineering partnership (left) and process capability proof (right).
export const partnership = {
  eyebrow: "Engineering partnership",
  headline: { lead: "An engineering-first partner,", mark: "from concept to production" },
  body:
    "We engineer alongside customers from the development stage, designing, standardising and implementing processes through PPAP and APQP. An in-house team works with customer engineering from concept to production: design, simulation, prototyping and validation under one roof.",
  steps: [
    { title: "Design collaboration", body: "3D modelling, DFM and tolerance-stack analysis; FEA for structural and fatigue performance." },
    { title: "Prototype and validation", body: "Rapid prototyping and tooled-up sample lots, with dedicated prototype assembly and inspection." },
    { title: "Production ramp", body: "First-article production with full PPAP, customer-witnessed validation, CMM and endurance testing." },
    { title: "Continual improvement", body: "APQP-led development discipline, the engineering-first approach behind our zero-PPM record." },
  ],
  images: [
    { src: "/images/engineering/design-review.jpg", alt: "Engineers reviewing a 3D loader-arm model on a wall screen" },
    { src: "/images/engineering/fixture.jpg", alt: "Welding fixture on a stand in the tool room" },
  ],
  source: "Spread 08",
} as const;

export const proof = {
  eyebrow: "Process capability",
  headline: { lead: "Engineered proof.", mark: "Proven in production." },
  body: "Capabilities validated in real programmes, built for scale, repeatability and delivery.",
  rows: [
    { title: "Sole-source axle programme", body: "Dedicated assembly/paint line, 40,000+ direct-on-line JIT assemblies/year across 10+ variants; sole supplier for 20+ years to multiple customers." },
    { title: "In-house design adopted by OEMs", body: "Universal 2WD backhoe-loader steering axle, designed and validated in-house, standard fitment at Doosan Bobcat India and Preet Agro." },
    { title: "Complete mast-system engineering", body: "Billet casting through hot-rolling, machining, fabrication, coating, assembly and testing, under one roof." },
    { title: "Attachments at scale", body: "100+ varieties across customer and JREW designs, packaged and container-stuffed on JREW premises for North America and Europe." },
  ],
  panel: [
    { title: "Proven quality", value: "0 PPM", body: "Zero-PPM performance for components supplied globally." },
    { title: "APQP + PPAP", body: "At development; PPAP for new product introductions." },
    { title: "Quality circles", body: "Internal and CII Quality Circle competitions, with curriculum based training." },
  ],
  image: { src: "/images/engineering/robotic-welding.jpg", alt: "Two robotic welding cells at work with weld sparks" },
  source: "Spread 08",
} as const;
