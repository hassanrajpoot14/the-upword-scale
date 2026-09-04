"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export const buttonBaseStyles =
  "inline-flex items-center justify-center font-medium text-sm rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

export const buttonVariantStyles = {
  primary:
    "px-6 py-2.5 bg-slate-900 text-white hover:bg-emerald-600 shadow-sm hover:shadow-md light:bg-slate-900 light:text-white light:hover:bg-emerald-600 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 dark:shadow-emerald-500/20",
  secondary:
    "px-6 py-2.5 bg-transparent text-slate-900 border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 light:text-slate-900 light:border-slate-200 dark:text-slate-100 dark:border-slate-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400",
};

const MotionButton = motion.button;

export default function Button({
  variant = "primary",
  children,
  className = "",
  magnetic = variant === "primary",
  ...rest
}) {
  const btn = (
    <MotionButton
      type="button"
      whileTap={{ scale: 0.97 }}
      className={`${buttonBaseStyles} ${buttonVariantStyles[variant] || buttonVariantStyles.primary} ${className}`}
      {...rest}
    >
      {children}
    </MotionButton>
  );

  if (!magnetic) return btn;
  return <Magnetic>{btn}</Magnetic>;
}
