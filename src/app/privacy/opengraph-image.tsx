import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Privacy notice | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "Privacy", mark: "notice" });
}
