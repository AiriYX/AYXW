import { useState, type ReactNode } from "react";
import PixelIcon from "@/components/theme/PixelIcon";
import { ArrowRight, Mail, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { type Project, projectPath, teamLabel } from "@/data/projects";
import StatusChip from "./StatusChip";

type Props = {
  projects: Project[];
  isDark: boolean;
  /** Current filter; projects that don't match are dimmed, not removed,
   *  so the 3×3 grid keeps its shape. */
  filter: string;
  onOpen: (title: string) => void;
};

// Fill the rest of the 3×3 board. Edit or replace these as projects ship.
const BREWING = [
  {
    icon: "letter",
    title: "Your idea here",
    back: "Have a project in mind? Let's grab a coffee chat and build it together.",
    cta: {
      label: "coffee chat",
      href: "mailto:airiweng@gmail.com?subject=Coffee%20chat%20%E2%98%95",
    },
  },
  {
    icon: "coffee",
    title: "Still brewing",
    back: "Something new is on the stove. Check back soon for the next project.",
  },
  {
    icon: "flask",
    title: "In the lab",
    back: "Experiments that aren't ready for the menu yet, but will be.",
  },
  {
    icon: "crystal",
    title: "Coming soon",
    back: "A peek at what's next: more data, more tools, more playful UI.",
    hideOnMobile: true,
  },
];

const SLOTS = 9;

/** A flip card: front shows the essentials, back shows the details.
 *  Hover flips it on desktop; tap (or Enter) flips it everywhere. */
const FlipCard = ({
  front,
  back,
  isDark,
  dimmed,
  index,
  label,
  className = "",
  onActivate,
}: {
  front: ReactNode;
  back: ReactNode;
  isDark: boolean;
  dimmed?: boolean;
  index: number;
  label: string;
  className?: string;
  /** If set, click / tap / Enter calls this (e.g. open the modal) instead
   *  of flipping. Hover still flips on desktop. */
  onActivate?: () => void;
}) => {
  const [flipped, setFlipped] = useState(false);
  const activate = () => (onActivate ? onActivate() : setFlipped((f) => !f));
  const face = `fx-panel absolute inset-0 overflow-hidden rounded-2xl border p-5 [backface-visibility:hidden] ${
    isDark ? "border-white/10" : "border-white"
  }`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={onActivate ? undefined : flipped}
      aria-label={
        onActivate
          ? `Open ${label} details`
          : `${label}: ${flipped ? "showing details" : "flip for details"}`
      }
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      className={`flip group relative aspect-[3/4] cursor-pointer rounded-2xl transition-[opacity,filter] duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 motion-safe:animate-fade-in sm:aspect-[4/5] md:aspect-square ${className} ${
        flipped ? "is-flipped" : ""
      } ${dimmed ? "pointer-events-none opacity-25 grayscale" : ""}`}
      style={{
        animationDelay: `${120 + index * 60}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="flip-inner relative h-full w-full">
        <div className={face}>{front}</div>
        <div className={`${face} [transform:rotateY(180deg)]`}>{back}</div>
      </div>
    </div>
  );
};

/** 3×3 board of flip cards: your projects first, then "still brewing" tiles. */
const ProjectGrid = ({ projects, isDark, filter, onOpen }: Props) => {
  const muted = isDark ? "text-neutral-500" : "text-slate-400";
  const body = isDark ? "text-neutral-300" : "text-slate-700";
  const heading = isDark ? "text-white" : "text-slate-900";
  const pill =
    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] transition-all";
  const pillHot = isDark
    ? "bg-pink-500/15 text-pink-200 ring-1 ring-pink-400/40 hover:bg-pink-500/25 hover:shadow-[0_0_14px_-3px_rgba(236,72,153,0.8)]"
    : "bg-pink-100 text-pink-700 ring-1 ring-pink-300 hover:bg-pink-200";
  const brewing = BREWING.slice(0, Math.max(0, SLOTS - projects.length));

  return (
    <div>
      <p
        className={`mb-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}
      >
        <span>hover to flip · tap for a quick look</span>
        <span aria-hidden="true">·</span>
        <span className={isDark ? "text-pink-300" : "text-pink-600"}>
          each project has its own full page →
        </span>
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
        {projects.slice(0, SLOTS).map((p, i) => (
          <FlipCard
            key={p.title}
            index={i}
            label={p.title}
            onActivate={() => onOpen(p.title)}
            isDark={isDark}
            dimmed={filter !== "All" && p.status !== filter}
            front={
              <div className="flex h-full flex-col">
                <span className="fx-corner tl" />
                <span className="fx-corner br" />
                <span
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-30 blur-2xl ${p.gradient}`}
                />
                <span
                  className={`text-[10px] font-semibold tabular-nums ${muted}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 items-center justify-center">
                  <span
                    className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-3xl shadow-[0_0_30px_-4px_rgba(217,70,239,0.6)] transition-transform duration-500 group-hover:scale-110 sm:h-20 sm:w-20 sm:text-4xl ${p.gradient}`}
                  >
                    <PixelIcon name={p.icon} size={44} alt={p.title} />
                  </span>
                </div>
                <h3
                  className={`text-base font-extrabold leading-tight sm:text-lg ${heading}`}
                >
                  {p.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <StatusChip project={p} isDark={isDark} />
                </div>
                <span
                  className={`mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${muted}`}
                >
                  <Users size={11} />
                  {teamLabel(p)}
                  <span className="ml-auto hidden sm:inline">hover ↻</span>
                </span>
              </div>
            }
            back={
              <div className="flex h-full flex-col">
                <span className="fx-corner tr" />
                <span className="fx-corner bl" />
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`text-sm font-extrabold leading-tight sm:text-base ${heading}`}
                  >
                    <PixelIcon
                      name={p.icon}
                      size={18}
                      className="-mt-0.5 mr-1 align-middle"
                    />
                    {p.title}
                  </h3>
                </div>

                <p
                  className={`mt-1.5 hidden items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:inline-flex ${
                    isDark ? "text-violet-300" : "text-violet-600"
                  }`}
                >
                  <Users size={11} />
                  {teamLabel(p, true)}
                </p>

                <p
                  className={`mt-2 line-clamp-6 text-xs leading-5 sm:line-clamp-5 sm:text-[13px] ${body}`}
                >
                  {p.summary}
                </p>

                <div className="mt-auto pt-2">
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 4).map((t, ti) => (
                      <span
                        key={t}
                        className={`rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider sm:text-[10px] ${ti > 1 ? "hidden sm:inline" : ""} ${
                          isDark
                            ? "border-indigo-400/25 bg-indigo-400/5 text-indigo-200"
                            : "border-indigo-200 bg-indigo-50/80 text-indigo-800"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen(p.title);
                      }}
                      className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                        isDark
                          ? "text-neutral-400 hover:text-indigo-300"
                          : "text-slate-500 hover:text-fuchsia-600"
                      }`}
                    >
                      quick look
                    </button>
                    <Link
                      to={projectPath(p)}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.scrollTo({ top: 0 });
                      }}
                      className={`${pill} ${pillHot}`}
                    >
                      full project <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
        ))}

        {brewing.map((b, i) => (
          <FlipCard
            key={b.title}
            index={projects.length + i}
            label={b.title}
            className={
              "hideOnMobile" in b && b.hideOnMobile ? "hidden md:block" : ""
            }
            isDark={isDark}
            dimmed={filter !== "All"}
            front={
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span
                  className={`grid h-16 w-16 place-items-center rounded-2xl border-2 border-dashed text-3xl sm:h-20 sm:w-20 sm:text-4xl ${
                    isDark ? "border-white/15" : "border-indigo-200"
                  }`}
                >
                  <PixelIcon name={b.icon} size={44} />
                </span>
                <p className={`mt-4 text-sm font-bold ${heading}`}>{b.title}</p>
                <p
                  className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${muted}`}
                >
                  {"// brewing"}
                </p>
              </div>
            }
            back={
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className={`text-xs leading-5 sm:text-sm ${body}`}>
                  {b.back}
                </p>
                {b.cta && (
                  <a
                    href={b.cta.href}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_-4px_rgba(217,70,239,0.7)]"
                  >
                    <Mail size={12} /> {b.cta.label}
                  </a>
                )}
              </div>
            }
          />
        ))}
      </div>

      <p
        className={`mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.24em] ${muted}`}
      >
        hover to peek · click to open
      </p>
    </div>
  );
};

export default ProjectGrid;
