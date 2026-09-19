import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Six families, one source. | JREW Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lead: "Six families,", mark: "one source." });
}
