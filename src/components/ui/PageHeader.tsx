import { Eyebrow } from "@/components/ui/Eyebrow";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

// Standard page opening: optional eyebrow (the page's one allowed), two-tone h1, one lede.
export function PageHeader({ eyebrow, lead, mark, lede, tone = "paper" }: { eyebrow?: string; lead: string; mark: string; lede?: string; tone?: "paper" | "ink" }) {
  return (
    <header className={tone === "ink" ? "bg-ink-panel text-on-ink on-ink" : "bg-paper text-ink"}>
      <div className="shell pt-28 pb-12 sm:pt-32 sm:pb-16">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <TwoToneHeading as="h1" lead={lead} mark={mark} tone={tone} className="max-w-[24ch] text-[clamp(2rem,5.2vw,4.75rem)]" />
        {lede ? <p className={`mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed sm:text-lg ${tone === "ink" ? "text-on-ink-2" : "text-ink-2"}`}>{lede}</p> : null}
      </div>
    </header>
  );
}
