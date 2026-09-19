// POST /api/contact: JSON { name, email, message, company?, phone?, subject?, source?, submissionId?, website? (honeypot) }.
// Guards: same-origin, JSON content type, 64 KB cap, per-IP rate limit, honeypot. Every field is bounded and
// header-safe (src/lib/validate.ts). Delivery: SMTP with timeouts and one retry, idempotent on submissionId,
// each submission gets a reference (JREW-YYYYMMDD-XXXXX) returned to the sender and written into the mail.
// Without SMTP the route fails visibly (500) unless ALLOW_CONSOLE_DELIVERY=1 on a non-Vercel machine.
// Routine logs never carry names, addresses, phone numbers or message text. Responses are never cached.
import { checkField, emailProblem, MAX_JSON_BYTES } from "@/lib/validate";
import { esc, smtpConfigured, consoleDeliveryAllowed, transport, sendWithRetry, clientIp, originProblem, contentTypeProblem, sizeProblem, rateLimited, claimSubmission, logSummary, reply } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const guard = originProblem(request) || contentTypeProblem(request, "json") || sizeProblem(request, MAX_JSON_BYTES);
    if (guard) return reply({ error: guard }, guard.startsWith("Cross") ? 403 : guard.startsWith("Send") ? 415 : 413);
    if (rateLimited(`contact:${clientIp(request)}`)) return reply({ error: "Too many submissions. Please try again later." }, 429);

    let body: Record<string, unknown>;
    try {
      const parsed: unknown = await request.json();
      body = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
    } catch {
      return reply({ error: "Malformed request." }, 400);
    }

    // Honeypot: a field no human sees. Filled means a bot; accept quietly and drop it.
    if (typeof body.website === "string" && body.website.trim()) return reply({ success: true, delivered: "discarded" });

    const fields = {
      name: checkField("name", body.name),
      company: checkField("company", body.company),
      email: checkField("email", body.email),
      phone: checkField("phone", body.phone),
      subject: checkField("subject", body.subject),
      message: checkField("message", body.message),
      source: checkField("subject", body.source),
    };
    const tooLong = Object.values(fields).find((f) => f.error);
    if (tooLong?.error) return reply({ error: tooLong.error }, 400);

    const name = fields.name.value, company = fields.company.value, email = fields.email.value, phone = fields.phone.value, message = fields.message.value, source = fields.source.value;
    const subject = fields.subject.value || "General enquiry";
    if (!name || !email || !message) return reply({ error: "Name, email and message are required." }, 400);
    const emailErr = emailProblem(email);
    if (emailErr) return reply({ error: emailErr }, 400);

    const { ref, duplicate } = claimSubmission(typeof body.submissionId === "string" ? body.submissionId : undefined);
    if (duplicate) return reply({ success: true, delivered: "duplicate", reference: ref });

    const html = `<div style="font-family:Arial,sans-serif;max-width:640px;color:#1a1a1a">
      <h2 style="border-bottom:3px solid #fbba2d;padding-bottom:8px">New enquiry via jrew.co.in</h2>
      <p style="margin:8px 0 0;color:#555">Reference <strong style="color:#1a1a1a">${ref}</strong>${source ? ` · from ${esc(source)}` : ""}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px">
        <tr><td style="padding:6px 0;width:150px;color:#555">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Company</td><td>${esc(company) || "not given"}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Email</td><td>${esc(email)}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Phone</td><td>${esc(phone) || "not given"}</td></tr>
        <tr><td style="padding:6px 0;color:#555">Subject</td><td>${esc(subject)}</td></tr>
      </table>
      <p style="margin-top:14px;white-space:pre-line;line-height:1.6">${esc(message)}</p></div>`;

    if (smtpConfigured()) {
      const t = transport();
      await sendWithRetry(() =>
        t.sendMail({
          from: `"JREW website" <${process.env.SMTP_USER}>`,
          replyTo: email,
          to: process.env.ENQUIRY_EMAIL || "enquiry@jrew.co.in",
          subject: `[${ref}] ${subject}: ${name}${company ? ` (${company})` : ""}`,
          html,
        }),
      );
      // Acknowledgement to the sender: fixed text plus the reference, nothing submitted is echoed; failure never blocks the lead.
      await t
        .sendMail({
          from: `"JREW Engineering" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `JREW Engineering: enquiry received (${ref})`,
          text: `Thank you. Your enquiry has reached the JREW Engineering commercial team under reference ${ref}. A reply will come from enquiry@jrew.co.in. Where drawings are involved we send an NDA first. JREW Engineering Limited, Mohali, Punjab, India.`,
        })
        .catch((e: unknown) => console.warn("[CONTACT] acknowledgement not sent", logSummary(ref, email, subject, { error: String(e).slice(0, 120) })));
      console.info("[CONTACT] delivered", logSummary(ref, email, subject, { messageChars: message.length }));
      return reply({ success: true, delivered: "smtp", reference: ref });
    }
    if (consoleDeliveryAllowed()) {
      console.log("[CONTACT] console delivery (local development)", logSummary(ref, email, subject, { messageChars: message.length, hasPhone: phone ? 1 : 0 }));
      return reply({ success: true, delivered: "console", reference: ref });
    }
    console.error("[CONTACT] mail is not configured; submission refused", logSummary(ref, email, subject));
    return reply({ error: "Mail is not configured. Please email enquiry@jrew.co.in directly." }, 500);
  } catch (err) {
    console.error("Contact API error:", err instanceof Error ? err.message : "unknown");
    return reply({ error: "Failed to send. Please try again or email enquiry@jrew.co.in." }, 500);
  }
}
