import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { certifications, qualityIntro, inspection, people } from "@/data/quality";
import { proof } from "@/data/partnership";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quality",
  description:
    "ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certified by TUV Rheinland, EN ISO 3834-2 fusion welding, CII GreenCo. Bridge CMMs with Renishaw probes, FARO arm CMMs, Level II NDT (DPT, MPI, RT, UT), destructive testing. Zero-PPM record with APQP and PPAP discipline.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Quality", path: "/quality" }])} />
      <PageHeader eyebrow={qualityIntro.eyebrow} lead={qualityIntro.headline.lead} mark={qualityIntro.headline.mark} lede={qualityIntro.body} />

      <SectionShell ariaLabel="Certifications" className="pt-4">
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {certifications.map((c) => (
            <li key={c.code} className="on-ink bg-ink-panel p-5">
              <p className="tnum display-md text-xl text-marigold">{c.code}</p>
              <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-on-ink-2">{c.scope}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3 text-[14px]">
          <p className="font-semibold uppercase tracking-[0.08em] text-ink-3">{qualityIntro.certifier}</p>
          <p className="text-ink-2">
            Certificate copies are available on request:{" "}
            <a href={`mailto:${contact.email}?subject=Certificate%20copies`} className="font-semibold underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-ink">
              {contact.email}
            </a>
          </p>
        </div>
      </SectionShell>

      <SectionShell id="inspection" labelledBy="inspection-h" tone="warm">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <div>
            <TwoToneHeading id="inspection-h" lead="Inspection" mark="infrastructure" inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {inspection.rows.map((r, i) => (
                <li key={r} className={`bar my-3 text-[15px] leading-relaxed ${i % 2 ? "bar-marigold" : ""}`}>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4">
            {inspection.images.map((im) => (
              <div key={im.src} className="relative aspect-[4/3] overflow-hidden">
                <Image src={im.src} alt={im.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="proven" labelledBy="proven-h" tone="ink">
        <TwoToneHeading id="proven-h" tone="ink" lead={proof.headline.lead} mark={proof.headline.mark} className="max-w-[18ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
        <dl className="mt-10 grid gap-px bg-ink-line md:grid-cols-3">
          {proof.panel.map((p) => (
            <div key={p.title} className="bg-ink-panel p-6">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-on-ink-3">{p.title}</dt>
              {"value" in p ? <dd className="display tnum mt-1 text-4xl text-marigold">{p.value}</dd> : null}
              <dd className="mt-2 text-[15px] leading-relaxed text-on-ink-2">{p.body}</dd>
            </div>
          ))}
        </dl>
      </SectionShell>

      <SectionShell id="people" labelledBy="people-h">
        <TwoToneHeading id="people-h" lead={people.headline.lead} mark={people.headline.mark} className="max-w-[16ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
        <p className="mt-5 max-w-[60ch] text-ink-2">{people.body}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ul className="space-y-3">
            {people.rows.map((r, i) => (
              <li key={r.title} className={`bar p-5 ${i % 2 ? "bg-card-warm bar-marigold" : "bg-card-cool"}`}>
                <h3 className="display-md text-lg">{r.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{r.body}</p>
              </li>
            ))}
          </ul>
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <Image src={people.images[0].src} alt={people.images[0].alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
        </div>
      </SectionShell>
    </>
  );
}
