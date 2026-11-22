import type { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

type Props = {
  /** small terminal-style label above the title */
  kicker: string;
  children: ReactNode;
  subtitle?: ReactNode;
  /** render as the page's h1 */
  as?: "h1" | "h2";
};

/** Neon section heading used across the landing page. */
const SectionTitle = ({ kicker, children, subtitle, as = "h2" }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const Heading = as;

  return (
    <div className="mb-10 text-center">
      <p
        className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] ${
          isDark ? "text-indigo-300/80" : "text-indigo-700/80"
        }`}
      >
        {`// ${kicker}`}
      </p>
      <Heading
        className={`font-playwrite pb-1 text-3xl leading-[1.5] md:text-4xl ${
          isDark ? "fx-title-glow text-white" : "text-slate-900"
        }`}
      >
        {children}
      </Heading>
      {subtitle && (
        <p
          className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed md:text-base ${
            isDark ? "text-neutral-400" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
