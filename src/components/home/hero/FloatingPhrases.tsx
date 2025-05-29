
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const FloatingPhrases = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="w-full h-full max-w-6xl relative">
        {/* Top flowing phrases */}
        <span
          className={`absolute top-[20%] left-[15%] text-sm font-light transform rotate-12 ${theme === "dark" ? "text-rose-300/60" : "text-rose-400/50"}`}
        >
          create
        </span>
        <span
          className={`absolute top-[25%] right-[20%] text-xs font-light transform -rotate-6 ${theme === "dark" ? "text-fuchsia-300/50" : "text-fuchsia-400/45"}`}
        >
          explore
        </span>

        {/* Middle flowing phrases */}
        <span
          className={`absolute top-[45%] left-[8%] text-sm font-light transform rotate-[-8deg] ${theme === "dark" ? "text-teal-300/60" : "text-teal-400/50"}`}
        >
          iterate
        </span>
        <span
          className={`absolute top-[50%] right-[12%] text-xs font-light transform rotate-15 ${theme === "dark" ? "text-rose-300/50" : "text-rose-400/45"}`}
        >
          innovate
        </span>
        <span
          className={`absolute top-[42%] left-[45%] text-xs font-light transform rotate-3 ${theme === "dark" ? "text-fuchsia-300/45" : "text-fuchsia-400/40"}`}
        >
          design
        </span>

        {/* Lower flowing phrases */}
        <span
          className={`absolute top-[70%] left-[25%] text-sm font-light transform -rotate-12 ${theme === "dark" ? "text-teal-300/50" : "text-teal-400/45"}`}
        >
          dream
        </span>
        <span
          className={`absolute top-[75%] right-[35%] text-xs font-light transform rotate-8 ${theme === "dark" ? "text-rose-300/60" : "text-rose-400/50"}`}
        >
          build
        </span>
        <span
          className={`absolute top-[68%] right-[8%] text-sm font-light transform -rotate-5 ${theme === "dark" ? "text-fuchsia-300/50" : "text-fuchsia-400/45"}`}
        >
          inspire
        </span>
      </div>
    </div>
  );
};

export default FloatingPhrases;
