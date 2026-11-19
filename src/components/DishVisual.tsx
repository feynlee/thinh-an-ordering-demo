import { useState } from "react";
import type { MenuItem } from "../data/menu";
import { photoFor } from "../data/photos";
import { DishArt } from "../art/DishArt";

/** Shows the dish photo when one is registered in src/data/photos.ts, otherwise (or if it fails to load) the illustration. */
export function DishVisual({ item, className = "", label = false }: { item: MenuItem; className?: string; label?: boolean }) {
  const p = photoFor(item.id);
  const [failed, setFailed] = useState(false);
  const show = p && !failed;
  return (
    <span className={`relative block overflow-hidden bg-rice ${className}`}>
      {show ? (
        <img src={p.src} alt={item.nameEn} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <DishArt kind={item.art} title={item.nameEn} className="absolute inset-0 w-full h-full" />
      )}
      {label && (
        <span className="absolute left-3 bottom-3 max-w-[calc(100%-24px)] rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-medium text-muted truncate">
          {show ? p.credit : "Illustration · no photo of this dish yet"}
        </span>
      )}
    </span>
  );
}

export function hasPhoto(item: MenuItem) {
  return photoFor(item.id) !== null;
}
