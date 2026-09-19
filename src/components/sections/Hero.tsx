"use client";

// The cover spread as a split hero: ink block with the two-tone headline, the real plant
// photograph unscrimmed on the right. The copy and the photograph are the page's LCP
// candidates, so they are never opacity-hidden: the only entrance is a short transform drift
// on the copy, and the hero scrolls away naturally (no pin, no fade-out; Codex audit P0-5, P2-11).

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { Button } from "@/components/ui/Button";
import { rfqHref } from "@/lib/site";
import { cover } from "@/data/whyJrew";
import { certifications } from "@/data/quality";
import { awards } from "@/data/awards";

const catAward = awards.find((a) => a.id === "cat-ser");
const proofLine = [...certifications.filter((c) => c.code.startsWith("ISO") || c.code.startsWith("EN")).map((c) => c.code), catAward ? `Caterpillar ${catAward.title} ${catAward.years?.join(", ")}` : null].filter(Boolean).join("  ·  ");

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // transform only: the text is painted at full opacity from the first frame
        gsap.from(".hero-in", { y: 14, duration: 0.6, stagger: 0.06, ease: "expo.out", clearProps: "transform" });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="hero" aria-label="JREW Engineering" className="on-ink relative min-h-[100dvh] bg-ink-panel text-on-ink">
      <div className="grid min-h-[100dvh] lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
        <div className="hero-copy relative flex flex-col justify-end px-[clamp(1.25rem,4vw,3.5rem)] pb-14 pt-32 lg:justify-center lg:pb-24 lg:pt-28">
          <div className="max-w-[46rem]">
            <TwoToneHeading as="h1" tone="ink" markFirst lead={cover.headline.lead} mark={cover.headline.mark} className="hero-in text-[clamp(2.5rem,5.4vw,5.5rem)]" />
            <p className="hero-in mt-7 max-w-[40rem] text-lg leading-relaxed text-on-ink-2 sm:text-xl">{cover.lede}</p>
            <div className="hero-in mt-9 flex flex-wrap gap-3">
              <Button href={rfqHref} variant="onInk">
                Request a quote
              </Button>
              <Button href="/capabilities" variant="onInkSecondary">
                See capabilities
              </Button>
            </div>
            <p className="hero-in tnum mt-7 max-w-[44rem] text-[13px] leading-relaxed tracking-[0.02em] text-on-ink-3">{proofLine}</p>
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
            className="object-cover object-[82%_50%]"
          />
        </div>
      </div>
    </section>
  );
}
