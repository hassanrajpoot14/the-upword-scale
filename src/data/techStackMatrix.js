import {
  LayoutGrid,
  Cloud,
  GitBranch,
  Gauge,
} from "lucide-react";

export const STACK_TABS = [
  { id: "frontend", label: "Frontend", icon: LayoutGrid },
  { id: "backend", label: "Backend & Cloud", icon: Cloud },
  { id: "devops", label: "DevOps & CI/CD", icon: GitBranch },
  { id: "performance", label: "Performance", icon: Gauge },
];

export const STATUS_STYLES = {
  production: {
    label: "Production Ready",
    dot: "bg-emerald-400",
    className:
      "border-emerald-200/80 bg-emerald-50/80 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  zeroDowntime: {
    label: "Zero-Downtime Deployment",
    dot: "bg-teal-400",
    className:
      "border-teal-200/80 bg-teal-50/80 text-teal-700 dark:border-teal-900/50 dark:bg-teal-950/40 dark:text-teal-400",
  },
  edge: {
    label: "Edge Cached",
    dot: "bg-sky-400",
    className:
      "border-sky-200/80 bg-sky-50/80 text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-400",
  },
};

/** @typedef {{ id: string; title: string; description: string; category: string; status: keyof typeof STATUS_STYLES; why: string; tags: string[] }} TechStackItem */

/** @type {TechStackItem[]} */
export const TECH_STACK_ITEMS = [
  // ── Frontend ──
  {
    id: "nextjs",
    title: "Next.js",
    description:
      "Faster time-to-market with SEO-native rendering and sub-second TTFB on edge-deployed routes.",
    category: "frontend",
    status: "production",
    why: "App Router, streaming SSR, and static generation in one framework — the default for every client build we ship.",
    tags: ["App Router", "SSR", "Edge"],
  },
  {
    id: "react",
    title: "React",
    description:
      "Reusable design systems that scale across marketing pages and complex product dashboards.",
    category: "frontend",
    status: "production",
    why: "Component-driven UI with a mature ecosystem — pairs with server components for lean client bundles.",
    tags: ["RSC", "Hooks", "Components"],
  },
  {
    id: "typescript",
    title: "TypeScript",
    description:
      "Fewer production bugs and safer refactors as your product surface grows.",
    category: "frontend",
    status: "production",
    why: "Strict typing catches regressions before deploy and documents contracts across teams.",
    tags: ["Strict Mode", "Types", "DX"],
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    description:
      "Premium UI polish without a separate CSS maintenance burden.",
    category: "frontend",
    status: "production",
    why: "Utility-first styling with design tokens baked in — consistent spacing, type, and color at velocity.",
    tags: ["Design Tokens", "v4", "Utilities"],
  },
  {
    id: "framer",
    title: "Framer Motion",
    description:
      "Higher perceived quality and engagement on landing pages and product flows.",
    category: "frontend",
    status: "production",
    why: "Spring-based motion for reveals, micro-interactions, and scroll-linked UX without janky CSS.",
    tags: ["Springs", "Gestures", "Layout"],
  },

  // ── Backend & Cloud ──
  {
    id: "nodejs",
    title: "Node.js",
    description:
      "One language across the stack — faster iteration and simpler hiring.",
    category: "backend",
    status: "production",
    why: "Unified JavaScript runtime for API routes, webhooks, and serverless functions alongside the frontend stack.",
    tags: ["API Routes", "Serverless", "JS"],
  },
  {
    id: "postgres",
    title: "PostgreSQL",
    description:
      "Trustworthy data layer that grows from MVP to enterprise without re-architecture.",
    category: "backend",
    status: "production",
    why: "Relational integrity, JSON support, and proven scale for SaaS workloads and analytics.",
    tags: ["SQL", "JSON", "Relational"],
  },
  {
    id: "vercel",
    title: "Vercel",
    description:
      "Global low-latency delivery and safe shipping cadence for revenue-critical pages.",
    category: "backend",
    status: "edge",
    why: "Edge network, preview deploys, and zero-config Next.js hosting with instant rollbacks.",
    tags: ["Edge", "Previews", "Deploy"],
  },
  {
    id: "aws",
    title: "AWS",
    description:
      "Enterprise-grade durability and compliance when off-the-shelf PaaS is not enough.",
    category: "backend",
    status: "production",
    why: "S3, Lambda, RDS, and CloudFront for custom infra, media, and enterprise compliance needs.",
    tags: ["S3", "Lambda", "RDS"],
  },
  {
    id: "openai",
    title: "OpenAI",
    description:
      "Operational AI that compounds efficiency instead of one-off chat widgets.",
    category: "backend",
    status: "production",
    why: "GPT and embedding APIs for RAG agents, support automation, and content pipelines.",
    tags: ["GPT", "Embeddings", "RAG"],
  },

  // ── DevOps & CI/CD ──
  {
    id: "docker",
    title: "Docker",
    description:
      "Predictable deploys and faster onboarding for new engineers.",
    category: "devops",
    status: "zeroDowntime",
    why: "Containerized builds guarantee identical environments from local dev through production.",
    tags: ["Containers", "Images", "Compose"],
  },
  {
    id: "github-actions",
    title: "GitHub Actions",
    description:
      "Ship confidently — broken builds never reach production.",
    category: "devops",
    status: "zeroDowntime",
    why: "Automated test, lint, and deploy pipelines on every PR with environment gates.",
    tags: ["CI/CD", "Pipelines", "Gates"],
  },
  {
    id: "sentry",
    title: "Sentry",
    description:
      "Mean-time-to-recovery drops because issues are caught before users report them.",
    category: "devops",
    status: "production",
    why: "Real-time error tracking, release health, and performance traces tied to deploys.",
    tags: ["Errors", "Traces", "Releases"],
  },

  // ── Performance ──
  {
    id: "lighthouse",
    title: "Lighthouse",
    description:
      "99+ scores translate directly into better rankings and lower bounce rates.",
    category: "performance",
    status: "production",
    why: "Every launch is benchmarked against Google's performance, accessibility, and SEO audits.",
    tags: ["Audits", "SEO", "A11y"],
  },
  {
    id: "cwv",
    title: "Core Web Vitals",
    description:
      "Search visibility and conversion protected as traffic scales.",
    category: "performance",
    status: "production",
    why: "LCP, INP, and CLS are monitored continuously — not just on launch day.",
    tags: ["LCP", "INP", "CLS"],
  },
  {
    id: "isr",
    title: "ISR",
    description:
      "Thousands of product pages stay sub-second without nightly full rebuilds.",
    category: "performance",
    status: "edge",
    why: "Incremental static regeneration keeps CMS-heavy pages fast without stale content.",
    tags: ["Static", "Regeneration", "CMS"],
  },
  {
    id: "cdn",
    title: "Edge CDN",
    description:
      "Global audiences get local-speed experiences without multi-region complexity.",
    category: "performance",
    status: "edge",
    why: "Assets and HTML served from the nearest PoP with automatic cache invalidation.",
    tags: ["PoP", "Cache", "Global"],
  },
];
