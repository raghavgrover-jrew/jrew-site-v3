"use client";

// Clip-path wipe from the left on entry. Children are complete in server HTML; the clip is
// applied only at runtime and only when motion is allowed. Used for the sector line art.

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Wipe({ children, className, duration = 1.1 }: { children: React.ReactNode; className?: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } },
        );
      });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
