// src/hooks/useContentLoader.tsx
import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";

// Re-using MarkdownFrontmatter and MarkdownModule types from Writing.tsx
export type MarkdownFrontmatter = {
  title: string;
  date: string;
  category?: string | string[];
  readTime?: string;
  mood?: string | string[];
  pdfUrl?: string;
  featured?: boolean;
  excerpt?: string;
};

export type MarkdownModule = {
  html: string;
  attributes: MarkdownFrontmatter;
};

// Define specific data types for clarity
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
  mood: string[];
  slug: string;
  pdfUrl?: string;
  featured: boolean;
};

type ContentType = "blogs" | "poems";

interface UseContentLoaderResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useContentLoader<T>(
  contentType: ContentType,
  sortKey: keyof T
): UseContentLoaderResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        let modules: Record<string, MarkdownModule>;

        if (contentType === "blogs") {
          modules = import.meta.glob("../contents/blogs/*.md", { eager: true });
        } else {
          modules = import.meta.glob("../contents/poems/*.md", { eager: true });
        }

        const loadedItems: T[] = Object.entries(modules).map(
          ([path, module]) => {
            const slug = path.split("/").pop()?.replace(/\.md$/, "") || "";
            const frontmatter = module.attributes;
            const content = module.html;

            let excerpt = frontmatter.excerpt || "";
            if (!excerpt && content) {
              // Generate excerpt from content if not provided in frontmatter
              const cleanContent = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
              excerpt =
                cleanContent.split(/[.?!]/)[0] +
                (cleanContent.split(/[.?!]/)[0].length > 0 ? "." : ""); // Take first sentence
              if (excerpt.length > 150) {
                excerpt = excerpt.substring(0, 150) + "...";
              }
            }

            if (contentType === "blogs") {
              const categoryArray = Array.isArray(frontmatter.category)
                ? frontmatter.category
                : typeof frontmatter.category === "string"
                ? [frontmatter.category]
                : ["Uncategorized"];

              return {
                title: frontmatter.title,
                excerpt: excerpt,
                date: frontmatter.date,
                readTime: frontmatter.readTime || "N/A",
                category: categoryArray,
                slug: slug,
                number: "", // Will be assigned later in Writing.tsx
              } as T;
            } else {
              // contentType === "poems"
              const moodArray = Array.isArray(frontmatter.mood)
                ? frontmatter.mood
                : typeof frontmatter.mood === "string"
                ? [frontmatter.mood]
                : ["General"];

              return {
                title: frontmatter.title,
                excerpt: excerpt,
                date: frontmatter.date,
                mood: moodArray,
                slug: slug,
                pdfUrl: frontmatter.pdfUrl,
                featured: frontmatter.featured || false,
              } as T;
            }
          }
        );

        loadedItems.sort((a: T, b: T) => {
          // Assuming sortKey points to a date string
          const dateA = new Date(String(a[sortKey])).getTime();
          const dateB = new Date(String(b[sortKey])).getTime();
          return dateB - dateA;
        });

        setData(loadedItems);
      } catch (err) {
        console.error(`Failed to load ${contentType}:`, err);
        setError(`Failed to load ${contentType}.`);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentType, sortKey]);

  return { data, loading, error };
}
