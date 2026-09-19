// POST /api/careers: multipart FormData with name, email, resume (File, required), phone?, position?,
// experience?, message?, submissionId?, website? (honeypot).
// Guards: same-origin, multipart content type, size cap, per-IP rate limit, honeypot; fields bounded and
// header-safe; resume allowed only as PDF, DOC or DOCX by extension, declared type, file signature and, for
// DOCX, package structure; under 4 MB; never written to disk. Idempotent on submissionId with a reference.
// Note for the deploy checklist: attachments are forwarded to HR as received; virus scanning or a
// quarantine link store is an infrastructure decision (BUILD-REPORT, Needs approval).
import { checkField, emailProblem, resumeProblem, docxLooksReal, MAX_MULTIPART_BYTES, MAX_RESUME } from "@/lib/validate";
import { esc, smtpConfigured, consoleDeliveryAllowed, transport, sendWithRetry, clientIp, originProblem, contentTypeProblem, sizeProblem, rateLimited, claimSubmission, logSummary, reply } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const guard = originProblem(request) || contentTypeProblem(request, "multipart") || sizeProblem(request, MAX_MULTIPART_BYTES);
    if (guard) return reply({ error: guard }, guard.startsWith("Cross") ? 403 : guard.startsWith("Send") ? 415 : 413);
    if (rateLimited(`careers:${clientIp(request)}`)) return reply({ error: "Too many submissions. Please try again later." }, 429);

    let fd: FormData;
    try {
      fd = await request.formData();
    } catch {
      return reply({ error: "Malformed request." }, 400);
    }
    const raw = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" ? v : "";
    };
    if (raw("website").trim()) return reply({ success: true, delivered: "discarded" });

    const fields = {
      name: checkField("name", raw("name")),
      email: checkField("email", raw("email")),
      phone: checkField("phone", raw("phone")),
      position: checkField("position", raw("position")),
      experience: checkField("experience", raw("experience")),
      message: checkField("message", raw("message")),
    };
    const tooLong = Object.values(fields).find((f) => f.error);
    if (tooLong?.error) return reply({ error: tooLong.error }, 400);
    const name = fields.name.value, email = fields.email.value, phone = fields.phone.value, position = fields.position.value, experience = fields.experience.value, message = fields.message.value;
    if (!name || !email) return reply({ error: "Name and email are required." }, 400);
    const emailErr = emailProblem(email);
    if (emailErr) return reply({ error: emailErr }, 400);

    const resume = fd.get("resume");
    const file = resume instanceof File ? resume : null;
    const bytes = file && file.size > 0 && file.size <= MAX_RESUME ? new Uint8Array(await file.arrayBuffer()) : undefined;
    const resumeErr = resumeProblem(file, bytes?.subarray(0, 8));
    if (resumeErr || !file || !bytes) return reply({ error: resumeErr ?? "Attach a resume." }, 400);
    if (file.name.toLowerCase().endsWith(".docx") && !docxLooksReal(bytes)) return reply({ error: "The file does not look like a Word document." }, 400);
    const safeFilename = file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120);

    const { ref, duplicate } = claimSubmission(raw("submissionId") || undefined);
    if (duplicate) return reply({ success: true, delivered: "duplicate", reference: ref });

    const html = `<div style="font-family:Arial,sans-serif;max-width:640px;color:#1a1a1a">
      <h2 style="border-bottom:3px solid #fbba2d;padding-bottom:8px">Career application via jrew.co.in</h2>
      <p style="margin:8px 0 0;color:#555">Reference <strong style="color:#1a1a1a">${ref}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px">
        <tr><td style="padding:6px 0;width:150px;color:#555">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Email</td><td>${esc(email)}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Phone</td><td>${esc(phone) || "not given"}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Area</td><td>${esc(position) || "not given"}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Experience</td><td>${esc(experience) || "not given"}</td></tr>
      </table>
      ${message ? `<p style="margin-top:14px;white-space:pre-line;line-height:1.6">${esc(message)}</p>` : ""}
      <p style="color:#555">Resume attached: ${esc(safeFilename)} (${Math.round(file.size / 1024)} KB). Attachments arrive unscanned; open with care.</p></div>`;

    if (smtpConfigured()) {
      await sendWithRetry(() =>
        transport().sendMail({
          from: `"JREW careers" <${process.env.SMTP_USER}>`,
          replyTo: email,
          to: process.env.CAREERS_EMAIL || "careers@jrew.co.in",
          subject: `[${ref}] Application: ${position || "General"}: ${name}`,
          html,
          attachments: [{ filename: safeFilename, content: Buffer.from(bytes), contentType: file.type || "application/octet-stream" }],
        }),
      );
      console.info("[CAREERS] delivered", logSummary(ref, email, position || "General", { resumeKB: Math.round(file.size / 1024) }));
      return reply({ success: true, delivered: "smtp", reference: ref });
    }
    if (consoleDeliveryAllowed()) {
      console.log("[CAREERS] console delivery (local development)", logSummary(ref, email, position || "General", { resumeKB: Math.round(file.size / 1024) }));
      return reply({ success: true, delivered: "console", reference: ref });
    }
    console.error("[CAREERS] mail is not configured; submission refused", logSummary(ref, email, position || "General"));
    return reply({ error: "Mail is not configured. Please email careers@jrew.co.in directly." }, 500);
  } catch (err) {
    console.error("Careers API error:", err instanceof Error ? err.message : "unknown");
    return reply({ error: "Failed to send. Please try again or email careers@jrew.co.in." }, 500);
  }
}
