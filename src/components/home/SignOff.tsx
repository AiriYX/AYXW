import { Link } from "react-router-dom";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { contactEmail } from "@/data/home";
import PixelIcon from "@/components/theme/PixelIcon";

/**
 * Closing call to action. Same width as the experience section above it:
 * the pitch on the left, the actions on the right.
 */
const SignOff = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const resumeHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    "Resume Request – [Your Name], [Company Name]",
  )}`;
  const toTop = () => window.setTimeout(() => window.scrollTo({ top: 0 }), 50);

  const secondary = `inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 ${
    isDark
      ? "border-indigo-400/40 text-indigo-200 hover:border-indigo-300 hover:shadow-[0_0_24px_-6px_rgba(129,140,248,0.7)]"
      : "border-indigo-300 bg-white/60 text-indigo-700 hover:bg-white"
  }`;

  return (
    <section className="relative px-4 pb-20 pt-6 md:px-6">
      <div
        className={`relative mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-3xl border px-6 py-10 md:grid-cols-[1.4fr_1fr] md:px-12 md:py-12 ${
          isDark
            ? "border-pink-400/30 bg-[#0e0b1a]/85 shadow-[0_0_60px_-20px_rgba(236,72,153,0.6)]"
            : "border-white bg-white/85 shadow-[0_30px_70px_-35px_rgba(190,24,93,0.45)]"
        } backdrop-blur-md`}
      >
        <span className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-pink-500/25 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-20 right-1/3 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* pitch */}
        <div className="relative">
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${
              isDark ? "text-indigo-300/80" : "text-indigo-700/80"
            }`}
          >
            {"// next stop"}
          </p>
          <h2
            className="pop-in mt-3 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl"
            style={{
              color: isDark ? "#f472b6" : "#db2777",
              textShadow:
                "0.05em 0.05em 0 rgba(236,72,153,0.45), 0.1em 0.1em 0 rgba(139,92,246,0.35)",
            }}
          >
            let&apos;s make
            <br />
            something
          </h2>
          <p
            className={`mt-4 max-w-md text-sm leading-relaxed ${
              isDark ? "text-neutral-400" : "text-slate-600"
            }`}
          >
            Open to BA, PM and TPM roles, collabs and good conversations. The
            resume button fills in the subject line for you.
          </p>
        </div>

        {/* actions */}
        <div
          className={`relative flex flex-col gap-3 rounded-2xl border p-5 ${
            isDark
              ? "border-white/10 bg-black/20"
              : "border-pink-100 bg-pink-50/50"
          }`}
        >
          <div className="mb-1 flex items-center gap-3">
            <PixelIcon name="coffee" size={40} />
            <p
              className={`font-playwrite text-base leading-[1.6] ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              coffee&apos;s on me
            </p>
          </div>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_28px_-6px_rgba(236,72,153,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Mail size={15} /> say hi
          </a>
          <a href={resumeHref} className={secondary}>
            <FileText size={15} /> request resume
          </a>
          <Link
            to="/about"
            onClick={toTop}
            className={`mt-1 inline-flex items-center justify-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
              isDark
                ? "text-neutral-500 hover:text-pink-300"
                : "text-slate-400 hover:text-pink-600"
            }`}
          >
            or get to know me first <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignOff;
