import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFooterOverlap } from "@/hooks/useFooterOverlap";

type Props = { isDark: boolean };

// ---- hand-drawn doodles (stroke only, they take the current text colour) ----
const Bean = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <ellipse cx="12" cy="12" rx="7" ry="9.5" transform="rotate(25 12 12)" />
    <path d="M9.5 4.5c3 3.5-1.5 9 1.5 15" transform="rotate(25 12 12)" />
  </svg>
);
const Heart = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
);
const Sparkle = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M12 2c.8 5 2.2 7 8 10-5.8 3-7.2 5-8 10-.8-5-2.2-7-8-10 5.8-3 7.2-5 8-10z" />
  </svg>
);

type Floater = {
  el: ReactNode;
  x: string;
  size: number;
  dur: number;
  delay: number;
  tone: 0 | 1 | 2;
};

// beans show up the most, sprinkled with the other doodles
const LEFT: Floater[] = [
  { el: <Bean />, x: "22%", size: 22, dur: 24, delay: 0, tone: 0 },
  { el: <Sparkle />, x: "62%", size: 16, dur: 28, delay: -9, tone: 1 },
  { el: <Bean />, x: "45%", size: 16, dur: 22, delay: -16, tone: 2 },
];
const RIGHT: Floater[] = [
  { el: <Bean />, x: "60%", size: 22, dur: 23, delay: -5, tone: 0 },
  { el: <Heart />, x: "30%", size: 16, dur: 27, delay: -13, tone: 1 },
  { el: <Bean />, x: "45%", size: 16, dur: 21, delay: -19, tone: 2 },
];

/** Pixel-art kettle pouring into a cup (same style as the site's icons). */
const CoffeePour = () => (
  <img
    src="/img/px/pour.gif"
    alt=""
    width={144}
    height={144}
    className="h-auto w-full [image-rendering:pixelated]"
  />
);

/**
 * The pour-over sits in the bottom-left corner. It's portalled to <body> so it
 * stays above the footer, and rides up on top of the footer as it slides in.
 */
const PourCorner = ({ isDark }: Props) => {
  const overlap = useFooterOverlap();
  return createPortal(
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-3 z-40 hidden w-[130px] lg:block xl:left-11 ${
        isDark ? "drop-shadow-[0_0_14px_rgba(236,72,153,0.55)]" : ""
      }`}
      style={{ bottom: Math.max(32, overlap - 6) }}
    >
      <CoffeePour />
    </div>,
    document.body,
  );
};

/** About page sides: drifting coffee doodles + a little pour-over animation. */
const CoffeeDoodleSides = ({ isDark }: Props) => {
  const tones = isDark
    ? ["text-pink-300/45", "text-violet-300/30", "text-indigo-300/25"]
    : ["text-pink-500/40", "text-violet-500/30", "text-indigo-500/25"];

  const column = (items: Floater[], side: "left" | "right") => (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 z-0 hidden h-screen w-[140px] overflow-hidden lg:block ${
        side === "left" ? "left-2 xl:left-10" : "right-2 xl:right-10"
      }`}
    >
      {items.map((f, i) => (
        <span
          key={i}
          className={`doodle-rise absolute bottom-0 ${tones[f.tone]} ${""}`}
          style={{
            left: f.x,
            width: f.size,
            height: f.size,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          <span
            className="doodle-sway block h-full w-full"
            style={{ animationDelay: `${f.delay / 2}s` }}
          >
            {f.el}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <>
      {column(LEFT, "left")}
      {column(RIGHT, "right")}
      <PourCorner isDark={isDark} />
    </>
  );
};

export default CoffeeDoodleSides;
