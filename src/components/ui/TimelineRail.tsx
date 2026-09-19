"use client";

// Spread 03 as a scroll sequence. On large screens with motion allowed the section pins and the
// three-era track pans horizontally with scroll. Otherwise (phones, reduced motion) the same markup flows vertically.
// All 18 milestones are in the server HTML.

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { eras, milestones, timelineIntro } from "@/data/milestones";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

gsap.registerPlugin(ScrollTrigger);

export function TimelineRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top 72px", end: () => `+=${distance()}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
        });
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} id="journey" aria-labelledby="journey-h" className="on-ink bg-ink-panel text-on-ink motion-safe:lg:h-[calc(100vh-72px)] motion-safe:lg:overflow-hidden">
      <div className="shell flex h-full flex-col py-14 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <TwoToneHeading id="journey-h" tone="ink" lead={timelineIntro.headline.lead} mark={timelineIntro.headline.mark} className="max-w-[22ch] text-[clamp(1.9rem,3.4vw,2.8rem)]" />
            <p className="mt-4 max-w-[56ch] text-[15px] leading-relaxed text-on-ink-2">{timelineIntro.body}</p>
          </div>
          <div className="text-left lg:text-right">
            <p className="display tnum text-3xl text-marigold">{timelineIntro.range}</p>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-on-ink-3">{timelineIntro.rangeLabel}</p>
          </div>
        </div>

        <div className="mt-10 motion-safe:lg:my-auto motion-safe:lg:overflow-hidden">
          <div ref={track} className="flex flex-col gap-10 motion-safe:lg:flex-row motion-safe:lg:items-stretch motion-safe:lg:gap-16">
            {eras.map((era) => (
              <div key={era.id} className="motion-safe:lg:flex motion-safe:lg:shrink-0 motion-safe:lg:gap-8">
                <div className="motion-safe:lg:w-[15rem] motion-safe:lg:shrink-0">
                  <p className="tnum text-[13px] font-semibold text-marigold">{era.range}</p>
                  <h3 className="display mt-1 text-2xl text-on-ink">{era.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-on-ink-2">{era.body}</p>
                </div>
                <ol className="relative mt-6 space-y-6 border-l border-ink-line pl-6 motion-safe:lg:mt-0 motion-safe:lg:flex motion-safe:lg:gap-8 motion-safe:lg:space-y-0 motion-safe:lg:border-l-0 motion-safe:lg:border-t motion-safe:lg:pl-0 motion-safe:lg:pt-6">
                  {milestones
                    .filter((m) => m.era === era.id)
                    .map((m) => (
                      <li key={m.year} className="relative motion-safe:lg:w-[13rem] motion-safe:lg:shrink-0">
                        <span aria-hidden className="absolute -left-[1.85rem] top-1.5 size-2.5 bg-marigold motion-safe:lg:-top-[1.85rem] motion-safe:lg:left-0" />
                        <p className="display tnum text-2xl text-marigold">{m.year}</p>
                        <p className="mt-1 text-[15px] font-bold text-on-ink">{m.title}</p>
                        <p className="mt-1 text-[14px] leading-relaxed text-on-ink-2">{m.body}</p>
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
