import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Built by people. Ready for tomorrow. | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "Built by people.", mark: "Ready for tomorrow." });
}
