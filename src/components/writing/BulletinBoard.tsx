import type { CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import PixelIcon from "@/components/theme/PixelIcon";
import { ArrowUpRight, Clock } from "lucide-react";
import apiImg from "/img/api_img.jpg";
import chatgptStudent from "/img/chatgpt_student.jpg";
import whyisitspicy from "/img/whyisitspicy.jpg";
import type { WritingEntry } from "./WritingStopCard";

export type BoardSection = {
  id: string;
  label: string;
  /** pixel icon name */
  emoji: string;
  blurb?: string;
  tags?: string[];
  entries: WritingEntry[];
};

type Props = {
  essays: BoardSection[];
  poems: WritingEntry[];
  isDark: boolean;
};

const ARTICLE_IMAGES: Record<string, string> = {
  "finder-howto": apiImg,
  "ai-and-critical-thinking": chatgptStudent,
  "loving-spice": whyisitspicy,
};
const PINS = ["#ec4899", "#8b5cf6", "#6366f1", "#f472b6", "#a78bfa"];

const Pin = ({ color }: { color: string }) => (
  <span
    aria-hidden="true"
    className="push-pin absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full"
    style={{ ["--pin" as string]: color } as CSSProperties}
  />
);

const useOpen = () => {
  const navigate = useNavigate();
  return (e: WritingEntry) => {
    if (e.kind === "poem" && e.pdfUrl)
      window.open(e.pdfUrl, "_blank", "noopener");
    else
      navigate(
        e.kind === "essay"
          ? `/writing/blog/${e.slug}`
          : `/writing/poetry/${e.slug}`,
      );
  };
};

/** Small heading strip for a column / category. */
const Label = ({
  children,
  isDark,
}: {
  children: ReactNode;
  isDark: boolean;
}) => (
  <p
    className={`mb-3 inline-flex items-center gap-2 rounded-sm px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] ${
      isDark
        ? "border border-pink-300/25 bg-[#2a1a3d] text-pink-100 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.8),0_0_14px_-6px_rgba(236,72,153,0.6)]"
        : "bg-white/85 text-slate-800 shadow-sm"
    }`}
  >
    {children}
  </p>
);

/** Compact essay clipping: thumbnail + title + one-line excerpt. */
const Clipping = ({
  e,
  isDark,
  i,
}: {
  e: WritingEntry;
  isDark: boolean;
  i: number;
}) => {
  const open = useOpen();
  const img = ARTICLE_IMAGES[e.slug];
  return (
    <button
      onClick={() => open(e)}
      className={`board-item group relative flex w-full gap-3 rounded-lg p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70 ${
        isDark
          ? "border border-white/10 bg-[#241634] text-neutral-300 shadow-[0_14px_28px_-12px_rgba(0,0,0,0.9)] hover:border-pink-400/40 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.9),0_0_22px_-8px_rgba(236,72,153,0.7)]"
          : "bg-white text-slate-700 shadow-[0_10px_20px_-12px_rgba(80,40,60,0.45)]"
      }`}
      style={{ rotate: i % 2 ? "0.6deg" : "-0.6deg" }}
    >
      <Pin color={PINS[i % PINS.length]} />
      {img && (
        <img
          src={img}
          alt=""
          loading="lazy"
          className="h-16 w-16 shrink-0 rounded-md object-cover"
        />
      )}
      <span className="min-w-0 flex-1">
        <span
          className={`line-clamp-2 text-sm font-bold leading-snug transition-colors ${isDark ? "text-white group-hover:text-pink-300" : "text-slate-900 group-hover:text-pink-600"}`}
        >
          {e.title}
        </span>
        <span
          className={`mt-1 line-clamp-1 text-xs ${isDark ? "text-neutral-400" : "text-slate-500"}`}
        >
          {e.excerpt}
        </span>
        <span
          className={`mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${isDark ? "text-violet-300/90" : "text-violet-600/80"}`}
        >
          {e.readTime && (
            <>
              <Clock size={10} /> {e.readTime} ·
            </>
          )}{" "}
          read <ArrowUpRight size={11} />
        </span>
      </span>
    </button>
  );
};

/** Compact poem: a small lined index card with the title + first line. */
const PoemCard = ({
  e,
  isDark,
  i,
}: {
  e: WritingEntry;
  isDark: boolean;
  i: number;
}) => {
  const open = useOpen();
  const first = e.excerpt.split(/(?<=[,.?!])\s+/)[0];
  return (
    <button
      onClick={() => open(e)}
      className={`board-item paper-mini relative w-full rounded-md px-4 pb-3 pt-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70 ${isDark ? "paper-night" : "paper-day"}`}
      style={{ rotate: i % 2 ? "1deg" : "-1deg" }}
    >
      <span className="paper-tape absolute -top-2 left-4 h-4 w-12 rotate-[-6deg]" />
      <span
        className={`font-playwrite block text-base leading-[1.7] ${isDark ? "text-pink-300 [text-shadow:0_0_10px_rgba(236,72,153,0.45)]" : "text-pink-700"}`}
      >
        {e.title}
      </span>
      <span
        className={`font-playwrite block truncate text-[13px] leading-[1.9] ${isDark ? "text-neutral-300" : "text-slate-600"}`}
      >
        {first}
      </span>
      <span className="mt-1 flex flex-wrap gap-1">
        {e.tags.slice(0, 2).map((t) => (
          <span
            key={t}
            className={`ink-stamp rounded px-1 py-px text-[8px] font-extrabold uppercase tracking-[0.18em] ${isDark ? "border-pink-300/40 text-pink-200/80" : "border-pink-500/50 text-pink-600/80"}`}
          >
            {t}
          </span>
        ))}
      </span>
    </button>
  );
};

/**
 * One clean corkboard split 50/50: essays (grouped by category) on the left,
 * poems on the right.
 */
const BulletinBoard = ({ essays, poems, isDark }: Props) => {
  let n = 0;
  return (
    <div
      className={`board relative rounded-[24px] p-4 sm:p-6 ${isDark ? "board-night" : "board-day"}`}
    >
      <div className="grid gap-6 md:grid-cols-2 md:gap-0">
        {/* essays */}
        <section aria-label="Essays" className="md:pr-6">
          <h2
            className={`mb-4 text-center text-lg font-extrabold uppercase tracking-[0.2em] ${isDark ? "text-[#fff3e6] [text-shadow:0_0_12px_rgba(236,72,153,0.6)]" : "text-slate-900"}`}
          >
            <PixelIcon
              name="notepad"
              size={26}
              className="-mt-1 mr-1 align-middle"
            />
            essays{" "}
            <span className="text-xs opacity-50">
              {essays.reduce((a, s) => a + s.entries.length, 0)}
            </span>
          </h2>
          <div className="space-y-5">
            {essays.map((sec) => (
              <div key={sec.id}>
                <Label isDark={isDark}>
                  <PixelIcon name={sec.emoji} size={18} /> {sec.label}
                </Label>
                <div className="space-y-4">
                  {sec.entries.map((e) => (
                    <Clipping key={e.slug} e={e} isDark={isDark} i={n++} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* poems */}
        <section
          aria-label="Poems"
          className={`md:border-l-2 md:border-dashed md:pl-6 ${isDark ? "md:border-pink-200/20" : "md:border-violet-400/30"}`}
        >
          <h2
            className={`mb-4 text-center text-lg font-extrabold uppercase tracking-[0.2em] ${isDark ? "text-[#fff3e6] [text-shadow:0_0_12px_rgba(236,72,153,0.6)]" : "text-slate-900"}`}
          >
            <PixelIcon
              name="moon"
              size={26}
              className="-mt-1 mr-1 align-middle"
            />
            poems <span className="text-xs opacity-50">{poems.length}</span>
          </h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {poems.map((e) => (
              <PoemCard key={e.slug} e={e} isDark={isDark} i={n++} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BulletinBoard;
