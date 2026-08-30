"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Search,
  ChevronDown,
  Building2,
} from "lucide-react";
import {
  CASE_STUDIES,
  CASE_STUDY_STACK_FILTERS,
} from "../../data/caseStudiesData";
import GlowIcon from "../ui/GlowIcon";
import DeviceFrame from "../visuals/DeviceFrame";
import BrowserFrame from "../visuals/BrowserFrame";
import CaseStudyPreview from "../visuals/CaseStudyPreview";
import ActionLink from "../ui/ActionLink";
import TechIconRow, { TECH_REGISTRY } from "../ui/TechIconRow";
import { CORE_ECOSYSTEM } from "../../data/techIcons";
import CaseStudyDrawer from "./CaseStudyDrawer";
import Reveal from "../motion/Reveal.jsx";
import { accentCardLgClasses, AccentBar } from "../ui/AccentCard";
import { SPRING } from "../motion/springs";

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: SPRING.reveal },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: SPRING.reveal },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -12,
    transition: { type: "spring", stiffness: 220, damping: 26 },
  },
};

function stackLabel(key) {
  if (key === "all") return "All stacks";
  return TECH_REGISTRY[key]?.label || key;
}

function CaseStudyCard({ study, onOpen }) {
  const isMobile = study.category === "App Development";
  const previewUrl =
    study.liveUrl?.replace(/^https?:\/\//, "") ||
    `${study.slug.replace(/-/g, "")}.live`;

  return (
    <motion.article
      layout
      layoutId={`case-card-${study.slug}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(study)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(study);
        }
      }}
      className={`${accentCardLgClasses} group w-full min-w-0 cursor-pointer overflow-hidden shadow-lg shadow-slate-900/5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:shadow-black/20`}
    >
      <AccentBar />
      <div className="relative z-10 grid w-full min-w-0 grid-cols-1 xl:grid-cols-2">
        {/* Left — metric-driven copy */}
        <div className="relative z-[1] flex min-w-0 flex-col justify-center p-4 sm:p-6 xl:pr-4">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              <Building2 className="h-3 w-3 text-emerald-500" />
              {study.industry}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {study.client}
            </span>
          </div>

          <h2 className="mt-4 font-display text-xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-2xl">
            {study.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {study.problem || study.tagline}
          </p>

          {study.heroMetric ? (
            <div className="mt-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-teal-50 px-3.5 py-2 shadow-sm shadow-emerald-900/5">
              <span className="font-display text-base font-extrabold tracking-tight text-emerald-700 sm:text-lg">
                {study.heroMetric.value}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600/80">
                {study.heroMetric.label}
              </span>
            </div>
          ) : null}

          {study.stack?.length ? (
            <div className="mt-5 min-w-0 max-w-full overflow-hidden">
              <TechIconRow
                variant="chips"
                keys={study.stack}
                size="sm"
                className="max-w-full"
              />
            </div>
          ) : null}

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-emerald-600">
            View project details
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Right — interactive browser mockup */}
        <div className="relative z-[1] min-w-0 overflow-hidden border-t border-slate-200/70 bg-slate-50/80 p-4 sm:p-5 xl:border-l xl:border-t-0 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="w-full min-w-0">
            {isMobile ? (
              <DeviceFrame variant="mobile" url={previewUrl} className="w-full">
                <CaseStudyPreview study={study} className="h-full w-full" />
              </DeviceFrame>
            ) : (
              <BrowserFrame
                className="w-full"
                url={
                  study.liveUrl ||
                  `https://${previewUrl}`
                }
                contentClassName="[&>*]:h-full [&>*]:w-full [&_img]:h-auto [&_img]:w-full [&_img]:object-cover"
              >
                <CaseStudyPreview study={study} className="h-full w-full object-cover" />
              </BrowserFrame>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SearchFilterBar({ query, onQuery, stack, onStack }) {
  return (
    <div className="sticky top-16 z-30 rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:top-20 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search case studies</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search by project, client, industry, or outcome…"
            className="w-full rounded-full border border-slate-200 bg-slate-50/80 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none ring-emerald-500/20 transition focus:border-emerald-400 focus:bg-white focus:ring-4"
          />
        </label>

        <label className="relative shrink-0 sm:w-56">
          <span className="sr-only">Filter by tech stack</span>
          <select
            value={stack}
            onChange={(e) => onStack(e.target.value)}
            className="w-full appearance-none rounded-full border border-slate-200 bg-slate-50/80 py-3 pl-4 pr-10 text-sm font-semibold text-slate-800 outline-none ring-emerald-500/20 transition focus:border-emerald-400 focus:bg-white focus:ring-4"
          >
            {CASE_STUDY_STACK_FILTERS.map((key) => (
              <option key={key} value={key}>
                {stackLabel(key)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </label>
      </div>
    </div>
  );
}

export default function CaseStudiesClient() {
  const [query, setQuery] = useState("");
  const [stackFilter, setStackFilter] = useState("all");
  const [activeStudy, setActiveStudy] = useState(null);

  const closeDrawer = useCallback(() => setActiveStudy(null), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CASE_STUDIES.filter((s) => {
      if (stackFilter !== "all" && !(s.stack || []).includes(stackFilter)) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        s.title,
        s.client,
        s.industry,
        s.category,
        s.tagline,
        s.problem,
        s.challenge,
        s.solution,
        ...(s.tags || []),
        ...(s.stack || []).map(stackLabel),
        s.heroMetric?.value,
        s.heroMetric?.label,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, stackFilter]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[560px] w-[560px] max-w-full rounded-full bg-emerald-100/30 blur-[140px]" />
        <div className="absolute right-1/4 top-1/3 h-[420px] w-[420px] max-w-full rounded-full bg-teal-100/25 blur-[120px]" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700"
          >
            <GlowIcon size="sm">
              <TrendingUp className="h-3.5 w-3.5" />
            </GlowIcon>
            Proven Impact
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="heading-gradient mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Results That Speak.
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Metric-driven case studies with interactive previews — open any
            project for architecture, challenge vs. solution, and live links.
          </motion.p>

          <motion.div variants={heroItem} className="mt-8">
            <TechIconRow variant="strip" keys={CORE_ECOSYSTEM} size="md" />
          </motion.div>

          <Reveal delay={0.15}>
          <motion.div
            variants={heroItem}
            className="mt-12 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:grid-cols-3 sm:gap-10 sm:px-10 sm:py-6"
          >
            {[
              { value: "40+", label: "Projects Delivered" },
              { value: "$3.2M+", label: "Revenue Unlocked" },
              { value: "98%", label: "Client Retention" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 sm:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
          </Reveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING.reveal, delay: 0.2 }}
          className="mt-14"
        >
          <SearchFilterBar
            query={query}
            onQuery={setQuery}
            stack={stackFilter}
            onStack={setStackFilter}
          />
        </motion.div>

        <Reveal delay={0.2}>
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((study) => (
              <CaseStudyCard
                key={study.slug}
                study={study}
                onOpen={setActiveStudy}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        </Reveal>

        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-16 text-center text-sm font-medium text-slate-500"
            >
              No projects match that search or stack. Try clearing filters.
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING.reveal}
          className="mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-16 text-center shadow-2xl sm:px-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Ready to be next?
          </p>
          <h2 className="heading-gradient-dark mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Let&rsquo;s build your success story.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Every project above started with a single conversation. Schedule a
            free strategy call and discover what&rsquo;s possible for your brand.
          </p>
          <ActionLink
            href="/contact"
            magnetic
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-900/30"
          >
            Start Your Project
            <ArrowUpRight className="h-4 w-4" />
          </ActionLink>
          <TechIconRow
            variant="strip"
            keys={CORE_ECOSYSTEM}
            tone="dark"
            size="sm"
            className="mt-10"
          />
        </motion.div>
      </div>

      <CaseStudyDrawer
        study={activeStudy}
        open={Boolean(activeStudy)}
        onClose={closeDrawer}
      />
    </div>
  );
}
