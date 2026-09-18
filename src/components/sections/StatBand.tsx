import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { KineticNumber } from "@/components/ui/KineticNumber";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { stats, snapshotTable } from "@/data/stats";

// Spread 02 left. Six numerals with a marigold bar (fill, not type), the four-row table beneath.
export function StatBand() {
  return (
    <SectionShell ariaLabel="Company snapshot" className="relative z-10">
      <TwoToneHeading lead="Five decades," mark="measured" inline className="text-[clamp(1.9rem,3.6vw,3rem)]" />
      <Reveal as="ul" stagger={0.06} className="mt-10 grid grid-cols-2 gap-px bg-line md:grid-cols-3">
        {stats.map((s) => (
          <li key={s.label} className="bg-paper py-7 pr-4 sm:py-9">
            <span aria-hidden className="block h-1 w-10 bg-marigold" />
            <p className="display tnum mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-none">
              {s.countUp ? (<>{s.prefix ? <span className="mr-1 text-[0.5em] font-bold text-ink-2">{s.prefix.trim()}</span> : null}<KineticNumber value={s.value} suffix={s.suffix} /></>) : s.display}
            </p>
            <p className="mt-3 max-w-[22ch] text-[14px] font-semibold uppercase tracking-[0.06em] text-ink-3">{s.label}</p>
          </li>
        ))}
      </Reveal>
      <dl className="mt-10 grid gap-px bg-line sm:grid-cols-2">
        {snapshotTable.map((r) => (
          <div key={r.key} className="grid grid-cols-[7rem_1fr] gap-4 bg-card-warm px-5 py-4 text-[15px]">
            <dt className="font-semibold uppercase tracking-[0.06em] text-ink-3">{r.key}</dt>
            <dd className="text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}
