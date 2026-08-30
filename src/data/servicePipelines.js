export const DEFAULT_SERVICE_PIPELINE = [
  {
    label: "Edge Cache",
    sublabel: "CDN · Vercel Edge",
    badge: "L1",
  },
  {
    label: "Next.js App Router",
    sublabel: "SSR · RSC · ISR",
    badge: "L2",
  },
  {
    label: "Docker Container",
    sublabel: "Runtime isolation",
    badge: "L3",
  },
];

export const SERVICE_PIPELINES = {
  "web-development": DEFAULT_SERVICE_PIPELINE,
  "app-development": [
    { label: "Edge Cache", sublabel: "Global CDN", badge: "L1" },
    { label: "Next.js App Router", sublabel: "Hybrid rendering", badge: "L2" },
    { label: "Docker Container", sublabel: "Container orchestration", badge: "L3" },
  ],
  "devops-cloud": [
    { label: "CI Pipeline", sublabel: "GitHub Actions", badge: "L1" },
    { label: "Kubernetes Cluster", sublabel: "Auto-scaling pods", badge: "L2" },
    { label: "Edge CDN", sublabel: "Zero-downtime deploy", badge: "L3" },
  ],
  "ai-optimization": [
    { label: "API Gateway", sublabel: "Auth & rate limits", badge: "L1" },
    { label: "LLM Router", sublabel: "Model orchestration", badge: "L2" },
    { label: "Vector DB", sublabel: "RAG retrieval", badge: "L3" },
  ],
  seo: [
    { label: "Edge Cache", sublabel: "Static prerender", badge: "L1" },
    { label: "Next.js App Router", sublabel: "Metadata API", badge: "L2" },
    { label: "Analytics Sink", sublabel: "Search telemetry", badge: "L3" },
  ],
  "social-media-marketing": [
    { label: "Content API", sublabel: "Headless CMS", badge: "L1" },
    { label: "Automation Worker", sublabel: "Scheduled jobs", badge: "L2" },
    { label: "Analytics Hub", sublabel: "Attribution", badge: "L3" },
  ],
  "gmb-optimization": [
    { label: "Local Edge", sublabel: "Geo routing", badge: "L1" },
    { label: "Schema Layer", sublabel: "Structured data", badge: "L2" },
    { label: "Review Sync", sublabel: "GMB webhooks", badge: "L3" },
  ],
  "content-marketing": [
    { label: "CMS Edge", sublabel: "Draft preview", badge: "L1" },
    { label: "Next.js App Router", sublabel: "MDX pipeline", badge: "L2" },
    { label: "Search Index", sublabel: "Sitemap sync", badge: "L3" },
  ],
  "brand-strategy": [
    { label: "Design Tokens", sublabel: "Brand system", badge: "L1" },
    { label: "Component Library", sublabel: "Shared UI", badge: "L2" },
    { label: "Deploy Pipeline", sublabel: "Multi-brand", badge: "L3" },
  ],
};

export function getServicePipeline(slug) {
  return SERVICE_PIPELINES[slug] ?? DEFAULT_SERVICE_PIPELINE;
}
