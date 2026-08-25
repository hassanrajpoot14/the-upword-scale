"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceFaq({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-100">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div key={index} className="py-5">
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full items-start justify-between text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold leading-7 text-slate-900 sm:text-lg">
                {faq.question}
              </span>
              <span className="ml-6 flex h-7 items-center">
                <svg
                  className={`h-6 w-6 text-emerald-600 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base pr-4">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
