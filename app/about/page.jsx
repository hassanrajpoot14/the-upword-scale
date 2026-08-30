import dynamic from "next/dynamic";
import { buildPageMetadata } from "../../src/lib/og/metadata";
import PageShellSkeleton from "../../src/components/ui/PageShellSkeleton";

const AboutPageClient = dynamic(
  () => import("../../src/components/sections/AboutPageClient"),
  { loading: () => <PageShellSkeleton /> }
);

export const metadata = buildPageMetadata({
  title: "About Us | The Upward Scale",
  description:
    "Meet the systems architects, optimization engineers, and growth strategists behind The Upward Scale — elite digital growth systems for ambitious brands.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
