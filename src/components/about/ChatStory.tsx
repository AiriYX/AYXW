import { useEffect, useState } from "react";
import meMylo from "@/assets/img/me_mylo.jpeg";
import { journey, storyPrompts } from "@/data/about";
import { useInView } from "@/hooks/useInView";

type Props = { isDark: boolean };

/** One question + answer pair that "types" in when scrolled into view. */
const Exchange = ({
  question,
  answer,
  isDark,
}: {
  question: string;
  answer: string;
  isDark: boolean;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -20% 0px");
  // show "typing…" for a beat after the question pops in, then the answer
  const [typed, setTyped] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const t = window.setTimeout(() => setTyped(true), reduced ? 0 : 1300);
    return () => window.clearTimeout(t);
  }, [inView]);

  return (
    <div ref={ref} className="space-y-3">
      {/* visitor */}
      <div className={`chat-pop flex justify-end ${inView ? "is-in" : ""}`}>
        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-fuchsia-500 to-violet-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-8px_rgba(192,38,211,0.6)]">
          {question}
        </p>
      </div>

      {/* me: typing dots, then the answer */}
      <div
        className={`chat-pop flex items-end gap-2.5 ${inView ? "is-in" : ""}`}
        style={{ animationDelay: "450ms" }}
      >
        <img
          src={meMylo}
          alt=""
          className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-fuchsia-400/60"
        />
        <div
          className={`relative max-w-[85%] rounded-2xl rounded-bl-md border px-4 py-3 text-sm leading-7 ${
            isDark
              ? "border-white/10 bg-[#141026]/90 text-neutral-200"
              : "border-white bg-white/90 text-slate-700 shadow-[0_12px_30px_-18px_rgba(79,70,229,0.5)]"
          }`}
        >
          {typed ? (
            <p className="chat-answer">{answer}</p>
          ) : (
            <span className="typing-dots" aria-label="typing">
              <i />
              <i />
              <i />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/** My journey told as a little chat with a curious visitor. */
const ChatStory = ({ isDark }: Props) => (
  <section>
    <div
      className={`space-y-6 rounded-2xl border p-4 sm:p-5 ${
        isDark
          ? "border-white/10 bg-black/20"
          : "border-amber-900/10 bg-white/50"
      }`}
    >
      {journey.map((answer, i) => (
        <Exchange
          key={i}
          question={storyPrompts[i] ?? "tell me more!"}
          answer={answer}
          isDark={isDark}
        />
      ))}
    </div>
  </section>
);

export default ChatStory;
