import ServicesPageClient from "../../src/components/sections/ServicesPageClient";

export const metadata = {
  title: "Services | The Upward Scale",
  description:
    "Nine core disciplines spanning web architecture, AI optimization, SEO, apps, DevOps, and brand strategy — one compounding growth ecosystem.",
  openGraph: {
    title: "Services | The Upward Scale",
    description:
      "Nine core disciplines spanning web architecture, AI, SEO, apps, DevOps, and brand strategy.",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
