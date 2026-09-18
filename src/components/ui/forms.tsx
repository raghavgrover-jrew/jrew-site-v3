"use client";

// Shared form primitives in the Direction A register: labels above inputs, hairline fields,
// ink focus, errors as ink text with a marigold bar. No placeholder-as-label.

import { cn } from "@/lib/utils";

export const inputCls =
  "w-full border border-line-strong bg-paper px-4 py-3 text-[16px] text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none aria-[invalid=true]:border-ink aria-[invalid=true]:border-2";

export function Field({ label, htmlFor, error, optional, hint, children }: { label: string; htmlFor?: string; error?: string; optional?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[14px] font-semibold tracking-[0.01em] text-ink">
        {label}
        {optional ? <span className="ml-2 font-normal text-ink-3">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="text-[13px] text-ink-3">{hint}</p> : null}
      {error ? (
        <p role="alert" className="border-l-[3px] border-marigold pl-3 text-[14px] text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function RadioGrid({ name, options, value, onChange, columns = 2 }: { name: string; options: readonly string[]; value: string; onChange: (v: string) => void; columns?: 2 | 3 }) {
  return (
    <div role="radiogroup" aria-label={name} className={cn("grid gap-2", columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
      {options.map((opt) => {
        const checked = value === opt;
        return (
          <label
            key={opt}
            className={cn(
              "flex min-h-[48px] cursor-pointer items-center gap-3 border px-4 py-3 text-[15px] transition-colors",
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

export function StatusBanner({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="border-l-4 border-marigold bg-card-warm px-4 py-3 text-[15px] text-ink">
      {children}
    </p>
  );
}
