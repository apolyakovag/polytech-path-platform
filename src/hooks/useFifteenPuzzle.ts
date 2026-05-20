import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FIFTEEN_MAX_IMPULSES_PER_DAY,
  FIFTEEN_MAX_LIVES,
  FIFTEEN_PAIR_COUNT,
  FIFTEEN_PLAYED_DATE_KEY,
  FIFTEEN_STORAGE_KEY,
  LEADER_CARDS,
  MOCK_FIFTEEN_HISTORY,
  type FifteenPuzzleResult,
} from "@/data/fifteenPuzzle";

export interface GameCard {
  uid: string;
  pairId: string;
  label: string;
  subtitle: string;
  accent: string;
  flipped: boolean;
  matched: boolean;
}

type GamePhase = "ready" | "playing" | "finished";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildDeck(): GameCard[] {
  const pairs = LEADER_CARDS.flatMap((leader) => [
    { ...leader, uid: `${leader.pairId}-a` },
    { ...leader, uid: `${leader.pairId}-b` },
  ]);
  return shuffle(pairs).map((card) => ({
    uid: card.uid,
    pairId: card.pairId,
    label: card.label,
    subtitle: card.subtitle,
    accent: card.accent,
    flipped: false,
    matched: false,
  }));
}

function loadHistory(): FifteenPuzzleResult[] {
  try {
    const raw = localStorage.getItem(FIFTEEN_STORAGE_KEY);
    if (!raw) return [...MOCK_FIFTEEN_HISTORY];
    const parsed = JSON.parse(raw) as FifteenPuzzleResult[];
    return parsed.length > 0 ? parsed : [...MOCK_FIFTEEN_HISTORY];
  } catch {
    return [...MOCK_FIFTEEN_HISTORY];
  }
}

function saveHistory(history: FifteenPuzzleResult[]) {
  localStorage.setItem(FIFTEEN_STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
}

function hasPlayedToday(): boolean {
  return localStorage.getItem(FIFTEEN_PLAYED_DATE_KEY) === todayKey();
}

function markPlayedToday() {
  localStorage.setItem(FIFTEEN_PLAYED_DATE_KEY, todayKey());
}

export function useFifteenPuzzle() {
  const [history, setHistory] = useState<FifteenPuzzleResult[]>(loadHistory);
  const [playedToday, setPlayedToday] = useState(hasPlayedToday);
  const [phase, setPhase] = useState<GamePhase>("ready");
  const [cards, setCards] = useState<GameCard[]>([]);
  const [lives, setLives] = useState(FIFTEEN_MAX_LIVES);
  const [impulses, setImpulses] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [pairsFound, setPairsFound] = useState(0);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [lockBoard, setLockBoard] = useState(false);
  const startedAt = useRef<number | null>(null);
  const resolveTimer = useRef<number | null>(null);

  const lastResult = history[0] ?? null;
  const canPlayToday = !playedToday;

  const persistResult = useCallback(
    (
      outcome: FifteenPuzzleResult["outcome"],
      finalPairs: number,
      finalLives: number,
      finalImpulses: number,
      finalMistakes: number
    ) => {
      const durationSec = startedAt.current
        ? Math.round((Date.now() - startedAt.current) / 1000)
        : 0;

      const result: FifteenPuzzleResult = {
        id: crypto.randomUUID(),
        playedAt: new Date().toISOString(),
        outcome,
        pairsFound: finalPairs,
        totalPairs: FIFTEEN_PAIR_COUNT,
        impulsesEarned: finalImpulses,
        mistakes: finalMistakes,
        durationSec,
        livesLeft: finalLives,
      };

      setHistory((prev) => {
        const next = [result, ...prev].slice(0, 10);
        saveHistory(next);
        return next;
      });
      markPlayedToday();
      setPlayedToday(true);
      setPhase("finished");
    },
    []
  );

  const startGame = useCallback(() => {
    if (!canPlayToday) return;
    if (resolveTimer.current) window.clearTimeout(resolveTimer.current);
    setCards(buildDeck());
    setLives(FIFTEEN_MAX_LIVES);
    setImpulses(0);
    setMistakes(0);
    setPairsFound(0);
    setFlippedIds([]);
    setLockBoard(false);
    startedAt.current = Date.now();
    setPhase("playing");
  }, [canPlayToday]);

  const handleCardClick = useCallback(
    (uid: string) => {
      if (phase !== "playing" || lockBoard) return;

      const card = cards.find((c) => c.uid === uid);
      if (!card || card.matched || card.flipped) return;

      const nextFlipped = [...flippedIds, uid];
      const nextCards = cards.map((c) =>
        c.uid === uid ? { ...c, flipped: true } : c
      );
      setCards(nextCards);
      setFlippedIds(nextFlipped);

      if (nextFlipped.length < 2) return;

      setLockBoard(true);
      const [firstId, secondId] = nextFlipped;
      const first = nextCards.find((c) => c.uid === firstId)!;
      const second = nextCards.find((c) => c.uid === secondId)!;
      const isMatch = first.pairId === second.pairId;

      resolveTimer.current = window.setTimeout(() => {
        if (isMatch) {
          const matchedCount = pairsFound + 1;
          const newImpulses = Math.min(
            impulses + 1,
            FIFTEEN_MAX_IMPULSES_PER_DAY
          );
          setPairsFound(matchedCount);
          setImpulses(newImpulses);
          setCards((prev) =>
            prev.map((c) =>
              c.uid === firstId || c.uid === secondId
                ? { ...c, matched: true, flipped: true }
                : c
            )
          );
          setFlippedIds([]);
          setLockBoard(false);

          if (matchedCount >= FIFTEEN_PAIR_COUNT) {
            persistResult("win", matchedCount, lives, newImpulses, mistakes);
          }
        } else {
          const nextLives = lives - 1;
          const nextMistakes = mistakes + 1;
          setMistakes(nextMistakes);
          setLives(nextLives);
          setCards((prev) =>
            prev.map((c) =>
              c.uid === firstId || c.uid === secondId
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedIds([]);
          setLockBoard(false);

          if (nextLives <= 0) {
            persistResult("lose", pairsFound, 0, impulses, nextMistakes);
          }
        }
      }, 700);
    },
    [
      cards,
      flippedIds,
      impulses,
      lives,
      lockBoard,
      mistakes,
      pairsFound,
      persistResult,
      phase,
    ]
  );

  useEffect(() => {
    return () => {
      if (resolveTimer.current) window.clearTimeout(resolveTimer.current);
    };
  }, []);

  const stats = useMemo(
    () => ({
      lives,
      impulses,
      pairsFound,
      maxPairs: FIFTEEN_PAIR_COUNT,
      maxImpulses: FIFTEEN_MAX_IMPULSES_PER_DAY,
    }),
    [impulses, lives, pairsFound]
  );

  return {
    history,
    lastResult,
    canPlayToday,
    playedToday,
    phase,
    cards,
    stats,
    startGame,
    handleCardClick,
  };
}
