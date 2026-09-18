import { Hero } from "@/components/sections/Hero";
import { StatBand } from "@/components/sections/StatBand";
import { Sectors } from "@/components/sections/Sectors";
import { FamilyGrid } from "@/components/sections/FamilyGrid";
import { ComponentStories } from "@/components/sections/ComponentStories";
import { ProcessChain } from "@/components/sections/ProcessChain";
import { Trusted } from "@/components/sections/Trusted";
import { QualityBand } from "@/components/sections/QualityBand";
import { FacilityStrip } from "@/components/sections/FacilityStrip";
import { WhyJrewRfq } from "@/components/sections/WhyJrewRfq";

export default function Home() {
  return (
    <>
      <Hero />
      <StatBand />
      <Trusted />
      <Sectors />
      <FamilyGrid />
      <ComponentStories />
      <ProcessChain />
      <QualityBand />
      <FacilityStrip />
      <WhyJrewRfq />
    </>
  );
}
