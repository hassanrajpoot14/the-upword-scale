/**
 * Glowing impact metric pill for case study cards.
 */
export default function MetricGlowPill({ value, label, className = "" }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-2.5 py-1 text-[10px] font-semibold text-emerald-800 shadow-[0_0_16px_rgba(16,185,129,0.22)] backdrop-blur-sm sm:text-[11px] ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
      <span className="truncate font-extrabold tracking-tight">{value}</span>
      <span className="truncate font-medium text-emerald-700/80">{label}</span>
    </span>
  );
}
