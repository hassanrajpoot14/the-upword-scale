"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Slim top progress bar for App Router client navigations.
 * Starts on internal link clicks; completes when pathname updates.
 */
export default function RouteProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const tickRef = useRef(null);
  const hideRef = useRef(null);
  const pathnameRef = useRef(pathname);

  const stopTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stopTick();
    if (hideRef.current) {
      clearTimeout(hideRef.current);
      hideRef.current = null;
    }
    setVisible(true);
    setProgress(14);
    tickRef.current = setInterval(() => {
      setProgress((value) => {
        if (value >= 88) return value;
        return value + 4 + Math.random() * 10;
      });
    }, 160);
  }, [stopTick]);

  const finish = useCallback(() => {
    stopTick();
    setProgress(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 320);
  }, [stopTick]);

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      if (visible) finish();
    }
  }, [pathname, visible, finish]);

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      if (href.startsWith("http")) {
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) return;
        } catch {
          return;
        }
      }

      const nextPath = href.split("?")[0] || "/";
      if (nextPath === pathname) return;

      start();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, start]);

  useEffect(
    () => () => {
      stopTick();
      if (hideRef.current) clearTimeout(hideRef.current);
    },
    [stopTick]
  );

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="progressbar"
          aria-hidden
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] bg-emerald-500/20"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 shadow-[0_0_14px_rgba(16,185,129,0.55)]"
            animate={{ width: `${progress}%` }}
            transition={{
              type: "spring",
              stiffness: progress >= 100 ? 380 : 120,
              damping: progress >= 100 ? 32 : 22,
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
