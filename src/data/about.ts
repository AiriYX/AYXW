/**
 * Editable content for the About page.
 * Change text here — the components in src/components/about only handle layout.
 */
import {
  BrainCircuit,
  Coffee,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Pencil,
  type LucideIcon,
} from "lucide-react";

export type SocialLink = {
  name: string;
  icon: LucideIcon;
  url: string;
  username: string;
  /** Tailwind hover colour for the icon */
  color: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: "Email",
    icon: Mail,
    url: "mailto:airiweng@gmail.com",
    username: "airiweng@gmail.com",
    color: "hover:text-blue-500",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/airiYX",
    username: "@airiYX",
    color: "hover:text-gray-600",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/airi-weng/",
    username: "/in/airi-weng",
    color: "hover:text-blue-600",
  },
];

export const interests: {
  icon: LucideIcon;
  /** pixel icon name in /public/img/px */
  px: string;
  text: string;
  sub?: string;
}[] = [
  { icon: Coffee, px: "coffee", text: "Cafe hopping" },
  { icon: Pencil, px: "book", text: "Poetry" },
  { icon: BrainCircuit, px: "chip", text: "Solving hardware puzzles" },
  {
    icon: GraduationCap,
    px: "speech",
    text: "Languages",
    sub: "中文 · Español · Русский",
  },
];

/** icon: a lucide icon, or a pixel icon name (see /public/img/px) */
export const quickFacts: { icon: LucideIcon | string; text: string }[] = [
  { icon: GraduationCap, text: "CCNY '27 · CS + Business" },
  { icon: "pin", text: "New York, NY" },
  { icon: "briefcase", text: "Open to BA / PM / TPM roles" },
];

export const contactDetails = {
  opportunities:
    "Graduating Spring 2027 and looking for Business Analyst, Product and Technical Program Manager roles at tech-forward companies.",
  location: "NYC Metropolitan Area, NY",
  locationNote: "Open to remote opportunities",
};

/** Short answers for the chat on the About page. */
export const journey: string[] = [
  "A CS + Business senior at CCNY. I build tools that work well and feel fun to use.",
  "Cafe hopping, writing poetry, and swapping ideas with friends over coffee.",
  "Automation, AI tools and smart cities. Right now I'm crunching NYC taxi data on GPUs for my capstone.",
];

/** Questions a visitor "asks" before each journey paragraph in the chat. */
export const storyPrompts = [
  "so… who are you? 👀",
  "what do you do when you're not coding?",
  "what are you into right now?",
];

export const intro = {
  name: "Airi",
  line: "CS student in NYC who loves turning messy problems into simple, playful tools.",
};

/** "Coffee chat" menu on the About page: what we could talk about. */
export const coffeeMenu = [
  { drink: "Espresso", note: "15-min hello", desc: "quick intro, no agenda" },
  {
    drink: "Latte",
    note: "BA · TPM careers",
    desc: "roles, teams, career paths",
  },
  {
    drink: "Matcha",
    note: "product & management",
    desc: "roadmaps, stakeholders, prioritizing what ships",
  },
  {
    drink: "Cold brew",
    note: "build together",
    desc: "projects, collabs, ideas",
  },
];
