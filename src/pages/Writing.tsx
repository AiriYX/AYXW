import React, { useState, useEffect, useMemo } from "react"; // Import useMemo
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { useTheme } from "@/contexts/ThemeContext";

import WritingPageHeader from "@/components/writing/WritingPageHeader";
import ArticleList from "@/components/writing/ArticleList";
import PoetrySection from "@/components/writing/PoetrySection";

export type MarkdownFrontmatter = {
  title: string;
  date: string;
  category?: string;
  readTime?: string;
  mood?: string;
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
  category: string;
  slug: string;
  number: string; // This will now be assigned dynamically in filteredPosts
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
  const [poems, setPoems] = useState<PoemOverviewData[]>([]);
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
  const [activeCategories, setActiveCategories] = useState<string[]>(["All"]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prevCategories) => {
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

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoadingArticles(true);
        const markdownModules: Record<string, MarkdownModule> =
          import.meta.glob("../contents/blogs/*.md", { eager: true });

        const loadedPosts: BlogPostOverviewData[] = Object.entries(
          markdownModules
        ).map(([path, module]) => {
          // Removed index here
          const slug =
            path.split("/").pop()?.replace(/\.md$/, "") || `post-slug`;
          const frontmatter = module.attributes;
          const content = module.html;

          const excerpt = content
            ? content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
            : "No excerpt available.";

          return {
            title: frontmatter.title,
            excerpt: excerpt,
            date: frontmatter.date,
            readTime: frontmatter.readTime || "N/A",
            category: frontmatter.category || "Uncategorized",
            slug: slug,
            number: "", // Temporarily set to empty string, will be assigned later
          };
        });

        // Sort all loaded posts by date (newest first)
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

        loadedPoems.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setPoems(loadedPoems);
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

  // Use useMemo to re-calculate filteredPosts only when blogPosts or activeCategories change
  const postsToDisplay = useMemo(() => {
    let currentPosts = blogPosts;

    // Apply category filtering
    if (!activeCategories.includes("All")) {
      currentPosts = blogPosts.filter((post) =>
        activeCategories.some((cat) => post.category === cat)
      );
    }

    // Assign sequential numbers AFTER filtering and sorting
    return currentPosts.map((post, index) => ({
      ...post,
      number: String(index + 1).padStart(2, "0"),
    }));
  }, [blogPosts, activeCategories]);

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
            filteredPosts={postsToDisplay} // Pass the newly calculated postsToDisplay
            articleCategories={articleCategories}
            activeCategories={activeCategories}
            toggleCategory={toggleCategory}
          />

          <PoetrySection poems={poems} />
        </div>
      </div>
    </div>
  );
};

export default Writing;
