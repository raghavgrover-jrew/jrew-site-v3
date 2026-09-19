import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { StakonBand } from "@/components/sections/StakonBand";
import { JsonLd, breadcrumbSchema, productSchema } from "@/lib/jsonld";
import { stakon } from "@/data/stakon";

export const metadata: Metadata = {
  title: "STAKON material handling equipment",
  description: "STAKON pallet stackers and pallet trucks by JREW: FE, SE and FEPT series, 500 kg to 2,000 kg, lifting to 6.3 m, built in Mohali.",
  alternates: { canonical: "/stakon" },
  openGraph: { type: "website", url: "/stakon", title: "STAKON material handling equipment | JREW Engineering", description: "STAKON pallet stackers and pallet trucks by JREW: FE, SE and FEPT series, 500 kg to 2,000 kg, lifting to 6.3 m, built in Mohali." },
  twitter: { card: "summary_large_image", title: "STAKON material handling equipment | JREW Engineering", description: "STAKON pallet stackers and pallet trucks by JREW: FE, SE and FEPT series, 500 kg to 2,000 kg, lifting to 6.3 m, built in Mohali." },
};

export default function StakonPage() {
  const jsonld = [
    breadcrumbSchema([{ name: "STAKON", path: "/stakon" }]),
    ...stakon.models.map((m) => productSchema({ name: m.name, description: `${m.type}. ${m.body}`, image: m.image, category: "Material handling equipment" })),
  ];
  return (
    <>
      <JsonLd data={jsonld} />
      <PageHeader eyebrow={stakon.eyebrow} lead="STAKON" mark="by JREW" lede="Three series with headline specifications; data sheets on request." />
      <StakonBand full />
    </>
  );
}
