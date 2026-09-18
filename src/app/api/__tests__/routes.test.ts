// API route behaviour without a server: call the handlers with real Request objects.
// No SMTP env is set here, so successful submissions take the console fallback.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST as contact } from "@/app/api/contact/route";
import { POST as careers } from "@/app/api/careers/route";
import { resetRateLimit } from "@/lib/mail";

const json = (body: unknown, ip = "203.0.113.10") =>
  new Request("http://localhost/api/contact", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: typeof body === "string" ? body : JSON.stringify(body) });

const valid = { name: "Test Buyer", company: "OEM Ltd", email: "buyer@example.com", subject: "RFQ", message: "Two drawings attached by mail." };

const multipart = (fields: Record<string, string>, file?: { name: string; type: string; bytes: Uint8Array }, ip = "203.0.113.20") => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  if (file) fd.set("resume", new File([file.bytes as unknown as BlobPart], file.name, { type: file.type }));
  return new Request("http://localhost/api/careers", { method: "POST", headers: { "x-forwarded-for": ip }, body: fd });
};
const PDF = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, ...new Array(64).fill(0x20)]);
const EXE = new Uint8Array([0x4d, 0x5a, 0x90, 0x00, ...new Array(64).fill(0)]);

beforeEach(() => {
  resetRateLimit();
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("/api/contact", () => {
  it("accepts a valid enquiry and falls back to console without SMTP", async () => {
    const res = await contact(json(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, delivered: "console" });
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
    const logged = (console.log as unknown as { mock: { calls: unknown[][] } }).mock.calls.at(-1)?.[1] as { subject: string };
    expect(logged.subject).toBe("s Bcc: x@y.z");
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
  it("accepts a PDF resume", async () => {
    const res = await careers(multipart(person, { name: "cv.pdf", type: "application/pdf", bytes: PDF }));
    expect(res.status).toBe(200);
    expect((await res.json()).delivered).toBe("console");
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
});
