/**
 * Soft emerald/teal glow orbs behind content areas.
 */
export default function GlowSpot({
  className = "",
  color = "emerald",
  size = "md",
}) {
  const colorClass =
    color === "teal"
      ? "bg-teal-400/25"
      : color === "sky"
        ? "bg-sky-400/20"
        : "bg-emerald-400/25";

  const sizeClass =
    size === "sm"
      ? "h-40 w-40 blur-2xl"
      : size === "lg"
        ? "h-72 w-72 blur-3xl sm:h-96 sm:w-96"
        : "h-56 w-56 blur-3xl sm:h-72 sm:w-72";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute max-w-full rounded-full ${colorClass} ${sizeClass} ${className}`}
    />
  );
}
