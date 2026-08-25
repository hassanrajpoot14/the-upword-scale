import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "../../../src/data/blogData";

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | The Upward Scale Journal",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${post.title} | The Upward Scale Journal`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | The Upward Scale Journal`,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
    },
  };
}

// Generate static paths at build-time for optimal static page generation (SSG)
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related Posts Logic
  // First, find posts in the same category (excluding current)
  let relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  );

  // If we have fewer than 3, fill up using other posts (preventing duplicates)
  if (relatedPosts.length < 3) {
    const extraPosts = BLOG_POSTS.filter(
      (p) => p.slug !== post.slug && !relatedPosts.some((r) => r.slug === p.slug)
    );
    relatedPosts = [...relatedPosts, ...extraPosts].slice(0, 3);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Decorative tech grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 50%, transparent 100%)",
        }}
      />

      <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journal
        </Link>

        {/* Article Meta Header */}
        <header className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {post.category}
            </span>
            <span className="text-xs font-medium text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">{post.readTime}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-955 sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 border-y border-slate-100 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 font-bold text-emerald-600 text-sm">
              {post.author.name[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900 leading-none">{post.author.name}</p>
              <p className="mt-1 text-xs text-slate-500 font-medium leading-none">{post.author.role}</p>
            </div>
            <time className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {post.date}
            </time>
          </div>
        </header>

        {/* Main Article Body (Rendered with Custom Typography Styles) */}
        <div 
          className="blog-content mt-10" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>

      {/* Related Posts Section */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Related Articles
            </h2>
            <p className="text-sm text-slate-500">
              Expand your knowledge with further recommendations from our architects.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.slug}
                className="group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    {relatedPost.category}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {relatedPost.readTime}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="mt-4 text-base font-bold text-slate-955 transition group-hover:text-emerald-600 line-clamp-2">
                    <Link href={`/blogs/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">
                    {relatedPost.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-800">{relatedPost.author.name}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    {relatedPost.date}
                  </span>
                </div>

                <Link
                  href={`/blogs/${relatedPost.slug}`}
                  className="absolute inset-0 z-10 rounded-3xl"
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
