// Shared input rules for the forms and the API routes. Pure, no React, no Node-only APIs,
// so the same limits run in the browser (early feedback) and on the server (the real check).

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Maximum lengths per field, after trimming. Header-bound fields are short on purpose. */
export const LIMITS = {
  name: 200,
  company: 200,
  subject: 200,
  position: 200,
  experience: 200,
  phone: 40,
  email: 254,
  message: 10_000,
} as const;

export type LimitedField = keyof typeof LIMITS;

/** Resume upload: 4 MB keeps the multipart body under Vercel's 4.5 MB function limit. */
export const MAX_RESUME = 4 * 1024 * 1024;
/** Whole-request caps checked against Content-Length before parsing. */
export const MAX_JSON_BYTES = 64 * 1024;
export const MAX_MULTIPART_BYTES = MAX_RESUME + 64 * 1024;
export const RESUME_HINT = "PDF, DOC or DOCX, under 4 MB.";

const RESUME_TYPES: Record<string, string[]> = {
  pdf: ["application/pdf"],
  doc: ["application/msword"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};

/** Anything that could break out of a mail header becomes a space. */
export function headerSafe(s: string): string {
  return s.replace(/[\r\n\t\0]+/g, " ").trim();
}

/** Trim, neutralise header characters, and report a bound violation as a message. */
export function checkField(field: LimitedField, raw: unknown): { value: string; error?: string } {
  const value = typeof raw === "string" ? headerSafe(raw) : "";
  if (value.length > LIMITS[field]) return { value, error: `${field} is too long (max ${LIMITS[field]} characters).` };
  return { value };
}

export function emailProblem(email: string): string | null {
  if (!email) return "Email is required.";
  if (!EMAIL_RE.test(email)) return "Enter a valid email address.";
  return null;
}

/**
 * Resume acceptance: present, non-empty, within size, extension and declared MIME on the allowlist,
 * and (when the first bytes are supplied) a matching file signature. Returns a human message or null.
 */
export function resumeProblem(file: { name: string; size: number; type: string } | null | undefined, head?: Uint8Array): string | null {
  if (!file || file.size === 0) return "Attach a resume, PDF preferred.";
  if (file.size > MAX_RESUME) return "Keep the file under 4 MB.";
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const allowed = RESUME_TYPES[ext];
  if (!allowed) return "Resume must be a PDF, DOC or DOCX file.";
  // Browsers sometimes send an empty or generic type; an explicit foreign type is rejected.
  if (file.type && file.type !== "application/octet-stream" && !allowed.includes(file.type)) return "Resume must be a PDF, DOC or DOCX file.";
  if (head && head.length >= 4) {
    const isPdf = head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46; // %PDF
    const isZip = head[0] === 0x50 && head[1] === 0x4b && head[2] === 0x03 && head[3] === 0x04; // PK.. (docx)
    const isOle = head[0] === 0xd0 && head[1] === 0xcf && head[2] === 0x11 && head[3] === 0xe0; // legacy .doc
    const ok = (ext === "pdf" && isPdf) || (ext === "docx" && isZip) || (ext === "doc" && (isOle || isZip));
    if (!ok) return "The file does not look like a PDF, DOC or DOCX.";
  }
  return null;
}

/**
 * A ZIP signature alone does not make a DOCX. A real Word package carries a `[Content_Types].xml`
 * entry and a `word/` folder; both names appear as ASCII in the archive's local headers and central
 * directory, so a byte search over the file is enough to reject a renamed archive.
 */
export function docxLooksReal(bytes: Uint8Array): boolean {
  const text = new TextDecoder("latin1").decode(bytes);
  return text.includes("[Content_Types].xml") && text.includes("word/");
}
