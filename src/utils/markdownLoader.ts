// src/utils/markdownLoader.ts
import type { MarkdownModule } from "@/types/markdown";

export type { MarkdownFrontmatter, MarkdownModule } from "@/types/markdown";

export type BlogPostData = {
  title: string;
  date: string;
  category: string | string[];
  readTime: string;
  excerpt?: string;
  content: string;
};

const markdownModules: Record<string, MarkdownModule> = import.meta.glob(
  "../contents/blogs/*.md",
  { eager: true },
);

export async function loadMarkdownPost(
  slug: string,
): Promise<BlogPostData | null> {
  const expectedPathEnd = `/blogs/${slug.toLowerCase()}.md`;

  const entry = Object.entries(markdownModules).find(([path]) =>
    path.toLowerCase().endsWith(expectedPathEnd),
  );

  if (!entry) {
    console.warn(`[loadMarkdownPost] No matching post found for slug: ${slug}`);
    return null;
  }

  const module = entry[1];
  const frontmatter = module.attributes;
  const content = module.html;

  if (!frontmatter || !content) {
    console.warn(
      `[loadMarkdownPost] Post data or content missing for slug: ${slug}`,
    );
    return null;
  }

  return {
    title: frontmatter.title,
    date: frontmatter.date,
    category: frontmatter.category ?? "",
    readTime: frontmatter.readTime ?? "",
    excerpt: frontmatter.excerpt,
    content,
  };
}
