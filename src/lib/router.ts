import { useEffect, useState } from "react";

/** Tiny hash router: GitHub Pages serves one static file, so routes live after "#". */
export function useRoute() {
  const get = () => (window.location.hash.replace(/^#/, "") || "/").split("?")[0];
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const on = () => { setRoute(get()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
export const go = (path: string) => { window.location.hash = path; };
