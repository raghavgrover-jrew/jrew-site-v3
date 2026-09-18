import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Button } from "@/components/ui/Button";
import { certifications, qualityIntro, inspection } from "@/data/quality";
import { proof } from "@/data/partnership";

// Spread 09 right and the 0 PPM panel from spread 08.
export function QualityBand() {
  return (
    <SectionShell id="quality" labelledBy="quality-h" tone="cool">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14">
        <div>
          <Eyebrow>{qualityIntro.eyebrow}</Eyebrow>
          <TwoToneHeading id="quality-h" lead={qualityIntro.headline.lead} mark={qualityIntro.headline.mark} className="text-[clamp(1.9rem,3.6vw,3rem)]" />
          <p className="mt-5 max-w-[56ch] text-ink-2">{qualityIntro.body}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Certifications">
            {certifications.map((c) => (
              <li key={c.code} className="on-ink bg-ink px-4 py-2.5 leading-tight">
                <p className="tnum text-[15px] font-bold text-marigold">{c.code}</p>
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-on-ink-2">{c.scope}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-3">{qualityIntro.certifier}</p>
          <Button href="/quality" variant="secondary" className="mt-8">
            Quality systems and inspection
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={inspection.images[1].src} alt={inspection.images[1].alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="on-ink grid gap-px bg-ink-line sm:grid-cols-3">
            {proof.panel.map((p) => (
              <div key={p.title} className="bg-ink-panel p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-on-ink-3">{p.title}</p>
                {"value" in p ? <p className="display tnum mt-1 text-3xl text-marigold">{p.value}</p> : null}
                <p className="mt-2 text-[14px] leading-relaxed text-on-ink-2">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
