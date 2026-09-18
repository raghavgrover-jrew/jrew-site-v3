// Pure validation and serialisation for the RFQ intake. UI-free and unit-tested.
// The serialised payload targets /api/contact (name, email, message required).

export interface RfqDraft {
  family: string;
  quantityBand: string;
  grade: string;
  drawingStatus: string;
  timeline: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

export type RfqErrors = Partial<Record<keyof RfqDraft, string>>;

export const rfqFamilies = [
  "Forklift mast systems and carriage assemblies",
  "Axle and steering assemblies",
  "Structural and precision components",
  "Attachments and work tools",
  "Forged products and special steel profiles",
  "STAKON material handling equipment",
  "Co-development / new product introduction",
  "Plant visit or supplier audit",
] as const;

export const rfqQuantityBands = ["Prototype / under 50", "50-500 a year", "500-5,000 a year", "5,000+ a year", "Not applicable"] as const;
export const rfqDrawingStatus = ["2D and 3D available", "2D drawings only", "Sample part only", "Co-development needed"] as const;
export const rfqTimelines = ["Immediate requirement", "Within 3 months", "3-6 months", "Exploratory", "Not applicable"] as const;

/** A plant visit, audit or co-development enquiry has no volume yet; step 2 becomes optional. */
export function volumeOptionalFor(family?: string): boolean {
  return family === "Plant visit or supplier audit" || family === "Co-development / new product introduction";
}

import { EMAIL_RE } from "@/lib/validate";

const filled = (v?: string) => Boolean(v && v.trim().length > 0);

export function validateRfqStep(step: 1 | 2 | 3, d: Partial<RfqDraft>): RfqErrors {
  const errors: RfqErrors = {};
  if (step === 1 && !filled(d.family)) errors.family = "Select what the enquiry is about.";
  if (step === 2 && !volumeOptionalFor(d.family)) {
    if (!filled(d.quantityBand)) errors.quantityBand = "Select an annual quantity band.";
    if (!filled(d.timeline)) errors.timeline = "Select a sourcing timeline.";
  }
  if (step === 3) {
    if (!filled(d.name)) errors.name = "Your name is required.";
    if (!filled(d.company)) errors.company = "Company is required.";
    if (!filled(d.email)) errors.email = "Work email is required.";
    else if (!EMAIL_RE.test(d.email!.trim())) errors.email = "Enter a valid email address.";
  }
  return errors;
}

export function buildContactPayload(d: RfqDraft) {
  const lines = [
    ["Enquiry", d.family],
    ["Quantity band", d.quantityBand],
    ["Material / grade", d.grade],
    ["Drawings", d.drawingStatus],
    ["Timeline", d.timeline],
  ]
    .filter(([, v]) => filled(v))
    .map(([k, v]) => `${k}: ${v!.trim()}`);

  const message = [filled(d.notes) ? d.notes.trim() : null, "", ...lines]
    .filter((l): l is string => l !== null)
    .join("\n")
    .trim();

  return { name: d.name.trim(), company: d.company.trim(), email: d.email.trim(), phone: d.phone.trim(), subject: `RFQ - ${d.family}`, message };
}
