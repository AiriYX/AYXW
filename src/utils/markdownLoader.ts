// src/utils/markdownLoader.ts

export type MarkdownFrontmatter = {
  title: string;
  date: string;
  category: string;
  readTime: string;
};

export type MarkdownModule = {
  html: string;
  attributes: MarkdownFrontmatter; // Changed to attributes based on previous discussion
};

export type BlogPostData = {
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
};

const markdownModules: Record<string, MarkdownModule> = import.meta.glob(
  "../contents/blogs/*.md",
  { eager: true }
);

export async function loadMarkdownPost(
  slug: string
): Promise<BlogPostData | null> {
  console.log(`[loadMarkdownPost] received slug: ${slug}`); // New log

  const normalizedSlug = slug.toLowerCase();
  const expectedPathEnd = `/blogs/${normalizedSlug}.md`; // Construct the expected path end

  console.log(`[loadMarkdownPost] normalized slug: ${normalizedSlug}`); // New log
  console.log(`[loadMarkdownPost] expected path end: ${expectedPathEnd}`); // New log
  console.log(
    "[loadMarkdownPost] All markdown modules found by glob:",
    Object.keys(markdownModules) // This is already there, but crucial!
  );

  const entry = Object.entries(markdownModules).find(([path]) => {
    const lowerCaseFullPath = path.toLowerCase();
    const isMatch = lowerCaseFullPath.endsWith(expectedPathEnd);
    console.log(
      `[loadMarkdownPost] Checking path: ${path} (lower: ${lowerCaseFullPath}) against expected: ${expectedPathEnd} - Match: ${isMatch}`
    ); // New log
    return isMatch;
  });

  if (!entry) {
    console.log("[loadMarkdownPost] No matching entry found for slug:", slug); // New log
    return null;
  }

  const importer = entry[1];

  // The 'rawMarkdown' variable from previous discussion has been replaced by the plugin
  // which provides 'html' and 'attributes' directly on the module.
  const module = importer; // In eager mode, importer directly is the module.

  const postHtmlContent = module.html;
  const frontmatter = module.attributes;

  if (frontmatter && postHtmlContent) {
    console.log("[loadMarkdownPost] Successfully parsed post data:", {
      title: frontmatter.title,
      date: frontmatter.date,
      category: frontmatter.category,
      readTime: frontmatter.readTime,
      content: "HTML content present (not logged in full)",
    }); // New log
    return {
      title: frontmatter.title,
      date: frontmatter.date,
      category: frontmatter.category,
      readTime: frontmatter.readTime,
      content: postHtmlContent,
    };
  } else {
    console.warn(
      "[loadMarkdownPost] Post data or content missing after parsing for slug:",
      slug
    ); // New log
    return null;
  }
}
