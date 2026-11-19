# Thịnh An Kitchen & Tofu — pickup ordering concept (demo)

> **Independent, unofficial concept.** Not affiliated with, endorsed by, or operated by Thinh An Kitchen & Tofu, Clover, DoorDash or Google.
> **No real orders, no payments, no Clover connection.** Every "order" lives only in the visitor's browser and is numbered `DEMO-xxxx`.

A mobile-first proposal demo showing how regular customers could order pickup directly, using the restaurant's existing Clover setup.

## What's inside

| Route | What it shows |
| --- | --- |
| `#/` | Home: hero, popular dishes, hours, click-to-call, directions, catering |
| `#/order` | Menu: category chips, accent-insensitive search (`pho` finds `Phở`, `18` finds #18), vegetarian filter, dish sheet with modifiers |
| `#/checkout` | Pickup time (ASAP or 15-minute slots from real ordering hours, Tuesday closed), contact form, **Pay online** (simulated hosted-checkout handoff, no card fields) or **Pay at pickup** (labeled as a concept) |
| `#/confirm/DEMO-xxxx` | Simulated confirmation with live status |
| `#/kitchen` | Simulated staff board: New → Preparing → Ready → Completed. Open it in a second tab: status changes sync to the customer's confirmation page. |
| `#/about` | Disclaimers and data sources |

Also: English / Tiếng Việt toggle for the interface (draft translation), cart saved in `localStorage`, keyboard and screen-reader friendly dialogs, `noindex` so search engines don't confuse it with the real ordering page.

## Data

- `src/data/menu.ts` — 25 hand-curated dishes with detailed options; `src/data/fullMenu.ts` adds the rest of the Clover menu (178 items in total; beer, wine and $0.00 items left out). Numbers, names, descriptions and prices copied from the restaurant's public Clover Online Ordering page on 2026-11-18, cross-checked with order.online. Each item carries `sourceUrl`, `lastChecked` and per-field `verification` flags. Vietnamese tone-mark spellings are editorial and need owner review.
- `docs/menu-sample.json` — the same dataset as JSON (`npm run menu:json` regenerates it).
- `src/data/restaurant.ts` — address, phone, hours, tax rate (7.5%, matching Clover checkout), with notes on where each came from.
- In production, Clover inventory is the source of truth.

## Images

All dish pictures are original SVG illustrations in `src/art/DishArt.tsx`, drawn for this demo. They are placeholders, not photos of the restaurant's food. The round logo mark is a placeholder, not the restaurant's logo. Fonts (Fraunces, Be Vietnam Pro) are SIL Open Font License, bundled via Fontsource.

## Run locally

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (public repo for free Pages).
2. Every push to `main` builds the site and publishes it to the `gh-pages` branch (`.github/workflows/deploy.yml`). Pages serves that branch: **Settings → Pages → Source: Deploy from a branch → gh-pages / (root)**.
3. Push to `main`. `.github/workflows/deploy.yml` builds and publishes `dist/`.
4. The site appears at `https://<user>.github.io/<repo>/`. Routes use `#/…`, so no server rewrites are needed. `vite.config.ts` uses a relative `base`, so any repo name works.

## Going to production

Replace the simulated cart/checkout with "Order pickup" links to the restaurant's Clover ordering page, swap illustrations for the owner's photos, remove the demo banner and `noindex`, and host under the restaurant's own account and domain. Do **not** put Clover API keys in this frontend: GitHub Pages cannot keep secrets. A custom Clover API integration would need a separate secure backend.

## Look and feel

The palette comes from the storefront: stucco cream, the maroon sign panel with green and orange lettering,
green striped awnings, and the wood deli counter (`tailwind.config.js`). The storefront in the hero is an original SVG
(`src/art/Storefront.tsx`), not a photo or the restaurant's logo.

## Dish photos

`src/data/photos.ts` maps menu items to photos from the restaurant's public Google Maps listing (collected 2026-11-19).
Most are studio shots posted by the business account; the rest are customer photos, matched to a dish by how it looks.
They are hotlinked and credited on each dish, not copied into this repo. If one stops loading, the dish falls back to its illustration.
Before any public launch, replace them with photos the owner provides or approves.
