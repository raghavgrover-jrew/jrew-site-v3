// Shared Open Graph image renderer (1200x630). Each route's opengraph-image.tsx calls
// `ogImage({ lead, mark })` so social cards carry the page's own two-tone headline in the
// brochure's display face. Poppins 800 is fetched at build time; if that fetch fails the
// card still renders in the fallback sans-serif rather than failing the build.
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

let poppins: ArrayBuffer | null | undefined;

async function loadPoppins(): Promise<ArrayBuffer | null> {
  if (poppins !== undefined) return poppins ?? null;
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0" },
    }).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+\.(?:ttf|woff))\)/)?.[1];
    if (!url) throw new Error("no font url");
    poppins = await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    poppins = null;
  }
  return poppins ?? null;
}

// The wordmark's three paths (from public/brand/jrew-logo-on-ink.svg would be ideal, but satori needs
// inline SVG); the J is marigold, the rest paper. Simplified geometry for the card only.
function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, fontSize: 56, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
          <span style={{ color: "#fbba2d" }}>J</span>
          <span style={{ color: "#f7f5f1" }}>REW</span>
        </div>
        <div style={{ height: 6, width: 148, background: "#fbba2d" }} />
      </div>
    </div>
  );
}

export async function ogImage({ lead, mark, strap = "Engineering-led manufacturing since 1973" }: { lead: string; mark: string; strap?: string }) {
  const font = await loadPoppins();
  const fonts = font ? [{ name: "Poppins", data: font, weight: 800 as const, style: "normal" as const }] : [];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#1a1a1a", color: "#f7f5f1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: font ? "Poppins" : "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Wordmark />
          <span style={{ fontSize: 22, letterSpacing: 4, color: "#c9c5bc" }}>JREW.CO.IN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: mark.length + lead.length > 42 ? 68 : 84, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2, textTransform: "uppercase" }}>
          <span>{lead}</span>
          <span style={{ color: "#fbba2d" }}>{mark}</span>
        </div>
        <div style={{ fontSize: 22, letterSpacing: 5, color: "#fbba2d", textTransform: "uppercase" }}>{strap}</div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
