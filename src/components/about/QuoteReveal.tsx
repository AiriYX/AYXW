import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { quote } from "@/data/home";

/** The quote lights up word by word as you scroll through it. */
const QuoteReveal = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const words = quote.split(" ");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the quote enters at the bottom, 1 when it reaches the middle
        const t = (vh - r.top) / (vh * 0.55 + r.height * 0.5);
        setProgress(Math.max(0, Math.min(1, t)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const lit = Math.round(progress * words.length);

  return (
    <section className="relative px-2 py-2">
      <div ref={ref} className="mx-auto max-w-3xl text-center">
        <span
          aria-hidden="true"
          className="font-playwrite block text-6xl leading-none text-fuchsia-500"
          style={{
            textShadow: isDark ? "0 0 20px rgba(217,70,239,0.8)" : undefined,
          }}
        >
          &ldquo;
        </span>
        <blockquote
          className={`font-playwrite mt-2 text-2xl leading-[1.8] md:text-3xl ${
            isDark ? "text-white" : "text-slate-900"
          }`}
          aria-label={quote}
        >
          {words.map((w, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="transition-opacity duration-300"
              style={{ opacity: i < lit ? 1 : 0.15 }}
            >
              {w}{" "}
            </span>
          ))}
        </blockquote>
        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-400 shadow-[0_0_12px_rgba(217,70,239,0.8)]" />
      </div>
    </section>
  );
};

export default QuoteReveal;
