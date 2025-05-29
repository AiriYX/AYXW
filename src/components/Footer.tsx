import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Book, Mail, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  const handleNavigation = () => {
    // Add a small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const links = [
    {
      to: "/projects",
      icon: Code,
      title: "Projects",
      color: "rose",
    },
    {
      to: "/writing",
      icon: Book,
      title: "Writing",
      color: "violet",
    },
    {
      to: "/about",
      icon: Mail,
      title: "Contact",
      color: "teal",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "rose":
        return theme === "dark"
          ? "text-rose-400 hover:text-rose-300"
          : "text-rose-500 hover:text-rose-600";
      case "violet":
        return theme === "dark"
          ? "text-violet-400 hover:text-violet-300"
          : "text-violet-500 hover:text-violet-600";
      case "teal":
        return theme === "dark"
          ? "text-teal-400 hover:text-teal-300"
          : "text-teal-500 hover:text-teal-600";
      default:
        return theme === "dark" ? "text-neutral-400" : "text-neutral-600";
    }
  };

  return (
    <footer
      className={`relative py-16 px-6 border-t ${
        theme === "dark"
          ? "bg-neutral-900/50 border-neutral-800/50"
          : "bg-neutral-50/50 border-neutral-200/30"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Main footer content */}
        <div className="text-center mb-8">
          <h3
            className={`text-2xl font-light mb-4 ${
              theme === "dark" ? "text-neutral-100" : "text-neutral-800"
            }`}
          >
            Let's connect
          </h3>
          <p
            className={`text-sm font-light max-w-md mx-auto ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Always open to interesting conversations and new opportunities
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex justify-center items-center gap-12 mb-8">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={handleNavigation}
              className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`p-3 rounded-full transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-neutral-800/50 group-hover:bg-neutral-700/80"
                    : "bg-white/80 group-hover:bg-white shadow-sm"
                }`}
              >
                <link.icon
                  className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${getColorClasses(
                    link.color
                  )}`}
                />
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-neutral-300 group-hover:text-neutral-100"
                    : "text-neutral-600 group-hover:text-neutral-800"
                }`}
              >
                {link.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Playful bottom section */}
        <div className="text-center pt-8 border-t border-neutral-200/30 dark:border-neutral-700/30">
          <p
            className={`text-xs font-light flex items-center justify-center gap-2 ${
              theme === "dark" ? "text-neutral-500" : "text-neutral-500"
            }`}
          >
            Made with
            <Heart className="w-3 h-3 text-red-400 animate-pulse" />
            &nbsp;| &nbsp;© {new Date().getFullYear()} Yue X. (Airi) Weng
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
