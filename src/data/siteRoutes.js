/**
 * Canonical internal routes + primary CTA labels.
 * Keep header/footer/home CTAs aligned with existing App Router pages.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  caseStudies: "/case-studies",
  blogs: "/blogs",
  contact: "/contact",
};

/** High-converting CTA copy → valid destinations */
export const SITE_CTAS = {
  viewAllWork: { label: "View All Work", href: ROUTES.caseStudies },
  readArticles: { label: "Read Articles", href: ROUTES.blogs },
  exploreServices: { label: "Explore Services", href: ROUTES.services },
  bookCall: { label: "Book Call", action: "booking" },
};
