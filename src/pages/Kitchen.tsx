import { useEffect, useRef, useState } from "react";
import { useStore, type DemoOrder, type OrderStatus } from "../lib/store";
import { usd } from "../lib/money";
import { Icon } from "../components/Icon";

const COLS: { s: OrderStatus; title: string; tone: string; next?: OrderStatus; action?: string }[] = [
  { s: "new", title: "New", tone: "bg-chili", next: "preparing", action: "Start preparing" },
  { s: "preparing", title: "Preparing", tone: "bg-turmeric", next: "ready", action: "Mark ready" },
  { s: "ready", title: "Ready for pickup", tone: "bg-jade", next: "completed", action: "Picked up" },
  { s: "completed", title: "Completed", tone: "bg-muted" },
];

function ago(ms: number) {
  const m = Math.max(0, Math.round((Date.now() - ms) / 60000));
  return m < 1 ? "just now" : `${m} min ago`;
}

export function Kitchen() {
  const { orders, setStatus, resetDemo, seedSampleOrders } = useStore();
  const [, tick] = useState(0);
  useEffect(() => { const id = window.setInterval(() => tick((x) => x + 1), 30000); return () => window.clearInterval(id); }, []);
  const [mobileCol, setMobileCol] = useState<OrderStatus>("new");
  const [sound, setSound] = useState(false);
  const known = useRef(new Set(orders.map((o) => o.id)));
  // Chime when a new order arrives (e.g. placed from another tab), like a kitchen tablet would.
  useEffect(() => {
    const fresh = orders.filter((o) => !known.current.has(o.id));
    fresh.forEach((o) => known.current.add(o.id));
    if (sound && fresh.some((o) => o.status === "new")) chime();
  }, [orders, sound]);

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#1E1813] text-paper">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-turmeric">Simulated staff screen</p>
            <h1 className="font-display text-3xl sm:text-4xl mt-1">Kitchen view</h1>
            <p className="mt-1 text-paper/70 text-[14px] max-w-2xl">
              Shows the workflow, not Clover's actual screen. In production, online orders arrive on the restaurant's Clover device and kitchen printer; the exact accept / ready steps depend on Clover's features and settings.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSound((v) => !v); if (!sound) chime(); }} aria-pressed={sound} className={`h-11 px-4 rounded-full text-[14px] font-semibold inline-flex items-center gap-2 ${sound ? "bg-leaf text-ink" : "bg-white/10 hover:bg-white/20"}`}>
              {sound ? "🔔 Chime on" : "🔕 Chime off"}
            </button>
            <button onClick={seedSampleOrders} className="h-11 px-4 rounded-full bg-white/10 hover:bg-white/20 text-[14px] font-semibold inline-flex items-center gap-2"><Icon name="plus" className="w-4 h-4" /> Add sample orders</button>
            <button onClick={resetDemo} className="h-11 px-4 rounded-full bg-white/10 hover:bg-white/20 text-[14px] font-semibold inline-flex items-center gap-2"><Icon name="refresh" className="w-4 h-4" /> Reset demo</button>
          </div>
        </div>

        {orders.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/20 p-10 text-center">
            <p className="font-semibold text-lg">No demo orders yet</p>
            <p className="text-paper/70 mt-1 text-[14px]">Place an order from the menu (it stays in this browser), or add sample orders.</p>
            <div className="mt-5 flex justify-center gap-2">
              <a href="#/order" className="h-11 px-5 rounded-full bg-chili font-semibold inline-flex items-center">Open the menu</a>
              <button onClick={seedSampleOrders} className="h-11 px-5 rounded-full bg-white/10 font-semibold">Add sample orders</button>
            </div>
          </div>
        )}

        {orders.length > 0 && (
          <>
            <div className="mt-6 flex md:hidden gap-2 overflow-x-auto no-scrollbar" role="tablist">
              {COLS.map((c) => {
                const n = orders.filter((o) => o.status === c.s).length;
                return (
                  <button key={c.s} role="tab" aria-selected={mobileCol === c.s} onClick={() => setMobileCol(c.s)} className={`shrink-0 h-10 px-4 rounded-full text-[14px] font-semibold ${mobileCol === c.s ? "bg-paper text-ink" : "bg-white/10"}`}>
                    {c.title} · {n}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 md:mt-6 grid md:grid-cols-4 gap-4 items-start">
              {COLS.map((c) => {
                const list = orders.filter((o) => o.status === c.s).sort((a, b) => a.createdAt - b.createdAt);
                return (
                  <section key={c.s} className={`${mobileCol === c.s ? "" : "hidden"} md:block rounded-3xl bg-white/5 p-3`} aria-label={c.title}>
                    <h2 className="px-2 pt-1 pb-3 flex items-center gap-2 font-semibold">
                      <span className={`w-2.5 h-2.5 rounded-full ${c.tone}`} /> {c.title}
                      <span className="ml-auto text-paper/60 text-[13px]">{list.length}</span>
                    </h2>
                    <div className="grid gap-3">
                      {list.map((o) => <Ticket key={o.id} o={o} col={c} onMove={(s) => setStatus(o.id, s)} />)}
                      {list.length === 0 && <p className="px-2 pb-3 text-[13px] text-paper/50">Nothing here</p>}
                    </div>
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Ticket({ o, col, onMove }: { o: DemoOrder; col: (typeof COLS)[number]; onMove: (s: OrderStatus) => void }) {
  return (
    <article className="rounded-2xl bg-paper text-ink p-4 shadow-lift">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-xl leading-none">{o.id}</p>
          <p className="text-[13px] text-muted mt-1">{o.customer.name} · {ago(o.createdAt)}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${o.payMode === "online" ? "bg-jade-soft text-jade-dark" : "bg-turmeric-soft text-[#7A5208]"}`}>
          {o.payMode === "online" ? "PAID (demo)" : "PAY AT PICKUP"}
        </span>
      </div>
      <p className="mt-2 text-[13px] font-semibold flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4" /> {o.pickup.label}</p>
      <ul className="mt-3 border-t border-line pt-2 text-[14px] grid gap-1.5">
        {o.lines.map((l) => (
          <li key={l.lineId}>
            <span className="font-bold">{l.qty}×</span> {l.nameVi}
            {l.optionLabels.length > 0 && <span className="block pl-6 text-[12px] text-chili-dark font-semibold">{l.optionLabels.join(" · ")}</span>}
            {l.note && <span className="block pl-6 text-[12px] italic text-muted">“{l.note}”</span>}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between text-[13px] text-muted">
        <span>{o.lines.reduce((s, l) => s + l.qty, 0)} items</span>
        <span className="font-semibold text-ink">{usd(o.total)}</span>
      </div>
      {col.next && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => onMove(col.next!)} className={`flex-1 h-11 rounded-xl font-semibold text-paper ${col.s === "new" ? "bg-chili" : col.s === "preparing" ? "bg-[#9A6A0D]" : "bg-jade"}`}>{col.action}</button>
          <button onClick={() => printTicket(o)} className="h-11 px-3 rounded-xl border border-line text-[13px] font-semibold text-muted" aria-label={`Print ${o.id}`}>Print</button>
          {col.s === "new" && <button onClick={() => onMove("cancelled")} className="h-11 px-3 rounded-xl border border-line text-[13px] font-semibold text-muted" aria-label={`Cancel ${o.id}`}>Cancel</button>}
        </div>
      )}
    </article>
  );
}

function chime() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    [880, 1175].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.18);
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + i * 0.18 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.35);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.18);
      o.stop(ctx.currentTime + i * 0.18 + 0.4);
    });
  } catch {
    /* audio not available */
  }
}

const esc = (t: string) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** A narrow, receipt-printer style ticket in a new window. */
function printTicket(o: DemoOrder) {
  const w = window.open("", "_blank", "width=380,height=600");
  if (!w) return;
  const lines = o.lines
    .map((l) => `<div class="l"><b>${l.qty}× ${esc(l.nameVi)}</b>${l.optionLabels.map((x) => `<div class="o">- ${esc(x)}</div>`).join("")}${l.note ? `<div class="o">"${esc(l.note)}"</div>` : ""}</div>`)
    .join("");
  w.document.write(`<!doctype html><meta charset="utf-8"><title>${o.id}</title><style>body{font:14px/1.35 ui-monospace,Menlo,monospace;width:280px;margin:12px}h1{font-size:22px;margin:0}.m{border-top:1px dashed #000;border-bottom:1px dashed #000;padding:6px 0;margin:8px 0}.l{margin:6px 0}.o{padding-left:14px}.d{margin-top:10px;font-size:11px;text-align:center}</style>
<h1>${o.id}</h1><div>${esc(o.customer.name)} · ${esc(o.pickup.label)}</div><div>${o.payMode === "online" ? "PAID (demo)" : "PAY AT PICKUP"}</div>
<div class="m">${lines}</div><div>Total ${usd(o.total)}</div><div class="d">DEMO TICKET, NOT A REAL ORDER</div><script>print()</` + `script>`);
  w.document.close();
}
