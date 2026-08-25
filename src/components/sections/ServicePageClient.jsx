"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ServiceFaq from "./ServiceFaq";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicePageClient({ service }) {
  return (
    <div className="relative overflow-hidden bg-slate-50">
      {/* Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 50%, transparent 100%)",
        }}
      />

      {/* Decorative Blur Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-100/30 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-teal-50/40 blur-[100px]" />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-16 md:gap-24"
        >
          {/* 1. Hero Section */}
          <section className="flex flex-col items-center text-center">
            {/* Service Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 sm:text-sm"
            >
              Our Solutions Hub
            </motion.div>

            {/* Service Title */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
            >
              {service.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-lg font-medium text-emerald-600 sm:text-xl"
            >
              {service.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {service.overview}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg"
              >
                Schedule a Consultation
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50"
              >
                All Services
              </Link>
            </motion.div>
          </section>

          {/* 2. Metrics Strip */}
          {service.metrics && service.metrics.length > 0 && (
            <motion.section
              variants={itemVariants}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm backdrop-blur-sm sm:p-12"
            >
              <div className="grid grid-cols-1 gap-8 divide-y divide-slate-100 md:grid-cols-3 md:divide-y-0 md:divide-x">
                {service.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col items-center text-center md:px-4 first:pl-0 last:pr-0">
                    <span className="text-4xl font-extrabold tracking-tight text-emerald-600 sm:text-5xl">
                      {metric.value}
                    </span>
                    <span className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* 3. Key Benefits */}
          <section className="flex flex-col gap-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Key Benefits
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                Why this discipline is essential for compounding your brand's digital growth.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {service.keyBenefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-slate-900">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. Features & Core Deliverables */}
          <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Core Deliverables & Scope
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                We manage everything from technical blueprinting to final execution. Here is a baseline summary of what is included in our dynamic implementation roadmap:
              </p>
              <div className="mt-8 flex">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Request custom scope adjustments
                  <svg
                    className="h-4 w-4"
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
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <ul className="space-y-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-slate-700 sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 5. Process Roadmap */}
          <section className="flex flex-col gap-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                The Scale-Up Process
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                How we take your brand from strategic audit to dynamic launch.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {service.process.map((step, i) => (
                <div key={i} className="relative flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                  <span className="text-3xl font-extrabold text-slate-100">{step.step}</span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. FAQs Accordion */}
          <section className="flex flex-col gap-12 rounded-2xl border border-slate-100 bg-white py-12 px-6 shadow-sm sm:px-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                Answers to common inquiries about our {service.title} services.
              </p>
            </div>

            <ServiceFaq faqs={service.faqs} />
          </section>
        </motion.div>
      </main>
    </div>
  );
}
