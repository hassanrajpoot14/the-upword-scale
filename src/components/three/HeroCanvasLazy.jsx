"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("../three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="flex h-full w-full items-center justify-center"
    >
      <div className="h-40 w-40 rounded-full bg-emerald-400/15 blur-2xl" />
    </div>
  ),
});

export default function HeroCanvasLazy({ className = "" }) {
  return <HeroCanvas className={className} />;
}
