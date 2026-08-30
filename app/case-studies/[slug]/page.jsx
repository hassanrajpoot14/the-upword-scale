import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "../../../src/data/caseStudiesData";
import { buildPageMetadata } from "../../../src/lib/og/metadata";
import PageShellSkeleton from "../../../src/components/ui/PageShellSkeleton";

const CaseStudyDetailClient = dynamic(
  () => import("../../../src/components/sections/CaseStudyDetailClient"),
  { loading: () => <PageShellSkeleton /> }
);

// ── Generate dynamic metadata per study ──────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);

  if (!study) {
    return {
      title: "Case Study Not Found | The Upward Scale",
      description: "The requested case study could not be found.",
    };
  }

  return buildPageMetadata({
    title: `${study.title} — ${study.client} | The Upward Scale`,
    description: study.tagline,
    path: `/case-studies/${slug}`,
    type: "article",
  });
}

// ── Pre-render all slugs at build time ────────────────────────────────────────
export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  // Related: same category first, then fill with others (exclude current)
  let related = CASE_STUDIES.filter(
    (s) => s.category === study.category && s.slug !== study.slug
  );
  if (related.length < 3) {
    const extras = CASE_STUDIES.filter(
      (s) => s.slug !== study.slug && !related.some((r) => r.slug === s.slug)
    );
    related = [...related, ...extras].slice(0, 3);
  } else {
    related = related.slice(0, 3);
  }

  return <CaseStudyDetailClient study={study} related={related} />;
}
