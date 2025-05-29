import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const BuildLab = () => {
  const { theme } = useTheme();

  const projects = [
    {
      title: "Tidyup",
      description:
        "A python command-line based file sorting system for people to tidy up their file management.",
      tech: ["Python", "CLI", "File System"],
      status: "💡 Experiment",
      accent: "rose",
      link: "https://github.com/AiriYX/auto-file-organizer",
    },
    {
      title: "Rfind",
      description:
        "Upcoming Recycling center finder to help communities locate and connect with local recycling facilities.",
      tech: ["React", "Maps API", "TypeScript"],
      status: "🔍 Finder",
      accent: "fuchsia",
      link: "/", //need to put in link for rfind
    },
    {
      title: "PaintOn",
      description:
        "Digital art collaboration platform where artists can create, share, and collaborate on creative projects.",
      tech: ["Node.js", "Express", "Canvas API"],
      status: "🛠 Ongoing",
      accent: "teal",
      link: "https://github.com/AiriYX/PaintOn",
    },
  ];

  return (
    <section
      id="build-lab"
      className={`pt-4 pb-10 px-6 relative ${theme === "dark" ? "bg-neutral-900/50" : "bg-neutral-50/50"} backdrop-blur-sm`}
    >
      {/* Connecting arrow from hero */}
      <div className="flex justify-center mb-6">
        <div className="animate-pulse">
          <ChevronDown
            size={32}
            className={`${theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"} opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110`}
          />
        </div>
      </div>

      {/* Centered content wrapper */}
      <div className="max-w-screen-lg mx-auto">
        {/* Header section with reduced vertical padding */}
        <div className="text-center mb-12 relative">
          {/* Soft gradient glow behind header */}
          <div
            className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${
              theme === "dark" ? "bg-fuchsia-400" : "bg-fuchsia-300"
            } w-96 h-32 mx-auto -top-8`}
          ></div>

          <div className="relative z-10">
            <h2
              className={`font-lacquer text-5xl md:text-6xl font-bold leading-tight mb-4 ${theme === "dark" ? "text-neutral-100" : "text-neutral-900"}`}
            >
              <span
                className={`${theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"}`}
              >
                Build
              </span>{" "}
              Lab
            </h2>

            {/* Fun subtitle */}
            <p
              className={`font-playwrite text-lg italic mb-6 ${theme === "dark" ? "text-fuchsia-300/80" : "text-fuchsia-500/80"}`}
            >
              Where I experiment, explore, and make cool things.
            </p>
          </div>

          <div
            className={`max-w-2xl mx-auto mb-4 ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
          >
            <p className="text-lg md:text-xl leading-relaxed font-light">
              I treat code like a sketchbook — some of these projects are
              polished, others are experiments that helped me work through
              ideas. They all reflect the questions I was asking at the time,
              and how I tried to answer them.
            </p>
          </div>

          <p
            className={`text-sm italic font-light mt-3 ${theme === "dark" ? "text-neutral-500" : "text-neutral-500"}`}
          >
            Nothing's final — just better than yesterday.
          </p>
        </div>

        {/* Clean 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start mb-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group cursor-pointer p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                theme === "dark"
                  ? "bg-neutral-800/50 border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/80"
                  : "bg-white/70 border-neutral-200 hover:border-neutral-300 hover:bg-white/90"
              }`}
            >
              {/* Status badge at top left */}
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    theme === "dark"
                      ? "bg-fuchsia-400/20 text-fuchsia-300"
                      : "bg-fuchsia-100 text-fuchsia-600"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  {project.status}
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <ExternalLink
                    size={16}
                    className={`${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}
                  />
                </a>
              </div>

              {/* Project title with consistent font weight */}
              <h3
                className={`font-semibold text-lg mb-2 transition-colors duration-300 ${theme === "dark" ? "text-neutral-100 group-hover:text-fuchsia-300" : "text-neutral-900 group-hover:text-fuchsia-600"}`}
              >
                {project.title}
              </h3>

              {/* Muted description */}
              <p
                className={`text-sm leading-relaxed mb-4 space-y-2 ${theme === "dark" ? "text-neutral-500" : "text-neutral-500"}`}
              >
                {project.description}
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`inline-block px-3 py-1 text-xs rounded-full transition-all duration-300 group-hover:scale-105 ${
                      theme === "dark"
                        ? "bg-neutral-700 text-neutral-300 group-hover:bg-neutral-600"
                        : "bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action footer */}
        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className={`group inline-flex items-center space-x-2 px-8 py-4 rounded-full font-medium transition-all duration-500 hover:scale-105 hover:shadow-xl ${
              theme === "dark"
                ? "text-fuchsia-400 border border-fuchsia-400/30 hover:bg-fuchsia-400/10 hover:shadow-fuchsia-400/20"
                : "text-fuchsia-600 border border-fuchsia-200 hover:bg-fuchsia-50 hover:shadow-fuchsia-200/40"
            }`}
          >
            <span>Explore All Projects</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-2 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BuildLab;
