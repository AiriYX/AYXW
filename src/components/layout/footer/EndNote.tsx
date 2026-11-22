import { projects } from "@/data/projects";
import Orb from "./Orb";

const ESSAYS = Object.keys(import.meta.glob("/src/contents/blogs/*.md")).length;
const POEMS = Object.keys(import.meta.glob("/src/contents/poems/*.md")).length;

/** "You've reached the bottom of the cup" line with live content counts. */
const EndNote = ({
  isDark,
  className = "",
}: {
  isDark: boolean;
  className?: string;
}) => {
  const pill = `rounded-full px-2.5 py-0.5 text-xs font-bold ${
    isDark
      ? "bg-pink-500/90 text-white shadow-[0_0_14px_-2px_rgba(236,72,153,0.8)]"
      : "bg-[#1d1029] text-[#ffc2dc]"
  }`;

  return (
    <p
      className={`flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm ${className}`}
    >
      <span className={pill}>{projects.length}</span>
      <span>projects,</span>
      <span className={pill}>{ESSAYS}</span>
      <span>essays and</span>
      <span className={pill}>{POEMS}</span>
      {/* <span>poems so far.</span> */}
    </p>
  );
};

export default EndNote;
