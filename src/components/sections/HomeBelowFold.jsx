"use client";

import dynamic from "next/dynamic";
import Reveal from "../motion/Reveal.jsx";
import LogoMarquee from "./LogoMarquee";
import TechStackMatrixSkeleton from "../ui/TechStackMatrixSkeleton";

const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), {
  loading: () => <SectionSkeleton />,
});
const OurGoal = dynamic(() => import("./OurGoal"), {
  loading: () => <SectionSkeleton />,
});
const ServicesSection = dynamic(() => import("./ServicesSection"), {
  loading: () => <SectionSkeleton />,
});
const HowWeWork = dynamic(() => import("./HowWeWork"), {
  loading: () => <SectionSkeleton />,
});
const TechStackMatrix = dynamic(() => import("./TechStackMatrix"), {
  loading: () => <TechStackMatrixSkeleton />,
});
const RoiCalculator = dynamic(() => import("./RoiCalculator"), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" aria-hidden>
      <div className="mx-auto h-8 w-48 animate-pulse rounded-full bg-slate-200/80" />
      <div className="mx-auto mt-6 h-4 max-w-xl animate-pulse rounded bg-slate-200/60" />
    </div>
  );
}

/**
 * Below-fold sections — one-shot whileInView reveals (no continuous scroll listeners).
 */
export default function HomeBelowFold() {
  return (
    <div className="relative bg-transparent">
      <LogoMarquee />

      <Reveal delay={0.1}>
        <WhyChooseUs />
      </Reveal>

      <Reveal delay={0.15}>
        <OurGoal />
      </Reveal>

      <Reveal delay={0.2}>
        <ServicesSection />
      </Reveal>

      <Reveal delay={0.25}>
        <TechStackMatrix />
      </Reveal>

      <Reveal delay={0.3}>
        <RoiCalculator />
      </Reveal>

      <HowWeWork />
    </div>
  );
}
