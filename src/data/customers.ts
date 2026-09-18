// Spread 11, right: "Trusted by industry leaders". The authoritative public customer list, 24 logos in print order.
export interface Customer { id: string; name: string; logo: string; source: "Spread 11" }

export const customersIntro = {
  eyebrow: "Our customers",
  headline: { lead: "Trusted by", mark: "industry leaders" },
  body: "Most customers shown here buy from JREW as sole supplier or direct-on-line.",
  source: "Spread 11",
} as const;

const c = (id: string, name: string): Customer => ({ id, name, logo: `/logos/${id}.svg`, source: "Spread 11" });

export const customers: Customer[] = [
  c("jcb", "JCB"), c("caterpillar", "Caterpillar"), c("kion", "KION Group"), c("hyster-yale", "Hyster-Yale"),
  c("godrej", "Godrej"), c("ace", "ACE"), c("leeboy", "LeeBoy"), c("claas", "CLAAS"),
  c("manitou", "Manitou"), c("terex", "Terex"), c("volvo", "Volvo"), c("faiveley", "Faiveley Transport"),
  c("maini", "Maini"), c("escorts-kubota", "Escorts Kubota"), c("mahindra", "Mahindra"), c("doosan", "Doosan"),
  c("josts", "Josts"), c("puma", "Puma"), c("linde", "Linde"), c("skyjack", "Skyjack"),
  c("preet", "Preet"), c("bobcat", "Bobcat"), c("cmpl", "CMPL"), c("cnh-industrial", "CNH Industrial"),
];

export const associations = [
  { id: "icema", name: "iCEMA, Indian Construction Equipment Manufacturers' Association", logo: "/associations/icema.svg" },
  { id: "make-in-india", name: "Make in India", logo: "/associations/make-in-india.svg" },
  { id: "greenco", name: "CII GreenCo", logo: "/associations/greenco.svg" },
  { id: "cii", name: "CII Active Member", logo: "/associations/cii.svg" },
  { id: "tuv-rheinland", name: "TUV Rheinland certified: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018", logo: "/associations/tuv-rheinland.svg" },
] as const;
