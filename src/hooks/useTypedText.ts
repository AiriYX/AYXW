import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Types `text` out one character at a time, once per mount (so on every page
 * refresh). Typing waits until `enabled` is true. Returns the part typed so far.
 */
export const useTypedText = (
  text: string,
  { startDelay = 450, perChar = 95, enabled = true } = {},
) => {
  const [n, setN] = useState(prefersReducedMotion() ? text.length : 0);
  useEffect(() => {
    if (!enabled || n >= text.length) return;
    const t = window.setTimeout(
      () => setN((x) => x + 1),
      n === 0 ? startDelay : perChar,
    );
    return () => window.clearTimeout(t);
  }, [n, text.length, startDelay, perChar, enabled]);
  return text.slice(0, n);
};
