import dynamic from "next/dynamic";
import PageShellSkeleton from "../../src/components/ui/PageShellSkeleton";
import { buildPageMetadata } from "../../src/lib/og/metadata";

const CaseStudiesClient = dynamic(
  () => import("../../src/components/sections/CaseStudiesClient"),
  { loading: () => <PageShellSkeleton /> }
);

export const metadata = buildPageMetadata({
  title: "Case Studies | The Upward Scale",
  description:
    "Explore real-world results from our SaaS agency projects — AI integrations, web architecture, SEO campaigns, brand strategy, and app engineering. Every metric is genuine.",
  path: "/case-studies",
});

/** Server page — interactive UI lives in CaseStudiesClient ('use client'). */
export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen w-full">
      <CaseStudiesClient />
    </main>
  );
}
