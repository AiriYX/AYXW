import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { loadMarkdownPost, BlogPostData } from "@/utils/markdownLoader";
import { format } from "date-fns";

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

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <button
          onClick={() => navigate("/writing")}
          className={`flex items-center gap-2 mb-8 transition-colors ${
            theme === "dark"
              ? "text-fuchsia-400 hover:text-fuchsia-300"
              : "text-fuchsia-600 hover:text-fuchsia-500"
          }`}
        >
          <ArrowLeft size={16} />
          Back to Writing
        </button>

        <article className="animate-fade-in">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  theme === "dark"
                    ? "bg-fuchsia-300/20 text-fuchsia-300"
                    : "bg-fuchsia-200 text-fuchsia-600"
                }`}
              >
                {post.category}
              </span>
              <div
                className={`flex items-center gap-4 text-sm ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <h1
              className={`text-3xl md:text-4xl font-bold font-serif mb-4 ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-800"
              }`}
            >
              {post.title}
            </h1>
          </header>

          <div
            className={`prose max-w-none ${
              theme === "dark" ? "prose-invert" : ""
            } prose-lg prose-headings:font-serif prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
