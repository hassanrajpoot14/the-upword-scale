"use client";

import { ArrowRight } from "lucide-react";
import { accentCardClasses, AccentBar } from "../ui/AccentCard";

function TopologyNode({ label, sublabel, badge }) {
  return (
    <div className="relative flex min-w-0 flex-1 flex-col items-center text-center">
      <div className="relative w-full rounded-xl border border-emerald-500/25 bg-slate-900/80 px-3 py-4 light:border-emerald-500/30 light:bg-white/90 dark:border-emerald-500/25 dark:bg-slate-900/80">
        <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 rounded-md border border-emerald-500/30 bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-400 light:text-emerald-600 dark:text-emerald-400">
          {badge}
        </span>
        <p className="mt-1 text-sm font-bold tracking-tight text-slate-100 light:text-slate-900 dark:text-slate-100">
          {label}
        </p>
        <p className="mt-1 text-[10px] font-medium text-slate-400 light:text-slate-600 dark:text-slate-400">
          {sublabel}
        </p>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
        />
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      className="flex shrink-0 items-center justify-center px-1 sm:px-2"
      aria-hidden
    >
      <ArrowRight className="h-4 w-4 text-emerald-500/70 sm:h-5 sm:w-5" />
    </div>
  );
}

/**
 * 3-step architecture pipeline — request flow topology for service detail pages.
 */
export default function ArchitectureTopology({ steps, className = "" }) {
  if (!steps?.length) return null;

  return (
    <div className={`${accentCardClasses} p-6 sm:p-8 ${className}`}>
      <AccentBar />
      <div className="relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
          Architecture topology
        </p>
        <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-xl">
          Request flow pipeline
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          How traffic moves through our production stack — from edge delivery to
          isolated runtime containers.
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {steps.map((step, index) => (
            <div key={step.label} className="contents">
              <TopologyNode {...step} />
              {index < steps.length - 1 ? (
                <>
                  <div className="flex justify-center py-0.5 sm:hidden">
                    <ArrowRight className="h-4 w-4 rotate-90 text-emerald-500/70" />
                  </div>
                  <div className="hidden sm:flex">
                    <FlowArrow />
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
