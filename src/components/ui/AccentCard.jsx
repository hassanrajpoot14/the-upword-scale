"use client";

/** Shared harmonized card shell — top accent bar + glass hover glow */
export const accentCardShellClasses =
  "group relative overflow-hidden border border-slate-200/80 light:border-slate-200/80 border-slate-800/80 dark:border-slate-800/80 bg-white/80 light:bg-white/80 bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5";

export const accentCardClasses = `${accentCardShellClasses} rounded-2xl`;

export const accentCardLgClasses = `${accentCardShellClasses} rounded-3xl`;

export function AccentBar({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-0 left-0 right-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-70 transition-opacity group-hover:opacity-100 ${className}`}
    />
  );
}

export default function AccentCard({ children, className = "", as: Component = "div", ...props }) {
  return (
    <Component className={`${accentCardClasses} ${className}`} {...props}>
      <AccentBar />
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
}
