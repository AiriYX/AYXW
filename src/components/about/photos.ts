import imageExp from "@/assets/img/imageExp";

export type Photo = { id: number; url: string; alt: string };

/** Photography portfolio images, named from their import keys. */
export const photos: Photo[] = Object.entries(imageExp).map(
  ([key, url], index) => ({
    id: index,
    url: url as string,
    alt: key.replace(/([A-Z])/g, " $1").trim(),
  }),
);
