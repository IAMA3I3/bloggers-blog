import FeaturedArticles from "@/components/sections/FeaturedArticles";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import TechStackStrip from "@/components/sections/TechStackStrip";

export default async function Home() {

  return (
    <div className=" flex-1">
      <Hero />
      <TechStackStrip />
      <Features />
      <FeaturedArticles />
      <HowItWorks />
    </div>
  );
}
