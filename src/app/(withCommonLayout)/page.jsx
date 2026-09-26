import CallToAction from "@/components/home/CallToAction";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PlatformStats from "@/components/home/PlatformStats";
import PopularProperties from "@/components/home/PopularProperties";
import PropertyCategories from "@/components/home/PropertyCategories";
import PropertySearch from "@/components/home/PropertySearch";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PropertySearch />
      <HowItWorks />
      <PropertyCategories />
      <FeaturedProperties />
      <PlatformStats />
      <PopularProperties />
       <Testimonials />
       <CallToAction />

    </main>
  );
}