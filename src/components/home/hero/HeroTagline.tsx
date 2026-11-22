import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { prefersReducedMotion } from "@/hooks/useScrollY";

const COMMAND = "whoami";
const ANSWER =
  "CS + Business student at CCNY who turns messy problems into simple, playful tools.";

/** Terminal-style intro line: types `whoami`, then prints the answer. */
const HeroTagline = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [typed, setTyped] = useState(prefersReducedMotion() ? COMMAND : "");

  useEffect(() => {
    if (typed.length >= COMMAND.length) return;
    const t = window.setTimeout(
      () => setTyped(COMMAND.slice(0, typed.length + 1)),
      typed.length === 0 ? 900 : 110,
    );
    return () => window.clearTimeout(t);
  }, [typed]);

  const done = typed.length >= COMMAND.length;

  return (
    <div
      className={`mx-auto mb-10 w-full max-w-xl rounded-xl border px-4 py-3 text-left text-xs backdrop-blur-md md:text-sm ${
        isDark
          ? "border-indigo-400/20 bg-[#0d0b18]/70 shadow-[0_0_30px_-12px_rgba(129,140,248,0.5)]"
          : "border-white bg-white/70 shadow-[0_15px_40px_-25px_rgba(79,70,229,0.5)]"
      }`}
    >
      <div className="mb-2 flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <p className={isDark ? "text-neutral-300" : "text-slate-700"}>
        <span className={isDark ? "text-fuchsia-300" : "text-fuchsia-600"}>
          airi@nyc
        </span>
        <span className={isDark ? "text-neutral-500" : "text-slate-400"}>
          :~$
        </span>{" "}
        <span className={done ? "" : "term-caret"}>{typed}</span>
      </p>
      <p
        className={`mt-1 leading-relaxed transition-opacity duration-500 ${
          done ? "opacity-100" : "opacity-0"
        } ${isDark ? "text-indigo-200/90" : "text-indigo-800"}`}
      >
        <span className="term-caret-end">{ANSWER}</span>
      </p>
    </div>
  );
};

export default HeroTagline;
