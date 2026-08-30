"use client";

/**
 * Modern browser window chrome — traffic-light dots, URL pill, dark frame.
 * Wrap previews with group-hover perspective scale for case study cards.
 */
export default function BrowserFrame({
  children,
  url = "https://app.upwardscale.com",
  className = "",
  contentClassName = "",
  aspectRatio = "aspect-[16/10]",
}) {
  return (
    <div className={`group relative [perspective:1200px] ${className}`}>
      <div className="origin-center overflow-hidden rounded-2xl border border-slate-800 light:border-slate-300/80 bg-slate-900/90 light:bg-slate-100/95 shadow-lg shadow-slate-950/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/90 [transform-style:preserve-3d] group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
        <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-950/90 px-3 py-2.5 light:border-slate-200 light:bg-slate-100/90 dark:border-slate-800 dark:bg-slate-950/90">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/90"
            aria-hidden
          />
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-500/90"
            aria-hidden
          />
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500/90"
            aria-hidden
          />
          <div className="ml-1 flex min-w-0 flex-1 items-center rounded-lg border border-slate-700/60 bg-slate-900/80 px-2.5 py-1 light:border-slate-200 light:bg-white dark:border-slate-700 dark:bg-slate-900/80">
            <span className="truncate font-mono text-[9px] text-slate-400 light:text-slate-500 sm:text-[10px] dark:text-slate-400">
              {url}
            </span>
          </div>
        </div>

        <div
          className={`${aspectRatio} overflow-hidden bg-slate-950 ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
