"use client";

/**
 * Floating live-status pill for SaaS / infra showcases.
 * tone: "dark" (default) | "light"
 */
export default function LiveSystemStatus({
  label = "All systems operational",
  className = "",
  tone = "dark",
}) {
  const toneClass =
    tone === "light"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_0_18px_rgba(16,185,129,0.15)]"
      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]";

  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${toneClass} ${className}`}
      role="status"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="truncate">{label}</span>
    </div>
  );
}
