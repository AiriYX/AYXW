
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const HeroHeading = () => {
  const { theme } = useTheme();

  return (
    <div className="mb-16 relative">
      <h1
        className={`relative text-2xl xxs:text-3xl xs:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-semibold uppercase tracking-tight transform -rotate-0.5 ${theme === "dark" ? "text-neutral-100" : "text-neutral-900"}`}
      >
        {/* Curious - brighter rose with colorful directional shadow */}
        <span
          className={`${theme === "dark" ? "text-rose-400" : "text-rose-500"} block transform rotate-2 scale-105 mb-2 xs:mb-3 md:mb-4`}
          style={{
            textShadow:
              theme === "dark"
                ? "6px 6px 0px rgba(244, 63, 94, 0.8), 12px 12px 0px rgba(190, 18, 60, 0.6), 18px 18px 25px rgba(239, 68, 68, 0.4)"
                : "6px 6px 0px rgba(244, 63, 94, 0.7), 12px 12px 0px rgba(225, 29, 72, 0.5), 18px 18px 25px rgba(190, 18, 60, 0.3)",
          }}
        >
          Curious
        </span>

        {/* Focused - slightly larger */}
        <span
          className={`${theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"} block transform -rotate-1 scale-110 text-3xl xxs:text-4xl xs:text-5xl md:text-7xl lg:text-9xl xl:text-[10rem] font-bold mb-2 xs:mb-3 md:mb-4`}
          style={{
            textShadow:
              theme === "dark"
                ? "8px 8px 0px rgba(232, 121, 249, 0.9), 16px 16px 0px rgba(192, 38, 211, 0.7), 24px 24px 30px rgba(168, 85, 247, 0.5)"
                : "8px 8px 0px rgba(217, 70, 239, 0.8), 16px 16px 0px rgba(168, 85, 247, 0.6), 24px 24px 30px rgba(147, 51, 234, 0.4)",
          }}
        >
          Focused
        </span>

        {/* Builder - back to base size */}
        <span
          className={`${theme === "dark" ? "text-teal-400" : "text-teal-500"} block transform rotate-1.5 scale-105`}
          style={{
            textShadow:
              theme === "dark"
                ? "6px 6px 0px rgba(45, 212, 191, 0.8), 12px 12px 0px rgba(20, 184, 166, 0.6), 18px 18px 25px rgba(6, 182, 212, 0.4)"
                : "6px 6px 0px rgba(20, 184, 166, 0.7), 12px 12px 0px rgba(13, 148, 136, 0.5), 18px 18px 25px rgba(15, 118, 110, 0.3)",
          }}
        >
          Builder
        </span>
      </h1>
    </div>
  );
};

export default HeroHeading;
