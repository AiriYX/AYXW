import PixelIcon from "@/components/theme/PixelIcon";

type Props = { isDark: boolean; total: number; brewing: number };

/**
 * Hanging neon café sign: "the project menu", with an OPEN light and a
 * count of what's on the menu vs. still brewing.
 */
const ProjectsHeader = ({ isDark, total, brewing }: Props) => (
  <header
    className="mb-10 flex flex-col items-center text-center motion-safe:animate-fade-in motion-reduce:animate-none"
    style={{ animationDelay: "40ms", animationFillMode: "backwards" }}
  >
    {/* the sign hangs from two little chains */}
    <div className="relative">
      <span
        aria-hidden="true"
        className={`absolute -top-8 left-[18%] h-8 w-px ${
          isDark ? "bg-white/25" : "bg-slate-400/50"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute -top-8 right-[18%] h-8 w-px ${
          isDark ? "bg-white/25" : "bg-slate-400/50"
        }`}
      />

      <div
        className={`neon-sign sign-sway relative rounded-[22px] px-7 pb-4 pt-3 md:px-12 md:pb-5 md:pt-4 ${
          isDark ? "neon-sign-night" : "neon-sign-day"
        }`}
      >
        <h1 className="font-playwrite text-4xl leading-[1.5] md:text-6xl">
          <span
            className="neon-flicker-in inline-block"
            style={{ animationDelay: "0.3s" }}
          >
            the project
          </span>{" "}
          <span
            className="neon-flicker-in inline-block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent"
            style={{ animationDelay: "0.8s" }}
          >
            menu
          </span>
        </h1>
        <span
          className="absolute -right-3 -top-3 text-2xl md:-right-4 md:-top-4 md:text-3xl"
          aria-hidden="true"
        >
          <PixelIcon name="coffee" size={52} />
        </span>
      </div>
    </div>

    {/* status line */}
    <div
      className={`mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${
        isDark ? "text-neutral-400" : "text-slate-500"
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded border px-2 py-0.5 ${
          isDark
            ? "border-emerald-300/60 text-emerald-300 shadow-[0_0_12px_-2px_rgba(110,231,183,0.7)]"
            : "border-emerald-500 bg-white text-emerald-600"
        }`}
      >
        <span className="fx-led fx-led-pulse" /> open
      </span>
      <span>{`${String(total).padStart(2, "0")} on the menu`}</span>
      <span aria-hidden="true" className="hidden sm:inline">
        ·
      </span>
      <span>{`${String(brewing).padStart(2, "0")} still brewing`}</span>
    </div>

    <p
      className={`mx-auto mt-4 max-w-md text-sm leading-relaxed md:text-base ${
        isDark ? "text-neutral-400" : "text-slate-600"
      }`}
    >
      Pick a card, any card. Flip it for the details.
    </p>
  </header>
);

export default ProjectsHeader;
