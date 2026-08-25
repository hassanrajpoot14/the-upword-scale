import AboutPageClient from "../../src/components/sections/AboutPageClient";

export const metadata = {
  title: "About Us | The Upward Scale",
  description:
    "Meet the systems architects, optimization engineers, and growth strategists behind The Upward Scale — elite digital growth systems for ambitious brands.",
  openGraph: {
    title: "About Us | The Upward Scale",
    description:
      "Meet the systems architects, optimization engineers, and growth strategists behind The Upward Scale.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
