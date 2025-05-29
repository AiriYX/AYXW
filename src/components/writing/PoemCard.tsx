// src/components/writing/PoemCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { PoemOverviewData } from "@/pages/Writing"; // Import the type from Writing.tsx

interface PoemCardProps {
  poem: PoemOverviewData;
}

const PoemCard: React.FC<PoemCardProps> = ({ poem }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      key={poem.slug}
      onClick={() => {
        if (poem.pdfUrl) {
          window.open(poem.pdfUrl, "_blank"); // Open PDF in new tab
        } else {
          navigate(`/writing/poetry/${poem.slug}`); // Navigate to Markdown page
        }
      }}
      className={`flex-shrink-0 w-80 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
        theme === "dark"
          ? "bg-gradient-to-br from-neutral-800/60 to-neutral-900/40 border border-neutral-700/50 hover:border-rose-300/30"
          : "bg-gradient-to-br from-white/80 to-rose-50/60 border border-rose-200/40 shadow-lg hover:shadow-xl hover:border-rose-600/30"
      }`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              theme === "dark"
                ? "bg-fuchsia-300/20 text-fuchsia-300"
                : "bg-fuchsia-200 text-fuchsia-600"
            }`}
          >
            {poem.mood}
          </span>
          <span
            className={`text-xs ${
              theme === "dark" ? "text-neutral-500" : "text-neutral-400"
            }`}
          >
            {poem.date}
          </span>
        </div>
        <h3
          className={`text-xl font-serif font-semibold mb-3 ${
            theme === "dark" ? "text-neutral-100" : "text-neutral-800"
          }`}
        >
          {poem.title}
        </h3>
      </div>

      <p
        className={`text-sm italic leading-relaxed mb-4 ${
          theme === "dark" ? "text-neutral-300" : "text-neutral-600"
        }`}
      >
        "{poem.excerpt}"
      </p>

      <div
        className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
          theme === "dark"
            ? "text-fuchsia-400 hover:text-white"
            : "text-fuchsia-600 hover:text-rose-500"
        }`}
      >
        <BookOpen size={14} />
        {/* Change button text based on PDF availability */}
        <span>{poem.pdfUrl ? "Open PDF" : "Read poem"}</span>
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default PoemCard;
