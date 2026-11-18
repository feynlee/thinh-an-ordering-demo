import { RESTAURANT } from "../data/restaurant";

/** Wall-clock parts in the restaurant's time zone, whatever the viewer's zone is. */
export function nyParts(date = new Date()) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: RESTAURANT.timezone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "short",
  });
  const p = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]));
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, min: +p.minute, dow };
}

const toMin = (hhmm: string) => +hhmm.slice(0, 2) * 60 + +hhmm.slice(3, 5);
export const fmtClock = (mins: number) => {
  const h = Math.floor(mins / 60), m = mins % 60;
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`;
};

export interface Slot { key: string; dayLabel: string; timeLabel: string; minutes: number; dayOffset: number }
export interface SlotDay { key: string; label: string; slots: Slot[] }

/** 15-minute pickup slots for today + next 6 days, from online-ordering hours. */
export function pickupDays(now = new Date()): SlotDay[] {
  const n = nyParts(now);
  const nowMin = n.h * 60 + n.min;
  const days: SlotDay[] = [];
  for (let off = 0; off < 7; off++) {
    const dow = (n.dow + off) % 7;
    const h = RESTAURANT.hours[dow];
    if (!h.open || !h.lastOrder) continue;
    const date = new Date(Date.UTC(n.y, n.m - 1, n.d + off, 12));
    const label =
      off === 0 ? "Today" : off === 1 ? "Tomorrow" :
      date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
    const key = date.toISOString().slice(0, 10);
    const start = toMin(h.open) + 15; // first pickup 15 min after opening
    const end = toMin(h.lastOrder);
    const slots: Slot[] = [];
    for (let t = start; t <= end; t += 15) {
      if (off === 0 && t < nowMin + RESTAURANT.asapMinutes + 5) continue;
      slots.push({ key: `${key}T${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`, dayLabel: label, timeLabel: fmtClock(t), minutes: t, dayOffset: off });
    }
    if (slots.length) days.push({ key, label, slots });
  }
  return days;
}

/** Is online ordering open right now (restaurant time)? */
export function openNow(now = new Date()) {
  const n = nyParts(now);
  const h = RESTAURANT.hours[n.dow];
  if (!h.open || !h.lastOrder) return false;
  const t = n.h * 60 + n.min;
  return t >= toMin(h.open) && t <= toMin(h.lastOrder);
}

export function todayHoursLabel(now = new Date()) {
  const n = nyParts(now);
  const h = RESTAURANT.hours[n.dow];
  if (!h.open || !h.close) return "Closed today";
  return `${fmtClock(toMin(h.open))} – ${fmtClock(toMin(h.close))}`;
}

export function asapLabel(now = new Date()) {
  const n = nyParts(now);
  return fmtClock(n.h * 60 + n.min + RESTAURANT.asapMinutes + 5);
}
