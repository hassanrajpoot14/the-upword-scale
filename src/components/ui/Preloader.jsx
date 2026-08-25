"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Individual skeleton shimmer bar ─────────────────────────────────────────
function SkeletonBar({
  width = "100%",
  height = "h-3",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.6 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ width, transformOrigin: "left" }}
      className={`${height} overflow-hidden rounded-full bg-white/[0.06]`}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "linear",
          delay,
        }}
      />
    </motion.div>
  );
}

// ─── Skeleton card block ──────────────────────────────────────────────────────
function SkeletonCard({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
    >
      <SkeletonBar height="h-2" width="40%" delay={delay + 0.05} />
      <SkeletonBar height="h-4" width="80%" delay={delay + 0.1} />
      <SkeletonBar height="h-2.5" width="65%" delay={delay + 0.15} />
      <SkeletonBar height="h-2.5" width="55%" delay={delay + 0.18} />
      <div className="mt-2 flex gap-2">
        <SkeletonBar height="h-6" width="30%" delay={delay + 0.22} />
        <SkeletonBar height="h-6" width="20%" delay={delay + 0.25} />
      </div>
    </motion.div>
  );
}

// ─── Top progress bar ─────────────────────────────────────────────────────────
function ProgressBar({ done }) {
  return (
    <div className="absolute inset-x-0 top-0 h-[2px] bg-white/[0.06]">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400"
        initial={{ width: "0%" }}
        animate={{ width: done ? "100%" : "85%" }}
        transition={
          done
            ? { duration: 0.25, ease: "easeOut" }
            : { duration: 1.6, ease: [0.33, 1, 0.68, 1] }
        }
      />
    </div>
  );
}

// ─── Main Preloader component ─────────────────────────────────────────────────
export default function Preloader() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Mark skeleton "complete" after a short display window
    const doneTimer = setTimeout(() => setReady(true), 900);
    // Fully unmount after exit animation completes
    const hideTimer = setTimeout(() => setVisible(false), 1500);
    return () => {
      clearTimeout(doneTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            filter: "blur(6px)",
            transition: { duration: 0.55, ease: [0.55, 0, 1, 0.45] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#0B1120" }}
          aria-hidden="true"
          aria-label="Loading"
        >
          {/* Ambient glow orbs */}
          <div className="pointer-events-none absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.06] blur-[120px]" />
          <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-teal-500/[0.06] blur-[100px]" />

          {/* Progress bar */}
          <ProgressBar done={ready} />

          {/* Centered dashboard skeleton */}
          <div className="relative w-full max-w-3xl px-6">
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 flex items-center gap-3"
            >
              {/* Logo mark */}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-900/40">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold tracking-wide text-white/90">
                  The Upward Scale
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">
                  Loading workspace
                </span>
              </div>
            </motion.div>

            {/* Top stat row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 grid grid-cols-3 gap-3"
            >
              {[
                { label: "Projects", value: "40+" },
                { label: "Revenue", value: "$3.2M+" },
                { label: "Retention", value: "98%" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.03] py-4"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.08 }}
                    className="text-lg font-extrabold text-white/80"
                  >
                    {s.value}
                  </motion.span>
                  <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/25">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Skeleton cards row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <SkeletonCard delay={0.2} />
              <SkeletonCard delay={0.32} />
              <SkeletonCard delay={0.44} />
            </div>

            {/* Bottom status bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                />
                <span className="text-[11px] font-medium text-white/30">
                  {ready ? "Ready" : "Initialising systems…"}
                </span>
              </div>
              <span className="text-[11px] font-medium tabular-nums text-white/20">
                v1.0
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
