import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "borrom-ds-test";
import { PathCard } from "@/components/path/PathCard";
import { pathHref } from "@/routing/pathRoutes";
import { useDreamTeam } from "@/hooks/useDreamTeam";
import { ModulePyramidsCarousel } from "@/components/path/dreamTeam/ModulePyramidsCarousel";
import { LeaderStockPanel } from "@/components/path/dreamTeam/LeaderStockPanel";

/** Фиксированная высота игровой зоны — левая и правая колонки совпадают */
const GAME_PANEL_HEIGHT =
  "flex h-[min(72vh,680px)] max-h-[min(72vh,680px)] min-h-0 flex-col overflow-hidden";

export function DreamTeamGameView() {
  const dt = useDreamTeam();
  const {
    fillPercent,
    totalDailyImpulses,
    impulses,
    canCollectToday,
    collectDailyImpulses,
    toast,
  } = dt;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a
          href={pathHref()}
          className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к пути политеховца
        </a>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-sm font-medium text-brand-text-heavy">
            <Zap className="h-4 w-4" />
            {impulses} имп.
          </span>
          <Button
            size="sm"
            type={canCollectToday ? "fill" : "flat"}
            color="brand"
            disabled={!canCollectToday}
            onClick={collectDailyImpulses}
          >
            Собрать +{totalDailyImpulses}/день
          </Button>
        </div>
      </div>

      <div>
        <h1 className="font-roboto-flex text-heading-h2 font-heading-h2-medium text-primary">
          Команда мечты
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-secondary">
          Пирамида: ГС, под ним СП и ВС; у каждого ВС — 2 спеца, у каждого
          спеца — 2 МС. Откройте следующий модуль, когда
          заполните предыдущий.
        </p>
      </div>

      {toast ? (
        <p
          className="rounded-xl border border-brand-line-medium bg-brand-light/15 px-4 py-3 text-sm text-primary"
          role="status"
        >
          {toast}
        </p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_320px] xl:items-stretch">
        <PathCard className={GAME_PANEL_HEIGHT}>
          <ModulePyramidsCarousel dt={dt} />
        </PathCard>

        <PathCard className={GAME_PANEL_HEIGHT}>
          <LeaderStockPanel dt={dt} />
        </PathCard>
      </div>

      <p className="text-center text-sm text-secondary">
        Активный модуль заполнен на {fillPercent}% · в запасе {dt.reserveCount}{" "}
        из {dt.ownedCount} карт
      </p>
    </div>
  );
}
