import PageShellSkeleton from "./PageShellSkeleton";

/** Article route skeleton — reserves hero + body space. */
export default function BlogPostSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8" aria-hidden>
      <div className="h-4 w-28 animate-pulse rounded bg-slate-200/70 dark:bg-slate-800" />
      <div className="mt-8 h-6 w-24 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-800" />
      <div className="mt-6 h-12 w-full animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800" />
      <div className="mt-3 h-12 w-4/5 animate-pulse rounded-2xl bg-slate-200/50 dark:bg-slate-800/90" />
      <div className="mt-8 flex gap-4 border-y border-slate-100 py-5">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-32 animate-pulse rounded bg-slate-200/60 dark:bg-slate-800" />
          <div className="h-3 w-24 animate-pulse rounded bg-slate-200/50 dark:bg-slate-800/80" />
        </div>
      </div>
      <div className="mt-10 min-h-[320px] space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-slate-200/40 dark:bg-slate-800/60"
            style={{ width: `${88 - (i % 3) * 12}%` }}
          />
        ))}
      </div>
      <div className="mt-16">
        <PageShellSkeleton withHero={false} />
      </div>
    </div>
  );
}
