"use client";

import { useState } from "react";
import { contact } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Field, StatusBanner, inputCls } from "@/components/ui/forms";
import { Button } from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      subject: String(fd.get("subject") || "").trim() || "General enquiry",
      message: String(fd.get("message") || "").trim(),
    };
    const errs: Record<string, string> = {};
    if (!data.name) errs.name = "Your name is required.";
    if (!data.email) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(data.email)) errs.email = "Enter a valid email address.";
    if (!data.message) errs.message = "Say what you need; one line is fine.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
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
        <p className="eyebrow">Enquiry received</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">Replies come from {contact.email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line-strong bg-paper p-6 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="en-name" error={errors.name}>
          <input id="en-name" name="name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} />
        </Field>
        <Field label="Company" htmlFor="en-company" optional>
          <input id="en-company" name="company" autoComplete="organization" className={inputCls} />
        </Field>
        <Field label="Email" htmlFor="en-email" error={errors.email}>
          <input id="en-email" name="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} />
        </Field>
        <Field label="Subject" htmlFor="en-subject" optional>
          <input id="en-subject" name="subject" className={inputCls} />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Message" htmlFor="en-message" error={errors.message}>
          <textarea id="en-message" name="message" rows={4} className={cn(inputCls, "resize-y")} aria-invalid={!!errors.message} />
        </Field>
      </div>
      {status === "error" ? <div className="mt-4"><StatusBanner>Did not send. Retry, or email {contact.email} directly.</StatusBanner></div> : null}
      <Button type="submit" className="mt-6" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending" : "Send enquiry"}
      </Button>
    </form>
  );
}
