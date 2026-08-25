"use client";

import {
  Gauge,
  ShieldCheck,
  Layers,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import RevealOnScroll, { StaggerReveal } from "../ui/RevealOnScroll";

// ─── Data ─────────────────────────────────────────────────────────────────────
const DIFFERENTIATORS = [
  {
    id: "lighthouse",
    icon: Gauge,
    title: "Lighthouse-First Optimization",
    body: "Every deliverable is benchmarked against a 99+ Lighthouse score. Sub-second LCP, zero layout shift, and perfect Core Web Vitals are non-negotiable starting points — not afterthoughts.",
    stat: "99/100",
    statLabel: "Avg. Lighthouse",
    accent: "emerald",
  },
  {
    id: "zero-downtime",
    icon: ShieldCheck,
    title: "Zero-Downtime Deployment",
    body: "CI/CD pipelines with automated rollbacks, blue-green deployments, and real-time health checks ensure your platform ships fast without ever going dark — even during peak traffic spikes.",
    stat: "99.99%",
    statLabel: "Uptime Maintained",
    accent: "teal",
  },
  {
    id: "architecture",
    icon: Layers,
    title: "Scalable Architecture by Design",
    body: "We engineer systems that handle 10x your current load from day one. Serverless functions, CDN edge caching, and horizontally scalable microservices mean growth never becomes a bottleneck.",
    stat: "10×",
    statLabel: "Traffic Headroom",
    accent: "sky",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "AI-Native Workflow Integration",
    body: "From RAG pipelines and LLM orchestration to predictive analytics, we embed AI deeply into your product — not as a gimmick, but as a core operational multiplier that compounds over time.",
    stat: "74%",
    statLabel: "Avg. Cost Reduction",
    accent: "violet",
  },
];

const ACCENT_STYLES = {
  emerald: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    statText: "text-emerald-600",
    border: "hover:border-emerald-200",
    glow: "hover:shadow-emerald-100/40",
    bar: "from-emerald-400 to-teal-400",
  },
  teal: {
    iconBg: "bg-teal-50",
    iconText: "text-teal-600",
    statText: "text-teal-600",
    border: "hover:border-teal-200",
    glow: "hover:shadow-teal-100/60",
    bar: "from-teal-400 to-cyan-400",
  },
  sky: {
    iconBg: "bg-sky-50",
    iconText: "text-sky-600",
    statText: "text-sky-600",
    border: "hover:border-sky-200",
    glow: "hover:shadow-sky-100/60",
    bar: "from-sky-400 to-blue-400",
  },
  violet: {
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    statText: "text-violet-600",
    border: "hover:border-violet-200",
    glow: "hover:shadow-violet-100/60",
    bar: "from-violet-400 to-purple-400",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden bg-white py-24 sm:py-32"
      aria-labelledby="why-choose-heading"
    >
      {/* Faint dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top green gradient fade from hero */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[900px] -translate-x-1/2 rounded-full bg-emerald-50/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <RevealOnScroll preset="fadeUp" threshold={0.15}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500">
              Why The Upward Scale
            </span>
            <h2
              id="why-choose-heading"
              className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Built Different.{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Proven at Scale.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
              We don&rsquo;t just build — we engineer. Every decision, every line of code, every
              campaign is optimised for compounding results that outlast the project.
            </p>
          </div>
        </RevealOnScroll>

        {/* Differentiator cards */}
        <StaggerReveal
          staggerDelay={0.1}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {DIFFERENTIATORS.map((d) => {
            const styles = ACCENT_STYLES[d.accent];
            const Icon = d.icon;
            return (
              <RevealOnScroll
                key={d.id}
                preset="fadeUp"
                as="article"
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 ${styles.border} hover:shadow-2xl ${styles.glow}`}
                >
                  {/* Colour accent bar along the top */}
                  <div
                    className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${styles.bar} translate-y-[-3px] transition-transform duration-300 group-hover:translate-y-0`}
                  />

                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${styles.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-5 w-5 ${styles.iconText}`} strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                    {d.title}
                  </h3>

                  {/* Body */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{d.body}</p>

                  {/* Stat pill */}
                  <div className="mt-6 flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className={`text-2xl font-extrabold tracking-tight ${styles.statText}`}>
                        {d.stat}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        {d.statLabel}
                      </span>
                    </div>
                    {/* Hover arrow */}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${styles.iconBg} opacity-0 transition-all duration-300 group-hover:opacity-100`}
                    >
                      <ArrowUpRight className={`h-4 w-4 ${styles.iconText}`} />
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </StaggerReveal>

        {/* Bottom CTA row */}
        <RevealOnScroll preset="fadeUp" delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md"
            >
              See the results in our Case Studies
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
