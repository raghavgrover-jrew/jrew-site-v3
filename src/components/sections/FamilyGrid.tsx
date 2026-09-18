import Image from "next/image";
import Link from "next/link";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { families, familiesIntro } from "@/data/families";
import { cn } from "@/lib/utils";

// Spread 04 left headline; six families as the product taxonomy in the second fold.
export function FamilyGrid() {
  return (
    <SectionShell id="families" labelledBy="families-h" tone="warm">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <TwoToneHeading id="families-h" lead="Six families," mark="one source." inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
          <p className="mt-5 max-w-[60ch] text-ink-2">{familiesIntro}</p>
        </div>
        <Link href="/products" className="text-[15px] font-semibold underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-ink">
          All six families
        </Link>
      </div>
      <Reveal as="ul" stagger={0.06} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {families.map((f, i) => (
          <li key={f.id} className={cn("group flex flex-col border border-line bg-paper", i === 0 && "lg:row-span-2")}>
            <Link href={f.href} className="flex h-full flex-col">
              <div className={cn("relative flex items-center justify-center bg-paper p-6", i === 0 ? "min-h-[16rem] flex-1" : "aspect-[4/3]")}>
                <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-contain p-6 transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]" />
              </div>
              <div className="hairline p-5">
                <h3 className="display-md text-lg leading-snug">{f.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{f.short}</p>
                <p className="mt-3 text-[14px] font-semibold underline decoration-marigold decoration-2 underline-offset-4 group-hover:decoration-ink">View family</p>
              </div>
            </Link>
          </li>
        ))}
      </Reveal>
    </SectionShell>
  );
}
