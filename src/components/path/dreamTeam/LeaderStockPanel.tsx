import { useState } from "react";
import { Gift } from "lucide-react";
import { Button } from "borrom-ds-test";
import { LEADER_GRADES } from "@/data/dreamTeam";
import type { useDreamTeam } from "@/hooks/useDreamTeam";
import { writeDragPayload } from "@/components/path/dreamTeam/dreamTeamDrag";

type DreamTeamApi = ReturnType<typeof useDreamTeam>;

export function LeaderStockPanel({ dt }: { dt: DreamTeamApi }) {
  const {
    reserveLeaders,
    ownedCount,
    reserveCount,
    inModuleCount,
    selectedLeaderId,
    handleStockClick,
    freePackAvailable,
    packCost,
    openLeaderPack,
    selectedCellIndex,
    dropLeaderOnStock,
    activeDrag,
    setActiveDrag,
  } = dt;

  const [stockDragOver, setStockDragOver] = useState(false);
  const canDropOnStock = activeDrag?.from === "cell";

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <div className="grid shrink-0 grid-cols-3 gap-2 rounded-xl bg-generic-heavy p-3 text-center text-sm">
        <div>
          <p className="text-2xl font-semibold tabular-nums text-primary">
            {ownedCount}
          </p>
          <p className="text-xs text-secondary">всего карт</p>
        </div>
        <div>
          <p className="text-2xl font-semibold tabular-nums text-brand-text-heavy">
            {reserveCount}
          </p>
          <p className="text-xs text-secondary">в запасе</p>
        </div>
        <div>
          <p className="text-2xl font-semibold tabular-nums text-primary">
            {inModuleCount}
          </p>
          <p className="text-xs text-secondary">в модуле</p>
        </div>
      </div>

      <div className="shrink-0 rounded-xl border border-line bg-generic-heavy p-4">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
          <Gift className="h-4 w-4 text-warning-text-heavy" />
          Пополнить запас
        </h3>
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            type="fill"
            color="brand"
            className="w-full"
            disabled={!freePackAvailable}
            onClick={() => openLeaderPack(true)}
          >
            Бесплатный пак
          </Button>
          <Button
            size="sm"
            type="outline"
            color="brand"
            className="w-full"
            onClick={() => openLeaderPack(false)}
          >
            Пак · {packCost} имп.
          </Button>
        </div>
      </div>

      <div
        className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border-2 p-3 ${
          stockDragOver && canDropOnStock
            ? "border-brand-line-heavy bg-brand-light/15"
            : "border-transparent"
        }`}
        onDragEnter={() => {
          if (canDropOnStock) setStockDragOver(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setStockDragOver(false);
          }
        }}
        onDragOver={(e) => {
          if (canDropOnStock) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          setStockDragOver(false);
          if (activeDrag) dropLeaderOnStock(activeDrag);
          setActiveDrag(null);
        }}
      >
        <h3 className="mb-2 shrink-0 font-roboto-flex text-base font-medium text-primary">
          Запас карточек
          {selectedLeaderId ? (
            <span className="ml-2 text-sm font-normal text-brand-text-medium">
              · выбрана
            </span>
          ) : selectedCellIndex !== null ? (
            <span className="ml-2 text-sm font-normal text-brand-text-medium">
              · выберите карту
            </span>
          ) : (
            <span className="ml-2 text-sm font-normal text-secondary">
              · перетащите на модуль
            </span>
          )}
        </h3>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
          {reserveLeaders.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line p-4 text-sm text-secondary">
              {stockDragOver && canDropOnStock
                ? "Отпустите — карта вернётся в запас"
                : "Все карты в модуле. Откройте пак или перетащите карту с пирамиды сюда."}
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {reserveLeaders.map((leader) => {
                const grade = LEADER_GRADES.find((g) => g.id === leader.grade)!;
                const selected = selectedLeaderId === leader.id;
                return (
                  <button
                    key={leader.id}
                    type="button"
                    draggable
                    onDragStart={(e) => {
                      const payload = {
                        from: "stock" as const,
                        leaderId: leader.id,
                      };
                      writeDragPayload(e.dataTransfer, payload);
                      setActiveDrag(payload);
                    }}
                    onDragEnd={() => setActiveDrag(null)}
                    onClick={() => handleStockClick(leader.id)}
                    className={`box-border flex w-full shrink-0 cursor-grab flex-col rounded-xl border-2 p-3 text-left active:cursor-grabbing ${
                      selected
                        ? "border-brand-line-heavy bg-brand-light/15 shadow-[inset_0_0_0_1px_var(--color-brand-line-heavy)]"
                        : "border-line bg-page hover:border-brand-line-medium"
                    }`}
                  >
                    <span
                      className="mb-2 w-fit rounded-md px-2 py-0.5 text-xs font-semibold text-white"
                      style={{ backgroundColor: grade.accent }}
                    >
                      {grade.label}
                    </span>
                    <span className="font-medium text-primary">
                      {leader.name}
                    </span>
                    <span className="mt-1 line-clamp-1 text-xs text-secondary">
                      {leader.direction}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
