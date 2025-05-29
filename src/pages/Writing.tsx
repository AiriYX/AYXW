import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Still needed for date formatting

import { useTheme } from "@/contexts/ThemeContext";

// Import the new components
import WritingPageHeader from "@/components/writing/writingPageHeader";
import ArticleList from "@/components/writing/ArticleList";
import PoetrySection from "@/components/writing/PoetrySection";

// Re-defining shared types here for clarity, or you could move them to a separate types file
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
  const navigate = useNavigate(); // Still needed for navigation

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
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoadingArticles(true);
        const markdownModules: Record<string, MarkdownModule> =
          import.meta.glob("../contents/blogs/*.md", { eager: true });

        const loadedPosts: BlogPostOverviewData[] = Object.entries(
          markdownModules
        ).map(([path, module], index) => {
          const slug =
            path.split("/").pop()?.replace(/\.md$/, "") || `post-${index}`;
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
            number: String(index + 1).padStart(2, "0"),
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

        const featuredPoems = loadedPoems.filter((poem) => poem.featured);
        featuredPoems.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setPoems(featuredPoems);
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

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

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
          <WritingPageHeader /> {/* Render the header component */}
          <ArticleList
            filteredPosts={filteredPosts}
            articleCategories={articleCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />{" "}
          {/* Render the article list component */}
          <PoetrySection poems={poems} />{" "}
          {/* Render the poetry section component */}
        </div>
      </div>
    </div>
  );
};

export default Writing;
