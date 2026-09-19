import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Quality is engineered in, not inspected afterwards | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "Quality is engineered in,", mark: "not inspected afterwards" });
}
