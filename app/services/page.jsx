import dynamic from "next/dynamic";
import PageShellSkeleton from "../../src/components/ui/PageShellSkeleton";
import { buildPageMetadata } from "../../src/lib/og/metadata";

const ServicesPageClient = dynamic(
  () => import("../../src/components/sections/ServicesPageClient"),
  { loading: () => <PageShellSkeleton /> }
);

export const metadata = buildPageMetadata({
  title: "Services | The Upward Scale",
  description:
    "Nine core disciplines spanning web architecture, AI optimization, SEO, apps, DevOps, and brand strategy — one compounding growth ecosystem.",
  path: "/services",
});

/** Server page — interactive UI lives in ServicesPageClient ('use client'). */
export default function ServicesPage() {
  return (
    <main className="min-h-screen w-full">
      <ServicesPageClient />
    </main>
  );
}
