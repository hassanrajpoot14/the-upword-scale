"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DynamicServiceTitle from "../ui/DynamicServiceTitle";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeHero() {
  return (
    <div className="relative overflow-hidden bg-slate-50">
      {/* Tech grid overlay with radial fade mask */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Soft ambient glow accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />

      <section className="relative mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 md:pt-32 md:pb-28 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Mini badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            Empowering Next-Gen Digital Systems
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            We Deliver Elite{" "}
            <DynamicServiceTitle
              titles={[
                "Web Architecture",
                "AI Optimization",
                "SEO Strategy",
                "Brand Identity",
                "App Engineering",
                "Growth Systems",
              ]}
            />
            {" "}at Scale
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            We engineer high-performance architectures, elite marketing software, and premium user
            interfaces that turn ambitious brands into category leaders — built for speed, precision,
            and measurable growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600"
            >
              Start Your Scale-Up
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
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/60"
            >
              <svg
                className="h-4 w-4 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              View Case Studies
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-3"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Trusted by ambitious teams across industries
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-400">
              <span className="text-sm font-semibold tracking-wide">NORTHBEAM</span>
              <span className="text-sm font-semibold tracking-wide">VERTEX LABS</span>
              <span className="text-sm font-semibold tracking-wide">CASCADE</span>
              <span className="text-sm font-semibold tracking-wide">ORBIT CO</span>
              <span className="text-sm font-semibold tracking-wide">SUMMIT</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
