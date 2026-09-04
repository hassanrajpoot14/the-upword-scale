"use client";

import { useEffect, useState } from "react";
import BrandLogo from "../ui/BrandLogo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../theme/ThemeToggle.jsx";
import BookCallButton from "../booking/BookCallButton";
import StatusBadge from "../ui/StatusBadge.jsx";
import { CommandPaletteTrigger } from "./CommandPalette";
import { useCommandPalette } from "./CommandPaletteRoot";
import { buttonBaseStyles, buttonVariantStyles } from "../ui/Button";
import { SITE_CTAS } from "../../data/siteRoutes";

const headerSurfaceScrolled =
  "border-slate-200/80 light:border-slate-200/80 border-slate-800/80 dark:border-slate-800/80 bg-white/70 light:bg-white/70 bg-slate-900/70 dark:bg-slate-900/70 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] light:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.35)]";

const headerSurfaceDefault =
  "border-transparent bg-white/60 light:bg-white/60 bg-slate-950/60 dark:bg-slate-950/60";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { setOpen } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 overflow-visible border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow,backdrop-filter,color] duration-300 ${
        scrolled ? headerSurfaceScrolled : headerSurfaceDefault
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"
      >
        <div
          className={`flex w-full flex-nowrap items-center justify-between gap-2 transition-[height] sm:gap-3 ${
            scrolled ? "h-16" : "h-16 sm:h-20"
          }`}
        >
          <div className="min-w-0 shrink">
            <BrandLogo size="header" />
          </div>

          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavLinks activeLayoutId="activeTab" />
          </div>

          <div className="flex shrink-0 flex-nowrap items-center gap-1.5 sm:gap-3">
            <CommandPaletteTrigger onClick={() => setOpen(true)} />
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <StatusBadge compact className="hidden lg:inline-flex" />
            <BookCallButton
              magnetic
              className={`hidden md:inline-flex ${buttonBaseStyles} ${buttonVariantStyles.primary}`}
            >
              {SITE_CTAS.bookCall.label}
            </BookCallButton>
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
