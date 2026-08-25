import BlogsPageClient from "../../src/components/sections/BlogsPageClient";

export const metadata = {
  title: "Journal | The Upward Scale",
  description:
    "Engineering strategies, performance guidelines, and growth blueprints from The Upward Scale Journal.",
  openGraph: {
    title: "Journal | The Upward Scale",
    description:
      "Engineering strategies, performance guidelines, and growth blueprints for ambitious brands.",
    type: "website",
  },
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}
