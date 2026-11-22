import { useTheme } from "@/contexts/ThemeContext";
import { communities, experiences, type Experience } from "@/data/home";
import { useInView } from "@/hooks/useInView";
import SectionTitle from "@/components/theme/SectionTitle";

const TAG_STYLE: Record<Experience["tag"], { dark: string; light: string }> = {
  work: { dark: "text-pink-300", light: "text-pink-600" },
  edu: { dark: "text-violet-300", light: "text-violet-600" },
  lead: { dark: "text-fuchsia-300", light: "text-fuchsia-600" },
  award: { dark: "text-amber-300", light: "text-amber-600" },
  cert: { dark: "text-indigo-300", light: "text-indigo-600" },
};

/**
 * Experience, wide layout: roles print into a terminal on the left; education,
 * honors, certifications and communities sit as cards on the right.
 */
const ExperienceLog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { ref, inView } = useInView<HTMLDivElement>();

  const roles = experiences.filter((e) => e.tag === "work" || e.tag === "lead");
  const side = experiences.filter(
    (e) => !(e.tag === "work" || e.tag === "lead"),
  );

  const dim = isDark ? "text-neutral-500" : "text-slate-400";
  const panel = `rounded-2xl border backdrop-blur-md ${
    isDark
      ? "border-white/10 bg-[#0e0a1a]/85"
      : "border-white bg-white/85 shadow-[0_25px_50px_-30px_rgba(190,24,93,0.4)]"
  }`;

  return (
    <section className="relative px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="log">
          Experience{" "}
          <span className="bg-gradient-to-r from-pink-500 to-indigo-400 bg-clip-text text-transparent">
            &amp; more
          </span>
        </SectionTitle>

        <div ref={ref} className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* terminal */}
          <div
            className={`${panel} overflow-hidden text-[13px] leading-6 md:text-sm`}
          >
            <div
              className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${
                isDark ? "border-white/10" : "border-pink-100"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className={`ml-3 text-[11px] ${dim}`}>experience.log</span>
            </div>
            <div className="space-y-4 p-5 md:p-6">
              <p className={`log-line ${inView ? "is-in" : ""}`}>
                <span className={isDark ? "text-pink-300" : "text-pink-600"}>
                  airi@nyc
                </span>
                <span className={dim}>:~$ </span>
                <span className={isDark ? "text-white" : "text-slate-900"}>
                  cat experience.log
                </span>
              </p>
              {roles.map((e, i) => {
                const tag = TAG_STYLE[e.tag];
                return (
                  <div
                    key={e.org}
                    className={`log-line border-l-2 pl-4 ${
                      isDark ? "border-white/10" : "border-pink-100"
                    } ${inView ? "is-in" : ""}`}
                    style={{ animationDelay: `${250 + i * 180}ms` }}
                  >
                    <p className="flex flex-wrap items-baseline gap-x-3">
                      <span
                        className={`font-semibold ${isDark ? tag.dark : tag.light}`}
                      >
                        [{e.tag}]
                      </span>
                      <span
                        className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                      >
                        {e.org}
                      </span>
                      <span className={`ml-auto text-xs ${dim}`}>{e.when}</span>
                    </p>
                    <p
                      className={isDark ? "text-violet-200" : "text-violet-700"}
                    >
                      {e.role}
                    </p>
                    <p
                      className={`mt-1 ${isDark ? "text-neutral-400" : "text-slate-600"}`}
                    >
                      {e.description}
                    </p>
                  </div>
                );
              })}
              <p
                className={`log-line ${inView ? "is-in" : ""}`}
                style={{ animationDelay: `${250 + roles.length * 180}ms` }}
              >
                <span className={isDark ? "text-pink-300" : "text-pink-600"}>
                  airi@nyc
                </span>
                <span className={dim}>:~$ </span>
                <span className="term-caret" />
              </p>
            </div>
          </div>

          {/* side cards */}
          <div className="grid content-start gap-4">
            {side.map((e, i) => {
              const tag = TAG_STYLE[e.tag];
              return (
                <div
                  key={e.org}
                  className={`log-line ${panel} p-5 ${inView ? "is-in" : ""}`}
                  style={{ animationDelay: `${400 + i * 180}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                        isDark ? "bg-white/5" : "bg-pink-50"
                      } ${isDark ? tag.dark : tag.light}`}
                    >
                      <e.icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? tag.dark : tag.light}`}
                      >
                        {e.tag === "edu"
                          ? "education"
                          : e.tag === "award"
                            ? "honors"
                            : "certifications"}
                        <span className={`ml-2 ${dim}`}>{e.when}</span>
                      </p>
                      <p
                        className={`truncate text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                      >
                        {e.org}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`mt-2 text-xs font-medium ${isDark ? "text-violet-200" : "text-violet-700"}`}
                  >
                    {e.role}
                  </p>
                  <p
                    className={`mt-1 text-xs leading-5 ${isDark ? "text-neutral-400" : "text-slate-600"}`}
                  >
                    {e.description}
                  </p>
                </div>
              );
            })}

            <div
              className={`log-line ${panel} p-5 ${inView ? "is-in" : ""}`}
              style={{ animationDelay: `${400 + side.length * 180}ms` }}
            >
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-fuchsia-300" : "text-fuchsia-600"}`}
              >
                communities
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {communities.map((c) => (
                  <span
                    key={c.name}
                    className={`rounded-md border px-2.5 py-1 text-xs ${
                      isDark
                        ? "border-white/10 bg-white/[0.04] text-neutral-200"
                        : "border-pink-100 bg-pink-50/70 text-slate-700"
                    }`}
                  >
                    {c.name}
                    <span className={dim}> · {c.role}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceLog;
