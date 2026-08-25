"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Share2,
  MapPin,
  Search,
  Smartphone,
  PenTool,
  Cloud,
  Target,
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { SERVICES_DATA } from "../../data/serviceData";
import RevealOnScroll, { StaggerReveal } from "../ui/RevealOnScroll";

// Icon mapping based on service slugs
const ICON_MAP = {
  "web-development": Code2,
  "ai-optimization": Cpu,
  "social-media-marketing": Share2,
  "gmb-optimization": MapPin,
  "seo": Search,
  "app-development": Smartphone,
  "content-marketing": PenTool,
  "devops-cloud": Cloud,
  "brand-strategy": Target,
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "System Audit",
    desc: "We analyze your site vitals, core support bottlenecks, and local footprint profiles to identify conversion leaks.",
  },
  {
    step: "02",
    title: "Growth Blueprint",
    desc: "We design a custom execution schema covering tech architecture, keyword clusters, and automation endpoints.",
  },
  {
    step: "03",
    title: "Precision Launch",
    desc: "Our engineers implement headless architectures, prompt embeddings, and ad account systems cleanly.",
  },
  {
    step: "04",
    title: "Continuous Tuning",
    desc: "We audit core web vitals, execute link acquisition outreach, and adjust budgets based on attribution dashboards.",
  },
];

const VALUE_PROPS = [
  {
    icon: Zap,
    title: "Vitals-First Execution",
    desc: "Every web page is engineered to score 99+ on Google Lighthouse parameters, improving indexing and bounce rates.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security Hardening",
    desc: "Headless Decoupled static generation separates your frontend from administrative access, making hacking impossible.",
  },
  {
    icon: TrendingUp,
    title: "Compounding Lead Returns",
    desc: "We focus on content clusters and GMB citers to build permanent organic traffic assets that lower CAC.",
  },
];

export default function ServicesPageClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Decorative tech grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Decorative ambient light leaks */}
      <div className="pointer-events-none absolute left-1/3 top-10 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-100/30 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-teal-50/40 blur-[110px]" />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        
        {/* 1. Hero Section */}
        <RevealOnScroll preset="fadeUp" threshold={0.1}>
          <section className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Precision Capabilities
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Nine Core Disciplines.<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                One Growth Ecosystem.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              We align high-performance web systems, vector AI automation, and technical marketing into a single, compounding lead engine for your brand.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg"
              >
                Book an Alignment Call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#grid"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition-all duration-350 hover:bg-slate-50"
              >
                Explore Capabilities
              </Link>
            </div>
          </section>
        </RevealOnScroll>

        {/* 2. Services Grid */}
        <section id="grid" className="mt-28 flex flex-col gap-12">
          <RevealOnScroll preset="fadeUp" threshold={0.25} className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Solutions Catalog
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Explore the detailed technical scope of our digital delivery components.
            </p>
          </RevealOnScroll>

          <StaggerReveal
            staggerDelay={0.06}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {Object.values(SERVICES_DATA).map((service) => {
              const IconComponent = ICON_MAP[service.slug];
              return (
                <RevealOnScroll key={service.slug} preset="fadeUp" className="h-full">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group relative flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5"
                  >
                    {/* Icon Wrapper */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all group-hover:bg-emerald-100 group-hover:shadow-[0_0_16px_rgba(5,150,105,0.2)]">
                      {IconComponent && <IconComponent className="h-6 w-6" />}
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-955">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>

                    {/* Actions */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/link relative z-20 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-emerald-600 transition"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>

                    <Link href={`/services/${service.slug}`} className="absolute inset-0 z-10 rounded-3xl" />
                  </motion.div>
                </RevealOnScroll>
              );
            })}
          </StaggerReveal>
        </section>

        {/* 3. The Scale-Up Process */}
        <section className="mt-28 flex flex-col gap-12">
          <RevealOnScroll preset="fadeUp" threshold={0.25} className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The Scale-Up Process
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              A structured execution timeline built to compound leads and visual authority safely.
            </p>
          </RevealOnScroll>

          <StaggerReveal staggerDelay={0.08} className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((proc, i) => (
              <RevealOnScroll key={i} preset="fadeUp" className="h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                  <span className="text-4xl font-extrabold text-slate-100">{proc.step}</span>
                  <h3 className="mt-5 text-base font-bold text-slate-900">{proc.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">{proc.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </StaggerReveal>
        </section>

        {/* 4. Architecting with Discipline (Featuring Server Rack Image) */}
        <section className="mt-28 rounded-3xl border border-slate-100 bg-white/70 p-8 shadow-sm backdrop-blur-sm sm:p-12">
          <RevealOnScroll preset="fadeUp" threshold={0.2} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            {/* Value Props side */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Architecting with Discipline
                </h2>
                <p className="mt-3 text-sm text-slate-600 sm:text-base">
                  We focus on absolute performance standards rather than simple shortcuts.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {VALUE_PROPS.map((value, i) => {
                  const ValueIcon = value.icon;
                  return (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <ValueIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-955">{value.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 max-w-xl">{value.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Server Rack image side */}
            <div className="lg:col-span-5">
              <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5 shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950">
                  <Image
                    src="/images/server_rack_cloud.png"
                    alt="Clean server rack cloud infrastructure environment"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 px-1 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Security & Scale</p>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">High-Speed Edge CDN Infrastructure</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* 5. CTA Footer Block */}
        <RevealOnScroll preset="fadeUp" threshold={0.2}>
          <section className="relative mt-28 overflow-hidden rounded-3xl bg-slate-950 py-16 px-6 text-center shadow-xl sm:px-12 sm:py-20">
            {/* Neon layout mesh lights */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Accelerate Your Velocity?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
                Connect with our digital architects to build a customized technical blueprint and design your scaling engine.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Initiate Alignments
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </RevealOnScroll>

      </main>
    </div>
  );
}
