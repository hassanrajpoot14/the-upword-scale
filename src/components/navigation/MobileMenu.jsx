"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import BookCallButton from "../booking/BookCallButton";
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
              className="fixed top-0 left-0 z-[100] flex h-full w-full flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 ease-out"
            >
              <div className="flex items-center justify-between px-4 pt-5 sm:px-6">
                <BrandLogo tone="dark" onClick={closeMenu} />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <X className="h-5 w-5" strokeWidth={2.25} />
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-16">
                <nav
                  aria-label="Mobile"
                  className="w-full max-w-sm translate-y-0 opacity-100 transition-all duration-500 ease-out"
                >
                  <NavLinks
                    links={HEADER_LINKS}
                    inverted
                    className="flex-col items-stretch gap-1"
                    linkClassName="justify-center py-3 text-2xl"
                    onLinkClick={closeMenu}
                    activeLayoutId="activeTabMobile"
                    servicesVariant="inline"
                  />
                </nav>

                <BookCallButton
                  onClick={closeMenu}
                  className={`w-full max-w-xs ${buttonBaseStyles} ${buttonVariantStyles.primary} translate-y-0 opacity-100 transition-all duration-500 ease-out delay-75`}
                >
                  {SITE_CTAS.bookCall.label}
                </BookCallButton>
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
