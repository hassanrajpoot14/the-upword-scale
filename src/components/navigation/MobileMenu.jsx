"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import BookCallButton from "../booking/BookCallButton";
import ThemeToggle from "../theme/ThemeToggle.jsx";
import NavLinks from "./NavLinks";
import BrandLogo from "../ui/BrandLogo";
import { buttonBaseStyles, buttonVariantStyles } from "../ui/Button";
import { HEADER_LINKS } from "../../data/navLinks";
import { SITE_CTAS } from "../../data/siteRoutes";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer on any route change (link select, logo, CTA, browser back)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const drawer =
    mounted && isOpen
      ? createPortal(
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className="fixed inset-0 z-[50] bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
            />

            <div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-0 z-[100] flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-slate-950 text-white shadow-2xl transition-transform duration-300 ease-out"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-3 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
                <div className="min-w-0 flex-1">
                  <BrandLogo size="header" tone="dark" onClick={closeMenu} />
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <X className="h-5 w-5" strokeWidth={2.25} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 [-webkit-overflow-scrolling:touch]">
                <div className="mx-auto flex min-h-full w-full max-w-sm flex-col items-stretch justify-center gap-8 py-6 pb-[max(4rem,env(safe-area-inset-bottom))]">
                  <nav
                    aria-label="Mobile"
                    className="w-full translate-y-0 opacity-100 transition-all duration-500 ease-out"
                  >
                    <NavLinks
                      links={HEADER_LINKS}
                      inverted
                      className="flex-col items-stretch gap-1"
                      linkClassName="justify-start py-3 text-2xl"
                      onLinkClick={closeMenu}
                      activeLayoutId="activeTabMobile"
                      servicesVariant="inline"
                    />
                  </nav>

                  <BookCallButton
                    onClick={closeMenu}
                    className={`w-full ${buttonBaseStyles} ${buttonVariantStyles.primary} translate-y-0 opacity-100 transition-all duration-500 ease-out delay-75`}
                  >
                    {SITE_CTAS.bookCall.label}
                  </BookCallButton>

                  <div className="flex items-center justify-center gap-3 sm:hidden">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center rounded-full transition-colors duration-300 hover:bg-slate-100 light:hover:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        <span
          className={`absolute block h-0.5 w-5 transition-all duration-300 ${
            isOpen
              ? "rotate-45 bg-white"
              : "-translate-y-1.5 bg-slate-900 light:bg-slate-900 dark:bg-slate-100"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-5 transition-all duration-300 ${
            isOpen
              ? "scale-x-0 bg-white opacity-0"
              : "bg-slate-900 opacity-100 light:bg-slate-900 dark:bg-slate-100"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-5 transition-all duration-300 ${
            isOpen
              ? "-rotate-45 bg-white"
              : "translate-y-1.5 bg-slate-900 light:bg-slate-900 dark:bg-slate-100"
          }`}
        />
      </button>

      {drawer}
    </div>
  );
}
