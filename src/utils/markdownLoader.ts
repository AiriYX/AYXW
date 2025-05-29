// src/utils/markdownLoader.ts

// Define the type for the frontmatter data from your markdown files
export type MarkdownFrontmatter = {
  title: string;
  date: string;
  category: string;
  readTime: string;
};

// Define the type for the module exported by vite-plugin-markdown
// This tells TypeScript what to expect when importing a markdown file
export type MarkdownModule = {
  html: string; // The plugin provides the HTML content
  frontmatter: MarkdownFrontmatter; // The plugin provides the parsed frontmatter
  // You might also find 'raw' or 'default' depending on plugin config,
  // but html and frontmatter are the main ones for this use case.
};

export type BlogPostData = {
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string; // This will now be the HTML content
};

// Use eager: true to import all modules immediately at build time
// Tell TypeScript that the values in this record are MarkdownModule types
const markdownModules: Record<string, MarkdownModule> = import.meta.glob(
  "../contents/blogs/*.md",
  { eager: true }
);

export async function loadMarkdownPost(
  slug: string
): Promise<BlogPostData | null> {
  const normalizedSlug = slug.toLowerCase();

  // Find the module based on the file name
  for (const path in markdownModules) {
    if (path.toLowerCase().endsWith(`/blogs/${normalizedSlug}.md`)) {
      const module = markdownModules[path]; // Now `module` is correctly typed as `MarkdownModule`

      // No more 'as any'! TypeScript now knows `module` has `html` and `frontmatter`
      const postHtmlContent = module.html;
      const frontmatter = module.frontmatter;

      if (frontmatter && postHtmlContent) {
        return {
          title: frontmatter.title,
          date: frontmatter.date,
          category: frontmatter.category,
          readTime: frontmatter.readTime,
          content: postHtmlContent,
        };
      }
    }
  }
  return null;
}
