import { ImageResponse } from "next/og";

export const alt = "JREW Engineering: precision engineering for tomorrow's machinery. Since 1973.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#1a1a1a", color: "#f7f5f1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, letterSpacing: 4, color: "#c9c5bc" }}>
          <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: 0, color: "#f7f5f1" }}>
            <span style={{ color: "#fbba2d" }}>J</span>REW
          </span>
          <span>JREW.CO.IN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, textTransform: "uppercase" }}>
          <span style={{ color: "#fbba2d" }}>Precision</span>
          <span>Engineering for</span>
          <span>tomorrow&apos;s machinery</span>
        </div>
        <div style={{ fontSize: 24, letterSpacing: 6, color: "#fbba2d" }}>ENGINEERING-LED MANUFACTURING · SINCE 1973</div>
      </div>
    ),
    size,
  );
}
