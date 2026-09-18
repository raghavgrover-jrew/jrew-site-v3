import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onInk" | "onInkSecondary";

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-3 font-sans text-[15px] font-semibold tracking-[0.01em] transition-[background-color,color,border-color,transform] duration-200 ease-out-expo active:translate-y-px whitespace-nowrap";
const variants: Record<Variant, string> = {
  primary: "bg-ink text-on-ink hover:bg-ink-panel-2",
  secondary: "border border-ink text-ink hover:bg-card-warm",
  ghost: "text-ink underline underline-offset-4 decoration-marigold decoration-2 hover:decoration-ink px-0",
  onInk: "bg-marigold text-ink hover:bg-marigold-deep",
  onInkSecondary: "border border-on-ink-3 text-on-ink hover:border-on-ink hover:bg-ink-panel-2",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
  external,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  external?: boolean;
}) {
  const cls = cn(base, variants[variant], disabled && "cursor-not-allowed opacity-60", className);
  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
