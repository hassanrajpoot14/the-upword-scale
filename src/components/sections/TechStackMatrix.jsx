"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Sparkles } from "lucide-react";
import {
  STACK_TABS,
  STATUS_STYLES,
  TECH_STACK_ITEMS,
} from "../../data/techStackMatrix";
import TechLogo from "../visuals/TechLogo";
import LiveSystemStatus from "../visuals/LiveSystemStatus";
import Reveal from "../motion/Reveal.jsx";
import {
  useSpotlight,
  SpotlightOverlay,
} from "../visuals/SpotlightCard";
import { accentCardClasses, AccentBar } from "../ui/AccentCard";
import { SPRING } from "../motion/springs";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: "easeInOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: SPRING.reveal },
};

function FilterTab({ label, icon: Icon, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        isActive
          ? "text-white"
          : "border border-slate-200/80 bg-white/80 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-100"
      }`}
    >
      {isActive ? (
        <motion.span
          layoutId="stack-filter-pill"
          className="absolute inset-0 rounded-full bg-slate-900 shadow-md dark:bg-emerald-600"
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      ) : null}
      <span className="relative z-10 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
    </button>
  );
}

function StatusPill({ statusKey }) {
  const style = STATUS_STYLES[statusKey];
  if (!style) return null;

  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${style.className}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 animate-pulse rounded-full ${style.dot}`} />
      <span className="truncate">{style.label}</span>
    </span>
  );
}

function TechTags({ tags = [] }) {
  if (!tags.length) return null;

  return (
    <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-slate-200/80 bg-slate-50/80 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function StackCard({ item, onOpen }) {
  const spotlight = useSpotlight();

  return (
    <motion.button
      type="button"
      ref={spotlight.ref}
      variants={cardVariants}
      transition={SPRING.hover}
      onMouseMove={spotlight.onMouseMove}
      onMouseEnter={spotlight.onMouseEnter}
      onMouseLeave={spotlight.onMouseLeave}
      onClick={() => onOpen(item)}
      className={`${accentCardClasses} flex h-full min-h-[260px] w-full flex-col justify-between p-6 text-left`}
    >
      <SpotlightOverlay
        background={spotlight.background}
        opacity={spotlight.opacity}
      />
      <AccentBar />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <TechLogo id={item.id} />
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-500 dark:text-slate-500" />
        </div>

        <h3 className="mt-4 font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
          {item.title}
        </h3>

        <div className="mt-3">
          <StatusPill statusKey={item.status} />
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {item.description}
        </p>

        <TechTags tags={item.tags} />
      </div>
    </motion.button>
  );
}

function StackDetailModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <motion.button
        type="button"
        aria-label="Close detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-slate-900/30 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-[111] flex items-end justify-center p-4 sm:items-center">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="stack-detail-title"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={SPRING.snappy}
          className="pointer-events-auto w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/95"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 p-5 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <TechLogo id={item.id} className="h-12 w-12" />
              <div>
                <h3
                  id="stack-detail-title"
                  className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                  {item.title}
                </h3>
                <div className="mt-1.5">
                  <StatusPill statusKey={item.status} />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600">
                Why we use it
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.why}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Business advantage
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function TechStackMatrix() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => TECH_STACK_ITEMS.filter((item) => item.category === activeTab),
    [activeTab]
  );

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-slate-100/60 to-transparent dark:from-slate-900/40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal delay={0.1}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <LiveSystemStatus
              tone="light"
              label="Engineering standards · all systems operational"
              className="mb-4"
            />
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Tech stack matrix
            </p>
            <h2 className="heading-gradient mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Engineering standards &amp; production stack
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Every tool in our matrix is battle-tested in production — with live
              status badges and clear business rationale. Click any card to dive
              deeper.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none sm:flex-wrap">
            {STACK_TABS.map((tab) => (
              <FilterTab
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>
        </Reveal>

        <Reveal delay={0.2}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-12 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((item) => (
              <div key={item.id} className="flex min-h-[260px]">
                <StackCard item={item} onOpen={setSelected} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected ? (
          <StackDetailModal
            key={selected.id}
            item={selected}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
