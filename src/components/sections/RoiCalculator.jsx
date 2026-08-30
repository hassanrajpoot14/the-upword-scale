"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, TrendingUp, Zap } from "lucide-react";
import ActionLink from "../ui/ActionLink";
import AnimatedCounter from "../ui/AnimatedCounter";
import LiveSystemStatus from "../visuals/LiveSystemStatus";
import {
  computeRoiProjection,
  formatCurrency,
  formatSeconds,
  formatTraffic,
} from "../../lib/roiCalculator";
import { SPRING } from "../motion/springs";

function RangeField({
  id,
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
  display,
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <label
            htmlFor={id}
            className="text-sm font-semibold text-slate-900 dark:text-slate-100"
          >
            {label}
          </label>
          {hint ? (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
          ) : null}
        </div>
        <span className="font-display text-lg font-extrabold tracking-tight text-emerald-600">
          {display}
        </span>
      </div>
      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="roi-range w-full"
          style={{ "--fill": `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OutputCard({ icon: Icon, label, children, accent = "emerald" }) {
  const accents = {
    emerald: "border-emerald-200/70 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/30",
    sky: "border-sky-200/70 bg-sky-50/50 dark:border-sky-900/40 dark:bg-sky-950/30",
    slate: "border-slate-200/80 bg-white/80 dark:border-slate-700/80 dark:bg-slate-900/50",
  };

  return (
    <motion.div
      layout
      transition={SPRING.snappy}
      className={`rounded-2xl border p-5 ${accents[accent]}`}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-emerald-600 dark:border-slate-700 dark:bg-slate-900">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
      </div>
      <div className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {children}
      </div>
    </motion.div>
  );
}

export default function RoiCalculator() {
  const [traffic, setTraffic] = useState(50000);
  const [orderValue, setOrderValue] = useState(250);
  const [speedScore, setSpeedScore] = useState(52);

  const projection = useMemo(
    () => computeRoiProjection({ traffic, orderValue, speedScore }),
    [traffic, orderValue, speedScore]
  );

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <LiveSystemStatus
            tone="light"
            label="Performance ROI model · live"
            className="mb-4"
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
            Impact calculator
          </p>
          <h2 className="heading-gradient mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            See what speed does to your revenue
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Adjust your traffic, lead value, and current performance score. We
            project conversion lift and revenue impact from a sub-second
            architecture rebuild.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/60 sm:p-8 lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Your inputs
            </p>

            <div className="mt-6 space-y-8">
              <RangeField
                id="roi-traffic"
                label="Current monthly traffic"
                hint="Unique visitors per month"
                min={10000}
                max={500000}
                step={5000}
                value={traffic}
                onChange={setTraffic}
                display={`${formatTraffic(traffic)} / mo`}
              />

              <RangeField
                id="roi-value"
                label="Average order / lead value"
                hint="Revenue per conversion"
                min={50}
                max={5000}
                step={50}
                value={orderValue}
                onChange={setOrderValue}
                display={formatCurrency(orderValue)}
              />

              <RangeField
                id="roi-speed"
                label="Current site speed score"
                hint="Lighthouse performance (30–90)"
                min={30}
                max={90}
                step={1}
                value={speedScore}
                onChange={setSpeedScore}
                display={`${speedScore} / 100`}
              />
            </div>

            <p className="mt-8 text-[11px] leading-relaxed text-slate-400">
              Estimates use conservative industry speed-to-conversion benchmarks.
              Actual results vary by funnel, vertical, and implementation quality.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <OutputCard icon={TrendingUp} label="Conversion lift">
                <AnimatedCounter
                  value={projection.conversionLiftPct}
                  format={(n) => `+${Math.round(n)}%`}
                />
              </OutputCard>

              <OutputCard icon={Zap} label="Projected revenue lift" accent="sky">
                <AnimatedCounter
                  value={projection.revenueLift}
                  format={formatCurrency}
                />
                <span className="mt-1 block text-xs font-medium text-slate-500">
                  per month
                </span>
              </OutputCard>

              <OutputCard icon={Gauge} label="Target load time">
                <AnimatedCounter
                  value={projection.targetLoadSec}
                  format={(n) => formatSeconds(n)}
                />
                <span className="mt-1 block text-xs font-medium text-emerald-600">
                  from {formatSeconds(projection.currentLoadSec)} today
                </span>
              </OutputCard>
            </div>

            <motion.div
              layout
              className="flex flex-1 flex-col justify-between rounded-3xl border border-slate-200/80 bg-slate-950 p-6 text-white sm:p-8 dark:border-slate-700"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                  Speed improvement
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  <AnimatedCounter
                    value={projection.loadImprovementSec}
                    format={(n) => `${n.toFixed(2)}s faster`}
                    className="text-white"
                  />
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                  Moving from a {speedScore}/100 score to elite sub-second
                  delivery typically unlocks{" "}
                  <span className="font-semibold text-emerald-300">
                    +{projection.conversionLiftPct}% conversions
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-emerald-300">
                    {formatCurrency(projection.revenueLift)}/mo
                  </span>{" "}
                  in incremental revenue at your current traffic.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ActionLink
                  href="/contact"
                  magnetic
                  loadingLabel="Opening planner…"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
                >
                  Claim These Numbers for Your Project
                  <ArrowRight className="h-4 w-4" />
                </ActionLink>
                <p className="text-xs text-slate-500">
                  Free scope review · 24h response
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
