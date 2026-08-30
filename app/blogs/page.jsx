import dynamic from "next/dynamic";
import PageShellSkeleton from "../../src/components/ui/PageShellSkeleton";
import { buildPageMetadata } from "../../src/lib/og/metadata";

const BlogsPageClient = dynamic(
  () => import("../../src/components/sections/BlogsPageClient"),
  { loading: () => <PageShellSkeleton withHero={false} /> }
);

export const metadata = buildPageMetadata({
  title: "Journal | The Upward Scale",
  description:
    "Architecture notes, Next.js patterns, DevOps playbooks, and performance deep-dives from The Upward Scale Journal.",
  path: "/blogs",
});

export default function BlogsPage() {
  return <BlogsPageClient />;
}
