import { buildOgImage } from "../src/lib/og/buildOgImage";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE } from "../src/lib/og/constants";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "edge";

export default function Image() {
  return buildOgImage({
    title: "Elite Digital Growth Systems",
    description:
      "High-performance architectures, premium interfaces, and compounding growth systems for ambitious brands.",
    badge: "99+ Lighthouse · Sub-second LCP",
  });
}
