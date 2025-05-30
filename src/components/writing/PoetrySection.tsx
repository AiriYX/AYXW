// src/components/writing/PoetrySection.tsx
import React from "react";
import { Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import PoemCard from "./PoemCard";
// Corrected import path for PoemOverviewData
import { PoemOverviewData } from "@/hooks/useContentLoader";

interface PoetrySectionProps {
  poems: PoemOverviewData[];
  poemMoods: string[]; // New: list of all possible moods for filters
  activePoemMoods: string[]; // New: currently active moods
  togglePoemMood: (mood: string) => void; // New: function to toggle mood
}

const PoetrySection: React.FC<PoetrySectionProps> = ({
  poems,
  poemMoods,
  activePoemMoods,
  togglePoemMood,
}) => {
  const { theme } = useTheme();

  return (
    <div className="mb-20">
      <div className="text-center mb-12 pt-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          {/* <Heart
            className={`${
              theme === "dark" ? "text-rose-400" : "text-rose-600"
            }`}
            size={28}
          /> */}
          <h2
            className={`font-playwrite text-3xl md:text-4xl font-semibold ${
              theme === "dark" ? "text-rose-400" : "text-rose-500"
            }`}
          >
            Poetry
          </h2>
        </div>
        <p
          className={`text-lg font-light ${
            theme === "dark" ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          Words that flow from the heart
        </p>
      </div>
      {/* New: Mood filter pills for Poetry */}
      <div className="flex justify-center mb-8">
        <div
          className={`flex flex-wrap gap-2 p-2 rounded-full ${
            theme === "dark" ? "bg-neutral-800/50" : "bg-white/50"
          } backdrop-blur-sm border ${
            theme === "dark" ? "border-neutral-700/50" : "border-neutral-200/50"
          }`}
        >
          {poemMoods.map((mood) => (
            <button
              key={mood}
              onClick={() => togglePoemMood(mood)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activePoemMoods.includes(mood) // Check if mood is active
                  ? theme === "dark"
                    ? "bg-rose-500 text-white" // Rose accent for poetry filters
                    : "bg-rose-500 text-white"
                  : theme === "dark"
                  ? "text-neutral-300 hover:bg-neutral-700/50"
                  : "text-neutral-600 hover:bg-neutral-100/50"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>
      {/* Horizontal Poetry Scroll */}
      <div
        className={`
          overflow-x-auto pb-4
          scrollbar-thin
          scrollbar-thumb-pink-400
          scrollbar-track-zinc-900
          dark:scrollbar-thumb-pink-300
          dark:scrollbar-track-zinc-800
        `}
      >
        <div className="flex gap-6 min-w-max">
          {poems.length === 0 && (
            <div
              className={`text-center py-4 px-6 min-w-max ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              <p>No poems found with the selected moods.</p>
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
