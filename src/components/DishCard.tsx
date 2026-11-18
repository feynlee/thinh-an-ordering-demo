import type { MenuItem } from "../data/menu";
import { usd } from "../lib/money";
import { useT } from "../lib/i18n";
import { DishVisual } from "./DishVisual";
import { Icon } from "./Icon";

export function DietaryTags({ item }: { item: MenuItem }) {
  const t = useT();
  if (!item.dietary.length) return null;
  return (
    <span className="inline-flex gap-1.5 flex-wrap">
      {item.dietary.includes("vegetarian") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-jade-soft text-jade-dark px-2 py-0.5 text-[12px] font-semibold"><Icon name="leaf" className="w-3.5 h-3.5" />{t("Vegetarian")}</span>
      )}
      {item.dietary.includes("spicy") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-chili-soft text-chili-dark px-2 py-0.5 text-[12px] font-semibold"><Icon name="flame" className="w-3.5 h-3.5" />{t("Spicy")}</span>
      )}
    </span>
  );
}

export function DishCard({ item, onOpen, compact }: { item: MenuItem; onOpen: () => void; compact?: boolean }) {
  return (
    <button onClick={onOpen} className="group text-left w-full rounded-2xl bg-white border border-line/70 shadow-card hover:shadow-lift transition overflow-hidden flex sm:flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade">
      <div className={`relative shrink-0 ${compact ? "w-full" : "w-32 sm:w-full"} overflow-hidden`}>
        <DishVisual item={item} className={`w-full ${compact ? "h-36" : "h-full min-h-[128px] sm:h-40"} group-hover:scale-[1.03] transition-transform duration-300`} />
        {item.number && <span className="absolute left-2.5 top-2.5 rounded-full bg-chili px-2 py-0.5 text-[12px] font-bold text-paper shadow">#{item.number}</span>}
      </div>
      <div className="p-4 flex-1 flex flex-col min-w-0">
        <p className="font-display text-[19px] leading-tight text-jade-dark">{item.nameVi}</p>
        <p className="text-[14px] font-medium mt-0.5">{item.nameEn}</p>
        {!compact && <p className="text-[13px] text-muted mt-1 line-clamp-2">{item.description}</p>}
        <div className="mt-2"><DietaryTags item={item} /></div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-semibold tabular-nums">{usd(item.price)}</span>
          <span className="w-9 h-9 rounded-full bg-jade text-paper grid place-items-center group-hover:bg-chili transition" aria-hidden="true"><Icon name="plus" className="w-5 h-5" /></span>
        </div>
      </div>
    </button>
  );
}
