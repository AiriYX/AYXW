import { useTheme } from "@/contexts/ThemeContext";

// Pop-art title: chunky stacked offset shadows (sized in em so they scale
// with the text), each word tilted a little and bouncing in.
const WORDS = [
  {
    text: "Curious",
    rotate: "2deg",
    size: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    dark: {
      color: "#fb7185",
      shadow: ["244,63,94,0.8", "190,18,60,0.6", "239,68,68,0.4"],
    },
    light: {
      color: "#f43f5e",
      shadow: ["244,63,94,0.7", "225,29,72,0.5", "190,18,60,0.3"],
    },
  },
  {
    text: "Focused",
    rotate: "-1deg",
    size: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
    dark: {
      color: "#e879f9",
      shadow: ["232,121,249,0.9", "192,38,211,0.7", "168,85,247,0.5"],
    },
    light: {
      color: "#c026d3",
      shadow: ["217,70,239,0.8", "168,85,247,0.6", "147,51,234,0.4"],
    },
  },
  {
    text: "Builder",
    rotate: "1.5deg",
    size: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    dark: {
      color: "#818cf8",
      shadow: ["129,140,248,0.8", "99,102,241,0.6", "79,70,229,0.4"],
    },
    light: {
      color: "#6366f1",
      shadow: ["99,102,241,0.7", "79,70,229,0.5", "67,56,202,0.3"],
    },
  },
];

const HeroHeading = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <h1 className="mb-12 font-extrabold uppercase leading-none tracking-tight">
      {WORDS.map((w, i) => {
        const c = isDark ? w.dark : w.light;
        const [s1, s2, s3] = c.shadow;
        return (
          <span
            key={w.text}
            className={`pop-in block py-1 md:py-1.5 ${w.size}`}
            style={{ animationDelay: `${0.3 + i * 0.18}s` }}
          >
            <span
              className="inline-block"
              style={{
                color: c.color,
                rotate: w.rotate,
                textShadow: `0.05em 0.05em 0 rgba(${s1}), 0.1em 0.1em 0 rgba(${s2}), 0.15em 0.15em 0.2em rgba(${s3})`,
              }}
            >
              {w.text}
            </span>
          </span>
        );
      })}
    </h1>
  );
};

export default HeroHeading;
