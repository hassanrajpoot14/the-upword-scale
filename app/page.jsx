import dynamic from "next/dynamic";
import HomeHero from "../src/components/sections/HomeHero";
import { buildPageMetadata } from "../src/lib/og/metadata";

const HomeBelowFold = dynamic(
  () => import("../src/components/sections/HomeBelowFold"),
  {
    loading: () => (
      <div className="bg-[#F8FAF9] py-24" aria-hidden>
        <div className="mx-auto h-8 w-40 animate-pulse rounded bg-slate-200" />
      </div>
    ),
  },
);

export const metadata = buildPageMetadata({
  title: "The Upward Scale | Elite Digital Growth Systems",
  description:
    "We engineer high-performance architectures, elite marketing software, and premium user interfaces that turn ambitious brands into category leaders.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBelowFold />
    </>
  );
}
