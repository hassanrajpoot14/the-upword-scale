"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import BookCallButton from "../booking/BookCallButton";
import NavLinks from "./NavLinks";
import BrandLogo from "../ui/BrandLogo";
import { buttonBaseStyles, buttonVariantStyles } from "../ui/Button";
import { HEADER_LINKS } from "../../data/navLinks";
import { SITE_CTAS } from "../../data/siteRoutes";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

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
          className={`absolute block h-0.5 w-5 bg-slate-900 light:bg-slate-900 bg-slate-100 dark:bg-slate-100 transition-all duration-300 ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-5 bg-slate-900 light:bg-slate-900 bg-slate-100 dark:bg-slate-100 transition-all duration-300 ${
            isOpen ? "scale-x-0 opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-5 bg-slate-900 light:bg-slate-900 bg-slate-100 dark:bg-slate-100 transition-all duration-300 ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-50 flex flex-col bg-slate-50/98 light:bg-slate-50/98 bg-slate-950/98 dark:bg-slate-950/98 backdrop-blur-xl transition-all duration-300 ease-out ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 pt-5 sm:px-6">
          <BrandLogo onClick={closeMenu} />
          <span className="h-10 w-10" aria-hidden />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-16">
          <nav
            aria-label="Mobile"
            className={`w-full max-w-sm transition-all duration-500 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <NavLinks
              links={HEADER_LINKS}
              className="flex-col items-stretch gap-1"
              linkClassName="justify-center py-3 text-2xl"
              onLinkClick={closeMenu}
              activeLayoutId="activeTabMobile"
              servicesVariant="inline"
            />
          </nav>

          <BookCallButton
            onClick={closeMenu}
            className={`w-full max-w-xs ${buttonBaseStyles} ${buttonVariantStyles.primary} ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500 ease-out delay-75`}
          >
            {SITE_CTAS.bookCall.label}
          </BookCallButton>
        </div>
      </div>
    </div>
  );
}
