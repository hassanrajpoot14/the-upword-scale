"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import RevealOnScroll, { StaggerReveal } from "../ui/RevealOnScroll";

export default function AboutPageClient() {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-50/50 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-teal-50/40 blur-[100px]" />
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        {/* Hero header */}
        <RevealOnScroll preset="fadeUp" threshold={0.1}>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              WHO WE ARE
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Architects of High-Performance{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Digital Systems
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              We are an elite, agile team of systems architects, optimization engineers, and growth strategists. 
              We don't do standard deliverables; we engineer cohesive growth systems designed to turn category competitors into permanent market leaders.
            </p>
          </div>
        </RevealOnScroll>

        {/* Core Profile Grid */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Typographic side */}
          <RevealOnScroll preset="fadeLeft" threshold={0.15} className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Our Engineering Philosophy
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Every digital interface we assemble is built on a single, uncompromising premise: <strong>performance is the ultimate feature</strong>. 
              From the initial system design to the final deployments, we construct platforms that operate at maximum velocity, securing immediate bounce reduction and higher search authority.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              By deploying headless architectures, containerized microservices, and AI-native automation, we remove the technical debt that holds most organizations back.
            </p>

            {/* List items */}
            <ul className="space-y-3 pt-4">
              {[
                "Lighthouse-first standards on all builds (99+ Core Web Vitals).",
                "Full-stack automation loops minimizing human operational overhead.",
                "Decoupled security schemas protecting sensitive customer databases.",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Image Showcase Side */}
          <RevealOnScroll preset="fadeRight" threshold={0.15} className="lg:col-span-5">
            <div className="relative group overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/images/developer_workspace.png"
                  alt="Sleek minimalist developer workspace desk setup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="mt-4 px-2 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Design & Execution</p>
                <p className="text-sm font-bold text-slate-800 mt-1">Minimalist Workspace, Maximum Output</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Staggered values section */}
        <section className="mt-28">
          <RevealOnScroll preset="fadeUp" className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Core Principles We Live By
            </h2>
            <p className="mt-4 text-sm text-slate-600 sm:text-base">
              The foundational convictions that guide our architecture and operations every day.
            </p>
          </RevealOnScroll>

          <StaggerReveal staggerDelay={0.08} className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
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
              <RevealOnScroll key={idx} preset="fadeUp" className="h-full">
                <div className="h-full rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300">
                  <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">0{idx + 1}. Principle</span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{prop.title}</h3>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">{prop.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </StaggerReveal>
        </section>

        {/* CTA Footer block */}
        <RevealOnScroll preset="fadeUp" className="mt-28">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 py-16 px-6 text-center shadow-xl sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let's Build Something Compounding
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
                Ready to align on architecture and start building your agency scaling engine?
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Start Your Scale-Up
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </main>
    </div>
  );
}
