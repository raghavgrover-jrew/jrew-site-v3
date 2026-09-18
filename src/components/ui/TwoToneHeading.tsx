"use client";

// The brochure's signature headline: line one in the ground's ink colour, line two marked.
// On paper the closing phrase is ink type on a marigold highlight that draws in once on
// entry; on ink panels the phrase itself is marigold type (marigold-as-type only on ink).

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

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
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (tone !== "paper" || !ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hl = ref.current!.querySelector<HTMLElement>(".hl");
        if (!hl) return;
        gsap.fromTo(
          hl,
          { backgroundSize: "0% 100%" },
          {
            backgroundSize: "100% 100%",
            duration: 0.6,
            ease: "expo.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: ref, dependencies: [tone] },
  );

  const Tag = as as React.ElementType;
  const leadEl = <span className={inline ? undefined : "block"}>{lead}</span>;
  const markEl = <span className={cn(inline ? undefined : "block", tone === "paper" ? "hl text-ink" : "text-marigold")}>{mark}</span>;
  return (
    <Tag ref={ref} id={id} className={cn("display text-balance", className)}>
      {markFirst ? markEl : leadEl}
      {inline ? " " : null}
      {markFirst ? leadEl : markEl}
    </Tag>
  );
}
