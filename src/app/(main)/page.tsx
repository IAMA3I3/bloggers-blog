import Hero from "@/components/sections/Hero";
import TechStackStrip from "@/components/sections/TechStackStrip";

export default async function Home() {

  return (
    <div className=" flex-1">
      <Hero />
      <TechStackStrip />
    </div>
  );
}
