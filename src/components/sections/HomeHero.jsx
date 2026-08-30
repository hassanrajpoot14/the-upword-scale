"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DynamicServiceTitle from "../ui/DynamicServiceTitle";
import BookCallButton from "../booking/BookCallButton";
import ActionLink from "../ui/ActionLink";
import HeroCanvas from "../three/HeroCanvas";
import { SPRING, staggerContainer } from "../motion/springs";

const containerVariants = staggerContainer(0.1, 0.08);

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING.reveal,
  },
};

export default function HomeHero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#07110f]">
      {/* Ambient background — no canvas here */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#07110f] to-[#0B1120]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 70% 45%, rgba(16,185,129,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(20,184,166,0.12), transparent 55%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8FAF9] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-28 pt-28 sm:px-8 lg:grid-cols-2">
        {/* Left — copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          className="relative z-10 min-w-0"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400/90"
          >
            The Upward Scale
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.25rem] lg:leading-[1.05] xl:text-7xl"
          >
            <span className="heading-gradient-dark">Elite</span>{" "}
            <DynamicServiceTitle
              titles={[
                "Web Architecture",
                "AI Optimization",
                "SEO Strategy",
                "Brand Identity",
                "App Engineering",
                "Growth Systems",
              ]}
            />{" "}
            <span className="heading-gradient-dark">at Scale</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            High-performance architectures and premium interfaces engineered to
            turn ambitious brands into category leaders.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <BookCallButton
              magnetic
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Book Call
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </BookCallButton>
            <ActionLink
              href="/case-studies"
              magnetic
              magneticStrength={0.2}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-emerald-400/40 hover:bg-white/10"
            >
              View All Work
            </ActionLink>
          </motion.div>
        </motion.div>

        {/* Right — bounded 3D canvas */}
        <div className="relative z-0 h-[380px] w-full min-w-0 md:h-[500px] lg:h-[500px]">
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-emerald-500/5 blur-2xl" />
          <HeroCanvas className="h-full w-full overflow-hidden rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
