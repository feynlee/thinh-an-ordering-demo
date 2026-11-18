const PATHS: Record<string, string> = {
  bag: "M6 7h12l1 13H5L6 7zm3 0a3 3 0 0 1 6 0",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  search: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm9 2l-4.5-4.5",
  phone: "M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  clock: "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-14v5l3 2",
  leaf: "M5 19c0-8 6-14 14-14 0 8-6 14-14 14zm0 0l7-7",
  flame: "M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z",
  check: "M5 12l5 5L19 7",
  arrow: "M5 12h14m-6-6l6 6-6 6",
  back: "M19 12H5m6-6l-6 6 6 6",
  card: "M3 7h18v10H3zM3 10h18M7 14h4",
  store: "M4 10l1-5h14l1 5M5 10v9h14v-9M4 10a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0",
  edit: "M4 20h4L19 9l-4-4L4 16v4z",
  trash: "M5 7h14M9 7V4h6v3m-8 0l1 13h8l1-13",
  chef: "M7 14v6h10v-6M7 14a4 4 0 1 1 2-7.5 4 4 0 0 1 6 0A4 4 0 1 1 17 14z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-9h.01",
  facebook: "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z",
  info: "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-11v6m0-9h.01",
  bell: "M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2zm4 4h4",
  refresh: "M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5",
};

export function Icon({ name, className = "w-5 h-5" }: { name: keyof typeof PATHS | string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name] ?? ""} />
    </svg>
  );
}
