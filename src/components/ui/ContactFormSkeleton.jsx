/** Reserved layout while the project planner loads — prevents CLS. */
export default function ContactFormSkeleton() {
  return (
    <div
      aria-hidden
      className="relative min-h-[520px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10 dark:border-slate-700/80 dark:bg-slate-900/60"
    >
      <div className="h-4 w-28 animate-pulse rounded bg-slate-200/80 dark:bg-slate-800" />
      <div className="mt-3 h-8 w-2/3 max-w-xs animate-pulse rounded-lg bg-slate-200/70 dark:bg-slate-800" />
      <div className="mt-8 flex gap-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-8 w-8 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-800"
          />
        ))}
      </div>
      <div className="mt-8 h-2 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/80" />
        <div className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/80" />
        <div className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/80" />
        <div className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/80" />
      </div>
    </div>
  );
}
