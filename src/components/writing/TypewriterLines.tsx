import { useEffect, useState } from "react";

type Props = { lines: string[]; className?: string };

/** Types a line, pauses, erases it, moves to the next one. */
const TypewriterLines = ({ lines, className = "" }: Props) => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (lines.length === 0) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setText(lines[0]);
      return;
    }
    const full = lines[i % lines.length];
    let delay = deleting ? 22 : 55;
    if (!deleting && text === full) delay = 2200;
    if (deleting && text === "") delay = 350;

    const t = window.setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((n) => n + 1);
      } else {
        setText(
          deleting
            ? full.slice(0, text.length - 1)
            : full.slice(0, text.length + 1),
        );
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, i, lines]);

  return <span className={`term-caret ${className}`}>{text}</span>;
};

export default TypewriterLines;
