"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_INFO } from "../../data/contactInfo";

// Zod validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  serviceType: z.enum([
    "web-development",
    "ai-optimization",
    "social-media-marketing",
    "gmb-optimization",
    "seo",
    "app-development",
    "content-marketing",
    "devops-cloud",
    "brand-strategy",
    "general",
  ], {
    message: "Please select a valid service option.",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
});

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "web-development",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmissionStatus("submitting");
    setErrorMessage("");

    // Web3Forms — set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setSubmissionStatus("error");
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
          subject: `New Lead: ${data.name} - ${data.serviceType}`,
          from_name: "The Upward Scale Website",
          name: data.name,
          email: data.email,
          service: data.serviceType,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (response.status === 200 || result.success) {
        setSubmissionStatus("success");
        reset();
      } else {
        setSubmissionStatus("error");
        setErrorMessage(result.message || "An error occurred while submitting your message.");
      }
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
      setErrorMessage("Unable to connect to the server. Please check your network and try again.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur-md sm:p-10">
      {/* Decorative gradient accents inside the form card */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-emerald-100/50 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-teal-100/40 blur-2xl" />

      <AnimatePresence mode="wait">
        {submissionStatus === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center py-12 text-center"
          >
            {/* Animated Success Circle Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg
                className="h-8 w-8 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
              Message Sent Successfully!
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 sm:text-base">
              Thank you for reaching out. Our growth architects will analyze your request and get in touch within 24 hours.
            </p>

            <button
              onClick={() => setSubmissionStatus("idle")}
              className="mt-8 rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* General Submission Error Alert */}
            {submissionStatus === "error" && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                <div className="flex gap-2">
                  <svg className="h-5 w-5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-semibold text-slate-900">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                disabled={submissionStatus === "submitting"}
                placeholder="John Doe"
                className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-emerald-500"
                }`}
                {...register("name")}
              />
              {errors.name && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-slate-900">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                disabled={submissionStatus === "submitting"}
                placeholder="john@company.com"
                className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-emerald-500"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Service Type Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="serviceType" className="text-sm font-semibold text-slate-900">
                What do you need help with?
              </label>
              <div className="relative">
                <select
                  id="serviceType"
                  disabled={submissionStatus === "submitting"}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-10 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                  {...register("serviceType")}
                >
                  <option value="web-development">Web Architecture & Development</option>
                  <option value="ai-optimization">Next-Gen AI Optimization</option>
                  <option value="social-media-marketing">Social Media Growth Engines</option>
                  <option value="gmb-optimization">GMB & Local Market Dominance</option>
                  <option value="seo">Advanced SEO Orchestration</option>
                  <option value="app-development">Native & Cross-Platform App Engineering</option>
                  <option value="content-marketing">High-Converting Content Marketing</option>
                  <option value="devops-cloud">DevOps & Cloud Automation</option>
                  <option value="brand-strategy">Brand Strategy & Identity</option>
                  <option value="general">General / Other Inquiry</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.serviceType && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                  {errors.serviceType.message}
                </span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-semibold text-slate-900">
                Project details
              </label>
              <textarea
                id="message"
                disabled={submissionStatus === "submitting"}
                rows={4}
                placeholder="Tell us about your project, timelines, and scaling goals..."
                className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 ${
                  errors.message
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-emerald-500"
                }`}
                {...register("message")}
              />
              {errors.message && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submissionStatus === "submitting"}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600 disabled:bg-slate-400"
            >
              {submissionStatus === "submitting" ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  Initiate Alignment
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
