"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, TrendingUp, Zap, Search, Palette, Smartphone } from "lucide-react";
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
} from "../../data/caseStudiesData";

// ─── Category icon map ───────────────────────────────────────────────────────
const CATEGORY_ICONS = {
  All: <Zap className="h-3.5 w-3.5" />,
  "AI Integration": <Zap className="h-3.5 w-3.5" />,
  "Web Architecture": <TrendingUp className="h-3.5 w-3.5" />,
  SEO: <Search className="h-3.5 w-3.5" />,
  "Brand Strategy": <Palette className="h-3.5 w-3.5" />,
  "App Development": <Smartphone className="h-3.5 w-3.5" />,
};

// ─── Accent colour map (category → Tailwind colour strings) ──────────────────
const ACCENT_MAP = {
  emerald: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    ring: "hover:border-emerald-300",
    glow: "hover:shadow-emerald-100",
    text: "text-emerald-600",
  },
  violet: {
    badge: "bg-violet-50 text-violet-700 border-violet-100",
    ring: "hover:border-violet-300",
    glow: "hover:shadow-violet-100",
    text: "text-violet-600",
  },
  sky: {
    badge: "bg-sky-50 text-sky-700 border-sky-100",
    ring: "hover:border-sky-300",
    glow: "hover:shadow-sky-100",
    text: "text-sky-600",
  },
  rose: {
    badge: "bg-rose-50 text-rose-700 border-rose-100",
    ring: "hover:border-rose-300",
    glow: "hover:shadow-rose-100",
    text: "text-rose-600",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    ring: "hover:border-amber-300",
    glow: "hover:shadow-amber-100",
    text: "text-amber-600",
  },
};

// ─── Motion variants ──────────────────────────────────────────────────────────
const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: -12,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function CategoryPill({
  label,
  isActive,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
        isActive
          ? "bg-slate-900 text-white shadow-md"
          : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      }`}
      aria-pressed={isActive}
    >
      {isActive && (
        <motion.span
          layoutId="category-pill-bg"
          className="absolute inset-0 rounded-full bg-slate-900"
          transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        {CATEGORY_ICONS[label]}
        {label}
      </span>
    </button>
  );
}

function ResultBadge({ value, label }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-slate-100 bg-white/80 px-3 py-2.5 text-center shadow-sm">
      <span className="text-lg font-extrabold tracking-tight text-slate-900">{value}</span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-505">
        {label}
      </span>
    </div>
  );
}

function CaseStudyCard({ study }) {
  const accent = ACCENT_MAP[study.accentColor] ?? ACCENT_MAP.emerald;

  return (
    <motion.article
      variants={cardVariants}
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 ${accent.ring} hover:shadow-2xl ${accent.glow}`}
    >
      {/* Top accent bar */}
      <div
        className={`h-1 w-full ${
          study.accentColor === "emerald"
            ? "bg-gradient-to-r from-emerald-400 to-teal-400"
            : study.accentColor === "violet"
            ? "bg-gradient-to-r from-violet-400 to-purple-400"
            : study.accentColor === "sky"
            ? "bg-gradient-to-r from-sky-400 to-blue-400"
            : study.accentColor === "rose"
            ? "bg-gradient-to-r from-rose-400 to-pink-400"
            : "bg-gradient-to-r from-amber-400 to-orange-400"
        }`}
      />

      {study.imageUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <Image
            src={study.imageUrl}
            alt={study.imageAlt || study.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        {/* Header: category tag + client */}
        <div className="flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${accent.badge}`}
          >
            {CATEGORY_ICONS[study.category]}
            {study.category}
          </span>
          <span className="text-xs font-semibold text-slate-400">{study.client}</span>
        </div>

        {/* Title */}
        <h2
          className={`mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:${accent.text} sm:text-2xl`}
        >
          {study.title}
        </h2>

        {/* Challenge */}
        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Challenge
          </p>
          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {study.challenge}
          </p>
        </div>

        {/* Results grid — show first 2 on smaller cards */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          {study.results.slice(0, 4).map((r, i) => (
            <ResultBadge key={i} value={r.value} label={r.label} />
          ))}
        </div>

        {/* Tags row */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {study.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-505"
            >
              {tag}
            </span>
          ))}
          {study.tags.length > 3 && (
            <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-400">
              +{study.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          <span className="text-xs font-semibold text-slate-400">View Full Case Study</span>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:scale-110 ${
              study.accentColor === "emerald"
                ? "group-hover:bg-emerald-600"
                : study.accentColor === "violet"
                ? "group-hover:bg-violet-600"
                : study.accentColor === "sky"
                ? "group-hover:bg-sky-600"
                : study.accentColor === "rose"
                ? "group-hover:bg-rose-600"
                : "group-hover:bg-amber-600"
            } group-hover:text-white`}
          >
            <ArrowUpRight className="h-4 w-4 text-slate-600 transition-colors duration-300 group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Full-card link overlay */}
      <Link
        href={`/case-studies/${study.slug}`}
        className="absolute inset-0 z-10 rounded-3xl"
        aria-label={`View case study: ${study.title}`}
      />
    </motion.article>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export default function CaseStudiesClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.category === activeCategory);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-emerald-100/25 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-violet-100/20 blur-[120px]" />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
        {/* ── Hero section ── */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Proven Impact
          </motion.div>

          {/* Primary heading */}
          <motion.h1
            variants={heroItem}
            className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
          >
            Results That{" "}
            <span className="bg-gradient-to-r from-emerald-505 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Speak
            </span>
            .
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-505 sm:text-lg"
          >
            A curated selection of transformative projects. Every metric is real.
            Every challenge was genuinely complex. Every solution was built to last.
          </motion.p>

          {/* Stat strip */}
          <motion.div
            variants={heroItem}
            className="mt-12 grid grid-cols-3 gap-6 rounded-2xl border border-slate-100 bg-white/70 px-8 py-6 shadow-sm backdrop-blur-sm sm:gap-12"
          >
            {[
              { value: "40+", label: "Projects Delivered" },
              { value: "$3.2M+", label: "Revenue Unlocked" },
              { value: "98%", label: "Client Retention" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 sm:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-2.5"
          role="group"
          aria-label="Filter case studies by category"
        >
          {CASE_STUDY_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </motion.div>

        {/* ── Case study grid ── */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state ── */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-16 flex flex-col items-center gap-3 text-center"
            >
              <span className="text-3xl">🔍</span>
              <p className="text-sm font-medium text-slate-500">
                No case studies in this category yet. More coming soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA band ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-16 text-center shadow-2xl sm:px-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Ready to be next?
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Let&rsquo;s build your success story.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Every project above started with a single conversation. Schedule a free strategy
            call and discover what&rsquo;s possible for your brand.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-900/30"
          >
            Start Your Project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
