import PixelIcon from "@/components/theme/PixelIcon";
import meMylo from "@/assets/img/me_mylo.jpeg";
import { intro, quickFacts } from "@/data/about";

type Props = { isDark: boolean };

const STICKER_TILT = ["-4deg", "3deg", "-2deg", "4deg"];
const STICKER_COLORS = [
  "from-fuchsia-400 to-pink-400",
  "from-indigo-300 to-indigo-400",
  "from-violet-400 to-fuchsia-400",
  "from-amber-300 to-rose-300",
];

/** Taped polaroid of me + a big hello and sticker-style quick facts. */
const AboutHero = ({ isDark }: Props) => (
  <section className="relative grid items-center gap-10 md:grid-cols-[minmax(0,220px)_1fr] md:gap-14">
    {/* soft illuminated area behind the hero, fading into the dark */}
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 rounded-[50%] blur-3xl ${
        isDark
          ? "bg-[radial-gradient(closest-side,rgba(236,72,153,0.28),rgba(139,92,246,0.18)_55%,transparent)]"
          : "bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),rgba(244,114,182,0.18)_60%,transparent)]"
      }`}
    />
    {/* polaroid */}
    <figure className="polaroid group relative mx-auto w-44 md:w-full">
      <span className="tape absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 rotate-[-4deg]" />
      <div className="rounded-sm bg-white p-3 pb-12 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.55)]">
        <img
          src={meMylo}
          alt="Airi Weng"
          className="aspect-square w-full object-cover"
        />
        <figcaption className="font-playwrite absolute inset-x-0 bottom-3 text-center text-lg text-slate-700">
          hi, that&apos;s me! 👋
        </figcaption>
      </div>
      <span
        className="sticker-float absolute -left-5 top-10 text-3xl"
        aria-hidden="true"
      >
        <PixelIcon name="sparkle" size={34} />
      </span>
      <span
        className="sticker-float absolute -right-4 top-1/3 text-3xl"
        style={{ animationDelay: "0.8s" }}
        aria-hidden="true"
      >
        <PixelIcon name="heart" size={34} />
      </span>
      <span
        className="sticker-float absolute -bottom-3 -left-3 text-3xl"
        style={{ animationDelay: "1.6s" }}
        aria-hidden="true"
      >
        <PixelIcon name="sparkle" size={34} />
      </span>
    </figure>

    {/* hello */}
    <div className="text-center md:text-left">
      <h1
        className={`font-playwrite pb-1 text-3xl leading-[1.5] md:text-5xl ${
          isDark ? "fx-title-glow text-white" : "text-slate-900"
        }`}
      >
        Hey there!{" "}
        <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
          You made it!
        </span>
      </h1>
      <p
        className={`mt-4 text-base leading-relaxed md:text-lg ${
          isDark ? "text-neutral-300" : "text-slate-700"
        }`}
      >
        I&apos;m{" "}
        <span
          className={`wiggle-hover inline-block font-extrabold ${
            isDark ? "text-fuchsia-300" : "text-fuchsia-600"
          }`}
        >
          {intro.name}
        </span>
        , a {intro.line}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
        {quickFacts.map(({ icon: Icon, text }, i) => (
          <span
            key={text}
            className={`sticker wiggle-hover inline-flex items-center gap-2 rounded-full bg-gradient-to-br px-4 py-2 text-xs font-bold text-slate-900 ${STICKER_COLORS[i % STICKER_COLORS.length]}`}
            style={{ rotate: STICKER_TILT[i % STICKER_TILT.length] }}
          >
            {typeof Icon === "string" ? (
              <PixelIcon name={Icon} size={18} />
            ) : (
              <Icon size={15} />
            )}
            {text}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default AboutHero;
