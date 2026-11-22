import FloatingPhrases from "./hero/FloatingPhrases";
import SignatureSection from "./hero/SignatureSection";
import HeroVision from "./hero/HeroVision";
import HeroHeading from "./hero/HeroHeading";
import HeroTagline from "./hero/HeroTagline";
import HeroCTAButtons from "./hero/HeroCTAButtons";
import ScrollDownButton from "./hero/ScrollDownButton";
import { useScrollY } from "@/hooks/useScrollY";
import { smoothScrollTo } from "@/utils/smoothScroll";

const HeroSection = () => {
  const scrollY = useScrollY();

  // slow, eased glide down to the content
  const scrollToNextSection = () =>
    smoothScrollTo(document.getElementById("build-lab"), {
      duration: 1800,
      offset: 0,
    });

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden">
      <FloatingPhrases />

      {/* hero content drifts up a little slower than the page (parallax) */}
      <div
        className="relative z-20 flex flex-1 items-center justify-center px-6 py-10"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
          opacity: Math.max(0, 1 - scrollY / 700),
        }}
      >
        <div className="mx-auto w-full max-w-4xl text-center">
          <SignatureSection />
          <HeroVision />
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
