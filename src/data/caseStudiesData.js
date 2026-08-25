export const CASE_STUDIES = [
  {
    slug: "nexaflow-ai-automation",
    title: "Cutting Support Overhead by 74%",
    client: "NexaFlow SaaS",
    category: "AI Integration",
    tagline: "End-to-end AI agent deployment for a Series-B SaaS platform.",
    challenge:
      "NexaFlow's support team was drowning in 4,200+ weekly tickets, 60% of which were repetitive billing and onboarding queries. Response times exceeded 18 hours, leading to a measurable spike in churn.",
    solution:
      "We engineered a Retrieval-Augmented Generation (RAG) AI agent using OpenAI GPT-4o and a Pinecone vector database, trained on 8 years of support documentation. The agent was embedded natively into their dashboard, handling queries, processing refunds, and triggering onboarding flows autonomously.",
    results: [
      { label: "Ticket Deflection Rate", value: "74%" },
      { label: "Avg. Response Time", value: "< 30s" },
      { label: "Annual Support Cost Saved", value: "$210K" },
      { label: "CSAT Score Lift", value: "+22 pts" },
    ],
    testimonial: {
      quote:
        "The AI agent handles everything our tier-1 team used to spend 40 hours a week on. It's transformed our ops.",
      author: "James Harrington",
      role: "CTO, NexaFlow SaaS",
    },
    imageUrl: "/images/server_rack_cloud.png",
    imageAlt: "Cloud server infrastructure supporting AI automation systems",
    accentColor: "emerald",
    tags: ["RAG", "OpenAI", "Pinecone", "Customer Support", "Automation"],
  },
  {
    slug: "vertex-commerce-platform",
    title: "Headless Commerce at 99/100 Lighthouse",
    client: "Vertex Commerce",
    category: "Web Architecture",
    tagline: "A performance-obsessed re-architecture of a $40M e-commerce brand.",
    challenge:
      "Vertex's legacy Shopify theme was clocking 3.8s load times, a 42 LCP score, and was failing Core Web Vitals on 78% of product pages — directly costing them an estimated $1.2M in annual revenue from abandoned carts.",
    solution:
      "We migrated to a headless Next.js 16 + Shopify Storefront API architecture with Turbopack compilation, next/image optimization, streaming server components, and CDN edge caching via Vercel. All 3,200 product pages were statically generated at build time with ISR for inventory freshness.",
    results: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "LCP Improvement", value: "0.8s" },
      { label: "Conversion Rate Lift", value: "+38%" },
      { label: "Bounce Rate Reduction", value: "-41%" },
    ],
    testimonial: {
      quote:
        "Our site went from embarrassingly slow to best-in-class. The conversion lift alone paid for the project in 11 days.",
      author: "Sofia Mendes",
      role: "CEO, Vertex Commerce",
    },
    imageUrl: "/images/architectural_scaling.png",
    imageAlt: "Architectural scaling diagram for high-performance commerce",
    accentColor: "violet",
    tags: ["Next.js 16", "Headless Shopify", "Turbopack", "ISR", "Edge CDN"],
  },
  {
    slug: "medral-seo-dominance",
    title: "+218% Organic Traffic in 5 Months",
    client: "Medral Health",
    category: "SEO",
    tagline: "Topical authority SEO for a healthcare SaaS fighting for market share.",
    challenge:
      "Medral Health had a domain rating of 12 and zero first-page rankings despite a best-in-class product. Their competitors dominated all high-intent keywords. They were spending $85K/month on Google Ads just to stay relevant.",
    solution:
      "We executed a 3-phase SEO strategy: a full technical audit fixing 340 crawl errors, a 60-article semantic content cluster targeting 1,400 long-tail keywords, and a premium backlink acquisition campaign landing placements on Forbes Health, Healthline, and 18 niche medical publications.",
    results: [
      { label: "Organic Traffic Growth", value: "+218%" },
      { label: "First-Page Keywords", value: "480+" },
      { label: "Domain Rating Rise", value: "12 → 54" },
      { label: "Ad Spend Reduction", value: "-$52K/mo" },
    ],
    testimonial: {
      quote:
        "We went from zero organic presence to outranking billion-dollar incumbents on our core keywords. Unreal.",
      author: "Dr. Priya Nair",
      role: "Founder, Medral Health",
    },
    imageUrl: "/images/developer_workspace.png",
    imageAlt: "Technical workspace used for SEO and content systems work",
    accentColor: "sky",
    tags: ["Technical SEO", "Content Clusters", "Link Building", "Healthcare"],
  },
  {
    slug: "arkade-brand-relaunch",
    title: "Premium Rebrand That Tripled Deal Size",
    client: "Arkade Studio",
    category: "Brand Strategy",
    tagline: "A complete commercial repositioning for a boutique creative agency.",
    challenge:
      "Arkade was perceived as a mid-market agency, attracting clients with budgets under $10K. Their visual identity was inconsistent across touchpoints, and they lacked a compelling positioning narrative to justify premium pricing.",
    solution:
      "We redefined their brand positioning, typography system, and visual language from the ground up. New brand guidelines, a redesigned website with dark-mode premium aesthetics, and a repositioned messaging framework targeting enterprise clients with $50K+ project budgets.",
    results: [
      { label: "Avg. Deal Size", value: "3.2× Higher" },
      { label: "Client Quality Score", value: "+90%" },
      { label: "Inbound Leads from Brand", value: "+145%" },
      { label: "Website Engagement Time", value: "+4m 10s" },
    ],
    testimonial: {
      quote:
        "We now turn away clients that don't fit our profile. That's the power of premium positioning — it filters for you.",
      author: "Lucas Fontaine",
      role: "Creative Director, Arkade Studio",
    },
    imageUrl: "/images/architectural_scaling.png",
    imageAlt: "Brand architecture and visual systems planning board",
    accentColor: "rose",
    tags: ["Brand Identity", "Positioning", "Typography", "Dark Mode Design"],
  },
  {
    slug: "trailr-app-engineering",
    title: "From Concept to 50K Users in 90 Days",
    client: "Trailr App",
    category: "App Development",
    tagline: "Cross-platform mobile engineering for a fitness tracking startup.",
    challenge:
      "Trailr needed a production-ready cross-platform app in 90 days for their seed funding pitch. They had a design mockup and no technical team — and required GPS tracking, social features, and Stripe subscriptions from day one.",
    solution:
      "We engineered the full app in React Native with Expo, integrating Mapbox for GPS trail rendering, a custom social feed with optimistic UI updates, biometric authentication, and Stripe billing. Zero crashes on TestFlight launch. Published to both stores in 86 days.",
    results: [
      { label: "App Store Rating", value: "4.9★" },
      { label: "Users at 90 Days", value: "50,000+" },
      { label: "Crash-Free Sessions", value: "99.97%" },
      { label: "Days to Both Stores", value: "86" },
    ],
    testimonial: {
      quote:
        "They delivered a production-quality app our investors called 'the best-designed fitness app they'd seen.' We closed our seed round.",
      author: "Aiden Park",
      role: "CEO, Trailr App",
    },
    imageUrl: "/images/developer_workspace.png",
    imageAlt: "App engineering workspace for native mobile development",
    accentColor: "amber",
    tags: ["React Native", "Expo", "Mapbox", "Stripe", "iOS & Android"],
  },
  {
    slug: "synapse-ai-saas-platform",
    title: "Predictive Analytics Engine for FinTech",
    client: "Synapse FinTech",
    category: "AI Integration",
    tagline: "Custom LLM-powered risk scoring and anomaly detection at scale.",
    challenge:
      "Synapse was manually reviewing 12,000 daily transactions for fraud and compliance flags — a process taking 22 analysts and generating $1.8M in annual payroll costs, with a 6.2% false-positive rate causing legitimate transaction blocks.",
    solution:
      "We built a custom fine-tuned model on anonymized transaction data using a private LLM pipeline on AWS SageMaker, paired with a real-time vector similarity engine to flag anomalies within 200ms. The system integrates directly into their existing Plaid and Stripe infrastructure.",
    results: [
      { label: "False Positive Rate", value: "0.4% (↓94%)" },
      { label: "Review Time per Transaction", value: "< 200ms" },
      { label: "Analyst Headcount Reduction", value: "18 of 22" },
      { label: "Annual Savings", value: "$1.4M" },
    ],
    testimonial: {
      quote:
        "Our compliance department went from a liability to a competitive advantage. The speed and accuracy is unlike anything we've seen.",
      author: "Rachel Osei",
      role: "VP Engineering, Synapse FinTech",
    },
    imageUrl: "/images/server_rack_cloud.png",
    imageAlt: "Secure cloud infrastructure for fintech AI platforms",
    accentColor: "emerald",
    tags: ["LLM Fine-tuning", "SageMaker", "FinTech", "Fraud Detection", "Real-time"],
  },
];

export const CASE_STUDY_CATEGORIES = [
  "All",
  "AI Integration",
  "Web Architecture",
  "SEO",
  "Brand Strategy",
  "App Development",
];
