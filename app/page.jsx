import ServicesSection from "../src/components/sections/ServicesSection";
import WhyChooseUs from "../src/components/sections/WhyChooseUs";
import OurGoal from "../src/components/sections/OurGoal";
import HomeHero from "../src/components/sections/HomeHero";

export const metadata = {
  title: "The Upward Scale | Elite Digital Growth Systems",
  description:
    "We engineer high-performance architectures, elite marketing software, and premium user interfaces that turn ambitious brands into category leaders.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HomeHero />

      {/* Why Choose Us — differentiator cards */}
      <WhyChooseUs />

      {/* Our Goal — Mission Statement */}
      <OurGoal />

      {/* The Solutions Hub / Services Section */}
      <ServicesSection />
    </>
  );
}
