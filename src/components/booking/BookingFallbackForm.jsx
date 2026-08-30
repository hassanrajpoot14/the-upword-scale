"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { CONTACT_INFO } from "../../data/contactInfo";

const PROJECT_TYPES = [
  "Web Architecture",
  "AI Integration",
  "DevOps",
  "SaaS",
];

const inputClass =
  "w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20";

export default function BookingFallbackForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit =
    name.trim().length > 1 && emailOk && details.trim().length > 10;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        `Scheduling is being configured. Email us directly at ${CONTACT_INFO.email}.`
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
          subject: `Booking Request: ${name.trim()} — ${projectType}`,
          from_name: "The Upward Scale Website",
          name: name.trim(),
          email: email.trim(),
          project_type: projectType,
          message: details.trim(),
        }),
      });

      const result = await response.json();

      if (response.status === 200 || result.success) {
        setStatus("success");
        onSuccess?.();
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to reach the server. Check your connection and try again."
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-6 py-12 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        <p className="mt-4 text-base font-semibold text-white">
          Request sent successfully
        </p>
        <p className="mt-2 max-w-xs text-sm text-slate-400">
          We&apos;ll reply within one business day with available call slots.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-sm leading-relaxed text-slate-400">
        Share your project scope — we&apos;ll confirm a discovery call slot by
        email.
      </p>

      <div>
        <label
          htmlFor="booking-name"
          className="mb-1.5 block text-xs font-semibold text-slate-300"
        >
          Name
        </label>
        <input
          id="booking-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label
          htmlFor="booking-email"
          className="mb-1.5 block text-xs font-semibold text-slate-300"
        >
          Work Email
        </label>
        <input
          id="booking-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@company.com"
          required
        />
      </div>

      <div>
        <label
          htmlFor="booking-type"
          className="mb-1.5 block text-xs font-semibold text-slate-300"
        >
          Project Type / Scope
        </label>
        <select
          id="booking-type"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className={inputClass}
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="booking-details"
          className="mb-1.5 block text-xs font-semibold text-slate-300"
        >
          Project Details
        </label>
        <textarea
          id="booking-details"
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Timeline, goals, and any links we should review…"
          required
        />
      </div>

      <AnimatePresence>
        {errorMessage ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-rose-400"
            role="alert"
          >
            {errorMessage}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        whileHover={canSubmit ? { scale: 1.02 } : undefined}
        whileTap={canSubmit ? { scale: 0.98 } : undefined}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition enabled:hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Booking Request
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}
