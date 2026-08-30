import { AspectSkeleton } from "./AspectSlot";

/** Reserves matrix grid space during code-split load — prevents CLS. */
export default function TechStackMatrixSkeleton() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      aria-hidden
    >
      <div className="h-6 w-56 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-800" />
      <div className="mt-4 h-10 w-full max-w-lg animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800" />
      <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-slate-200/50 dark:bg-slate-800/80" />
      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-28 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-800"
          />
        ))}
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 dark:border-slate-700/80 dark:bg-slate-900/60"
          >
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-800" />
            <div className="mt-4 h-4 w-24 animate-pulse rounded bg-slate-200/70 dark:bg-slate-800" />
            <div className="mt-3 h-5 w-32 animate-pulse rounded-full bg-slate-200/60 dark:bg-slate-800/90" />
            <AspectSkeleton ratio="4/3" className="mt-3" />
          </div>
        ))}
      </div>
    </section>
  );
}
