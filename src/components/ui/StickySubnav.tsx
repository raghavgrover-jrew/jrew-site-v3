"use client";

// Sticky chapter navigation for long pages. Highlights the section in view. Scrolls horizontally on small screens.

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StickySubnav({ items, label = "Sections" }: { items: { id: string; label: string }[]; label?: string }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // keep the current chapter in view when the row scrolls horizontally (phones)
  useEffect(() => {
    document.querySelector<HTMLElement>(`nav[aria-label="${label}"] a[aria-current]`)?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [active, label]);

  return (
    <nav aria-label={label} className="sticky top-[72px] z-30 border-y border-line bg-paper/95 backdrop-blur-md">
      <ul className="shell flex snap-x gap-1 overflow-x-auto py-1 [scrollbar-width:none] max-sm:[mask-image:linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)]">
        {items.map((i) => (
          <li key={i.id} className="shrink-0 snap-start">
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={cn(
                "relative inline-flex min-h-[44px] items-center px-3 text-[14px] font-semibold text-ink-2 hover:text-ink",
                active === i.id && "text-ink after:absolute after:inset-x-3 after:bottom-1 after:h-[3px] after:bg-marigold",
              )}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
