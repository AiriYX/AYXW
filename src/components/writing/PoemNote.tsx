import { ArrowUpRight } from "lucide-react";
import type { WritingEntry } from "./WritingStopCard";

type Props = { entry: WritingEntry; isDark: boolean; index: number };

/** Break an excerpt into short poem-like lines at commas / full stops. */
const toLines = (text: string) =>
  text
    .split(/(?<=[,.?!])\s+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 4);

/** Poems look like a handwritten note on lined paper, taped to the page. */
const PoemNote = ({ entry, isDark, index }: Props) => {
  const tilt = index % 2 === 0 ? "-1.5deg" : "1.5deg";

  return (
    <article
      className={`paper-note group relative mt-5 rounded-md px-6 pb-5 pt-7 ${
        isDark ? "paper-night" : "paper-day"
      }`}
      style={{ rotate: tilt }}
    >
      <span className="paper-tape absolute -top-3 left-6 h-6 w-20 rotate-[-6deg]" />

      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-playwrite text-xl leading-[1.6] ${
            isDark ? "text-fuchsia-200" : "text-fuchsia-800"
          }`}
        >
          {entry.title}
        </h3>
        <span
          className={`mt-1 shrink-0 text-[10px] font-extrabold uppercase tracking-[0.22em] ${
            isDark ? "text-fuchsia-300/70" : "text-fuchsia-600/70"
          }`}
        >
          poem
        </span>
      </div>

      <blockquote
        className={`font-playwrite mt-2 space-y-0.5 text-[15px] leading-[2.05] ${
          isDark ? "text-neutral-200/90" : "text-slate-700"
        }`}
      >
        {toLines(entry.excerpt).map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </blockquote>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((t) => (
            <span
              key={t}
              className={`ink-stamp rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.2em] ${
                isDark
                  ? "border-fuchsia-300/50 text-fuchsia-300/80"
                  : "border-fuchsia-500/50 text-fuchsia-600/80"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
            isDark
              ? "text-neutral-400 group-hover:text-fuchsia-300"
              : "text-slate-500 group-hover:text-fuchsia-600"
          }`}
        >
          {entry.pdfUrl ? "open poem" : "read poem"}
          <ArrowUpRight size={14} />
        </span>
      </div>
    </article>
  );
};

export default PoemNote;
