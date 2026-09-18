"use client";

// The cover spread as a split hero: ink block with the two-tone headline, the real plant
// photograph unscrimmed on the right. Entrance stagger, then apple-scroll's pinned exit on
// large screens only. Everything is complete in server HTML.

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { Button } from "@/components/ui/Button";
import { rfqHref } from "@/lib/site";
import { cover } from "@/data/whyJrew";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-in", { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "expo.out", delay: 0.1 });
        gsap.from(".hero-img", { scale: 1.04, autoAlpha: 0, duration: 1.1, ease: "expo.out" });
      });
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=55%", scrub: true, pin: true, anticipatePin: 1 } });
        tl.to(".hero-copy", { y: -60, autoAlpha: 0, ease: "none" }, 0);
        tl.to(".hero-img", { y: -30, ease: "none" }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="hero" aria-label="JREW Engineering" className="on-ink relative min-h-[100dvh] bg-ink-panel text-on-ink">
      <div className="grid min-h-[100dvh] lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
        <div className="hero-copy relative flex flex-col justify-end px-[clamp(1.25rem,4vw,3.5rem)] pb-14 pt-32 lg:justify-center lg:pb-24 lg:pt-28">
          <div className="max-w-[46rem]">
            <TwoToneHeading as="h1" tone="ink" markFirst lead={cover.headline.lead} mark={cover.headline.mark} className="hero-in text-[clamp(2.5rem,6.2vw,5.5rem)]" />
            <p className="hero-in mt-7 max-w-[40rem] text-lg leading-relaxed text-on-ink-2 sm:text-xl">
              Fabricated and precision-machined components, sub-assemblies and engineered attachments for OEMs in construction, material handling, agriculture and railways. Since 1973.
            </p>
            <div className="hero-in mt-9 flex flex-wrap gap-3">
              <Button href={rfqHref} variant="onInk">
                Request a quote
              </Button>
              <Button href="/capabilities" variant="onInkSecondary">
                See capabilities
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-img relative min-h-[46vw] lg:min-h-0">
          <Image
            src="/images/hero/plant-exterior-mohali.jpg"
            alt="JREW Engineering plant in Mohali: green-clad fabrication hall with the JREW signage and landscaped lawn"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
