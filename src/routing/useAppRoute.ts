import { useEffect, useState } from "react";
import { NAV_ITEMS, type NavItemId } from "@/data/homeContent";

function parseHash(hash: string): NavItemId {
  const id = hash.replace(/^#\/?/, "").split("/")[0].split("?")[0];
  if (NAV_ITEMS.some((item) => item.id === id)) {
    return id as NavItemId;
  }
  return "about";
}

export function useAppRoute(): NavItemId {
  const [route, setRoute] = useState<NavItemId>(() =>
    parseHash(window.location.hash)
  );

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) {
      window.location.hash = "#/about";
    }
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

export function navHref(id: NavItemId): string {
  return `#/${id}`;
}
