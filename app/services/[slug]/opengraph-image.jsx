import { notFound } from "next/navigation";
import { SERVICES_DATA } from "../../../src/data/serviceData";
import { buildOgImage } from "../../../src/lib/og/buildOgImage";
import { OG_CONTENT_TYPE, OG_SIZE } from "../../../src/lib/og/constants";

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) notFound();

  return buildOgImage({
    title: service.title,
    description: service.description,
    eyebrow: "Service",
    badge: "Production Ready",
  });
}

export const alt = "Service preview";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
