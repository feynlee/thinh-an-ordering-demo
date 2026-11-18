import { useEffect, useMemo, useRef, useState } from "react";
import { MODIFIER_GROUPS, type MenuItem } from "../data/menu";
import { useStore, lineUnitPrice, type CartLine } from "../lib/store";
import { useT } from "../lib/i18n";
import { usd } from "../lib/money";
import { DishVisual } from "./DishVisual";
import { Icon } from "./Icon";
import { DietaryTags } from "./DishCard";

export function ItemSheet({ item, onClose, editLine }: { item: MenuItem; onClose: () => void; editLine?: CartLine }) {
  const { addLine, updateLine, showToast } = useStore();
  const t = useT();
  const groups = item.modifierGroups.map((g) => MODIFIER_GROUPS[g]).filter(Boolean);
  const [choices, setChoices] = useState<Record<string, string[]>>(() => {
    if (editLine) return editLine.choices;
    const init: Record<string, string[]> = {};
    for (const g of groups) if (g.select === "one" && g.required) init[g.id] = [g.options[0].id];
    return init;
  });
  const [qty, setQty] = useState(editLine?.qty ?? 1);
  const [note, setNote] = useState(editLine?.note ?? "");
  const [showNote, setShowNote] = useState(Boolean(editLine?.note));
  const unit = useMemo(() => lineUnitPrice(item, choices), [item, choices]);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    box.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus(); };
  }, [onClose]);

  const toggle = (gid: string, oid: string, one: boolean) =>
    setChoices((c) => {
      const cur = c[gid] ?? [];
      if (one) return { ...c, [gid]: [oid] };
      return { ...c, [gid]: cur.includes(oid) ? cur.filter((x) => x !== oid) : [...cur, oid] };
    });

  const submit = () => {
    const clean = Object.fromEntries(Object.entries(choices).filter(([, v]) => v.length));
    if (editLine) {
      updateLine(editLine.lineId, { choices: clean, qty, note: note.trim() || undefined });
      showToast("Item updated");
    } else {
      addLine({ itemId: item.id, qty, choices: clean, note: note.trim() || undefined });
      showToast(`Added ${qty} × ${item.nameVi}`);
    }
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-ink/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={box}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-title"
        className="fixed z-50 inset-x-0 bottom-0 max-h-[92vh] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[560px] sm:max-h-[88vh] bg-paper rounded-t-3xl sm:rounded-3xl shadow-lift flex flex-col overflow-hidden outline-none"
      >
        <div className="relative shrink-0">
          <DishVisual item={item} label className="w-full h-44 sm:h-56" />
          <button onClick={onClose} className="absolute right-3 top-3 w-10 h-10 rounded-full bg-paper/95 grid place-items-center shadow-card" aria-label="Close"><Icon name="close" /></button>
        </div>
        <div className="overflow-y-auto px-5 pt-4 pb-2">
          <p className="text-[13px] font-semibold text-chili">{item.number ? `No. ${item.number}` : " "}</p>
          <h2 id="item-title" className="font-display text-[28px] leading-tight text-jade-dark">{item.nameVi}</h2>
          <p className="text-[15px] font-medium">{item.nameEn}</p>
          <p className="mt-2 text-[15px] text-muted">{item.description}</p>
          <div className="mt-2"><DietaryTags item={item} /></div>
          {item.dietaryNote && <p className="mt-1 text-[12px] text-muted">{item.dietaryNote}</p>}
          <p className="mt-2 text-[20px] font-semibold tabular-nums">{usd(item.price)}</p>

          {groups.map((g) => (
            <fieldset key={g.id} className="mt-5">
              <legend className="w-full flex items-baseline justify-between">
                <span className="font-semibold text-[16px]">{g.label}</span>
                <span className={`text-[12px] font-semibold rounded-full px-2 py-0.5 ${g.required ? "bg-chili-soft text-chili-dark" : "bg-rice text-muted"}`}>{g.required ? t("Required") : t("Optional")}</span>
              </legend>
              <div className="mt-2 grid gap-2">
                {g.options.map((o) => {
                  const one = g.select === "one";
                  const on = (choices[g.id] ?? []).includes(o.id);
                  return (
                    <label key={o.id} className={`flex items-center gap-3 min-h-[52px] rounded-2xl border px-4 cursor-pointer transition ${on ? "border-jade bg-jade-soft/60" : "border-line bg-white hover:border-muted/40"}`}>
                      <input type={one ? "radio" : "checkbox"} name={`${item.id}-${g.id}`} checked={on} onChange={() => toggle(g.id, o.id, one)} className="peer sr-only" />
                      <span aria-hidden="true" className={`grid place-items-center shrink-0 w-6 h-6 border-2 ${one ? "rounded-full" : "rounded-md"} ${on ? "border-jade bg-jade text-paper" : "border-muted/40 bg-white"} peer-focus-visible:ring-2 peer-focus-visible:ring-turmeric`}>
                        {on && (one ? <span className="w-2.5 h-2.5 rounded-full bg-paper" /> : <Icon name="check" className="w-4 h-4" />)}
                      </span>
                      <span className="flex-1 text-[15px]">{o.label}</span>
                      {o.price > 0 && <span className="text-[14px] text-muted tabular-nums">+{usd(o.price)}</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <div className="mt-5">
            {showNote ? (
              <label className="block">
                <span className="font-semibold text-[16px]">{t("Special instructions")}</span>
                <textarea value={note} onChange={(e) => setNote(e.target.value.slice(0, 140))} rows={2} placeholder="e.g. sauce on the side" className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-jade" />
                <span className="text-[12px] text-muted">{note.length}/140 · Requests that change the price may not be possible.</span>
              </label>
            ) : (
              <button onClick={() => setShowNote(true)} className="text-[15px] font-semibold text-jade flex items-center gap-1.5"><Icon name="plus" className="w-4 h-4" /> {t("Special instructions")}</button>
            )}
          </div>
          <div className="h-4" />
        </div>
        <div className="shrink-0 border-t border-line px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center gap-3 bg-paper">
          <div className="flex items-center rounded-full border border-line bg-white">
            <button className="w-11 h-11 grid place-items-center disabled:opacity-40" disabled={qty <= 1} onClick={() => setQty((q) => q - 1)} aria-label="Decrease quantity"><Icon name="minus" /></button>
            <span className="w-7 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
            <button className="w-11 h-11 grid place-items-center" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity"><Icon name="plus" /></button>
          </div>
          <button onClick={submit} className="flex-1 h-14 rounded-2xl bg-chili hover:bg-chili-dark text-paper font-semibold text-[16px] flex items-center justify-between px-5">
            <span>{editLine ? t("Update item") : t("Add to order")}</span>
            <span className="tabular-nums">{usd(unit * qty)}</span>
          </button>
        </div>
      </div>
    </>
  );
}
