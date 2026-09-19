import Image from "next/image";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { customers, customersIntro } from "@/data/customers";
import { awards, caterpillarYears } from "@/data/awards";

// Spread 11. Sole-supplier sentence once, 24 logos in print order, then the awards.
export function Trusted() {
  const cat = awards[0];
  const others = awards.slice(1);
  return (
    <SectionShell id="customers" labelledBy="customers-h" className="hairline">
      <TwoToneHeading id="customers-h" lead={customersIntro.headline.lead} mark={customersIntro.headline.mark} inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
      <p className="mt-5 max-w-[60ch] text-ink-2">{customersIntro.body}</p>
      <Reveal as="ul" stagger={0.02} className="mt-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-6" aria-label="Customers">
        {customers.map((c) => (
          <li key={c.id} className="flex h-24 items-center justify-center bg-paper px-4 sm:h-28 sm:px-5">
            <Image src={c.logo} alt={c.name} width={c.width} height={c.height} unoptimized className="h-auto max-h-12 w-auto max-w-full object-contain sm:max-h-14 sm:max-w-[8.5rem]" />
          </li>
        ))}
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="bg-card-warm p-6 sm:p-8">
          <p className="kicker">Awards and recognition</p>
          <h3 className="display-md mt-2 text-xl sm:text-2xl">
            {cat.giver}: {cat.title}
          </h3>
          <p className="tnum mt-1 text-[15px] font-semibold text-ink-2">{cat.note}, {cat.years?.join(", ")}</p>
          <ul className="mt-5 grid grid-cols-3 gap-3">
            {caterpillarYears.map((y) => (
              <li key={y.year} className="relative aspect-[3/2] overflow-hidden bg-paper">
                <Image src={y.image} alt={`Caterpillar Supplier Excellence Recognition ${y.year}`} fill sizes="(min-width: 1024px) 18vw, 30vw" className="object-cover" />
                <span className="tnum absolute bottom-0 left-0 bg-ink px-2 py-1 text-[12px] font-semibold text-on-ink">{y.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="divide-y divide-line border-y border-line self-start">
          {others.map((a) => (
            <li key={a.id} className="flex items-baseline justify-between gap-6 py-4">
              <span className="text-[15px] font-bold">{a.giver}</span>
              <span className="text-right text-[15px] text-ink-2">{a.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
