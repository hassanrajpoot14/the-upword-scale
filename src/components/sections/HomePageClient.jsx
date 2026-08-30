"use client";

import dynamic from "next/dynamic";

const HomeHero = dynamic(() => import("./HomeHero"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100svh] bg-[#07110f]" aria-hidden>
      <div className="mx-auto flex min-h-[100svh] max-w-7xl items-center px-4">
        <div className="h-10 w-64 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  ),
});

const HomeBelowFold = dynamic(() => import("./HomeBelowFold"), {
  loading: () => (
    <div className="bg-[#F8FAF9] py-24" aria-hidden>
      <div className="mx-auto h-8 w-40 animate-pulse rounded bg-slate-200" />
    </div>
  ),
});

export default function HomePageClient() {
  return (
    <>
      <HomeHero />
      <HomeBelowFold />
    </>
  );
}
