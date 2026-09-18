import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Button } from "@/components/ui/Button";
import { processStages, processIntro } from "@/data/process";

// Spread 07 right as a black chapter: the nine stages in sequence, numbered because they are one.
export function ProcessChain() {
  return (
    <SectionShell id="process" labelledBy="process-h" tone="ink">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <TwoToneHeading id="process-h" tone="ink" lead={processIntro.headline.lead} mark={processIntro.headline.mark} className="max-w-[16ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
        <Button href="/capabilities" variant="onInkSecondary">
          Full capability table
        </Button>
      </div>
      <ol className="mt-12 grid gap-px bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
        {processStages.map((p, i) => (
          <li key={p.stage} className="bg-ink-panel p-6">
            <p className="tnum text-[13px] font-semibold text-marigold">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="display-md mt-2 text-lg text-on-ink">{p.stage}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-on-ink-2">{p.capability}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
