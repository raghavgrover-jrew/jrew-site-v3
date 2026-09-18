"use client";

// Three steps plus review. Validated by lib/rfq.ts, posted to /api/contact. Full keyboard path,
// per-field errors, distinct submitting / success / failure states; entries survive a failed submit.

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { contact } from "@/lib/site";
import { validateRfqStep, buildContactPayload, rfqFamilies, rfqQuantityBands, rfqDrawingStatus, rfqTimelines, type RfqDraft, type RfqErrors } from "@/lib/rfq";
import { Field, RadioGrid, StatusBanner, inputCls } from "@/components/ui/forms";
import { Button } from "@/components/ui/Button";

const STEPS = ["Enquiry", "Requirements", "Contact", "Review"] as const;
const EMPTY: RfqDraft = { family: "", quantityBand: "", grade: "", drawingStatus: "", timeline: "", name: "", company: "", email: "", phone: "", notes: "" };
const EASE = [0.16, 1, 0.3, 1] as const;

export function RfqFlow({ idPrefix = "rfq" }: { idPrefix?: string }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<RfqDraft>(EMPTY);
  const [errors, setErrors] = useState<RfqErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const id = (k: string) => `${idPrefix}-${k}`;

  const set = (k: keyof RfqDraft) => (v: string) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const goto = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
  };
  const advance = () => {
    if (step <= 2) {
      const errs = validateRfqStep((step + 1) as 1 | 2 | 3, draft);
      setErrors(errs);
      if (Object.keys(errs).length) return;
    }
    goto(step + 1);
  };
  const submit = async () => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(buildContactPayload(draft)) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-ink bg-paper p-7 sm:p-9" role="status">
        <p className="kicker">RFQ received</p>
        <p className="display-md mt-2 text-2xl">We have your enquiry.</p>
        <dl className="hairline mt-5 space-y-2 pt-4 text-[15px]">
          {[["Enquiry", draft.family], ["Quantity band", draft.quantityBand], ["Timeline", draft.timeline], ["Reply to", draft.email]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6">
              <dt className="text-ink-3">{k}</dt>
              <dd className="text-right text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-2">A reply comes from {contact.email}. Drawings are handled under NDA on request.</p>
      </div>
    );
  }

  return (
    <div className="border border-line-strong bg-paper p-6 sm:p-8">
      <ol className="flex flex-wrap gap-x-5 gap-y-2" aria-label="RFQ progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.04em] uppercase">
            <span aria-hidden className={cn("size-2.5", i < step ? "bg-marigold" : i === step ? "bg-ink" : "border border-line-strong")} />
            <span aria-current={i === step ? "step" : undefined} className={i === step ? "text-ink" : i < step ? "text-ink-2" : "text-ink-3"}>
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div ref={panelRef} tabIndex={-1} className="mt-7 outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.28, ease: EASE }}>
            {step === 0 ? (
              <Field label="What is the enquiry about?" error={errors.family}>
                <RadioGrid name="Enquiry" options={rfqFamilies} value={draft.family} onChange={set("family")} />
              </Field>
            ) : null}
            {step === 1 ? (
              <div className="space-y-6">
                <Field label="Annual quantity" error={errors.quantityBand}>
                  <RadioGrid name="Annual quantity" options={rfqQuantityBands} value={draft.quantityBand} onChange={set("quantityBand")} columns={3} />
                </Field>
                <Field label="Sourcing timeline" error={errors.timeline}>
                  <RadioGrid name="Sourcing timeline" options={rfqTimelines} value={draft.timeline} onChange={set("timeline")} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Material or grade" optional htmlFor={id("grade")}>
                    <input id={id("grade")} value={draft.grade} onChange={(e) => set("grade")(e.target.value)} placeholder="e.g. S355, EN19, IS 2062" className={inputCls} />
                  </Field>
                  <Field label="Drawing status" optional htmlFor={id("drawings")}>
                    <select id={id("drawings")} value={draft.drawingStatus} onChange={(e) => set("drawingStatus")(e.target.value)} className={inputCls}>
                      <option value="">Select</option>
                      {rfqDrawingStatus.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>
            ) : null}
            {step === 2 ? (
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name} htmlFor={id("name")}>
                    <input id={id("name")} value={draft.name} onChange={(e) => set("name")(e.target.value)} autoComplete="name" className={inputCls} aria-invalid={!!errors.name} />
                  </Field>
                  <Field label="Company" error={errors.company} htmlFor={id("company")}>
                    <input id={id("company")} value={draft.company} onChange={(e) => set("company")(e.target.value)} autoComplete="organization" className={inputCls} aria-invalid={!!errors.company} />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Work email" error={errors.email} htmlFor={id("email")}>
                    <input id={id("email")} type="email" value={draft.email} onChange={(e) => set("email")(e.target.value)} autoComplete="email" className={inputCls} aria-invalid={!!errors.email} />
                  </Field>
                  <Field label="Phone" optional htmlFor={id("phone")}>
                    <input id={id("phone")} type="tel" value={draft.phone} onChange={(e) => set("phone")(e.target.value)} autoComplete="tel" className={inputCls} />
                  </Field>
                </div>
                <Field label="Anything else" optional htmlFor={id("notes")} hint="Part numbers, target volumes, current supply situation.">
                  <textarea id={id("notes")} value={draft.notes} onChange={(e) => set("notes")(e.target.value)} rows={3} className={cn(inputCls, "resize-y")} />
                </Field>
              </div>
            ) : null}
            {step === 3 ? (
              <div>
                <p className="text-[15px] text-ink-2">Check the details before they go to the commercial team.</p>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {(
                    [
                      ["Enquiry", draft.family, 0],
                      ["Annual quantity", draft.quantityBand, 1],
                      ["Timeline", draft.timeline, 1],
                      ["Material or grade", draft.grade || "Not specified", 1],
                      ["Drawings", draft.drawingStatus || "Not specified", 1],
                      ["Contact", `${draft.name}, ${draft.company}`, 2],
                      ["Reply to", draft.email + (draft.phone ? `, ${draft.phone}` : ""), 2],
                    ] as const
                  ).map(([k, v, s]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-2.5 text-[15px]">
                      <dt className="shrink-0 text-ink-3">{k}</dt>
                      <dd className="flex items-baseline gap-3 text-right text-ink">
                        <span>{v}</span>
                        <button type="button" onClick={() => goto(s)} className="text-[13px] font-semibold underline underline-offset-2 hover:decoration-marigold">
                          Edit
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
                {status === "error" ? <div className="mt-5"><StatusBanner>The RFQ did not send. Your entries are intact. Retry, or email {contact.email} directly.</StatusBanner></div> : null}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <Button variant="secondary" onClick={() => goto(step - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button onClick={advance}>Continue</Button>
        ) : (
          <Button onClick={submit} disabled={status === "submitting"}>
            {status === "submitting" ? "Sending" : "Submit RFQ"}
          </Button>
        )}
      </div>
    </div>
  );
}
