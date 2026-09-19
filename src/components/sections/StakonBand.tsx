import Image from "next/image";
import { cn } from "@/lib/utils";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Button } from "@/components/ui/Button";
import { stakon } from "@/data/stakon";
import { contact } from "@/lib/site";

// Spread 06 right. Own brand; printed model names only.
export function StakonBand({ full = false }: { full?: boolean }) {
  return (
    <SectionShell id="stakon" labelledBy="stakon-h" tone="warm">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
        <div>
          <TwoToneHeading id="stakon-h" lead={stakon.headline.lead} mark={stakon.headline.mark} className="max-w-[20ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
          <p className="mt-5 max-w-[60ch] text-ink-2">{stakon.body}</p>
          <dl className="mt-7 flex flex-wrap gap-10">
            {stakon.stats.map((s) => (
              <div key={s.label}>
                <dd className="display-md tnum text-[clamp(2rem,3.5vw,2.75rem)] leading-none">{s.value}</dd>
                <dt className="mt-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-3">{s.label}</dt>
              </div>
            ))}
          </dl>
          <ul className="mt-7 space-y-2 text-[15px] text-ink-2">
            {stakon.bullets.map((b) => (
              <li key={b} className="bar bar-marigold py-0.5">
                {b}
              </li>
            ))}
          </ul>
          {!full ? (
            <Button href="/stakon" variant="secondary" className="mt-8">
              The STAKON range
            </Button>
          ) : (
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact#rfq">Request a quote</Button>
              <Button href={contact.stakonUrl} variant="secondary" external>
                stakon.in
              </Button>
            </div>
          )}
        </div>
        <div className={cn("relative mx-auto aspect-[2/3] w-full max-w-[28rem]", full && "max-lg:hidden")}>
          <Image src={stakon.hero.image} alt={stakon.hero.alt} fill sizes="(min-width: 1024px) 35vw, 80vw" className="object-contain object-bottom" />
        </div>
      </div>
      {full ? (
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {stakon.models.map((m) => (
            <li key={m.name} className="border border-line bg-paper">
              <div className="relative aspect-square">
                <Image src={m.image} alt={m.alt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-contain object-bottom px-6 pb-8 pt-6" />
              </div>
              <div className="hairline p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-3">{m.type}</p>
                <h3 className="display-md mt-1 text-lg">{m.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{m.body}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </SectionShell>
  );
}
