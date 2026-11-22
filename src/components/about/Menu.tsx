import type { ReactNode } from "react";
import PixelIcon from "@/components/theme/PixelIcon";

/** The whole About page is printed on this café menu card. */
export const MenuSheet = ({
  isDark,
  children,
}: {
  isDark: boolean;
  children: ReactNode;
}) => (
  <div
    className={`menu-sheet relative rounded-[28px] px-5 py-10 sm:px-10 md:px-16 md:py-14 ${
      isDark ? "menu-night" : "menu-day"
    }`}
  >
    <header className="mb-10 text-center">
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.34em] ${
          isDark ? "text-pink-300/70" : "text-pink-700/70"
        }`}
      >
        open daily · new york · grab a seat
      </p>
      <p
        className={`font-playwrite mt-2 pb-2 text-4xl leading-[1.6] md:text-5xl ${
          isDark ? "neon-tube-night" : "neon-tube-day"
        }`}
      >
        A-Menu
      </p>
      <div
        className={`mx-auto mt-2 flex max-w-xs items-center gap-3 ${
          isDark ? "text-pink-300/50" : "text-pink-700/50"
        }`}
      >
        <span className="h-px flex-1 bg-current" />
        <PixelIcon name="coffee" size={34} />
        <span className="h-px flex-1 bg-current" />
      </div>
    </header>
    <div className="space-y-16">{children}</div>
    <p
      className={`mt-14 text-center text-[10px] font-semibold uppercase tracking-[0.3em] ${
        isDark ? "text-neutral-500" : "text-slate-400"
      }`}
    >
      tips accepted as LinkedIn connects ♡
    </p>
  </div>
);

/** A menu category: "— ICON TITLE —" with a handwritten note under it. */
export const MenuSection = ({
  isDark,
  icon,
  title,
  note,
  children,
}: {
  isDark: boolean;
  icon: string;
  title: string;
  note?: string;
  children: ReactNode;
}) => (
  <section aria-label={title}>
    <div className="mb-6 text-center">
      <div
        className={`flex items-center gap-3 ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        <span
          className={`h-px flex-1 ${isDark ? "bg-pink-400/30" : "bg-pink-900/20"}`}
        />
        <PixelIcon name={icon} size={24} />
        <h2 className="text-sm font-extrabold uppercase tracking-[0.3em]">
          {title}
        </h2>
        <PixelIcon name={icon} size={24} />
        <span
          className={`h-px flex-1 ${isDark ? "bg-pink-400/30" : "bg-pink-900/20"}`}
        />
      </div>
      {note && (
        <p
          className={`font-playwrite mt-1 text-sm ${
            isDark ? "text-pink-300/80" : "text-pink-700/80"
          }`}
        >
          {note}
        </p>
      )}
    </div>
    {children}
  </section>
);

/** One item line: name ........ price (with optional description). */
export const MenuItem = ({
  isDark,
  icon,
  name,
  price,
  desc,
}: {
  isDark: boolean;
  icon?: string;
  name: string;
  price: string;
  desc?: string;
}) => (
  <li className="flex gap-3">
    {icon && <PixelIcon name={icon} size={36} className="mt-0.5 shrink-0" />}
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline gap-2">
        <span
          className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
        >
          {name}
        </span>
        <span
          className={`flex-1 border-b-2 border-dotted ${
            isDark ? "border-white/20" : "border-slate-900/20"
          }`}
        />
        <span
          className={`shrink-0 text-xs font-semibold ${
            isDark ? "text-pink-300" : "text-pink-700"
          }`}
        >
          {price}
        </span>
      </div>
      {desc && (
        <p
          className={`mt-0.5 text-xs leading-5 ${
            isDark ? "text-neutral-400" : "text-slate-600"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  </li>
);
