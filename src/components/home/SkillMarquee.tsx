import { useTheme } from "@/contexts/ThemeContext";
import { skills } from "@/data/home";

/** Two neon ticker strips of skills drifting in opposite directions. */
const SkillMarquee = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const half = Math.ceil(skills.length / 2);
  const rows = [skills, [...skills.slice(half), ...skills.slice(0, half)]];

  return (
    <section aria-label="Technical skills" className="relative py-16">
      <p
        className={`mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.32em] ${
          isDark ? "text-indigo-300/80" : "text-indigo-700/80"
        }`}
      >
        {"// stack i work with"}
      </p>
      <div className="space-y-3 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`flex overflow-hidden border-y py-3 ${
              r === 0 ? "-rotate-1" : "rotate-1"
            } ${
              isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-white bg-white/60"
            }`}
          >
            <div
              className={`marquee flex shrink-0 items-center gap-8 pr-8 ${
                r === 1 ? "marquee-reverse" : ""
              }`}
            >
              {[...row, ...row].map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className={`flex items-center gap-8 whitespace-nowrap text-xl font-extrabold uppercase tracking-tight md:text-3xl ${
                    i % 3 === 0
                      ? isDark
                        ? "text-fuchsia-300 [text-shadow:0_0_14px_rgba(240,171,252,0.6)]"
                        : "text-fuchsia-600"
                      : i % 3 === 1
                        ? isDark
                          ? "text-indigo-300 [text-shadow:0_0_14px_rgba(165,180,252,0.6)]"
                          : "text-indigo-600"
                        : isDark
                          ? "text-white/80"
                          : "text-slate-800"
                  }`}
                >
                  {s}
                  <span className={isDark ? "text-white/25" : "text-slate-300"}>
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillMarquee;
