import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PixelIcon from "@/components/theme/PixelIcon";
import type { MarkdownModule } from "@/types/markdown";

const ESSAYS = import.meta.glob("/src/contents/blogs/*.md", {
  eager: true,
}) as Record<string, MarkdownModule>;
const POEMS = import.meta.glob("/src/contents/poems/*.md", {
  eager: true,
}) as Record<string, MarkdownModule>;

/** newest few titles, essays and poems mixed */
const latest = [
  ...Object.entries(ESSAYS).map(([path, m]) => ({ path, m, kind: "essay" })),
  ...Object.entries(POEMS).map(([path, m]) => ({ path, m, kind: "poem" })),
]
  .sort(
    (a, b) =>
      new Date(b.m.attributes.date).getTime() -
      new Date(a.m.attributes.date).getTime(),
  )
  .slice(0, 3)
  .map(({ path, m, kind }) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    return {
      title: m.attributes.title,
      kind,
      to:
        kind === "essay" ? `/writing/blog/${slug}` : `/writing/poetry/${slug}`,
    };
  });

/** About page: a peek at the writing board (essays + poems). */
const WritingCorner = ({ isDark }: { isDark: boolean }) => {
  const muted = isDark ? "text-neutral-400" : "text-slate-600";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className={`text-sm leading-7 ${muted}`}>
        Outside of tech, I write: {Object.keys(ESSAYS).length} essays for the
        thoughts that don&apos;t fit in a repo, and {Object.keys(POEMS).length}{" "}
        poems for the ones that don&apos;t fit in an essay.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {latest.map((w) => (
          <li key={w.to}>
            <Link
              to={w.to}
              className={`group flex h-full flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 ${
                isDark
                  ? "border-white/10 bg-white/[0.03] hover:border-pink-400/40 hover:shadow-[0_0_20px_-8px_rgba(236,72,153,0.7)]"
                  : "border-pink-900/10 bg-white/60 hover:border-pink-300"
              }`}
            >
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? "text-violet-300" : "text-violet-600"
                }`}
              >
                <PixelIcon
                  name={w.kind === "essay" ? "notepad" : "moon"}
                  size={14}
                />
                {w.kind}
              </span>
              <span
                className={`line-clamp-2 text-sm font-bold leading-snug transition-colors ${
                  isDark
                    ? "text-white group-hover:text-pink-300"
                    : "text-slate-900 group-hover:text-pink-600"
                }`}
              >
                {w.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to="/writing"
        className={`mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all hover:-translate-y-0.5 ${
          isDark
            ? "border-pink-400/40 text-pink-200 hover:bg-pink-500/10 hover:shadow-[0_0_20px_-6px_rgba(236,72,153,0.8)]"
            : "border-pink-300 bg-white/70 text-pink-700 hover:bg-pink-50"
        }`}
      >
        <PixelIcon name="pin" size={18} /> see the whole bulletin board
        <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default WritingCorner;
