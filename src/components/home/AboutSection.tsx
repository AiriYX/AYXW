import React from "react";
import {
  GraduationCap,
  Code,
  TrendingUp,
  Building2,
  Award,
  Users,
  Mail,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const { theme } = useTheme();

  const technicalSkills = [
    { name: "Python", category: "Languages" },
    { name: "C++", category: "Languages" },
    { name: "Java", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "TypeScript", category: "Languages" },
    { name: "React", category: "Frameworks" },
    { name: "HTML/CSS", category: "Frontend" },
    { name: "Tailwind", category: "Frontend" },
    { name: "Git", category: "Tools" },
    { name: "Bash", category: "Tools" },
    { name: "SQL", category: "Database" },
  ];

  const experiences = [
    {
      icon: Building2,
      org: "Paul, Weiss",
      description:
        "Led AI rollout and structured workflows to support innovation in legal ops.",
      type: "work",
    },
    {
      icon: GraduationCap,
      org: "CCNY",
      description:
        "CS undergrad with focus on automation + website design | 3.1 GPA",
      type: "education",
    },
    {
      icon: Users,
      org: "Tech Leadership",
      description: "Taught 20+ students, empowering them to break into tech",
      type: "work",
    },
    {
      icon: Award,
      org: "Honors and Awards",
      description: ["Deans Honors list", " | ", "TK Steel Scholarship"],
      type: "Honors",
    },
    {
      icon: Code,
      org: "AI Engineering Certificate",
      description: "Advanced AI/ML specialization (Sept 2025)",
      type: "upcoming",
      isUpcoming: true,
    },
  ];

  const communities = [
    {
      name: "Open Source (coming soon)",
      role: "Active Maintainer",
      color: "emerald",
    },
    { name: "SEO Scholars", role: "Instructor + Scholar", color: "purple" },
    { name: "CODEPATH", role: "Member", color: "blue" },
    { name: "Rewriting The Code", role: "Member", color: "blue" },
    { name: "Girls Who Code", role: "Member", color: "blue" },
  ];

  const getCommunityColor = (color: string) => {
    const colors = {
      emerald: theme === "dark" ? "text-emerald-400" : "text-emerald-600",
      blue: theme === "dark" ? "text-blue-400" : "text-blue-600",
      purple: theme === "dark" ? "text-purple-400" : "text-purple-600",
      rose: theme === "dark" ? "text-rose-400" : "text-rose-600",
      amber: theme === "dark" ? "text-amber-400" : "text-amber-600",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section
      className={`relative py-20 px-6 overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-neutral-900/50 via-neutral-800/30 to-neutral-900/80"
          : "bg-gradient-to-br from-neutral-50/80 via-white/60 to-neutral-100/50"
      }`}
    >
      {/* Subtle background pattern */}
      <div
        className={`absolute inset-0 opacity-30 ${
          theme === "dark" ? "bg-neutral-800/20" : "bg-neutral-100/40"
        } bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]`}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Elegant quote as header */}
        <div className="text-center mb-20">
          <blockquote
            className={`text-2xl lg:text-3xl font-light italic leading-relaxed tracking-wide max-w-4xl mx-auto transition-colors duration-300 ${
              theme === "dark" ? "text-neutral-100" : "text-neutral-700"
            }`}
          >
            "When you drop a book, you don't walk away. You pick it up and keep
            reading. True resilience means never leaving your story unfinished,
            no matter how many times you have to pick it up."
          </blockquote>

          {/* Decorative accent line */}
          <div
            className={`w-24 h-1 rounded-full mx-auto mt-8 ${
              theme === "dark"
                ? "bg-gradient-to-r from-fuchsia-400 to-rose-400"
                : "bg-gradient-to-r from-rose-500 to-fuchsia-500"
            }`}
          ></div>
        </div>

        {/* Technical Skills Strip */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2
              className={`font-playwrite text-2xl lg:text-3xl mb-4 ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-800"
              }`}
            >
              Technical <span className="text-fuchsia-500">Skills</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {technicalSkills.map((skill, index) => (
              <span
                key={index}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-default ${
                  theme === "dark"
                    ? "bg-fuchsia-400/20 text-fuchsia-300 border border-fuchsia-400/30 hover:bg-fuchsia-400/30 hover:shadow-lg hover:shadow-fuchsia-500/20"
                    : "bg-fuchsia-100/70 text-fuchsia-600 border border-fuchsia-200/50 hover:bg-fuchsia-200/70 hover:shadow-lg hover:shadow-fuchsia-200/40"
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Experiences & Education Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2
                className={`font-playwrite text-2xl lg:text-3xl mb-4 ${
                  theme === "dark" ? "text-neutral-100" : "text-neutral-800"
                } relative z-10`}
              >
                <span className="text-fuchsia-500">Experiences</span> &
                Education
              </h2>
              {/* Subtle glow effect */}
              <div
                className={`absolute inset-0 blur-lg opacity-20 ${
                  theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-500"
                }`}
              >
                <span className="text-fuchsia-500">Experiences</span> &
                Education
              </div>
              {/* Soft underline */}
              <div
                className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent"
                    : "bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent"
                }`}
              ></div>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  theme === "dark"
                    ? "hover:bg-neutral-800/40"
                    : "hover:bg-white/60"
                } group`}
              >
                <exp.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-500"
                  }`}
                />

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-semibold ${
                        theme === "dark"
                          ? "text-neutral-100"
                          : "text-neutral-800"
                      }`}
                    >
                      {exp.org}
                    </span>
                    {exp.isUpcoming && <span className="text-xs">👈🏻</span>}
                    <span className="text-sm text-neutral-500">—</span>
                    <span
                      className={`text-sm ${
                        theme === "dark"
                          ? "text-neutral-400"
                          : "text-neutral-600"
                      }`}
                    >
                      {exp.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Communities & Initiatives */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3
              className={`font-playwrite text-xl lg:text-2xl mb-4 ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-800"
              }`}
            >
              Communities &{" "}
              <span className="text-fuchsia-500">Initiatives</span>
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {communities.map((community, index) => (
              <div
                key={index}
                className={`px-4 py-2.5 rounded-full text-sm transition-all duration-300 hover:scale-105 cursor-default ${
                  theme === "dark"
                    ? "bg-neutral-800/50 hover:bg-neutral-800/70"
                    : "bg-white/60 hover:bg-white/80"
                } border ${
                  theme === "dark"
                    ? "border-neutral-700/50"
                    : "border-neutral-200/50"
                }`}
              >
                <span
                  className={`font-medium ${
                    theme === "dark" ? "text-neutral-200" : "text-neutral-700"
                  }`}
                >
                  {community.name}
                </span>
                <span className="text-neutral-500 mx-2">•</span>
                <span
                  className={`text-sm ${getCommunityColor(community.color)}`}
                >
                  {community.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Access */}
        <div className="text-center mt-16">
          <div
            className={`inline-flex flex-col items-center justify-center px-8 py-6 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-neutral-900/70 via-neutral-800/60 to-neutral-900/70 border border-neutral-700/40"
                : "bg-gradient-to-r from-white/80 via-neutral-100/60 to-white/80 border border-neutral-200/40"
            }`}
          >
            <h3
              className={`text-lg font-medium ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-800"
              }`}
            >
              Want to see my full resume?
            </h3>
            <div
              className={`h-0.5 w-16 my-4 rounded-full ${
                theme === "dark"
                  ? "bg-gradient-to-r from-fuchsia-400/50 via-pink-500/50 to-rose-400/50"
                  : "bg-gradient-to-r from-rose-400/50 via-pink-400/50 to-fuchsia-400/50"
              }`}
            ></div>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              Email me with the subject line: "Resume Request – [Your Name],
              [Company Name]"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
