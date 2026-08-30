"use client";

import { motion } from "framer-motion";
import { SPRING } from "./springs";

/**
 * One-shot viewport reveal with weighted spring physics.
 */
export default function ScrollRevealSection({
  children,
  className = "",
  as = "section",
  delay = 0,
}) {
  const MotionTag = motion[as] || motion.section;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ ...SPRING.reveal, delay }}
    >
      {children}
    </MotionTag>
  );
}
