"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Gauge,
  LayoutTemplate,
  Cloud,
  PartyPopper,
  Loader2,
} from "lucide-react";
import { CONTACT_INFO } from "../../data/contactInfo";
import Magnetic from "../ui/Magnetic";
import { SPRING } from "../motion/springs";

const SERVICES = [
  {
    id: "web-app",
    title: "Web App",
    desc: "Product UI, dashboards, and high-performance Next.js builds.",
    icon: Code2,
  },
  {
    id: "full-redesign",
    title: "Full Redesign",
    desc: "Brand, UX, and frontend overhaul for a premium relaunch.",
    icon: LayoutTemplate,
  },
  {
    id: "performance-audit",
    title: "Performance Audit",
    desc: "Lighthouse, Core Web Vitals, and conversion leak analysis.",
    icon: Gauge,
  },
  {
    id: "devops-pipeline",
    title: "DevOps / Pipeline",
    desc: "CI/CD, Docker, edge deploys, and zero-downtime shipping.",
    icon: Cloud,
  },
];

const BUDGETS = [
  {
    id: "1-3k",
    label: "$1k – $3k",
    hint: "Focused sprint or audit",
    range: [1000, 3000],
  },
  {
    id: "3-5k",
    label: "$3k – $5k",
    hint: "Full feature build",
    range: [3000, 5000],
  },
  {
    id: "5k-plus",
    label: "$5k+",
    hint: "Multi-phase scale system",
    range: [5000, 12000],
  },
];

const STEP_LABELS = ["Services", "Budget", "Details"];

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function ProgressRail({ step }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between gap-2">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <div key={label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-400"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <span
                className={`truncate text-[10px] font-semibold uppercase tracking-wider ${
                  active || done ? "text-slate-800" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={SPRING.snappy}
        />
      </div>
    </div>
  );
}

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: (i % 7) * 14 - 42,
        delay: (i % 8) * 0.04,
        rotate: (i * 37) % 360,
        color:
          i % 3 === 0
            ? "bg-emerald-400"
            : i % 3 === 1
              ? "bg-teal-400"
              : "bg-slate-800",
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute left-1/2 top-1/3 h-2 w-2 rounded-sm ${p.color}`}
          initial={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
          animate={{
            opacity: [1, 1, 0],
            y: [0, -40 - (p.id % 5) * 18, 90 + (p.id % 4) * 20],
            x: [0, p.x, p.x * 1.4],
            rotate: [0, p.rotate, p.rotate + 120],
            scale: [1, 1.1, 0.7],
          }}
          transition={{ duration: 1.4, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [serviceId, setServiceId] = useState(null);
  const [budgetId, setBudgetId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const nameOk = name.trim().length >= 2;
  const emailOk = isValidEmail(email.trim());
  const detailsOk = details.trim().length >= 10;

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const canContinue =
    (step === 1 && Boolean(serviceId)) ||
    (step === 2 && Boolean(budgetId)) ||
    (step === 3 && nameOk && emailOk && detailsOk);

  const resetPlanner = () => {
    setStep(1);
    setDirection(1);
    setServiceId(null);
    setBudgetId(null);
    setName("");
    setEmail("");
    setDetails("");
    setTouched({});
    setStatus("idle");
    setErrorMessage("");
  };

  const onSubmit = async () => {
    setTouched({ name: true, email: true, details: true });
    if (!nameOk || !emailOk || !detailsOk || !serviceId || !budgetId) return;

    setStatus("submitting");
    setErrorMessage("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    const service = SERVICES.find((s) => s.id === serviceId);
    const budget = BUDGETS.find((b) => b.id === budgetId);

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        `Form is not configured yet. Please email us at ${CONTACT_INFO.email}.`
      );
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Project Planner: ${name} — ${service?.title} (${budget?.label})`,
          from_name: "The Upward Scale Website",
          name,
          email,
          service: service?.title,
          budget: budget?.label,
          message: details,
        }),
      });

      const result = await response.json();
      if (response.status === 200 || result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "An error occurred while submitting your request."
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        "Unable to connect to the server. Please check your network and try again."
      );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-teal-100/40 blur-2xl" />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={SPRING.reveal}
            className="relative flex flex-col items-center py-10 text-center sm:py-14"
          >
            <ConfettiBurst />
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
              <PartyPopper className="h-7 w-7" />
            </div>
            <h3 className="relative z-10 mt-6 font-display text-2xl font-extrabold tracking-tight text-slate-900">
              Scope received — we&apos;re on it
            </h3>
            <p className="relative z-10 mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
              Thanks for walking through the planner. Our architects will review
              your scope and reply within 24 hours with a tailored roadmap.
            </p>
            <button
              type="button"
              onClick={resetPlanner}
              className="relative z-10 mt-8 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              Plan another project
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="planner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                  Project planner
                </p>
                <h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  Scope your next build
                </h2>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                Step {step} / 3
              </span>
            </div>

            <ProgressRail step={step} />

            {status === "error" ? (
              <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <div className="relative min-h-[280px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 ? (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SPRING.snappy}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  >
                    {SERVICES.map((svc) => {
                      const Icon = svc.icon;
                      const selected = serviceId === svc.id;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => setServiceId(svc.id)}
                          className={`group flex flex-col rounded-2xl border p-4 text-left transition-all ${
                            selected
                              ? "border-emerald-400 bg-emerald-50/80 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                          }`}
                        >
                          <span
                            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
                              selected
                                ? "border-emerald-300 bg-white text-emerald-600"
                                : "border-slate-200 bg-slate-50 text-slate-600"
                            }`}
                          >
                            <Icon className="h-5 w-5" strokeWidth={2} />
                          </span>
                          <span className="font-display text-sm font-extrabold tracking-tight text-slate-900">
                            {svc.title}
                          </span>
                          <span className="mt-1 text-xs leading-relaxed text-slate-500">
                            {svc.desc}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                ) : null}

                {step === 2 ? (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SPRING.snappy}
                    className="space-y-3"
                  >
                    <p className="text-sm leading-relaxed text-slate-600">
                      Choose the investment band that matches your timeline and
                      ambition.
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {BUDGETS.map((b) => {
                        const selected = budgetId === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBudgetId(b.id)}
                            className={`rounded-2xl border p-4 text-left transition-all ${
                              selected
                                ? "border-emerald-400 bg-emerald-50/80 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                            }`}
                          >
                            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
                              {b.label}
                            </span>
                            <span className="mt-1 block text-xs text-slate-500">
                              {b.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : null}

                {step === 3 ? (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SPRING.snappy}
                    className="space-y-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="planner-name"
                        className="text-sm font-semibold text-slate-900"
                      >
                        Full name
                      </label>
                      <input
                        id="planner-name"
                        type="text"
                        value={name}
                        disabled={status === "submitting"}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:outline-none focus:ring-4 ${
                          touched.name && !nameOk
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : nameOk
                              ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/10"
                              : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                        }`}
                      />
                      {touched.name && !nameOk ? (
                        <span className="text-xs font-medium text-red-600">
                          Enter at least 2 characters.
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="planner-email"
                        className="text-sm font-semibold text-slate-900"
                      >
                        Work email
                      </label>
                      <input
                        id="planner-email"
                        type="email"
                        value={email}
                        disabled={status === "submitting"}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:outline-none focus:ring-4 ${
                          touched.email && !emailOk
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : emailOk
                              ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/10"
                              : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                        }`}
                      />
                      {touched.email && !emailOk ? (
                        <span className="text-xs font-medium text-red-600">
                          Enter a valid email address.
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="planner-details"
                        className="text-sm font-semibold text-slate-900"
                      >
                        Brief project details
                      </label>
                      <textarea
                        id="planner-details"
                        rows={4}
                        value={details}
                        disabled={status === "submitting"}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, details: true }))
                        }
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Goals, timeline, stack preferences, must-haves..."
                        className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:outline-none focus:ring-4 ${
                          touched.details && !detailsOk
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : detailsOk
                              ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/10"
                              : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                        }`}
                      />
                      {touched.details && !detailsOk ? (
                        <span className="text-xs font-medium text-red-600">
                          Add at least 10 characters so we can scope accurately.
                        </span>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <motion.button
                type="button"
                disabled={step === 1 || status === "submitting"}
                onClick={() => goTo(step - 1)}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </motion.button>

              {step < 3 ? (
                <Magnetic>
                  <motion.button
                    type="button"
                    disabled={!canContinue}
                    onClick={() => goTo(step + 1)}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Magnetic>
              ) : (
                <Magnetic>
                  <motion.button
                    type="button"
                    disabled={!canContinue || status === "submitting"}
                    onClick={onSubmit}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit scope
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </Magnetic>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
