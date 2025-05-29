
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const HeroCTAButtons = () => {
  const { theme } = useTheme();

  const handleNavigation = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative">
      <Link
        to="/projects"
        onClick={handleNavigation}
        className={`group px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${theme === "dark" ? "bg-fuchsia-500 hover:bg-fuchsia-600 text-white shadow-lg hover:shadow-xl" : "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-lg hover:shadow-xl"} hover:scale-105`}
      >
        <span>View My Work</span>
        <ArrowRight
          size={20}
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
      </Link>

      <Link
        to="/about"
        onClick={handleNavigation}
        className={`group px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 border-2 hover:scale-105 ${theme === "dark" ? "border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-400 hover:text-white" : "border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white"}`}
      >
        <span
          className={`uppercase text-sm font-bold tracking-wider ${theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"} group-hover:text-white`}
        >
          Reach Out
        </span>
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
      </Link>
    </div>
  );
};

export default HeroCTAButtons;
