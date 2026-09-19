import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Start with the part. | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "Start with", mark: "the part." });
}
