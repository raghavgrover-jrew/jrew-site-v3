import { contact } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { RfqFlow } from "@/components/ui/RfqFlow";
import { whyJrew, whyIntro } from "@/data/whyJrew";
import { cn } from "@/lib/utils";

// Spread 12 left: the four reasons as the closing argument, and the RFQ intake beside them.
export function WhyJrewRfq() {
  return (
    <SectionShell id="why" labelledBy="why-h" tone="warm">
      <Eyebrow>{whyIntro.eyebrow}</Eyebrow>
      <TwoToneHeading id="why-h" lead={whyIntro.headline.lead} mark={whyIntro.headline.mark} className="max-w-[20ch] text-[clamp(1.9rem,3.6vw,3rem)]" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14">
        <ol className="space-y-3">
          {whyJrew.map((r, i) => (
            <li key={r.n} className={cn("bar p-5 sm:p-6", i % 2 === 0 ? "bg-paper" : "bg-card-cool", i % 2 === 1 && "bar-marigold")}>
              <h3 className="display-md text-lg">
                <span className="tnum mr-3 text-ink-3">{String(r.n).padStart(2, "0")}</span>
                {r.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{r.body}</p>
            </li>
          ))}
        </ol>
        <div id="rfq-home">
          <h3 className="display-md text-xl">Open an RFQ</h3>
          <p className="mt-2 text-[15px] text-ink-2">Three short steps. Read by the commercial team; the reply comes from {contact.email}.</p>
          <div className="mt-5">
            <RfqFlow idPrefix="home" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
