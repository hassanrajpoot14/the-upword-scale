"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HEADER_LINKS } from "../../data/navLinks";
import ServicesDropdown from "./ServicesDropdown";

export default function NavLinks({
  links = HEADER_LINKS,
  className = "",
  linkClassName = "",
  onLinkClick,
  /** Unique layoutId namespace so desktop + mobile don't fight over one shared pill */
  activeLayoutId = "activeTab",
  /** "desktop" mega panel vs "inline" accordion for the mobile drawer */
  servicesVariant = "desktop",
}) {
  const pathname = usePathname();

  return (
    <ul className={`flex items-center gap-1 lg:gap-1.5 ${className}`}>
      {links.map((link) => {
        const isServices = link.href === "/services";
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : Boolean(pathname?.startsWith(link.href));

        if (isServices) {
          return (
            <li
              key={link.href}
              className={`relative ${servicesVariant === "inline" ? "w-full" : ""}`}
            >
              <ServicesDropdown
                variant={servicesVariant}
                isActive={isActive}
                activeLayoutId={activeLayoutId}
                linkClassName={linkClassName}
                onLinkClick={onLinkClick}
              />
            </li>
          );
        }

        return (
          <li key={link.href} className="relative">
            <Link
              href={link.href}
              onClick={onLinkClick}
              aria-current={isActive ? "page" : undefined}
              suppressHydrationWarning
              className={`relative inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-emerald-600 ${
                isActive
                  ? "text-emerald-600"
                  : "text-slate-700 light:text-slate-700 text-slate-300 dark:text-slate-300"
              } ${linkClassName}`}
            >
              <span suppressHydrationWarning>{link.label}</span>
              {isActive ? (
                <motion.span
                  layoutId={activeLayoutId}
                  aria-hidden
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
