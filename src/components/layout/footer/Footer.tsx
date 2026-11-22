import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useRevealProgress } from "@/hooks/useRevealProgress";
import { FOOTER_ID } from "@/hooks/useFooterOverlap";
import { contactEmail } from "@/data/home";
import { NAV_LINKS, SOCIAL_LINKS, scrollToTop } from "@/data/site";
import PixelIcon from "@/components/theme/PixelIcon";
import Wordmark from "./Wordmark";
import EndNote from "./EndNote";

/**
 * End of the experience: a rounded sheet that slides up over the page with
 * the laser wordmark, the email, socials, links and a little end note.
 * Styles: "footer" section of styles/layout.css.
 */
const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [ref, progress] = useRevealProgress<HTMLDivElement>();
  const arrived = progress > 0.45;

  const ink = isDark ? "text-white" : "text-[#1d1029]";
  const soft = isDark ? "text-neutral-300" : "text-[#3b2346]";
  const hover = isDark ? "hover:text-pink-300" : "hover:text-pink-600";

  return (
    <footer id={FOOTER_ID} className="relative overflow-x-clip pt-16 md:pt-24">
      <div
        ref={ref}
        className={`end-sheet ${isDark ? "end-sheet-night" : "end-sheet-day"} ${arrived ? "is-in" : ""}`}
        style={{
          transform: `translateY(${(1 - progress) * 22}%) scale(${0.94 + progress * 0.06})`,
          opacity: 0.35 + progress * 0.65,
        }}
      >
        <div
          className={`relative mx-auto max-w-6xl px-6 pb-14 pt-24 md:px-12 md:pb-20 ${ink}`}
        >
          <Wordmark active={arrived} />

          <p
            className={`mt-6 font-mono text-base leading-[1.9] md:text-lg ${soft}`}
          >
            listen, think, and execute with intent.
          </p>

          {/* email + socials */}
          <div className="mt-14 flex flex-col gap-6 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-10">
            <a
              href={`mailto:${contactEmail}`}
              className="end-email w-fit break-all font-mono font-extrabold leading-none tracking-[-0.04em] text-[clamp(1.6rem,5vw,3.6rem)]"
            >
              {contactEmail}
            </a>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-300 hover:-translate-y-1 ${hover} ${
                    isDark
                      ? "text-neutral-200 hover:bg-white/10 hover:shadow-[0_0_18px_-4px_rgba(236,72,153,0.8)]"
                      : "hover:bg-white/60"
                  }`}
                >
                  <Icon size={24} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* links + copyright */}
          <div className="mt-12 flex flex-col gap-x-10 gap-y-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
              {NAV_LINKS.map((n) => (
                <Link
                  key={n.path}
                  to={n.path}
                  onClick={() => scrollToTop(60)}
                  className={`font-mono text-sm font-bold transition-colors ${hover}`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <p
              className={`flex flex-wrap items-center gap-x-1.5 font-mono text-sm md:justify-end ${soft}`}
            >
              <span>© {new Date().getFullYear()} Yue X. (Airi) Weng ·</span>
              <span className="inline-flex items-center gap-1.5">
                made with
                <PixelIcon
                  name="heart"
                  size={16}
                  alt="love"
                  className="footer-heart"
                />
                in NYC
              </span>
            </p>
          </div>

          <EndNote isDark={isDark} className={`mt-6 ${soft}`} />

          <button
            type="button"
            onClick={() => scrollToTop(0)}
            aria-label="Back to top"
            className={`absolute right-6 top-8 grid h-12 w-12 place-items-center rounded-full border-2 transition-all duration-300 hover:-translate-y-1 md:right-12 md:top-12 ${
              isDark
                ? "border-white/20 text-white hover:border-pink-400 hover:text-pink-300 hover:shadow-[0_0_20px_-4px_rgba(236,72,153,0.9)]"
                : "border-[#1d1029] text-[#1d1029] hover:bg-[#1d1029] hover:text-[#ffc2dc]"
            }`}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
