import { buildOgImage } from "../../src/lib/og/buildOgImage";
import { OG_CONTENT_TYPE, OG_SIZE } from "../../src/lib/og/constants";

export const alt = "The Upward Scale Journal";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "edge";

export default function Image() {
  return buildOgImage({
    title: "Engineering & Growth Journal",
    description:
      "Performance guidelines, Core Web Vitals strategies, and scaling blueprints from our architects.",
    eyebrow: "Journal",
    badge: "Technical insights",
  });
}
