"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ActionLink from "../ui/ActionLink";
import Reveal from "../motion/Reveal.jsx";
import RevealOnScroll, { StaggerReveal } from "../ui/RevealOnScroll";
import GlowIcon from "../ui/GlowIcon";
import TechGridBackground from "../visuals/TechGridBackground";
import GlowSpot from "../visuals/GlowSpot";
import { buttonBaseStyles, buttonVariantStyles } from "../ui/Button";

const HERO_METRICS = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<300ms", label: "LCP Average" },
  { value: "99+", label: "Lighthouse Score" },
  { value: "24/7", label: "Observability" },
];

export default function AboutPageClient() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <GlowSpot className="left-1/4 top-0 -z-10 opacity-50" size="lg" />
      <GlowSpot
        className="right-1/4 top-1/3 -z-10 opacity-35"
        color="teal"
        size="md"
      />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        {/* ── Hero: founder profile + studio intro ── */}
        <Reveal delay={0.1}>
        <section className="grid grid-cols-1 items-center gap-12 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
          {/* Left — profile image */}
          <Reveal direction="left" delay={0.15} className="order-1 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-2xl"
              />
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 light:border-slate-200 border-slate-800 dark:border-slate-800 shadow-2xl">
                <Image
                  src="/about-profile.png"
                  alt="Ali Hassan, Founder of The Upward Scale"
                  width={640}
                  height={640}
                  priority
                  className="aspect-square w-full object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                <div
                  aria-label="Ali Hassan, Founder and Director"
                  className="absolute bottom-4 left-4 z-10 w-fit rounded-xl border border-white/15 bg-slate-950/60 px-3.5 py-2 shadow-md backdrop-blur-md"
                >
                  <p className="text-xs font-semibold tracking-tight text-white sm:text-sm">
                    Ali Hassan
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse"
                    />
                    Founder &amp; Director
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — headline, copy, metrics, CTA */}
          <Reveal direction="right" delay={0.2} className="order-2 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 light:border-emerald-200/80 border-emerald-500/30 dark:border-emerald-500/30 bg-emerald-50 light:bg-emerald-50 bg-emerald-500/10 dark:bg-emerald-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 light:text-emerald-700 text-emerald-300 dark:text-emerald-300">
              About the Studio
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 light:text-slate-900 text-white dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Architects of High-Performance Digital Systems
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400 sm:text-lg">
              We engineer Next.js architectures, AI-native workflows, and
              DevOps pipelines that stay fast under real traffic — not just in
              demos.
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400">
              Every system we ship is tuned for Core Web Vitals, observability,
              and compounding growth from day one.
            </p>

            <Reveal delay={0.25}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {HERO_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-slate-200/80 light:border-slate-200/80 border-slate-800/80 dark:border-slate-800/80 bg-white/80 light:bg-white/80 bg-slate-900/80 dark:bg-slate-900/80 px-4 py-3.5 backdrop-blur-sm transition-colors duration-300"
                >
                  <p className="text-xl font-bold tracking-tight text-slate-900 light:text-slate-900 text-slate-100 dark:text-slate-100 sm:text-2xl">
                    {metric.value}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ActionLink
                href="/contact"
                magnetic
                className={`${buttonBaseStyles} ${buttonVariantStyles.primary}`}
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </ActionLink>
              <ActionLink
                href="/case-studies"
                className={`${buttonBaseStyles} ${buttonVariantStyles.secondary} border-slate-200 light:border-slate-200 border-slate-700 dark:border-slate-700 text-slate-900 light:text-slate-900 text-slate-100 dark:text-slate-100 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400`}
              >
                View Case Studies
              </ActionLink>
            </div>
          </Reveal>
        </section>
        </Reveal>

        <div className="mt-12 lg:mt-20">
          <RevealOnScroll
            preset="fadeUp"
            threshold={0.15}
            className="mx-auto max-w-3xl space-y-6"
          >
            <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
              Our Engineering Philosophy
            </h2>
            <p className="text-base leading-relaxed text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400">
              Every digital interface we assemble is built on a single,
              uncompromising premise:{" "}
              <strong className="text-slate-900 light:text-slate-900 text-slate-100 dark:text-slate-100">
                performance is the ultimate feature
              </strong>
              . From the initial system design to the final deployments, we
              construct platforms that operate at maximum velocity, securing
              immediate bounce reduction and higher search authority.
            </p>
            <p className="text-base leading-relaxed text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400">
              By deploying headless architectures, containerized microservices,
              and AI-native automation, we remove the technical debt that holds
              most organizations back.
            </p>

            <ul className="space-y-3 pt-4">
              {[
                "Lighthouse-first standards on all builds (99+ Core Web Vitals).",
                "Full-stack automation loops minimizing human operational overhead.",
                "Decoupled security schemas protecting sensitive customer databases.",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <GlowIcon size="sm">
                    <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                  </GlowIcon>
                  <span className="text-sm font-medium leading-relaxed text-slate-700 light:text-slate-700 text-slate-300 dark:text-slate-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>

        <section className="mt-28">
          <RevealOnScroll preset="fadeUp" className="mx-auto max-w-2xl text-center">
            <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
              Core Principles We Live By
            </h2>
            <p className="mt-4 text-sm text-slate-600 sm:text-base">
              The foundational convictions that guide our architecture and
              operations every day.
            </p>
          </RevealOnScroll>

          <StaggerReveal
            staggerDelay={0.08}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              {
                title: "Compounding Outcomes",
                desc: "We focus on solutions that continue to produce value long after the engagement ends. Our work is an investment, not a cost.",
              },
              {
                title: "Absolute Transparency",
                desc: "We hold ourselves accountable to real metrics. No vanity metrics or generic reports—just clear attribution dashboards.",
              },
              {
                title: "Velocity as a Habit",
                desc: "We build quickly, test rigorously, and scale safely. Speed is a competitive edge that we build directly into your code.",
              },
            ].map((prop, idx) => (
              <RevealOnScroll key={idx} staggerChild className="h-full">
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="card-glass h-full rounded-2xl p-8 hover:border-emerald-300"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    0{idx + 1}. Principle
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {prop.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {prop.desc}
                  </p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </StaggerReveal>
        </section>

        <RevealOnScroll preset="fadeUp" className="mt-28">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20">
            <TechGridBackground tone="dark" fade={false} className="opacity-50" />
            <GlowSpot className="-right-24 -top-24 opacity-80" size="md" />
            <GlowSpot
              className="-bottom-24 -left-24 opacity-60"
              color="teal"
              size="md"
            />

            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="heading-gradient-dark text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s Build Something Compounding
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
                Ready to align on architecture and start building your agency
                scaling engine?
              </p>
              <div className="mt-8 flex justify-center">
                <ActionLink
                  href="/contact"
                  magnetic
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Start Your Scale-Up
                  <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </main>
    </div>
  );
}
