/**
 * Single source of truth for projects (content from the master resume).
 * Used by: Projects page (café street + 3×3 grid), the project modal, each
 * project's own page (/projects/<slug>) and the home "Fresh from the lab" stack.
 * Leave githubUrl / liveUrl empty ("") to hide that button.
 */

export type ProjectStatus = "In Progress" | "Finished";

export type Project = {
  title: string;
  /** emoji fallback (alt text) */
  emoji: string;
  /** pixel icon name in /public/img/px */
  icon: string;
  /** One-line summary shown on cards */
  summary: string;
  /** Full story shown in the details modal */
  description: string;
  role?: string;
  /** Bullet points on the project's own page (what you did / results) */
  highlights?: string[];
  /** People who worked on it, including you (1 = solo). Leave out if unsure. */
  contributors?: number;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  /** YYYY-MM — month the project started / shipped */
  date: string;
  status: ProjectStatus;
  gradient: string;
  /** Café / accent colour */
  tint: number;
  /** Show on the home page */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Urban Mobility (Capstone)",
    emoji: "🚕",
    icon: "taxi",
    summary:
      "GPU-accelerated analysis of NYC taxi trip data to see how mobility tech changed traffic.",
    description:
      "My senior capstone. We use GPU acceleration to process NYC Taxi & Limousine Commission (TLC) trip records and build a case study of how traffic trends shifted after urban mobility technology arrived in New York City. I'm the front-end engineer on the team.",
    role: "Front-end engineer",
    highlights: [
      "Processes NYC TLC taxi trip records with GPU acceleration",
      "Case study of how traffic trends shifted after urban mobility tech arrived in NYC",
      "I'm the team's front-end engineer",
    ],
    tech: ["Python", "CUDA", "GPU"],
    githubUrl: "",
    liveUrl: "",
    date: "2026-09",
    status: "In Progress",
    gradient: "from-indigo-500 to-violet-500",
    tint: 0xa5b4fc,
  },
  {
    title: "Ask Brett",
    emoji: "🤖",
    icon: "robot",
    summary:
      "AI-powered project management tool: 48% fewer AI tokens and 74% faster responses.",
    description:
      "Built during my World Wide Technology internship with a 6-person capstone team. Ask Brett is an AI project-management assistant; we cut AI token usage by 48% and response time by 74%.",
    contributors: 6,
    highlights: [
      "Cut AI token usage by 48%",
      "Cut response time by 74%",
      "Built with a 6-person capstone team during my World Wide Technology internship",
    ],
    tech: ["Vue.js", "Node.js", "LLM APIs"],
    githubUrl: "",
    liveUrl: "",
    date: "2026-07",
    status: "Finished",
    gradient: "from-fuchsia-500 to-indigo-500",
    tint: 0xf0abfc,
    featured: true,
  },
  {
    title: "Arity",
    emoji: "📅",
    icon: "calendar",
    summary:
      "Study planner for accountability study groups, with Google Calendar and a sleep tracker.",
    description:
      "A planner web app built by a 5-person team. I designed the Figma prototype (six screens, reusable NavBar and Button components) and built the study group feature, integrating Google Calendar and a sunrise/sunset API to coordinate schedules, plus a sleep tracker.",
    role: "Designer + study-group feature",
    contributors: 5,
    highlights: [
      "Designed the Figma prototype: six screens with reusable NavBar and Button components",
      "Built the study group feature with Google Calendar and a sunrise/sunset API",
      "Added a sleep tracker",
    ],
    tech: ["Next.js", "TypeScript", "CSS", "Figma"],
    githubUrl: "",
    liveUrl: "",
    date: "2026-09",
    status: "In Progress",
    gradient: "from-violet-500 to-indigo-400",
    tint: 0xc4b5fd,
  },
  {
    title: "ETF Analysis",
    emoji: "📈",
    icon: "chart",
    summary:
      "Data science study on whether the VIX can guide when beginner investors contribute.",
    description:
      "A team data science project comparing SPY and QQQ for beginner investors, analyzing whether the VIX (the market's \"fear index\") can guide contribution decisions. I lead the team and assigned roles based on each teammate's skills and interests.",
    role: "Team lead",
    contributors: 6,
    highlights: [
      "Compares SPY and QQQ for beginner investors",
      "Tests whether the VIX can guide when to contribute",
      "Led the team and assigned roles by each teammate's skills and interests",
    ],
    tech: ["Python", "Pandas", "Data Science"],
    githubUrl: "https://github.com/AiriYX/etf_analysis",
    liveUrl: "",
    date: "2026-10",
    status: "In Progress",
    gradient: "from-indigo-400 to-blue-500",
    tint: 0x818cf8,
  },
  {
    title: "SmoothScribe",
    emoji: "✍️",
    icon: "pen",
    summary:
      "Canvas app that smooths shaky handwriting in real time for people with hand tremors.",
    description:
      "A React canvas app that smooths handwritten strokes in real time with spline interpolation and a custom tremor-reduction pipeline, improving legibility for users with hand tremors. Built for Numerical Methods, comparing linear, Lagrange polynomial and cubic spline interpolation with the Pointer Events API.",
    contributors: 1,
    highlights: [
      "Smooths handwritten strokes in real time for people with hand tremors",
      "Compares linear, Lagrange polynomial and cubic spline interpolation",
      "Custom tremor-reduction pipeline on the Pointer Events API",
    ],
    tech: ["React", "Canvas", "Gemini Flash API", "Claude"],
    githubUrl: "https://github.com/AiriYX/Smoothscribe_final",
    liveUrl: "https://smooth-scribe.vercel.app",
    date: "2026-05",
    status: "Finished",
    gradient: "from-pink-500 to-fuchsia-500",
    tint: 0xf9a8d4,
    featured: true,
  },
  {
    title: "FixIt",
    emoji: "🛠️",
    icon: "wrench",
    summary:
      "SaaS that replaces manual maintenance workflows for commercial property management.",
    description:
      "FixIt reengineers manual maintenance workflows for commercial property management. I mapped stakeholder journeys for tenants, technicians and facility managers, modeled the data architecture (ER diagrams, SQL DDL, normalization through 3NF), and projected $2.6M in annual revenue potential through tiered pricing and vendor commissions.",
    contributors: 6,
    highlights: [
      "Mapped stakeholder journeys for tenants, technicians and facility managers",
      "Modeled the data architecture: ER diagrams, SQL DDL, normalized to 3NF",
      "Projected $2.6M in annual revenue potential via tiered pricing and vendor commissions",
    ],
    tech: ["Java", "MySQL", "React"],
    githubUrl: "",
    liveUrl: "",
    date: "2026-03",
    status: "Finished",
    gradient: "from-fuchsia-500 to-pink-400",
    tint: 0xf472b6,
    featured: true,
  },
  {
    title: "TidyUp",
    emoji: "🗂️",
    icon: "folder",
    summary:
      "AI-powered Python tool that sorts messy folders into a clean folder hierarchy.",
    description:
      "An end-to-end automation tool that uses Claude, regex and OS libraries to categorize files and restructure them into hierarchical folders, cutting manual cleanup in real-world use.",
    contributors: 1,
    highlights: [
      "Uses Claude, regex and OS libraries to categorize files",
      "Restructures messy folders into a clean hierarchy",
      "Cut manual cleanup in real-world use",
    ],
    tech: ["Python", "Claude", "Regex"],
    githubUrl: "https://github.com/AiriYX/auto-file-organizer",
    liveUrl: "",
    date: "2026-01",
    status: "Finished",
    gradient: "from-indigo-500 to-fuchsia-500",
    tint: 0xa78bfa,
  },
  {
    title: "tailor.py",
    emoji: "✂️",
    icon: "scissors",
    summary:
      "Tailors a resume to a job description and returns edits as Word tracked changes.",
    description:
      "A Python automation tool that reads a job description, tailors my resume to it, and outputs the suggestions as Word tracked changes so I can accept or reject each edit.",
    contributors: 1,
    highlights: [
      "Reads a job description and tailors my resume to it",
      "Returns every suggestion as a Word tracked change to accept or reject",
    ],
    tech: ["Python", "Automation", "Word"],
    githubUrl: "",
    liveUrl: "",
    date: "2026-08",
    status: "Finished",
    gradient: "from-violet-500 to-pink-500",
    tint: 0xd8b4fe,
  },
];

/** "solo" / "6 people" (or "team" when the size isn't set). */
export const teamLabel = (p: Project, long = false) => {
  if (p.contributors === undefined) return long ? "team project" : "team";
  if (p.contributors === 1) return long ? "solo project" : "solo";
  return long ? `${p.contributors} contributors` : `${p.contributors} people`;
};

export const formatProjectDate = (
  date: string,
  month: "short" | "long" = "short",
) => {
  const [y, m] = date.split("-").map(Number);
  return new Date(y, (m || 1) - 1, 1).toLocaleDateString(undefined, {
    month,
    year: "numeric",
  });
};

/** URL-friendly id, e.g. "Urban Mobility (Capstone)" → "urban-mobility-capstone". */
export const projectSlug = (p: Project) =>
  p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The project's own page on this site. */
export const projectPath = (p: Project) => `/projects/${projectSlug(p)}`;

export const findProjectBySlug = (slug?: string) =>
  projects.find((p) => projectSlug(p) === slug);
