"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./reducedMotion";

const DIRECTION_OFFSET = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
};

export default function Reveal({
  children,
  width = "w-full",
  delay = 0.2,
  direction = "up",
  className = "",
  as = "div",
}) {
  const reduceMotion = usePrefersReducedMotion();
  const offset = DIRECTION_OFFSET[direction] ?? DIRECTION_OFFSET.up;
  const MotionTag = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as === "div" ? "div" : as;
    return (
      <Tag className={[width, className].filter(Boolean).join(" ")}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={[width, className].filter(Boolean).join(" ")}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
