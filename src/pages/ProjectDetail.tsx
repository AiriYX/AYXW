import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { findProjectBySlug } from "@/data/projects";
import NeonPage from "@/components/theme/NeonPage";
import PixelIcon from "@/components/theme/PixelIcon";
import StatusChip from "@/components/projects/StatusChip";
import ProjectLinks from "@/components/projects/detail/ProjectLinks";
import ProjectFacts from "@/components/projects/detail/ProjectFacts";
import MoreProjects from "@/components/projects/detail/MoreProjects";
import NotFound from "./NotFound";

/**
 * A project's own page (/projects/<slug>): everything about one project.
 * Content comes from src/data/projects.ts.
 */
const ProjectDetail = () => {
  const { slug } = useParams();
  const project = findProjectBySlug(slug);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!project) return <NotFound />;

  const heading = isDark ? "text-white" : "text-slate-900";
  const body = isDark ? "text-neutral-300" : "text-slate-600";
  const kicker = `text-[11px] font-extrabold uppercase tracking-[0.24em] ${heading}`;

  return (
    <NeonPage>
      <article className="mx-auto max-w-5xl px-4 pb-10 pt-10 md:px-6">
        <Link
          to="/projects?grid=1"
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
            isDark
              ? "border-white/10 text-neutral-400 hover:border-pink-400/50 hover:text-pink-300"
              : "border-violet-200 bg-white/60 text-slate-500 hover:border-pink-300 hover:text-pink-600"
          }`}
        >
          <ArrowLeft size={13} /> all projects
        </Link>

        {/* hero */}
        <header className="relative mt-8">
          <span
            className={`pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-gradient-to-br opacity-25 blur-3xl ${project.gradient}`}
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
            <span
              className={`grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br shadow-[0_0_40px_-6px_rgba(217,70,239,0.7)] ${project.gradient}`}
            >
              <PixelIcon name={project.icon} size={60} alt={project.title} />
            </span>
            <div>
              <StatusChip project={project} isDark={isDark} dateFormat="long" />
              <h1
                className={`mt-2 text-4xl font-extrabold tracking-tight md:text-5xl ${heading}`}
              >
                {project.title}
              </h1>
              <p className={`mt-3 max-w-2xl text-base leading-7 ${body}`}>
                {project.summary}
              </p>
            </div>
          </div>
          <div className="relative mt-7">
            <ProjectLinks project={project} isDark={isDark} />
          </div>
        </header>

        {/* body */}
        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <section>
              <h2 className={kicker}>the story</h2>
              <p className={`mt-3 text-[15px] leading-8 ${body}`}>
                {project.description}
              </p>
            </section>

            {project.highlights && project.highlights.length > 0 && (
              <section>
                <h2 className={kicker}>highlights</h2>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className={`fx-card relative flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${body} ${isDark ? "border-white/10" : "border-violet-100"}`}
                    >
                      <Sparkles
                        size={16}
                        className={`mt-0.5 shrink-0 ${isDark ? "text-pink-300" : "text-pink-500"}`}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <ProjectFacts project={project} isDark={isDark} />
        </div>

        <div className="mt-16">
          <h2 className={`${kicker} mb-4`}>more from the lab</h2>
          <MoreProjects project={project} isDark={isDark} />
        </div>
      </article>
    </NeonPage>
  );
};

export default ProjectDetail;
