"use client";

/**
 * Lightweight code-driven UI preview inside device frames (no stock photos).
 */
export default function CaseStudyPreview({ study, className = "" }) {
  const tone = study.accentColor || "emerald";
  const accent =
    tone === "violet"
      ? "from-violet-500 to-purple-500"
      : tone === "sky"
        ? "from-sky-500 to-blue-500"
        : tone === "rose"
          ? "from-rose-500 to-pink-500"
          : tone === "amber"
            ? "from-amber-500 to-orange-500"
            : "from-emerald-500 to-teal-500";

  const primary = study.results?.[0];
  const secondary = study.results?.[1];

  return (
    <div
      className={`relative flex h-full w-full min-w-0 flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${accent} opacity-30 blur-2xl`}
      />
      <div className="relative z-10 mb-3 flex min-w-0 items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[9px] font-semibold uppercase tracking-widest text-slate-500">
            {study.client}
          </p>
          <p className="truncate text-[11px] font-bold text-white sm:text-xs">
            {study.category}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-300">
          <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
          Live
        </span>
      </div>

      <div className="relative z-10 grid min-w-0 flex-1 grid-cols-2 gap-2">
        <div className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5">
          <p className="truncate text-[8px] font-semibold uppercase tracking-wider text-slate-500">
            {primary?.label || "Impact"}
          </p>
          <p
            className={`mt-1 truncate bg-gradient-to-r ${accent} bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl`}
          >
            {primary?.value || "—"}
          </p>
        </div>
        <div className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5">
          <p className="truncate text-[8px] font-semibold uppercase tracking-wider text-slate-500">
            {secondary?.label || "Result"}
          </p>
          <p className="mt-1 truncate text-lg font-extrabold tracking-tight text-white sm:text-xl">
            {secondary?.value || "—"}
          </p>
        </div>
        <div className="col-span-2 min-w-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
          <div className="mb-2 flex items-end gap-1">
            {[40, 65, 48, 82, 70, 95, 88].map((h, i) => (
              <span
                key={i}
                className={`w-full rounded-sm bg-gradient-to-t ${accent} opacity-80`}
                style={{ height: `${h * 0.28}px` }}
              />
            ))}
          </div>
          <p className="truncate text-[9px] text-slate-400">{study.tagline}</p>
        </div>
      </div>
    </div>
  );
}
