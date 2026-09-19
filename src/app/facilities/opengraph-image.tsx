import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Four units. Two states. One greenfield rising. | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "Four units. Two states.", mark: "One greenfield rising." });
}
