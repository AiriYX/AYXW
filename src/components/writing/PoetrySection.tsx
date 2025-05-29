// src/components/writing/PoetrySection.tsx
import React from "react";
import { Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import PoemCard from "./PoemCard"; // Import the new PoemCard
import { PoemOverviewData } from "@/pages/Writing"; // Import the type from Writing.tsx

interface PoetrySectionProps {
  poems: PoemOverviewData[];
}

const PoetrySection: React.FC<PoetrySectionProps> = ({ poems }) => {
  const { theme } = useTheme();

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2
            className={`font-playwrite text-3xl md:text-4xl font-semibold ${
              theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-500"
            }`}
          >
            Poetry
          </h2>
          <Heart
            className={`${
              theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"
            }`}
            size={28}
          />
        </div>
        <p
          className={`text-lg font-light ${
            theme === "dark" ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          Words that flow from the heart
        </p>
      </div>

      {/* Horizontal Poetry Scroll */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max">
          {poems.length === 0 && (
            <div
              className={`text-center py-4 px-6 min-w-max ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              <p>No poems found.</p>
            </div>
          )}
          {poems.map((poem) => (
            <PoemCard key={poem.slug} poem={poem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoetrySection;
