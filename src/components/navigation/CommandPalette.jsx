"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";
import { buildCommandGroups } from "../../data/commandPalette";
import { CONTACT_INFO } from "../../data/contactInfo";
import { useBookingDrawer } from "../booking/BookingDrawerRoot";
import { useTheme } from "../../hooks/useTheme";
import { SPRING } from "../motion/springs";

function useIsMac() {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);
  return isMac;
}

function filterCommands(groups, query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return groups.flatMap((g) =>
      g.items.map((item) => ({ ...item, groupLabel: g.label, groupId: g.id }))
    );
  }

  return groups.flatMap((g) =>
    g.items
      .filter((item) => {
        const haystack = [
          item.label,
          item.hint,
          ...(item.keywords || []),
          g.label,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .map((item) => ({ ...item, groupLabel: g.label, groupId: g.id }))
  );
}

function groupFilteredItems(items) {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.groupId)) {
      map.set(item.groupId, {
        id: item.groupId,
        label: item.groupLabel,
        items: [],
      });
    }
    map.get(item.groupId).items.push(item);
  }
  return [...map.values()];
}

export function CommandPaletteTrigger({ onClick, className = "" }) {
  const isMac = useIsMac();
  const modKey = isMac ? "⌘" : "Ctrl";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open command palette"
      className={`hidden items-center gap-2 rounded-full border border-slate-200/80 light:border-slate-200/80 border-slate-700/80 dark:border-slate-700/80 bg-white/70 light:bg-white/70 bg-slate-900/70 dark:bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-500 light:text-slate-500 text-slate-400 dark:text-slate-400 shadow-sm backdrop-blur-sm transition-colors duration-300 hover:border-slate-300 light:hover:border-slate-300 hover:border-slate-600 dark:hover:border-slate-600 hover:bg-white light:hover:bg-white hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-slate-700 light:hover:text-slate-700 hover:text-slate-200 dark:hover:text-slate-200 md:inline-flex ${className}`}
    >
      <Search className="h-3.5 w-3.5 text-slate-400" />
      <span className="hidden lg:inline">Press {modKey}K to navigate</span>
      <span className="lg:hidden">{modKey}K</span>
      <kbd className="rounded border border-slate-200 light:border-slate-200 border-slate-700 dark:border-slate-700 bg-slate-50 light:bg-slate-50 bg-slate-800 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-400 light:text-slate-400 text-slate-300 dark:text-slate-300">
        {modKey}K
      </kbd>
    </button>
  );
}

export default function CommandPalette({ open, onOpenChange }) {
  const router = useRouter();
  const { openBooking } = useBookingDrawer();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const itemRefs = useRef([]);

  const showToast = useCallback((message, duration = 2000) => {
    setToast(message);
    window.setTimeout(() => setToast(""), duration);
  }, []);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setActiveIndex(0);
    setToast("");
  }, [onOpenChange]);

  const onNavigate = useCallback(
    (href) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  const onCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      showToast(`Copied ${CONTACT_INFO.email}`);
    } catch {
      showToast("Copy failed — use the email on Contact", 2500);
    }
  }, [showToast]);

  const onToggleTheme = useCallback(() => {
    toggleTheme();
    showToast(
      isDarkMode ? "Switched to light mode" : "Switched to dark mode"
    );
  }, [toggleTheme, isDarkMode, showToast]);

  const onOpenBooking = useCallback(() => {
    close();
    openBooking();
  }, [close, openBooking]);

  const groups = useMemo(
    () =>
      buildCommandGroups({
        isDarkMode,
        onNavigate,
        onCopyEmail,
        onToggleTheme,
        onOpenBooking,
      }),
    [isDarkMode, onNavigate, onCopyEmail, onToggleTheme, onOpenBooking]
  );

  const flatItems = useMemo(
    () => filterCommands(groups, query),
    [groups, query]
  );
  const grouped = useMemo(() => groupFilteredItems(flatItems), [flatItems]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, flatItems.length]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) =>
          flatItems.length ? (i + 1) % flatItems.length : 0
        );
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) =>
          flatItems.length ? (i - 1 + flatItems.length) % flatItems.length : 0
        );
        return;
      }

      if (e.key === "Enter" && flatItems[activeIndex]) {
        e.preventDefault();
        flatItems[activeIndex].action();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, flatItems, activeIndex, close]);

  let flatCursor = -1;

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close command palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xl"
            onClick={close}
          />

          <div className="pointer-events-none fixed inset-0 z-[101] flex items-start justify-center px-4 pt-[min(18vh,8rem)] sm:px-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={SPRING.snappy}
              className="pointer-events-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/80 light:border-slate-200/80 border-white/10 dark:border-white/10 bg-white/80 light:bg-white/80 bg-slate-900/80 dark:bg-slate-900/80 shadow-2xl shadow-black/10 light:shadow-black/10 dark:shadow-black/40 ring-1 ring-slate-200/80 light:ring-slate-200/80 ring-white/10 dark:ring-white/10 backdrop-blur-2xl transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-slate-200/80 light:border-slate-200/80 border-white/10 dark:border-white/10 px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-emerald-500 light:text-emerald-500 text-emerald-400 dark:text-emerald-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages and quick actions…"
                  className="flex-1 bg-transparent text-sm text-slate-900 light:text-slate-900 text-slate-100 dark:text-slate-100 placeholder:text-slate-500 light:placeholder:text-slate-500 placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:outline-none"
                  autoComplete="off"
                  spellCheck={false}
                  aria-controls="command-palette-list"
                  aria-activedescendant={
                    flatItems[activeIndex]
                      ? `command-item-${flatItems[activeIndex].id}`
                      : undefined
                  }
                />
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg p-1 text-slate-400 light:text-slate-400 text-slate-400 dark:text-slate-400 transition hover:bg-slate-100 light:hover:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 hover:text-slate-700 light:hover:text-slate-700 hover:text-slate-200 dark:hover:text-slate-200"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                id="command-palette-list"
                className="max-h-[min(420px,50vh)] overflow-y-auto p-2"
              >
                {flatItems.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-slate-600 light:text-slate-600 text-slate-400 dark:text-slate-400">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  grouped.map((group) => (
                    <div key={group.id} className="mb-2 last:mb-0">
                      <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 light:text-slate-500 text-slate-500 dark:text-slate-500">
                        {group.label}
                      </p>
                      <ul role="listbox" aria-label={group.label}>
                        {group.items.map((item) => {
                          flatCursor += 1;
                          const idx = flatCursor;
                          const Icon = item.icon;
                          const active = idx === activeIndex;

                          return (
                            <li key={item.id} role="presentation">
                              <button
                                id={`command-item-${item.id}`}
                                ref={(el) => {
                                  itemRefs.current[idx] = el;
                                }}
                                type="button"
                                role="option"
                                aria-selected={active}
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => item.action()}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-300 ${
                                  active
                                    ? "bg-emerald-500/20 text-slate-900 light:text-slate-900 text-white dark:text-white ring-1 ring-emerald-400/40"
                                    : "text-slate-700 light:text-slate-700 text-slate-200 dark:text-slate-200 hover:bg-slate-100 light:hover:bg-slate-100 hover:bg-white/5 dark:hover:bg-white/5"
                                }`}
                              >
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                    active
                                      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-600 light:text-emerald-600 text-emerald-300 dark:text-emerald-300"
                                      : "border-slate-200 light:border-slate-200 border-white/10 dark:border-white/10 bg-slate-100 light:bg-slate-100 bg-white/5 dark:bg-white/5 text-slate-600 light:text-slate-600 text-slate-300 dark:text-slate-300"
                                  }`}
                                >
                                  <Icon className="h-4 w-4" strokeWidth={2} />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm font-semibold">
                                    {item.label}
                                  </span>
                                  {item.hint ? (
                                    <span
                                      className={`block truncate text-xs ${
                                        active
                                          ? "text-emerald-700/70 light:text-emerald-700/70 text-emerald-100/70 dark:text-emerald-100/70"
                                          : "text-slate-500 light:text-slate-500 text-slate-500 dark:text-slate-500"
                                      }`}
                                    >
                                      {item.hint}
                                    </span>
                                  ) : null}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-slate-200/80 light:border-slate-200/80 border-white/10 dark:border-white/10 bg-slate-50/80 light:bg-slate-50/80 bg-black/20 dark:bg-black/20 px-4 py-2.5 text-[10px] font-medium text-slate-500 light:text-slate-500 text-slate-500 dark:text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-mono text-slate-400">
                      <ArrowUp className="inline h-2.5 w-2.5" />
                    </kbd>
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-mono text-slate-400">
                      <ArrowDown className="inline h-2.5 w-2.5" />
                    </kbd>
                    navigate
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-mono text-slate-400">
                      <CornerDownLeft className="inline h-2.5 w-2.5" />
                    </kbd>
                    select
                  </span>
                </div>
                <span className="truncate text-slate-400">
                  {toast || "Esc to close"}
                </span>
              </div>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
