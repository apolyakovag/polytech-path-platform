import { useCallback, useMemo, useState } from "react";
import type { DreamTeamDragPayload } from "@/components/path/dreamTeam/dreamTeamDrag";
import {
  DEFAULT_DREAM_TEAM_STATE,
  DREAM_TEAM_LEADERS,
  DREAM_TEAM_STORAGE_KEY,
  LEADER_GRADES,
  MODULE_DEFINITIONS,
  PACK_COST_IMPULSES,
  PYRAMID_SLOT_COUNT,
  getGradeForSlot,
  getModuleDef,
  migrateLegacyState,
  pickRandomGrade,
  type DreamTeamPersistedState,
  type ModuleDefinition,
} from "@/data/dreamTeam";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadState(): DreamTeamPersistedState {
  try {
    const raw = localStorage.getItem(DREAM_TEAM_STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DREAM_TEAM_STATE);
    return migrateLegacyState(JSON.parse(raw) as Record<string, unknown>);
  } catch {
    return structuredClone(DEFAULT_DREAM_TEAM_STATE);
  }
}

function saveState(state: DreamTeamPersistedState) {
  localStorage.setItem(DREAM_TEAM_STORAGE_KEY, JSON.stringify(state));
}

export function useDreamTeam() {
  const [state, setState] = useState<DreamTeamPersistedState>(loadState);
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(
    null
  );
  const [toast, setToast] = useState<string | null>(null);
  const [activeDrag, setActiveDrag] =
    useState<DreamTeamDragPayload | null>(null);

  const persist = useCallback((next: DreamTeamPersistedState) => {
    setState(next);
    saveState(next);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const activeModule = getModuleDef(state.activeModuleId);

  const getGrid = useCallback(
    (moduleId: string) =>
      state.moduleGrids[moduleId] ??
      Array.from({ length: PYRAMID_SLOT_COUNT }, () => null),
    [state.moduleGrids]
  );

  const activeGrid = getGrid(state.activeModuleId);

  const ownedSet = useMemo(
    () => new Set(state.ownedLeaderIds),
    [state.ownedLeaderIds]
  );

  const leadersInActiveModule = useMemo(() => {
    const set = new Set<string>();
    activeGrid.forEach((id) => {
      if (id) set.add(id);
    });
    return set;
  }, [activeGrid]);

  const leaders = useMemo(
    () =>
      DREAM_TEAM_LEADERS.map((leader) => ({
        ...leader,
        owned: ownedSet.has(leader.id),
        inModule: leadersInActiveModule.has(leader.id),
      })),
    [ownedSet, leadersInActiveModule]
  );

  const reserveLeaders = leaders.filter((l) => l.owned && !l.inModule);
  const ownedCount = leaders.filter((l) => l.owned).length;
  const inModuleCount = leadersInActiveModule.size;
  const reserveCount = reserveLeaders.length;

  const moduleFilled = activeGrid.filter(Boolean).length;
  const moduleTotal = PYRAMID_SLOT_COUNT;
  const fillPercent = Math.round((moduleFilled / moduleTotal) * 100);

  const getModuleDailyImpulses = useCallback(
    (moduleId: string) => {
      if (!state.unlockedModuleIds.includes(moduleId)) return 0;
      const filled = getGrid(moduleId).filter(Boolean).length;
      return filled > 0 ? getModuleDef(moduleId).dailyImpulses : 0;
    },
    [state.unlockedModuleIds, getGrid]
  );

  const totalDailyImpulses = useMemo(
    () =>
      state.unlockedModuleIds.reduce(
        (sum, id) => sum + getModuleDailyImpulses(id),
        0
      ),
    [state.unlockedModuleIds, getModuleDailyImpulses]
  );

  const impulsesPerDay = totalDailyImpulses;

  const canCollectToday =
    totalDailyImpulses > 0 && state.lastImpulseCollectDate !== todayKey();

  const getModuleFillPercent = useCallback(
    (moduleId: string) => {
      const grid = getGrid(moduleId);
      const filled = grid.filter(Boolean).length;
      return Math.round((filled / PYRAMID_SLOT_COUNT) * 100);
    },
    [getGrid]
  );

  const getLeaderInCell = useCallback(
    (moduleId: string, slotIndex: number) => {
      const id = getGrid(moduleId)[slotIndex];
      return id ? DREAM_TEAM_LEADERS.find((l) => l.id === id) : undefined;
    },
    [getGrid]
  );

  const placeLeader = useCallback(
    (moduleId: string, slotIndex: number, leaderId: string) => {
      const leader = DREAM_TEAM_LEADERS.find((l) => l.id === leaderId);
      if (!leader || !ownedSet.has(leaderId)) return;

      const required = getGradeForSlot(slotIndex);
      if (leader.grade !== required) {
        showToast(
          `Нужен грейд ${LEADER_GRADES.find((g) => g.id === required)?.label}`
        );
        return;
      }

      const grid = [...getGrid(moduleId)];
      const usedElsewhere = Object.entries(state.moduleGrids).some(
        ([mid, g]) => mid !== moduleId && g?.includes(leaderId)
      );
      if (usedElsewhere) {
        showToast("Лидер уже стоит в другом модуле");
        return;
      }
      if (grid.includes(leaderId) && grid[slotIndex] !== leaderId) {
        showToast("Лидер уже в этом модуле");
        return;
      }

      grid[slotIndex] = leaderId;
      persist({
        ...state,
        activeModuleId: moduleId,
        moduleGrids: { ...state.moduleGrids, [moduleId]: grid },
      });
      setSelectedLeaderId(null);
      setSelectedCellIndex(null);
      showToast(`${leader.name} → ${getModuleDef(moduleId).name}`);
    },
    [ownedSet, getGrid, state, persist, showToast]
  );

  const removeFromCell = useCallback(
    (moduleId: string, slotIndex: number) => {
      const grid = [...getGrid(moduleId)];
      if (!grid[slotIndex]) return;
      grid[slotIndex] = null;
      persist({
        ...state,
        moduleGrids: { ...state.moduleGrids, [moduleId]: grid },
      });
      if (
        state.activeModuleId === moduleId &&
        selectedCellIndex === slotIndex
      ) {
        setSelectedCellIndex(null);
      }
    },
    [getGrid, state, persist, selectedCellIndex]
  );

  const handleCellClick = useCallback(
    (moduleId: string, slotIndex: number) => {
      if (!state.unlockedModuleIds.includes(moduleId)) return;

      const grid = getGrid(moduleId);
      const leaderId = grid[slotIndex];

      if (state.activeModuleId !== moduleId) {
        persist({ ...state, activeModuleId: moduleId });
        setSelectedLeaderId(null);
        setSelectedCellIndex(null);
      }

      if (selectedLeaderId) {
        if (leaderId) {
          removeFromCell(moduleId, slotIndex);
        }
        placeLeader(moduleId, slotIndex, selectedLeaderId);
        return;
      }

      if (leaderId) {
        removeFromCell(moduleId, slotIndex);
        showToast("Карточка в запасе");
        return;
      }

      setSelectedCellIndex(
        state.activeModuleId === moduleId && selectedCellIndex === slotIndex
          ? null
          : slotIndex
      );
    },
    [
      state,
      getGrid,
      selectedLeaderId,
      selectedCellIndex,
      placeLeader,
      removeFromCell,
      persist,
      showToast,
    ]
  );

  const handleStockClick = useCallback(
    (leaderId: string) => {
      if (selectedCellIndex !== null) {
        placeLeader(state.activeModuleId, selectedCellIndex, leaderId);
        return;
      }
      setSelectedLeaderId(
        selectedLeaderId === leaderId ? null : leaderId
      );
    },
    [selectedCellIndex, selectedLeaderId, state.activeModuleId, placeLeader]
  );

  const setActiveModule = useCallback(
    (moduleId: string) => {
      if (!state.unlockedModuleIds.includes(moduleId)) {
        showToast("Сначала откройте модуль");
        return;
      }
      persist({ ...state, activeModuleId: moduleId });
      setSelectedLeaderId(null);
      setSelectedCellIndex(null);
    },
    [state, persist, showToast]
  );

  const canUnlockModule = useCallback(
    (mod: ModuleDefinition) => {
      if (state.unlockedModuleIds.includes(mod.id)) return true;
      if (mod.purchaseCost === null) return true;
      if (mod.unlockAfterModuleId) {
        const prevFill = getModuleFillPercent(mod.unlockAfterModuleId);
        if (prevFill < (mod.unlockMinFillPercent ?? 0)) return false;
      }
      return state.impulses >= (mod.purchaseCost ?? 0);
    },
    [state, getModuleFillPercent]
  );

  const purchaseModule = useCallback(
    (moduleId: string) => {
      const mod = getModuleDef(moduleId);
      if (state.unlockedModuleIds.includes(moduleId)) {
        setActiveModule(moduleId);
        return;
      }
      if (!canUnlockModule(mod)) {
        if (mod.unlockAfterModuleId) {
          showToast(
            `Заполните ${getModuleDef(mod.unlockAfterModuleId).name} на ${mod.unlockMinFillPercent}%`
          );
        } else {
          showToast(`Нужно ${mod.purchaseCost} импульсов`);
        }
        return;
      }
      persist({
        ...state,
        impulses: state.impulses - (mod.purchaseCost ?? 0),
        unlockedModuleIds: [...state.unlockedModuleIds, moduleId],
        activeModuleId: moduleId,
      });
      showToast(`${mod.name} открыт`);
    },
    [state, canUnlockModule, persist, setActiveModule, showToast]
  );

  const openLeaderPack = useCallback(
    (useFree: boolean) => {
      if (!useFree && state.impulses < PACK_COST_IMPULSES) {
        showToast(`Нужно ${PACK_COST_IMPULSES} импульсов для пака`);
        return;
      }
      if (useFree && state.lastFreePackDate === todayKey()) {
        showToast("Бесплатный пак уже открыт сегодня");
        return;
      }

      const gradeId = pickRandomGrade();
      const pool = DREAM_TEAM_LEADERS.filter(
        (l) => l.grade === gradeId && !ownedSet.has(l.id)
      );
      const fallback = DREAM_TEAM_LEADERS.filter((l) => !ownedSet.has(l.id));
      const picked =
        pool[Math.floor(Math.random() * pool.length)] ??
        fallback[Math.floor(Math.random() * fallback.length)];

      if (!picked) {
        showToast("Все лидеры уже в коллекции");
        return;
      }

      persist({
        ...state,
        ownedLeaderIds: [...state.ownedLeaderIds, picked.id],
        impulses: useFree
          ? state.impulses
          : state.impulses - PACK_COST_IMPULSES,
        lastFreePackDate: useFree ? todayKey() : state.lastFreePackDate,
      });
      const grade = LEADER_GRADES.find((g) => g.id === picked.grade)!;
      showToast(`В запас: ${picked.name} (${grade.label})`);
    },
    [state, ownedSet, persist, showToast]
  );

  const collectDailyImpulses = useCallback(() => {
    if (!canCollectToday) {
      showToast("Импульсы уже собраны сегодня");
      return;
    }
    persist({
      ...state,
      impulses: state.impulses + totalDailyImpulses,
      lastImpulseCollectDate: todayKey(),
    });
    showToast(`+${totalDailyImpulses} импульсов с модулей`);
  }, [canCollectToday, state, totalDailyImpulses, persist, showToast]);

  const freePackAvailable = state.lastFreePackDate !== todayKey();

  const modules = MODULE_DEFINITIONS.map((mod) => ({
    ...mod,
    unlocked: state.unlockedModuleIds.includes(mod.id),
    active: state.activeModuleId === mod.id,
    fillPercent: getModuleFillPercent(mod.id),
    canBuy: canUnlockModule(mod),
    currentDailyImpulses: getModuleDailyImpulses(mod.id),
  }));

  const isCellCompatible = useCallback(
    (_moduleId: string, slotIndex: number) => {
      if (!selectedLeaderId) return false;
      const leader = leaders.find((l) => l.id === selectedLeaderId);
      if (!leader?.owned || leader.inModule) return false;
      return leader.grade === getGradeForSlot(slotIndex);
    },
    [selectedLeaderId, leaders]
  );

  const canDropLeaderInSlot = useCallback(
    (
      moduleId: string,
      slotIndex: number,
      leaderId: string,
      drag?: DreamTeamDragPayload | null
    ) => {
      if (!state.unlockedModuleIds.includes(moduleId)) return false;
      const leader = DREAM_TEAM_LEADERS.find((l) => l.id === leaderId);
      if (!leader || !ownedSet.has(leaderId)) return false;
      if (leader.grade !== getGradeForSlot(slotIndex)) return false;

      if (
        drag?.from === "cell" &&
        drag.moduleId === moduleId &&
        drag.slotIndex === slotIndex
      ) {
        return false;
      }

      const grid = getGrid(moduleId);
      const occupant = grid[slotIndex];
      if (occupant && occupant !== leaderId) return false;

      const inSameModuleElsewhere =
        grid.includes(leaderId) &&
        !(
          drag?.from === "cell" &&
          drag.moduleId === moduleId &&
          drag.leaderId === leaderId
        );
      if (inSameModuleElsewhere) return false;

      const usedInOtherModule = Object.entries(state.moduleGrids).some(
        ([mid, g]) =>
          mid !== moduleId &&
          g?.includes(leaderId) &&
          !(
            drag?.from === "cell" &&
            drag.moduleId === mid &&
            drag.leaderId === leaderId
          )
      );
      return !usedInOtherModule;
    },
    [state.unlockedModuleIds, state.moduleGrids, ownedSet, getGrid]
  );

  const dropLeaderOnSlot = useCallback(
    (moduleId: string, slotIndex: number, drag: DreamTeamDragPayload) => {
      if (!canDropLeaderInSlot(moduleId, slotIndex, drag.leaderId, drag)) {
        const leader = DREAM_TEAM_LEADERS.find((l) => l.id === drag.leaderId);
        const required = getGradeForSlot(slotIndex);
        if (leader && leader.grade !== required) {
          showToast(
            `Нужен грейд ${LEADER_GRADES.find((g) => g.id === required)?.label}`
          );
        } else {
          showToast("Нельзя поставить сюда");
        }
        return;
      }

      if (drag.from === "stock") {
        const grid = getGrid(moduleId);
        if (grid[slotIndex] && grid[slotIndex] !== drag.leaderId) {
          removeFromCell(moduleId, slotIndex);
        }
        placeLeader(moduleId, slotIndex, drag.leaderId);
        return;
      }

      const sourceGrid = [...getGrid(drag.moduleId)];
      const targetGrid =
        drag.moduleId === moduleId ? sourceGrid : [...getGrid(moduleId)];

      sourceGrid[drag.slotIndex] = null;
      targetGrid[slotIndex] = drag.leaderId;

      const moduleGrids = {
        ...state.moduleGrids,
        [drag.moduleId]: sourceGrid,
        [moduleId]: targetGrid,
      };

      const leader = DREAM_TEAM_LEADERS.find((l) => l.id === drag.leaderId)!;
      persist({
        ...state,
        activeModuleId: moduleId,
        moduleGrids,
      });
      setSelectedLeaderId(null);
      setSelectedCellIndex(null);
      showToast(`${leader.name} → ${getModuleDef(moduleId).name}`);
    },
    [
      canDropLeaderInSlot,
      getGrid,
      placeLeader,
      removeFromCell,
      state,
      persist,
      showToast,
    ]
  );

  const dropLeaderOnStock = useCallback(
    (drag: DreamTeamDragPayload) => {
      if (drag.from !== "cell") return;
      removeFromCell(drag.moduleId, drag.slotIndex);
      showToast("Карточка в запасе");
    },
    [removeFromCell, showToast]
  );

  return {
    state,
    activeModule,
    activeGrid,
    modules,
    leaders,
    reserveLeaders,
    ownedCount,
    reserveCount,
    inModuleCount,
    moduleFilled,
    moduleTotal,
    fillPercent,
    impulsesPerDay,
    totalDailyImpulses,
    getModuleDailyImpulses,
    impulses: state.impulses,
    canCollectToday,
    freePackAvailable,
    packCost: PACK_COST_IMPULSES,
    selectedLeaderId,
    selectedCellIndex,
    setSelectedLeaderId,
    setSelectedCellIndex,
    handleCellClick,
    handleStockClick,
    setActiveModule,
    purchaseModule,
    openLeaderPack,
    collectDailyImpulses,
    getGrid,
    getLeaderInCell,
    isCellCompatible,
    canDropLeaderInSlot,
    dropLeaderOnSlot,
    dropLeaderOnStock,
    activeDrag,
    setActiveDrag,
    getModuleFillPercent,
    toast,
    lootbox: { tasksCompleted: 6, tasksTarget: 8 },
  };
}
