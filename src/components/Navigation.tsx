import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "About" },
    { path: "/writing", label: "Writing" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        theme === "dark"
          ? "bg-neutral-900/90 backdrop-blur-md border-b border-pink-400/20"
          : "bg-white/90 backdrop-blur-md border-b border-pink-600/20"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
          >
            <img src="/logo/YX.png" alt="Logo" className="h-12 w-12" />
            <span
              className={`text-sm font-serif font-medium transition-colors duration-200 ${
                theme === "dark"
                  ? "text-pink-400/80 hover:text-pink-300"
                  : "text-pink-600/80 hover:text-pink-500"
              }`}
            >
              AW
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? theme === "dark"
                      ? "text-pink-400"
                      : "text-pink-600"
                    : theme === "dark"
                      ? "text-neutral-300 hover:text-pink-400"
                      : "text-neutral-600 hover:text-pink-600"
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:transition-transform after:duration-300 ${
                  isActive(item.path)
                    ? `after:scale-x-100 ${theme === "dark" ? "after:bg-pink-400" : "after:bg-pink-600"}`
                    : "after:scale-x-0 hover:after:scale-x-100 after:bg-current"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === "dark"
                  ? "text-pink-400 hover:bg-neutral-800 hover:text-pink-300"
                  : "text-fuchsia-600 hover:bg-pink-600/10 hover:text-fuchsia-600"
              }`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === "dark"
                  ? "text-fuchsia-400 hover:bg-neutral-800 hover:text-pink-300"
                  : "text-fuchsia-600 hover:bg-pink-600/10 hover:text-pink-500"
              }`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                theme === "dark"
                  ? "text-neutral-300 hover:bg-neutral-800 hover:text-pink-400"
                  : "text-neutral-600 hover:bg-pink-600/10 hover:text-pink-600"
              }`}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`py-4 border-t mt-4 ${
              theme === "dark" ? "border-pink-400/20" : "border-pink-600/20"
            }`}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium transition-all duration-200 transform ${
                    isActive(item.path)
                      ? theme === "dark"
                        ? "text-pink-400"
                        : "text-pink-600"
                      : theme === "dark"
                        ? "text-neutral-300 hover:text-pink-400"
                        : "text-neutral-600 hover:text-pink-600"
                  } ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
