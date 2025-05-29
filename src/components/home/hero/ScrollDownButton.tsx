
import React from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ScrollDownButtonProps {
  onScroll: () => void;
}

const ScrollDownButton = ({ onScroll }: ScrollDownButtonProps) => {
  const { theme } = useTheme();

  return (
    <div className="mt-16 flex justify-center">
      <button
        onClick={onScroll}
        className="cursor-pointer hover:scale-110 transition-transform duration-1000"
        style={{
          animation: "bounce 4s ease-in-out infinite",
        }}
      >
        <ChevronDown
          size={24}
          className={`${theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"}`}
        />
      </button>
    </div>
  );
};

export default ScrollDownButton;
