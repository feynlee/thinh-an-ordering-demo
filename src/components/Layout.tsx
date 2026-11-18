import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import { useT } from "../lib/i18n";
import { RESTAURANT } from "../data/restaurant";
import { usd } from "../lib/money";
import { openNow, todayHoursLabel } from "../lib/time";
import { CartDrawer } from "./CartDrawer";
import { Icon } from "./Icon";
import { AwningTrim } from "../art/Storefront";

export function DemoBanner() {
  return (
    <div className="bg-ink text-paper text-[13px] leading-snug">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-2">
        <span className="shrink-0 rounded bg-turmeric px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">Demo</span>
        <p className="min-w-0">
          Independent, unofficial concept. Not affiliated with or approved by the restaurant.{" "}
          <span className="hidden sm:inline">No real orders or payments are made.</span>{" "}
          <a href="#/about" className="underline underline-offset-2 hover:text-turmeric">Learn more</a>
        </p>
      </div>
    </div>
  );
}

export function Layout({ children, route }: { children: ReactNode; route: string }) {
  const { count, subtotal, setCartOpen, lang, setLang, toast } = useStore();
  const t = useT();
  const open = openNow();
  const hideBar = route === "/checkout" || route.startsWith("/confirm") || route === "/kitchen";

  return (
    <div className="min-h-screen flex flex-col">
      <DemoBanner />
      <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-3">
          <a href="#/" className="flex items-center gap-2.5 min-w-0" aria-label={`${RESTAURANT.name} home`}>
            <Logo size={38} />
            <span className="min-w-0 leading-none">
              <span className="block font-display text-[21px] font-extrabold text-jade truncate">Thịnh An</span>
              <span className="block mt-0.5 font-display text-[13px] font-extrabold text-chili">Kitchen & Tofu</span>
            </span>
          </a>
          <nav className="ml-auto hidden md:flex items-center gap-1 text-[15px]">
            <a href="#/order" className={`px-3 py-2 rounded-full hover:bg-rice ${route.startsWith("/order") ? "font-semibold text-jade-dark" : ""}`}>{t("Menu")}</a>
            <a href="#/kitchen" className={`px-3 py-2 rounded-full hover:bg-rice ${route === "/kitchen" ? "font-semibold text-jade-dark" : ""}`}>{t("Kitchen view")}</a>
            <a href="#/about" className={`px-3 py-2 rounded-full hover:bg-rice ${route === "/about" ? "font-semibold text-jade-dark" : ""}`}>{t("About this demo")}</a>
          </nav>
          <div className="ml-auto md:ml-2 flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "vi" : "en")}
              className="h-10 rounded-full border border-line px-3 text-[13px] font-semibold hover:bg-rice"
              aria-label={lang === "en" ? "Chuyển sang tiếng Việt" : "Switch to English"}
            >
              {lang === "en" ? "Tiếng Việt" : "English"}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative h-10 rounded-full bg-jade px-4 text-paper text-[14px] font-semibold flex items-center gap-2 hover:bg-jade-dark"
              aria-label={`${t("Your order")}: ${count} items`}
            >
              <Icon name="bag" className="w-5 h-5" />
              <span className="hidden sm:inline">{count ? usd(subtotal) : t("Your order")}</span>
              {count > 0 && <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] rounded-full bg-chili text-[12px] grid place-items-center px-1 ring-2 ring-paper">{count}</span>}
            </button>
          </div>
        </div>
        <AwningTrim id="awn-head" />
      </header>

      <main className="flex-1">{children}</main>

      {/* Mobile bottom bar */}
      {count > 0 && !hideBar && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-30 p-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <button onClick={() => setCartOpen(true)} className="w-full h-14 rounded-2xl bg-jade text-paper font-semibold shadow-lift flex items-center justify-between px-5">
            <span className="flex items-center gap-2"><Icon name="bag" className="w-5 h-5" /> {t("Your order")} · {count}</span>
            <span>{usd(subtotal)}</span>
          </button>
        </div>
      )}

      <footer className="mt-16 bg-stucco/50">
        <AwningTrim id="awn-foot" />
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-3 text-[14px]">
          <div>
            <p className="font-display text-xl text-jade-dark">{RESTAURANT.name}</p>
            <p className="mt-2 text-muted">{RESTAURANT.address1}<br />{RESTAURANT.address2}</p>
            <p className="mt-2"><a className="underline underline-offset-2" href={RESTAURANT.phoneHref}>{RESTAURANT.phone}</a></p>
          </div>
          <div>
            <p className="font-semibold">{t("Hours")}</p>
            <p className="mt-2 text-muted">Mon & Wed–Sun · 9 AM – 9 PM<br />Tuesday · {t("Closed")}</p>
            <p className="mt-1 text-muted">Online pickup orders until 8:30 PM</p>
            <p className={`mt-2 font-semibold ${open ? "text-jade" : "text-chili"}`}>{open ? `Open now · ${todayHoursLabel()}` : "Online ordering closed right now"}</p>
          </div>
          <div className="text-muted">
            <p className="font-semibold text-ink">About this page</p>
            <p className="mt-2">A proposal concept made by an independent developer and regular customer. Not affiliated with, endorsed by, or operated by {RESTAURANT.nameAscii}. Prices from the restaurant's public Clover menu, checked Nov 18, 2026. Dish images are original illustrations unless a photo is credited.</p>
          </div>
        </div>
      </footer>

      <CartDrawer />
      {toast && (
        <div role="status" className="fixed left-1/2 -translate-x-1/2 bottom-24 md:bottom-8 z-50 rounded-full bg-ink text-paper px-5 py-3 text-[14px] shadow-lift">
          {toast}
        </div>
      )}
    </div>
  );
}

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#E6D9BD" strokeWidth="2" />
      <path d="M11 34h42a21 17 0 0 1-42 0z" fill="#FFFFFF" stroke="#CF2229" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M16 40h32" stroke="#CF2229" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M27 31c-8-8-4-17 6-19c2 8-1 15-6 19z" fill="#23843D" />
      <path d="M27 31c1-6 3-10 6-15" stroke="#FFFFFF" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M46 12l-9 18M51 15l-11 16" stroke="#26231F" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
