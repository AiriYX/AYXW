import { useTheme } from "@/contexts/ThemeContext";
import { useScrollY } from "@/hooks/useScrollY";

/** Code-flavoured words that fade in, bob gently, and drift at
 *  different speeds as you scroll (parallax). */
const PHRASES = [
  {
    text: "<create />",
    top: "18%",
    left: "12%",
    rot: 8,
    depth: 0.35,
    tone: "pink",
  },
  {
    text: "explore()",
    top: "22%",
    left: "76%",
    rot: -6,
    depth: 0.55,
    tone: "cyan",
  },
  {
    text: "// iterate",
    top: "46%",
    left: "5%",
    rot: -8,
    depth: 0.25,
    tone: "violet",
  },
  {
    text: "innovate++",
    top: "52%",
    left: "84%",
    rot: 10,
    depth: 0.45,
    tone: "pink",
  },
  {
    text: "design {}",
    top: "88%",
    left: "8%",
    rot: 3,
    depth: 0.15,
    tone: "cyan",
  },
  {
    text: "dream.exe",
    top: "72%",
    left: "20%",
    rot: -10,
    depth: 0.6,
    tone: "cyan",
  },
  {
    text: "build --all",
    top: "78%",
    left: "62%",
    rot: 6,
    depth: 0.3,
    tone: "violet",
  },
  {
    text: "$ inspire",
    top: "66%",
    left: "88%",
    rot: -5,
    depth: 0.5,
    tone: "pink",
  },
];

const TONES = {
  dark: {
    pink: "text-fuchsia-300/70 [text-shadow:0_0_10px_rgba(240,171,252,0.6)]",
    cyan: "text-indigo-300/70 [text-shadow:0_0_10px_rgba(165,180,252,0.6)]",
    violet: "text-violet-300/70 [text-shadow:0_0_10px_rgba(196,181,253,0.6)]",
  },
  light: {
    pink: "text-fuchsia-500/70",
    cyan: "text-indigo-600/70",
    violet: "text-violet-500/70",
  },
};

const FloatingPhrases = () => {
  const { theme } = useTheme();
  const scrollY = useScrollY();
  const tones = theme === "dark" ? TONES.dark : TONES.light;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative mx-auto h-full w-full max-w-6xl">
        {PHRASES.map((p, i) => (
          <span
            key={p.text}
            className="absolute"
            style={{
              top: p.top,
              left: p.left,
              transform: `translateY(${-scrollY * p.depth}px)`,
            }}
          >
            <span
              className={`hero-phrase block whitespace-nowrap text-xs font-medium md:text-sm ${tones[p.tone as keyof typeof tones]}`}
              style={{
                rotate: `${p.rot}deg`,
                animationDelay: `${0.3 + i * 0.18}s, ${i * 0.7}s`,
              }}
            >
              {p.text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FloatingPhrases;
