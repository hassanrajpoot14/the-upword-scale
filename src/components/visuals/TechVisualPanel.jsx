"use client";

import CodeWindow from "./CodeWindow";
import SystemNodeDiagram from "./SystemNodeDiagram";
import MetricDashboard from "./MetricDashboard";
import LiveSystemStatus from "./LiveSystemStatus";
import TechGridBackground from "./TechGridBackground";
import GlowSpot from "./GlowSpot";
import MicroUiScale from "../ui/MicroUiScale";
import AspectSlot from "../ui/AspectSlot";

const VARIANT_BY_CATEGORY = {
  "AI Integration": "nodes",
  "Web Architecture": "code",
  "Brand Strategy": "metrics",
  SEO: "metrics",
  "App Development": "code",
  DevOps: "infra",
};

/**
 * Composed tech visual panel — replaces stock photography.
 * variant: "code" | "nodes" | "metrics" | "infra" | "auto"
 * density: "full" | "card" (card = shorter preview for grids)
 */
export default function TechVisualPanel({
  variant = "auto",
  category,
  title,
  caption,
  statusLabel = "All systems operational",
  className = "",
  compact = false,
  density = "full",
}) {
  const resolved =
    variant === "auto"
      ? VARIANT_BY_CATEGORY[category] || "code"
      : variant;

  const isCard = density === "card";

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-3 shadow-lg sm:rounded-3xl sm:p-4 ${className}`}
    >
      <TechGridBackground tone="dark" className="opacity-80" />
      <GlowSpot className="-right-10 -top-10 opacity-70" size="md" />
      <GlowSpot className="-bottom-8 -left-8 opacity-50" color="teal" size="sm" />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
          <LiveSystemStatus label={statusLabel} />
          {title ? (
            <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
              {title}
            </span>
          ) : null}
        </div>

        <AspectSlot ratio={isCard ? "video" : "16/10"} className="w-full min-w-0">
          <MicroUiScale className="flex h-full min-w-0 flex-col justify-center">
            {resolved === "nodes" && (
              <SystemNodeDiagram className={isCard ? "max-h-full" : "h-full"} />
            )}
            {resolved === "metrics" && (
              <MetricDashboard
                title={title || "Performance telemetry"}
                metrics={
                  isCard
                    ? [
                        { label: "Lighthouse", value: 99 },
                        { label: "Lift", value: 38, prefix: "+", suffix: "%" },
                      ]
                    : [
                        { label: "Lighthouse", value: 99 },
                        { label: "Conversion", value: 38, prefix: "+", suffix: "%" },
                        { label: "Pipeline", value: 210, prefix: "$", suffix: "K" },
                        { label: "Retention", value: 98, suffix: "%" },
                      ]
                }
              />
            )}
            {(resolved === "code" || resolved === "infra") && (
              <CodeWindow
                compact={compact || isCard}
                title={
                  resolved === "infra" ? "infra/deploy.yml" : "growth-engine.ts"
                }
                lines={
                  resolved === "infra"
                    ? [
                        { t: "keyword", v: "deploy" },
                        { t: "plain", v: ":" },
                        { br: true },
                        { t: "plain", v: "  strategy: " },
                        { t: "str", v: "blue-green" },
                        { br: true },
                        { t: "plain", v: "  edge: " },
                        { t: "str", v: "global-cdn" },
                        { br: true },
                        { t: "plain", v: "  healthcheck:" },
                        { br: true },
                        { t: "plain", v: "    path: " },
                        { t: "str", v: "'/api/health'" },
                        { br: true },
                        { t: "plain", v: "    interval: " },
                        { t: "num", v: "15" },
                        { t: "plain", v: "s" },
                        { br: true },
                        { t: "plain", v: "  rollback: " },
                        { t: "keyword", v: "auto" },
                      ]
                    : isCard
                      ? [
                          { t: "keyword", v: "export" },
                          { t: "plain", v: " " },
                          { t: "keyword", v: "const" },
                          { t: "plain", v: " " },
                          { t: "var", v: "engine" },
                          { t: "plain", v: " = {" },
                          { br: true },
                          { t: "plain", v: "  lighthouse: " },
                          { t: "num", v: "99" },
                          { t: "plain", v: "," },
                          { br: true },
                          { t: "plain", v: "  edge: " },
                          { t: "str", v: "'global'" },
                          { t: "plain", v: "," },
                          { br: true },
                          { t: "plain", v: "  status: " },
                          { t: "str", v: "'live'" },
                          { br: true },
                          { t: "plain", v: "};" },
                        ]
                      : undefined
                }
              />
            )}
          </MicroUiScale>
        </AspectSlot>

        {caption && !isCard ? (
          <div className="px-1 pb-0.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              System visual
            </p>
            <p className="mt-0.5 text-xs font-semibold text-slate-300">{caption}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

