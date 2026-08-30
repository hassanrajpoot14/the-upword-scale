"use client";

import Link from "next/link";
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
  Palette,
  Boxes,
  Gauge,
} from "lucide-react";
import ActionLink from "../ui/ActionLink";
import BookCallButton from "../booking/BookCallButton";
import Reveal from "../motion/Reveal.jsx";
import { accentCardClasses, accentCardLgClasses, AccentBar } from "../ui/AccentCard";
import { SERVICES_DATA } from "../../data/serviceData";
import RevealOnScroll, { StaggerReveal } from "../ui/RevealOnScroll";
import GlowIcon from "../ui/GlowIcon";
import TechVisualPanel from "../visuals/TechVisualPanel";
import TechGridBackground from "../visuals/TechGridBackground";
import GlowSpot from "../visuals/GlowSpot";
import LiveSystemStatus from "../visuals/LiveSystemStatus";
import TechIconRow from "../ui/TechIconRow";
import { CORE_ECOSYSTEM, getServiceStack } from "../../data/techIcons";

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
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
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
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-10 h-[500px] w-[500px] max-w-full rounded-full bg-emerald-100/30 blur-[130px]" />
        <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] max-w-full rounded-full bg-teal-50/40 blur-[110px]" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        
        {/* 1. Hero Section */}
        <RevealOnScroll preset="fadeUp" threshold={0.1}>
          <section className="flex flex-col items-center text-center">
            <LiveSystemStatus tone="light" label="Precision capabilities · online" className="mb-1" />

            <h1 className="heading-gradient mt-6 max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              Nine Core Disciplines.<br />
              One Growth Ecosystem.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              We align high-performance web systems, vector AI automation, and technical marketing into a single, compounding lead engine for your brand.
            </p>

            <TechIconRow
              variant="strip"
              keys={CORE_ECOSYSTEM}
              size="md"
              className="mt-8"
            />

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <BookCallButton
                magnetic
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg"
              >
                Book Call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </BookCallButton>
              <ActionLink
                href="/services#grid"
                magnetic
                magneticStrength={0.2}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition-all duration-350 hover:bg-slate-50"
              >
                Explore Services
              </ActionLink>
            </div>
          </section>
        </RevealOnScroll>

        {/* Category anchors — targeted by the Services nav dropdown */}
        <section
          aria-label="Core capability areas"
          className="mt-24 grid scroll-mt-28 grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {[
            {
              id: "web-architecture",
              icon: Code2,
              title: "Web & Systems Architecture",
              body: "Scalable Next.js & React architectures engineered for performance, SEO, and long-term maintainability.",
              href: "/services/web-development",
            },
            {
              id: "ai-integration",
              icon: Cpu,
              title: "AI & ML Workflows",
              body: "Custom AI workflows, LLM pipelines, and automation layers that compound operational efficiency.",
              href: "/services/ai-optimization",
            },
            {
              id: "devops",
              icon: Cloud,
              title: "DevOps & Cloud Automation",
              body: "Docker, CI/CD automation, and hardened server environments built for reliable shipping at scale.",
              href: "/services/devops-cloud",
            },
            {
              id: "performance",
              icon: Gauge,
              title: "Performance & Core Web Vitals",
              body: "Core Web Vitals tuning and ultra-fast rendering pipelines that keep Lighthouse scores compounding.",
              href: "/services/web-development",
            },
            {
              id: "design",
              icon: Palette,
              title: "UI/UX & Product Design",
              body: "Product interfaces and design systems engineered to convert, clarify journeys, and scale with your brand.",
              href: "/services/brand-strategy",
            },
            {
              id: "mobile",
              icon: Smartphone,
              title: "Mobile & Cross-Platform",
              body: "Cross-platform mobile products with native feel, shared codebases, and resilient offline-ready flows.",
              href: "/services/app-development",
            },
            {
              id: "security",
              icon: ShieldCheck,
              title: "Security & Infrastructure Hardening",
              body: "Auth hardening, edge defenses, and infrastructure controls that protect systems without slowing delivery.",
              href: "/services/devops-cloud",
            },
            {
              id: "saas",
              icon: Boxes,
              title: "Custom SaaS Development",
              body: "Multi-tenant SaaS platforms with billing, roles, and operational tooling built for rapid product shipping.",
              href: "/services/web-development",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className={`${accentCardClasses} scroll-mt-28 p-6`}
              >
                <AccentBar />
                <div className="relative z-10">
                <GlowIcon>
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </GlowIcon>
                <h2 className="mt-4 text-base font-bold tracking-tight text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition hover:text-emerald-600"
                >
                  View details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                </div>
              </div>
            );
          })}
        </section>

        {/* 2. Services Grid */}
        <Reveal delay={0.1}>
        <section id="grid" className="mt-28 flex flex-col gap-12">
          <RevealOnScroll preset="fadeUp" threshold={0.25} className="text-center">
            <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
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
                <RevealOnScroll key={service.slug} staggerChild className="h-full">
                  <motion.div
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className={`${accentCardLgClasses} flex h-full flex-col p-8`}
                  >
                    <AccentBar />
                    <div className="relative z-10 flex h-full flex-col">
                    {/* Icon Wrapper */}
                    <GlowIcon>
                      {IconComponent && <IconComponent className="h-6 w-6" strokeWidth={2} />}
                    </GlowIcon>

                    {/* Content */}
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-955">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>

                    <div className="mt-5">
                      <TechIconRow
                        variant="builtWith"
                        keys={getServiceStack(service.slug)}
                        size="sm"
                      />
                    </div>

                    {/* Actions */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/link relative z-20 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-emerald-600 transition"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>

                    <Link href={`/services/${service.slug}`} className="absolute inset-0 z-10 rounded-3xl" />
                    </div>
                  </motion.div>
                </RevealOnScroll>
              );
            })}
          </StaggerReveal>
        </section>
        </Reveal>

        {/* 3. The Scale-Up Process */}
        <section className="mt-28 flex flex-col gap-12">
          <RevealOnScroll preset="fadeUp" threshold={0.25} className="text-center">
            <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
              The Scale-Up Process
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              A structured execution timeline built to compound leads and visual authority safely.
            </p>
          </RevealOnScroll>

          <StaggerReveal staggerDelay={0.08} className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((proc, i) => (
              <RevealOnScroll key={i} staggerChild className="h-full">
                <div className={`${accentCardClasses} flex h-full flex-col p-8`}>
                  <AccentBar />
                  <div className="relative z-10">
                  <span className="text-4xl font-extrabold text-slate-100">{proc.step}</span>
                  <h3 className="mt-5 text-base font-bold text-slate-900">{proc.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">{proc.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </StaggerReveal>
        </section>

        {/* 4. Architecting with Discipline */}
        <section className="relative mt-28 overflow-hidden rounded-3xl card-glass p-8 sm:p-12">
          <TechGridBackground tone="light" className="opacity-70" />
          <GlowSpot className="right-0 top-0 opacity-40" size="md" />
          <RevealOnScroll
            preset="fadeUp"
            threshold={0.2}
            className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
          >
            <div className="flex flex-col gap-8 lg:col-span-7">
              <div>
                <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
                  Architecting with Discipline
                </h2>
                <p className="mt-3 text-sm text-slate-600 sm:text-base">
                  We focus on absolute performance standards rather than simple
                  shortcuts.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {VALUE_PROPS.map((value, i) => {
                  const ValueIcon = value.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <GlowIcon size="sm">
                        <ValueIcon className="h-5 w-5" strokeWidth={2} />
                      </GlowIcon>
                      <div>
                        <h3 className="text-base font-bold text-slate-955">
                          {value.title}
                        </h3>
                        <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-slate-500">
                          {value.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="min-w-0 lg:col-span-5">
              <TechVisualPanel
                variant="infra"
                title="edge mesh"
                caption="High-speed edge CDN infrastructure"
                statusLabel="CDN + deploy healthy"
                compact
              />
            </div>
          </RevealOnScroll>
        </section>

        {/* 5. CTA Footer Block */}
        <RevealOnScroll preset="fadeUp" threshold={0.2}>
          <section className="relative mt-28 overflow-hidden rounded-3xl bg-slate-950 py-16 px-6 text-center shadow-xl sm:px-12 sm:py-20">
            {/* Neon layout mesh lights */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-24 -top-24 h-64 w-64 max-w-full rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -left-24 -bottom-24 h-64 w-64 max-w-full rounded-full bg-teal-500/10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="heading-gradient-dark text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Accelerate Your Velocity?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
                Connect with our digital architects to build a customized technical blueprint and design your scaling engine.
              </p>
              <div className="mt-8 flex justify-center">
                <ActionLink
                  href="/contact"
                  magnetic
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Initiate Alignments
                  <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>
              <TechIconRow
                variant="strip"
                keys={CORE_ECOSYSTEM}
                tone="dark"
                size="sm"
                className="mt-10 opacity-90"
              />
            </div>
          </section>
        </RevealOnScroll>

      </div>
    </div>
  );
}
