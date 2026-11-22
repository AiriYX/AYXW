import { useEffect, useState } from "react";

/** Id put on the footer so fixed decorations can stay clear of it. */
export const FOOTER_ID = "site-footer";

/**
 * How many pixels of the footer's sheet are visible at the bottom of the
 * screen. Fixed decorations use it as their `bottom` so they sit on the sheet's
 * top edge and ride up with it instead of being covered.
 */
export const useFooterOverlap = () => {
  const [overlap, setOverlap] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const footer = document.getElementById(FOOTER_ID);
      const el = (footer?.firstElementChild as HTMLElement | null) ?? footer;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      setOverlap(Math.max(0, window.innerHeight - top));
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
  return overlap;
};
