const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Slow, eased scroll to an element (the native "smooth" is quick and
 * abrupt). Jumps straight there for visitors who prefer reduced motion.
 */
export const smoothScrollTo = (
  target: Element | null,
  {
    duration = 1800,
    offset = -24,
  }: { duration?: number; offset?: number } = {},
) => {
  if (!target) return;
  const startY = window.scrollY;
  const endY = target.getBoundingClientRect().top + startY + offset;

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, endY);
    return;
  }

  let start: number | null = null;
  let cancelled = false;
  const cancel = () => (cancelled = true);
  // any manual scroll input stops the animation
  window.addEventListener("wheel", cancel, { once: true, passive: true });
  window.addEventListener("touchstart", cancel, { once: true, passive: true });

  const step = (now: number) => {
    if (cancelled) return;
    if (start === null) start = now;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + (endY - startY) * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
    else {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    }
  };
  requestAnimationFrame(step);
};
