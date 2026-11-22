import type { ProjectStatus } from "@/data/projects";

/** LED colour + text colour for a project status, per theme. */
export const getStatusStyle = (status: ProjectStatus, isDark: boolean) => {
  switch (status) {
    case "In Progress":
      return {
        text: isDark ? "text-indigo-300" : "text-indigo-600",
        pulse: true,
      };
    case "Finished":
    default:
      return {
        text: isDark ? "text-fuchsia-300" : "text-fuchsia-600",
        pulse: false,
      };
  }
};
