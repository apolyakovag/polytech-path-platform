import { Heart, Zap } from "lucide-react";
import { Button } from "borrom-ds-test";
import { PathCard } from "@/components/path/PathCard";
import { DailyChallengesPanel } from "@/components/path/DailyChallengesPanel";
import { useFifteenPuzzle } from "@/hooks/useFifteenPuzzle";
import { FIFTEEN_MAX_LIVES } from "@/data/fifteenPuzzle";

export function FifteenPuzzleSection() {
  const {
    lastResult,
    canPlayToday,
    playedToday,
    phase,
    cards,
    stats,
    startGame,
    handleCardClick,
  } = useFifteenPuzzle();

  const isPlaying = phase === "playing";
  const showBoard = cards.length > 0 && (isPlaying || phase === "finished");

  return (
    <PathCard>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-roboto-flex text-heading-h2 font-heading-h2-medium text-primary">
            Пятнашки
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-secondary">
            Найди пары карточек лидеров. За каждую пару — +1 импульс. 3 жизни на
            партию, 1 игра в день. Заход засчитывается только после игры.
          </p>
        </div>

        {isPlaying ? (
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-primary">
              <Heart className="h-4 w-4 text-danger-text-heavy" />
              {stats.lives}/{FIFTEEN_MAX_LIVES}
            </span>
            <span className="flex items-center gap-1.5 text-brand-text-heavy">
              <Zap className="h-4 w-4" />
              {stats.impulses}/{stats.maxImpulses}
            </span>
            <span className="text-secondary">
              Пары: {stats.pairsFound}/{stats.maxPairs}
            </span>
          </div>
        ) : null}
      </div>

      {lastResult ? (
        <div className="mb-6 rounded-xl border border-line bg-generic-heavy p-4">
          <p className="mb-1 text-xs uppercase tracking-wide text-hint">
            Последний результат
          </p>
          <p className="text-sm text-primary">
            <span
              className={
                lastResult.outcome === "win"
                  ? "font-medium text-positive-text-heavy"
                  : "font-medium text-danger-text-heavy"
              }
            >
              {lastResult.outcome === "win" ? "Победа" : "Поражение"}
            </span>
            {" · "}
            пары {lastResult.pairsFound}/{lastResult.totalPairs}
            {" · "}+{lastResult.impulsesEarned} импульсов
            {" · "}
            {lastResult.mistakes} ошибок
          </p>
        </div>
      ) : null}

      {showBoard ? (
        <div
          className="mb-6 grid grid-cols-4 gap-2 sm:gap-3"
          role="grid"
          aria-label="Игровое поле Пятнашки"
        >
          {cards.map((card) => {
            const faceUp = card.flipped || card.matched;
            return (
              <button
                key={card.uid}
                type="button"
                disabled={!isPlaying || card.matched || card.flipped}
                onClick={() => handleCardClick(card.uid)}
                className={`flex aspect-square flex-col items-center justify-center rounded-xl border p-1 transition-colors ${
                  card.matched
                    ? "border-positive-line-medium bg-positive-light/20 opacity-70"
                    : faceUp
                      ? "border-transparent text-white"
                      : "border-line bg-generic-heavy text-hint hover:border-brand-line-medium"
                } ${!isPlaying ? "cursor-default" : ""}`}
                style={faceUp ? { backgroundColor: card.accent } : undefined}
                aria-label={
                  faceUp
                    ? `${card.label}, ${card.subtitle}`
                    : "Закрытая карточка"
                }
              >
                {faceUp ? (
                  <>
                    <span className="text-base font-bold sm:text-lg">
                      {card.label}
                    </span>
                    <span className="mt-0.5 text-center text-[9px] leading-tight opacity-90 sm:text-[10px]">
                      {card.subtitle}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-semibold">?</span>
                )}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {canPlayToday && !isPlaying ? (
          <Button size="md" type="fill" color="brand" onClick={startGame}>
            Начать игру
          </Button>
        ) : null}
        {playedToday && !isPlaying ? (
          <p className="text-sm text-secondary">
            Сегодня вы уже играли. Новая партия — завтра.
          </p>
        ) : null}
      </div>

      <DailyChallengesPanel />
    </PathCard>
  );
}


