
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const HeroTagline = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`text-center mb-16 ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
    >
      <p className="text-xs xxs:text-sm xs:text-base md:text-lg xl:text-xl font-light max-w-xs xxs:max-w-sm xs:max-w-md xl:max-w-lg mx-auto leading-relaxed">
        Visionary developer that
        <br />
        dedicated to transforming
        <br />
        your ideas into digital reality
      </p>
    </div>
  );
};

export default HeroTagline;
