import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProcessTable } from "@/components/ui/ProcessTable";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { processIntro } from "@/data/process";
import { partnership, proof } from "@/data/partnership";
import { caseStudy } from "@/data/caseStudy";
import { rfqHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Cutting, forming, robotic welding, machining to 0.05 mm, forging, coating and assembly under one roof, with engineering support from APQP to PPAP.",
  alternates: { canonical: "/capabilities" },
  openGraph: { type: "website", url: "/capabilities", title: "Capabilities | JREW Engineering", description: "Cutting, forming, robotic welding, machining to 0.05 mm, forging, coating and assembly under one roof, with engineering support from APQP to PPAP." },
  twitter: { card: "summary_large_image", title: "Capabilities | JREW Engineering", description: "Cutting, forming, robotic welding, machining to 0.05 mm, forging, coating and assembly under one roof, with engineering support from APQP to PPAP." },
};

export default function CapabilitiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Capabilities", path: "/capabilities" }])} />
      <PageHeader eyebrow={processIntro.eyebrow} lead={processIntro.headline.lead} mark={processIntro.headline.mark} lede={processIntro.lede} />

      <SectionShell ariaLabel="Plate to product table" className="pt-4">
        <ProcessTable />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/images/process/laser-cutting.jpg" alt="CNC laser cutting head with sparks on a steel plate" fill sizes="(min-width: 640px) 45vw, 90vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/images/process/container-loading.jpg" alt="Forklift loading a crated export consignment into a container on JREW premises" fill sizes="(min-width: 640px) 45vw, 90vw" className="object-cover" />
          </div>
        </div>
      </SectionShell>

      <SectionShell id="partnership" labelledBy="partnership-h" tone="warm">
        <Eyebrow>{partnership.eyebrow}</Eyebrow>
        <TwoToneHeading id="partnership-h" lead={partnership.headline.lead} mark={partnership.headline.mark} className="max-w-[30ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
        <p className="mt-5 max-w-[64ch] text-ink-2">{partnership.body}</p>
        <div className="mt-10">
          <ol className="grid gap-3 sm:grid-cols-2">
            {partnership.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 bg-paper p-5">
                <span className="tnum display flex h-9 w-12 items-center justify-center bg-marigold text-base text-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display-md text-lg">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {partnership.images.map((im, i) => (
              <div key={im.src} className="relative aspect-[4/3] overflow-hidden">
                <Image src={im.src} alt={im.alt} fill sizes="(min-width: 640px) 45vw, 90vw" className={i === 1 ? "object-cover object-[50%_35%]" : "object-cover"} />
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="proof" labelledBy="proof-h">
        <TwoToneHeading id="proof-h" lead={proof.headline.lead} mark={proof.headline.mark} className="max-w-[24ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
        <p className="mt-5 max-w-[60ch] text-ink-2">{proof.body}</p>
        <ul className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2">
          {proof.rows.map((r, i) => (
            <li key={r.title} className={`bar border-b border-line py-5 ${i % 2 ? "bar-marigold" : ""}`}>
              <h3 className="display-md text-lg">{r.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{r.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={proof.image.src} alt={proof.image.alt} fill sizes="(min-width: 1024px) 55vw, 90vw" className="object-cover" />
          </div>
          <div className="on-ink grid gap-px bg-ink-line sm:grid-cols-3 lg:grid-cols-1">
            {proof.panel.map((p) => (
              <div key={p.title} className="bg-ink-panel p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-on-ink-3">{p.title}</p>
                {"value" in p ? <p className="display tnum mt-1 whitespace-nowrap text-4xl text-marigold">{p.value}</p> : null}
                <p className="mt-2 text-[14px] leading-relaxed text-on-ink-2">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="case-study" labelledBy="case-h" tone="cool">
        <TwoToneHeading id="case-h" lead={caseStudy.headline.lead} mark={caseStudy.headline.mark} className="max-w-[24ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
        <p className="mt-5 max-w-[64ch] text-ink-2">{caseStudy.body}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <h3 className="display-md text-lg">{caseStudy.deliveredTitle}</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {caseStudy.delivered.map((d) => (
                <li key={d} className="bar bar-marigold my-3 text-[15px] leading-relaxed">
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-grid w-fit max-w-full grid-cols-[auto_auto_1fr] items-stretch text-[14px] font-semibold uppercase tracking-[0.06em]">
              <span className="bg-ink px-4 py-3 text-on-ink">{caseStudy.arrow.from}</span>
              <span aria-hidden className="flex items-center bg-marigold px-3 text-ink">→</span>
              <span className="bg-ink px-4 py-3 text-on-ink">{caseStudy.arrow.to}</span>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={caseStudy.images[0].src} alt={caseStudy.images[0].alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </div>
        </div>
        <div className="relative mt-4 aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
          <Image src={caseStudy.images[1].src} alt={caseStudy.images[1].alt} fill sizes="90vw" className="object-cover object-[50%_40%]" />
        </div>
        <div className="on-ink mt-4 bg-ink-panel p-6 text-on-ink sm:p-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-marigold">{caseStudy.whyTitle}</p>
          <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-on-ink-2">{caseStudy.why}</p>
        </div>
        <div className="mt-12">
          <Button href={rfqHref}>Request a quote</Button>
        </div>
      </SectionShell>
    </>
  );
}
