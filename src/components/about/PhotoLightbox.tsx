import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "./photos";

type Props = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

/** Full-screen photo viewer. Esc closes, ← / → move between photos. */
const PhotoLightbox = ({ photos, index, onClose, onNext, onPrev }: Props) => {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  const navButton =
    "absolute p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.alt} photo`}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className={`${navButton} top-4 right-4`}
      >
        <X size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className={`${navButton} left-2 sm:left-6`}
      >
        <ChevronLeft size={36} />
      </button>

      <figure
        className="max-w-4xl w-full flex flex-col items-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.url}
          alt={`${photo.alt} photo`}
          className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-sm text-white/70 capitalize">
          {photo.alt} · {index + 1} / {photos.length}
        </figcaption>
      </figure>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className={`${navButton} right-2 sm:right-6`}
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
};

export default PhotoLightbox;
