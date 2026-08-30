import dynamic from "next/dynamic";
import { buildPageMetadata } from "../src/lib/og/metadata";

const HomePageClient = dynamic(
  () => import("../src/components/sections/HomePageClient"),
  {
    loading: () => (
      <div className="min-h-screen bg-[#07110f]" aria-hidden>
        <div className="mx-auto flex min-h-[100svh] max-w-7xl items-center px-4">
          <div className="h-12 w-72 animate-pulse rounded-xl bg-white/10" />
        </div>
      </div>
    ),
  }
);

export const metadata = buildPageMetadata({
  title: "The Upward Scale | Elite Digital Growth Systems",
  description:
    "We engineer high-performance architectures, elite marketing software, and premium user interfaces that turn ambitious brands into category leaders.",
  path: "/",
});

export default function HomePage() {
  return <HomePageClient />;
}
