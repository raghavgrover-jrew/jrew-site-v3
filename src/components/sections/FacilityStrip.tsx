import Image from "next/image";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { facilities, facilitiesIntro, rajpura } from "@/data/facilities";

// Spread 07 left and the Rajpura panel from spread 10.
export function FacilityStrip() {
  return (
    <SectionShell id="facilities" labelledBy="facilities-h">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <TwoToneHeading id="facilities-h" lead={facilitiesIntro.headline.lead} mark={facilitiesIntro.headline.mark} className="max-w-[18ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
          <p className="mt-5 max-w-[60ch] text-ink-2">{facilitiesIntro.body}</p>
        </div>
        <Button href="/facilities" variant="secondary">
          All four units
        </Button>
      </div>
      <Reveal as="ul" stagger={0.06} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facilities.map((f) => (
          <li key={f.id} className="border border-line bg-paper">
            <div className="relative aspect-[3/2]">
              <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
            </div>
            <div className="p-5">
              <p className="display-md text-xl">
                <span className="tnum">{f.code}</span> <span className="text-ink-3">{f.city}</span>
              </p>
              <p className="tnum mt-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                Est. {f.established} | {f.sqft.toLocaleString("en-IN")} sq ft
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{f.role}</p>
            </div>
          </li>
        ))}
      </Reveal>
      <div className="on-ink mt-4 grid gap-6 bg-ink-panel p-6 text-on-ink sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <p className="display tnum text-[clamp(2.5rem,5vw,4rem)] leading-none text-marigold">{rajpura.year}</p>
        <div>
          <h3 className="display-md text-xl">{rajpura.name}</h3>
          <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-on-ink-2">{rajpura.body}</p>
        </div>
      </div>
    </SectionShell>
  );
}
