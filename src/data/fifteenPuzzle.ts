/** «Пятнашки» — memory 4×4, пары лидеров (документ «Сопровождение и удержание») */

export const FIFTEEN_GRID_SIZE = 4;
export const FIFTEEN_PAIR_COUNT = 8;
export const FIFTEEN_MAX_LIVES = 3;
export const FIFTEEN_MAX_IMPULSES_PER_DAY = FIFTEEN_PAIR_COUNT;

export const LEADER_CARDS = [
  { pairId: "gs", label: "ГС", subtitle: "Главный специалист", accent: "#2563EB" },
  { pairId: "vs", label: "ВС", subtitle: "Ведущий специалист", accent: "#0891B2" },
  { pairId: "spec", label: "Спец.", subtitle: "Специалист", accent: "#059669" },
  { pairId: "ms", label: "МС", subtitle: "Младший специалист", accent: "#7C3AED" },
  { pairId: "sp", label: "СП", subtitle: "Старший специалист", accent: "#EA580C" },
  { pairId: "hr", label: "HR", subtitle: "Куратор", accent: "#DB2777" },
  { pairId: "it", label: "IT", subtitle: "Инженер", accent: "#4F46E5" },
  { pairId: "pm", label: "PM", subtitle: "Руководитель", accent: "#CA8A04" },
] as const;

export type FifteenOutcome = "win" | "lose";

export interface FifteenPuzzleResult {
  id: string;
  playedAt: string;
  outcome: FifteenOutcome;
  pairsFound: number;
  totalPairs: number;
  impulsesEarned: number;
  mistakes: number;
  durationSec: number;
  livesLeft: number;
}

export const FIFTEEN_STORAGE_KEY = "alabuga-fifteen-puzzle-history";
export const FIFTEEN_PLAYED_DATE_KEY = "alabuga-fifteen-puzzle-played-date";

export const MOCK_FIFTEEN_HISTORY: FifteenPuzzleResult[] = [
  {
    id: "mock-1",
    playedAt: new Date(Date.now() - 86_400_000).toISOString(),
    outcome: "win",
    pairsFound: 8,
    totalPairs: 8,
    impulsesEarned: 8,
    mistakes: 2,
    durationSec: 94,
    livesLeft: 1,
  },
  {
    id: "mock-2",
    playedAt: new Date(Date.now() - 172_800_000).toISOString(),
    outcome: "lose",
    pairsFound: 5,
    totalPairs: 8,
    impulsesEarned: 5,
    mistakes: 3,
    durationSec: 120,
    livesLeft: 0,
  },
];
