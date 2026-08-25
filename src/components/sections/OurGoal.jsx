"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Target } from "lucide-react";
import RevealOnScroll from "../ui/RevealOnScroll";

// ─── Animated background orbs ─────────────────────────────────────────────────
function FloatingOrb({
  className,
  delay = 0,
  duration = 8,
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className} />;

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -22, 0, 16, 0],
        x: [0, 10, -8, 4, 0],
        scale: [1, 1.06, 0.97, 1.03, 1],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
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
      {/* ── Abstract architectural scaling concept image ── */}
      <div className="absolute inset-0 -z-20 opacity-[0.09] mix-blend-overlay pointer-events-none select-none">
        <Image
          src="/images/architectural_scaling.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* ── Background: floating orbs ── */}
      <FloatingOrb
        className="pointer-events-none absolute -left-32 top-[-80px] h-[560px] w-[560px] rounded-full bg-emerald-600/10 blur-[130px]"
        delay={0}
        duration={9}
      />
      <FloatingOrb
        className="pointer-events-none absolute -right-24 bottom-[-60px] h-[480px] w-[480px] rounded-full bg-teal-500/10 blur-[120px]"
        delay={3}
        duration={11}
      />
      <FloatingOrb
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-700/40 blur-[80px]"
        delay={1.5}
        duration={13}
      />

      {/* Subtle grid over dark bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── Left: Typography-led mission statement ── */}
          <RevealOnScroll preset="fadeLeft" threshold={0.15} className="flex flex-col gap-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <Target className="h-3.5 w-3.5" />
              Our Mission
            </div>

            {/* Large display headline — the typographic centrepiece */}
            <h2
              id="our-goal-heading"
              className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl"
            >
              To make{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent">
                every brand
              </span>{" "}
              we touch a{" "}
              <em className="not-italic text-white/90">
                category leader.
              </em>
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
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-900/40"
            >
              Our Story
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
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
