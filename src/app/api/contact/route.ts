// POST /api/contact: JSON { name, email, message, company?, phone?, subject? }.
// Sends via nodemailer when SMTP_HOST, SMTP_USER and SMTP_PASS are set; otherwise logs to the server console
// and still returns success so the form never fails silently in preview.
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const get = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
    const name = get("name"), company = get("company"), email = get("email"), phone = get("phone"), subject = get("subject") || "General enquiry", message = get("message");
    if (!name || !email || !message) return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    if (message.length > 10000) return NextResponse.json({ error: "Message is too long." }, { status: 400 });

    const html = `<div style="font-family:Arial,sans-serif;max-width:640px;color:#1a1a1a">
      <h2 style="border-bottom:3px solid #fbba2d;padding-bottom:8px">New enquiry via jrew.co.in</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:12px">
        <tr><td style="padding:6px 0;width:150px;color:#555">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Company</td><td>${esc(company) || "not given"}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Email</td><td>${esc(email)}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Phone</td><td>${esc(phone) || "not given"}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Subject</td><td>${esc(subject)}</td></tr>
      </table>
      <p style="margin-top:14px;white-space:pre-line;line-height:1.6">${esc(message)}</p></div>`;

    const configured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    if (configured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_PORT === "465",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"JREW website" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: process.env.ENQUIRY_EMAIL || "enquiry@jrew.co.in",
        subject: `${subject}: ${name}${company ? ` (${company})` : ""}`,
        html,
      });
      return NextResponse.json({ success: true, delivered: "smtp" });
    }
    console.log("[CONTACT] SMTP not configured; submission logged:", { name, company, email, phone, subject, message });
    return NextResponse.json({ success: true, delivered: "console" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again or email enquiry@jrew.co.in." }, { status: 500 });
  }
}
