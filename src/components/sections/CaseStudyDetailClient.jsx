"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Quote,
  Tag,
  BarChart3,
  Lightbulb,
  Swords,
} from "lucide-react";

// ─── Accent colour utilities ──────────────────────────────────────────────────
const ACCENT = {
  emerald: {
    heroBg: "from-emerald-50 to-teal-50",
    heroText: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    statValue: "text-emerald-600",
    btn: "bg-emerald-600 hover:bg-emerald-500",
    tag: "bg-emerald-50 text-emerald-700",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    gradientBar: "from-emerald-400 to-teal-400",
  },
  violet: {
    heroBg: "from-violet-50 to-purple-50",
    heroText: "text-violet-600",
    badge: "bg-violet-50 text-violet-700 border-violet-100",
    statValue: "text-violet-600",
    btn: "bg-violet-600 hover:bg-violet-500",
    tag: "bg-violet-50 text-violet-700",
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    gradientBar: "from-violet-400 to-purple-400",
  },
  sky: {
    heroBg: "from-sky-50 to-blue-50",
    heroText: "text-sky-600",
    badge: "bg-sky-50 text-sky-700 border-sky-100",
    statValue: "text-sky-600",
    btn: "bg-sky-600 hover:bg-sky-500",
    tag: "bg-sky-50 text-sky-700",
    iconBg: "bg-sky-50",
    iconText: "text-sky-600",
    gradientBar: "from-sky-400 to-blue-400",
  },
  rose: {
    heroBg: "from-rose-50 to-pink-50",
    heroText: "text-rose-600",
    badge: "bg-rose-50 text-rose-700 border-rose-100",
    statValue: "text-rose-600",
    btn: "bg-rose-600 hover:bg-rose-500",
    tag: "bg-rose-50 text-rose-700",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
    gradientBar: "from-rose-400 to-pink-400",
  },
  amber: {
    heroBg: "from-amber-50 to-orange-50",
    heroText: "text-amber-600",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    statValue: "text-amber-600",
    btn: "bg-amber-600 hover:bg-amber-500",
    tag: "bg-amber-50 text-amber-700",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    gradientBar: "from-amber-400 to-orange-400",
  },
};

// ─── Motion variants ──────────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function CaseStudyDetailClient({ study, related }) {
  const accent = ACCENT[study.accentColor ?? "emerald"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <main className="mx-auto max-w-5xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-16"
        >
          {/* ── Back link ── */}
          <motion.div variants={item}>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-slate-905"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          </motion.div>

          {/* ── Hero ── */}
          <motion.section variants={item} className="flex flex-col gap-6">
            {/* Gradient accent bar */}
            <div
              className={`h-1 w-16 rounded-full bg-gradient-to-r ${accent.gradientBar}`}
            />

            {/* Category + client */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${accent.badge}`}
              >
                <Tag className="h-3 w-3" />
                {study.category}
              </span>
              <span className="text-sm font-semibold text-slate-400">{study.client}</span>
            </div>

            {/* Main title */}
            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-905 sm:text-5xl">
              {study.title}
            </h1>

            {/* Tagline */}
            <p className={`max-w-2xl text-base font-medium sm:text-lg ${accent.heroText}`}>
              {study.tagline}
            </p>

            {study.imageUrl && (
              <div className="relative mt-2 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                <Image
                  src={study.imageUrl}
                  alt={study.imageAlt || study.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${accent.tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.section>

          {/* ── Results metrics strip ── */}
          <motion.section
            variants={item}
            className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10"
          >
            <div className="mb-8 flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent.iconBg}`}>
                <BarChart3 className={`h-4 w-4 ${accent.iconText}`} />
              </div>
              <h2 className="text-base font-bold uppercase tracking-wider text-slate-700">
                Key Results
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {study.results.map((r, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center rounded-xl border border-slate-100 bg-slate-50/50 p-5 text-center"
                >
                  <span
                    className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${accent.statValue}`}
                  >
                    {r.value}
                  </span>
                  <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Challenge + Solution ── */}
          <motion.section
            variants={item}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {/* Challenge */}
            <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent.iconBg}`}>
                  <Swords className={`h-4 w-4 ${accent.iconText}`} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  The Challenge
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{study.challenge}</p>
            </div>

            {/* Solution */}
            <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent.iconBg}`}>
                  <Lightbulb className={`h-4 w-4 ${accent.iconText}`} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Our Solution
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{study.solution}</p>
            </div>
          </motion.section>

          {/* ── Deliverables checklist ── */}
          <motion.section
            variants={item}
            className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10"
          >
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-700">
              What We Delivered
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {study.tags.map((tag) => (
                <li key={tag} className="flex items-center gap-3">
                  <CheckCircle2 className={`h-5 w-5 shrink-0 ${accent.iconText}`} />
                  <span className="text-sm font-medium text-slate-700">{tag}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* ── Testimonial ── */}
          {study.testimonial && (
            <motion.section
              variants={item}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${accent.heroBg} border border-slate-100 p-10 sm:p-14`}
            >
              <Quote
                className={`absolute right-8 top-8 h-14 w-14 opacity-10 ${accent.heroText}`}
              />
              <blockquote className="flex flex-col gap-6">
                <p className="relative text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-white ${accent.btn}`}
                  >
                    {study.testimonial.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {study.testimonial.author}
                    </p>
                    <p className="text-xs font-medium text-slate-505">
                      {study.testimonial.role}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </motion.section>
          )}

          {/* ── CTA ── */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm sm:p-14"
          >
            <p className={`text-xs font-bold uppercase tracking-widest ${accent.heroText}`}>
              Want results like these?
            </p>
            <h2 className="max-w-md text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Let&rsquo;s discuss your project.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate-505">
              Every case study above started with a single free strategy call. Yours is next.
            </p>
            <Link
              href="/contact"
              className={`mt-2 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg ${accent.btn}`}
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Related case studies ── */}
        {related.length > 0 && (
          <section className="mt-28">
            <div className="mb-10 flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                More Case Studies
              </h2>
              <p className="text-sm text-slate-500">
                Explore other projects we&rsquo;ve delivered.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => {
                const ra = ACCENT[s.accentColor ?? "emerald"];
                return (
                  <article
                    key={s.slug}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div
                      className={`h-1 w-full bg-gradient-to-r ${ra.gradientBar}`}
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <span
                        className={`inline-flex self-start rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ra.badge}`}
                      >
                        {s.category}
                      </span>
                      <h3 className="mt-4 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-slate-700 line-clamp-2">
                        {s.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-505">
                        {s.challenge}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 mt-5">
                        <span className="text-xs font-semibold text-slate-400">{s.client}</span>
                        <ArrowUpRight className={`h-4 w-4 ${ra.iconText}`} />
                      </div>
                    </div>
                    <Link
                      href={`/case-studies/${s.slug}`}
                      className="absolute inset-0 z-10 rounded-3xl"
                      aria-label={`View case study: ${s.title}`}
                    />
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
