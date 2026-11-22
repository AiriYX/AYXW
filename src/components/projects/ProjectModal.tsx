import { useEffect, useRef } from "react";
import PixelIcon from "@/components/theme/PixelIcon";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Github, X } from "lucide-react";
import { projectPath, type Project } from "@/data/projects";
import StatusChip from "./StatusChip";

type Props = {
  project: Project;
  isDark: boolean;
  onClose: () => void;
};

/**
 * The modal is the quick version; this block points to the project's own
 * page on this site (where everything lives), plus GitHub / live if public.
 */
const ProjectPageCta = ({
  project,
  isDark,
}: {
  project: Project;
  isDark: boolean;
}) => {
  const small = `inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
    isDark
      ? "border-white/10 text-neutral-200 hover:border-indigo-400/60 hover:text-indigo-300"
      : "border-violet-200 bg-white/80 text-neutral-700 hover:border-fuchsia-400 hover:text-fuchsia-600"
  }`;

  return (
    <div
      className={`mt-8 rounded-xl border p-4 ${
        isDark
          ? "border-pink-400/30 bg-pink-500/[0.06]"
          : "border-pink-200 bg-pink-50/70"
      }`}
    >
      <p
        className={`text-sm ${isDark ? "text-neutral-400" : "text-slate-500"}`}
      >
        This is the quick version. The full story, highlights, team and links
        all live on the project page.
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Link
          to={projectPath(project)}
          onClick={() => window.scrollTo({ top: 0 })}
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_24px_-4px_rgba(236,72,153,0.7)] transition-shadow hover:shadow-[0_0_34px_-2px_rgba(129,140,248,0.7)]"
        >
          view full project page
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={small}
          >
            <Github size={15} /> code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={small}
          >
            live <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </div>
  );
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Full project story in an accessible dialog.
 * Esc closes it, Tab stays inside it, and focus returns to the card on close.
 */
const ProjectModal = ({ project, isDark, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusables =
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusables.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05040a]/70 p-4 backdrop-blur-md motion-safe:animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`fx-panel relative w-full max-w-2xl overflow-hidden rounded-2xl border p-6 md:p-9 ${
          isDark
            ? "border-indigo-400/20 shadow-[0_0_60px_-15px_rgba(129,140,248,0.35)]"
            : "border-violet-200 shadow-[0_30px_90px_-40px_rgba(109,40,217,0.45)]"
        } motion-safe:animate-scale-in`}
        onClick={(event) => event.stopPropagation()}
      >
        <span
          className={`absolute -right-14 top-0 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl ${project.gradient} ${
            isDark ? "opacity-25" : "opacity-25"
          }`}
        />
        <span className="fx-scan" />
        <span className="fx-corner tl" />
        <span className="fx-corner tr" />
        <span className="fx-corner bl" />
        <span className="fx-corner br" />

        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close"
          className={`absolute right-5 top-5 z-20 rounded-lg border p-1.5 transition-colors ${
            isDark
              ? "border-white/10 text-neutral-400 hover:border-indigo-400/60 hover:text-indigo-300"
              : "border-violet-200 text-neutral-500 hover:border-fuchsia-400 hover:text-fuchsia-600"
          }`}
        >
          <X size={20} />
        </button>

        <div className="relative z-10">
          <div
            className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-2xl shadow-[0_0_28px_-4px_rgba(217,70,239,0.6)] ${project.gradient}`}
          >
            <PixelIcon name={project.icon} size={40} />
          </div>

          <StatusChip project={project} isDark={isDark} dateFormat="long" />

          <h3
            className={`mt-3 text-2xl font-semibold md:text-3xl ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            {project.title}
          </h3>

          {project.role && (
            <p
              className={`mt-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                isDark ? "text-indigo-300" : "text-violet-600"
              }`}
            >
              Role · {project.role}
            </p>
          )}

          <p
            className={`mt-4 max-w-2xl leading-8 ${
              isDark ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`rounded-md border px-2 py-1 text-[11px] font-medium uppercase tracking-wider ${
                  isDark
                    ? "border-indigo-400/20 bg-indigo-400/5 text-indigo-200/90"
                    : "border-violet-200 bg-violet-50/70 text-violet-700"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          <ProjectPageCta project={project} isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
