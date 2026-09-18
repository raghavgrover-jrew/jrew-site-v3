"use client";

// Shared form primitives in the Direction A register: labels above inputs, hairline fields,
// ink focus, errors as ink text with a marigold bar. No placeholder-as-label.
// Field wires accessibility for its single control: aria-describedby to the hint and error,
// and, for a `group` (radio grid), a fieldset with a legend that names the group.

import { cloneElement, isValidElement, useId } from "react";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full border border-line-strong bg-paper px-4 py-3 text-[16px] text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none aria-[invalid=true]:border-ink aria-[invalid=true]:border-2";

type AriaProps = { "aria-describedby"?: string; "aria-labelledby"?: string };

export function Field({
  label,
  htmlFor,
  error,
  optional,
  hint,
  group = false,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  /** Render as fieldset + legend for a group of radios; the child receives aria-labelledby. */
  group?: boolean;
  children: React.ReactNode;
}) {
  const auto = useId();
  const base = htmlFor ?? auto;
  const hintId = `${base}-hint`;
  const errorId = `${base}-error`;
  const legendId = `${base}-legend`;
  const describedBy = [hint && !error ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  const control = isValidElement<AriaProps>(children)
    ? cloneElement(children, { "aria-describedby": describedBy, ...(group ? { "aria-labelledby": legendId } : {}) })
    : children;

  const labelCls = "text-[14px] font-semibold tracking-[0.01em] text-ink";
  const optionalEl = optional ? <span className="ml-2 font-normal text-ink-3">Optional</span> : null;
  const hintEl = hint && !error ? <p id={hintId} className="text-[13px] text-ink-3">{hint}</p> : null;
  const errorEl = error ? (
    <p id={errorId} role="alert" className="border-l-[3px] border-marigold pl-3 text-[14px] text-ink">
      {error}
    </p>
  ) : null;

  if (group) {
    return (
      <fieldset className="flex min-w-0 flex-col gap-2 border-0 p-0" aria-describedby={describedBy}>
        <legend id={legendId} className={cn(labelCls, "mb-2")}>
          {label}
          {optionalEl}
        </legend>
        {control}
        {hintEl}
        {errorEl}
      </fieldset>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
        {optionalEl}
      </label>
      {control}
      {hintEl}
      {errorEl}
    </div>
  );
}

export function RadioGrid({
  name,
  options,
  value,
  onChange,
  columns = 2,
  ...aria
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  columns?: 2 | 3;
} & AriaProps) {
  return (
    <div role="radiogroup" aria-label={aria["aria-labelledby"] ? undefined : name} {...aria} className={cn("grid gap-2", columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
      {options.map((opt) => {
        const checked = value === opt;
        return (
          <label
            key={opt}
            className={cn(
              "flex min-h-[48px] cursor-pointer items-center gap-3 border px-4 py-3 text-[15px] transition-colors",
              // the radio itself is visually hidden; the visible label shows keyboard focus
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
              checked ? "border-ink bg-card-warm text-ink" : "border-line-strong bg-paper text-ink-2 hover:border-ink-3 hover:text-ink",
            )}
          >
            <input type="radio" name={name} value={opt} checked={checked} onChange={() => onChange(opt)} className="sr-only" />
            <span aria-hidden className={cn("size-3 shrink-0 border border-ink", checked && "bg-marigold")} />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

/** Honeypot: invisible to people, tempting to bots. Server drops submissions where it is filled. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="website-field">Website</label>
      <input id="website-field" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export function StatusBanner({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="border-l-4 border-marigold bg-card-warm px-4 py-3 text-[15px] text-ink">
      {children}
    </p>
  );
}
