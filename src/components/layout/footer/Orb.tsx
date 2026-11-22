export type OrbTone = "pink" | "violet" | "indigo";

/** A glossy neon marble (styles: .orb in styles/layout.css). */
const Orb = ({
  tone,
  className = "",
}: {
  tone: OrbTone;
  className?: string;
}) => <span aria-hidden="true" className={`orb orb-${tone} ${className}`} />;

export default Orb;
