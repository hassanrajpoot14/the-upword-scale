import { buildOgImage } from "../../src/lib/og/buildOgImage";
import { OG_CONTENT_TYPE, OG_SIZE } from "../../src/lib/og/constants";

export const alt = "About The Upward Scale";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "edge";

export default function Image() {
  return buildOgImage({
    title: "Architects of High-Performance Digital Systems",
    description:
      "Meet the systems architects, optimization engineers, and growth strategists behind The Upward Scale.",
    eyebrow: "About",
    badge: "Performance-first philosophy",
  });
}
