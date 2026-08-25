"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Preset animation presets ─────────────────────────────────────────────────
const PRESETS = {
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function RevealOnScroll({
  children,
  preset = "fadeUp",
  delay = 0,
  duration = 0.65,
  threshold = 0.12,
  margin = "-60px",
  className = "",
  as = "div",
  variants,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin,
  });

  const activeVariants = variants ?? PRESETS[preset];
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={activeVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

// ─── Stagger container helper ─────────────────────────────────────────────────
export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  className = "",
  margin = "-60px",
  threshold = 0.08,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
