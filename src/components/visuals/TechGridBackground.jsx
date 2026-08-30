/**
 * Subtle tech grid overlay. Use tone="dark" on slate/navy surfaces.
 */
export default function TechGridBackground({
  tone = "light",
  className = "",
  fade = true,
}) {
  const line =
    tone === "dark" ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        ...(fade
          ? {
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
            }
          : {}),
      }}
    />
  );
}
