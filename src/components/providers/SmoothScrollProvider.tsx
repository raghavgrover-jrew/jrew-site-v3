"use client";

// The only place Lenis is created. GSAP's ticker is the single RAF owner: it drives
// lenis.raf and Lenis feeds its position back into ScrollTrigger. Under
// prefers-reduced-motion Lenis is never constructed and the page scrolls natively.

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: { offset: -80 } });
    document.documentElement.classList.add("lenis-on");

    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);

  return <>{children}</>;
}
