"use client";

import { useEffect, useRef, useState } from "react";
import MicroUiScale from "../ui/MicroUiScale";

function useCountUp(target, enabled, duration = 1400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled || started.current) return undefined;
    started.current = true;

    const isNumeric = typeof target === "number";
    if (!isNumeric) {
      setValue(target);
      return undefined;
    }

    const start = performance.now();
    let frame;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, duration]);

  return value;
}

function MetricCell({ label, value, suffix = "", prefix = "", inView }) {
  const numeric = typeof value === "number";
  const display = useCountUp(value, inView);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-500 sm:text-[10px]">
        {label}
      </p>
      <p className="mt-1.5 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
        {prefix}
        {numeric ? display : value}
        {suffix}
      </p>
    </div>
  );
}

/**
 * Live metric counter dashboard card.
 */
export default function MetricDashboard({
  title = "Growth telemetry",
  metrics = [
    { label: "Lighthouse", value: 99, suffix: "" },
    { label: "Uptime", value: 99.99, suffix: "%" },
    { label: "Lead lift", value: 38, prefix: "+", suffix: "%" },
    { label: "Latency", value: 42, suffix: "ms" },
  ],
  className = "",
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <MicroUiScale className={className}>
      <div
        ref={ref}
        className="relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-4 sm:p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-slate-300 sm:text-sm">{title}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {metrics.map((m) => (
            <MetricCell key={m.label} {...m} inView={inView} />
          ))}
        </div>
      </div>
    </MicroUiScale>
  );
}
