// Spread 11, right: "Trusted by industry leaders". The authoritative public customer list, 24 logos in print order.
export interface Customer { id: string; name: string; logo: string; width: number; height: number; source: "Spread 11" }

export const customersIntro = {
  eyebrow: "Our customers",
  headline: { lead: "Trusted by", mark: "industry leaders" },
  body: "Most customers shown here buy from JREW as sole supplier or direct-on-line.",
  source: "Spread 11",
} as const;

// width and height are the mark's own, read from the file: next/image reserves the box from them,
// and a shared nominal size would reserve the wrong shape for most of the wall.
const c = (id: string, name: string, width: number, height: number): Customer => ({ id, name, logo: `/logos/${id}.svg`, width, height, source: "Spread 11" });

export const customers: Customer[] = [
  c("jcb", "JCB", 87, 39), c("caterpillar", "Caterpillar", 135, 29), c("kion", "KION Group", 97, 40), c("hyster-yale", "Hyster-Yale", 139, 40),
  c("godrej", "Godrej", 93, 53), c("ace", "ACE", 72, 34), c("leeboy", "LeeBoy", 107, 42), c("claas", "CLAAS", 134, 30),
  c("manitou", "Manitou", 111, 23), c("terex", "Terex", 123, 30), c("volvo", "Volvo", 60, 58), c("faiveley", "Faiveley Transport", 138, 39),
  c("maini", "Maini", 62, 62), c("escorts-kubota", "Escorts Kubota", 800, 461), c("mahindra", "Mahindra", 104, 52), c("doosan", "Doosan", 85, 43),
  c("josts", "Josts", 108, 55), c("puma", "Puma", 129, 31), c("linde", "Linde", 105, 36), c("skyjack", "Skyjack", 128, 41),
  c("preet", "Preet", 800, 431), c("bobcat", "Bobcat", 100, 33), c("cmpl", "CMPL", 72, 55), c("cnh-industrial", "CNH Industrial", 72, 45),
];

export const associations = [
  { id: "icema", name: "iCEMA, Indian Construction Equipment Manufacturers' Association", logo: "/associations/icema.svg" },
  { id: "make-in-india", name: "Make in India", logo: "/associations/make-in-india.svg" },
  { id: "greenco", name: "CII GreenCo", logo: "/associations/greenco.svg" },
  { id: "cii", name: "CII Active Member", logo: "/associations/cii.svg" },
  { id: "tuv-rheinland", name: "TÜV Rheinland certified: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018", logo: "/associations/tuv-rheinland.svg" },
] as const;
