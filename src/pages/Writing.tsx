import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { useTheme } from "@/contexts/ThemeContext";

import WritingPageHeader from "@/components/writing/WritingPageHeader";
import ArticleList from "@/components/writing/ArticleList";
import PoetrySection from "@/components/writing/PoetrySection"; // Ensure this import is correct

export type MarkdownFrontmatter = {
  title: string;
  date: string;
  category?: string | string[];
  readTime?: string;
  mood?: string; // mood is specific to poems
  pdfUrl?: string;
  featured?: boolean;
};

export type MarkdownModule = {
  html: string;
  attributes: MarkdownFrontmatter;
};

export type BlogPostOverviewData = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string[];
  slug: string;
  number: string;
};

export type PoemOverviewData = {
  title: string;
  excerpt: string;
  date: string;
  mood: string;
  slug: string;
  pdfUrl?: string;
  featured: boolean;
};

const Writing = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [blogPosts, setBlogPosts] = useState<BlogPostOverviewData[]>([]);
  const [poems, setPoems] = useState<PoemOverviewData[]>([]); // This will contain all poems loaded
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingPoems, setLoadingPoems] = useState(true);
  const [errorArticles, setErrorArticles] = useState<string | null>(null);
  const [errorPoems, setErrorPoems] = useState<string | null>(null);

  const articleCategories = [
    "All",
    "AI/Tech",
    "Research",
    "Learning",
    "Technology",
  ];
  const [activeArticleCategories, setActiveArticleCategories] = useState<
    string[]
  >(["All"]); // Renamed for clarity

  // New state for poetry filters
  const poemMoods = [
    "All",
    "Contemplative",
    "Nostalgic",
    "Introspective",
    "Hopeful",
    "Philosophical",
  ]; // Example moods, update as needed
  const [activePoemMoods, setActivePoemMoods] = useState<string[]>(["All"]);

  // Toggle function for Article Categories
  const toggleArticleCategory = (category: string) => {
    setActiveArticleCategories((prevCategories) => {
      if (category === "All") {
        return ["All"];
      } else {
        const updatedCategories = prevCategories.filter((cat) => cat !== "All");

        if (updatedCategories.includes(category)) {
          const newCategories = updatedCategories.filter(
            (cat) => cat !== category
          );
          return newCategories.length === 0 ? ["All"] : newCategories;
        } else {
          return [...updatedCategories, category];
        }
      }
    });
  };

  // New toggle function for Poem Moods
  const togglePoemMood = (mood: string) => {
    setActivePoemMoods((prevMoods) => {
      if (mood === "All") {
        return ["All"];
      } else {
        const updatedMoods = prevMoods.filter((m) => m !== "All");

        if (updatedMoods.includes(mood)) {
          const newMoods = updatedMoods.filter((m) => m !== mood);
          return newMoods.length === 0 ? ["All"] : newMoods;
        } else {
          return [...updatedMoods, mood];
        }
      }
    });
  };

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoadingArticles(true);
        const markdownModules: Record<string, MarkdownModule> =
          import.meta.glob("../contents/blogs/*.md", { eager: true });

        const loadedPosts: BlogPostOverviewData[] = Object.entries(
          markdownModules
        ).map(([path, module]) => {
          const slug =
            path.split("/").pop()?.replace(/\.md$/, "") || `post-slug`;
          const frontmatter = module.attributes;
          const content = module.html;

          const categoryArray = Array.isArray(frontmatter.category)
            ? frontmatter.category
            : typeof frontmatter.category === "string"
            ? [frontmatter.category]
            : ["Uncategorized"];

          const excerpt = content
            ? content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
            : "No excerpt available.";

          return {
            title: frontmatter.title,
            excerpt: excerpt,
            date: frontmatter.date,
            readTime: frontmatter.readTime || "N/A",
            category: categoryArray,
            slug: slug,
            number: "",
          };
        });

        loadedPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setBlogPosts(loadedPosts);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
        setErrorArticles("Failed to load articles.");
      } finally {
        setLoadingArticles(false);
      }
    };

    const loadPoetry = async () => {
      try {
        setLoadingPoems(true);
        const poemModules: Record<string, MarkdownModule> = import.meta.glob(
          "../contents/poems/*.md",
          { eager: true }
        );

        const loadedPoems: PoemOverviewData[] = Object.entries(poemModules).map(
          ([path, module]) => {
            const slug =
              path.split("/").pop()?.replace(/\.md$/, "") || "poem-slug";
            const frontmatter = module.attributes;
            const content = module.html;

            const excerpt = content
              ? content.replace(/<[^>]*>/g, "").split(/[.?!]/)[0] + "."
              : "No excerpt available.";

            return {
              title: frontmatter.title,
              excerpt: excerpt,
              date: frontmatter.date,
              mood: frontmatter.mood || "General",
              slug: slug,
              pdfUrl: frontmatter.pdfUrl,
              featured: frontmatter.featured || false,
            };
          }
        );

        // The sorting by date happens here for all loaded poems
        loadedPoems.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setPoems(loadedPoems); // All poems are now loaded and sorted here
      } catch (err) {
        console.error("Failed to load poems:", err);
        setErrorPoems("Failed to load poems.");
      } finally {
        setLoadingPoems(false);
      }
    };

    loadArticles();
    loadPoetry();
  }, []);

  // Filtering logic for Articles (no change here, still activeCategories)
  const postsToDisplay = useMemo(() => {
    let currentPosts = blogPosts;

    if (!activeArticleCategories.includes("All")) {
      currentPosts = blogPosts.filter((post) =>
        activeArticleCategories.every((activeCat) =>
          post.category.includes(activeCat)
        )
      );
    }

    return currentPosts.map((post, index) => ({
      ...post,
      number: String(index + 1).padStart(2, "0"),
    }));
  }, [blogPosts, activeArticleCategories]);

  // New filtering logic for Poems
  const poemsToDisplay = useMemo(() => {
    let currentPoems = poems; // Use the 'poems' state which contains all sorted poems

    // Filter by 'featured' status if not "All" moods are selected, or if you want to always show only featured.
    // Based on previous discussion, if no filter is applied, only featured poems were shown.
    // Now, if "All" is selected, show all poems. Otherwise, filter by mood.
    if (!activePoemMoods.includes("All")) {
      currentPoems = currentPoems.filter(
        (poem) => activePoemMoods.some((activeMood) => poem.mood === activeMood) // Assuming mood is a single string for now
      );
    }

    // You might also want to re-apply featured filter if it's a global requirement
    // For now, I'll assume that if a mood filter is active, it takes precedence.
    // If "All" is selected, it shows all poems (featured and non-featured).
    // If a specific mood is selected, it shows all poems of that mood.
    // If you explicitly want ONLY featured poems to ever show, add a .filter(poem => poem.featured) here.
    // Example: currentPoems = currentPoems.filter(poem => poem.featured && activePoemMoods.some(...));

    return currentPoems; // Return the filtered (and already sorted) poems
  }, [poems, activePoemMoods]);

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

          <PoetrySection // Pass new props for filtering
            poems={poemsToDisplay} // Pass the newly filtered poems
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
