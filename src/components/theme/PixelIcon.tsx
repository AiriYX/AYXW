type Props = {
  /** file name in /public/img/px (without extension); "coffee" is the animated gif */
  name: string;
  size?: number;
  className?: string;
  alt?: string;
};

/** Crisp pixel-art icon (no smoothing when scaled up). */
const PixelIcon = ({ name, size = 32, className = "", alt = "" }: Props) => (
  <img
    src={`/img/px/${name}.${name === "coffee" ? "gif" : "png"}`}
    alt={alt}
    width={size}
    height={size}
    loading="lazy"
    draggable={false}
    className={`inline-block select-none [image-rendering:pixelated] ${className}`}
    style={{ width: size, height: size }}
  />
);

export default PixelIcon;
