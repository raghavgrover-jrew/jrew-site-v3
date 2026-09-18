import { cn } from "@/lib/utils";

type Tone = "paper" | "warm" | "cool" | "ink";
const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  warm: "bg-card-warm text-ink",
  cool: "bg-card-cool text-ink",
  ink: "bg-ink-panel text-on-ink on-ink",
};

export function SectionShell({
  children,
  tone = "paper",
  id,
  className,
  innerClassName,
  ariaLabel,
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  innerClassName?: string;
  ariaLabel?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} aria-labelledby={labelledBy} className={cn("section", toneClass[tone], className)}>
      <div className={cn("shell", innerClassName)}>{children}</div>
    </section>
  );
}
