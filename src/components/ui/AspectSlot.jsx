const RATIO_CLASS = {
  video: "aspect-video",
  square: "aspect-square",
  "16/10": "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
};

function ratioToClass(ratio) {
  return RATIO_CLASS[ratio] || RATIO_CLASS.video;
}

/**
 * Reserves explicit aspect-ratio space to prevent CLS while media loads.
 */
export default function AspectSlot({
  ratio = "video",
  className = "",
  children,
  minHeight,
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${ratioToClass(ratio)} ${className}`}
      style={minHeight ? { minHeight } : undefined}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

/** Pulse skeleton matching AspectSlot dimensions. */
export function AspectSkeleton({ ratio = "video", className = "", minHeight }) {
  return (
    <div
      aria-hidden
      className={`w-full animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-800/80 ${ratioToClass(ratio)} ${className}`}
      style={minHeight ? { minHeight } : undefined}
    />
  );
}
