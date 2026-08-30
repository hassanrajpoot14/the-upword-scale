/**
 * Multi-color gradient text mask for section titles.
 * tone="light" — light backgrounds (slate → emerald)
 * tone="dark"  — dark backgrounds (white → emerald)
 */
export default function GradientHeading({
  children,
  className = "",
  as: Tag = "span",
  tone = "light",
}) {
  const gradient =
    tone === "dark"
      ? "bg-gradient-to-r from-white via-emerald-200 to-emerald-500"
      : "bg-gradient-to-r from-slate-900 via-emerald-700 to-emerald-500";

  return (
    <Tag
      className={`${gradient} bg-clip-text font-bold tracking-tight text-transparent ${className}`}
    >
      {children}
    </Tag>
  );
}
