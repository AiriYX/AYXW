
import React, { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Calendar,
  Code,
  Palette,
  Globe,
  Wrench,
  Filter,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Projects = () => {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // All projects for the filtered list
  const allProjects = [
    {
      title: "Tidyup",
      description:
        "A python command-line based file sorting system for people to tidy up their file management.",
      tech: ["Python", "CLI", "File System", "Automation"],
      githubUrl: "https://github.com/AiriYX/auto-file-organizer",
      liveUrl: "#",
      date: "2025-01-15",
      status: "Active",
    },
    {
      title: "Spacious & Sip",
      description:
        "An upcoming community based cafe finder with social features and reviews.",
      tech: ["React", "Node.js", "Maps API", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
      date: "2025-01-10",
      status: "Coming Soon",
    },
    {
      title: "Rfind",
      description:
        "Recycling center finder to help users locate the nearest recycling facilities.",
      tech: ["React Native", "Location Services", "Environmental Data"],
      githubUrl: "#",
      liveUrl: "#",
      date: "2025-01-05",
      status: "Active",
    },
    {
      title: "PaintOn",
      description:
        "Digital art collaboration platform for real-time creative sessions.",
      tech: ["Canvas API", "WebSockets", "Real-time Collaboration"],
      githubUrl: "https://github.com/AiriYX/PaintOn",
      liveUrl: "#",
      date: "2024-12-20",
      status: "Coming Soon",
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio showcasing projects and technical skills.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Responsive Design"],
      githubUrl: "#",
      liveUrl: "#",
      date: "2024-12-15",
      status: "Finished",
    },
  ];

  // Recent projects for the scrollable section
  const recentProjects = allProjects
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((project) => ({
      ...project,
      icon: <Code className="w-6 h-6 md:w-8 md:h-8" />,
    }));

  const filters = ["All", "Finished", "Active", "Coming Soon"];

  // Handle mouse enter with 10-second delay
  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowArrows(true);
    }, 10000);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowArrows(false);
  };

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  // Effect to check initial scroll position
  useEffect(() => {
    checkScrollPosition();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const sortedAndFilteredProjects = () => {
    let filtered =
      selectedFilter === "All"
        ? allProjects
        : allProjects.filter((project) => project.status === selectedFilter);

    if (sortBy === "date") {
      filtered = filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === "status") {
      const statusOrder = { Active: 1, "Coming Soon": 2, Finished: 3 };
      filtered = filtered.sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status]
      );
    }

    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Finished":
        return theme === "dark"
          ? "bg-teal-500/20 text-teal-300"
          : "bg-teal-100 text-teal-700";
      case "Active":
        return theme === "dark"
          ? "bg-fuchsia-500/20 text-fuchsia-300"
          : "bg-fuchsia-100 text-fuchsia-700";
      case "Coming Soon":
        return theme === "dark"
          ? "bg-rose-500/20 text-rose-300"
          : "bg-rose-100 text-rose-700";
      default:
        return theme === "dark"
          ? "bg-neutral-600/20 text-neutral-400"
          : "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="pt-20 min-h-screen relative overflow-hidden">
      {/* Background star decorations - responsive positioning */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-32 right-4 md:right-20 text-lg md:text-2xl animate-pulse ${
            theme === "dark" ? "text-yellow-300/40" : "text-yellow-400/30"
          }`}
          style={{ animationDuration: "2s", animationDelay: "1s" }}
        >
          ★
        </div>
        <div
          className={`absolute top-64 right-8 md:right-32 text-lg md:text-xl animate-pulse ${
            theme === "dark" ? "text-fuchsia-300/30" : "text-fuchsia-400/25"
          }`}
          style={{ animationDuration: "3s", animationDelay: "2s" }}
        >
          ✦
        </div>
        <div
          className={`absolute top-96 right-2 md:right-16 text-base md:text-lg animate-pulse ${
            theme === "dark" ? "text-teal-300/35" : "text-teal-400/30"
          }`}
          style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
        >
          ✧
        </div>
        <div
          className={`hidden md:block absolute bottom-64 right-28 text-xl animate-pulse ${
            theme === "dark" ? "text-rose-300/30" : "text-rose-400/25"
          }`}
          style={{ animationDuration: "2.8s", animationDelay: "1.5s" }}
        >
          ⭐
        </div>
        <div
          className={`hidden md:block absolute bottom-32 right-12 text-lg animate-pulse ${
            theme === "dark" ? "text-purple-300/35" : "text-purple-400/30"
          }`}
          style={{ animationDuration: "3.2s", animationDelay: "3s" }}
        >
          ✨
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
        <div className="animate-fade-in">
          {/* Header - responsive text sizes */}
          <div className="text-center md:text-left mb-12 md:mb-16">
            <h1
              className={`font-playwrite text-3xl md:text-5xl lg:text-6xl font-bold mb-4 pb-4 ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-700"
              }`}
            >
              My{" "}
              <span
                className={
                  theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"
                }
              >
                Projects
              </span>
            </h1>
            <p
              className={`text-base md:text-lg max-w-2xl font-light leading-relaxed ${
                theme === "dark" ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              Here are some of the projects I've worked on during my studies —
              each one a step in my journey of learning and creating.
            </p>
          </div>

          {/* Recent Projects - responsive grid */}
          <div className="mb-12 md:mb-16">
            <h2
              className={`font-relaxed text-xl md:text-2xl font-semibold mb-6 text-center md:text-left ${
                theme === "dark" ? "text-neutral-200" : "text-neutral-700"
              }`}
            >
              Recent Projects
            </h2>

            {/* Mobile - vertical stack, Desktop - horizontal scroll */}
            <div className="md:hidden space-y-4">
              {recentProjects.map((project, index) => (
                <div
                  key={index}
                  className={`rounded-3xl p-4 relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105 border-2 ${
                    theme === "dark"
                      ? "border-fuchsia-400/40 bg-neutral-900/30"
                      : "border-fuchsia-600/20 bg-fuchsia-50/50"
                  }`}
                >
                  {/* Background pattern */}
                  <div
                    className={`absolute inset-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "group-hover:bg-fuchsia-300 opacity-10"
                        : "bg-white group-hover:bg-fuchsia-200/40"
                    }`}
                  />

                  {/* Content */}
                  <div
                    className={`relative z-10 ${
                      theme === "dark" ? "text-pink-500" : "text-fuchsia-600"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`${theme === "dark" ? "bg-fuchsia-500/40" : "bg-fuchsia-100/60"} rounded-lg p-2`}
                      >
                        {project.icon}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${theme === "dark" ? "bg-white/20 hover:bg-white/30" : "bg-fuchsia-100/60 hover:bg-fuchsia-200"} p-1 rounded-md transition-colors`}
                        >
                          <Github
                            className={`${theme === "dark" ? "text-pink-500" : "text-fuchsia-600"} w-4 h-4`}
                          />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${theme === "dark" ? "bg-white/20 hover:bg-white/30" : "bg-fuchsia-100/60 hover:bg-fuchsia-200"} p-1 rounded-md transition-colors`}
                        >
                          <ExternalLink
                            className={`${theme === "dark" ? "text-pink-500" : "text-fuchsia-600"} w-4 h-4`}
                          />
                        </a>
                      </div>
                    </div>
                    <h3
                      className={`text-lg md:text-xl font-bold mb-2 ${theme === "dark" ? "text-fuchsia-500" : "text-fuchsia-700"}`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-sm opacity-90 mb-3 ${theme === "dark" ? "text-neutral-200" : "text-neutral-700"}`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`text-xs px-2 py-1 rounded-full ${
                            theme === "dark"
                              ? "bg-violet-400/20 text-fuchsia-500"
                              : "bg-fuchsia-100 text-fuchsia-700"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            theme === "dark"
                              ? "bg-violet-400/20 text-fuchsia-500"
                              : "bg-fuchsia-100 text-fuchsia-700"
                          }`}
                        >
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop - horizontal scroll */}
            <div className="hidden md:flex space-x-6 justify-center p-4">
              {recentProjects.map((project, index) => (
                <div
                  key={index}
                  className={`rounded-3xl p-6 w-80 min-h-[14rem] relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105 flex-shrink-0 border-2 ${
                    theme === "dark"
                      ? "border-fuchsia-400/40 bg-neutral-900/30"
                      : "border-fuchsia-600/20 bg-fuchsia-50/50"
                  }`}
                >
                  {/* Background pattern */}
                  <div
                    className={`absolute inset-0 transition-colors duration-300 ${
                      theme === "dark"
                        ? "group-hover:bg-fuchsia-300 opacity-10"
                        : "bg-white group-hover:bg-fuchsia-200/40"
                    }`}
                  />

                  <div
                    className={`relative z-10 h-full flex flex-col justify-between ${
                      theme === "dark" ? "text-pink-500" : "text-fuchsia-600"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div
                        className={`${theme === "dark" ? "bg-fuchsia-500/40" : "bg-fuchsia-100/60"} rounded-lg p-2`}
                      >
                        {project.icon}
                      </div>
                      <div className="flex gap-2 self-end">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${theme === "dark" ? "bg-white/20 hover:bg-white/30" : "bg-fuchsia-100/60 hover:bg-fuchsia-200"} p-1 rounded-md transition-colors`}
                        >
                          <Github
                            className={`${theme === "dark" ? "text-pink-500" : "text-fuchsia-600"} w-4 h-4`}
                          />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${theme === "dark" ? "bg-white/20 hover:bg-white/30" : "bg-fuchsia-100/60 hover:bg-fuchsia-200"} p-1 rounded-md transition-colors`}
                        >
                          <ExternalLink
                            className={`${theme === "dark" ? "text-pink-500" : "text-fuchsia-600"} w-4 h-4`}
                          />
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-fuchsia-500" : "text-fuchsia-700"}`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-sm opacity-90 mb-3 line-clamp-2 ${theme === "dark" ? "text-neutral-200" : "text-neutral-700"}`}
                      >
                        {project.description}
                      </p>
                      <div className="flex gap-1">
                        {project.tech.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`text-xs px-2 py-1 rounded-full ${
                              theme === "dark"
                                ? "bg-violet-400/20 text-fuchsia-500"
                                : "bg-fuchsia-100 text-fuchsia-700"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 2 && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              theme === "dark"
                                ? "bg-violet-400/20 text-fuchsia-500"
                                : "bg-fuchsia-100 text-fuchsia-700"
                            }`}
                          >
                            +{project.tech.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Pills - responsive */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div
              className={`flex flex-wrap gap-2 p-2 rounded-full ${
                theme === "dark" ? "bg-neutral-800/50" : "bg-white/50"
              } backdrop-blur-sm border ${
                theme === "dark"
                  ? "border-neutral-700/50"
                  : "border-neutral-200/50"
              }`}
            >
              {filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                    selectedFilter === filter
                      ? theme === "dark"
                        ? "bg-fuchsia-500 text-white"
                        : "bg-fuchsia-500 text-white"
                      : theme === "dark"
                        ? "text-neutral-300 hover:bg-neutral-700/50"
                        : "text-neutral-600 hover:bg-neutral-100/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* All Projects List - responsive */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2
                className={`font-relaxed text-xl md:text-2xl font-semibold text-center md:text-left ${
                  theme === "dark" ? "text-neutral-200" : "text-neutral-700"
                }`}
              >
                All Projects
              </h2>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {sortedAndFilteredProjects().length} projects
                </span>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className={`w-full md:w-48 ${
                      theme === "dark"
                        ? "bg-neutral-800/50 border-neutral-700/50"
                        : "bg-white border-neutral-200/50"
                    }`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="status">Sort by Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {sortedAndFilteredProjects().map((project, index) => (
                <div
                  key={index}
                  className={`group rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-[1.02] ${
                    theme === "dark"
                      ? "bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800"
                      : "bg-white border border-neutral-200/50 shadow-sm hover:shadow-lg"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                        <h3
                          className={`text-lg font-semibold ${
                            theme === "dark"
                              ? "text-neutral-100"
                              : "text-neutral-700"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}
                          >
                            {project.status}
                          </span>
                          <div
                            className={`flex items-center text-xs ${
                              theme === "dark"
                                ? "text-neutral-400"
                                : "text-neutral-500"
                            }`}
                          >
                            <Calendar size={12} className="mr-1" />
                            {new Date(project.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <p
                        className={`mb-3 text-sm md:text-base ${
                          theme === "dark"
                            ? "text-neutral-300"
                            : "text-neutral-600"
                        }`}
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-2 py-1 rounded-md text-xs ${
                              theme === "dark"
                                ? "bg-fuchsia-500/20 text-fuchsia-300"
                                : "bg-fuchsia-100 text-fuchsia-600"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end md:ml-4">
                      <a
                        href={project.githubUrl}
                        className={`p-2 rounded-lg transition-colors ${
                          theme === "dark"
                            ? "text-neutral-400 hover:text-fuchsia-300 hover:bg-neutral-700"
                            : "text-neutral-500 hover:text-fuchsia-600 hover:bg-neutral-50"
                        }`}
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href={project.liveUrl}
                        className={`p-2 rounded-lg transition-colors ${
                          theme === "dark"
                            ? "bg-fuchsia-500 text-white hover:bg-fuchsia-400"
                            : "bg-fuchsia-500 text-white hover:bg-fuchsia-600"
                        }`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
