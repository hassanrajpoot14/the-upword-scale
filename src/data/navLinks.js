export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

/** Primary header links — Contact lives in the CTA instead. */
export const HEADER_LINKS = NAV_LINKS.filter((link) => link.href !== "/contact");
