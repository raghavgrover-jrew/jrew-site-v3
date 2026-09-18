import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { StakonBand } from "@/components/sections/StakonBand";
import { JsonLd, breadcrumbSchema, productSchema } from "@/lib/jsonld";
import { stakon } from "@/data/stakon";

export const metadata: Metadata = {
  title: "STAKON material handling equipment",
  description: "STAKON electric and semi-electric pallet stackers and electric pallet trucks, 500 kg to 2,000 kg, lifting to 6.3 m: FE Series, SE Series and FEPT 2000. Designed and manufactured at JREW's Mohali facility.",
  alternates: { canonical: "/stakon" },
};

export default function StakonPage() {
  const jsonld = [
    breadcrumbSchema([{ name: "STAKON", path: "/stakon" }]),
    ...stakon.models.map((m) => productSchema({ name: m.name, description: `${m.type}. ${m.body}`, image: m.image, category: "Material handling equipment" })),
  ];
  return (
    <>
      <JsonLd data={jsonld} />
      <PageHeader eyebrow={stakon.eyebrow} lead="STAKON" mark="by JREW" lede="Electric and semi-electric pallet stackers and electric pallet trucks, 500 kg to 2,000 kg, lifting to 6.3 m. Three series are listed with headline specifications; data sheets on request." />
      <StakonBand full />
    </>
  );
}
