"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Target } from "lucide-react";
import ActionLink from "../ui/ActionLink";
import Reveal from "../motion/Reveal.jsx";
import RevealOnScroll from "../ui/RevealOnScroll";
import GlowIcon from "../ui/GlowIcon";
import TechGridBackground from "../visuals/TechGridBackground";
import LiveSystemStatus from "../visuals/LiveSystemStatus";

// ─── Animated background orbs ─────────────────────────────────────────────────
function FloatingOrb({ className }) {
  return (
    <div
      className={`pointer-events-none max-w-full animate-pulse ${className}`}
    />
  );
}

// ─── Metrics that appear inside the glassmorphism card ────────────────────────
const MISSION_STATS = [
  { value: "100%", label: "Outcome Focused" },
  { value: "∞", label: "Compounding Growth" },
  { value: "1st", label: "Category Leaders Built" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function OurGoal() {
  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-28 sm:py-36"
      aria-labelledby="our-goal-heading"
    >
      {/* ── Abstract tech grid (replaces stock architecture photo) ── */}
      <TechGridBackground tone="dark" fade={false} className="-z-20 opacity-60" />
      <div className="pointer-events-none absolute right-6 top-8 z-10 hidden sm:block lg:right-12 lg:top-12">
        <LiveSystemStatus label="Mission systems online" />
      </div>

      {/* ── Background: floating orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloatingOrb
          className="absolute -left-32 top-[-80px] h-[560px] w-[560px] max-w-full rounded-full bg-emerald-600/10 blur-[130px]"
        />
        <FloatingOrb
          className="absolute -right-24 bottom-[-60px] h-[480px] w-[480px] max-w-full rounded-full bg-teal-500/10 blur-[120px]"
        />
        <FloatingOrb
          className="absolute left-1/2 top-1/2 h-[300px] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-700/40 blur-[80px]"
        />
      </div>

      {/* Subtle grid over dark bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── Left: Typography-led mission statement ── */}
          <RevealOnScroll preset="fadeLeft" threshold={0.15} className="flex flex-col gap-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <GlowIcon size="sm" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <Target className="h-3.5 w-3.5" />
              </GlowIcon>
              Our Mission
            </div>

            {/* Large display headline — the typographic centrepiece */}
            <h2
              id="our-goal-heading"
              className="heading-gradient-dark text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl"
            >
              To make every brand we touch a category leader.
            </h2>

            {/* Body paragraphs — readable at large size */}
            <div className="space-y-4 text-lg leading-relaxed text-slate-400">
              <p>
                The digital landscape rewards speed, precision, and compounding execution. Most
                agencies settle for deliverables. We obsess over{" "}
                <span className="font-semibold text-slate-200">outcomes</span>.
              </p>
              <p>
                Our goal is singular: architect systems, brands, and campaigns so effective that
                our clients no longer need to compete on price — they compete on{" "}
                <span className="font-semibold text-slate-200">reputation</span>.
              </p>
            </div>

            {/* CTA */}
            <ActionLink
              href="/about"
              magnetic
              className="group inline-flex items-center gap-2 self-start rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-900/40"
            >
              Our Story
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ActionLink>
          </RevealOnScroll>

          {/* ── Right: Glassmorphism card ── */}
          <RevealOnScroll preset="fadeRight" delay={0.15} threshold={0.15}>
            {/* Glass card */}
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl sm:p-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            >
              {/* Inner glow edge */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.07]" />

              {/* Decorative emerald shimmer */}
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-2xl" />

              {/* Card content */}
              <div className="relative flex flex-col gap-8">
                {/* Quote */}
                <blockquote className="border-l-2 border-emerald-500/60 pl-5">
                  <p className="text-lg font-medium italic leading-relaxed text-white/80 sm:text-xl">
                    &ldquo;We don&rsquo;t measure our success by projects shipped. We measure it by
                    the revenue, authority, and market share our clients gain long after we&rsquo;re
                    done.&rdquo;
                  </p>
                  <footer className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-sm font-extrabold text-white">
                      T
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">The Upward Scale</p>
                      <p className="text-xs font-medium text-slate-400">Agency Manifesto</p>
                    </div>
                  </footer>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Stats trio */}
                <Reveal delay={0.2}>
                <div className="grid grid-cols-3 gap-4">
                  {MISSION_STATS.map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                      <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        {s.value}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
                </Reveal>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Value pillars */}
                <ul className="flex flex-col gap-3">
                  {[
                    "Performance is a feature, not a checkbox.",
                    "Transparency and accountability on every sprint.",
                    "We only win when our clients win.",
                  ].map((line, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-slate-300">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
