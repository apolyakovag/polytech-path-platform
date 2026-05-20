/** «Команда мечты» — модули-пирамиды лидеров */

export type LeaderGrade = "gs" | "vs" | "spec" | "ms" | "sp";

export interface LeaderGradeInfo {
  id: LeaderGrade;
  label: string;
  fullName: string;
  accent: string;
  packWeight: number;
}

export const LEADER_GRADES: LeaderGradeInfo[] = [
  {
    id: "gs",
    label: "ГС",
    fullName: "Главный специалист",
    accent: "#2563EB",
    packWeight: 5,
  },
  {
    id: "vs",
    label: "ВС",
    fullName: "Ведущий специалист",
    accent: "#0891B2",
    packWeight: 12,
  },
  {
    id: "spec",
    label: "Спец.",
    fullName: "Специалист",
    accent: "#059669",
    packWeight: 22,
  },
  {
    id: "ms",
    label: "МС",
    fullName: "Младший специалист",
    accent: "#7C3AED",
    packWeight: 48,
  },
  {
    id: "sp",
    label: "СП",
    fullName: "Старший специалист",
    accent: "#EA580C",
    packWeight: 3,
  },
];

/**
 * Иерархия (16 слотов):
 * ГС → СП и ВС (подчиняются ГС);
 * у каждого ВС — 2 спеца;
 * у каждого спеца — 2 МС.
 */
export const PYRAMID_GS_SLOT = 0;
export const PYRAMID_SP_SLOT = 1;

export interface PyramidSpecBranch {
  specSlotIndex: number;
  msSlotIndexes: [number, number];
}

export interface PyramidVsBranch {
  vsSlotIndex: number;
  specBranches: [PyramidSpecBranch, PyramidSpecBranch];
}

export const PYRAMID_VS_BRANCHES: PyramidVsBranch[] = [
  {
    vsSlotIndex: 2,
    specBranches: [
      { specSlotIndex: 4, msSlotIndexes: [8, 9] },
      { specSlotIndex: 5, msSlotIndexes: [10, 11] },
    ],
  },
  {
    vsSlotIndex: 3,
    specBranches: [
      { specSlotIndex: 6, msSlotIndexes: [12, 13] },
      { specSlotIndex: 7, msSlotIndexes: [14, 15] },
    ],
  },
];

/** Плоский порядок слотов (для сетки и миграции) */
export const PYRAMID_DISPLAY_ROWS: LeaderGrade[][] = [
  ["gs"],
  ["sp", "vs", "vs"],
  ["spec", "spec", "spec", "spec"],
  ["ms", "ms", "ms", "ms", "ms", "ms", "ms", "ms"],
];

export interface PyramidSlotDef {
  index: number;
  grade: LeaderGrade;
  reportsTo?: string;
}

export function getSlotReportsTo(slotIndex: number): string | null {
  if (slotIndex === PYRAMID_GS_SLOT) return null;
  if (slotIndex === PYRAMID_SP_SLOT) return "ГС";
  if (PYRAMID_VS_BRANCHES.some((b) => b.vsSlotIndex === slotIndex)) return "ГС";
  for (const branch of PYRAMID_VS_BRANCHES) {
    for (const spec of branch.specBranches) {
      if (spec.specSlotIndex === slotIndex) return "ВС";
      if (spec.msSlotIndexes.includes(slotIndex)) return "Спец.";
    }
  }
  return null;
}

export function getPyramidSlotDefs(): PyramidSlotDef[] {
  const slots: PyramidSlotDef[] = [];
  for (const row of PYRAMID_DISPLAY_ROWS) {
    for (const grade of row) {
      const index = slots.length;
      slots.push({
        index,
        grade,
        reportsTo: getSlotReportsTo(index) ?? undefined,
      });
    }
  }
  return slots;
}

export const PYRAMID_SLOT_COUNT = getPyramidSlotDefs().length;

export interface LeaderCard {
  id: string;
  name: string;
  grade: LeaderGrade;
  direction: string;
}

export const DREAM_TEAM_LEADERS: LeaderCard[] = [
  { id: "l1", name: "Алексей К.", grade: "gs", direction: "Промышленная робототехника" },
  { id: "l2", name: "Мария С.", grade: "vs", direction: "Бизнес-информатика" },
  { id: "l3", name: "Иван П.", grade: "vs", direction: "WEB-программирование" },
  { id: "l4", name: "Елена В.", grade: "spec", direction: "Микроэлектроника" },
  { id: "l5", name: "Дмитрий Л.", grade: "spec", direction: "Промышленная автоматика" },
  { id: "l6", name: "Ольга Н.", grade: "ms", direction: "Лабораторная химия" },
  { id: "l7", name: "Сергей Т.", grade: "sp", direction: "Уникальный лидер" },
  { id: "l8", name: "Анна Р.", grade: "ms", direction: "Биотехнология" },
  { id: "l9", name: "Павел М.", grade: "ms", direction: "Промышленная робототехника" },
  { id: "l10", name: "Ксения Д.", grade: "ms", direction: "WEB-программирование" },
  { id: "l11", name: "Никита В.", grade: "ms", direction: "Промышленная автоматика" },
  { id: "l12", name: "Юлия Г.", grade: "spec", direction: "Микроэлектроника" },
];

export interface ModuleDefinition {
  id: string;
  name: string;
  dailyImpulses: number;
  purchaseCost: number | null;
  unlockAfterModuleId?: string;
  unlockMinFillPercent?: number;
}

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  {
    id: "module-1",
    name: "Модуль 1",
    dailyImpulses: 2,
    purchaseCost: null,
  },
  {
    id: "module-2",
    name: "Модуль 2",
    dailyImpulses: 4,
    purchaseCost: 500,
    unlockAfterModuleId: "module-1",
    unlockMinFillPercent: 60,
  },
  {
    id: "module-3",
    name: "Модуль 3",
    dailyImpulses: 6,
    purchaseCost: 800,
    unlockAfterModuleId: "module-2",
    unlockMinFillPercent: 50,
  },
];

export const DREAM_TEAM_STORAGE_KEY = "alabuga-dream-team-state";
export const PACK_COST_IMPULSES = 100;

export interface DreamTeamPersistedState {
  ownedLeaderIds: string[];
  unlockedModuleIds: string[];
  activeModuleId: string;
  moduleGrids: Record<string, (string | null)[]>;
  impulses: number;
  lastImpulseCollectDate: string | null;
  lastFreePackDate: string | null;
}

function emptyPyramid(): (string | null)[] {
  return Array.from({ length: PYRAMID_SLOT_COUNT }, () => null);
}

const MODULE_1_DEFAULT: (string | null)[] = [
  "l1", // gs
  null, // sp
  "l2",
  "l3", // vs
  "l4",
  "l5",
  null,
  null, // spec
  "l6",
  "l8",
  null,
  null,
  null,
  null,
  null,
  null, // ms x8
];

export const DEFAULT_DREAM_TEAM_STATE: DreamTeamPersistedState = {
  ownedLeaderIds: ["l1", "l2", "l3", "l4", "l5", "l6", "l8", "l9"],
  unlockedModuleIds: ["module-1"],
  activeModuleId: "module-1",
  moduleGrids: {
    "module-1": MODULE_1_DEFAULT,
    "module-2": emptyPyramid(),
    "module-3": emptyPyramid(),
  },
  impulses: 640,
  lastImpulseCollectDate: null,
  lastFreePackDate: null,
};

export function getModuleDef(moduleId: string): ModuleDefinition {
  return MODULE_DEFINITIONS.find((m) => m.id === moduleId)!;
}

export function getGradeForSlot(slotIndex: number): LeaderGrade {
  return getPyramidSlotDefs()[slotIndex]?.grade ?? "ms";
}

export function pickRandomGrade(): LeaderGrade {
  const total = LEADER_GRADES.reduce((s, g) => s + g.packWeight, 0);
  let roll = Math.random() * total;
  for (const grade of LEADER_GRADES) {
    roll -= grade.packWeight;
    if (roll <= 0) return grade.id;
  }
  return "ms";
}

function normalizeGrid(grid: unknown): (string | null)[] {
  if (!Array.isArray(grid)) return emptyPyramid();
  if (grid.length === PYRAMID_SLOT_COUNT) return grid as (string | null)[];
  if (grid.length > PYRAMID_SLOT_COUNT) {
    return (grid as (string | null)[]).slice(0, PYRAMID_SLOT_COUNT);
  }
  const next = emptyPyramid();
  (grid as (string | null)[]).forEach((id, i) => {
    if (i < PYRAMID_SLOT_COUNT) next[i] = id;
  });
  return next;
}

const LEGACY_ID_MAP: Record<string, string> = {
  "level-1": "module-1",
  "level-2": "module-2",
};

export function migrateLegacyState(
  parsed: Record<string, unknown>
): DreamTeamPersistedState {
  const base = structuredClone(DEFAULT_DREAM_TEAM_STATE);

  if (Array.isArray(parsed.ownedLeaderIds)) {
    base.ownedLeaderIds = parsed.ownedLeaderIds as string[];
  }
  if (typeof parsed.impulses === "number") base.impulses = parsed.impulses;
  if (parsed.lastImpulseCollectDate) {
    base.lastImpulseCollectDate = parsed.lastImpulseCollectDate as string;
  }
  if (parsed.lastFreePackDate) {
    base.lastFreePackDate = parsed.lastFreePackDate as string;
  }

  const rawGrids = parsed.moduleGrids as Record<string, unknown> | undefined;
  if (rawGrids) {
    base.moduleGrids = {};
    for (const [key, grid] of Object.entries(rawGrids)) {
      const id = LEGACY_ID_MAP[key] ?? key;
      base.moduleGrids[id] = normalizeGrid(grid);
    }
  }

  const unlocked = (parsed.unlockedModuleIds as string[] | undefined)?.map(
    (id) => LEGACY_ID_MAP[id] ?? id
  );
  if (unlocked?.length) base.unlockedModuleIds = unlocked;

  const active = parsed.activeModuleId as string | undefined;
  if (active) base.activeModuleId = LEGACY_ID_MAP[active] ?? active;

  for (const mod of MODULE_DEFINITIONS) {
    if (!base.moduleGrids[mod.id]) {
      base.moduleGrids[mod.id] = emptyPyramid();
    }
  }

  if (!base.unlockedModuleIds.includes(base.activeModuleId)) {
    base.activeModuleId = base.unlockedModuleIds[0] ?? "module-1";
  }

  return base;
}
