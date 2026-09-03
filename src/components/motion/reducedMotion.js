/**
 * Shared reduced-motion helpers for Framer Motion.
 * Prefer these over raw motion props so animations collapse when the user
 * requests reduced motion.
 */
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

export function usePrefersReducedMotion() {
  const framer = useFramerReducedMotion();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMatches(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return Boolean(framer || matches);
}

/** Instant transition when reduced motion is preferred. */
export function motionTransition(preferred, fallback) {
  if (preferred) return { duration: 0 };
  return fallback;
}

/** Zero-offset variants when reduced motion is preferred. */
export function revealVariants(preferred, offset = { y: 28 }) {
  if (preferred) {
    return {
      hidden: { opacity: 1, x: 0, y: 0 },
      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
}
