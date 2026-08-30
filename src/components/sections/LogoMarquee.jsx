"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Vercel",
  "Docker",
  "AWS",
  "PostgreSQL",
  "OpenAI",
  "Stripe",
  "Shopify",
];

const CLIENT_LOGOS = [
  "NexaFlow",
  "Vertex Commerce",
  "Medral Health",
  "Arkade Studio",
  "Trailr",
  "Synapse",
  "Pulse Analytics",
  "Northwind Labs",
];

const TRUST_STATS = [
  { value: "99+", label: "Lighthouse" },
  { value: "99.99%", label: "Uptime" },
  { value: "50+", label: "Shipped builds" },
];

function MarqueeTrack({ items, renderItem, duration = 20, reverse = false }) {
  const loop = [...items, ...items];

  return (
    <motion.div
      className="flex w-max items-center gap-10 sm:gap-14"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear",
        },
      }}
    >
      {loop.map((item, i) => renderItem(item, i))}
    </motion.div>
  );
}

function TechItem({ label }) {
  return (
    <span className="inline-flex shrink-0 select-none items-center gap-2 font-display text-sm font-extrabold tracking-tight text-slate-400 transition-colors duration-200 hover:text-slate-800 dark:hover:text-slate-200 sm:text-base">
      <span
        aria-hidden
        className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-700 dark:bg-slate-800"
      >
        {label.slice(0, 2)}
      </span>
      {label}
    </span>
  );
}

function ClientItem({ label }) {
  return (
    <span className="inline-flex shrink-0 select-none items-center gap-2 font-display text-sm font-extrabold tracking-tight text-slate-400 transition-colors duration-200 hover:text-slate-800 dark:hover:text-slate-200 sm:text-base">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
      {label}
    </span>
  );
}

function EdgeFade() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50 dark:from-[#0B1120] dark:via-transparent dark:to-[#0B1120]"
    />
  );
}

/**
 * Infinite horizontal trust / tech-stack ticker with edge fade masks.
 */
export default function LogoMarquee({
  className = "",
  label = "Trusted stacks & partners",
}) {
  return (
    <section
      className={`relative overflow-hidden border-y border-slate-200/70 bg-transparent py-10 sm:py-12 ${className}`}
      aria-label="Technology and partner logos"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {label}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-xl">
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative space-y-4">
        <div className="relative overflow-hidden py-1">
          <MarqueeTrack
            items={TECH_STACK}
            duration={20}
            renderItem={(item, i) => (
              <TechItem key={`tech-${item}-${i}`} label={item} />
            )}
          />
          <EdgeFade />
        </div>

        <div className="relative overflow-hidden py-1">
          <MarqueeTrack
            items={CLIENT_LOGOS}
            duration={24}
            reverse
            renderItem={(item, i) => (
              <ClientItem key={`client-${item}-${i}`} label={item} />
            )}
          />
          <EdgeFade />
        </div>
      </div>
    </section>
  );
}
