import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useTypedText } from "@/hooks/useTypedText";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { FOOTER_NAME } from "@/data/site";

/**
 * The giant "Airi.Weng" in the footer.
 *  1. When the footer lands it types itself out, like the nav logo.
 *  2. Then the letters light up one by one in neon ("laser"), once.
 *  3. After that, hovering a word lasers just that word again.
 * Styles: "footer" section of styles/layout.css.
 */

const LETTER_MS = 90; // delay between letters (matches --i / --g in CSS)
const ZAP_MS = 900; // one letter's flash

// "Airi.Weng" → ["Airi", ".", "Weng"], with each word's start index
const WORDS = FOOTER_NAME.split(/(\.)/).reduce<
  { text: string; start: number }[]
>((acc, text) => {
  const prev = acc[acc.length - 1];
  acc.push({ text, start: prev ? prev.start + prev.text.length : 0 });
  return acc;
}, []);

type Target = "all" | number; // whole name, or one word's index

/** Restartable laser: which part is lit right now, and a trigger. */
const useLaser = () => {
  const [lit, setLit] = useState<Target | null>(null);
  const timer = useRef<number>();

  const fire = useCallback((target: Target) => {
    if (prefersReducedMotion()) return;
    setLit(null);
    // two frames so the browser sees the class removed before re-adding it
    requestAnimationFrame(() => requestAnimationFrame(() => setLit(target)));
    const letters =
      target === "all" ? FOOTER_NAME.length : WORDS[target].text.length;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => setLit(null),
      letters * LETTER_MS + ZAP_MS + 100,
    );
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  return [lit, fire] as const;
};

const Wordmark = ({ active }: { active: boolean }) => {
  const typed = useTypedText(FOOTER_NAME, {
    enabled: active,
    startDelay: 250,
    perChar: 110,
  });
  const done = typed.length === FOOTER_NAME.length;
  const [lit, fire] = useLaser();

  // laser the whole name once, right after it finishes typing
  const landed = useRef(false);
  useEffect(() => {
    if (!done || !active || landed.current) return;
    landed.current = true;
    const t = window.setTimeout(() => fire("all"), 200);
    return () => window.clearTimeout(t);
  }, [done, active, fire]);

  return (
    <h2
      aria-label="airi weng"
      className={`wm select-none font-mono font-extrabold leading-[0.9] tracking-[-0.06em] text-[clamp(3.4rem,13vw,11rem)] ${
        lit === "all" ? "is-zap-all" : ""
      }`}
    >
      <span aria-hidden="true" className="relative inline-block">
        {/* invisible full text keeps the width steady while typing */}
        <span className="invisible">{FOOTER_NAME}_</span>
        <span className="absolute inset-0 whitespace-nowrap">
          {WORDS.map((w, wi) => {
            const shown = typed.slice(w.start, w.start + w.text.length);
            if (!shown) return null;
            const isDot = w.text === ".";
            return (
              <span
                key={wi}
                onMouseEnter={done && !isDot ? () => fire(wi) : undefined}
                className={`wm-word ${isDot ? "wm-dot" : ""} ${lit === wi ? "is-zap" : ""}`}
              >
                {shown.split("").map((ch, ci) => (
                  <span
                    key={ci}
                    className="wm-char"
                    style={{ "--i": ci, "--g": w.start + ci } as CSSProperties}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            );
          })}
          <span className="wm-cursor nav-blink">_</span>
        </span>
      </span>
    </h2>
  );
};

export default Wordmark;
