"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, BookOpen, Mail } from "lucide-react";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../../data/blogData";
import ActionLink from "../ui/ActionLink";
import { accentCardClasses, accentCardLgClasses, AccentBar } from "../ui/AccentCard";
import LiveSystemStatus from "../visuals/LiveSystemStatus";
import { SPRING } from "../motion/springs";
import TechIconRow from "../ui/TechIconRow";
import { CORE_ECOSYSTEM } from "../../data/techIcons";

const ACCENT = {
  emerald: {
    gradient: "from-emerald-500/25 via-slate-900 to-slate-950",
    glow: "bg-emerald-400/30",
    chip: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  },
  sky: {
    gradient: "from-sky-500/25 via-slate-900 to-slate-950",
    glow: "bg-sky-400/30",
    chip: "border-sky-400/30 bg-sky-500/10 text-sky-300",
  },
  teal: {
    gradient: "from-teal-500/25 via-slate-900 to-slate-950",
    glow: "bg-teal-400/30",
    chip: "border-teal-400/30 bg-teal-500/10 text-teal-300",
  },
  violet: {
    gradient: "from-violet-500/25 via-slate-900 to-slate-950",
    glow: "bg-violet-400/30",
    chip: "border-violet-400/30 bg-violet-500/10 text-violet-300",
  },
};

function AuthorPill({ author, tone = "light" }) {
  const light = tone === "light";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 ${
        light
          ? "border-slate-200/80 bg-white/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
          : "border-white/15 bg-white/10 text-slate-100"
      }`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
          light
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            : "bg-emerald-500/20 text-emerald-300"
        }`}
      >
        {author.initials || author.name.slice(0, 2).toUpperCase()}
      </span>
      <span className="pr-1 text-xs font-semibold">{author.name}</span>
    </span>
  );
}

function PostGraphic({ post, className = "" }) {
  const accent = ACCENT[post.accent] || ACCENT.emerald;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-950 ${className}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent.gradient}`}
      />
      <div
        aria-hidden
        className={`absolute -right-8 -top-8 h-40 w-40 rounded-full ${accent.glow} blur-3xl`}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between p-5 sm:min-h-[220px] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span
            className={`inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${accent.chip}`}
          >
            {post.category}
          </span>
          {post.stack?.length ? (
            <TechIconRow
              variant="icons"
              keys={post.stack}
              size="sm"
              className="rounded-full border border-white/10 bg-black/25 px-2 py-1 backdrop-blur-sm"
            />
          ) : null}
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            journal · preview
          </p>
          <p className="mt-2 line-clamp-2 font-display text-lg font-extrabold tracking-tight text-white sm:text-xl">
            {post.title}
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryFilters({ active, onChange }) {
  return (
    <div className="sticky top-20 z-30 -mx-4 border-y border-slate-200/70 bg-[#F8FAFC]/85 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter articles by category"
      >
        {BLOG_CATEGORIES.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(category)}
              className={`relative inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                isActive
                  ? "text-white"
                  : "border border-slate-200/80 bg-white/80 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="blog-filter-pill"
                  className="absolute inset-0 rounded-full bg-slate-900 shadow-md dark:bg-emerald-600"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              ) : null}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <motion.article
      layout
      layoutId={`blog-card-${post.slug}`}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={SPRING.reveal}
      className={`${accentCardClasses} flex h-full flex-col`}
    >
      <AccentBar />
      <div className="relative z-10 flex h-full flex-col">
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-105">
          <PostGraphic post={post} className="rounded-none rounded-t-2xl" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          {post.stack?.length ? (
            <TechIconRow variant="icons" keys={post.stack.slice(0, 4)} size="sm" />
          ) : null}
        </div>

        <h3 className="mt-3 font-display text-lg font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(post.tags || []).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-slate-200/80 bg-slate-50/80 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200/70 pt-4 dark:border-slate-800">
          <AuthorPill author={post.author} />
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-slate-100 dark:group-hover:text-emerald-400">
            Read
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </div>

      <Link
        href={`/blogs/${post.slug}`}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={`Read article: ${post.title}`}
      />
      </div>
    </motion.article>
  );
}

function FeaturedHero({ post }) {
  if (!post) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING.reveal}
      className={`${accentCardLgClasses} shadow-xl shadow-slate-900/5 dark:shadow-black/20`}
    >
      <AccentBar />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
              <BookOpen className="h-3 w-3" />
              Featured
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
            {post.stack?.length ? (
              <TechIconRow variant="icons" keys={post.stack} size="sm" />
            ) : null}
          </div>

          <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AuthorPill author={post.author} />
            <time className="text-xs font-medium text-slate-500" dateTime={post.date}>
              {post.date}
            </time>
          </div>

          <div className="mt-8">
            <ActionLink
              href={`/blogs/${post.slug}`}
              magnetic
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Read featured article
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </ActionLink>
          </div>
        </div>

        <div className="relative min-h-[260px] overflow-hidden p-4 sm:p-6 lg:min-h-full lg:p-8">
          <div className="h-full overflow-hidden rounded-2xl transition-transform duration-500 ease-out hover:scale-[1.02]">
            <PostGraphic post={post} className="h-full min-h-[240px] lg:min-h-[360px]" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setStatus("done");
    setEmail("");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={SPRING.reveal}
      className="relative col-span-1 overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/90 via-white/80 to-teal-50/70 p-6 shadow-lg shadow-emerald-900/5 backdrop-blur-md dark:border-emerald-900/40 dark:from-emerald-950/50 dark:via-slate-900/80 dark:to-slate-950 md:col-span-2 lg:col-span-3"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/25 blur-3xl"
      />
      <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600">
            Engineering brief
          </p>
          <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Subscribe to shipping notes
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Performance patterns, App Router tactics, and DevOps playbooks —
            one concise drop when we publish.
          </p>
          <TechIconRow
            variant="icons"
            keys={CORE_ECOSYSTEM}
            size="sm"
            className="mt-4"
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 sm:flex-row lg:col-span-7"
        >
          <label className="sr-only" htmlFor="blog-newsletter-email">
            Email address
          </label>
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="blog-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "done") setStatus("idle");
              }}
              placeholder="you@company.com"
              className="w-full rounded-full border border-slate-200 bg-white/90 py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none ring-emerald-500/20 transition focus:border-emerald-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.45)] transition hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.55)]"
          >
            {status === "done" ? "You're on the list" : "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default function BlogsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featured = BLOG_POSTS[0];

  const filteredPosts = useMemo(() => {
    const rest = BLOG_POSTS.filter((p) => p.slug !== featured?.slug);
    if (selectedCategory === "All") return rest;
    return rest.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, featured?.slug]);

  const showFeatured =
    selectedCategory === "All" || featured?.category === selectedCategory;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] max-w-full rounded-full bg-emerald-100/30 blur-[120px] dark:bg-emerald-900/20" />
        <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] max-w-full rounded-full bg-teal-50/40 blur-[100px] dark:bg-teal-900/15" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <LiveSystemStatus
            tone="light"
            label="Journal systems · publishing live"
            className="mb-4 justify-center"
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
            Tech publication
          </p>
          <h1 className="heading-gradient mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            The Upward Scale Journal
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Architecture notes, Next.js patterns, DevOps playbooks, and
            performance deep-dives for teams shipping at velocity.
          </p>
          <TechIconRow
            variant="strip"
            keys={CORE_ECOSYSTEM}
            size="md"
            className="mt-8 justify-center"
          />
        </div>

        <div className="mt-12">
          {showFeatured ? <FeaturedHero post={featured} /> : null}
        </div>

        <div className="mt-10">
          <CategoryFilters
            active={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SPRING.snappy}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </AnimatePresence>

            {filteredPosts.length === 0 && !showFeatured ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center"
              >
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  No articles in this lane yet
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try another category — we publish across architecture,
                  Next.js, DevOps, and performance.
                </p>
              </motion.div>
            ) : null}

            <NewsletterCard />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
