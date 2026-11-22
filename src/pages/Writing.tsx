import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  useContentLoader,
  type BlogPostOverviewData,
  type PoemOverviewData,
} from "@/hooks/useContentLoader";
import NeonPage from "@/components/theme/NeonPage";
import TypewriterLines from "@/components/writing/TypewriterLines";
import BulletinBoard, {
  type BoardSection,
} from "@/components/writing/BulletinBoard";
import type { WritingEntry } from "@/components/writing/WritingStopCard";

/**
 * Board sections, in order. An essay goes in the section of its first
 * matching category tag; every poem goes in Poetry. Add a section here and
 * tag a post with one of its `tags` to give it its own corner of the board.
 */
const SECTIONS = [
  {
    id: "tech",
    label: "Tech & AI",
    emoji: "robot",
    blurb: "thinking out loud about tech",
    tags: ["AI/Tech", "Technology", "AI", "Tech"],
  },
  {
    id: "research",
    label: "Research",
    emoji: "magnifier",
    blurb: "rabbit holes, explained",
    tags: ["Research"],
  },
  {
    id: "learning",
    label: "Learning",
    emoji: "sprout",
    blurb: "notes from building things",
    tags: ["Learning"],
  },
];
const POETRY = {
  id: "poetry",
  label: "Poetry",
  emoji: "moon",
  blurb: "for the feelings that don't fit in an essay",
};

const asArray = (v: string[] | string | undefined) =>
  Array.isArray(v) ? v : v ? [v] : [];

const Writing = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const blogs = useContentLoader<BlogPostOverviewData>("blogs", "date");
  const poems = useContentLoader<PoemOverviewData>("poems", "date");

  const sections: BoardSection[] = useMemo(() => {
    const newestFirst = (a: WritingEntry, b: WritingEntry) =>
      +new Date(b.date) - +new Date(a.date);

    const essays: WritingEntry[] = blogs.data.map((b) => ({
      kind: "essay",
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      date: b.date,
      tags: asArray(b.category),
      readTime: b.readTime,
    }));

    const essaySections = SECTIONS.map((s) => ({
      ...s,
      entries: essays
        .filter((e) => {
          const home = SECTIONS.find((sec) =>
            e.tags.some((t) => sec.tags.includes(t)),
          );
          return home?.id === s.id;
        })
        .sort(newestFirst),
    }));

    // essays whose tags match no section still get a spot
    const unsorted = essays.filter(
      (e) => !SECTIONS.some((s) => e.tags.some((t) => s.tags.includes(t))),
    );
    if (unsorted.length)
      essaySections.push({
        id: "misc",
        label: "Misc",
        emoji: "folder",
        blurb: "everything else",
        tags: [],
        entries: unsorted.sort(newestFirst),
      });

    const poetry = {
      ...POETRY,
      entries: poems.data
        .map((p) => ({
          kind: "poem" as const,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          date: p.date,
          tags: asArray(p.mood),
          pdfUrl: p.pdfUrl,
        }))
        .sort(newestFirst),
    };

    return [...essaySections, poetry].filter((s) => s.entries.length > 0);
  }, [blogs.data, poems.data]);

  const all = sections.flatMap((s) => s.entries);
  const essaySections = sections.filter((s) => s.id !== "poetry");
  const poemEntries = sections.find((s) => s.id === "poetry")?.entries ?? [];

  // typewriter: each poem's opening line + each essay title
  const teaser = useMemo(
    () =>
      all.map((e) =>
        e.kind === "poem"
          ? `"${e.excerpt.split(/(?<=[,.?!])\s+/)[0]}"`
          : e.title,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sections],
  );

  const loading = blogs.loading || poems.loading;
  const error = blogs.error || poems.error;

  return (
    <NeonPage>
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Link
          to="/about"
          className={`mb-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
            isDark
              ? "border-white/10 text-neutral-400 hover:border-pink-400/60 hover:text-pink-300"
              : "border-pink-200 bg-white/60 text-slate-500 hover:border-pink-400 hover:text-pink-600"
          }`}
        >
          <ArrowLeft size={13} /> about me
        </Link>
        <header className="mb-8 text-center">
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${
              isDark ? "text-indigo-300/80" : "text-indigo-700/80"
            }`}
          >
            {`// about · after hours · ${String(all.length).padStart(2, "0")} pinned`}
          </p>
          <h1
            className={`font-playwrite mt-2 pb-1 text-3xl leading-[1.5] md:text-5xl ${
              isDark ? "fx-title-glow text-white" : "text-slate-900"
            }`}
          >
            words,{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
              slowly brewed
            </span>
          </h1>
          <p
            className={`mx-auto mt-3 max-w-lg text-sm leading-relaxed md:text-base ${
              isDark ? "text-neutral-400" : "text-slate-600"
            }`}
          >
            Essays for the thoughts that don&apos;t fit in a GitHub repo, and
            poems for the ones that don&apos;t fit in an essay.
          </p>

          <div
            className={`mx-auto mt-4 flex max-w-xl items-center gap-3 rounded-full border px-4 py-2 text-left text-xs backdrop-blur-md md:text-sm ${
              isDark
                ? "border-fuchsia-400/25 bg-[#0d0b18]/70"
                : "border-white bg-white/70"
            }`}
          >
            <span
              className={`shrink-0 text-[10px] font-extrabold uppercase tracking-[0.22em] ${
                isDark ? "text-fuchsia-300" : "text-fuchsia-600"
              }`}
            >
              now reading
            </span>
            <span
              className={`min-w-0 truncate ${
                isDark ? "text-neutral-200" : "text-slate-700"
              }`}
            >
              <TypewriterLines lines={teaser} />
            </span>
          </div>
        </header>

        {loading && (
          <p className="text-center text-sm text-neutral-500">
            Pinning things up…
          </p>
        )}
        {error && (
          <p className="text-center text-sm text-rose-400">
            Couldn&apos;t load writing: {error}
          </p>
        )}
        {!loading && !error && (
          <BulletinBoard
            essays={essaySections}
            poems={poemEntries}
            isDark={isDark}
          />
        )}
      </div>
    </NeonPage>
  );
};

export default Writing;
