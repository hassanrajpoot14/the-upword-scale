"use client";

const NODES = [
  { id: "edge", label: "Edge CDN", x: "12%", y: "22%" },
  { id: "api", label: "API Gateway", x: "50%", y: "18%" },
  { id: "ai", label: "AI Agents", x: "82%", y: "28%" },
  { id: "db", label: "Vector DB", x: "22%", y: "72%" },
  { id: "app", label: "App Core", x: "50%", y: "58%" },
  { id: "obs", label: "Observability", x: "78%", y: "74%" },
];

const LINKS = [
  ["edge", "api"],
  ["api", "ai"],
  ["api", "app"],
  ["app", "db"],
  ["app", "obs"],
  ["ai", "obs"],
];

/**
 * Glowing system-node diagram — pure CSS/SVG, scales with container.
 */
export default function SystemNodeDiagram({ className = "" }) {
  return (
    <div
      className={`relative aspect-[4/3] w-full max-w-full overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-950 ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.18), transparent 55%)",
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 75"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {LINKS.map(([a, b], i) => {
          const from = NODES.find((n) => n.id === a);
          const to = NODES.find((n) => n.id === b);
          if (!from || !to) return null;
          const x1 = parseFloat(from.x);
          const y1 = parseFloat(from.y) * 0.75;
          const x2 = parseFloat(to.x);
          const y2 = parseFloat(to.y) * 0.75;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(52,211,153,0.35)"
              strokeWidth="0.35"
              strokeDasharray="1.2 1.2"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-8"
                dur={`${3 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}
      </svg>

      {NODES.map((node) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: node.x, top: node.y }}
        >
          <div className="relative flex flex-col items-center gap-1.5">
            <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
              <span className="relative inline-flex h-full w-full rounded-full border border-emerald-300/60 bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
            </span>
            <span className="max-w-full truncate rounded-md border border-white/10 bg-slate-900/90 px-1.5 py-0.5 text-[8px] font-semibold text-slate-200 sm:text-[10px]">
              {node.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
