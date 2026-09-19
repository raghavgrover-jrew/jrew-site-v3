// Server-rendered dotted map of northern India with the four operating units and Rajpura.
// Computed at module scope; zero client JavaScript.
import DottedMap from "dotted-map";
import { rajpura } from "@/data/facilities";

const REGION = { lat: { min: 6.5, max: 36 }, lng: { min: 68, max: 97.5 } };
const map = new DottedMap({ height: 70, grid: "diagonal", countries: ["IND"], region: REGION });
const svg = map.getSVG({ radius: 0.32, color: "#cfcbc3", shape: "circle", backgroundColor: "transparent" });
// Pins are drawn as an overlay at their true projected position (the dot grid snaps to cells about
// 44 km apart, which merged Mohali with Rajpura and the two Faridabad units).
const pct = (lat: number, lng: number) => ({ left: `${((lng - REGION.lng.min) / (REGION.lng.max - REGION.lng.min)) * 100}%`, top: `${((REGION.lat.max - lat) / (REGION.lat.max - REGION.lat.min)) * 100}%` });
const pins = [
  { label: "MOH 1, MOH 2 Mohali", lat: 30.7, lng: 76.69, tone: "ink" as const, side: "left" as const },
  { label: "FBD 1, FBD 2 Faridabad", lat: 28.43, lng: 77.32, tone: "ink" as const, side: "right" as const },
  { label: "Rajpura 2027", lat: rajpura.lat, lng: rajpura.lng, tone: "marigold" as const, side: "right" as const, lift: true },
];

export function IndiaMap() {
  return (
    <figure className="bg-card-cool p-4 sm:p-6">
      <div aria-hidden className="relative mx-auto max-w-[24rem]">
        <div className="[&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        {pins.map((p) => (
          <span key={p.label} className="absolute flex items-center gap-1.5" style={{ ...pct(p.lat, p.lng), transform: p.side === "left" ? "translate(-100%, -50%)" : "translate(0, -50%)", flexDirection: p.side === "left" ? "row-reverse" : "row" }}>
            <span className={p.tone === "marigold" ? "block size-3 border-2 border-marigold bg-marigold/30" : "block size-3 bg-ink"} />
            <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-2" style={"lift" in p && p.lift ? { transform: "translateY(-1.1rem)" } : undefined}>{p.label}</span>
          </span>
        ))}
      </div>
      <figcaption className="mt-3 text-[13px] text-ink-3">
        Four operating units in Mohali (Punjab) and Faridabad (Haryana); the Rajpura greenfield campus in marigold. Exports to North America, Europe and Asia since 2010.
      </figcaption>
    </figure>
  );
}
