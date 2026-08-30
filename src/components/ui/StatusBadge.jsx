"use client";

const badgeShell =
  "inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 font-mono shadow-sm backdrop-blur-md light:border-emerald-500/25 light:bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-950/40";

const badgeText =
  "tracking-tight font-medium text-emerald-600 light:text-emerald-700 dark:text-emerald-400";

function StatusPulse() {
  return (
    <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

export default function StatusBadge({
  compact = false,
  regionDetail,
  className = "",
}) {
  return (
    <div className={className}>
      <span
        role="status"
        aria-live="polite"
        className={`${badgeShell} ${compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1 text-xs"}`}
      >
        <StatusPulse />
        <span className={badgeText}>All Systems Operational</span>
      </span>

      {regionDetail ? (
        <p className="mt-2 text-[11px] font-mono tracking-tight text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400">
          {regionDetail}
        </p>
      ) : null}
    </div>
  );
}
