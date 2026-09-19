// API route behaviour without a server: call the handlers with real Request objects.
// No SMTP env is set here; ALLOW_CONSOLE_DELIVERY=1 makes the routes take the local console path
// (as the QA harness does), and one test proves that without the flag a submission fails visibly.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as contact } from "@/app/api/contact/route";
import { POST as careers } from "@/app/api/careers/route";
import { resetRateLimit } from "@/lib/mail";

const json = (body: unknown, ip = "203.0.113.10", headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/contact", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip, ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });

const valid = { name: "Test Buyer", company: "OEM Ltd", email: "buyer@example.com", subject: "RFQ", message: "Two drawings attached by mail." };

const multipart = (fields: Record<string, string>, file?: { name: string; type: string; bytes: Uint8Array }, ip = "203.0.113.20") => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  if (file) fd.set("resume", new File([file.bytes as unknown as BlobPart], file.name, { type: file.type }));
  return new Request("http://localhost/api/careers", { method: "POST", headers: { "x-forwarded-for": ip }, body: fd });
};
const PDF = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, ...new Array(64).fill(0x20)]);
const EXE = new Uint8Array([0x4d, 0x5a, 0x90, 0x00, ...new Array(64).fill(0)]);
const ZIP_ONLY = new Uint8Array([0x50, 0x4b, 0x03, 0x04, ...new Array(64).fill(0)]);
const DOCX = new Uint8Array([0x50, 0x4b, 0x03, 0x04, ...new TextEncoder().encode("....[Content_Types].xml....word/document.xml....")]);

let logs: unknown[][];
beforeEach(() => {
  resetRateLimit();
  process.env.ALLOW_CONSOLE_DELIVERY = "1";
  delete process.env.VERCEL;
  logs = [];
  vi.spyOn(console, "log").mockImplementation((...a) => { logs.push(a); });
  vi.spyOn(console, "info").mockImplementation((...a) => { logs.push(a); });
  vi.spyOn(console, "error").mockImplementation((...a) => { logs.push(a); });
});
afterEach(() => vi.restoreAllMocks());

describe("/api/contact", () => {
  it("accepts a valid enquiry, returns a reference, and takes the console path locally", async () => {
    const res = await contact(json(valid));
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.delivered).toBe("console");
    expect(body.reference).toMatch(/^JREW-\d{8}-[A-Z2-9]{5}$/);
  });
  it("fails visibly when mail is not configured and console delivery is not allowed", async () => {
    delete process.env.ALLOW_CONSOLE_DELIVERY;
    const res = await contact(json(valid));
    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/not configured/);
  });
  it("never allows console delivery on Vercel", async () => {
    process.env.VERCEL = "1";
    expect((await contact(json(valid))).status).toBe(500);
  });
  it("keeps names, addresses and message text out of logs", async () => {
    await contact(json({ ...valid, phone: "+91 98765 43210", message: "SECRET DRAWING NOTES" }));
    const flat = JSON.stringify(logs);
    expect(flat).not.toContain("Test Buyer");
    expect(flat).not.toContain("buyer@example.com");
    expect(flat).not.toContain("SECRET DRAWING NOTES");
    expect(flat).not.toContain("98765");
    expect(flat).toContain("example.com");
  });
  it("returns the same reference for a retried submissionId without a second delivery", async () => {
    const first = await (await contact(json({ ...valid, submissionId: "abcd-1234-efgh" }))).json();
    const again = await (await contact(json({ ...valid, submissionId: "abcd-1234-efgh" }))).json();
    expect(again.delivered).toBe("duplicate");
    expect(again.reference).toBe(first.reference);
    expect(logs.filter((l) => String(l[0]).includes("console delivery")).length).toBe(1);
  });
  it("refuses cross-site origins, wrong content types and oversized bodies", async () => {
    expect((await contact(json(valid, "203.0.113.11", { origin: "https://evil.example", host: "localhost" }))).status).toBe(403);
    expect((await contact(json(valid, "203.0.113.12", { origin: "http://localhost", host: "localhost" }))).status).toBe(200);
    expect((await contact(json(valid, "203.0.113.13", { "content-type": "text/plain" }))).status).toBe(415);
    expect((await contact(json(valid, "203.0.113.14", { "content-length": String(70 * 1024) }))).status).toBe(413);
  });
  it("rejects malformed JSON with 400", async () => {
    expect((await contact(json("{not json"))).status).toBe(400);
    expect((await contact(json("null"))).status).toBe(400);
  });
  it("requires name, email and message", async () => {
    expect((await contact(json({ ...valid, message: "" }))).status).toBe(400);
    expect((await contact(json({ email: "a@b.co" }))).status).toBe(400);
  });
  it("rejects an invalid email", async () => {
    const res = await contact(json({ ...valid, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/valid email/);
  });
  it("bounds every field", async () => {
    expect((await contact(json({ ...valid, name: "x".repeat(201) }))).status).toBe(400);
    expect((await contact(json({ ...valid, subject: "x".repeat(201) }))).status).toBe(400);
    expect((await contact(json({ ...valid, message: "x".repeat(10_001) }))).status).toBe(400);
    expect((await contact(json({ ...valid, phone: "1".repeat(41) }))).status).toBe(400);
  });
  it("neutralises header line breaks in short fields", async () => {
    const res = await contact(json({ ...valid, subject: "s\r\nBcc: x@y.z" }));
    expect(res.status).toBe(200);
    const summary = logs.find((l) => String(l[0]).includes("console delivery"))?.[1] as { subject: string };
    expect(summary.subject).toBe("s Bcc: x@y.z");
  });
  it("drops honeypot submissions quietly", async () => {
    const res = await contact(json({ ...valid, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect((await res.json()).delivered).toBe("discarded");
  });
  it("rate-limits the eleventh submission from one address in a window", async () => {
    for (let i = 0; i < 10; i++) expect((await contact(json(valid, "198.51.100.7"))).status).toBe(200);
    expect((await contact(json(valid, "198.51.100.7"))).status).toBe(429);
    expect((await contact(json(valid, "198.51.100.8"))).status).toBe(200);
  });
});

describe("/api/careers", () => {
  const person = { name: "Applicant", email: "app@example.com", position: "Quality and metrology" };
  it("accepts a PDF resume and returns a reference", async () => {
    const res = await careers(multipart(person, { name: "cv.pdf", type: "application/pdf", bytes: PDF }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.delivered).toBe("console");
    expect(body.reference).toMatch(/^JREW-/);
  });
  it("accepts a real DOCX and rejects a bare ZIP renamed .docx", async () => {
    const t = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    expect((await careers(multipart(person, { name: "cv.docx", type: t, bytes: DOCX }))).status).toBe(200);
    expect((await careers(multipart(person, { name: "cv.docx", type: t, bytes: ZIP_ONLY }))).status).toBe(400);
  });
  it("requires a resume", async () => {
    const res = await careers(multipart(person));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/Attach a resume/);
  });
  it("rejects an executable, whatever it is called", async () => {
    expect((await careers(multipart(person, { name: "cv.exe", type: "application/x-msdownload", bytes: EXE }))).status).toBe(400);
    expect((await careers(multipart(person, { name: "cv.pdf", type: "application/pdf", bytes: EXE }))).status).toBe(400);
    expect((await careers(multipart(person, { name: "cv.pdf", type: "application/x-msdownload", bytes: PDF }))).status).toBe(400);
  });
  it("rejects a resume over 4 MB", async () => {
    const big = new Uint8Array(4 * 1024 * 1024 + 1);
    big.set(PDF.subarray(0, 8));
    const res = await careers(multipart(person, { name: "cv.pdf", type: "application/pdf", bytes: big }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/4 MB/);
  });
  it("bounds fields and validates email", async () => {
    expect((await careers(multipart({ ...person, email: "nope" }, { name: "cv.pdf", type: "application/pdf", bytes: PDF }))).status).toBe(400);
    expect((await careers(multipart({ ...person, name: "x".repeat(201) }, { name: "cv.pdf", type: "application/pdf", bytes: PDF }))).status).toBe(400);
  });
  it("drops honeypot submissions quietly", async () => {
    const res = await careers(multipart({ ...person, website: "spam" }, { name: "cv.pdf", type: "application/pdf", bytes: PDF }));
    expect((await res.json()).delivered).toBe("discarded");
  });
  it("keeps applicant details out of logs", async () => {
    await careers(multipart({ ...person, phone: "+91 91234 56789" }, { name: "cv.pdf", type: "application/pdf", bytes: PDF }));
    const flat = JSON.stringify(logs);
    expect(flat).not.toContain("Applicant");
    expect(flat).not.toContain("app@example.com");
    expect(flat).not.toContain("91234");
  });
});
