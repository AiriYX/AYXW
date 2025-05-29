import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Re-using MarkdownFrontmatter and MarkdownModule types
export type MarkdownFrontmatter = {
  title: string;
  date: string;
  mood: string;
  pdfUrl?: string; // pdfUrl is now optional
};

export type MarkdownModule = {
  html: string;
  attributes: MarkdownFrontmatter;
};

export type PoemData = {
  title: string;
  content: string;
  date: string;
  mood: string;
  pdfUrl?: string; // pdfUrl is now optional
};

const Poetry = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [poem, setPoem] = useState<PoemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoem = async () => {
      if (!slug || typeof slug !== "string") {
        setError("No poem slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const poemModules: Record<string, MarkdownModule> = import.meta.glob(
          "../contents/poems/*.md", // Point to the new poems directory
          { eager: true }
        );

        const normalizedSlug = slug.toLowerCase();
        const entry = Object.entries(poemModules).find(([path]) =>
          path.toLowerCase().endsWith(`/poems/${normalizedSlug}.md`)
        );

        if (!entry) {
          setError("Poem not found");
          setLoading(false);
          return;
        }

        const module = entry[1];
        const poemContent = module.html;
        const frontmatter = module.attributes;

        if (frontmatter && poemContent) {
          setPoem({
            title: frontmatter.title,
            content: poemContent,
            date: frontmatter.date,
            mood: frontmatter.mood,
            pdfUrl: frontmatter.pdfUrl, // Pass pdfUrl through
          });
        } else {
          setError("Failed to parse poem content.");
        }
      } catch (err) {
        console.error("Error loading poem:", err);
        setError("Failed to load poem.");
      } finally {
        setLoading(false);
      }
    };

    fetchPoem();
  }, [slug]);

  // If a PDF URL exists, redirect immediately
  // This ensures that clicking "Open PDF" from Writing.tsx doesn't lead here first.
  useEffect(() => {
    if (poem?.pdfUrl) {
      window.location.href = poem.pdfUrl; // Use window.location.href for direct redirect
    }
  }, [poem]); // Only run when poem object changes

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className={`text-lg ${
              theme === "dark" ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            Loading poem...
          </div>
        </div>
      </div>
    );
  }

  if (error || !poem) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Poem not found</h1>
          <button
            onClick={() => navigate("/writing")}
            className="text-rose-500 hover:text-rose-600 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Writing
          </button>
        </div>
      </div>
    );
  }

  // Only render if there's no pdfUrl (meaning it's a markdown poem to display)
  if (poem.pdfUrl) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className={`text-lg ${
              theme === "dark" ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            Redirecting to PDF...
          </div>
          <button
            onClick={() => navigate("/writing")}
            className="text-rose-500 hover:text-rose-600 flex items-center gap-2 mt-4"
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
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  theme === "dark"
                    ? "bg-rose-300/20 text-rose-300"
                    : "bg-rose-200 text-rose-600"
                }`}
              >
                {poem.mood}
              </span>
            </div>
            <h1
              className={`text-3xl md:text-4xl font-bold font-serif mb-4 ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-800"
              }`}
            >
              {poem.title}
            </h1>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {poem.date}
            </p>
          </header>

          <div
            className={`prose max-w-2xl mx-auto text-center leading-relaxed text-lg font-light whitespace-pre-line ${
              theme === "dark"
                ? "prose-invert text-neutral-200"
                : "text-neutral-700"
            }`}
            dangerouslySetInnerHTML={{ __html: poem.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default Poetry;
