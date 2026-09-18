"use client";

// Scroll entrance wrapper. Children render fully visible in server HTML; GSAP hides and
// reveals them at runtime only (gsap.from), and only when motion is allowed.

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  stagger,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** animate direct children with this stagger instead of the wrapper */
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? Array.from(ref.current!.children) : ref.current!;
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 0.7,
          delay,
          stagger: stagger ?? 0,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={cn(className)}>
      {children}
    </Comp>
  );
}
