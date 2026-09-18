// POST /api/careers: multipart FormData with name, email, phone?, position?, experience?, message?, resume (File).
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
const MAX_RESUME = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const fd = await request.formData();
    const get = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" ? v.trim() : "";
    };
    const name = get("name"), email = get("email"), phone = get("phone"), position = get("position"), experience = get("experience"), message = get("message");
    const resume = fd.get("resume");
    if (!name || !email) return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    if (resume instanceof File && resume.size > MAX_RESUME) return NextResponse.json({ error: "Resume must be under 5 MB." }, { status: 400 });

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
      ${resume instanceof File && resume.size > 0 ? `<p style="color:#555">Resume attached: ${esc(resume.name)}</p>` : ""}</div>`;

    const configured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    if (configured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_PORT === "465",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      const attachments = resume instanceof File && resume.size > 0 ? [{ filename: resume.name, content: Buffer.from(await resume.arrayBuffer()), contentType: resume.type || "application/octet-stream" }] : [];
      await transporter.sendMail({
        from: `"JREW careers" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: process.env.CAREERS_EMAIL || "careers@jrew.co.in",
        subject: `Application: ${position || "General"}: ${name}`,
        html,
        attachments,
      });
      return NextResponse.json({ success: true, delivered: "smtp" });
    }
    console.log("[CAREERS] SMTP not configured; submission logged:", { name, email, phone, position, experience, message, resume: resume instanceof File ? resume.name : "none" });
    return NextResponse.json({ success: true, delivered: "console" });
  } catch (err) {
    console.error("Careers API error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again or email careers@jrew.co.in." }, { status: 500 });
  }
}
