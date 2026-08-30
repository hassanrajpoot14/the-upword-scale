import { notFound } from "next/navigation";
import { CASE_STUDIES } from "../../../src/data/caseStudiesData";
import { buildOgImage } from "../../../src/lib/og/buildOgImage";
import { OG_CONTENT_TYPE, OG_SIZE } from "../../../src/lib/og/constants";

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  const metric = study.results?.[0];
  const badge = metric ? `${metric.value} ${metric.label}` : study.category;

  return buildOgImage({
    title: study.title,
    description: `${study.client} — ${study.tagline}`,
    eyebrow: "Case Study",
    badge,
  });
}

export const alt = "Case study preview";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
