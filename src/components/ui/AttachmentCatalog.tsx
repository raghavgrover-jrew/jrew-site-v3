"use client";

// The five brochure pills as a real filter over 14 server-rendered cards. Filtering only hides.
// Detail in a native dialog (focus trap and Esc for free).

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { attachments, attachmentCategories, type MachineCategory } from "@/data/attachments";
import { rfqHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Filter = MachineCategory | "all";

export function AttachmentCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = attachments.find((a) => a.id === openId) ?? null;
  const shown = attachments.filter((a) => filter === "all" || a.machines.includes(filter)).length;

  const open = (id: string) => {
    setOpenId(id);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  return (
    <div>
      <div role="group" aria-label="Filter by machine" className="flex flex-wrap gap-2">
        {[{ key: "all" as Filter, label: "All attachments" }, ...attachmentCategories].map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={filter === c.key}
            onClick={() => setFilter(c.key)}
            className={cn("min-h-[44px] border px-4 text-[14.5px] font-semibold transition-colors", filter === c.key ? "border-ink bg-ink text-on-ink" : "border-line-strong bg-paper text-ink-2 hover:border-ink hover:text-ink")}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="tnum mt-3 text-[14px] text-ink-3" aria-live="polite">
        {shown} of {attachments.length} attachments
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {attachments.map((a) => {
          const hidden = filter !== "all" && !a.machines.includes(filter);
          return (
            <li key={a.id} hidden={hidden} className="border border-line bg-paper">
              <button type="button" onClick={() => open(a.id)} className="group flex h-full w-full flex-col text-left">
                <div className="relative aspect-[4/3] w-full bg-paper">
                  <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-contain p-5 transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]" />
                </div>
                <div className="hairline flex flex-1 flex-col p-5">
                  <span className="inline-block self-start bg-marigold px-2.5 py-1 text-[14px] font-bold text-ink">{a.name}</span>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink">{a.spec}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-3">{a.applications}</p>
                  <span className="mt-4 text-[14px] font-semibold underline decoration-marigold decoration-2 underline-offset-4 group-hover:decoration-ink">Details</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenId(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[min(92vw,44rem)] border border-ink bg-paper p-0 text-ink backdrop:bg-ink/70"
        aria-label={active ? active.name : "Attachment"}
      >
        {active ? (
          <div>
            <div className="relative aspect-[16/10] bg-card-warm">
              <Image src={active.image} alt={active.imageAlt} fill sizes="44rem" className="object-contain p-6" />
            </div>
            <div className="p-6 sm:p-8">
              <span className="inline-block bg-marigold px-2.5 py-1 text-[14px] font-bold">{active.name}</span>
              <dl className="mt-5 space-y-3 text-[15px]">
                <div>
                  <dt className="font-semibold uppercase tracking-[0.06em] text-ink-3 text-[12px]">Specification</dt>
                  <dd className="mt-1">{active.spec}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-[0.06em] text-ink-3 text-[12px]">Applications</dt>
                  <dd className="mt-1 text-ink-2">{active.applications}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-[0.06em] text-ink-3 text-[12px]">Machines</dt>
                  <dd className="mt-1 text-ink-2">{active.machines.map((m) => attachmentCategories.find((c) => c.key === m)?.label).join(", ")}</dd>
                </div>
              </dl>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href={rfqHref} className="inline-flex min-h-[44px] items-center bg-ink px-5 text-[15px] font-semibold text-on-ink hover:bg-ink-panel-2">
                  Request a quote
                </Link>
                <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex min-h-[44px] items-center border border-ink px-5 text-[15px] font-semibold hover:bg-card-warm">
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
