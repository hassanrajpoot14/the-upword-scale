"use client";

import { motion } from "framer-motion";
import { SPRING, staggerContainer, revealChild } from "../motion/springs";
import { usePrefersReducedMotion } from "../motion/reducedMotion";

const PRESETS = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

/**
 * Viewport reveal with physics spring.
 * Pass staggerChild when nested inside StaggerReveal so the parent owns timing.
 */
export default function RevealOnScroll({
  children,
  preset = "fadeUp",
  delay = 0,
  threshold = 0.1,
  margin = "-40px",
  className = "",
  as = "div",
  variants,
  staggerChild = false,
}) {
  const reduceMotion = usePrefersReducedMotion();
  const Tag = as === "div" ? "div" : as;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const activeVariants =
    variants ?? (staggerChild ? revealChild : PRESETS[preset]);
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      variants={activeVariants}
      {...(staggerChild
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: threshold, margin },
            transition: { ...SPRING.reveal, delay },
          })}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger container — children with staggerChild / reveal variants animate in sequence.
 */
export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.04,
  className = "",
  margin = "-60px",
  threshold = 0.08,
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin }}
      variants={staggerContainer(staggerDelay, delayChildren)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
