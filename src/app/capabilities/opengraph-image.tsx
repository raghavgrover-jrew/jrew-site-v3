import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Every stage engineered for repeatability | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "Every stage engineered", mark: "for repeatability" });
}
