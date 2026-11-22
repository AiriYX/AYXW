import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PixelIcon from "@/components/theme/PixelIcon";
import { projectPath, projects, type Project } from "@/data/projects";

/** Previous / next project cards at the bottom of a project page. */
const MoreProjects = ({
  project,
  isDark,
}: {
  project: Project;
  isDark: boolean;
}) => {
  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const Card = ({ p, dir }: { p: Project; dir: "prev" | "next" }) => (
    <Link
      to={projectPath(p)}
      onClick={() => window.scrollTo({ top: 0 })}
      className={`fx-card group relative flex items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${
        isDark
          ? "border-white/10 hover:border-pink-400/40"
          : "border-violet-100 hover:border-pink-300"
      } ${dir === "next" ? "flex-row-reverse text-right" : ""}`}
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${p.gradient}`}
      >
        <PixelIcon name={p.icon} size={30} />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
            dir === "next" ? "justify-end" : ""
          } ${isDark ? "text-neutral-500" : "text-slate-400"}`}
        >
          {dir === "prev" ? (
            <>
              <ArrowLeft size={11} /> previous
            </>
          ) : (
            <>
              next <ArrowRight size={11} />
            </>
          )}
        </span>
        <span
          className={`block truncate font-bold transition-colors ${
            isDark
              ? "text-white group-hover:text-pink-300"
              : "text-slate-900 group-hover:text-pink-600"
          }`}
        >
          {p.title}
        </span>
      </span>
    </Link>
  );

  return (
    <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
      <Card p={prev} dir="prev" />
      <Card p={next} dir="next" />
    </nav>
  );
};

export default MoreProjects;
