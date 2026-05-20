import { useEffect, useState } from "react";

export const PATH_GAME = {
  dreamTeam: "dream-team",
  fifteen: "fifteen",
} as const;

export type PathGameId = (typeof PATH_GAME)[keyof typeof PATH_GAME];

export function pathHref(): string {
  return "#/path";
}

export function pathGameHref(game: PathGameId): string {
  return `#/path/${game}`;
}

function parsePathSub(hash: string): string | null {
  const match = hash.match(/^#\/?path\/([^/?]+)/);
  return match?.[1] ?? null;
}

export function usePathSubRoute(): string | null {
  const [sub, setSub] = useState(() => parsePathSub(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setSub(parsePathSub(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return sub;
}
