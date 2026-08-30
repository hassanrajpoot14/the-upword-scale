"use client";

import { ArrowRight } from "lucide-react";
import ActionLink from "../ui/ActionLink";
import Reveal from "../motion/Reveal.jsx";
import RevealOnScroll, { StaggerReveal } from "../ui/RevealOnScroll";
import SpotlightCard from "../visuals/SpotlightCard";
import MicroUiScale from "../ui/MicroUiScale";
import AspectSlot from "../ui/AspectSlot";
import MiniCodePreview from "../visuals/MiniCodePreview";
import MiniLighthouseGauge from "../visuals/MiniLighthouseGauge";
import MiniDeployStatus from "../visuals/MiniDeployStatus";
import { SERVICES_DATA } from "../../data/serviceData";

const SHOWCASE = [
  {
    slug: "web-development",
    eyebrow: "Web Architecture",
    title: SERVICES_DATA["web-development"].title,
    description: SERVICES_DATA["web-development"].description,
    tags: ["#NextJS", "#Tailwind", "#TypeScript"],
    visual: "code",
  },
  {
    slug: "ai-optimization",
    eyebrow: "AI / Performance",
    title: "AI-Driven Performance Systems",
    description:
      "Live vitals monitoring, predictive optimization, and AI agents that keep Lighthouse scores compounding in the green.",
    tags: ["#Lighthouse", "#AI", "#CWV"],
    visual: "gauge",
  },
  {
    slug: "devops-cloud",
    eyebrow: "DevOps / Deployment",
    title: SERVICES_DATA["devops-cloud"].title,
    description: SERVICES_DATA["devops-cloud"].description,
    tags: ["#Docker", "#CI/CD", "#Edge"],
    visual: "deploy",
  },
];

function VisualSlot({ type }) {
  const visual =
    type === "code" ? (
      <MiniCodePreview className="h-full min-h-0" />
    ) : type === "gauge" ? (
      <MiniLighthouseGauge className="h-full" />
    ) : (
      <MiniDeployStatus className="h-full" />
    );

  return (
    <AspectSlot ratio="16/10" className="min-h-[148px]">
      <MicroUiScale className="flex h-full min-w-0 items-stretch">
        {visual}
      </MicroUiScale>
    </AspectSlot>
  );
}

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] max-w-full rounded-full bg-emerald-100/50 blur-[110px]" />
        <div className="pointer-events-none absolute top-1/3 right-0 h-[380px] w-[380px] max-w-full rounded-full bg-teal-100/40 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.1}>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              OUR EXPERTISE
            </div>

            <h2 className="heading-gradient mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Interactive systems, live in the light
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Three flagship capabilities — each card ships with a live micro-UI
              so you can feel the product before you ship it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
        <StaggerReveal
          staggerDelay={0.1}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {SHOWCASE.map((card) => (
            <RevealOnScroll
              key={card.slug}
              staggerChild
              className="h-full"
            >
              <SpotlightCard className="flex h-full flex-col p-5 sm:p-6">
                <VisualSlot type={card.visual} />

                <p className="mt-5 text-[11px] font-bold uppercase tracking-widest text-emerald-600">
                  {card.eyebrow}
                </p>

                <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 transition-colors duration-300 group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ActionLink
                  href={`/services/${card.slug}`}
                  className="group/link relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:text-emerald-600"
                >
                  Explore capability
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
                </ActionLink>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </StaggerReveal>
        </Reveal>

        <RevealOnScroll preset="fadeUp" delay={0.08} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ActionLink
            href="/services"
            magnetic
            magneticStrength={0.22}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-colors duration-300 hover:border-emerald-300 hover:text-emerald-700"
          >
            Explore Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </ActionLink>
          <ActionLink
            href="/blogs"
            magnetic
            magneticStrength={0.18}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-colors duration-300 hover:border-emerald-300 hover:text-emerald-700"
          >
            Read Articles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </ActionLink>
        </RevealOnScroll>
      </div>
    </section>
  );
}
