"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Button from "../ui/Button";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Toggle Button */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        <span
          className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Animated Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-10 px-6">
          <nav
            className={`flex flex-col items-center gap-8 transition-all duration-500 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <NavLinks
              className="flex-col gap-8"
              linkClassName="text-2xl"
              onLinkClick={closeMenu}
            />
          </nav>

          <Link href="/contact" onClick={closeMenu} className={`w-full max-w-xs transition-all duration-500 ease-out delay-100 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}>
            <Button
              variant="primary"
              className="w-full"
            >
              Call Us Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
