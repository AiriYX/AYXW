type Props = {
  isDark: boolean;
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
};

/** Segmented All / Finished / In Progress control. */
const ProjectFilters = ({ isDark, filters, selected, onSelect }: Props) => (
  <div
    className="mb-10 flex justify-center motion-safe:animate-fade-in motion-reduce:animate-none"
    style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
  >
    <div
      role="tablist"
      aria-label="Filter projects"
      className={`inline-flex items-center gap-1 rounded-full border p-1 backdrop-blur-md ${
        isDark
          ? "border-white/10 bg-white/[0.04]"
          : "border-violet-200/70 bg-white/70"
      }`}
    >
      {filters.map((filter) => {
        const isActive = selected === filter;
        return (
          <button
            key={filter}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(filter)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.45)]"
                : isDark
                  ? "text-neutral-400 hover:text-white"
                  : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  </div>
);

export default ProjectFilters;
