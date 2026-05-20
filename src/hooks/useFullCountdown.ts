import { useEffect, useState } from "react";

export interface FullCountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

function getParts(target: Date): FullCountdownParts {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    finished: diff <= 0,
  };
}

export function useFullCountdown(target: Date): FullCountdownParts {
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const tick = () => setParts(getParts(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return parts;
}

export function formatFullCountdown(parts: FullCountdownParts): string {
  return `${parts.days} д: ${parts.hours}ч: ${parts.minutes}м: ${parts.seconds}с`;
}
