// Spread 02, left: "Five decades, measured". Six snapshot stats plus the four-row table.
export interface Stat {
  value: number;
  display?: string; // when the printed value is not a plain number
  prefix?: string;
  suffix?: string;
  label: string;
  countUp: boolean;
  source: "Spread 02";
}

export const stats: Stat[] = [
  { value: 1973, display: "1973", label: "Established in Chandigarh", countUp: false, source: "Spread 02" },
  { value: 50, prefix: "USD ", suffix: "M+", label: "Annual turnover", countUp: true, source: "Spread 02" },
  { value: 1000, suffix: "+", label: "Employees", countUp: true, source: "Spread 02" },
  { value: 40000, suffix: "+", label: "Axle assemblies a year, 10+ variants", countUp: true, source: "Spread 02" },
  { value: 10, suffix: "+", label: "Export countries", countUp: true, source: "Spread 02" },
  { value: 0, display: "0 PPM", label: "Quality record, global", countUp: false, source: "Spread 02" },
];

export const snapshotTable = [
  { key: "Units", value: "4 across 2 states | greenfield under development", source: "Spread 02" },
  { key: "Certifications", value: "ISO 9001 | 14001 | 45001 | Green Co. | EN ISO 3834-2", source: "Spread 02" },
  { key: "Range", value: "100+ attachment varieties | own brand STAKON", source: "Spread 02" },
  { key: "Exports", value: "North America, Europe and Asia, since 2010", source: "Spread 02" },
] as const;
