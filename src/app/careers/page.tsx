import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { CareerForm } from "@/components/ui/CareerForm";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { icare, uplift } from "@/data/values";
import { people } from "@/data/quality";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work at JREW Engineering: 1,000+ people across four units in Mohali and Faridabad, curriculum-based technical training, ISO 45001 workplaces. Open application with resume.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Careers", path: "/careers" }])} />
      <PageHeader lead="Built by people." mark="Ready for tomorrow." lede={people.body} />
      <SectionShell ariaLabel="Working at JREW" className="pt-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <ul className="space-y-3">
              {people.rows.map((r, i) => (
                <li key={r.title} className={`bar p-5 ${i % 2 ? "bg-card-warm bar-marigold" : "bg-card-cool"}`}>
                  <h2 className="display-md text-lg">{r.title}</h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{r.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="display text-lg">{icare.lead}</h2>
                <ul className="mt-3 space-y-2 text-[14.5px]">
                  {icare.items.map((v) => (
                    <li key={v.letter}>
                      <span className="font-bold">{v.word}.</span> <span className="text-ink-2">{v.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="display text-lg">{uplift.lead}</h2>
                <ul className="mt-3 space-y-2 text-[14.5px]">
                  {uplift.items.map((v) => (
                    <li key={v.letter}>
                      <span className="font-bold">{v.word}.</span> <span className="text-ink-2">{v.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <Image src={people.images[0].src} alt={people.images[0].alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
        </div>
      </SectionShell>
      <SectionShell id="apply" ariaLabel="Open application" tone="warm">
        <h2 className="display text-[clamp(1.7rem,3vw,2.5rem)]">Open application</h2>
        <p className="mt-4 max-w-[56ch] text-ink-2">Send a resume and tell us the area you want to work in. HR reads every application.</p>
        <div className="mt-8 max-w-[52rem]">
          <CareerForm />
        </div>
      </SectionShell>
    </>
  );
}
