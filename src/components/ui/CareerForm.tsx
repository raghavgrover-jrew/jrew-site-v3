"use client";

import { useState } from "react";
import { contact } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Field, StatusBanner, inputCls } from "@/components/ui/forms";
import { Button } from "@/components/ui/Button";

const AREAS = ["Design and manufacturing engineering", "Quality and metrology", "CNC machining and shop floor", "Welding and fabrication", "Supply chain and planning", "Sales and business development", "STAKON engineering, service or sales", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function CareerForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    if (!String(fd.get("name") || "").trim()) errs.name = "Your name is required.";
    const email = String(fd.get("email") || "").trim();
    if (!email) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(email)) errs.email = "Enter a valid email address.";
    const resume = fd.get("resume") as File | null;
    if (!resume || resume.size === 0) errs.resume = "Attach a resume, PDF preferred.";
    else if (resume.size > 5 * 1024 * 1024) errs.resume = "Keep the file under 5 MB.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/careers", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-ink bg-paper p-7" role="status">
        <p className="eyebrow">Application received</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">HR reads every application. If there is a fit now or in the next quarter, you will hear from us at the address you gave.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line-strong bg-paper p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="ca-name" error={errors.name}>
          <input id="ca-name" name="name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} />
        </Field>
        <Field label="Email" htmlFor="ca-email" error={errors.email}>
          <input id="ca-email" name="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} />
        </Field>
        <Field label="Phone" htmlFor="ca-phone" optional>
          <input id="ca-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </Field>
        <Field label="Area" htmlFor="ca-position">
          <select id="ca-position" name="position" className={inputCls} defaultValue={AREAS[0]}>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </Field>
        <Field label="Experience" htmlFor="ca-exp" optional>
          <input id="ca-exp" name="experience" placeholder="e.g. 6 years, fabrication QA" className={inputCls} />
        </Field>
        <Field label="Resume" htmlFor="ca-resume" error={errors.resume} hint="PDF, DOC or DOCX, under 5 MB.">
          <input id="ca-resume" name="resume" type="file" accept=".pdf,.doc,.docx" className={cn(inputCls, "file:mr-4 file:border-0 file:bg-card-warm file:px-3 file:py-1 file:font-semibold")} aria-invalid={!!errors.resume} />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Message" htmlFor="ca-message" optional>
          <textarea id="ca-message" name="message" rows={4} className={cn(inputCls, "resize-y")} />
        </Field>
      </div>
      {status === "error" ? <div className="mt-4"><StatusBanner>The application did not send. Retry, or email {contact.careersEmail}.</StatusBanner></div> : null}
      <Button type="submit" className="mt-6" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending" : "Submit application"}
      </Button>
    </form>
  );
}
