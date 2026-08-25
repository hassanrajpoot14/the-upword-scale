import CaseStudiesClient from "../../src/components/sections/CaseStudiesClient";

export const metadata = {
  title: "Case Studies | The Upward Scale",
  description:
    "Explore real-world results from our SaaS agency projects — AI integrations, web architecture, SEO campaigns, brand strategy, and app engineering. Every metric is genuine.",
  openGraph: {
    title: "Case Studies | The Upward Scale",
    description:
      "Proven results across AI integration, web architecture, SEO, brand strategy, and app development.",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
