// src/components/writing/ArticleList.tsx
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import ArticleCard from "./ArticleCard";
// Corrected import path for BlogPostOverviewData
import { BlogPostOverviewData } from "@/hooks/useContentLoader";

interface ArticleListProps {
  filteredPosts: BlogPostOverviewData[];
  articleCategories: string[];
  activeCategories: string[]; // Changed to array
  toggleCategory: (category: string) => void; // New function to toggle categories
}

const ArticleList: React.FC<ArticleListProps> = ({
  filteredPosts,
  articleCategories,
  activeCategories,
  toggleCategory, // Destructure the new function
}) => {
  const { theme } = useTheme();

  return (
    <div className="mb-12">
      {/* Category filter pills */}
      <div className="flex justify-center mb-8">
        <div
          className={`flex flex-wrap gap-2 p-2 rounded-full ${
            theme === "dark" ? "bg-neutral-800/50" : "bg-white/50"
          } backdrop-blur-sm border ${
            theme === "dark" ? "border-neutral-700/50" : "border-neutral-200/50"
          }`}
        >
          {articleCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)} // Use the new toggleCategory function
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategories.includes(category) // Check if category is active
                  ? theme === "dark"
                    ? "bg-fuchsia-500 text-white"
                    : "bg-fuchsia-500 text-white"
                  : theme === "dark"
                  ? "text-neutral-300 hover:bg-neutral-700/50"
                  : "text-neutral-600 hover:bg-neutral-100/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts in numbered format */}
      <div className="space-y-16">
        {filteredPosts.length === 0 && (
          <div
            className={`text-center py-12 ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            <p>No articles found in this category.</p>
          </div>
        )}
        {filteredPosts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
