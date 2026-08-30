/**
 * Emerald gradient container for Lucide icons with hover glow.
 * Use size="sm" for inline checks/arrows; default for feature icons.
 */
export default function GlowIcon({
  children,
  className = "",
  size = "md",
  as: Tag = "div",
}) {
  const sizeClass =
    size === "sm"
      ? "p-1.5 rounded-lg"
      : size === "lg"
        ? "p-3.5 rounded-xl"
        : "p-3 rounded-xl";

  return (
    <Tag
      className={`inline-flex shrink-0 items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 transition-shadow duration-300 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] ${sizeClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
