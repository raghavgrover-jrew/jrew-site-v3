import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { IndiaMap } from "@/components/ui/IndiaMap";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { facilities, facilitiesIntro, rajpura } from "@/data/facilities";
import { people } from "@/data/quality";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Four units in Mohali and Faridabad with their equipment and addresses, and the 600,000 sq ft Rajpura greenfield campus, Phase 1 in 2027.",
  alternates: { canonical: "/facilities" },
  openGraph: { type: "website", url: "/facilities", title: "Facilities | JREW Engineering", description: "Four units in Mohali and Faridabad with their equipment and addresses, and the 600,000 sq ft Rajpura greenfield campus, Phase 1 in 2027." },
  twitter: { card: "summary_large_image", title: "Facilities | JREW Engineering", description: "Four units in Mohali and Faridabad with their equipment and addresses, and the 600,000 sq ft Rajpura greenfield campus, Phase 1 in 2027." },
};

export default function FacilitiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Facilities", path: "/facilities" }])} />
      <PageHeader eyebrow={facilitiesIntro.eyebrow} lead={facilitiesIntro.headline.lead} mark={facilitiesIntro.headline.mark} lede={facilitiesIntro.body} />

      <SectionShell ariaLabel="Operating units" className="pt-4">
        <ul className="space-y-4">
          {facilities.map((f, i) => (
            <li key={f.id} id={f.id} className={`grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] ${i % 2 ? "bg-card-warm" : "bg-card-cool"}`}>
              <div className="relative aspect-[4/3] overflow-hidden lg:order-2 lg:self-start">
                <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width: 1360px) 400px, (min-width: 1024px) 30vw, 90vw" className={f.id === "moh-2" ? "object-cover object-[50%_40%]" : "object-cover"} />
              </div>
              <div className={`bar ${i % 2 ? "bar-marigold" : ""}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="display text-2xl sm:text-3xl">
                    <span className="tnum">{f.code}</span>
                  </h2>
                  <p className="tnum text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                    Est. {f.established} | {f.sqft.toLocaleString("en-US")} sq ft
                  </p>
                </div>
                <p className="display-md mt-1 text-lg text-ink-2">
                  {f.city}: {f.role}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink">{f.description}</p>
                {f.equipment ? (
                  <p className="hairline mt-3 pt-3 text-[14.5px] leading-relaxed text-ink-2">
                    <span className="font-semibold text-ink">Key equipment: </span>
                    {f.equipment}
                  </p>
                ) : null}
                <p className="mt-4 text-[14px] text-ink-3">{f.address}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell id="rajpura" labelledBy="rajpura-h" tone="ink">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
          <div>
            <TwoToneHeading id="rajpura-h" tone="ink" lead="Next:" mark="Rajpura, 2027" inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
            <dl className="mt-8 grid gap-px bg-ink-line sm:grid-cols-2">
              {people.future.map((f) => (
                <div key={f.year} className="bg-ink-panel py-6 pr-6 pl-6 first:pl-0">
                  <dt className="display tnum text-3xl text-marigold">{f.year}</dt>
                  <dd className="display-md mt-2 text-lg text-on-ink">{f.title}</dd>
                  <dd className="mt-2 text-[15px] leading-relaxed text-on-ink-2">{f.body}</dd>
                </div>
              ))}
            </dl>
            <p className="tnum mt-6 text-[14px] text-on-ink-3">Rajpura, Punjab: {rajpura.sqft.toLocaleString("en-US")} sq ft campus, Phase 1.</p>
          </div>
          <IndiaMap />
        </div>
      </SectionShell>
    </>
  );
}
