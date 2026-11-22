import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { contactEmail } from "./home";

export type NavLink = {
  path: string;
  label: string;
  /** Other paths that should highlight this link (e.g. writing lives under About). */
  alsoActiveOn?: string[];
};

/** Pages shown in the nav bar and the footer, in order. */
export const NAV_LINKS: NavLink[] = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  // writing is personal, not career, so it's reached from the About page
  { path: "/about", label: "About", alsoActiveOn: ["/writing"] },
];

/** Initials the nav logo types out on every page load. */
export const NAV_LOGO_TEXT = "AW";

/** Full name the footer wordmark types out (the "." splits it into words). */
export const FOOTER_NAME = "Airi.Weng";

export type SocialLink = { href: string; label: string; icon: LucideIcon };

/** Round icon links used in the footer. */
export const SOCIAL_LINKS: SocialLink[] = [
  { href: `mailto:${contactEmail}`, label: "Email", icon: Mail },
  { href: "https://github.com/airiYX", label: "GitHub", icon: Github },
  {
    href: "https://linkedin.com/in/airi-weng/",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

/** Smoothly scrolls back to the top (used after clicking a nav/footer link). */
export const scrollToTop = (delay = 100) =>
  window.setTimeout(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    delay,
  );
