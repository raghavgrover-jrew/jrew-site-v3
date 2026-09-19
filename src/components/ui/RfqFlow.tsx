"use client";

// Three steps plus review. Validated by lib/rfq.ts, posted to /api/contact. Full keyboard path,
// per-field errors, distinct submitting / success / failure states; entries survive a failed submit.

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { contact } from "@/lib/site";
import { validateRfqStep, buildContactPayload, volumeOptionalFor, familyFromSlug, rfqFamilies, rfqQuantityBands, rfqDrawingStatus, rfqTimelines, type RfqDraft, type RfqErrors } from "@/lib/rfq";
import { Field, RadioGrid, StatusBanner, PrivacyNote, inputCls, newSubmissionId, postWithTimeout } from "@/components/ui/forms";
import { Button } from "@/components/ui/Button";

const STEPS = ["Enquiry", "Requirements", "Contact", "Review"] as const;
const EMPTY: RfqDraft = { family: "", quantityBand: "", grade: "", drawingStatus: "", timeline: "", name: "", company: "", email: "", phone: "", notes: "" };

// The enquiry slug a product CTA put in the URL (/contact?enquiry=axles#rfq). Read through an
// external-store subscription rather than useSearchParams, so the contact page stays statically
// prerendered; the server snapshot is empty and React re-renders once with the real value.
const NO_SLUG = "";
const subscribeToNothing = () => () => {};
const readEnquirySlug = () => new URLSearchParams(window.location.search).get("enquiry") ?? NO_SLUG;
const noSlugOnServer = () => NO_SLUG;

export function RfqFlow({ idPrefix = "rfq", source }: { idPrefix?: string; source?: string }) {
  const [stepChosen, setStepChosen] = useState<number | null>(null);
  const [moved, setMoved] = useState(false);
  const [entered, setDraft] = useState<RfqDraft>(EMPTY);
  const [errors, setErrors] = useState<RfqErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState<string>("");
  const [submissionId] = useState(newSubmissionId);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = (k: string) => `${idPrefix}-${k}`;

  // Preselection is derived, never written into state: the link answers step 1 and opens the flow
  // at step 2, and the moment the visitor picks a family themselves their choice takes over.
  const slug = useSyncExternalStore(subscribeToNothing, readEnquirySlug, noSlugOnServer);
  const linked = familyFromSlug(slug);
  const fromLink = linked ? slug.trim().toLowerCase() : "";
  const draft = linked && !entered.family ? { ...entered, family: linked } : entered;
  const step = stepChosen ?? (linked ? 1 : 0);
  const volumeOptional = volumeOptionalFor(draft.family);

  const set = (k: keyof RfqDraft) => (v: string) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const goto = (n: number) => {
    setStepChosen(n);
    setMoved(true);
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
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const payload = { ...buildContactPayload(draft), submissionId, source: source ?? (fromLink ? `rfq:${idPrefix}:${fromLink}` : `rfq:${idPrefix}`) };
      const res = await postWithTimeout("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json().catch(() => ({}))) as { reference?: string };
      setReference(data.reference ?? "");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-ink bg-paper p-7 sm:p-9" role="status">
        <p className="kicker">RFQ received</p>
        <p className="display-md mt-2 text-2xl">We have your RFQ.</p>
        {reference ? <p className="tnum mt-2 text-[15px] text-ink-2">Reference <strong className="text-ink">{reference}</strong>. Quote it in any follow-up.</p> : null}
        <dl className="hairline mt-5 space-y-2 pt-4 text-[15px]">
          {[["Enquiry", draft.family], ["Quantity band", draft.quantityBand], ["Timeline", draft.timeline], ["Reply to", draft.email]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6">
              <dt className="text-ink-3">{k}</dt>
              <dd className="text-right text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
          The commercial team replies from {contact.email} with clarifying questions and, where drawings are involved, an NDA. Meanwhile:{" "}
          <Link href="/capabilities" className="font-semibold underline decoration-marigold decoration-2 underline-offset-4">capabilities</Link> and{" "}
          <Link href="/quality" className="font-semibold underline decoration-marigold decoration-2 underline-offset-4">quality and certifications</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-line-strong bg-paper p-6 sm:p-8">
      <ol className="grid grid-cols-2 gap-x-5 gap-y-2 sm:flex sm:flex-wrap" aria-label="RFQ progress">
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
        {/* keyed by step so each panel mounts fresh; the entrance keyframe runs only after the first move */}
        <div key={step} className={moved ? "anim-rise" : undefined}>
            {step === 0 ? (
              <Field group label="What is the enquiry about?" error={errors.family}>
                <RadioGrid name="Enquiry" options={rfqFamilies} value={draft.family} onChange={set("family")} />
              </Field>
            ) : null}
            {step === 1 ? (
              <div className="space-y-6">
                {draft.family ? (
                  <p className="flex items-baseline justify-between gap-4 border-b border-line pb-4 text-[15px]">
                    <span className="text-ink-2">
                      Enquiry: <strong className="font-semibold text-ink">{draft.family}</strong>
                    </span>
                    <button type="button" onClick={() => goto(0)} className="tap shrink-0 text-[13px] font-semibold underline underline-offset-2 hover:decoration-marigold">
                      Change
                    </button>
                  </p>
                ) : null}
                <Field group label="Annual quantity" optional={volumeOptional} error={errors.quantityBand}>
                  <RadioGrid name="Annual quantity" options={rfqQuantityBands} value={draft.quantityBand} onChange={set("quantityBand")} columns={3} />
                </Field>
                <Field group label="Sourcing timeline" optional={volumeOptional} error={errors.timeline}>
                  <RadioGrid name="Sourcing timeline" options={rfqTimelines} value={draft.timeline} onChange={set("timeline")} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Material or grade" optional htmlFor={id("grade")}>
                    <input id={id("grade")} value={draft.grade} onChange={(e) => set("grade")(e.target.value)} placeholder="e.g. S355, EN19, IS 2062" className={inputCls} />
                  </Field>
                  <Field label="Drawing status" optional htmlFor={id("drawings")} hint="No attachments at this stage. Tell us what exists; drawings are exchanged under NDA after first contact.">
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
                <p className="mt-2 text-[14px] text-ink-3">Nothing is attached here; drawings are exchanged under NDA after first contact.</p>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {(
                    [
                      ["Enquiry", draft.family, 0],
                      ["Annual quantity", draft.quantityBand, 1],
                      ["Timeline", draft.timeline, 1],
                      ["Material or grade", draft.grade || "Not specified", 1],
                      ["Drawings", draft.drawingStatus || "Not specified", 1],
                      ["Contact", `${draft.name}, ${draft.company}`, 2],
                      ["Email", draft.email, 2],
                      ["Phone", draft.phone || "Not given", 2],
                    ] as const
                  ).map(([k, v, s]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-2.5 text-[15px]">
                      <dt className="shrink-0 text-ink-3">{k}</dt>
                      <dd className="flex items-baseline gap-3 text-right text-ink">
                        <span>{v}</span>
                        <button type="button" onClick={() => goto(s)} className="tap text-[13px] font-semibold underline underline-offset-2 hover:decoration-marigold">
                          Edit
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
                <PrivacyNote what="the RFQ" />
                {status === "error" ? <div className="mt-5"><StatusBanner>The RFQ did not send. Your entries are intact. Retry, or email {contact.email} directly.</StatusBanner></div> : null}
              </div>
            ) : null}
        </div>
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
