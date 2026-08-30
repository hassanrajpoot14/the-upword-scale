"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const toggleButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 light:border-slate-200 border-slate-800 dark:border-slate-800 bg-white/70 light:bg-white/70 bg-slate-900/70 dark:bg-slate-900/70 text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400 backdrop-blur-sm transition-colors duration-300 hover:border-slate-300 light:hover:border-slate-300 hover:border-slate-600 dark:hover:border-slate-600 hover:bg-white light:hover:bg-white hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-slate-900 light:hover:text-slate-900 hover:text-slate-200 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        aria-hidden
        tabIndex={-1}
        className={toggleButtonClass}
      >
        <span className="h-[18px] w-[18px]" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.9, rotate: 45 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={toggleButtonClass}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" strokeWidth={2} />
      ) : (
        <Moon className="h-[18px] w-[18px]" strokeWidth={2} />
      )}
    </motion.button>
  );
}
