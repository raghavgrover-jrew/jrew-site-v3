import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { StickySubnav } from "@/components/ui/StickySubnav";
import { ByMachineTabs } from "@/components/ui/ByMachineTabs";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ComponentStories } from "@/components/sections/ComponentStories";
import { StakonBand } from "@/components/sections/StakonBand";
import { JsonLd, breadcrumbSchema, productSchema } from "@/lib/jsonld";
import { families, familiesIntro, mastFamily, axleFamily } from "@/data/families";
import { attachmentsIntro, attachments } from "@/data/attachments";
import { forgedIntro, forgedProducts, forgedStrip } from "@/data/forged";

export const metadata: Metadata = {
  title: "Products",
  description: "Forklift masts, axle assemblies, structural components, attachments and forged products, machined to OEM drawings at four plants in Punjab and Haryana.",
  alternates: { canonical: "/products" },
  openGraph: { type: "website", url: "/products", title: "Products | JREW Engineering", description: "Forklift masts, axle assemblies, structural components, attachments and forged products, machined to OEM drawings at four plants in Punjab and Haryana." },
  twitter: { card: "summary_large_image", title: "Products | JREW Engineering", description: "Forklift masts, axle assemblies, structural components, attachments and forged products, machined to OEM drawings at four plants in Punjab and Haryana." },
};

const subnav = [
  { id: "by-machine", label: "By machine" },
  { id: "masts", label: "Masts" },
  { id: "axles", label: "Axles" },
  { id: "components", label: "Components" },
  { id: "attachments", label: "Attachments" },
  { id: "forged", label: "Forged" },
  { id: "stakon", label: "STAKON" },
];

export default function ProductsPage() {
  const jsonld = [
    breadcrumbSchema([{ name: "Products", path: "/products" }]),
    ...families.map((f) => productSchema({ name: f.name, description: f.short, image: f.image, category: "Industrial components" })),
  ];
  return (
    <>
      <JsonLd data={jsonld} />
      <PageHeader lead="Six families," mark="one source." lede={familiesIntro} />
      <StickySubnav items={subnav} />

      <SectionShell id="by-machine" labelledBy="by-machine-h" className="pt-12">
        <TwoToneHeading id="by-machine-h" lead="Start from" mark="your machine" inline className="text-[clamp(1.7rem,3vw,2.5rem)]" />
        <p className="mt-4 max-w-[60ch] text-ink-2">Pick the equipment you build. Each list names only what JREW makes for it today.</p>
        <div className="mt-8">
          <ByMachineTabs />
        </div>
      </SectionShell>

      <SectionShell id="masts" labelledBy="masts-h" tone="warm">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <h2 id="masts-h" className="kicker">
              {mastFamily.eyebrow}
            </h2>
            <TwoToneHeading as="p" lead={mastFamily.headline.lead} mark={mastFamily.headline.mark} className="mt-2 text-[clamp(1.9rem,3.6vw,3rem)]" />
            <p className="mt-5 max-w-[60ch] text-ink-2">{mastFamily.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {mastFamily.pills.map((p) => (
                <li key={p} className="on-ink bg-ink px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-marigold">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[20rem] bg-paper">
            <Image src={mastFamily.image} alt="Two-stage forklift mast assembly with carriage" fill sizes="(min-width: 1024px) 30vw, 70vw" className="object-contain p-6" />
          </div>
        </div>
      </SectionShell>

      <SectionShell id="axles" labelledBy="axles-h">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="relative aspect-[16/7] w-full bg-paper lg:aspect-[16/9]">
            <Image src={axleFamily.image} alt="Backhoe-loader front axle assembly with steering cylinder" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-contain p-6" />
          </div>
          <div>
            <h2 id="axles-h" className="kicker">
              {axleFamily.eyebrow}
            </h2>
            <TwoToneHeading as="p" lead={axleFamily.headline.lead} mark={axleFamily.headline.mark} className="mt-2 text-[clamp(1.9rem,3.6vw,3rem)]" />
            <p className="mt-5 max-w-[60ch] text-ink-2">{axleFamily.body}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {axleFamily.variants.map((v) => (
                <li key={v} className="bar bar-marigold my-3 text-[15px] leading-relaxed text-ink">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <ComponentStories />

      <SectionShell id="attachments" labelledBy="attachments-h" tone="cool">
        <Eyebrow>{attachmentsIntro.eyebrow}</Eyebrow>
        <TwoToneHeading id="attachments-h" lead={attachmentsIntro.headline.lead} mark={attachmentsIntro.headline.mark} inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
        <p className="mt-5 max-w-[64ch] text-ink-2">{attachmentsIntro.body}</p>
        <ul className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-7 [&>li:nth-child(7)]:max-md:hidden">
          {attachments.slice(0, 7).map((a) => (
            <li key={a.id} className="relative aspect-square bg-paper">
              <Image src={a.image} alt={a.name} fill sizes="(min-width: 768px) 14vw, 33vw" className="object-contain p-3" />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/products/attachments">All 14 attachments, filtered by machine</Button>
          <p className="text-[14px] font-semibold uppercase tracking-[0.06em] text-ink-3">{attachmentsIntro.footerTag}</p>
        </div>
      </SectionShell>

      <SectionShell id="forged" labelledBy="forged-h">
        <Eyebrow>{forgedIntro.eyebrow}</Eyebrow>
        <TwoToneHeading id="forged-h" lead={forgedIntro.headline.lead} mark={forgedIntro.headline.mark} inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {forgedProducts.map((f) => (
            <li key={f.id} className="border border-line bg-paper">
              <div className="relative aspect-square">
                <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-contain p-6" />
              </div>
              <div className="hairline p-5">
                <h3 className="display-md text-lg">{f.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{f.body}</p>
                <p className="tnum mt-3 border-t border-line pt-3 text-[14px] font-semibold uppercase tracking-[0.04em]">{f.spec}</p>
              </div>
            </li>
          ))}
        </ul>
        <dl className="on-ink mt-4 grid gap-px bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {forgedStrip.map((s) => (
            <div key={s.title} className="bg-ink-panel p-5">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-marigold">{s.title}</dt>
              <dd className="mt-2 text-[14.5px] leading-relaxed text-on-ink-2">{s.body}</dd>
            </div>
          ))}
        </dl>
        <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden sm:aspect-[3/1]">
          <Image src="/images/forged/forging-shop-panorama.jpg" alt="Forging shop with hooks and forks in process" fill sizes="100vw" className="object-cover object-[50%_45%]" />
        </div>
      </SectionShell>

      <StakonBand />
      <p className="sr-only">
        <Link href="/products/attachments">Attachments catalogue</Link>
      </p>
    </>
  );
}
