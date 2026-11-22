import { useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollY } from "@/hooks/useScrollY";
import { useTypedText } from "@/hooks/useTypedText";
import { NAV_LINKS, NAV_LOGO_TEXT, scrollToTop } from "@/data/site";

/** Floating glass nav pill: neon at night, bright glass on sunny days. */
const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  const scrollY = useScrollY();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const typed = useTypedText(NAV_LOGO_TEXT);
  const scrolled = scrollY > 12;

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  const toTop = () => scrollToTop();

  const handleLogoClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate("/");
    toTop();
  };

  const linkClass = (active: boolean) =>
    `relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
      active
        ? isDark
          ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(240,171,252,0.35),0_0_18px_-6px_rgba(217,70,239,0.8)]"
          : "bg-white text-fuchsia-700 shadow-[inset_0_0_0_1px_rgba(217,70,239,0.25),0_6px_16px_-8px_rgba(217,70,239,0.5)]"
        : isDark
          ? "text-neutral-400 hover:text-indigo-300"
          : "text-slate-500 hover:text-fuchsia-600"
    }`;

  const iconBtn = `grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${
    isDark
      ? "border-white/10 text-amber-200 hover:border-amber-200/50 hover:shadow-[0_0_18px_-4px_rgba(253,230,138,0.7)]"
      : "border-indigo-200 bg-white/70 text-fuchsia-600 hover:border-fuchsia-300"
  }`;

  const themeIcon = (
    <span key={theme} className="nav-icon-swap">
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </span>
  );

  return (
    <nav className="fixed inset-x-0 top-3 z-50 px-3 md:top-4">
      <div
        className={`relative mx-auto max-w-5xl rounded-[28px] border px-3 py-2 backdrop-blur-xl transition-all duration-300 md:px-4 ${
          isDark
            ? `border-white/10 ${scrolled ? "bg-[#0b0914]/85" : "bg-[#0b0914]/55"} shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]`
            : `border-white ${scrolled ? "bg-white/85" : "bg-white/60"} shadow-[0_10px_40px_-20px_rgba(79,70,229,0.45)]`
        }`}
      >
        {/* neon underline that runs along the bottom of the bar */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent ${
            isDark
              ? "opacity-80 shadow-[0_0_10px_rgba(217,70,239,0.9)]"
              : "opacity-50"
          }`}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            aria-label="Home"
            className="group flex items-center gap-2 rounded-full pr-2 transition-transform duration-200 hover:scale-105"
          >
            <img
              src="/logo/YX.png"
              alt=""
              className={`h-10 w-10 transition-[filter] duration-300 ${
                isDark ? "drop-shadow-[0_0_8px_rgba(236,72,153,0.7)]" : ""
              }`}
            />
            <span
              aria-label="airi weng"
              className={`inline-block min-w-[3.5ch] text-left text-xs font-bold tracking-[0.18em] ${
                isDark ? "text-fuchsia-300" : "text-fuchsia-600"
              }`}
            >
              {typed}
              <span className="nav-blink ml-0.5">_</span>
            </span>
          </button>

          {/* desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={toTop}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={linkClass(isActive(item.path))}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to sunny mode" : "Switch to night mode"
              }
              className={`ml-2 ${iconBtn}`}
            >
              {themeIcon}
            </button>
          </div>

          {/* mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to sunny mode" : "Switch to night mode"
              }
              className={iconBtn}
            >
              {themeIcon}
            </button>
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className={iconBtn}
            >
              <span className="relative h-5 w-5">
                <Menu
                  size={20}
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  } ${isDark ? "text-neutral-200" : "text-slate-600"}`}
                />
                <X
                  size={20}
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  } ${isDark ? "text-neutral-200" : "text-slate-600"}`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`mt-2 flex flex-col gap-1 border-t pb-1 pt-3 ${
              isDark ? "border-white/10" : "border-indigo-100"
            }`}
          >
            {NAV_LINKS.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  setIsMenuOpen(false);
                  toTop();
                }}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={`${linkClass(isActive(item.path))} transform ${
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
    </nav>
  );
};

export default Navigation;
