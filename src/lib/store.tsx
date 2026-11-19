import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MENU, MODIFIER_GROUPS, type MenuItem } from "../data/menu";
import { RESTAURANT } from "../data/restaurant";
import { load, save } from "./storage";
import { round2 } from "./money";

export interface CartLine {
  lineId: string;
  itemId: string;
  qty: number;
  /** groupId -> option ids */
  choices: Record<string, string[]>;
  note?: string;
}

export type OrderStatus = "new" | "preparing" | "ready" | "completed" | "cancelled";
export type PayMode = "online" | "pickup";

export interface DemoOrder {
  id: string; // DEMO-1234
  createdAt: number;
  lines: (CartLine & { name: string; nameVi: string; unitPrice: number; optionLabels: string[] })[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  pickup: { asap: boolean; slotKey?: string; label: string };
  customer: { name: string; phone: string; email?: string };
  payMode: PayMode;
  status: OrderStatus;
  history: { status: OrderStatus; at: number }[];
  /** Always true. Kept on the record so no simulated order can be mistaken for a real one. */
  demo: true;
}

const CART_KEY = "thinhan-demo:cart:v1";
const ORDERS_KEY = "thinhan-demo:orders:v1";
const LANG_KEY = "thinhan-demo:lang";

export type Lang = "en" | "vi";

export function lineUnitPrice(item: MenuItem, choices: Record<string, string[]>) {
  let p = item.price;
  for (const [gid, ids] of Object.entries(choices)) {
    const g = MODIFIER_GROUPS[gid];
    if (!g) continue;
    for (const id of ids) p += g.options.find((o) => o.id === id)?.price ?? 0;
  }
  return round2(p);
}

/** The choices a quick "add" uses: first option of each required single-choice group. */
export function defaultChoices(item: MenuItem) {
  const out: Record<string, string[]> = {};
  for (const gid of item.modifierGroups) {
    const g = MODIFIER_GROUPS[gid];
    if (g && g.select === "one" && g.required) out[gid] = [g.options[0].id];
  }
  return out;
}

export function optionLabels(choices: Record<string, string[]>) {
  const out: string[] = [];
  for (const [gid, ids] of Object.entries(choices)) {
    const g = MODIFIER_GROUPS[gid];
    if (!g) continue;
    for (const id of ids) {
      const o = g.options.find((x) => x.id === id);
      // "Regular" size is the default; leave it off tickets to keep them short.
      if (o && o.id !== "regular") out.push(o.label);
    }
  }
  return out;
}

interface Ctx {
  cart: CartLine[];
  addLine: (l: Omit<CartLine, "lineId">) => void;
  updateLine: (lineId: string, patch: Partial<CartLine>) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  orders: DemoOrder[];
  placeOrder: (o: Omit<DemoOrder, "id" | "createdAt" | "status" | "history" | "demo" | "lines" | "subtotal" | "tax" | "total">) => DemoOrder;
  setStatus: (id: string, s: OrderStatus) => void;
  resetDemo: () => void;
  seedSampleOrders: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  toast: string | null;
  showToast: (t: string) => void;
}

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => load(CART_KEY, []));
  const [orders, setOrders] = useState<DemoOrder[]>(() => load(ORDERS_KEY, []));
  const [lang, setLangState] = useState<Lang>(() => load(LANG_KEY, "en"));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => save(CART_KEY, cart), [cart]);
  useEffect(() => save(ORDERS_KEY, orders), [orders]);
  useEffect(() => {
    save(LANG_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Keep the kitchen view and the customer view in sync across tabs.
  useEffect(() => {
    const on = (e: StorageEvent) => {
      if (e.key === ORDERS_KEY) setOrders(load(ORDERS_KEY, []));
      if (e.key === CART_KEY) setCart(load(CART_KEY, []));
    };
    window.addEventListener("storage", on);
    return () => window.removeEventListener("storage", on);
  }, []);

  const showToast = useCallback((t: string) => {
    setToast(t);
    window.setTimeout(() => setToast((cur) => (cur === t ? null : cur)), 2600);
  }, []);

  const addLine: Ctx["addLine"] = useCallback((l) => {
    setCart((c) => {
      const same = c.find((x) => x.itemId === l.itemId && JSON.stringify(x.choices) === JSON.stringify(l.choices) && (x.note ?? "") === (l.note ?? ""));
      if (same) return c.map((x) => (x === same ? { ...x, qty: x.qty + l.qty } : x));
      return [...c, { ...l, lineId: Math.random().toString(36).slice(2, 10) }];
    });
  }, []);
  const updateLine: Ctx["updateLine"] = (id, patch) => setCart((c) => c.map((x) => (x.lineId === id ? { ...x, ...patch } : x)).filter((x) => x.qty > 0));
  const removeLine = (id: string) => setCart((c) => c.filter((x) => x.lineId !== id));
  const clearCart = () => setCart([]);

  const subtotal = useMemo(
    () => round2(cart.reduce((s, l) => { const it = MENU.find((m) => m.id === l.itemId); return it ? s + lineUnitPrice(it, l.choices) * l.qty : s; }, 0)),
    [cart],
  );
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const placeOrder: Ctx["placeOrder"] = (o) => {
    const lines = cart.flatMap((l) => {
      const it = MENU.find((m) => m.id === l.itemId);
      if (!it) return [];
      return [{ ...l, name: it.nameEn, nameVi: it.nameVi, unitPrice: lineUnitPrice(it, l.choices), optionLabels: optionLabels(l.choices) }];
    });
    const tax = round2(subtotal * RESTAURANT.taxRate);
    const order: DemoOrder = {
      ...o,
      id: `DEMO-${String(Math.floor(1000 + Math.random() * 9000))}`,
      createdAt: Date.now(),
      lines,
      subtotal,
      tax,
      total: round2(subtotal + tax + o.tip),
      status: "new",
      history: [{ status: "new", at: Date.now() }],
      demo: true,
    };
    setOrders((os) => [order, ...os]);
    setCart([]);
    return order;
  };

  const setStatus = (id: string, s: OrderStatus) =>
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status: s, history: [...o.history, { status: s, at: Date.now() }] } : o)));

  const resetDemo = () => { setOrders([]); setCart([]); };

  const seedSampleOrders = () => {
    const mk = (id: string, minsAgo: number, status: OrderStatus, name: string, items: [string, number, Record<string, string[]>][], payMode: PayMode, pickup: string): DemoOrder => {
      const lines = items.map(([itemId, qty, choices], i) => {
        const it = MENU.find((m) => m.id === itemId)!;
        return { lineId: `${id}-${i}`, itemId, qty, choices, name: it.nameEn, nameVi: it.nameVi, unitPrice: lineUnitPrice(it, choices), optionLabels: optionLabels(choices) };
      });
      const sub = round2(lines.reduce((s, l) => s + l.unitPrice * l.qty, 0));
      const tax = round2(sub * RESTAURANT.taxRate);
      const at = Date.now() - minsAgo * 60000;
      return { id, createdAt: at, lines, subtotal: sub, tax, tip: 0, total: round2(sub + tax), pickup: { asap: true, label: pickup }, customer: { name, phone: "(555) 010-0000" }, payMode, status, history: [{ status, at }], demo: true };
    };
    setOrders((os) => [
      mk("DEMO-2041", 2, "new", "Sample: Linh", [["18-pho-tai", 2, { "pho-size": ["xl"], "soup-style": ["beef-side"] }], ["4-goi-cuon", 1, {}]], "online", "ASAP"),
      mk("DEMO-2038", 9, "preparing", "Sample: Marcus", [["132-banh-mi-dac-biet", 3, { "banh-mi-options": ["no-cilantro"] }], ["thai-tea-mt", 1, {}]], "pickup", "ASAP"),
      mk("DEMO-2033", 18, "ready", "Sample: Priya", [["87-com-tam", 1, {}], ["122-pho-chay", 1, { "pho-size": ["regular"] }]], "online", "ASAP"),
      ...os.filter((o) => !o.id.startsWith("DEMO-20")),
    ]);
  };

  const value: Ctx = {
    cart, addLine, updateLine, removeLine, clearCart, count, subtotal,
    orders, placeOrder, setStatus, resetDemo, seedSampleOrders,
    lang, setLang: setLangState, cartOpen, setCartOpen, toast, showToast,
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("StoreProvider missing");
  return c;
}
