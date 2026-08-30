import Link from "next/link";
import TechIconRow from "../ui/TechIconRow";
import { CORE_ECOSYSTEM } from "../../data/techIcons";

export default function BlogPostView({ post, relatedPosts }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 50%, transparent 100%)",
        }}
      />

      <article className="mx-auto max-w-3xl px-4 pt-24 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-emerald-600"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journal
        </Link>

        <header className="mt-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {post.category}
            </span>
            <span className="text-xs font-medium text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              {post.readTime}
            </span>
            {post.stack?.length ? (
              <>
                <span className="text-xs font-medium text-slate-400">•</span>
                <TechIconRow variant="icons" keys={post.stack} size="sm" />
              </>
            ) : null}
          </div>

          <h1 className="heading-gradient text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 border-y border-slate-100 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-600">
              {post.author.name[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold leading-none text-slate-900">
                {post.author.name}
              </p>
              <p className="mt-1 text-xs font-medium leading-none text-slate-500">
                {post.author.role}
              </p>
            </div>
            <time className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {post.date}
            </time>
          </div>
        </header>

        <div
          className="blog-content mt-10 min-h-[320px]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

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
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    {relatedPost.category}
                  </span>
                  {relatedPost.stack?.length ? (
                    <TechIconRow
                      variant="icons"
                      keys={relatedPost.stack.slice(0, 4)}
                      size="sm"
                    />
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400">
                      {relatedPost.readTime}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="mt-4 line-clamp-2 text-base font-bold text-slate-955 transition group-hover:text-emerald-600">
                    <Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">
                    {relatedPost.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[10px] font-bold text-slate-800">
                    {relatedPost.author.name}
                  </span>
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

        <div className="mx-auto mt-14 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
          <TechIconRow variant="strip" keys={CORE_ECOSYSTEM} size="sm" />
        </div>
      </section>
    </div>
  );
}
