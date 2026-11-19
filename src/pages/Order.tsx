import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, MENU, MENU_COUNT, findItem, type MenuItem } from "../data/menu";
import { usd } from "../lib/money";
import { DishCard } from "../components/DishCard";
import { ItemSheet } from "../components/ItemSheet";
import { Icon } from "../components/Icon";
import { useT } from "../lib/i18n";
import { useStore } from "../lib/store";
import { openNow, asapLabel } from "../lib/time";

/** Strip Vietnamese diacritics so "pho" finds "Phở" and "banh mi" finds "Bánh Mì". */
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();

export function Order() {
  const t = useT();
  const { lang, orders, addLine, setCartOpen, showToast } = useStore();
  const [q, setQ] = useState("");
  const [veg, setVeg] = useState(false);
  const [open, setOpenRaw] = useState<MenuItem | null>(() => {
    const id = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("item");
    return id ? findItem(id) ?? null : null;
  });
  // Keep the open dish in the URL so a dish can be shared as a link.
  const setOpen = (m: MenuItem | null) => {
    setOpenRaw(m);
    history.replaceState(null, "", `#/order${m ? `?item=${m.id}` : ""}`);
  };
  const past = orders.filter((o) => !o.customer.name.startsWith("Sample")).sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  const reorder = (oid: string) => {
    const o = orders.find((x) => x.id === oid);
    if (!o) return;
    let n = 0;
    for (const l of o.lines) if (findItem(l.itemId)) { addLine({ itemId: l.itemId, qty: l.qty, choices: l.choices, note: l.note }); n += l.qty; }
    showToast(`Added ${n} item${n === 1 ? "" : "s"} from ${o.id}`);
    setCartOpen(true);
  };
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const chips = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const f = fold(q.trim());
    return MENU.filter((m) => {
      if (veg && !m.dietary.includes("vegetarian")) return false;
      if (!f) return true;
      const hay = fold([m.nameVi, m.nameEn, m.nameClover, m.description, m.number ? `#${m.number} ${m.number}` : ""].join(" "));
      return f.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [q, veg]);

  const sections = CATEGORIES.map((c) => ({ ...c, items: filtered.filter((m) => m.category === c.id) })).filter((s) => s.items.length);

  // Highlight the category chip for the section in view.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(`cat-${s.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActive(vis.target.id.replace("cat-", ""));
      },
      { rootMargin: "-140px 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections.map((s) => s.id).join()]);

  useEffect(() => {
    const el = chips.current?.querySelector(`[data-cat="${active}"]`) as HTMLElement | null;
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const jump = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
  };

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl text-jade-dark">{t("Order pickup")}</h1>
            <p className="mt-2 text-muted text-[15px]">
              {openNow() ? <>Pickup today from <strong className="text-ink">{asapLabel()}</strong> · 8104 W Waters Ave</> : <>Closed right now · schedule a pickup at checkout</>}
            </p>
          </div>
          <p className="text-[13px] text-muted max-w-xs">The full menu, {MENU_COUNT} items, with prices from the restaurant's Clover page (Nov 19, 2026). Photos from its Google Maps listing.</p>
        </div>
      </div>

      {past.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 mt-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-chili">Order again</p>
          <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {past.map((o) => (
              <button key={o.id} onClick={() => reorder(o.id)} className="shrink-0 rounded-2xl bg-white border border-line px-4 py-2.5 text-left hover:border-jade">
                <span className="block text-[14px] font-semibold">{o.lines.map((l) => `${l.qty}× ${l.nameVi}`).join(", ").slice(0, 48)}</span>
                <span className="block text-[12px] text-muted">{o.id} · {usd(o.subtotal)} · tap to add all</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sticky search + categories */}
      <div className="sticky top-16 z-20 bg-paper/95 backdrop-blur border-b border-line mt-5">
        <div className="mx-auto max-w-6xl px-4 pt-3 pb-2">
          <div className="flex gap-2">
            <label className="relative flex-1">
              <span className="sr-only">{t("Search dishes")}</span>
              <Icon name="search" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "vi" ? "Tìm “phở”, “bánh mì”, số 18…" : "Search “pho”, “banh mi”, #18…"}
                className="w-full h-12 rounded-full bg-white border border-line pl-12 pr-4 text-[16px] focus:outline-none focus:ring-2 focus:ring-jade"
              />
            </label>
            <button onClick={() => setVeg((v) => !v)} aria-pressed={veg} className={`h-12 px-4 rounded-full border text-[14px] font-semibold inline-flex items-center gap-1.5 ${veg ? "bg-jade text-paper border-jade" : "bg-white border-line"}`}>
              <Icon name="leaf" className="w-4 h-4" /> <span className="hidden sm:inline">{t("Vegetarian")}</span><span className="sm:hidden">Veg</span>
            </button>
          </div>
          <div ref={chips} className="mt-2 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1" role="tablist" aria-label="Menu categories">
            {sections.map((s) => (
              <button
                key={s.id}
                data-cat={s.id}
                role="tab"
                aria-selected={active === s.id}
                onClick={() => jump(s.id)}
                className={`shrink-0 h-10 px-4 rounded-full text-[14px] font-semibold whitespace-nowrap transition ${active === s.id ? "bg-ink text-paper" : "bg-rice hover:bg-line"}`}
              >
                {lang === "vi" ? s.labelVi : s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {sections.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-semibold">No dishes match “{q}”.</p>
            <p className="text-muted mt-1 text-[14px]">Try a number like 18, or words like “pho”, “tofu”, “shrimp”.</p>
            <button onClick={() => { setQ(""); setVeg(false); }} className="mt-4 h-11 px-5 rounded-full bg-jade text-paper font-semibold">Clear search</button>
          </div>
        )}
        {sections.map((s) => (
          <section key={s.id} id={`cat-${s.id}`} className="pt-8 scroll-mt-40" aria-labelledby={`h-${s.id}`}>
            <h2 id={`h-${s.id}`} className="font-display text-[28px] text-jade-dark flex items-baseline gap-3">
              {lang === "vi" ? s.labelVi : s.label}
              <span className="text-[13px] font-sans text-muted">{s.items.length}</span>
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {s.items.map((m) => <DishCard key={m.id} item={m} onOpen={() => setOpen(m)} />)}
            </div>
          </section>
        ))}
      </div>

      {open && <ItemSheet item={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
