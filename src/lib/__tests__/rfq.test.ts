import { describe, expect, it } from "vitest";
import { validateRfqStep, buildContactPayload, rfqFamilies, type RfqDraft } from "../rfq";

const full: RfqDraft = {
  family: "Axle and steering assemblies",
  quantityBand: "500-5,000 a year",
  grade: "EN19",
  drawingStatus: "2D and 3D available",
  timeline: "Within 3 months",
  name: "Priya Nair",
  company: "Example OEM",
  email: "priya@example-oem.com",
  phone: "+44 1234 567890",
  notes: "Two part numbers, annual contract.",
};

describe("validateRfqStep", () => {
  it("step 1 requires a family", () => {
    expect(validateRfqStep(1, {})).toHaveProperty("family");
    expect(validateRfqStep(1, { family: rfqFamilies[0] })).toEqual({});
  });
  it("step 2 requires quantity band and timeline only", () => {
    const e = validateRfqStep(2, {});
    expect(e).toHaveProperty("quantityBand");
    expect(e).toHaveProperty("timeline");
    expect(e).not.toHaveProperty("grade");
  });
  it("step 2 is optional for a plant visit or co-development enquiry", () => {
    expect(validateRfqStep(2, { family: "Plant visit or supplier audit" })).toEqual({});
    expect(validateRfqStep(2, { family: "Co-development / new product introduction" })).toEqual({});
    expect(validateRfqStep(2, { family: rfqFamilies[0] })).toHaveProperty("quantityBand");
  });
  it("step 3 requires name, company and a valid email", () => {
    const e = validateRfqStep(3, { email: "nope" });
    expect(e).toHaveProperty("name");
    expect(e).toHaveProperty("company");
    expect(e.email).toMatch(/valid/i);
    expect(validateRfqStep(3, { name: "A", company: "B", email: "a@b.co" })).toEqual({});
  });
  it("rejects whitespace-only required fields", () => {
    expect(validateRfqStep(3, { name: "   ", company: "B", email: "a@b.co" })).toHaveProperty("name");
  });
});

describe("buildContactPayload", () => {
  it("targets the /api/contact contract with an RFQ subject", () => {
    const p = buildContactPayload(full);
    expect(p.subject).toBe("RFQ - Axle and steering assemblies");
    expect(p.name).toBe("Priya Nair");
    expect(p.email).toBe("priya@example-oem.com");
  });
  it("serialises every answered field and omits empty optional lines", () => {
    const p = buildContactPayload(full);
    for (const s of ["Enquiry: Axle and steering assemblies", "Quantity band: 500-5,000 a year", "Material / grade: EN19", "Timeline: Within 3 months", "Two part numbers"]) expect(p.message).toContain(s);
    const q = buildContactPayload({ ...full, grade: "", notes: "" });
    expect(q.message).not.toContain("Material / grade:");
  });
});
