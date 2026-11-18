/**
 * Public restaurant facts, as verified on 2026-11-18. See docs/research-report.md for sources.
 * Recheck everything before any production launch.
 */
export const RESTAURANT = {
  name: "Thịnh An Kitchen & Tofu",
  nameAscii: "Thinh An Kitchen & Tofu",
  tagline: "Phở, bánh mì, house-made tofu & Vietnamese desserts",
  address1: "8104 W Waters Ave",
  address2: "Tampa, FL 33615",
  phone: "(813) 249-2222",
  phoneHref: "tel:+18132492222",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Thinh An Kitchen & Tofu, 8104 W Waters Ave, Tampa, FL 33615"),
  instagram: "https://www.instagram.com/thinhankitchentofu/",
  facebook: "https://www.facebook.com/thinhankitchentofu/",
  /** The restaurant's existing, live Clover Online Ordering page (observed accepting pickup orders 2026-11-18). */
  cloverOrderingUrl: "https://thinhankitchentofutampa.cloveronline.com/menu/all",
  /** Taxes observed at Clover checkout: $1.04 on a $13.90 item, consistent with Hillsborough County's 7.5%. */
  taxRate: 0.075,
  /**
   * Dining-room hours (Google Maps / Yelp): Mon & Wed–Sun 9 AM–9 PM, Tue closed.
   * Online ordering hours (Clover page): 9:00 AM – 8:30 PM, Tue closed.
   * The demo uses the online ordering hours for pickup slots.
   */
  hours: [
    { day: 0, label: "Sunday", open: "09:00", close: "21:00", lastOrder: "20:30" },
    { day: 1, label: "Monday", open: "09:00", close: "21:00", lastOrder: "20:30" },
    { day: 2, label: "Tuesday", open: null, close: null, lastOrder: null },
    { day: 3, label: "Wednesday", open: "09:00", close: "21:00", lastOrder: "20:30" },
    { day: 4, label: "Thursday", open: "09:00", close: "21:00", lastOrder: "20:30" },
    { day: 5, label: "Friday", open: "09:00", close: "21:00", lastOrder: "20:30" },
    { day: 6, label: "Saturday", open: "09:00", close: "21:00", lastOrder: "20:30" },
  ] as { day: number; label: string; open: string | null; close: string | null; lastOrder: string | null }[],
  timezone: "America/New_York",
  /** ASAP estimate shown by the restaurant's Clover cart on 2026-11-18. */
  asapMinutes: 15,
};
