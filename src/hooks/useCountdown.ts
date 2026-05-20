import { useEffect, useState } from "react";

export interface CountdownParts {
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

function getParts(target: Date): CountdownParts {
  const diff = Math.max(0, target.getTime() - Date.now());
  const finished = diff <= 0;

  return {
    hours: Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    finished,
  };
}

export function useCountdown(target: Date): CountdownParts {
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const tick = () => setParts(getParts(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return parts;
}

export function formatCountdown(parts: CountdownParts): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(parts.hours)}ч ${pad(parts.minutes)}м ${pad(parts.seconds)}с`;
}
