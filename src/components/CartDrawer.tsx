import { useEffect, useRef, useState } from "react";
import { useStore, lineUnitPrice, optionLabels, type CartLine } from "../lib/store";
import { useT } from "../lib/i18n";
import { findItem } from "../data/menu";
import { usd } from "../lib/money";
import { go } from "../lib/router";
import { DishArt } from "../art/DishArt";
import { Icon } from "./Icon";
import { ItemSheet } from "./ItemSheet";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, subtotal, updateLine, removeLine } = useStore();
  const t = useT();
  const [editing, setEditing] = useState<CartLine | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus(); };
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return editing ? <ItemSheet item={findItem(editing.itemId)!} editLine={editing} onClose={() => setEditing(null)} /> : null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-ink/40" onClick={() => setCartOpen(false)} aria-hidden="true" />
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={t("Your order")} className="fixed z-50 inset-y-0 right-0 w-full sm:w-[420px] bg-paper shadow-lift flex flex-col outline-none">
        <div className="h-16 px-5 flex items-center justify-between border-b border-line">
          <h2 className="font-display text-2xl text-jade-dark">{t("Your order")}</h2>
          <button onClick={() => setCartOpen(false)} className="w-10 h-10 grid place-items-center rounded-full hover:bg-rice" aria-label="Close"><Icon name="close" /></button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 grid place-items-center p-8 text-center">
            <div>
              <div className="mx-auto w-16 h-16 rounded-full bg-rice grid place-items-center text-jade"><Icon name="bag" className="w-7 h-7" /></div>
              <p className="mt-4 font-semibold">{t("Your cart is empty")}</p>
              <button onClick={() => { setCartOpen(false); go("/order"); }} className="mt-4 h-11 px-5 rounded-full bg-jade text-paper font-semibold">{t("Browse the menu")}</button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-line">
              {cart.map((l) => {
                const it = findItem(l.itemId);
                if (!it) return null;
                const unit = lineUnitPrice(it, l.choices);
                const opts = optionLabels(l.choices);
                return (
                  <li key={l.lineId} className="p-4 flex gap-3">
                    <DishArt kind={it.art} className="w-16 h-16 rounded-xl shrink-0" title={it.nameEn} />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="font-semibold leading-tight">{it.nameVi}</p>
                        <p className="font-semibold tabular-nums">{usd(unit * l.qty)}</p>
                      </div>
                      <p className="text-[13px] text-muted">{it.nameEn}</p>
                      {opts.length > 0 && <p className="mt-1 text-[13px] text-muted">{opts.join(" · ")}</p>}
                      {l.note && <p className="mt-1 text-[13px] italic text-muted">“{l.note}”</p>}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-line">
                          <button className="w-9 h-9 grid place-items-center" onClick={() => updateLine(l.lineId, { qty: l.qty - 1 })} aria-label={`Remove one ${it.nameEn}`}><Icon name="minus" className="w-4 h-4" /></button>
                          <span className="w-6 text-center tabular-nums text-[14px]" aria-live="polite">{l.qty}</span>
                          <button className="w-9 h-9 grid place-items-center" onClick={() => updateLine(l.lineId, { qty: l.qty + 1 })} aria-label={`Add one ${it.nameEn}`}><Icon name="plus" className="w-4 h-4" /></button>
                        </div>
                        {it.modifierGroups.length > 0 && (
                          <button className="h-9 px-3 rounded-full text-[13px] font-semibold text-jade hover:bg-jade-soft" onClick={() => { setEditing(l); setCartOpen(false); }}>Edit</button>
                        )}
                        <button className="h-9 px-3 rounded-full text-[13px] text-muted hover:bg-rice" onClick={() => removeLine(l.lineId)}>Remove</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-line p-5 pb-[max(20px,env(safe-area-inset-bottom))] bg-paper">
              <div className="flex justify-between text-[15px]"><span>{t("Subtotal")}</span><span className="font-semibold tabular-nums">{usd(subtotal)}</span></div>
              <p className="text-[12px] text-muted mt-1">Tax and optional tip are added at checkout.</p>
              <button onClick={() => { setCartOpen(false); go("/checkout"); }} className="mt-4 w-full h-14 rounded-2xl bg-chili hover:bg-chili-dark text-paper font-semibold text-[16px] flex items-center justify-center gap-2">
                {t("Checkout")} <Icon name="arrow" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
