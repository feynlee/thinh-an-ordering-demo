import { useStore, type OrderStatus } from "../lib/store";
import { useT } from "../lib/i18n";
import { RESTAURANT } from "../data/restaurant";
import { usd } from "../lib/money";
import { Icon } from "../components/Icon";

const STEPS: { s: OrderStatus; label: string; sub: string }[] = [
  { s: "new", label: "Received", sub: "The kitchen has your ticket" },
  { s: "preparing", label: "Preparing", sub: "Your food is being made" },
  { s: "ready", label: "Ready for pickup", sub: "Come to the counter" },
  { s: "completed", label: "Picked up", sub: "Enjoy your meal!" },
];

export function Confirmation({ id }: { id: string }) {
  const { orders } = useStore();
  const t = useT();
  const o = orders.find((x) => x.id === id);
  if (!o) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-jade-dark">Order not found</h1>
        <p className="mt-2 text-muted">Demo orders live only in this browser. It may have been cleared.</p>
        <a href="#/order" className="mt-6 inline-flex h-12 px-6 rounded-full bg-jade text-paper font-semibold items-center">{t("Browse the menu")}</a>
      </div>
    );
  }
  const idx = o.status === "cancelled" ? -1 : STEPS.findIndex((x) => x.s === o.status);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-20">
      <div role="alert" className="rounded-2xl border-2 border-dashed border-turmeric bg-turmeric-soft px-4 py-3 text-[14px] font-semibold text-[#6B4F1D] flex items-center gap-2">
        <Icon name="info" className="w-5 h-5 shrink-0" /> Demo only. No real order was placed and no payment was taken.
      </div>

      <div className="mt-6 rounded-[28px] bg-white shadow-card overflow-hidden">
        <div className="bg-jade text-paper p-6 sm:p-8">
          <p className="text-paper/75 text-[14px]">Simulated order</p>
          <h1 className="font-display text-4xl sm:text-5xl mt-1">{o.id}</h1>
          <p className="mt-3 text-[17px]">Thanks, {o.customer.name.split(" ")[0]}! Pickup <strong>{o.pickup.label}</strong>.</p>
        </div>

        <div className="p-6 sm:p-8">
          {o.status === "cancelled" ? (
            <p className="rounded-2xl bg-chili-soft text-chili-dark p-4 font-semibold">The kitchen cancelled this demo order.</p>
          ) : (
            <ol className="grid grid-cols-2 sm:grid-cols-4 gap-3" aria-label="Order status">
              {STEPS.map((st, i) => {
                const done = i <= idx;
                return (
                  <li key={st.s} className={`rounded-2xl p-4 border ${i === idx ? "border-jade bg-jade-soft/60" : done ? "border-jade/30 bg-white" : "border-line bg-white"}`} aria-current={i === idx ? "step" : undefined}>
                    <span className={`w-8 h-8 rounded-full grid place-items-center ${done ? "bg-jade text-paper" : "bg-rice text-muted"}`}>
                      {done ? <Icon name="check" className="w-4 h-4" /> : i + 1}
                    </span>
                    <p className={`mt-2 font-semibold text-[15px] ${done ? "" : "text-muted"}`}>{t(st.label)}</p>
                    <p className="text-[12px] text-muted">{st.sub}</p>
                  </li>
                );
              })}
            </ol>
          )}
          <p className="mt-3 text-[13px] text-muted">
            <Icon name="chef" className="w-4 h-4 inline -mt-0.5 mr-1" />Status changes when someone moves the ticket on the <a href="#/kitchen" className="underline underline-offset-2 font-semibold text-jade" target="_blank" rel="noreferrer">kitchen view</a> (try it in another tab).
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold">Items</h2>
              <ul className="mt-2 divide-y divide-line text-[14px]">
                {o.lines.map((l) => (
                  <li key={l.lineId} className="py-2 flex gap-3">
                    <span className="font-semibold w-6">{l.qty}×</span>
                    <span className="flex-1">
                      <span className="block font-semibold">{l.nameVi}</span>
                      {l.optionLabels.length > 0 && <span className="block text-muted text-[13px]">{l.optionLabels.join(" · ")}</span>}
                    </span>
                    <span className="tabular-nums">{usd(l.unitPrice * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-2 border-t border-line pt-2 text-[14px] grid gap-1">
                <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{usd(o.subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Tax</dt><dd>{usd(o.tax)}</dd></div>
                {o.tip > 0 && <div className="flex justify-between"><dt className="text-muted">Tip</dt><dd>{usd(o.tip)}</dd></div>}
                <div className="flex justify-between text-[16px] font-semibold pt-1"><dt>Total</dt><dd>{usd(o.total)}</dd></div>
                <div className="flex justify-between text-[13px] text-muted"><dt>Payment</dt><dd>{o.payMode === "online" ? "Paid online (simulated)" : "Pay at pickup (concept)"}</dd></div>
              </dl>
            </div>
            <div className="rounded-2xl bg-rice p-5 text-[14px]">
              <h2 className="font-semibold">Pickup at</h2>
              <p className="mt-1 font-display text-xl text-jade-dark">{RESTAURANT.name}</p>
              <p className="text-muted">{RESTAURANT.address1}, {RESTAURANT.address2}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer" className="h-11 px-4 rounded-full bg-jade text-paper font-semibold inline-flex items-center gap-2"><Icon name="pin" className="w-4 h-4" /> Directions</a>
                <a href={RESTAURANT.phoneHref} className="h-11 px-4 rounded-full bg-white border border-line font-semibold inline-flex items-center gap-2"><Icon name="phone" className="w-4 h-4" /> Call</a>
              </div>
              <p className="mt-4 text-[13px] text-muted">In production, Clover sends the confirmation and receipt. Whether it also texts “ready for pickup” must be confirmed.</p>
            </div>
          </div>
          <a href="#/order" className="mt-8 inline-flex h-12 px-6 rounded-full border border-line font-semibold items-center hover:bg-rice">{t("Order more")}</a>
        </div>
      </div>
    </div>
  );
}
