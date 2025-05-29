import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { useTheme } from "@/contexts/ThemeContext";

// Import the new components
import WritingPageHeader from "@/components/writing/WritingPageHeader";
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
  featured: boolean; // featured property will always be present after processing
};

const Writing = () => {
  const { theme } = useTheme();
  const navigate = useNavigate(); // Still needed for navigation

  // States to hold dynamically loaded articles and poems
  const [blogPosts, setBlogPosts] = useState<BlogPostOverviewData[]>([]);
  const [poems, setPoems] = useState<PoemOverviewData[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingPoems, setLoadingPoems] = useState(true);
  const [errorArticles, setErrorArticles] = useState<string | null>(null);
  const [errorPoems, setErrorPoems] = useState<string | null>(null);

  // Categories for articles. Update these if your markdown files use different categories.
  const articleCategories = [
    "All",
    "AI/Tech",
    "Research",
    "Learning",
    "Technology",
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // Function to load Articles
    const loadArticles = async () => {
      try {
        setLoadingArticles(true);
        // Use import.meta.glob to load all markdown files eagerly from the blogs directory
        const markdownModules: Record<string, MarkdownModule> =
          import.meta.glob("../contents/blogs/*.md", { eager: true });

        const loadedPosts: BlogPostOverviewData[] = Object.entries(
          markdownModules
        ).map(([path, module], index) => {
          const slug =
            path.split("/").pop()?.replace(/\.md$/, "") || `post-${index}`;
          const frontmatter = module.attributes;
          const content = module.html; // HTML content from markdown is available

          // Generate excerpt from the first paragraph or a specified length of HTML
          const excerpt = content
            ? content.replace(/<[^>]*>/g, "").substring(0, 150) + "..." // Strip HTML and take first 150 chars
            : "No excerpt available."; // Fallback if no content or excerpt in frontmatter

          return {
            title: frontmatter.title,
            excerpt: excerpt,
            date: frontmatter.date,
            readTime: frontmatter.readTime || "N/A", // Provide a fallback if readTime is missing
            category: frontmatter.category || "Uncategorized", // Provide a fallback if category is missing
            slug: slug,
            number: String(index + 1).padStart(2, "0"), // Assign numbers dynamically
          };
        });

        // Sort posts by date (newest first)
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

    // Function to load Poems
    const loadPoetry = async () => {
      try {
        setLoadingPoems(true);
        // Use import.meta.glob to load all poem markdown files eagerly
        const poemModules: Record<string, MarkdownModule> = import.meta.glob(
          "../contents/poems/*.md", // Point to the new poems directory
          { eager: true }
        );

        const loadedPoems: PoemOverviewData[] = Object.entries(poemModules).map(
          ([path, module]) => {
            const slug =
              path.split("/").pop()?.replace(/\.md$/, "") || "poem-slug";
            const frontmatter = module.attributes;
            const content = module.html; // HTML content from markdown is available

            // Generate excerpt for poems, e.g., first sentence
            const excerpt = content
              ? content.replace(/<[^>]*>/g, "").split(/[.?!]/)[0] + "." // Strip HTML and get first sentence
              : "No excerpt available."; // Fallback if no content or excerpt in frontmatter

            return {
              title: frontmatter.title,
              excerpt: excerpt,
              date: frontmatter.date,
              mood: frontmatter.mood || "General", // Provide a fallback if mood is missing
              slug: slug,
              pdfUrl: frontmatter.pdfUrl, // Directly use pdfUrl from front matter (can be undefined)
              featured: frontmatter.featured || false, // Default to false if not specified
            };
          }
        );

        // Removed the filter for 'featured' poems here
        // const featuredPoems = loadedPoems.filter(poem => poem.featured);

        // Sort all loaded poems by date (newest first)
        loadedPoems.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setPoems(loadedPoems); // Set all loaded poems
      } catch (err) {
        console.error("Failed to load poems:", err);
        setErrorPoems("Failed to load poems.");
      } finally {
        setLoadingPoems(false);
      }
    };

    // Call both loading functions when the component mounts
    loadArticles();
    loadPoetry();
  }, []); // Empty dependency array means this useEffect runs once on mount

  // Filter articles based on active category
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  // Display loading state while data is being fetched
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

  // Display error state if any loading failed
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
          {/* Poetry Section */}
          {/* Now renders all poems, and the PoemCard handles whether to open PDF or navigate to Markdown page */}
          <PoetrySection poems={poems} />
        </div>
      </div>
    </div>
  );
};

export default Writing;
