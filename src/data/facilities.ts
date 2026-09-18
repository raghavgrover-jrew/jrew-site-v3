// Spread 07, left: "Four units. Two states. One greenfield rising." Addresses are live-site
// values, not in the brochure; the unit-to-plot mapping needs Raghav's confirmation.
export interface Facility {
  id: string;
  code: string;
  city: string;
  role: string;
  established: number;
  sqft: number;
  description: string;
  equipment?: string;
  address: string;
  addressConfirmed: false;
  lat: number;
  lng: number;
  image: string;
  imageAlt: string;
  source: "Spread 07";
}

export const facilitiesIntro = {
  eyebrow: "Manufacturing facilities",
  headline: { lead: "Four units. Two states.", mark: "One greenfield rising." },
  body: "Four units across two states, two in Mohali (Punjab), two in Faridabad (Haryana), for customer proximity and scale. A fifth greenfield plant is under development at Rajpura, Punjab.",
  source: "Spread 07",
} as const;

export const facilities: Facility[] = [
  {
    id: "moh-1", code: "MOH 1", city: "Mohali", role: "Fabrication and machining", established: 2001, sqft: 50000,
    description: "Medium/heavy fabricated assemblies with pre- and post-fab machining for backhoe loaders, excavators, forklifts and stackers.",
    equipment: "CNC profile cutting, horizontal boring, plano miller, surface grinder; Doosan DNM 650/50II VMC and Puma V8300 VTL; Hyundai HMC 630; OTC NB61 6-axis robotic welding; shot blasting; submerged arc welding.",
    address: "C-99, Industrial Area Phase VII, SAS Nagar, Mohali 160055, Punjab", addressConfirmed: false, lat: 30.70, lng: 76.69,
    image: "/images/facilities/moh-1.jpg", imageAlt: "MOH 1 machine shop with CNC machining centres", source: "Spread 07",
  },
  {
    id: "fbd-1", code: "FBD 1", city: "Faridabad", role: "Mother plant", established: 2007, sqft: 60000,
    description: "Assembled, painted backhoe-loader front axles JIT to JCB, ECEL, Caterpillar, Doosan Bobcat, Manitou and Preet Agro; full backhoe, skid-steer and Loadall attachment manufacture; dedicated conveyor line and paint shop.",
    equipment: "6 kW ProArc laser cutting, export assembly and paint line facilities, robotic welding cells (OTC), plate rolling, CNC bending, levelling; shot blasting; VMCs, HMCs, turning centres.",
    address: "Plot No. 128, Sector 25, Faridabad 121004, Haryana", addressConfirmed: false, lat: 28.41, lng: 77.31,
    image: "/images/facilities/fbd-1.jpg", imageAlt: "FBD 1 fabrication hall with axle assembly line", source: "Spread 07",
  },
  {
    id: "fbd-2", code: "FBD 2", city: "Faridabad", role: "Feeder plant", established: 2024, sqft: 10000,
    description: "Supplies sub-assemblies, fabricated parts and machined components to keep the Faridabad JIT axle and attachment lines running at volume.",
    equipment: "Kjellberg ProArc HD CNC oxy/plasma cutting (300 A; plasma to 40 mm, oxy to 200 mm), 12 kW ProArc laser cutting, Hindustan Hydraulics press brake (300 tonnes).",
    address: "Plot No. 238, Sector 58, Faridabad 121006, Haryana", addressConfirmed: false, lat: 28.45, lng: 77.34,
    image: "/images/facilities/fbd-2.jpg", imageAlt: "FBD 2 plasma cutting bay", source: "Spread 07",
  },
  {
    id: "moh-2", code: "MOH 2", city: "Mohali", role: "Corporate HQ, research and development, STAKON", established: 2026, sqft: 40000,
    description: "Corporate headquarters, finance, procurement and human resources, with an R&D wing housing engineering, design, development and the tool room, co-located with the STAKON material handling equipment plant.",
    address: "C-97, Industrial Area Phase VII, SAS Nagar, Mohali 160055, Punjab", addressConfirmed: false, lat: 30.70, lng: 76.69,
    image: "/images/facilities/moh-2.jpg", imageAlt: "MOH 2 corporate headquarters building exterior", source: "Spread 07",
  },
];

export const rajpura = {
  name: "Rajpura greenfield",
  year: 2027,
  sqft: 600000,
  body: "600,000 sq ft, ERP/MES-integrated and automation-ready, built to support larger global OEM programmes and export growth. Phase 1 of the greenfield campus begins operations in 2027.",
  lat: 30.48, lng: 76.59,
  source: "Spread 10",
} as const;
