"use client";

// The brochure's signature headline: line one in the ground's ink colour, line two marked.
// On paper the closing phrase is ink type on a marigold highlight; on ink panels the phrase
// itself is marigold type (marigold-as-type only on ink). The highlight draws in once, and only
// on page titles (h1) or where `animate` is set: facts, navigation and forms stay still.
// No animation library: a class toggled by IntersectionObserver drives a CSS transition, and the
// text is fully visible from the first paint whatever the motion setting.

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Level = "h1" | "h2" | "h3" | "p";

export function TwoToneHeading({
  lead,
  mark,
  tone = "paper",
  as = "h2",
  className,
  id,
  inline = false,
  markFirst = false,
  animate,
}: {
  /** line one, plain */
  lead: string;
  /** line two or the closing phrase, marked */
  mark: string;
  tone?: "paper" | "ink";
  as?: Level;
  className?: string;
  id?: string;
  /** render lead and mark on one line when there is room */
  inline?: boolean;
  /** cover grammar: the marked phrase comes first */
  markFirst?: boolean;
  /** draw the marker in on entry; defaults to true for h1 on paper */
  animate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const shouldAnimate = tone === "paper" && (animate ?? as === "h1");

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldAnimate) return;
    const hl = el.querySelector<HTMLElement>(".hl");
    if (!hl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hl.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          hl.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldAnimate]);

  const Tag = as as React.ElementType;
  const leadEl = <span className={inline ? undefined : "block"}>{lead}</span>;
  const markInner = <span className={tone === "paper" ? cn("hl text-ink", shouldAnimate && "hl-anim") : "text-marigold"}>{mark}</span>;
  const markEl = inline ? markInner : <span className="block">{markInner}</span>;
  return (
    <Tag ref={ref} id={id} className={cn("display isolate text-balance", className)}>
      {markFirst ? markEl : leadEl}
      {inline ? " " : null}
      {markFirst ? leadEl : markEl}
    </Tag>
  );
}
