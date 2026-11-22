import { formatProjectDate, type Project } from "@/data/projects";
import { getStatusStyle } from "./statusStyles";

type Props = {
  project: Project;
  isDark: boolean;
  dateFormat?: "short" | "long";
};

/** Glowing status light + label + date, shown on cards and in the modal. */
const StatusChip = ({ project, isDark, dateFormat = "short" }: Props) => {
  const status = getStatusStyle(project.status, isDark);

  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
      <span className={`inline-flex items-center gap-2 ${status.text}`}>
        <span className={`fx-led ${status.pulse ? "fx-led-pulse" : ""}`} />
        {project.status}
      </span>
      <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>
        {formatProjectDate(project.date, dateFormat)}
      </span>
    </div>
  );
};

export default StatusChip;
