"use client";

// Counter for the stat band. SSR ships the final value; GSAP scrubs from a fraction to
// the value across the element's own scroll window. textContent writes only.

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function format(value: number, decimals = 0) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function KineticNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { v: value * 0.2 };
        gsap.to(proxy, {
          v: value,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 45%", scrub: 0.5 },
          onUpdate: () => {
            el.textContent = `${prefix}${format(proxy.v, decimals)}${suffix}`;
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
