"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function NavLinks({
  className = "",
  linkClassName = "",
  onLinkClick,
}) {
  const pathname = usePathname();

  return (
    <ul className={`flex items-center gap-8 ${className}`}>
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={`text-sm font-medium transition-colors duration-200 hover:text-emerald-600 ${
                isActive ? "text-emerald-600" : "text-slate-900"
              } ${linkClassName}`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
