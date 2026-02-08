import FeaturedArticles from "@/components/sections/FeaturedArticles";
import Features from "@/components/sections/Features";
import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import TechStackStrip from "@/components/sections/TechStackStrip";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function Home() {

  return (
    <div className=" flex-1">
      <Hero />
      <TechStackStrip />
      <Features />
      <FeaturedArticles />
      <HowItWorks />
      <CTA
        text="Start publishing with clarity"
        subText="Bloggers Blog gives you a clean, modern platform to write, publish, and share ideas that matter — without distractions."
      >
        <>
          <Link href={"/sign-up"}>
            <Button text="Create an account" size="large" />
          </Link>

          <Link href={"/blog"}>
            <Button text="Explore Blog" outlined size="large" />
          </Link>
        </>
      </CTA>
    </div>
  );
}
