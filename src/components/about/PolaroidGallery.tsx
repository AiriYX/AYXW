import type { Photo } from "./photos";

type Props = {
  isDark: boolean;
  photos: Photo[];
  onOpen: (index: number) => void;
};

const TILTS = ["-5deg", "3deg", "-2deg", "5deg", "-4deg", "2deg"];

/** Camera roll: photos as scattered polaroids; hover straightens, click zooms. */
const PolaroidGallery = ({ isDark, photos, onOpen }: Props) => (
  <section className="mx-auto max-w-xl">
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
      {photos.map((photo, i) => (
        <button
          key={photo.id}
          onClick={() => onOpen(i)}
          aria-label={`View ${photo.alt} photo`}
          className="polaroid-thumb group rounded-sm bg-white p-1.5 pb-7 text-left shadow-[0_18px_35px_-18px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/60"
          style={{ rotate: TILTS[i % TILTS.length] }}
        >
          <img
            src={photo.url}
            alt={`${photo.alt} photo`}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <span className="font-playwrite mt-1.5 block truncate text-center text-xs capitalize text-slate-600">
            {photo.alt.toLowerCase()}
          </span>
        </button>
      ))}
    </div>
    <p
      className={`mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.24em] ${
        isDark ? "text-neutral-500" : "text-slate-400"
      }`}
    >
      tap a photo to zoom in
    </p>
  </section>
);

export default PolaroidGallery;
