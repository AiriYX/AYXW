import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const HeroCTAButtons = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const toTop = () => window.setTimeout(() => window.scrollTo({ top: 0 }), 50);

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link
        to="/projects"
        onClick={toTop}
        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_28px_-6px_rgba(217,70,239,0.7)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_36px_-4px_rgba(129,140,248,0.7)]"
      >
        View my work
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <Link
        to="/about"
        onClick={toTop}
        className={`group flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] backdrop-blur-md transition-all duration-300 hover:scale-105 ${
          isDark
            ? "border-indigo-400/50 text-indigo-300 hover:bg-indigo-400/10 hover:shadow-[0_0_24px_-6px_rgba(129,140,248,0.7)]"
            : "border-indigo-500/50 bg-white/50 text-indigo-700 hover:bg-white/80"
        }`}
      >
        Reach out
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};

export default HeroCTAButtons;
