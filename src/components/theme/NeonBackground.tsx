type Props = { isDark: boolean };

/**
 * Site-wide backdrop. Night: deep space, neon glows, scanlines and a moving
 * grid floor. Day (light mode): sunny sky with a warm sun glow.
 * Fixed to the viewport so it stays put while content scrolls over it.
 */
const NeonBackground = ({ isDark }: Props) => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div
      className={`absolute inset-0 ${
        isDark
          ? "bg-[#0c0716]"
          : "bg-gradient-to-b from-[#ece4ff] via-[#f8efff] to-[#ffeef6]"
      }`}
    />
    <div className="fx-glow absolute inset-0" />
    <div className="fx-grid-floor" />
    {isDark && <div className="fx-scanlines absolute inset-0" />}
  </div>
);

export default NeonBackground;
