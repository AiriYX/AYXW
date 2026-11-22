import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { useTheme } from "@/contexts/ThemeContext";
import NeonPage from "@/components/theme/NeonPage";
import PixelIcon from "@/components/theme/PixelIcon";
import PdfPages from "@/components/writing/PdfPages";
import type { MarkdownModule } from "@/types/markdown";

// all poems are bundled at build time, so a poem is found instantly
// (no loading flash, and refreshing /writing/poetry/<slug> just works)
const POEMS = import.meta.glob("../contents/poems/*.md", {
  eager: true,
}) as Record<string, MarkdownModule>;

/** Frontmatter dates are calendar days; read them without a timezone shift. */
const toLocalDay = (d: string | Date) => {
  const date = new Date(d);
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

const findPoem = (slug?: string) => {
  if (!slug) return null;
  const hit = Object.entries(POEMS).find(([path]) =>
    path.toLowerCase().endsWith(`/poems/${slug.toLowerCase()}.md`),
  );
  if (!hit) return null;
  const { html, attributes: fm } = hit[1];
  const mood = Array.isArray(fm.mood) ? fm.mood : fm.mood ? [fm.mood] : [];
  return {
    title: fm.title,
    date: fm.date,
    mood,
    pdfUrl: fm.pdfUrl,
    content: html,
  };
};

/**
 * One poem. PDF poems render their pages inline (layout preserved, no
 * popout); markdown poems render as a handwritten paper note.
 */
const Poetry = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const poem = useMemo(() => findPoem(slug), [slug]);

  const backButton = (
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
  );

  if (!poem) {
    return (
      <NeonPage>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1
            className={`font-playwrite text-2xl leading-[1.7] ${isDark ? "text-white" : "text-slate-900"}`}
          >
            poem not found
          </h1>
          <div className="mt-6">{backButton}</div>
        </div>
      </NeonPage>
    );
  }

  const header = (
    <header className="mb-6 text-center">
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
        {poem.date && (
          <span
            className={`text-[10px] uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-slate-400"}`}
          >
            {format(toLocalDay(poem.date), "MMM d, yyyy")}
          </span>
        )}
      </div>
    </header>
  );

  if (poem.pdfUrl) {
    return (
      <NeonPage>
        <div className="mx-auto max-w-2xl px-4 py-12 md:py-16">
          {backButton}
          {header}
          <PdfPages url={poem.pdfUrl} title={poem.title} />
        </div>
      </NeonPage>
    );
  }

  return (
    <NeonPage>
      <div className="mx-auto max-w-xl px-4 py-12 md:py-16">
        {backButton}
        <article
          className={`paper-note animate-fade-in relative rounded-md px-6 pb-8 pt-10 md:px-10 ${
            isDark ? "paper-night" : "paper-day"
          }`}
        >
          <span className="paper-tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg]" />
          {header}
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
