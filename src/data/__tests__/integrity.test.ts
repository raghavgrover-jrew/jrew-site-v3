// Data integrity and content rails. Every figure on the site must trace to the 2026 brochure
// (or an approved source), every image path must exist case-exactly, and banned terms must be absent.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { stats } from "../stats";
import { sectors } from "../sectors";
import { families } from "../families";
import { components } from "../components";
import { attachments, attachmentCategories } from "../attachments";
import { processStages } from "../process";
import { facilities } from "../facilities";
import { milestones, eras } from "../milestones";
import { certifications } from "../quality";
import { customers } from "../customers";
import { whyJrew } from "../whyJrew";
import { awards } from "../awards";

const ROOT = path.resolve(__dirname, "../../..");
const PUBLIC = path.join(ROOT, "public");

function existsCaseExact(rel: string) {
  const parts = rel.replace(/^\//, "").split("/");
  let dir = PUBLIC;
  for (const part of parts) {
    if (!fs.existsSync(dir)) return false;
    if (!fs.readdirSync(dir).includes(part)) return false;
    dir = path.join(dir, part);
  }
  return true;
}

function walk(dir: string, out: string[] = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name) && !p.includes("__tests__")) out.push(p);
  }
  return out;
}

function collectStrings(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collectStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collectStrings(x, out));
  return out;
}

const allData = { stats, sectors, families, components, attachments, processStages, facilities, milestones, certifications, customers, whyJrew, awards };

describe("brochure counts", () => {
  it("matches the printed brochure", () => {
    expect(stats).toHaveLength(6);
    expect(sectors).toHaveLength(4);
    expect(families).toHaveLength(6);
    expect(components).toHaveLength(8);
    expect(attachments).toHaveLength(14);
    expect(attachmentCategories).toHaveLength(5);
    expect(processStages).toHaveLength(9);
    expect(facilities).toHaveLength(4);
    expect(milestones).toHaveLength(18);
    expect(eras).toHaveLength(3);
    expect(certifications).toHaveLength(5);
    expect(customers).toHaveLength(24);
    expect(whyJrew).toHaveLength(4);
    expect(awards.length).toBeGreaterThanOrEqual(5);
  });
});

describe("sources and images", () => {
  it("every record carries a brochure source", () => {
    const records = [...stats, ...sectors, ...families, ...components, ...attachments, ...processStages, ...facilities, ...milestones, ...certifications, ...customers, ...whyJrew, ...awards];
    for (const r of records) {
      expect((r as { source?: string }).source, JSON.stringify(r).slice(0, 80)).toMatch(/^Spread (0[1-9]|1[0-2])/);
    }
  });
  it("every image path exists case-exactly under public/", () => {
    const paths = collectStrings(allData).filter((s) => s.startsWith("/images/") || s.startsWith("/logos/") || s.startsWith("/lineart/") || s.startsWith("/associations/") || s.startsWith("/brand/"));
    expect(paths.length).toBeGreaterThan(40);
    const missing = paths.filter((p) => !existsCaseExact(p));
    expect(missing, `missing: ${missing.join(", ")}`).toEqual([]);
  });
});

describe("content rails", () => {
  const files = walk(path.join(ROOT, "src"));
  const banned = [/Crown Equipment/i, /\bJLG\b/, /\bSany\b/, /Toyota Material/i, /\bHAMM\b/, /\bGenie\b/, /Trion/i, /Quadron/i, /\bHR-7\b/, /Lyfton/i, /Bhaskaran/i, /OHSAS/i, /of Revenue/i, /\[Year\]/, /\bTBD\b/, /lorem ipsum/i, /EBITDA/i, /120,000 sq ?ft/i, /210,000/, /200,000\+? ?sq/i];
  it("no em or en dashes in source", () => {
    const hits = files.filter((f) => /[—–]/.test(fs.readFileSync(f, "utf8")));
    expect(hits.map((h) => path.relative(ROOT, h))).toEqual([]);
  });
  it("no banned terms in source", () => {
    const hits: string[] = [];
    for (const f of files) {
      const text = fs.readFileSync(f, "utf8");
      for (const re of banned) if (re.test(text)) hits.push(`${path.relative(ROOT, f)}: ${re}`);
    }
    expect(hits).toEqual([]);
  });
});
