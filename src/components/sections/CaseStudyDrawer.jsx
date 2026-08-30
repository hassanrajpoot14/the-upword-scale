"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  X,
  Swords,
  Lightbulb,
  BarChart3,
  Layers,
} from "lucide-react";
import TechIconRow from "../ui/TechIconRow";

function ArchitectureDiagram({ nodes = [], accent = "emerald" }) {
  const bar =
    accent === "violet"
      ? "from-violet-400 to-purple-500"
      : accent === "sky"
        ? "from-sky-400 to-blue-500"
        : accent === "rose"
          ? "from-rose-400 to-pink-500"
          : accent === "amber"
            ? "from-amber-400 to-orange-500"
            : "from-emerald-400 to-teal-500";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mb-4 flex items-center gap-2">
        <Layers className="h-4 w-4 text-emerald-600" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Architecture
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col gap-2">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-950">
              <div
                aria-hidden
                className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${bar}`}
              />
              <div className="flex items-center justify-between gap-3 pl-2">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {node.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{node.detail}</p>
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  L{i + 1}
                </span>
              </div>
            </div>
            {i < nodes.length - 1 ? (
              <div className="flex justify-center" aria-hidden>
                <span className="h-3 w-px bg-gradient-to-b from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-700" />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <svg
        className="mt-4 h-1.5 w-full overflow-visible"
        viewBox="0 0 100 4"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="arch-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="4" rx="2" fill="url(#arch-flow)" />
      </svg>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
        request → process → persist
      </p>
    </div>
  );
}

export default function CaseStudyDrawer({ study, open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && study ? (
        <>
          <motion.button
            type="button"
            aria-label="Close project details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-slate-950/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-drawer-title-${study.slug}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                  {study.industry} · {study.category}
                </p>
                <h2
                  id={`case-drawer-title-${study.slug}`}
                  className="mt-1 font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl"
                >
                  {study.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{study.client}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6 sm:px-6">
              {study.heroMetric ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
                  <BarChart3 className="h-4 w-4" />
                  {study.heroMetric.value}{" "}
                  <span className="font-semibold text-emerald-600/80">
                    {study.heroMetric.label}
                  </span>
                </div>
              ) : null}

              <ArchitectureDiagram
                nodes={study.architecture || []}
                accent={study.accentColor}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-rose-600">
                    <Swords className="h-4 w-4" />
                    <p className="text-[11px] font-bold uppercase tracking-widest">
                      Challenge
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {study.challenge}
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-emerald-600">
                    <Lightbulb className="h-4 w-4" />
                    <p className="text-[11px] font-bold uppercase tracking-widest">
                      Solution
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {study.solution}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  Key results
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {study.results.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3"
                    >
                      <p className="font-display text-lg font-extrabold tracking-tight text-slate-900">
                        {r.value}
                      </p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {study.stack?.length ? (
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Stack
                  </p>
                  <TechIconRow variant="chips" keys={study.stack} size="sm" />
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/80 px-5 py-4 sm:flex-row sm:px-6">
              {study.liveUrl ? (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Visit live project
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
              <Link
                href={`/case-studies/${study.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-300 hover:text-emerald-700"
                onClick={onClose}
              >
                Full write-up
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
