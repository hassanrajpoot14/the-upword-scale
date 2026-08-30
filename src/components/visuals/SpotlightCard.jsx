"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { HOVER_LIFT, SPRING } from "../motion/springs";

/**
 * Cursor-following light spotlight for feature cards.
 * Mouse coords update via rAF + motion values (no React setState / layout thrash).
 */
export function useSpotlight() {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);
  const opacitySpring = useSpring(opacity, { stiffness: 220, damping: 28 });

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(226, 232, 240, 0.6), transparent 40%)`;

  const onMouseMove = (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    });
  };

  const onMouseEnter = () => opacity.set(1);
  const onMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    opacity.set(0);
  };

  return {
    ref,
    background,
    opacity: opacitySpring,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  };
}

/** Overlay-only layer — drop inside any relative overflow-hidden card. */
export function SpotlightOverlay({ background, opacity }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background, opacity }}
    />
  );
}

/**
 * Light card with mouse-following slate spotlight + spring hover lift.
 */
export default function SpotlightCard({
  children,
  className = "",
  lift = true,
}) {
  const spotlight = useSpotlight();

  return (
    <motion.div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      onMouseEnter={spotlight.onMouseEnter}
      onMouseLeave={spotlight.onMouseLeave}
      whileHover={lift ? HOVER_LIFT : undefined}
      transition={SPRING.hover}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.1)] ${className}`}
    >
      <SpotlightOverlay
        background={spotlight.background}
        opacity={spotlight.opacity}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
