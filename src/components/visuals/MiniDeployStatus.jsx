"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { id: "staging", label: "Staging" },
  { id: "pipeline", label: "Pipeline" },
  { id: "production", label: "Production" },
];

/**
 * Interactive deployment status with pulsing nodes: Staging → Production.
 */
export default function MiniDeployStatus({ className = "" }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((n) => (n + 1) % STEPS.length);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const deployed = active === STEPS.length - 1;

  return (
    <div
      className={`min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Deploy pipeline
        </p>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
            deployed
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              deployed ? "animate-pulse bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {deployed ? "Deployed" : "In progress"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-1">
        {STEPS.map((step, i) => {
          const done = i <= active;
          const current = i === active;
          return (
            <div key={step.id} className="flex flex-1 items-center gap-1">
              <div className="flex min-w-0 flex-col items-center gap-1.5">
                <span className="relative flex h-3 w-3">
                  {current ? (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                  ) : null}
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full border ${
                      done
                        ? "border-emerald-400 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.45)]"
                        : "border-slate-300 bg-white"
                    }`}
                  />
                </span>
                <span
                  className={`truncate text-[9px] font-semibold sm:text-[10px] ${
                    done ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 ? (
                <div
                  className={`mb-4 h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                    i < active ? "bg-emerald-400" : "bg-slate-200"
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
