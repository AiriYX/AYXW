import type { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import NeonBackground from "./NeonBackground";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Page wrapper that applies the neon (night) / sunny (day) theme. */
const NeonPage = ({ children, className = "" }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`fx ${isDark ? "fx-dark" : ""} relative min-h-screen overflow-x-clip pt-20 ${className}`}
    >
      <NeonBackground isDark={isDark} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default NeonPage;
