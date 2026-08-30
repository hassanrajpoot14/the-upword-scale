import { buildOgImage } from "../../src/lib/og/buildOgImage";
import { OG_CONTENT_TYPE, OG_SIZE } from "../../src/lib/og/constants";

export const alt = "Services | The Upward Scale";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "edge";

export default function Image() {
  return buildOgImage({
    title: "Nine Core Disciplines. One Growth Ecosystem.",
    description:
      "Web architecture, AI optimization, SEO, apps, DevOps, and brand strategy — unified for compounding velocity.",
    eyebrow: "Services",
    badge: "Production-ready stack",
  });
}
