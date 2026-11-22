import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Returns a ref and a 0 → 1 value for how far that element has slid into view
 * from the bottom of the screen. Used by the footer's slide-up sheet.
 */
export function useRevealProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = Math.max(1, Math.min(vh * 0.55, r.height * 0.8));
      setProgress(Math.min(1, Math.max(0, (vh - r.top) / span)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, progress] as const;
}
