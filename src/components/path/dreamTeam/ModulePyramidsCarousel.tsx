import { Lock, Zap } from "lucide-react";
import { Button } from "borrom-ds-test";
import {
  LEADER_GRADES,
  PYRAMID_GS_SLOT,
  PYRAMID_SP_SLOT,
  PYRAMID_VS_BRANCHES,
  getGradeForSlot,
  getSlotReportsTo,
} from "@/data/dreamTeam";
import type { useDreamTeam } from "@/hooks/useDreamTeam";
import { writeDragPayload } from "@/components/path/dreamTeam/dreamTeamDrag";

type DreamTeamApi = ReturnType<typeof useDreamTeam>;

const slotGap = "gap-[clamp(0.375rem,1vh,0.75rem)]";
const branchGap = "gap-[clamp(0.35rem,1.2vh,0.9rem)]";

function PyramidSlot({
  slotIndex,
  moduleId,
  dt,
  compact,
}: {
  slotIndex: number;
  moduleId: string;
  dt: DreamTeamApi;
  compact: boolean;
}) {
  const {
    getLeaderInCell,
    handleCellClick,
    selectedCellIndex,
    isCellCompatible,
    canDropLeaderInSlot,
    dropLeaderOnSlot,
    activeDrag,
    setActiveDrag,
    state,
  } = dt;

  const leader = getLeaderInCell(moduleId, slotIndex);
  const gradeId = getGradeForSlot(slotIndex);
  const grade = LEADER_GRADES.find((g) => g.id === gradeId)!;
  const reportsTo = getSlotReportsTo(slotIndex);
  const filled = Boolean(leader);
  const isActiveModule = state.activeModuleId === moduleId;
  const selected = isActiveModule && selectedCellIndex === slotIndex;
  const compatible =
    isActiveModule && isCellCompatible(moduleId, slotIndex);
  const canDrop = Boolean(
    activeDrag &&
      canDropLeaderInSlot(moduleId, slotIndex, activeDrag.leaderId, activeDrag)
  );
  const isDragSource =
    activeDrag?.from === "cell" &&
    activeDrag.moduleId === moduleId &&
    activeDrag.slotIndex === slotIndex;
  const highlight = selected || compatible || canDrop;

  const sizeClass = compact
    ? "h-[clamp(2.25rem,5vh,3rem)] w-[clamp(2.25rem,5vh,3rem)] text-[clamp(9px,1.1vh,12px)]"
    : "h-[clamp(2.75rem,6vh,4rem)] w-[clamp(2.75rem,6vh,4rem)] text-[clamp(10px,1.4vh,14px)]";

  const reportsHint = reportsTo ? ` · подчиняется ${reportsTo}` : "";

  return (
    <button
      type="button"
      draggable={filled}
      onDragStart={(e) => {
        if (!leader) return;
        const payload = {
          from: "cell" as const,
          moduleId,
          slotIndex,
          leaderId: leader.id,
        };
        writeDragPayload(e.dataTransfer, payload);
        setActiveDrag(payload);
      }}
      onDragEnd={() => setActiveDrag(null)}
      onDragOver={(e) => {
        if (!activeDrag) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = canDrop ? "move" : "none";
      }}
      onDrop={(e) => {
        e.preventDefault();
        if (activeDrag) {
          dropLeaderOnSlot(moduleId, slotIndex, activeDrag);
          setActiveDrag(null);
        }
      }}
      onClick={() => handleCellClick(moduleId, slotIndex)}
      className={`box-border flex shrink-0 flex-col items-center justify-center rounded-xl border-2 font-semibold ${sizeClass} ${
        filled ? "cursor-grab active:cursor-grabbing" : ""
      } ${isDragSource ? "opacity-40" : ""} ${
        highlight
          ? "border-brand-line-heavy bg-brand-light/20 shadow-[inset_0_0_0_1px_var(--color-brand-line-heavy)]"
          : filled
            ? "border-transparent text-white"
            : "border-dashed border-line bg-page hover:border-brand-line-medium"
      } ${activeDrag && !canDrop && !filled ? "opacity-50" : ""}`}
      style={filled ? { backgroundColor: grade.accent } : undefined}
      title={
        filled
          ? `${leader!.name} — перетащите в другой слот или в запас`
          : `${grade.label} — ${grade.fullName}${reportsHint}`
      }
    >
      {filled ? (
        <>
          <span className="opacity-90">{grade.label}</span>
          {!compact && (
            <span className="mt-0.5 max-w-full truncate px-1 text-[0.65em] font-normal leading-tight">
              {leader!.name.split(" ")[0]}
            </span>
          )}
        </>
      ) : (
        grade.label
      )}
    </button>
  );
}

function VsBranchColumn({
  branch,
  moduleId,
  dt,
}: {
  branch: (typeof PYRAMID_VS_BRANCHES)[number];
  moduleId: string;
  dt: DreamTeamApi;
}) {
  return (
    <div className={`flex flex-col items-center ${branchGap}`}>
      <PyramidSlot
        slotIndex={branch.vsSlotIndex}
        moduleId={moduleId}
        dt={dt}
        compact={false}
      />
      <div className={`flex justify-center ${branchGap}`}>
        {branch.specBranches.map((specBranch) => (
          <div
            key={specBranch.specSlotIndex}
            className={`flex flex-col items-center ${slotGap}`}
          >
            <PyramidSlot
              slotIndex={specBranch.specSlotIndex}
              moduleId={moduleId}
              dt={dt}
              compact
            />
            <div className={`flex justify-center ${slotGap}`}>
              {specBranch.msSlotIndexes.map((msIndex) => (
                <PyramidSlot
                  key={msIndex}
                  slotIndex={msIndex}
                  moduleId={moduleId}
                  dt={dt}
                  compact
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PyramidHierarchy({
  moduleId,
  dt,
}: {
  moduleId: string;
  dt: DreamTeamApi;
}) {
  return (
    <div
      className={`mx-auto flex w-fit max-w-full flex-col items-center justify-center ${branchGap} p-1`}
    >
      <PyramidSlot
        slotIndex={PYRAMID_GS_SLOT}
        moduleId={moduleId}
        dt={dt}
        compact={false}
      />

      <div className={`flex items-start justify-center ${branchGap}`}>
        <VsBranchColumn
          branch={PYRAMID_VS_BRANCHES[0]}
          moduleId={moduleId}
          dt={dt}
        />

        <div className={`flex shrink-0 flex-col items-center self-start ${slotGap}`}>
          <PyramidSlot
            slotIndex={PYRAMID_SP_SLOT}
            moduleId={moduleId}
            dt={dt}
            compact={false}
          />
        </div>

        <VsBranchColumn
          branch={PYRAMID_VS_BRANCHES[1]}
          moduleId={moduleId}
          dt={dt}
        />
      </div>
    </div>
  );
}

function ModulePyramidCard({
  mod,
  dt,
}: {
  mod: DreamTeamApi["modules"][number];
  dt: DreamTeamApi;
}) {
  return (
    <article
      className={`flex w-fit max-w-[min(100%,640px)] shrink-0 snap-center snap-always flex-col rounded-2xl border p-4 transition-colors sm:p-5 ${
        mod.active
          ? "border-brand-line-medium bg-brand-light/10"
          : mod.unlocked
            ? "border-line bg-generic-heavy"
            : "border-dashed border-line bg-page opacity-80"
      }`}
    >
      <div className="mb-3 flex shrink-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-roboto-flex text-base font-medium text-primary">
            {mod.name}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-secondary">
            {mod.unlocked ? (
              mod.currentDailyImpulses > 0 ? (
                <>
                  <span className="font-medium text-brand-text-heavy">
                    +{mod.currentDailyImpulses} имп./день
                  </span>
                  {" · "}
                  {mod.fillPercent}%
                </>
              ) : (
                <>+{mod.dailyImpulses} имп. · {mod.fillPercent}%</>
              )
            ) : mod.purchaseCost ? (
              `${mod.purchaseCost} имп.`
            ) : (
              "Закрыт"
            )}
          </p>
        </div>
        {mod.active ? (
          <span className="shrink-0 rounded-md bg-brand-medium px-2 py-0.5 text-[10px] font-medium text-on-brand">
            Активный
          </span>
        ) : mod.unlocked && mod.currentDailyImpulses > 0 ? (
          <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-page px-2 py-0.5 text-[10px] font-medium text-brand-text-heavy">
            <Zap className="h-3 w-3" />+{mod.currentDailyImpulses}
          </span>
        ) : null}
      </div>

      {mod.unlocked ? (
        <div className="flex shrink-0 flex-col items-center justify-center overflow-visible py-1">
          <PyramidHierarchy moduleId={mod.id} dt={dt} />
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 py-6">
          <Lock className="h-8 w-8 text-hint" />
          <Button
            size="sm"
            type="outline"
            color="brand"
            disabled={!mod.canBuy}
            onClick={() => dt.purchaseModule(mod.id)}
          >
            {mod.canBuy ? "Купить" : "Нужен прогресс"}
          </Button>
        </div>
      )}

      {mod.unlocked && !mod.active ? (
        <Button
          size="sm"
          type="flat"
          color="contrastDark"
          className="mt-3 w-full shrink-0 bg-page"
          onClick={() => dt.setActiveModule(mod.id)}
        >
          Редактировать
        </Button>
      ) : null}
    </article>
  );
}

export function ModulePyramidsCarousel({ dt }: { dt: DreamTeamApi }) {
  const { totalDailyImpulses, modules } = dt;
  const earningModules = modules.filter(
    (m) => m.unlocked && m.currentDailyImpulses > 0
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
        <h2 className="font-roboto-flex text-lg font-medium text-primary">
          Модули
        </h2>
        <span className="text-xs text-secondary">Листайте вправо</span>
      </div>

      <div className="mb-4 shrink-0 rounded-xl border border-brand-line-medium bg-brand-light/15 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-secondary">Импульсы с модулей сейчас</p>
            <p className="mt-1 flex items-center gap-2 font-roboto-flex text-2xl font-semibold tabular-nums text-brand-text-heavy sm:text-3xl">
              <Zap className="h-6 w-6 shrink-0" />
              +{totalDailyImpulses}
              <span className="text-base font-normal text-secondary sm:text-lg">
                / день
              </span>
            </p>
          </div>
          {earningModules.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {earningModules.map((m) => (
                <li
                  key={m.id}
                  className="rounded-lg bg-page px-3 py-1.5 text-sm tabular-nums"
                >
                  <span className="text-secondary">{m.name}</span>{" "}
                  <span className="font-medium text-brand-text-heavy">
                    +{m.currentDailyImpulses}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-xs text-sm text-secondary">
              Расставьте лидеров в модуле — начнёте получать импульсы каждый
              день
            </p>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-start gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:thin]">
        {modules.map((mod) => (
          <ModulePyramidCard key={mod.id} mod={mod} dt={dt} />
        ))}
      </div>

      <p className="mt-3 shrink-0 text-xs text-secondary">
        ГС → СП и ВС (СП между ВС) → у ВС по 2 спеца → у спеца по 2 МС.
      </p>
    </div>
  );
}

