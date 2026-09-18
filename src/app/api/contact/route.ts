// POST /api/contact: JSON { name, email, message, company?, phone?, subject?, website? (honeypot) }.
// Every field is bounded and header-safe (src/lib/validate.ts). Sends via nodemailer when SMTP_HOST,
// SMTP_USER and SMTP_PASS are set. Without SMTP: previews and local log the submission and return
// success (so the form path can be exercised); production returns 500 so a misconfiguration is never silent.
import { NextResponse } from "next/server";
import { checkField, emailProblem } from "@/lib/validate";
import { esc, smtpConfigured, isProduction, transport, clientIp, rateLimited } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    if (rateLimited(`contact:${clientIp(request)}`)) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

    let body: Record<string, unknown>;
    try {
      const parsed: unknown = await request.json();
      body = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
    } catch {
      return NextResponse.json({ error: "Malformed request." }, { status: 400 });
    }

    // Honeypot: a field no human sees. Filled means a bot; accept quietly and drop it.
    if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ success: true, delivered: "discarded" });

    const fields = {
      name: checkField("name", body.name),
      company: checkField("company", body.company),
      email: checkField("email", body.email),
      phone: checkField("phone", body.phone),
      subject: checkField("subject", body.subject),
      message: checkField("message", body.message),
    };
    const tooLong = Object.values(fields).find((f) => f.error);
    if (tooLong?.error) return NextResponse.json({ error: tooLong.error }, { status: 400 });

    const name = fields.name.value, company = fields.company.value, email = fields.email.value, phone = fields.phone.value, message = fields.message.value;
    const subject = fields.subject.value || "General enquiry";
    if (!name || !email || !message) return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    const emailErr = emailProblem(email);
    if (emailErr) return NextResponse.json({ error: emailErr }, { status: 400 });

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

    if (smtpConfigured()) {
      await transport().sendMail({
        from: `"JREW website" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: process.env.ENQUIRY_EMAIL || "enquiry@jrew.co.in",
        subject: `${subject}: ${name}${company ? ` (${company})` : ""}`,
        html,
      });
      return NextResponse.json({ success: true, delivered: "smtp" });
    }
    if (isProduction()) {
      console.error("[CONTACT] SMTP is not configured in production; submission refused.");
      return NextResponse.json({ error: "Mail is not configured. Please email enquiry@jrew.co.in directly." }, { status: 500 });
    }
    console.log("[CONTACT] SMTP not configured; submission logged:", { name, company, email, phone, subject, message });
    return NextResponse.json({ success: true, delivered: "console" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again or email enquiry@jrew.co.in." }, { status: 500 });
  }
}
