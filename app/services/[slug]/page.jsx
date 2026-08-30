import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "../../../src/data/serviceData";
import { buildPageMetadata } from "../../../src/lib/og/metadata";
import PageShellSkeleton from "../../../src/components/ui/PageShellSkeleton";

const ServicePageClient = dynamic(
  () => import("../../../src/components/sections/ServicePageClient"),
  { loading: () => <PageShellSkeleton /> }
);

// Generate metadata for each dynamic route
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return {
      title: "Service Not Found | The Upward Scale",
      description: "The requested service could not be found.",
    };
  }

  return buildPageMetadata({
    title: `${service.title} | The Upward Scale`,
    description: service.description,
    path: `/services/${slug}`,
  });
}

// Generate static params for optimal static pre-rendering
export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

// Main page component
export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  return <ServicePageClient service={service} />;
}
