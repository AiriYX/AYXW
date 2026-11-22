import { Link, useNavigate } from "react-router-dom";
import PixelIcon from "@/components/theme/PixelIcon";
import { ArrowRight, ExternalLink, Github, Users } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { projectPath, projects, teamLabel } from "@/data/projects";
import SectionTitle from "@/components/theme/SectionTitle";
import StatusChip from "@/components/projects/StatusChip";

/**
 * Featured projects as big cards that stick and pile up on each other as you
 * scroll, like flipping through a stack of menus.
 */
const StackedProjects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const featured = projects.filter((p) => p.featured);
  const navigate = useNavigate();
  // opens this project's own page
  const openProject = (title: string) => {
    const p = projects.find((x) => x.title === title);
    if (p) navigate(projectPath(p));
    window.scrollTo({ top: 0 });
  };

  const iconLink = `rounded-lg border p-2 transition-colors ${
    isDark
      ? "border-white/10 text-neutral-300 hover:border-indigo-400/60 hover:text-indigo-300"
      : "border-indigo-200 bg-white/70 text-slate-600 hover:border-fuchsia-400 hover:text-fuchsia-600"
  }`;

  return (
    <section id="build-lab" className="relative px-4 pb-10 pt-24 md:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          kicker="build lab · featured"
          subtitle="Some polished, some experiments. Click a card for the full story."
        >
          <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
            Fresh
          </span>{" "}
          from the lab
        </SectionTitle>

        <div className="relative">
          {featured.map((p, i) => (
            <div
              key={p.title}
              className="sticky pb-8"
              style={{ top: `${110 + i * 22}px` }}
            >
              <article
                role="link"
                tabIndex={0}
                aria-label={`Open ${p.title} details`}
                onClick={() => openProject(p.title)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openProject(p.title);
                }}
                className={`stack-card group relative cursor-pointer overflow-hidden rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70 md:p-6 ${
                  isDark
                    ? "border-white/10 bg-[#0e0b1a] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] hover:border-pink-400/50 hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.6)]"
                    : "border-white bg-white shadow-[0_30px_80px_-35px_rgba(79,70,229,0.55)] hover:border-pink-300"
                }`}
              >
                <span
                  className={`pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gradient-to-br opacity-30 blur-3xl ${p.gradient}`}
                />
                <div className="relative grid items-center gap-6 md:grid-cols-[1fr_150px]">
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${
                        isDark ? "text-neutral-500" : "text-slate-400"
                      }`}
                    >
                      {`${String(i + 1).padStart(2, "0")} / ${String(featured.length).padStart(2, "0")}`}
                      <span
                        className={`ml-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                          isDark ? "text-pink-300" : "text-pink-600"
                        }`}
                      >
                        open project page →
                      </span>
                    </p>
                    <h3
                      className={`mt-1.5 text-2xl font-extrabold md:text-3xl ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <StatusChip project={p} isDark={isDark} />
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                          isDark ? "text-violet-300" : "text-violet-600"
                        }`}
                      >
                        <Users size={12} />
                        {teamLabel(p)}
                      </span>
                    </div>
                    <p
                      className={`mt-4 max-w-lg text-sm leading-7 md:text-[15px] ${
                        isDark ? "text-neutral-300" : "text-slate-600"
                      }`}
                    >
                      {p.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className={`rounded-md border px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${
                            isDark
                              ? "border-indigo-400/25 bg-indigo-400/5 text-indigo-200"
                              : "border-indigo-200 bg-indigo-50 text-indigo-800"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                      <span className="ml-auto flex gap-2">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${p.title} on GitHub`}
                            className={iconLink}
                          >
                            <Github size={15} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${p.title} live demo`}
                            className={iconLink}
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* big pop-art emoji tile */}
                  <div
                    className={`hidden aspect-square place-items-center rounded-3xl bg-gradient-to-br shadow-[0_0_50px_-12px_rgba(236,72,153,0.6)] md:grid ${p.gradient}`}
                  >
                    <PixelIcon
                      name={p.icon}
                      size={84}
                      alt={p.title}
                      className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/projects"
            onClick={() =>
              window.setTimeout(() => window.scrollTo({ top: 0 }), 50)
            }
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_28px_-6px_rgba(217,70,239,0.7)] transition-transform duration-300 hover:scale-105"
          >
            see the whole menu
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StackedProjects;
