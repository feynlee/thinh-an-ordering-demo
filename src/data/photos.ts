// Real dish photos, keyed by menu item id (see src/data/menu.ts).
//
// Only add a photo here when you have the right to publish it:
//   - you took it yourself, or
//   - the restaurant owner supplied it or gave written permission, or
//   - it has a license that allows reuse (credit it as the license asks).
// Do not copy photos from Google Maps, Yelp, DoorDash or other sites; they
// belong to whoever uploaded them.
//
// Put the file in public/photos/ (about 1200x900, JPG or WebP, under 300 KB)
// and add an entry, for example:
//   "17-pho-dac-biet": { file: "17-pho-dac-biet.jpg", credit: "Photo: Li, Nov 2026" },
// Items without an entry keep their illustration.

export type DishPhoto = {
  file: string;
  credit: string;
  /** true when the photo shows this restaurant's own dish */
  fromRestaurant: boolean;
};

export const PHOTOS: Record<string, DishPhoto> = {};

export function photoFor(id: string): (DishPhoto & { src: string }) | null {
  const p = PHOTOS[id];
  return p ? { ...p, src: `${import.meta.env.BASE_URL}photos/${p.file}` } : null;
}
