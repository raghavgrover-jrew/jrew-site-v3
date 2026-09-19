"use client";

// Browse by machine: the buyer knows their machine, not JREW's families. Tabs with a select fallback
// under 640 px. All panels are in the HTML; inactive ones carry the hidden attribute.
// Keyboard: ArrowLeft/ArrowRight cycle, Home/End jump; focus follows selection (WAI-ARIA tabs pattern).

import { useId, useState } from "react";
import Link from "next/link";
import { byMachine } from "@/data/byMachine";
import { cn } from "@/lib/utils";

export function ByMachineTabs() {
  const [active, setActive] = useState(byMachine[0].id);
  const base = useId();
  const tabId = (id: string) => `${base}-tab-${id}`;

  const select = (id: string) => {
    setActive(id);
    document.getElementById(tabId(id))?.focus();
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const idx = byMachine.findIndex((x) => x.id === active);
    const n = byMachine.length;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (idx + 1) % n;
    else if (e.key === "ArrowLeft") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    select(byMachine[next].id);
  };

  return (
    <div>
      <label htmlFor={`${base}-select`} className="sr-only">
        Machine type
      </label>
      <select id={`${base}-select`} value={active} onChange={(e) => setActive(e.target.value)} className="w-full border border-line-strong bg-paper px-4 py-3 text-[16px] sm:hidden">
        {byMachine.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
      <div role="tablist" aria-label="Machine type" className="hidden gap-1 sm:grid sm:grid-cols-2 md:grid-cols-5">
        {byMachine.map((m) => (
          <button
            key={m.id}
            role="tab"
            id={tabId(m.id)}
            aria-selected={active === m.id}
            aria-controls={`${base}-panel-${m.id}`}
            tabIndex={active === m.id ? 0 : -1}
            onClick={() => setActive(m.id)}
            onKeyDown={onKeyDown}
            className={cn("min-h-[44px] border px-3 text-[14px] font-semibold transition-colors", active === m.id ? "border-ink bg-ink text-on-ink" : "border-line-strong bg-paper text-ink-2 hover:border-ink hover:text-ink")}
          >
            {m.label}
          </button>
        ))}
      </div>
      {byMachine.map((m) => (
        <div key={m.id} role="tabpanel" id={`${base}-panel-${m.id}`} aria-labelledby={tabId(m.id)} hidden={active !== m.id} className="mt-5 bg-card-warm p-6 sm:p-8">
          <h3 className="display-md text-xl">What JREW supplies for {m.label.toLowerCase()}</h3>
          <ul className="mt-4 divide-y divide-line">
            {m.items.map((it) => (
              <li key={it.text} className="flex items-start justify-between gap-6 py-3 text-[15px]">
                <span className="text-ink-2">{it.text}</span>
                {it.href ? (
                  <Link href={it.href} className="tap shrink-0 font-semibold underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-ink">
                    View
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
