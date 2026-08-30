/**
 * Canonical tech keys for brand-consistent Simple Icons across the site.
 * Keys map to react-icons/si components in TechIconRow.
 */
export const CORE_ECOSYSTEM = [
  "nextjs",
  "react",
  "tailwind",
  "docker",
  "nodejs",
  "typescript",
  "postgresql",
  "r3f",
];

/** Default stack per service slug (Services page cards). */
export const SERVICE_STACKS = {
  "web-development": ["nextjs", "react", "typescript", "tailwind"],
  "ai-optimization": ["typescript", "nodejs", "postgresql", "react"],
  "social-media-marketing": ["react", "nextjs", "tailwind"],
  "gmb-optimization": ["nextjs", "react", "typescript"],
  seo: ["nextjs", "typescript", "react"],
  "app-development": ["react", "typescript", "nodejs", "tailwind"],
  "content-marketing": ["nextjs", "react", "tailwind"],
  "devops-cloud": ["docker", "nodejs", "typescript", "postgresql"],
  "brand-strategy": ["react", "nextjs", "tailwind", "r3f"],
};

export function getServiceStack(slug) {
  return SERVICE_STACKS[slug] || ["nextjs", "react", "typescript", "tailwind"];
}
