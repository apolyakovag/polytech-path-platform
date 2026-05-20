import { Button } from "borrom-ds-test";
import { PathCard } from "@/components/path/PathCard";
import { DailyChallengesPanel } from "@/components/path/DailyChallengesPanel";
import { pathGameHref, PATH_GAME } from "@/routing/pathRoutes";
import { useDreamTeam } from "@/hooks/useDreamTeam";

export function DreamTeamSection() {
  const {
    moduleFilled,
    moduleTotal,
    fillPercent,
    impulsesPerDay,
    lootbox,
  } = useDreamTeam();

  const lootboxProgress = Math.min(
    100,
    Math.round((lootbox.tasksCompleted / lootbox.tasksTarget) * 100)
  );

  return (
    <PathCard>
      <div className="mb-6 grid gap-6 border-b border-line pb-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(220px,280px)] lg:items-center lg:gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="font-roboto-flex text-base font-medium text-primary">
            Команда мечты
          </h2>
          <div>
            <p className="text-sm text-secondary">Заполнено</p>
            <p className="mt-1 font-roboto-flex text-5xl font-semibold leading-none tabular-nums text-primary sm:text-6xl">
              {fillPercent}%
            </p>
          </div>
          <Button
            size="sm"
            type="flat"
            color="contrastDark"
            className="w-fit bg-generic-heavy text-primary hover:bg-page"
            onClick={() => {
              window.location.hash = pathGameHref(PATH_GAME.dreamTeam);
            }}
          >
            Перейти
          </Button>
        </div>

        <p className="text-center font-roboto-flex text-xl font-medium text-primary sm:text-2xl lg:justify-self-center">
          +{impulsesPerDay} импульса в день
        </p>

        <div className="rounded-xl bg-generic-heavy p-4 lg:min-h-[120px]">
          <h3 className="mb-2 font-roboto-flex text-base font-medium text-primary">
            Лут-бокс
          </h3>
          <p className="mb-4 text-sm leading-snug text-secondary">
            До получения — выполнить {lootbox.tasksTarget} заданий
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-page">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${lootboxProgress}%` }}
              role="progressbar"
              aria-valuenow={lootbox.tasksCompleted}
              aria-valuemin={0}
              aria-valuemax={lootbox.tasksTarget}
              aria-label="Прогресс до лут-бокса"
            />
          </div>
          <p className="mt-2 text-xs text-secondary tabular-nums">
            {moduleFilled}/{moduleTotal} слотов в модуле
          </p>
        </div>
      </div>

      <DailyChallengesPanel />
    </PathCard>
  );
}
