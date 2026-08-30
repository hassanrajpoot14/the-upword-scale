import { buildOgImage } from "../../src/lib/og/buildOgImage";
import { OG_CONTENT_TYPE, OG_SIZE } from "../../src/lib/og/constants";

export const alt = "Contact The Upward Scale";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "edge";

export default function Image() {
  return buildOgImage({
    title: "Scope Your Next Launch",
    description:
      "Interactive project planner — pick a service lane, set a budget band, and receive a tailored roadmap within 24 hours.",
    eyebrow: "Contact",
    badge: "Book a strategy call",
  });
}
