import type { MenuItem } from "../data/menu";
import { photoFor } from "../data/photos";
import { DishArt } from "../art/DishArt";

/** Shows a real photo when one is registered in src/data/photos.ts, otherwise the illustration. */
export function DishVisual({ item, className = "", label = false }: { item: MenuItem; className?: string; label?: boolean }) {
  const p = photoFor(item.id);
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {p ? (
        <img src={p.src} alt={item.nameEn} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <DishArt kind={item.art} title={item.nameEn} className="absolute inset-0 w-full h-full" />
      )}
      {label && (
        <span className="absolute left-3 bottom-3 rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-medium text-muted">
          {p ? (p.fromRestaurant ? p.credit : `${p.credit} · stand-in, not this restaurant's dish`) : "Illustration · not a photo of the dish"}
        </span>
      )}
    </span>
  );
}

export function hasPhoto(item: MenuItem) {
  return photoFor(item.id) !== null;
}
