
import React, { useState, useEffect } from "react";
import FloatingPhrases from "./hero/FloatingPhrases";
import SignatureSection from "./hero/SignatureSection";
import HeroHeading from "./hero/HeroHeading";
import HeroTagline from "./hero/HeroTagline";
import HeroCTAButtons from "./hero/HeroCTAButtons";
import ScrollDownButton from "./hero/ScrollDownButton";

const HeroSection = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  const smoothScrollToElement = (element, duration = 1200, offset = 0) => {
    const targetRect = element.getBoundingClientRect();
    const targetY = targetRect.top + window.pageYOffset + offset;
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutQuad(progress));
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("build-lab");
    if (nextSection) {
      smoothScrollToElement(nextSection, 1200, 0);
    }
  };

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden pb-1">
      <FloatingPhrases />
      
      {/* Main hero content - centered with better spacing */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <SignatureSection />
          <HeroTagline />
          <HeroHeading />
          <HeroTagline />
          <HeroCTAButtons />
          <ScrollDownButton onScroll={scrollToNextSection} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
