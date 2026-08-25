import React from "react";

const baseStyles =
  "inline-flex items-center justify-center font-medium text-sm rounded-full transition-all duration-300 transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles = {
  primary:
    "px-6 py-2.5 bg-slate-900 text-white hover:bg-emerald-600 shadow-sm hover:shadow-md",
  secondary:
    "px-6 py-2.5 bg-transparent text-slate-900 border border-slate-200 hover:border-emerald-600 hover:text-emerald-600",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}) {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
