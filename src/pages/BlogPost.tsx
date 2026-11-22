import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import NeonPage from "@/components/theme/NeonPage";
import { loadMarkdownPost, BlogPostData } from "@/utils/markdownLoader";
import { format } from "date-fns";

/** Pull the "Works Cited / References" section off the end of an essay and
 *  turn its raw URLs into short source links. */
const splitCitations = (html: string) => {
  const m = html.match(
    /<h[2-4][^>]*>\s*(works cited|references|sources|bibliography)\s*<\/h[2-4]>/i,
  );
  // first text paragraph (not the cover image) gets the drop cap
  const lead = (h: string) =>
    h.replace(/<p>(?!\s*<img)/, '<p class="np-lead">');
  if (!m || m.index === undefined)
    return { body: lead(html), citations: "", citationCount: 0 };
  const body = lead(html.slice(0, m.index));
  const citations = html
    .slice(m.index + m[0].length)
    .replace(/<code>(https?:\/\/[^<\s]+)<\/code>/g, (_all, url: string) => {
      let host = url;
      try {
        host = new URL(url).hostname.replace(/^www\./, "");
      } catch {
        /* keep raw */
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${host}</a>`;
    });
  const citationCount = (citations.match(/<li/g) || []).length;
  return { body, citations, citationCount };
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ...existing code...
    const fetchPost = async () => {
      if (!slug || typeof slug !== "string") {
        setError("No post slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("[BlogPost] fetching slug:", slug);
        const postData = await loadMarkdownPost(slug);
        console.log("[BlogPost] postData:", postData);
        if (postData) {
          setPost(postData);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className={`text-lg ${
              theme === "dark" ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <button
            onClick={() => navigate("/writing")}
            className="text-fuchsia-500 hover:text-fuchsia-600 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Writing
          </button>
        </div>
      </div>
    );
  }

  const isDark = theme === "dark";
  const { body, citations, citationCount } = splitCitations(post.content);
  const categories = (
    Array.isArray(post.category) ? post.category : [post.category]
  ).filter(Boolean);
  const date = new Date(post.date);

  return (
    <NeonPage>
      <div className="mx-auto max-w-4xl px-3 py-10 md:px-6 md:py-14">
        <button
          onClick={() => navigate("/writing")}
          className={`mb-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
            isDark
              ? "border-white/10 text-neutral-400 hover:border-pink-400/60 hover:text-pink-300"
              : "border-pink-200 bg-white/60 text-slate-500 hover:border-pink-400 hover:text-pink-600"
          }`}
        >
          <ArrowLeft size={13} /> back to the board
        </button>

        <article className="newspaper animate-fade-in px-5 py-6 sm:px-10 sm:py-8">
          {/* masthead */}
          <header className="text-center">
            <div className="np-meta flex items-center justify-between np-hair border-b pb-1.5">
              <span>New York</span>
              <span className="hidden sm:inline">
                {format(date, "EEEE, MMMM d, yyyy")}
              </span>
              <span>{post.readTime}</span>
            </div>
            <p className="font-playwrite py-3 text-3xl leading-[1.5] sm:text-5xl">
              The Brewed Times
            </p>
            <div className="np-double-rule" />
            <p className="np-meta py-1.5">
              {categories.join(" · ") || "Essay"}
            </p>
            <div className="np-rule" />
          </header>

          {/* headline */}
          <div className="mx-auto max-w-2xl py-6 text-center">
            <h1 className="text-[1.65rem] font-extrabold leading-[1.15] tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-3 text-sm italic leading-6 opacity-75 sm:text-[15px]">
                {post.excerpt}
              </p>
            )}
            <p className="np-meta mt-4">
              By <span className="font-bold">Airi Weng</span> ·{" "}
              {format(date, "MMM d, yyyy")}
            </p>
          </div>
          <div className="np-rule mb-6" />

          {/* story */}
          <div className="np-body" dangerouslySetInnerHTML={{ __html: body }} />

          {/* condensed works cited */}
          {citations && (
            <details className="np-cited np-hair mt-8 border-t pt-3">
              <summary className="np-meta cursor-pointer select-none">
                Works cited · {citationCount} sources
                <span className="np-toggle ml-1 opacity-60" />
              </summary>
              <div
                className="np-cited-list mt-3"
                dangerouslySetInnerHTML={{ __html: citations }}
              />
            </details>
          )}

          <p className="np-meta mt-8 text-center opacity-60">— 30 —</p>
        </article>
      </div>
    </NeonPage>
  );
};

export default BlogPost;
