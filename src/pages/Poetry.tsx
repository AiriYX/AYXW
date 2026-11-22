// src/pages/Poetry.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import NeonPage from "@/components/theme/NeonPage";
import PixelIcon from "@/components/theme/PixelIcon";
import { format } from "date-fns"; // Add this import at the top

// Re-using MarkdownFrontmatter and MarkdownModule types
export type MarkdownFrontmatter = {
  title: string;
  date: string;
  mood: string | string[];
  pdfUrl?: string; // pdfUrl is now optional
  excerpt?: string; // MODIFIED: Added optional excerpt field
};

export type MarkdownModule = {
  html: string;
  attributes: MarkdownFrontmatter;
};

export type PoemData = {
  title: string;
  content: string;
  date: string;
  mood: string[];
  pdfUrl?: string; // pdfUrl is now optional
  excerpt?: string; // MODIFIED: Added optional excerpt field
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
          { eager: true },
        );

        const normalizedSlug = slug.toLowerCase();
        const entry = Object.entries(poemModules).find(([path]) =>
          path.toLowerCase().endsWith(`/poems/${normalizedSlug}.md`),
        );

        if (!entry) {
          setError("Poem not found");
          setLoading(false);
          return;
        }

        const module = entry[1];
        const poemContent = module.html;
        const frontmatter = module.attributes;

        // ADDED: Ensure mood is an array
        const moodArray = Array.isArray(frontmatter.mood)
          ? frontmatter.mood
          : typeof frontmatter.mood === "string"
            ? [frontmatter.mood]
            : ["General"]; // Default if no mood is provided

        // MODIFIED: Use frontmatter.excerpt if available
        const poemExcerpt = frontmatter.excerpt;

        if (frontmatter && poemContent) {
          setPoem({
            title: frontmatter.title,
            content: poemContent,
            date: frontmatter.date,
            mood: moodArray, // Use the processed moodArray
            pdfUrl: frontmatter.pdfUrl, // Pass pdfUrl through
            excerpt: poemExcerpt, // ADDED: Pass the excerpt
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

  const isDark = theme === "dark";

  return (
    <NeonPage>
      <div className="mx-auto max-w-xl px-4 py-12 md:py-16">
        <button
          onClick={() => navigate("/writing")}
          className={`mb-8 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
            isDark
              ? "border-white/10 text-neutral-400 hover:border-pink-400/60 hover:text-pink-300"
              : "border-pink-200 bg-white/60 text-slate-500 hover:border-pink-400 hover:text-pink-600"
          }`}
        >
          <ArrowLeft size={13} /> back to the board
        </button>

        <article
          className={`paper-note animate-fade-in relative rounded-md px-6 pb-8 pt-10 md:px-10 ${
            isDark ? "paper-night" : "paper-day"
          }`}
          style={{ rotate: "0deg" }}
        >
          <span className="paper-tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg]" />
          <header className="mb-4 text-center">
            <PixelIcon name="moon" size={28} className="mx-auto" />
            <h1
              className={`font-playwrite mt-2 text-2xl leading-[1.6] md:text-3xl ${
                isDark ? "text-pink-200" : "text-pink-700"
              }`}
            >
              {poem.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              {poem.mood.map((m) => (
                <span
                  key={m}
                  className={`ink-stamp rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.2em] ${
                    isDark
                      ? "border-pink-300/50 text-pink-300/80"
                      : "border-pink-500/50 text-pink-600/80"
                  }`}
                >
                  {m}
                </span>
              ))}
              <span
                className={`text-[10px] uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-slate-400"}`}
              >
                {format(new Date(poem.date), "MMM d, yyyy")}
              </span>
            </div>
          </header>

          <div
            className={`font-playwrite whitespace-pre-line text-center text-[15px] leading-[2.05] [&_p]:mb-4 ${
              isDark ? "text-neutral-200" : "text-slate-700"
            }`}
            dangerouslySetInnerHTML={{ __html: poem.content }}
          />
        </article>
      </div>
    </NeonPage>
  );
};

export default Poetry;
