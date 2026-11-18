import { useEffect, useMemo, useState } from "react";
import { useStore, lineUnitPrice, optionLabels, type PayMode } from "../lib/store";
import { useT } from "../lib/i18n";
import { findItem } from "../data/menu";
import { RESTAURANT } from "../data/restaurant";
import { usd, round2 } from "../lib/money";
import { go } from "../lib/router";
import { pickupDays, openNow, asapLabel } from "../lib/time";
import { Icon } from "../components/Icon";

const TIPS = [0, 0.1, 0.15, 0.18, 0.2];

export function Checkout() {
  const { cart, subtotal, placeOrder, setCartOpen } = useStore();
  const t = useT();
  const days = useMemo(() => pickupDays(), []);
  const canAsap = openNow();
  const [asap, setAsap] = useState(canAsap);
  const [dayKey, setDayKey] = useState(days[0]?.key ?? "");
  const day = days.find((d) => d.key === dayKey) ?? days[0];
  const [slotKey, setSlotKey] = useState(day?.slots[0]?.key ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pay, setPay] = useState<PayMode>("online");
  const [tipPct, setTipPct] = useState(0);
  const [tried, setTried] = useState(false);
  const [handoff, setHandoff] = useState(false);

  const tax = round2(subtotal * RESTAURANT.taxRate);
  const tip = pay === "online" ? round2(subtotal * tipPct) : 0;
  const total = round2(subtotal + tax + tip);
  const digits = phone.replace(/\D/g, "");
  const errors = { name: !name.trim(), phone: digits.length !== 10, slot: !asap && !slotKey };
  const valid = !errors.name && !errors.phone && !errors.slot;

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-4xl text-jade-dark">{t("Your cart is empty")}</h1>
        <p className="mt-2 text-muted">Add a few dishes first.</p>
        <a href="#/order" className="mt-6 inline-flex h-12 px-6 rounded-full bg-jade text-paper font-semibold items-center">{t("Browse the menu")}</a>
      </div>
    );
  }

  const slot = day?.slots.find((s) => s.key === slotKey);
  const pickupLabel = asap ? `ASAP · about ${asapLabel()}` : slot ? `${slot.dayLabel} · ${slot.timeLabel}` : "";

  const finish = () => {
    const o = placeOrder({
      tip,
      pickup: { asap, slotKey: asap ? undefined : slotKey, label: pickupLabel },
      customer: { name: name.trim(), phone, email: email.trim() || undefined },
      payMode: pay,
    });
    go(`/confirm/${o.id}`);
  };

  const submit = () => {
    setTried(true);
    if (!valid) {
      document.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    if (pay === "online") setHandoff(true);
    else finish();
  };

  const field = "mt-1.5 w-full h-12 rounded-2xl border bg-white px-4 text-[16px] focus:outline-none focus:ring-2 focus:ring-jade";

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-28">
      <button onClick={() => go("/order")} className="text-[14px] font-semibold text-jade inline-flex items-center gap-1"><Icon name="back" className="w-4 h-4" /> {t("Menu")}</button>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl text-jade-dark">{t("Checkout")}</h1>

      <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="grid gap-5">
          {/* Pickup */}
          <section className="rounded-3xl bg-white shadow-card p-5 sm:p-6" aria-labelledby="pickup-h">
            <h2 id="pickup-h" className="font-semibold text-[18px] flex items-center gap-2"><Step n={1} /> {t("Pickup time")}</h2>
            <p className="mt-1 text-[14px] text-muted">In-store pickup at {RESTAURANT.address1}</p>
            <div className="mt-4 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Pickup timing">
              <Choice on={asap} disabled={!canAsap} onClick={() => setAsap(true)} title={t("ASAP")} sub={canAsap ? `About ${asapLabel()}` : "Unavailable while closed"} icon="clock" />
              <Choice on={!asap} onClick={() => setAsap(false)} title={t("Schedule")} sub="Pick a day & time" icon="store" />
            </div>
            {!asap && (
              <div className="mt-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
                  {days.map((d) => (
                    <button key={d.key} onClick={() => { setDayKey(d.key); setSlotKey(d.slots[0]?.key ?? ""); }} className={`shrink-0 h-11 px-4 rounded-full text-[14px] font-semibold ${d.key === day?.key ? "bg-ink text-paper" : "bg-rice"}`}>
                      {d.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-[208px] overflow-y-auto pr-1">
                  {day?.slots.map((s) => (
                    <button key={s.key} onClick={() => setSlotKey(s.key)} aria-pressed={s.key === slotKey} className={`h-11 rounded-xl text-[14px] font-medium tabular-nums border ${s.key === slotKey ? "bg-jade text-paper border-jade" : "bg-white border-line hover:border-muted/40"}`}>
                      {s.timeLabel}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[12px] text-muted">Closed Tuesdays. Last pickup 8:30 PM.</p>
              </div>
            )}
          </section>

          {/* Details */}
          <section className="rounded-3xl bg-white shadow-card p-5 sm:p-6" aria-labelledby="details-h">
            <h2 id="details-h" className="font-semibold text-[18px] flex items-center gap-2"><Step n={2} /> {t("Your details")}</h2>
            <p className="mt-1 text-[14px] text-muted">So the restaurant can call if there's a question. This demo stores it only in your browser.</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[14px] font-semibold">{t("Name")}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" aria-invalid={tried && errors.name} className={`${field} ${tried && errors.name ? "border-chili" : "border-line"}`} />
                {tried && errors.name && <span className="text-[13px] text-chili">Please enter a name for the order.</span>}
              </label>
              <label className="block">
                <span className="text-[14px] font-semibold">{t("Phone")}</span>
                <input value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} inputMode="tel" autoComplete="tel" placeholder="(813) 555-0123" aria-invalid={tried && errors.phone} className={`${field} ${tried && errors.phone ? "border-chili" : "border-line"}`} />
                {tried && errors.phone && <span className="text-[13px] text-chili">Enter a 10-digit phone number.</span>}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[14px] font-semibold">{t("Email (optional)")}</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="For a receipt" className={`${field} border-line`} />
              </label>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-3xl bg-white shadow-card p-5 sm:p-6" aria-labelledby="pay-h">
            <h2 id="pay-h" className="font-semibold text-[18px] flex items-center gap-2"><Step n={3} /> {t("Payment")}</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Payment method">
              <Choice on={pay === "online"} onClick={() => setPay("online")} title={t("Pay online")} sub="Card, on a secure payment page" icon="card" />
              <Choice on={pay === "pickup"} onClick={() => setPay("pickup")} title={t("Pay at pickup")} sub="Pay at the counter" icon="store" badge="Concept" />
            </div>
            {pay === "online" ? (
              <div className="mt-4 rounded-2xl bg-jade-soft/60 p-4 text-[14px]">
                <p className="font-semibold text-jade-dark">How this works in production</p>
                <p className="mt-1 text-muted">You'd be handed to the restaurant's own Clover checkout to pay by card. This site never sees card numbers. In this demo the handoff is simulated and nothing is charged.</p>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-turmeric-soft p-4 text-[14px]">
                <p className="font-semibold text-[#7A5208]">Not available on the restaurant's Clover page today</p>
                <p className="mt-1 text-[#6B4F1D]">On Nov 18, 2026 the restaurant's Clover checkout offered card or gift card only. Whether Clover can take unpaid pickup orders depends on the restaurant's Clover settings and must be confirmed with the owner before this is offered.</p>
              </div>
            )}

            {pay === "online" && (
              <div className="mt-5">
                <p className="text-[14px] font-semibold">{t("Tip")} <span className="font-normal text-muted">(optional, goes to the restaurant)</span></p>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {TIPS.map((p) => (
                    <button key={p} onClick={() => setTipPct(p)} aria-pressed={tipPct === p} className={`h-12 rounded-xl text-[14px] font-semibold border ${tipPct === p ? "bg-ink text-paper border-ink" : "bg-white border-line"}`}>
                      {p === 0 ? t("No tip") : `${Math.round(p * 100)}%`}
                      {p > 0 && <span className={`block text-[11px] font-normal ${tipPct === p ? "text-paper/70" : "text-muted"}`}>{usd(round2(subtotal * p))}</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Summary */}
        <aside className="rounded-3xl bg-white shadow-card p-5 sm:p-6 lg:sticky lg:top-24" aria-labelledby="sum-h">
          <div className="flex items-center justify-between">
            <h2 id="sum-h" className="font-semibold text-[18px]">{t("Review order")}</h2>
            <button onClick={() => setCartOpen(true)} className="text-[14px] font-semibold text-jade">Edit</button>
          </div>
          <ul className="mt-3 divide-y divide-line">
            {cart.map((l) => {
              const it = findItem(l.itemId)!;
              const opts = optionLabels(l.choices);
              return (
                <li key={l.lineId} className="py-3 flex gap-3 text-[14px]">
                  <span className="w-7 h-7 rounded-lg bg-rice grid place-items-center font-semibold shrink-0">{l.qty}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold">{it.nameVi}</span>
                    {opts.length > 0 && <span className="block text-muted text-[13px]">{opts.join(" · ")}</span>}
                    {l.note && <span className="block text-muted text-[13px] italic">“{l.note}”</span>}
                  </span>
                  <span className="tabular-nums">{usd(lineUnitPrice(it, l.choices) * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-3 border-t border-line pt-3 grid gap-1.5 text-[15px]">
            <Row k={t("Subtotal")} v={usd(subtotal)} />
            <Row k={`${t("Tax")} (7.5%)`} v={usd(tax)} />
            {pay === "online" && <Row k={t("Tip")} v={usd(tip)} />}
            <div className="flex justify-between pt-2 mt-1 border-t border-line text-[18px] font-semibold"><dt>{t("Total")}</dt><dd className="tabular-nums">{usd(total)}</dd></div>
          </dl>
          {pickupLabel && <p className="mt-3 text-[13px] text-muted flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4" /> {pickupLabel}</p>}
          <button onClick={submit} className="mt-5 w-full h-14 rounded-2xl bg-chili hover:bg-chili-dark text-paper font-semibold text-[16px]">
            {pay === "online" ? "Continue to payment (demo)" : t("Place demo order")}
          </button>
          <p className="mt-3 text-[12px] text-muted text-center">Demo only. No order is sent to the restaurant and no payment is taken.</p>
        </aside>
      </div>

      {handoff && <PaymentHandoff total={total} onCancel={() => setHandoff(false)} onPaid={finish} />}
    </div>
  );
}

function PaymentHandoff({ total, onCancel, onPaid }: { total: number; onCancel: () => void; onPaid: () => void }) {
  const [step, setStep] = useState<"redirect" | "page">("redirect");
  useEffect(() => { const id = window.setTimeout(() => setStep("page"), 1100); return () => window.clearTimeout(id); }, []);
  return (
    <>
      <div className="fixed inset-0 z-40 bg-ink/60" aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-labelledby="pay-title" className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-md rounded-3xl bg-white shadow-lift overflow-hidden">
        <div className="bg-[repeating-linear-gradient(45deg,#EA9F2F,#EA9F2F_10px,#2B2420_10px,#2B2420_20px)] h-2" />
        <div className="p-6">
          <p className="inline-flex rounded bg-turmeric px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">Simulated payment page</p>
          {step === "redirect" ? (
            <div className="py-10 text-center">
              <div className="mx-auto w-10 h-10 rounded-full border-4 border-jade-soft border-t-jade animate-spin" />
              <p className="mt-4 font-semibold" id="pay-title">Handing off to secure checkout…</p>
              <p className="mt-1 text-[13px] text-muted">In production: the restaurant's Clover-hosted checkout.</p>
            </div>
          ) : (
            <>
              <h2 id="pay-title" className="mt-3 font-display text-2xl text-jade-dark">Pay {usd(total)}</h2>
              <p className="mt-2 text-[14px] text-muted">This is where the customer would enter a card on the payment provider's secure page. This demo deliberately has <strong>no card fields</strong> and charges nothing.</p>
              <div className="mt-4 rounded-2xl border border-dashed border-line p-4 text-[13px] text-muted grid gap-2">
                <div className="h-10 rounded-xl bg-rice" aria-hidden="true" />
                <div className="grid grid-cols-2 gap-2"><div className="h-10 rounded-xl bg-rice" aria-hidden="true" /><div className="h-10 rounded-xl bg-rice" aria-hidden="true" /></div>
                <span>Card form placeholder (not interactive)</span>
              </div>
              <button onClick={onPaid} className="mt-5 w-full h-14 rounded-2xl bg-jade hover:bg-jade-dark text-paper font-semibold">Simulate successful payment</button>
              <button onClick={onCancel} className="mt-2 w-full h-12 rounded-2xl text-[15px] font-semibold text-muted hover:bg-rice">Cancel</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Step({ n }: { n: number }) {
  return <span className="w-7 h-7 rounded-full bg-jade text-paper text-[14px] grid place-items-center">{n}</span>;
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><dt className="text-muted">{k}</dt><dd className="tabular-nums">{v}</dd></div>;
}
function Choice({ on, onClick, title, sub, icon, disabled, badge }: { on: boolean; onClick: () => void; title: string; sub: string; icon: string; disabled?: boolean; badge?: string }) {
  return (
    <button role="radio" aria-checked={on} disabled={disabled} onClick={onClick} className={`relative text-left rounded-2xl border-2 p-4 min-h-[84px] transition disabled:opacity-45 disabled:cursor-not-allowed ${on ? "border-jade bg-jade-soft/50" : "border-line bg-white hover:border-muted/40"}`}>
      {badge && <span className="absolute right-3 top-3 rounded-full bg-turmeric-soft text-[#7A5208] text-[11px] font-bold px-2 py-0.5">{badge}</span>}
      <Icon name={icon} className={`w-6 h-6 ${on ? "text-jade" : "text-muted"}`} />
      <span className="mt-2 block font-semibold text-[15px]">{title}</span>
      <span className="block text-[13px] text-muted">{sub}</span>
    </button>
  );
}
function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
