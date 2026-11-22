import { useNavigate } from "react-router-dom";
import EssayCard from "./EssayCard";
import PoemNote from "./PoemNote";

export type WritingEntry = {
  kind: "essay" | "poem";
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime?: string;
  pdfUrl?: string;
};

type Props = { entry: WritingEntry; isDark: boolean; index: number };

/** One stop on the writing roadmap: essays and poems each get their own look. */
const WritingStopCard = ({ entry, isDark, index }: Props) => {
  const navigate = useNavigate();

  const open = () => {
    navigate(
      entry.kind === "essay"
        ? `/writing/blog/${entry.slug}`
        : `/writing/poetry/${entry.slug}`,
    );
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`${entry.kind === "essay" ? "Read essay" : "Read poem"}: ${entry.title}`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter") open();
      }}
      className="cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
    >
      {entry.kind === "essay" ? (
        <EssayCard entry={entry} isDark={isDark} />
      ) : (
        <PoemNote entry={entry} isDark={isDark} index={index} />
      )}
    </div>
  );
};

export default WritingStopCard;
