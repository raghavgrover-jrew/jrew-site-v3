import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Wipe } from "@/components/ui/Wipe";
import { Reveal } from "@/components/ui/Reveal";
import { sectors, sectorsIntro } from "@/data/sectors";
import { cn } from "@/lib/utils";

// Spread 02 right. Four rows in the brochure's alternating fills with the left bar and the line art.
export function Sectors() {
  return (
    <SectionShell id="sectors" labelledBy="sectors-h" tone="paper">
      <Eyebrow>Industries we serve</Eyebrow>
      <TwoToneHeading id="sectors-h" lead="Four sectors," mark="one platform" inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
      <p className="mt-5 max-w-[56ch] text-ink-2">{sectorsIntro}</p>
      <Reveal as="ul" stagger={0.08} className="mt-10 space-y-3">
        {sectors.map((s, i) => (
          <li key={s.id} className={cn("grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]", i % 2 === 0 ? "bg-card-cool" : "bg-card-warm")}>
            <div className={cn("bar", i % 2 === 1 && "bar-marigold")}>
              <h3 className="display-md text-xl sm:text-2xl">{s.name}</h3>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{s.description}</p>
            </div>
            <Wipe className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
              <Image src={s.lineArt} alt={s.lineArtAlt} width={600} height={300} unoptimized className="h-auto w-full" />
            </Wipe>
          </li>
        ))}
      </Reveal>
    </SectionShell>
  );
}
