export default function BlogSlugLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent py-24">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" aria-hidden>
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-8 h-6 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 h-14 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-10 aspect-video w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-10 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </article>
    </div>
  );
}
