import { useState } from "react";
import { MENU, type MenuItem } from "../data/menu";
import { RESTAURANT } from "../data/restaurant";
import { Storefront, AwningTrim } from "../art/Storefront";
import { DishVisual } from "../components/DishVisual";
import { findItem } from "../data/menu";
import { DishCard } from "../components/DishCard";
import { ItemSheet } from "../components/ItemSheet";
import { Icon } from "../components/Icon";
import { useT } from "../lib/i18n";
import { openNow, todayHoursLabel, asapLabel } from "../lib/time";

export function Home() {
  const t = useT();
  const [open, setOpen] = useState<MenuItem | null>(null);
  const popular = MENU.filter((m) => m.popular).slice(0, 8);
  const isOpen = openNow();
  const pho = findItem("17-pho-dac-biet");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#FBEACB,transparent_60%),radial-gradient(ellipse_at_bottom_left,#DCEED8,transparent_55%)]" />
        <div className="mx-auto max-w-6xl px-4 pt-5 pb-12 md:pt-16 md:pb-20 grid md:grid-cols-[1.05fr_1fr] gap-6 md:gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-line px-3 py-1 text-[13px] font-medium">
              <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-jade" : "bg-chili"}`} />
              {isOpen ? `Open now · pickup from ${asapLabel()}` : "Closed now · schedule a pickup for later"}
            </p>
            <h1 className="mt-5 font-display text-[44px] leading-[1.02] sm:text-6xl md:text-[68px] font-semibold text-jade-dark tracking-tight">
              Your phở,<br /> <span className="italic font-normal text-chili">ready when</span> you are.
            </h1>
            <p className="mt-5 text-[17px] sm:text-lg text-muted max-w-md">
              Order ahead from {RESTAURANT.nameAscii} on West Waters Ave. Skip the phone call, choose a pickup time, and walk in to a hot bowl.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#/order" className="h-14 px-7 rounded-2xl bg-jade hover:bg-jade-dark text-paper font-semibold text-[17px] inline-flex items-center justify-center gap-2 shadow-card">
                {t("Order pickup")} <Icon name="arrow" />
              </a>
              <a href={RESTAURANT.phoneHref} className="h-14 px-6 rounded-2xl border border-line bg-white hover:bg-rice font-semibold inline-flex items-center justify-center gap-2">
                <Icon name="phone" /> {RESTAURANT.phone}
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-3 max-w-md text-center">
              {[
                ["143+", "numbered dishes"],
                ["~15 min", "ASAP pickup"],
                ["$0", "service fees"],
              ].map(([a, b]) => (
                <div key={b} className="rounded-2xl bg-white/80 border border-line py-3">
                  <dt className="font-display text-2xl text-chili">{a}</dt>
                  <dd className="text-[12px] text-muted">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative md:pb-8 order-first md:order-none">
            <div className="rounded-[28px] overflow-hidden shadow-lift ring-[6px] ring-white">
              <Storefront className="block w-full h-auto" />
            </div>
            <div className="hidden md:block absolute -left-8 bottom-0 w-[42%] rounded-2xl overflow-hidden shadow-lift ring-4 ring-white -rotate-3 bg-white">
              {pho && <DishVisual item={pho} className="w-full h-[96px] sm:h-[130px]" />}
              <p className="px-3 py-2 text-[12px] font-semibold leading-tight"><span className="text-chili">#17</span> Phở Đặc Biệt</p>
            </div>
            <p className="mt-2 md:mt-3 md:pl-[44%] text-right text-[11px] text-muted">Illustration of the storefront on W Waters Ave, drawn for this demo.</p>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[15px]">
          <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl hover:bg-rice p-2">
            <span className="w-10 h-10 rounded-full bg-jade-soft text-jade grid place-items-center"><Icon name="pin" /></span>
            <span><span className="block font-semibold">{RESTAURANT.address1}</span><span className="text-muted text-[13px]">{RESTAURANT.address2} · {t("Directions")}</span></span>
          </a>
          <div className="flex items-center gap-3 p-2">
            <span className="w-10 h-10 rounded-full bg-teal-soft text-teal-dark grid place-items-center"><Icon name="clock" /></span>
            <span><span className="block font-semibold">Today · {todayHoursLabel()}</span><span className="text-muted text-[13px]">Closed Tuesdays · online orders until 8:30 PM</span></span>
          </div>
          <a href={RESTAURANT.phoneHref} className="flex items-center gap-3 rounded-2xl hover:bg-rice p-2">
            <span className="w-10 h-10 rounded-full bg-chili-soft text-chili grid place-items-center"><Icon name="phone" /></span>
            <span><span className="block font-semibold">{RESTAURANT.phone}</span><span className="text-muted text-[13px]">Tap to call the restaurant</span></span>
          </a>
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-6xl px-4 mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-chili">{t("Popular")}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-jade-dark mt-1">Regulars' favorites</h2>
          </div>
          <a href="#/order" className="shrink-0 text-[15px] font-semibold text-jade inline-flex items-center gap-1">Full menu <Icon name="arrow" className="w-4 h-4" /></a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((m) => <DishCard key={m.id} item={m} onOpen={() => setOpen(m)} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 mt-16">
        <div className="rounded-[32px] bg-jade text-paper p-7 sm:p-10 grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Three taps to lunch</h2>
            <p className="mt-3 text-paper/80">No app to download and no account needed. The order goes straight to the restaurant's existing Clover system and kitchen printer.</p>
          </div>
          <ol className="grid sm:grid-cols-3 gap-4">
            {[
              ["1", "Pick your dishes", "Browse by number or name, in English or Vietnamese."],
              ["2", "Choose a time", "ASAP or schedule ahead, up to a week out."],
              ["3", "Walk in & pick up", "Pay online, or at the counter if the restaurant enables it."],
            ].map(([n, a, b]) => (
              <li key={n} className="rounded-2xl bg-white/10 p-5">
                <span className="w-9 h-9 rounded-full bg-leaf text-ink font-bold grid place-items-center">{n}</span>
                <p className="mt-3 font-semibold text-[17px]">{a}</p>
                <p className="mt-1 text-[14px] text-paper/75">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deli counter */}
      <section className="mx-auto max-w-6xl px-4 mt-16">
        <div className="relative rounded-[32px] overflow-hidden bg-wood text-paper">
          <div className="absolute inset-0 opacity-[.18] bg-[repeating-linear-gradient(90deg,transparent_0_46px,#000_46px_48px)]" aria-hidden="true" />
          <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-8 p-7 sm:p-10 items-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-leaf">Inside the store</p>
              <h2 className="font-display text-3xl sm:text-4xl mt-1">A kitchen and a deli counter</h2>
              <p className="mt-3 text-paper/85 max-w-md">
                Past the hot kitchen there's a long wooden counter of grab-and-go food: house-made tofu, packed meals, snacks and desserts.
                Hot dishes can be ordered ahead here. Counter items are picked up in the store.
              </p>
              <p className="mt-4 text-[12px] text-paper/70">Based on public photos of the store. The owner would confirm what's on the counter and whether any of it can be ordered online.</p>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {[
                ["Đậu hũ", "Fresh tofu, made in-house"],
                ["Món ăn sẵn", "Ready-made meals to go"],
                ["Chè", "Sweet soups & desserts"],
                ["Bánh", "Snacks & rice cakes"],
              ].map(([vi, en]) => (
                <li key={vi} className="rounded-2xl bg-paper text-ink p-4 shadow-card">
                  <p className="font-display text-xl text-chili">{vi}</p>
                  <p className="text-[13px] text-muted mt-0.5">{en}</p>
                </li>
              ))}
            </ul>
          </div>
          <AwningTrim id="awn-deli" />
        </div>
      </section>

      {/* Story + catering */}
      <section className="mx-auto max-w-6xl px-4 mt-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-[28px] bg-white shadow-card p-7 sm:p-9">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-chili">The kitchen</p>
          <h2 className="font-display text-3xl text-jade-dark mt-1">Phở, bánh mì, and tofu made in-house</h2>
          <p className="mt-3 text-muted">
            A neighborhood Vietnamese kitchen in Town ’n’ Country with a long, numbered menu: phở and noodle soups, vermicelli bowls,
            broken-rice plates, bánh mì, milk teas, smoothies and chè. The restaurant also makes its own tofu, and its vegetarian section
            covers phở, bún, rice plates and bánh mì.
          </p>
          <p className="mt-3 text-[13px] text-muted">Placeholder copy. The owner would write or approve the real story.</p>
        </div>
        <div className="rounded-[28px] bg-teal-soft p-7 sm:p-9 flex flex-col">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-teal-dark">Catering & large orders</p>
          <h2 className="font-display text-3xl text-jade-dark mt-1">Feeding a crowd?</h2>
          <p className="mt-3 text-muted">The restaurant's menu lists catering by the pound (BBQ pork, grilled beef short ribs, roasted Cornish hen) and whole roasted duck. Call ahead for party trays.</p>
          <div className="mt-auto pt-5 flex flex-wrap gap-3">
            <a href={RESTAURANT.phoneHref} className="h-12 px-5 rounded-2xl bg-teal-dark text-paper font-semibold inline-flex items-center gap-2"><Icon name="phone" /> Call about catering</a>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="mx-auto max-w-6xl px-4 mt-16 grid md:grid-cols-[1.2fr_1fr] gap-6">
        <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer" className="relative rounded-[28px] overflow-hidden min-h-[260px] bg-[#E8E1D2] block group" aria-label="Open directions in Google Maps">
          <MapArt />
          <span className="absolute left-5 bottom-5 rounded-2xl bg-white shadow-lift px-4 py-3">
            <span className="block font-semibold">{RESTAURANT.address1}</span>
            <span className="block text-[13px] text-muted">{RESTAURANT.address2}</span>
            <span className="mt-1 inline-flex items-center gap-1 text-[14px] font-semibold text-jade">{t("Directions")} <Icon name="arrow" className="w-4 h-4" /></span>
          </span>
        </a>
        <div className="rounded-[28px] bg-white shadow-card p-7">
          <h2 className="font-display text-3xl text-jade-dark">{t("Hours")}</h2>
          <table className="mt-4 w-full text-[15px]">
            <tbody>
              {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                const h = RESTAURANT.hours[d];
                return (
                  <tr key={d} className="border-b border-line last:border-0">
                    <td className="py-2">{h.label}</td>
                    <td className={`py-2 text-right tabular-nums ${h.open ? "" : "text-chili font-semibold"}`}>{h.open ? "9:00 AM – 9:00 PM" : t("Closed")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-3 text-[13px] text-muted">Online pickup orders are accepted until 8:30 PM.</p>
          <div className="mt-5 flex gap-2">
            <a href={RESTAURANT.instagram} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-line grid place-items-center hover:bg-rice" aria-label="Instagram"><Icon name="instagram" /></a>
            <a href={RESTAURANT.facebook} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-line grid place-items-center hover:bg-rice" aria-label="Facebook"><Icon name="facebook" /></a>
          </div>
        </div>
      </section>

      {open && <ItemSheet item={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function MapArt() {
  return (
    <svg viewBox="0 0 600 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="320" fill="#EDE6D6" />
      <g fill="#E1D8C4">{Array.from({ length: 24 }).map((_, i) => <rect key={i} x={(i % 6) * 104 + 8} y={Math.floor(i / 6) * 84 + 8} width="88" height="66" rx="8" />)}</g>
      <rect x="0" y="140" width="600" height="26" fill="#FFFFFF" />
      <rect x="0" y="151" width="600" height="3" fill="#F2C14E" />
      <rect x="300" y="0" width="16" height="320" fill="#FFFFFF" />
      <rect x="470" y="0" width="12" height="320" fill="#FFFFFF" />
      <text x="330" y="133" fontSize="13" fill="#6E5D4F" fontFamily="Be Vietnam Pro, sans-serif">W Waters Ave</text>
      <circle cx="240" cy="182" r="40" fill="#CF2229" opacity=".12" />
      <path d="M240 150c-14 0-24 10-24 24 0 18 24 38 24 38s24-20 24-38c0-14-10-24-24-24z" fill="#CF2229" />
      <circle cx="240" cy="174" r="8" fill="#FBF6EA" />
    </svg>
  );
}
