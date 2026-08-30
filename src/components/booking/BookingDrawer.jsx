"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { CONTACT_INFO, isCalBookingEnabled } from "../../data/contactInfo";
import BookingFallbackForm from "./BookingFallbackForm.jsx";

const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center text-sm text-slate-400">
      Loading scheduler…
    </div>
  ),
});

const calLink =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  process.env.NEXT_PUBLIC_CALCOM_LINK ||
  "";

const CAL_LOAD_TIMEOUT_MS = 8000;

function CalEmbedPanel({ onFailed }) {
  useEffect(() => {
    const timer = window.setTimeout(onFailed, CAL_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [onFailed]);

  return (
    <div className="relative min-h-[min(620px,70vh)] sm:min-h-[620px]">
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: "min(620px, 70vh)" }}
        config={{
          theme: "dark",
          layout: "month_view",
        }}
        embedJsUrl="https://app.cal.com/embed/embed.js"
      />
      <button
        type="button"
        onClick={onFailed}
        className="mt-3 w-full text-center text-xs font-medium text-slate-500 transition hover:text-emerald-400"
      >
        Calendar not loading? Send a booking request instead
      </button>
    </div>
  );
}

export default function BookingDrawer({ open, onOpenChange }) {
  const close = () => onOpenChange(false);
  const calEnabled = isCalBookingEnabled();
  const [useFallback, setUseFallback] = useState(!calEnabled);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!open) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setUseFallback(!calEnabled);
      setToast("");
    }
  }, [open, calEnabled]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showForm = useFallback || !calEnabled;

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close booking panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] bg-slate-950/60 backdrop-blur-sm"
            onClick={close}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Book a discovery call"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed inset-y-0 right-0 z-[121] flex w-full max-w-md flex-col border-l border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-2xl sm:max-w-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 px-6 py-5">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {showForm ? "Booking Request" : "Schedule"}
                </p>
                <h2 className="mt-1 text-lg font-bold tracking-tight text-white">
                  Book a Discovery Call
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {showForm
                    ? `Tell us about your project — ${CONTACT_INFO.timezoneLabel}`
                    : `Pick a time — ${CONTACT_INFO.timezoneLabel}`}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:border-slate-600 hover:bg-slate-900 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {toast ? (
              <div className="mx-6 mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-300">
                {toast}
              </div>
            ) : null}

            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md">
                {showForm ? (
                  <>
                    {calEnabled ? (
                      <button
                        type="button"
                        onClick={() => setUseFallback(false)}
                        className="mb-4 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                      >
                        ← Back to calendar
                      </button>
                    ) : null}
                    <BookingFallbackForm
                      onSuccess={() =>
                        setToast("Booking request sent — we'll be in touch soon.")
                      }
                    />
                  </>
                ) : (
                  <CalEmbedPanel onFailed={() => setUseFallback(true)} />
                )}
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
