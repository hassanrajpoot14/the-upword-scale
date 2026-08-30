import { AspectSkeleton } from "./AspectSlot";

/** Route-level skeleton — reserves layout space during code-split load. */
export default function PageShellSkeleton({ withHero = true }) {
  return (
    <div
      className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-16 pt-28 sm:px-8"
      aria-hidden
    >
      {withHero ? (
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="h-6 w-32 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-800" />
          <div className="mt-6 h-12 w-full max-w-xl animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800" />
          <div className="mt-3 h-12 w-2/3 max-w-md animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/90" />
          <div className="mt-8 h-4 w-full max-w-lg animate-pulse rounded bg-slate-200/50 dark:bg-slate-800/70" />
        </div>
      ) : null}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <AspectSkeleton ratio="16/10" />
        <AspectSkeleton ratio="16/10" />
        <AspectSkeleton ratio="16/10" />
      </div>
    </div>
  );
}
