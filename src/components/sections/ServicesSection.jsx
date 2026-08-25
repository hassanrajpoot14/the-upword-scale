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
} from "lucide-react";
import { SERVICES_DATA } from "../../data/serviceData";
import RevealOnScroll, { StaggerReveal } from "../ui/RevealOnScroll";

const ICON_MAP = {
  "web-development": Code2,
  "ai-optimization": Cpu,
  "social-media-marketing": Share2,
  "gmb-optimization": MapPin,
  seo: Search,
  "app-development": Smartphone,
  "content-marketing": PenTool,
  "devops-cloud": Cloud,
  "brand-strategy": Target,
};

const SERVICE_COUNT = Object.keys(SERVICES_DATA).length;

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-emerald-100/50 blur-[110px]" />
        <div className="absolute top-1/3 right-0 h-[380px] w-[380px] rounded-full bg-teal-100/40 blur-[110px]" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-emerald-50/60 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll preset="fadeUp" threshold={0.25}>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              OUR EXPERTISE
            </div>

            <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              {SERVICE_COUNT} Core Disciplines, One Ecosystem
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A unified digital execution framework spanning engineering,
              intelligence, and growth — every discipline built to compound
              into a single, unstoppable system for your brand.
            </p>
          </div>
        </RevealOnScroll>

        <StaggerReveal
          staggerDelay={0.06}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {Object.values(SERVICES_DATA).map((service) => {
            const Icon = ICON_MAP[service.slug];
            return (
              <RevealOnScroll key={service.slug} preset="fadeUp" className="h-full">
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/10"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_0_1px_rgba(5,150,105,0.35),0_0_32px_rgba(5,150,105,0.18)] transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 transition-all duration-300 group-hover:bg-emerald-100 group-hover:shadow-[0_0_16px_rgba(5,150,105,0.35)]">
                    {Icon && <Icon className="h-6 w-6 text-emerald-600" />}
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm font-normal leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="group/link relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:text-emerald-600"
                  >
                    Learn more
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
