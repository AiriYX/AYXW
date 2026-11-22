// src/types/markdown.ts
// Shared types for markdown content loaded via vite-plugin-markdown.
// Used by both the single-post loader (utils/markdownLoader) and the
// list loader hook (hooks/useContentLoader).

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
