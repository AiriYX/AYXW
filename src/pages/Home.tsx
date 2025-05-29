import React from "react";
import HeroSection from "@/components/home/HeroSection";
import BuildLab from "@/components/home/BuildLab";
import AboutSection from "@/components/home/AboutSection";
import QuickLinks from "@/components/Footer";

const Home = () => {
  return (
    <div className="pt-20 relative overflow-hidden">
      <HeroSection />
      <BuildLab />
      <AboutSection />
    </div>
  );
};

export default Home;
