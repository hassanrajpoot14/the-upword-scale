import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../../../src/data/blogData";
import { buildPageMetadata } from "../../../src/lib/og/metadata";
import BlogPostSkeleton from "../../../src/components/ui/BlogPostSkeleton";

const BlogPostView = dynamic(
  () => import("../../../src/components/sections/BlogPostView"),
  { loading: () => <BlogPostSkeleton /> }
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | The Upward Scale Journal",
      description: "The requested article could not be found.",
    };
  }

  return buildPageMetadata({
    title: `${post.title} | The Upward Scale Journal`,
    description: post.excerpt,
    path: `/blogs/${slug}`,
    type: "article",
    publishedTime: new Date(post.date).toISOString(),
    authors: [post.author.name],
  });
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  let relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  );

  if (relatedPosts.length < 3) {
    const extraPosts = BLOG_POSTS.filter(
      (p) => p.slug !== post.slug && !relatedPosts.some((r) => r.slug === p.slug)
    );
    relatedPosts = [...relatedPosts, ...extraPosts].slice(0, 3);
  }

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
