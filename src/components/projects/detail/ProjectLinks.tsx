import { ArrowUpRight, Coffee, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { contactEmail } from "@/data/home";

/** GitHub + live buttons (or an "ask me" button when neither is public). */
const ProjectLinks = ({
  project,
  isDark,
}: {
  project: Project;
  isDark: boolean;
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition-all";
  const ghost = isDark
    ? "border border-indigo-400/40 text-indigo-100 hover:border-indigo-300 hover:shadow-[0_0_22px_-4px_rgba(129,140,248,0.7)]"
    : "border border-violet-300 bg-white/80 text-violet-700 hover:border-fuchsia-400 hover:text-fuchsia-600";
  const hot =
    "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white shadow-[0_0_24px_-4px_rgba(236,72,153,0.7)] hover:shadow-[0_0_34px_-2px_rgba(129,140,248,0.7)]";

  if (!project.githubUrl && !project.liveUrl) {
    return (
      <a
        href={`mailto:${contactEmail}?subject=${encodeURIComponent(`About ${project.title}`)}`}
        className={`${base} ${ghost}`}
      >
        <Coffee size={15} /> not public yet · ask me about it
      </a>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${hot}`}
        >
          open live project <ArrowUpRight size={16} />
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${ghost}`}
        >
          <Github size={15} /> view code
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;
