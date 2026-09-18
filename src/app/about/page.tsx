import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TimelineRail } from "@/components/ui/TimelineRail";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { whoWeAre, vision, mission, icare, uplift } from "@/data/values";
import { responsibility } from "@/data/csr";
import { awards, awardsIntro, caterpillarYears } from "@/data/awards";

export const metadata: Metadata = {
  title: "About",
  description:
    "JREW Engineering Limited, founded 1973 in Chandigarh by Sh. Ram Ratan Agarwal, public limited since 1994. Vision, mission, ICARE values and UPLIFT principles, 18 milestones to the 2027 Rajpura greenfield, CSR through JREW Foundation, and awards from Caterpillar, JCB, Godrej and CII.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      <PageHeader eyebrow={whoWeAre.eyebrow} lead={whoWeAre.headline.lead} mark={whoWeAre.headline.mark} lede={whoWeAre.intro} />

      <SectionShell ariaLabel="How JREW works" className="pt-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <Reveal as="ul" stagger={0.07} className="divide-y divide-line border-y border-line">
            {whoWeAre.bullets.map((b, i) => (
              <li key={i} className={`bar my-4 text-[15px] leading-relaxed text-ink ${i % 2 ? "bar-marigold" : ""}`}>
                {b}
              </li>
            ))}
          </Reveal>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={whoWeAre.image.src} alt={whoWeAre.image.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </div>
        </div>
      </SectionShell>

      <section aria-label="Vision, mission, values and principles" className="grid md:grid-cols-2">
        <div className="on-ink bg-ink-panel p-8 text-on-ink sm:p-12">
          <p className="display text-xl">{vision.title}</p>
          <p className="mt-4 text-lg font-semibold leading-snug">{vision.body}</p>
          <p className="display mt-6 text-lg text-marigold">{vision.mark}</p>
        </div>
        <div className="bg-marigold p-8 text-ink sm:p-12">
          <p className="display text-xl">{mission.title}</p>
          <p className="mt-4 text-lg font-semibold leading-snug">{mission.body}</p>
          <p className="display mt-6 text-lg">{mission.mark}</p>
        </div>
        <div className="bg-marigold p-8 text-ink sm:p-12">
          <p className="display text-xl">{icare.title}</p>
          <p className="mt-1 text-[15px] font-semibold">{icare.lead}</p>
          <ul className="mt-6 space-y-3">
            {icare.items.map((v) => (
              <li key={v.letter} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="display flex size-9 items-center justify-center bg-ink text-lg text-marigold">{v.letter}</span>
                <span>
                  <span className="block text-[15px] font-bold">{v.word}</span>
                  <span className="block text-[14px] text-ink-2">{v.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="on-ink bg-ink-panel p-8 text-on-ink sm:p-12">
          <p className="display text-xl">{uplift.title}</p>
          <p className="mt-1 text-[15px] font-semibold text-on-ink-2">{uplift.lead}</p>
          <ul className="mt-6 space-y-3">
            {uplift.items.map((v) => (
              <li key={v.letter} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="display flex size-9 items-center justify-center bg-marigold text-lg text-ink">{v.letter}</span>
                <span>
                  <span className="block text-[15px] font-bold">{v.word}</span>
                  <span className="block text-[14px] text-on-ink-2">{v.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TimelineRail />

      <SectionShell id="responsibility" labelledBy="responsibility-h">
        <Eyebrow>{responsibility.eyebrow}</Eyebrow>
        <TwoToneHeading id="responsibility-h" lead={responsibility.headline.lead} mark={responsibility.headline.mark} inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
        <p className="mt-5 max-w-[60ch] text-ink-2">{responsibility.body}</p>
        <h3 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-3">{responsibility.csrTitle}</h3>
        <Reveal as="ul" stagger={0.06} className="mt-4 grid gap-4 md:grid-cols-3">
          {responsibility.csr.map((c) => (
            <li key={c.title} className="border border-line bg-paper">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image src={c.image} alt={c.alt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
              </div>
              <div className="p-5">
                {"stat" in c ? <p className="display tnum text-3xl text-ink">{c.stat}</p> : null}
                <h4 className="display-md mt-1 text-lg">{c.title}</h4>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{c.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <dl className="on-ink mt-10 grid gap-px bg-ink-line md:grid-cols-3">
          {responsibility.esg.map((e) => (
            <div key={e.title} className="bg-ink-panel p-6">
              <dt className="display text-lg text-marigold">{e.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-on-ink-2">{e.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 bg-marigold px-6 py-4 text-center text-[14px] font-bold uppercase tracking-[0.06em] text-ink">{responsibility.footer}</p>
      </SectionShell>

      <SectionShell id="awards" labelledBy="awards-h" tone="warm">
        <TwoToneHeading id="awards-h" lead={awardsIntro.headline.lead} mark={awardsIntro.headline.mark} inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
        <p className="mt-5 max-w-[60ch] text-ink-2">{awardsIntro.body}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="border border-line bg-paper p-6 sm:p-8">
            <h3 className="display-md text-xl">
              {awards[0].giver}: {awards[0].title}
            </h3>
            <p className="tnum mt-1 text-[15px] font-semibold text-ink-2">{awards[0].note}</p>
            <ul className="mt-5 grid grid-cols-3 gap-3">
              {caterpillarYears.map((y) => (
                <li key={y.year} className="relative aspect-[3/2] overflow-hidden">
                  <Image src={y.image} alt={`Caterpillar Supplier Excellence Recognition ${y.year}`} fill sizes="(min-width: 1024px) 18vw, 30vw" className="object-cover" />
                  <span className="tnum absolute bottom-0 left-0 bg-ink px-2 py-1 text-[12px] font-semibold text-on-ink">{y.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {awards.slice(1).map((a) => (
              <li key={a.id} className="border border-line bg-paper">
                {a.image ? (
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image src={a.image} alt={a.imageAlt ?? a.title} fill sizes="(min-width: 640px) 25vw, 90vw" className="object-cover" />
                  </div>
                ) : null}
                <div className="p-4">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-3">{a.giver}</p>
                  <p className="text-[15px] font-bold">{a.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>
    </>
  );
}
