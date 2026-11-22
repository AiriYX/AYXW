import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { projects } from "@/data/projects";
import CafeStreet from "@/components/projects/CafeStreet";
import NeonBackground from "@/components/theme/NeonBackground";
import ProjectsHeader from "@/components/projects/ProjectsHeader";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectModal from "@/components/projects/ProjectModal";

const filters = ["All", ...Array.from(new Set(projects.map((p) => p.status)))];

const Projects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [entered, setEntered] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  // Which café you were at, so "Back to the street" and closing a project
  // you stepped into return you to the same spot.
  const [streetIndex, setStreetIndex] = useState(0);
  const [fromStreet, setFromStreet] = useState(false);

  // /projects?grid=1 (back from a project page) skips straight to the grid;
  // /projects?open=Title skips the street and opens that project's quick look
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    if (params.get("grid")) {
      setEntered(true);
      setParams({}, { replace: true });
      return;
    }
    const open = params.get("open");
    if (open && projects.some((p) => p.title === open)) {
      setEntered(true);
      setActiveTitle(open);
      setParams({}, { replace: true });
    }
  }, [params, setParams]);

  const activeProject = projects.find((p) => p.title === activeTitle) ?? null;

  const closeModal = useCallback(() => {
    setActiveTitle(null);
    if (fromStreet) {
      setFromStreet(false);
      setEntered(false);
    }
  }, [fromStreet]);

  const backToStreet = () => {
    setEntered(false);
    window.scrollTo({ top: 0 });
  };

  // Lock page scroll during the café street intro and while the modal is open.
  useEffect(() => {
    document.body.style.overflow = !entered || activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered, activeProject]);

  // newest first; the grid dims (rather than hides) filtered-out cards
  const visibleProjects = useMemo(
    () => [...projects].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  return (
    <div
      className={`fx ${isDark ? "fx-dark" : ""} pt-20 min-h-screen relative overflow-hidden`}
    >
      <NeonBackground isDark={isDark} />

      {entered && (
        <div className="relative z-10 px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 flex justify-center">
              <button
                onClick={backToStreet}
                className={`rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md transition-colors ${
                  isDark
                    ? "border-white/10 text-neutral-400 hover:border-indigo-400/60 hover:text-indigo-300"
                    : "border-violet-200 text-neutral-500 hover:border-fuchsia-400 hover:text-fuchsia-600"
                }`}
              >
                ← back to the café street
              </button>
            </div>

            <ProjectsHeader
              isDark={isDark}
              total={projects.length}
              brewing={Math.max(0, 9 - projects.length)}
            />

            <ProjectFilters
              isDark={isDark}
              filters={filters}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />

            <ProjectGrid
              projects={visibleProjects}
              isDark={isDark}
              filter={selectedFilter}
              onOpen={setActiveTitle}
            />
          </div>
        </div>
      )}

      {!entered && (
        <CafeStreet
          isDark={isDark}
          startIndex={streetIndex}
          onComplete={(openTitle, index) => {
            setStreetIndex(index);
            setEntered(true);
            if (openTitle) {
              setFromStreet(true);
              setActiveTitle(openTitle);
            }
          }}
        />
      )}

      {activeProject && (
        <ProjectModal
          project={activeProject}
          isDark={isDark}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Projects;
