// Spread 06, left: "Forged, load-tested".
export const forgedIntro = { eyebrow: "Forged products and special steel profiles", headline: { lead: "Forged,", mark: "load-tested" }, source: "Spread 06" } as const;

export const forgedProducts = [
  { id: "hooks", name: "Lifting hooks", body: "Forged from high-tensile steel to IS 15560, sold under the JREW brand; every hook load-tested in-house.", spec: "6.3-25 t SWL", image: "/images/forged/lifting-hook.jpg", imageAlt: "Forged lifting hook", source: "Spread 06" },
  { id: "forks", name: "Forged forks", body: "Forklift forks in special alloy steel to international standards.", spec: "1-6 t capacity, 1,000-2,000 mm blade lengths", image: "/images/forged/forged-forks.jpg", imageAlt: "Pair of forged forklift forks", source: "Spread 06" },
  { id: "profiles", name: "Special steel profiles", body: "Hot-rolling of profiles for material handling equipment, elevators and construction, developed as import substitution.", spec: "Hot-rolled", image: "/images/forged/special-steel-profiles.jpg", imageAlt: "Fan of hot-rolled special steel profile sections", source: "Spread 06" },
] as const;

export const forgedStrip = [
  { title: "Materials", body: "High-tensile and special-alloy steels from approved mills." },
  { title: "Testing", body: "In-house load testing, NDT and dimensional inspection." },
  { title: "Applications", body: "Lifting, material handling, elevators and construction." },
  { title: "Development", body: "Customer-specific solutions and import-substitution profiles." },
] as const;
