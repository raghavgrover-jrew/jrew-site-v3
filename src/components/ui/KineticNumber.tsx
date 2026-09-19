// Stat value for the snapshot band. The exact approved figure is rendered in server HTML and
// never changes: no count-up, no scroll scrub, so a visitor can never read a false number at
// any scroll position, zoom level or motion preference (Codex audit, P0-1). Server component.

function format(value: number, decimals = 0) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function KineticNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <span className={className} data-stat-value={`${prefix}${format(value, decimals)}${suffix}`}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
