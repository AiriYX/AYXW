import { Calendar, CircleDot, User, Users } from "lucide-react";
import type { ReactNode } from "react";
import { formatProjectDate, teamLabel, type Project } from "@/data/projects";

/** "At a glance" side panel: role, team, date, status, stack. */
const ProjectFacts = ({
  project,
  isDark,
}: {
  project: Project;
  isDark: boolean;
}) => {
  const label = isDark ? "text-neutral-500" : "text-slate-400";
  const value = isDark ? "text-white" : "text-slate-900";

  const Row = ({ icon, k, v }: { icon: ReactNode; k: string; v: string }) => (
    <div className="flex items-start gap-3 py-3">
      <span className={isDark ? "text-pink-300" : "text-pink-600"}>{icon}</span>
      <div>
        <dt
          className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${label}`}
        >
          {k}
        </dt>
        <dd className={`mt-0.5 text-sm font-semibold ${value}`}>{v}</dd>
      </div>
    </div>
  );

  return (
    <aside
      className={`fx-panel relative self-start rounded-2xl border p-5 md:sticky md:top-28 ${isDark ? "border-white/10" : "border-violet-100"}`}
    >
      <span className="fx-corner tl" />
      <span className="fx-corner br" />
      <p
        className={`text-[11px] font-extrabold uppercase tracking-[0.24em] ${value}`}
      >
        at a glance
      </p>
      <dl
        className={`mt-2 divide-y ${isDark ? "divide-white/10" : "divide-violet-100"}`}
      >
        {project.role && (
          <Row icon={<User size={16} />} k="my role" v={project.role} />
        )}
        <Row icon={<Users size={16} />} k="team" v={teamLabel(project, true)} />
        <Row
          icon={<Calendar size={16} />}
          k="date"
          v={formatProjectDate(project.date, "long")}
        />
        <Row icon={<CircleDot size={16} />} k="status" v={project.status} />
      </dl>
      <p
        className={`mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] ${label}`}
      >
        built with
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className={`rounded-md border px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${
              isDark
                ? "border-indigo-400/25 bg-indigo-400/5 text-indigo-200"
                : "border-indigo-200 bg-indigo-50/80 text-indigo-800"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </aside>
  );
};

export default ProjectFacts;
