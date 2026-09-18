// POST /api/careers: multipart FormData with name, email, resume (File, required), phone?, position?,
// experience?, message?, website? (honeypot). Fields are bounded and header-safe; the resume must be a
// PDF, DOC or DOCX by extension, declared type and file signature, under 4 MB. Nothing is written to disk.
// SMTP policy matches /api/contact: preview and local log, production refuses when unconfigured.
import { NextResponse } from "next/server";
import { checkField, emailProblem, resumeProblem } from "@/lib/validate";
import { esc, smtpConfigured, isProduction, transport, clientIp, rateLimited } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    if (rateLimited(`careers:${clientIp(request)}`)) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

    let fd: FormData;
    try {
      fd = await request.formData();
    } catch {
      return NextResponse.json({ error: "Malformed request." }, { status: 400 });
    }
    const raw = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" ? v : "";
    };
    if (raw("website").trim()) return NextResponse.json({ success: true, delivered: "discarded" });

    const fields = {
      name: checkField("name", raw("name")),
      email: checkField("email", raw("email")),
      phone: checkField("phone", raw("phone")),
      position: checkField("position", raw("position")),
      experience: checkField("experience", raw("experience")),
      message: checkField("message", raw("message")),
    };
    const tooLong = Object.values(fields).find((f) => f.error);
    if (tooLong?.error) return NextResponse.json({ error: tooLong.error }, { status: 400 });
    const name = fields.name.value, email = fields.email.value, phone = fields.phone.value, position = fields.position.value, experience = fields.experience.value, message = fields.message.value;
    if (!name || !email) return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    const emailErr = emailProblem(email);
    if (emailErr) return NextResponse.json({ error: emailErr }, { status: 400 });

    const resume = fd.get("resume");
    const file = resume instanceof File ? resume : null;
    const bytes = file && file.size > 0 && file.size <= 4 * 1024 * 1024 ? new Uint8Array(await file.arrayBuffer()) : undefined;
    const resumeErr = resumeProblem(file, bytes?.subarray(0, 8));
    if (resumeErr || !file || !bytes) return NextResponse.json({ error: resumeErr ?? "Attach a resume." }, { status: 400 });
    const safeFilename = file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120);

    const html = `<div style="font-family:Arial,sans-serif;max-width:640px;color:#1a1a1a">
      <h2 style="border-bottom:3px solid #fbba2d;padding-bottom:8px">Career application via jrew.co.in</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:12px">
        <tr><td style="padding:6px 0;width:150px;color:#555">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Email</td><td>${esc(email)}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Phone</td><td>${esc(phone) || "not given"}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Area</td><td>${esc(position) || "not given"}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Experience</td><td>${esc(experience) || "not given"}</td></tr>
      </table>
      ${message ? `<p style="margin-top:14px;white-space:pre-line;line-height:1.6">${esc(message)}</p>` : ""}
      <p style="color:#555">Resume attached: ${esc(safeFilename)} (${Math.round(file.size / 1024)} KB)</p></div>`;

    if (smtpConfigured()) {
      await transport().sendMail({
        from: `"JREW careers" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: process.env.CAREERS_EMAIL || "careers@jrew.co.in",
        subject: `Application: ${position || "General"}: ${name}`,
        html,
        attachments: [{ filename: safeFilename, content: Buffer.from(bytes), contentType: file.type || "application/octet-stream" }],
      });
      return NextResponse.json({ success: true, delivered: "smtp" });
    }
    if (isProduction()) {
      console.error("[CAREERS] SMTP is not configured in production; submission refused.");
      return NextResponse.json({ error: "Mail is not configured. Please email careers@jrew.co.in directly." }, { status: 500 });
    }
    console.log("[CAREERS] SMTP not configured; submission logged:", { name, email, phone, position, experience, message, resume: `${safeFilename} (${file.size} bytes)` });
    return NextResponse.json({ success: true, delivered: "console" });
  } catch (err) {
    console.error("Careers API error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again or email careers@jrew.co.in." }, { status: 500 });
  }
}
