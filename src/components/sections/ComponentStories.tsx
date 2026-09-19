import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Button } from "@/components/ui/Button";
import { rfqHrefFor } from "@/lib/rfq";
import { Reveal } from "@/components/ui/Reveal";
import { components, componentsIntro } from "@/data/components";

// Spread 04 right. Eight named-OEM proof cards: cut-out, the black name plate, why the tolerance matters.
export function ComponentStories({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  return (
    <SectionShell id="components" labelledBy="components-h">
      <Eyebrow>{componentsIntro.eyebrow}</Eyebrow>
      <TwoToneHeading id="components-h" as={headingLevel} lead={componentsIntro.headline.lead} mark={componentsIntro.headline.mark} inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
      <Reveal as="ul" stagger={0.05} className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2">
        {components.map((c) => (
          <li key={c.id} className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-5">
            <div className="relative aspect-[4/3] bg-paper">
              <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 768px) 20vw, 40vw" className="object-contain p-4" />
            </div>
            <div>
              <div className="on-ink inline-block bg-ink px-3 py-2 leading-tight">
                <p className="text-[15px] font-bold text-marigold">{c.part}</p>
                <p className="text-[13px] font-semibold text-on-ink">{c.customer}</p>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.detail}</p>
            </div>
          </li>
        ))}
      </Reveal>
      <Button href={rfqHrefFor("components")} variant="ghost" className="mt-10">
        Request a quote for components
      </Button>
    </SectionShell>
  );
}
