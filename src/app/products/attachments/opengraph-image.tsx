import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "India's widest attachment range | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "India's widest", mark: "attachment range" });
}
