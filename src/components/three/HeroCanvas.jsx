"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroCanvasFallback />,
});

function HeroCanvasFallback() {
  return (
    <div
      aria-hidden
      className="flex h-full w-full items-center justify-center"
    >
      <div className="h-40 w-40 rounded-full bg-emerald-400/15 blur-2xl" />
      <div className="absolute h-28 w-28 rotate-12 rounded-[28%] border border-emerald-500/25" />
    </div>
  );
}

/**
 * Lazy WebGL gate — lives inside a bounded grid cell (not full-bleed).
 */
export default function HeroCanvas({ className = "" }) {
  const containerRef = useRef(null);
  const [canRender, setCanRender] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("experimental-webgl");
    setCanRender(!reduced && Boolean(gl));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative z-0 h-full w-full ${className}`}
    >
      {canRender ? <HeroScene active={isInView} /> : <HeroCanvasFallback />}
    </div>
  );
}
