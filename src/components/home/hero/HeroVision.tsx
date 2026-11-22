import { useTheme } from "@/contexts/ThemeContext";

/** Short mission line under the "Welcome to A-Cafe" signature. */
const HeroVision = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <p
      className={`hero-vision mx-auto -mt-3 mb-8 max-w-md text-sm font-light leading-7 tracking-tight md:text-base ${
        isDark ? "text-neutral-300" : "text-slate-600"
      }`}
    >
      Visionary developer dedicated to transforming{" "}
      <span className={isDark ? "text-pink-300" : "text-pink-600"}>
        your ideas
      </span>{" "}
      into digital reality.
    </p>
  );
};

export default HeroVision;
