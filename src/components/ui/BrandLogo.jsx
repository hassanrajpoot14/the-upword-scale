import Link from "next/link";

/**
 * Brand mark. tone:
 * - "auto" (default) — follows html.light / html.dark
 * - "light" — dark ink for light surfaces
 * - "dark" — light ink for forced dark surfaces (drawers, dark panels)
 */
export default function BrandLogo({
  className = "",
  size = "md",
  tone = "auto",
  onClick,
}) {
  const textSize =
    size === "lg"
      ? "text-2xl"
      : size === "header"
        ? "text-base sm:text-xl"
        : "text-xl";
  const wordGap = size === "header" ? "ml-1 sm:ml-1.5" : "ml-1.5";

  const theUpward =
    tone === "dark"
      ? "text-slate-100 group-hover:text-white"
      : tone === "light"
        ? "text-slate-900 group-hover:text-slate-700"
        : "text-slate-900 light:text-slate-900 group-hover:text-slate-700 dark:text-slate-100 dark:group-hover:text-white";

  const scale =
    tone === "dark"
      ? "text-emerald-400 group-hover:text-emerald-300"
      : tone === "light"
        ? "text-emerald-600 group-hover:text-emerald-500"
        : "text-emerald-600 light:text-emerald-600 group-hover:text-emerald-500 dark:text-emerald-400 dark:group-hover:text-emerald-300";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group inline-flex max-w-full min-w-0 flex-wrap items-baseline select-none font-display tracking-tight ${textSize} ${className}`}
      aria-label="The Upward Scale — Home"
      suppressHydrationWarning
    >
      <span
        suppressHydrationWarning
        className={`font-normal transition-colors ${theUpward}`}
      >
        The
      </span>
      <span
        suppressHydrationWarning
        className={`${wordGap} font-bold transition-colors ${theUpward}`}
      >
        Upward
      </span>
      <span
        suppressHydrationWarning
        className={`${wordGap} font-extrabold transition-colors ${scale}`}
      >
        Scale
      </span>
    </Link>
  );
}
