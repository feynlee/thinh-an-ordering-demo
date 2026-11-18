import { RESTAURANT } from "../data/restaurant";
import { EXCLUDED_NOTES } from "../data/menu";

export function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-20">
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-chili">About this demo</p>
      <h1 className="font-display text-4xl sm:text-5xl text-jade-dark mt-1">An unofficial concept, made to show the owner</h1>
      <div className="mt-6 grid gap-5 text-[16px] leading-relaxed">
        <p>
          This site is an <strong>independent, unofficial proposal</strong> made by a regular customer. It is not affiliated with,
          endorsed by, or operated by {RESTAURANT.nameAscii}, Clover, DoorDash, or Google. Nothing you do here reaches the restaurant.
        </p>
        <ul className="rounded-3xl bg-white shadow-card p-6 grid gap-3 text-[15px]">
          <li>✔︎ <strong>No real orders.</strong> “Orders” are saved only in your browser (localStorage) and are numbered <code>DEMO-xxxx</code>.</li>
          <li>✔︎ <strong>No payments.</strong> The payment step is a simulated handoff with no card fields.</li>
          <li>✔︎ <strong>No Clover connection.</strong> The site makes no calls to Clover or any backend, and holds no credentials.</li>
          <li>✔︎ <strong>No borrowed photos.</strong> Dish images are original illustrations drawn for this demo, and the storefront is an illustration too. A real photo appears only when it is credited on the dish and we have the right to use it. The colors echo the storefront sign; the bowl mark is a placeholder, not the restaurant's logo.</li>
          <li>✔︎ <strong>Not indexed.</strong> Pages are marked <code>noindex</code> so customers don't find this instead of the real ordering page.</li>
        </ul>
        <h2 className="font-display text-2xl text-jade-dark mt-4">Where the information comes from</h2>
        <p className="text-[15px]">
          Dish numbers, names, descriptions and prices are a 25-item sample copied from the restaurant's public Clover Online Ordering page
          (<a className="underline" href={RESTAURANT.cloverOrderingUrl} target="_blank" rel="noreferrer">thinhankitchentofutampa.cloveronline.com</a>) on Nov 18, 2026, and
          cross-checked against its order.online page where possible. Vietnamese spellings with tone marks are our own rendering and need the owner's review.
          Hours come from Google Maps and the Clover page. Tax is set to 7.5%, matching what Clover charged at checkout.
        </p>
        <ul className="text-[14px] text-muted list-disc pl-5">
          {EXCLUDED_NOTES.map((n) => <li key={n}>{n}</li>)}
        </ul>
        <h2 className="font-display text-2xl text-jade-dark mt-4">What a real launch would use</h2>
        <p className="text-[15px]">
          The restaurant already has Clover. The recommended production setup keeps this friendly website for discovery and menu browsing, and sends
          customers to the restaurant's own Clover ordering page to pay. Clover then handles the live menu, payment, kitchen printing and order records,
          and the restaurant keeps all accounts and all proceeds.
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <a href="#/order" className="h-12 px-6 rounded-full bg-chili text-paper font-semibold inline-flex items-center">Try ordering</a>
          <a href="#/kitchen" className="h-12 px-6 rounded-full border border-line font-semibold inline-flex items-center hover:bg-rice">See the kitchen view</a>
        </div>
      </div>
    </div>
  );
}
