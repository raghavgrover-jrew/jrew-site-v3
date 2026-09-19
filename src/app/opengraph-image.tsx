import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "JREW Engineering: precision engineering for tomorrow's machinery. Since 1973.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "Precision engineering for", mark: "tomorrow's machinery" });
}
