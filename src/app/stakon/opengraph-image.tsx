import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "STAKON by JREW | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "STAKON", mark: "by JREW" });
}
