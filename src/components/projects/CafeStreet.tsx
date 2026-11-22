import PixelIcon from "@/components/theme/PixelIcon";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";

/**
 * Projects intro: a neon café street at night.
 * Each café is a project. The camera glides from café to café
 * (scroll, arrow keys, swipe, or the buttons), a coffee cup hops along the
 * route at the bottom, and "Step inside" opens that project's details.
 */

type Props = {
  isDark: boolean;
  /** Café to start at (used when coming back from a project). */
  startIndex?: number;
  /** Called when leaving the street, with the café you were at.
   *  openTitle is set when you chose "Step inside". */
  onComplete: (openTitle: string | undefined, index: number) => void;
};

const NEON = ["#f0abfc", "#a5b4fc", "#c4b5fd", "#fda4af", "#fcd34d", "#86efac"];

// Deterministic "random" skyline so it looks the same every visit.
const skyline = (count: number, seed: number, minH: number, varH: number) =>
  Array.from({ length: count }, (_, i) => {
    const r = Math.abs(Math.sin((i + 1) * seed)) % 1;
    const r2 = Math.abs(Math.cos((i + 3) * seed * 1.7)) % 1;
    return { h: minH + r * varH, w: 50 + r2 * 70 };
  });

const useViewportWidth = () => {
  const [w, setW] = useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
};

const CafeStreet = ({ isDark, startIndex = 0, onComplete }: Props) => {
  const stops: Project[] = useMemo(
    () => [...projects].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );
  const [index, setIndex] = useState(startIndex);
  const [entering, setEntering] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);

  const vw = useViewportWidth();
  const cafeW = Math.round(Math.min(300, Math.max(190, vw * 0.24)));
  const step = cafeW + Math.max(150, vw * 0.2);
  const camX = index * step;
  const last = stops.length - 1;
  const active = stops[index];

  const go = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(last, next))),
    [last],
  );

  const finish = useCallback(
    (openTitle?: string) => {
      if (entering) return;
      setEntering(true);
      window.setTimeout(() => onComplete(openTitle, index), 650);
    },
    [entering, onComplete, index],
  );

  // Scroll wheel / trackpad: one café per gesture.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (lockRef.current || Math.abs(d) < 12) return;
      lockRef.current = true;
      window.setTimeout(() => (lockRef.current = false), 750);
      setIndex((i) => Math.max(0, Math.min(last, i + Math.sign(d))));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [last]);

  // Keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(index + 1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(index - 1);
      else if (e.key === "Escape") finish();
      else if (e.key === "Enter" && index === last) finish();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, last, go, finish]);

  // Touch swipe.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const s = touchStart.current;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    const d = Math.abs(dx) > Math.abs(dy) ? -dx : dy;
    if (Math.abs(d) > 40) go(index + Math.sign(d));
    touchStart.current = null;
  };

  const far = useMemo(() => skyline(40, 12.9898, 140, 220), []);
  const mid = useMemo(() => skyline(34, 78.233, 90, 160), []);

  const streetX = vw / 2 - camX - cafeW / 2;
  const zoom = entering ? " scale(1.6)" : "";

  const btn = `inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-md transition-colors disabled:opacity-30 ${
    isDark
      ? "border-white/15 bg-white/5 text-neutral-200 hover:border-indigo-400/60 hover:text-indigo-300"
      : "border-indigo-200 bg-white/75 text-slate-700 hover:border-fuchsia-400 hover:text-fuchsia-600"
  }`;

  return (
    <div
      ref={rootRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`cs-root absolute inset-0 z-30 overflow-hidden transition-opacity duration-500 ${
        isDark ? "" : "cs-light"
      } ${entering ? "cs-entering opacity-0" : "opacity-100"}`}
      style={{ ["--cw" as string]: `${cafeW}px` } as CSSProperties}
      role="region"
      aria-label="Café street intro: each café is a project"
    >
      <div className="cs-sky" />
      {isDark ? (
        <>
          <div className="cs-stars" />
          <div className="cs-moon" />
        </>
      ) : (
        <>
          <div className="cs-sun" />
          <div
            className="cs-clouds"
            style={{ transform: `translateX(${-camX * 0.05}px)` }}
          >
            <span className="cs-cloud" style={{ top: "12%", left: "6%" }} />
            <span
              className="cs-cloud cs-cloud-sm"
              style={{ top: "26%", left: "38%", animationDelay: "-12s" }}
            />
            <span
              className="cs-cloud"
              style={{ top: "8%", left: "62%", animationDelay: "-24s" }}
            />
            <span
              className="cs-cloud cs-cloud-sm"
              style={{ top: "30%", left: "86%", animationDelay: "-6s" }}
            />
          </div>
        </>
      )}

      {/* far + mid skyline drift slower than the street = parallax */}
      <div
        className="cs-layer cs-far"
        style={{ transform: `translateX(${-80 - camX * 0.12}px)` }}
      >
        {far.map((b, i) => (
          <span
            key={i}
            className="cs-tower"
            style={{ left: i * 95, width: b.w, height: b.h }}
          />
        ))}
      </div>
      <div
        className="cs-layer cs-mid"
        style={{ transform: `translateX(${-60 - camX * 0.35}px)` }}
      >
        {mid.map((b, i) => (
          <span
            key={i}
            className="cs-tower"
            style={{ left: i * 130 + 30, width: b.w + 20, height: b.h }}
          />
        ))}
      </div>

      <div className="cs-ground" />

      <div
        className="cs-street"
        style={{ transform: `translateX(${streetX}px)${zoom}` }}
      >
        {stops.map((p, i) => (
          <span
            key={`lamp-${p.title}`}
            className="cs-lamp"
            style={{ left: i * step - step / 2 + cafeW / 2 }}
          />
        ))}
        <span
          className="cs-lamp"
          style={{ left: last * step + step / 2 + cafeW / 2 }}
        />

        {stops.map((p, i) => {
          const isActive = i === index;
          return (
            <div
              key={p.title}
              className="cs-cafe"
              data-active={isActive}
              style={
                {
                  left: i * step,
                  ["--c" as string]: NEON[i % NEON.length],
                } as CSSProperties
              }
              role="button"
              tabIndex={0}
              aria-label={
                isActive ? `Step inside ${p.title}` : `Walk to ${p.title}`
              }
              onClick={() => (isActive ? finish(p.title) : go(i))}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                  if (isActive) finish(p.title);
                  else go(i);
                }
              }}
            >
              <div className="cs-building" />
              <div className="cs-upper">
                <span className="cs-upwin" />
                <span className="cs-upwin" />
                <span className="cs-upwin" />
              </div>
              <div className="cs-sign font-playwrite">{p.title}</div>
              <div className="cs-awning" />
              <div className="cs-window">
                <span className="cs-steam" />
                <span className="cs-steam" />
                <PixelIcon
                  name={p.icon}
                  size={Math.round(cafeW * 0.2)}
                  className="cs-emoji"
                />
              </div>
              <div className="cs-door">
                <span
                  className="cs-open"
                  data-brewing={p.status === "In Progress"}
                >
                  {p.status === "In Progress" ? "BREWING" : "OPEN"}
                </span>
              </div>
              <div className="cs-spill" />
            </div>
          );
        })}
      </div>

      {isDark && <div className="cs-rain" />}

      {/* top HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-36 z-10 px-4 text-center md:top-28">
        <p
          className={`fx-cursor text-[11px] font-semibold uppercase tracking-[0.32em] ${isDark ? "text-indigo-300/90" : "text-indigo-800/80"}`}
        >
          {`// café hop · stop ${String(index + 1).padStart(2, "0")} of ${String(stops.length).padStart(2, "0")}`}
        </p>
        <h2
          className={`font-playwrite mt-2 text-2xl leading-snug md:text-4xl ${isDark ? "fx-title-glow text-white" : "text-slate-800 [text-shadow:0_2px_12px_rgba(255,255,255,0.8)]"}`}
        >
          grab a coffee, see what I&apos;m brewing
        </h2>
      </div>

      {/* menu board for the café you're standing at */}
      <div className="absolute inset-x-0 bottom-16 z-10 flex justify-center px-4 md:bottom-[4.5rem]">
        <div
          key={active.title}
          className={`cs-menu-in w-full max-w-md rounded-2xl border px-4 py-3 text-left backdrop-blur-md md:px-5 md:py-4 ${isDark ? "border-white/10 bg-[#0d0b18]/85 shadow-[0_0_40px_-12px_rgba(129,140,248,0.4)]" : "border-white bg-white/85 shadow-[0_20px_50px_-20px_rgba(79,70,229,0.35)]"}`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className={`text-base font-semibold md:text-lg ${isDark ? "text-white" : "text-slate-900"}`}
            >
              <PixelIcon
                name={active.icon}
                size={22}
                className="mr-1.5 -mt-1 align-middle"
              />
              {active.title}
            </h3>
            <span
              className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] ${isDark ? "text-indigo-300/80" : "text-amber-600"}`}
            >
              today&apos;s special
            </span>
          </div>
          <p
            className={`mt-1 text-[13px] leading-6 md:text-sm ${isDark ? "text-neutral-300" : "text-slate-600"}`}
          >
            {active.summary}
          </p>
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <p
              className={`truncate text-[11px] ${isDark ? "text-fuchsia-200/70" : "text-fuchsia-700/80"}`}
            >
              ★ {active.tech.slice(0, 3).join(" · ")}
            </p>
            <button
              onClick={() => finish(active.title)}
              className="shrink-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_20px_-4px_rgba(217,70,239,0.6)]"
            >
              Step inside
            </button>
          </div>
        </div>
      </div>

      {/* route + controls */}
      <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-3 px-4 md:bottom-4">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous café"
          className={btn}
        >
          <ChevronLeft size={14} />
        </button>

        <div className="cs-route mx-2 w-40 md:w-64" aria-hidden="true">
          {stops.map((p, i) => (
            <span
              key={p.title}
              className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors ${
                i <= index
                  ? "border-indigo-300 bg-indigo-300 shadow-[0_0_8px_rgba(165,180,252,0.9)]"
                  : isDark
                    ? "border-white/40 bg-[#0d0b18]"
                    : "border-indigo-300 bg-white"
              }`}
              style={{ left: `${(i / last) * 100}%` }}
            />
          ))}
          <span
            key={index}
            className="cs-cup cs-cup-hop"
            style={{ left: `${(index / last) * 100}%` }}
          >
            <PixelIcon name="coffee" size={30} />
          </span>
        </div>

        <button
          onClick={() => (index === last ? finish() : go(index + 1))}
          aria-label={index === last ? "See all projects" : "Next café"}
          className={btn}
        >
          {index === last ? "Gallery" : <ChevronRight size={14} />}
        </button>
      </div>

      <button
        onClick={() => finish()}
        className={`absolute right-4 top-24 z-20 md:right-8 md:top-28 ${btn}`}
      >
        Skip →
      </button>
    </div>
  );
};

export default CafeStreet;
