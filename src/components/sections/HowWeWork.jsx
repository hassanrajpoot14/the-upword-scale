"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Search,
  DraftingCompass,
  Code2,
  Rocket,
  ChevronDown,
  Clock,
} from "lucide-react";
import { SPRING } from "../motion/springs";

const STEPS = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    summary:
      "Align on goals, constraints, and success metrics before a single line of code.",
    icon: Search,
    timeline: "3–5 days",
    deliverables: [
      "Stakeholder workshops & KPI map",
      "Competitive / UX teardown",
      "Technical risk register",
      "Scoped statement of work",
    ],
    stack: ["FigJam", "Notion", "Analytics", "Lighthouse"],
  },
  {
    id: "architecture",
    number: "02",
    title: "Architecture",
    summary:
      "Blueprints for data, APIs, rendering strategy, and deployment topology.",
    icon: DraftingCompass,
    timeline: "1–2 weeks",
    deliverables: [
      "System & sequence diagrams",
      "API contracts & schema drafts",
      "Performance budget",
      "CI/CD skeleton",
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Edge CDN"],
  },
  {
    id: "development",
    number: "03",
    title: "Development",
    summary:
      "Ship vertical slices with design QA, accessibility, and vitals gates.",
    icon: Code2,
    timeline: "2–6 weeks",
    deliverables: [
      "Feature slices behind feature flags",
      "Component library & tokens",
      "Automated tests & a11y checks",
      "Weekly demo builds",
    ],
    stack: ["React 19", "Tailwind", "Playwright", "Vercel"],
  },
  {
    id: "deployment",
    number: "04",
    title: "Deployment",
    summary:
      "Zero-downtime releases, observability, and a clear handoff runway.",
    icon: Rocket,
    timeline: "2–4 days",
    deliverables: [
      "Blue-green / canary rollout",
      "Monitoring & alert runbooks",
      "Docs & Loom walkthroughs",
      "30-day hypercare window",
    ],
    stack: ["Docker", "GitHub Actions", "Sentry", "Uptime"],
  },
];

function StepCard({ step, isOpen, onToggle, onHoverStart, onHoverEnd }) {
  const Icon = step.icon;

  return (
    <motion.article
      layout
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={`relative rounded-2xl border bg-white/85 backdrop-blur-sm transition-shadow ${
        isOpen
          ? "border-emerald-300/80 shadow-lg shadow-emerald-500/10"
          : "border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-4 p-5 text-left sm:gap-5 sm:p-6"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 sm:h-12 sm:w-12">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              {step.title}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-500">
              <Clock className="h-3 w-3" />
              {step.timeline}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {step.summary}
          </p>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={SPRING.snappy}
          className="mt-1 shrink-0 text-slate-400"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING.snappy}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Deliverables
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {step.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Tech stack
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {step.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Estimated timeline
                  </p>
                  <p className="mt-1.5 font-display text-base font-extrabold tracking-tight text-slate-900">
                    {step.timeline}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export default function HowWeWork() {
  const trackRef = useRef(null);
  const [activeId, setActiveId] = useState("discovery");
  const [hoveredId, setHoveredId] = useState(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  const openId = hoveredId ?? activeId;

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-emerald-50/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
            How we work
          </p>
          <h2 className="heading-gradient mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            From discovery to deployment
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            A transparent four-phase workflow. Hover or click a step to see
            deliverables, stack, and timeline.
          </p>
        </div>

        <div
          ref={trackRef}
          className="relative mx-auto mt-14 max-w-3xl pl-2 sm:mt-16 sm:pl-0"
        >
          {/* Vertical track */}
          <div
            aria-hidden
            className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-slate-200 sm:left-[1.625rem]"
          >
            <motion.div
              className="origin-top w-full bg-gradient-to-b from-emerald-500 via-teal-400 to-slate-800"
              style={{ scaleY: progress, height: "100%" }}
            />
          </div>

          <ol className="relative space-y-8 sm:space-y-10">
            {STEPS.map((step) => {
              const isOpen = openId === step.id;
              return (
                <li key={step.id} className="relative flex gap-4 sm:gap-6">
                  <div className="relative z-10 flex shrink-0 flex-col items-center pt-5">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 font-mono text-xs font-bold text-white shadow-md sm:h-12 sm:w-12 sm:text-sm ${
                        isOpen ? "ring-2 ring-emerald-400 ring-offset-2" : ""
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <StepCard
                      step={step}
                      isOpen={isOpen}
                      onToggle={() =>
                        setActiveId((prev) =>
                          prev === step.id && !hoveredId ? null : step.id
                        )
                      }
                      onHoverStart={() => setHoveredId(step.id)}
                      onHoverEnd={() => setHoveredId(null)}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
