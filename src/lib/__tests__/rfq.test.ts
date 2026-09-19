import { describe, expect, it } from "vitest";
import { validateRfqStep, buildContactPayload, familyFromSlug, rfqFamilies, rfqFamilySlugs, rfqHrefFor, type RfqDraft, type RfqFamilySlug } from "../rfq";
import { rfqHref } from "../site";
import { families } from "@/data/families";

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

describe("family preselection from a product link", () => {
  it("maps every slug to a family the picker actually offers", () => {
    for (const [slug, family] of Object.entries(rfqFamilySlugs)) {
      expect(rfqFamilies).toContain(family);
      expect(familyFromSlug(slug)).toBe(family);
    }
  });
  it("covers every product family on the site", () => {
    for (const f of families) {
      const slug = Object.keys(rfqFamilySlugs).find((k) => rfqFamilySlugs[k as RfqFamilySlug] === f.name);
      expect(slug, `no RFQ slug for family "${f.name}"`).toBeTruthy();
    }
  });
  it("tolerates case and padding, rejects anything else", () => {
    expect(familyFromSlug(" Axles ")).toBe("Axle and steering assemblies");
    expect(familyFromSlug("")).toBeUndefined();
    expect(familyFromSlug(null)).toBeUndefined();
    expect(familyFromSlug("pumps")).toBeUndefined();
    expect(familyFromSlug("constructor")).toBeUndefined();
    expect(familyFromSlug("__proto__")).toBeUndefined();
  });
  it("builds a link that lands on the RFQ panel", () => {
    expect(rfqHrefFor("stakon")).toBe("/contact?enquiry=stakon#rfq");
    expect(rfqHrefFor("masts").startsWith(rfqHref.replace("#rfq", ""))).toBe(true);
    expect(rfqHrefFor("masts").endsWith("#rfq")).toBe(true);
  });
  it("a preselected draft still has to answer the remaining steps", () => {
    const draft = { family: familyFromSlug("masts") };
    expect(validateRfqStep(1, draft)).toEqual({});
    expect(validateRfqStep(2, draft)).toHaveProperty("quantityBand");
  });
});
