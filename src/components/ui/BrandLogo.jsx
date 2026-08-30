import Link from "next/link";

export default function BrandLogo({
  className = "",
  size = "md",
  tone = "light",
  onClick,
}) {
  const textSize =
    size === "lg"
      ? "text-2xl"
      : size === "header"
        ? "text-lg sm:text-xl"
        : "text-xl";
  const isDark = tone === "dark";
  const wordGap = size === "header" ? "ml-1 sm:ml-1.5" : "ml-1.5";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group inline-flex max-w-full min-w-0 items-baseline select-none font-display tracking-tight ${textSize} ${className}`}
      aria-label="The Upward Scale — Home"
      suppressHydrationWarning
    >
      <span
        suppressHydrationWarning
        className={`shrink-0 font-normal transition-colors ${
          isDark
            ? "text-slate-100 group-hover:text-white"
            : "text-slate-900 group-hover:text-slate-700"
        }`}
      >
        The
      </span>
      <span
        suppressHydrationWarning
        className={`${wordGap} shrink-0 font-bold transition-colors ${
          isDark
            ? "text-slate-100 group-hover:text-white"
            : "text-slate-900 group-hover:text-slate-700"
        }`}
      >
        Upward
      </span>
      <span
        suppressHydrationWarning
        className={`${wordGap} shrink-0 font-extrabold transition-colors ${
          isDark
            ? "text-emerald-400 group-hover:text-emerald-300"
            : "text-emerald-600 group-hover:text-emerald-500"
        }`}
      >
        Scale
      </span>
    </Link>
  );
}
