// src/components/writing/WritingPageHeader.tsx
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const WritingPageHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="text-center mb-20">
      <div className="relative inline-block mb-8">
        <h1
          className={`text-4xl md:text-5xl font-bold mb-6 font-playwrite ${
            theme === "dark" ? "text-neutral-100" : "text-neutral-800"
          } text-center`}
        >
          <span
            className={
              theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"
            }
          >
            Ink{" "}
          </span>
          & Logic
        </h1>
        <p
          className={`text-sm md:text-base text-center font-light mb-2 ${
            theme === "dark" ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          A little corner for thoughts that don't fit into a GitHub repo.
        </p>
      </div>
    </div>
  );
};

export default WritingPageHeader;
