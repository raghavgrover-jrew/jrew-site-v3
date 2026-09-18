// Server-rendered dotted map of northern India with the four operating units and Rajpura.
// Computed at module scope; zero client JavaScript.
import DottedMap from "dotted-map";
import { facilities, rajpura } from "@/data/facilities";

const map = new DottedMap({ height: 70, grid: "diagonal", region: { lat: { min: 8, max: 36 }, lng: { min: 68, max: 97 } } });
const seen = new Set<string>();
for (const f of facilities) {
  const key = `${f.lat},${f.lng}`;
  if (seen.has(key)) continue;
  seen.add(key);
  map.addPin({ lat: f.lat, lng: f.lng, svgOptions: { color: "#1a1a1a", radius: 0.9 } });
}
map.addPin({ lat: rajpura.lat, lng: rajpura.lng, svgOptions: { color: "#fbba2d", radius: 0.9 } });
const svg = map.getSVG({ radius: 0.32, color: "#cfcbc3", shape: "circle", backgroundColor: "transparent" });

export function IndiaMap() {
  return (
    <figure className="bg-card-cool p-4 sm:p-6">
      <div aria-hidden className="mx-auto max-w-[28rem] [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption className="mt-3 text-[13px] text-ink-3">
        Four operating units in Mohali (Punjab) and Faridabad (Haryana), marked in black; the Rajpura greenfield campus, marked in marigold. Exports to North America, Europe and Asia since 2010.
      </figcaption>
    </figure>
  );
}
