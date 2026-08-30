"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live Lighthouse-style gauge that counts up to 99/100.
 */
export default function MiniLighthouseGauge({ className = "" }) {
  const ref = useRef(null);
  const [score, setScore] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return undefined;
    let frame;
    const start = performance.now();
    const duration = 1400;
    const target = 99;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setScore(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const circumference = 2 * Math.PI * 36;
  const progress = (score / 100) * circumference;

  return (
    <div
      ref={ref}
      className={`flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:gap-4 sm:px-4 ${className}`}
    >
      <div className="relative h-20 w-20 shrink-0">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="7"
          />
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="#10b981"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-[stroke-dashoffset] duration-100 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
            {score}
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            /100
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
          Lighthouse
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-900">
          Performance vitals
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
          Core Web Vitals locked in the green.
        </p>
      </div>
    </div>
  );
}
