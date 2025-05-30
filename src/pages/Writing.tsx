// src/pages/Writing.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Keep navigate if it's used elsewhere

import { useTheme } from "@/contexts/ThemeContext";
import {
  useContentLoader,
  BlogPostOverviewData,
  PoemOverviewData,
} from "@/hooks/useContentLoader"; // Import the new hook
import { useCategoryFilter } from "@/hooks/useCategoryFilter"; // Import the new filter hook

import WritingPageHeader from "@/components/writing/WritingPageHeader";
import ArticleList from "@/components/writing/ArticleList";
import PoetrySection from "@/components/writing/PoetrySection";

const Writing = () => {
  const { theme } = useTheme();

  // Load blog posts using the new hook
  const {
    data: allBlogPosts,
    loading: loadingArticles,
    error: errorArticles,
  } = useContentLoader<BlogPostOverviewData>("blogs", "date");

  // Load poems using the new hook
  const {
    data: allPoems,
    loading: loadingPoems,
    error: errorPoems,
  } = useContentLoader<PoemOverviewData>("poems", "date");

  // Define available categories/moods
  const articleCategories = [
    "All",
    "AI/Tech",
    "Research",
    "Learning",
    "Technology",
  ];
  const poemMoods = [
    "All",
    "Contemplative",
    "Nostalgic",
    "Introspective",
    "Hopeful",
    "Melancholic",
  ];

  // Use the new category filter hook for articles
  const {
    activeCategories: activeArticleCategories,
    toggleCategory: toggleArticleCategory,
    filterContent: filterArticles,
  } = useCategoryFilter(articleCategories);

  // Use the new category filter hook for poems
  const {
    activeCategories: activePoemMoods,
    toggleCategory: togglePoemMood,
    filterContent: filterPoems,
  } = useCategoryFilter(poemMoods);

  // Filter and number blog posts
  const postsToDisplay = useMemo(() => {
    const filtered = filterArticles(allBlogPosts, "articles");
    return filtered.map((post, index) => ({
      ...post,
      number: String(index + 1).padStart(2, "0"),
    }));
  }, [allBlogPosts, activeArticleCategories, filterArticles]);

  // Filter poems
  const poemsToDisplay = useMemo(() => {
    return filterPoems(allPoems, "poems");
  }, [allPoems, activePoemMoods, filterPoems]);

  if (loadingArticles || loadingPoems) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className={`text-lg ${
              theme === "dark" ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            Loading content...
          </div>
        </div>
      </div>
    );
  }

  if (errorArticles || errorPoems) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading content</h1>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {errorArticles || errorPoems}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="animate-fade-in">
          <WritingPageHeader />

          <ArticleList
            filteredPosts={postsToDisplay}
            articleCategories={articleCategories}
            activeCategories={activeArticleCategories}
            toggleCategory={toggleArticleCategory}
          />

          <PoetrySection
            poems={poemsToDisplay}
            poemMoods={poemMoods}
            activePoemMoods={activePoemMoods}
            togglePoemMood={togglePoemMood}
          />
        </div>
      </div>
    </div>
  );
};

export default Writing;
