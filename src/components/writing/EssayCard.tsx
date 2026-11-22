import { ArrowUpRight, Clock } from "lucide-react";
import apiImg from "/img/api_img.jpg";
import chatgptStudent from "/img/chatgpt_student.jpg";
import whyisitspicy from "/img/whyisitspicy.jpg";
import type { WritingEntry } from "./WritingStopCard";

const ARTICLE_IMAGES: Record<string, string> = {
  "finder-howto": apiImg,
  "ai-and-critical-thinking": chatgptStudent,
  "loving-spice": whyisitspicy,
};

type Props = { entry: WritingEntry; isDark: boolean };

/** Essays look like a magazine article: cover image, headline, standfirst. */
const EssayCard = ({ entry, isDark }: Props) => {
  const image = ARTICLE_IMAGES[entry.slug];

  return (
    <article
      className={`essay-card fx-card group relative overflow-hidden rounded-2xl border ${
        isDark
          ? "border-white/10 bg-[#0e0b1a]/90"
          : "border-white bg-white/90 shadow-[0_25px_60px_-35px_rgba(79,70,229,0.55)]"
      }`}
    >
      <span className="fx-card-border fx-card-border-hot" />
      {image && (
        <div className="relative h-36 overflow-hidden">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isDark ? "from-[#0e0b1a]" : "from-white"
            } via-transparent to-transparent`}
          />
          <span className="absolute left-4 top-4 rounded-md bg-indigo-400 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-900 shadow-[0_0_16px_rgba(129,140,248,0.7)]">
            essay
          </span>
        </div>
      )}

      <div className="relative p-5">
        <div
          className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
            isDark ? "text-neutral-500" : "text-slate-400"
          }`}
        >
          {!image && (
            <span className={isDark ? "text-indigo-300" : "text-indigo-600"}>
              essay
            </span>
          )}
          {entry.readTime && (
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> {entry.readTime}
            </span>
          )}
          {entry.tags.map((t) => (
            <span key={t}>#{t.toLowerCase().replace(/\s+/g, "-")}</span>
          ))}
        </div>

        <h3
          className={`mt-2 text-xl font-extrabold leading-snug transition-colors ${
            isDark
              ? "text-white group-hover:text-indigo-300"
              : "text-slate-900 group-hover:text-indigo-700"
          }`}
        >
          {entry.title}
        </h3>

        <p
          className={`mt-3 border-l-2 pl-3 text-sm leading-relaxed ${
            isDark
              ? "border-indigo-400/50 text-neutral-400"
              : "border-indigo-300 text-slate-600"
          } line-clamp-3`}
        >
          {entry.excerpt}
        </p>

        <span
          className={`mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
            isDark
              ? "text-neutral-400 group-hover:text-indigo-300"
              : "text-slate-500 group-hover:text-indigo-700"
          }`}
        >
          read the essay
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  );
};

export default EssayCard;
