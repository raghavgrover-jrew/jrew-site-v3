import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "A single partner, from engineering to supply chain | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "A single partner,", mark: "from engineering to supply chain" });
}
