"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValueEvent } from "framer-motion";
import { SPRING } from "../motion/springs";

/**
 * Spring-animated numeric display for calculator outputs.
 */
export default function AnimatedCounter({
  value,
  format = (n) => Math.round(n).toLocaleString(),
  className = "",
}) {
  const spring = useSpring(value, { stiffness: 120, damping: 22 });
  const [display, setDisplay] = useState(() => format(value));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(format(v));
  });

  return (
    <motion.span className={className} layout transition={SPRING.snappy}>
      {display}
    </motion.span>
  );
}
