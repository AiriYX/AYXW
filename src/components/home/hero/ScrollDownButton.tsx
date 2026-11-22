import { ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

type Props = { onScroll: () => void };

const ScrollDownButton = ({ onScroll }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="mt-14 flex justify-center">
      <button
        onClick={onScroll}
        aria-label="Scroll to projects"
        className={`grid h-11 w-11 place-items-center rounded-full border transition-transform duration-300 hover:scale-110 motion-safe:animate-bounce ${
          isDark
            ? "border-indigo-400/40 text-indigo-300 shadow-[0_0_18px_-4px_rgba(129,140,248,0.6)]"
            : "border-indigo-400/50 bg-white/60 text-indigo-600"
        }`}
        style={{ animationDuration: "2.4s" }}
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
};

export default ScrollDownButton;
