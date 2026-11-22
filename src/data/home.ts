/**
 * Editable content for the landing page (below the hero).
 * Source: master resume.
 */
import {
  Award,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react";

export const skills = [
  "Python",
  "SQL",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Java",
  "C++",
  "Tailwind",
  "Docker",
  "Figma",
  "LLM APIs",
  "User Stories",
  "UAT",
];

export type Experience = {
  icon: LucideIcon;
  tag: "work" | "edu" | "lead" | "award" | "cert";
  org: string;
  role: string;
  when: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    icon: Briefcase,
    tag: "work",
    org: "World Wide Technology",
    role: "Business Analyst Intern",
    when: "May–Aug 2026",
    description:
      "user_stories: 30+ · qa_tested: 8 apps · uat_led: 3 apps · ship(ask_brett) → tokens −48%, latency −74%",
  },
  {
    icon: Briefcase,
    tag: "work",
    org: "Paul, Weiss",
    role: "Informational Systems Intern",
    when: "Jan 2025",
    description:
      "audit(copilot_adoption) · role: co-lead, team of 4 · fixes_proposed: 51% of inefficiencies · report → stakeholders",
  },
  {
    icon: Users,
    tag: "lead",
    org: "SEO Scholars",
    role: "College Advising Intern",
    when: "Dec 2023–Feb 2024",
    description:
      "workshops: 100+ scholars · advising: 15+ seniors, 1:1",
  },
  {
    icon: Users,
    tag: "lead",
    org: "Giant Machines × Deloitte",
    role: "Teaching Assistant, Intro Web Design",
    when: "Aug 2022",
    description:
      "teach(html, css, js) · students: 28 · mode: demos + labs + 1:1 debugging",
  },
  {
    icon: GraduationCap,
    tag: "edu",
    org: "City College of New York",
    role: "B.S. Computer Science, Minor in Business Management",
    when: "Spring 2027",
    description:
      "GPA 3.2 · Database Systems, Software Engineering, Data Science, Senior Design (GPU Acceleration)",
  },
  {
    icon: Award,
    tag: "award",
    org: "Honors",
    role: "Dean's & Presidential Honor Lists",
    when: "2022–2024",
    description:
      "Dean's Honor List (2022–2024), Presidential Honor List (2023), Theodore K. Steele Memorial Scholarship (2022)",
  },
  {
    icon: BadgeCheck,
    tag: "cert",
    org: "Certifications",
    role: "WWT · IBM · Google Cloud",
    when: "2025–now",
    description:
      "AI & Network Engineering (WWT, Sept 2025), IBM SQL (2026); IBM Data Analytics and Google Cloud in progress",
  },
];

export const communities = [
  { name: "SEO Scholars", role: "Scholar" },
  { name: "Girls Who Code", role: "Member" },
  { name: "Rewriting the Code", role: "Member" },
  { name: "CodePath", role: "Participant" },
];

export const quote =
  "When you drop a book, you don't walk away. You pick it up and keep reading. True resilience means never leaving your story unfinished, no matter how many times you have to pick it up.";

export const contactEmail = "airiweng@gmail.com";
