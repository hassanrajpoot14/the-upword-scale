import { buildOgImage } from "../../src/lib/og/buildOgImage";
import { OG_CONTENT_TYPE, OG_SIZE } from "../../src/lib/og/constants";

export const alt = "Case Studies | The Upward Scale";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "edge";

export default function Image() {
  return buildOgImage({
    title: "Proven Results at Scale",
    description:
      "Real metrics from AI integrations, web architecture, SEO, brand strategy, and app engineering engagements.",
    eyebrow: "Case Studies",
    badge: "Measured outcomes · No vanity metrics",
  });
}
