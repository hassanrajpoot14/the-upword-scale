import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../../../src/data/blogData";
import { buildOgImage } from "../../../src/lib/og/buildOgImage";
import { OG_CONTENT_TYPE, OG_SIZE } from "../../../src/lib/og/constants";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return buildOgImage({
    title: post.title,
    description: post.excerpt,
    eyebrow: post.category,
    badge: post.readTime,
  });
}

export const alt = "Article preview";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
