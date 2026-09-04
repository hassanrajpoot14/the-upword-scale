"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Cpu,
  Cloud,
  Gauge,
  Palette,
  Smartphone,
  ShieldCheck,
  Boxes,
} from "lucide-react";
import { SPRING } from "../motion/springs";

const SERVICE_ITEMS = [
  {
    href: "/services#web-architecture",
    label: "Web & Systems Architecture",
    description: "Scalable Next.js & React architectures.",
    Icon: Code2,
  },
  {
    href: "/services#ai-integration",
    label: "AI & ML Workflows",
    description: "Custom AI workflows & LLM pipelines.",
    Icon: Cpu,
  },
  {
    href: "/services#devops",
    label: "DevOps & Cloud Automation",
    description: "Docker, CI/CD & cloud delivery pipelines.",
    Icon: Cloud,
  },
  {
    href: "/services#performance",
    label: "Performance & Core Web Vitals",
    description: "Ultra-fast rendering & Lighthouse scores.",
    Icon: Gauge,
  },
  {
    href: "/services#design",
    label: "UI/UX & Product Design",
    description: "Interface systems that convert and scale.",
    Icon: Palette,
  },
  {
    href: "/services#mobile",
    label: "Mobile & Cross-Platform",
    description: "Native-feel apps across iOS and Android.",
    Icon: Smartphone,
  },
  {
    href: "/services#security",
    label: "Security & Infrastructure Hardening",
    description: "Hardened stacks, auth, and edge defenses.",
    Icon: ShieldCheck,
  },
  {
    href: "/services#saas",
    label: "Custom SaaS Development",
    description: "Multi-tenant products built to ship fast.",
    Icon: Boxes,
  },
];

const PANEL_MOTION = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.95 },
};

const CLOSE_DELAY_MS = 160;

/**
 * Interactive Services mega-menu for the primary nav.
 * Desktop: 2-column mega panel on hover/click. Closes on leave, Esc, or link click.
 * Inline (mobile drawer): click accordion with the same service links.
 */
export default function ServicesDropdown({
  className = "",
  linkClassName = "",
  onLinkClick,
  variant = "desktop",
  isActive = false,
  activeLayoutId,
  inverted = false,
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeTimerRef = useRef(null);
  const pathname = usePathname();
  const isInline = variant === "inline";

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const closeMenu = () => {
    clearCloseTimer();
    setOpen(false);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  const toggleMenu = () => {
    clearCloseTimer();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(false);
    clearCloseTimer();
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        clearCloseTimer();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => () => clearCloseTimer(), []);

  const handleLinkClick = () => {
    closeMenu();
    onLinkClick?.();
  };

  const triggerClassName = `relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
    isInline ? "w-full" : ""
  } ${
    inverted
      ? isActive || open
        ? "text-emerald-400 hover:text-emerald-300"
        : "text-white hover:text-emerald-400"
      : isActive || open
        ? "text-emerald-600 hover:text-emerald-600"
        : "text-slate-700 dark:text-slate-300 hover:text-emerald-600"
  } ${linkClassName}`;

  const itemClassName =
    "group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-slate-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";

  return (
    <div
      className={`relative ${isInline ? "w-full" : ""} ${className}`}
      onMouseEnter={isInline ? undefined : openMenu}
      onMouseLeave={isInline ? undefined : scheduleClose}
    >
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        className={triggerClassName}
      >
        <span>Services</span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={SPRING.snappy}
          className="inline-flex"
        >
          <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
        </motion.span>
        {isActive && activeLayoutId ? (
          <motion.span
            layoutId={activeLayoutId}
            aria-hidden
            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald-500"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          isInline ? (
            <motion.div
              key="services-inline"
              id={panelId}
              role="menu"
              aria-label="Services"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={SPRING.snappy}
              className="overflow-hidden"
            >
              <ul
                className={`mt-1 max-h-none space-y-0.5 border-l pl-2 ${
                  inverted ? "border-white/20" : "border-slate-200 dark:border-slate-700"
                }`}
              >
                {SERVICE_ITEMS.map(({ href, label, description, Icon }) => (
                  <li key={href} role="none">
                    <Link
                      href={href}
                      role="menuitem"
                      onClick={handleLinkClick}
                      className={`group flex items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all sm:gap-3 sm:p-3 ${
                        inverted
                          ? "hover:bg-white/10"
                          : "hover:bg-slate-100 dark:hover:bg-slate-900/80"
                      }`}
                    >
                      <Icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                        strokeWidth={2}
                      />
                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-medium sm:text-base ${
                            inverted ? "text-white" : "text-slate-800 dark:text-slate-100"
                          }`}
                        >
                          {label}
                        </span>
                        <span
                          className={`mt-0.5 block text-xs leading-snug sm:text-sm ${
                            inverted ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li role="none">
                  <Link
                    href="/services"
                    role="menuitem"
                    onClick={handleLinkClick}
                    className={`mt-1 flex items-center gap-1.5 border-t px-2.5 py-3 text-sm font-semibold text-emerald-400 sm:px-3 ${
                      inverted ? "border-white/20" : "border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    Explore All Services & Solutions
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="services-mega"
              id={panelId}
              role="menu"
              aria-label="Services"
              {...PANEL_MOTION}
              transition={SPRING.snappy}
              className="absolute left-1/2 top-full z-[60] pt-3 -translate-x-1/2"
            >
              {/* Hover bridge — pt-3 keeps mouse path continuous into the panel */}
              <div className="w-[680px] rounded-2xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-2xl md:w-[750px]">
                <ul className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2">
                  {SERVICE_ITEMS.map(({ href, label, description, Icon }) => (
                    <li key={href} role="none">
                      <Link
                        href={href}
                        role="menuitem"
                        onClick={handleLinkClick}
                        className={itemClassName}
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                          <Icon className="h-4 w-4" strokeWidth={2.25} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-slate-100 transition-colors group-hover:text-emerald-400">
                            {label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-slate-400">
                            {description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 border-t border-slate-800 px-4 pb-4 pt-3">
                  <Link
                    href="/services"
                    role="menuitem"
                    onClick={handleLinkClick}
                    className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-900/80 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <span>Explore All Services & Solutions</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        ) : null}
      </AnimatePresence>
    </div>
  );
}
