import {
  Check,
  Gamepad2,
  ListChecks,
  Sparkles,
  Trophy,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DAILY_CHALLENGES, type DailyChallenge } from "@/data/dailyChallenges";
import { HorizontalCarousel } from "@/components/ui/HorizontalCarousel";

const ICONS: Record<DailyChallenge["icon"], LucideIcon> = {
  trophy: Trophy,
  game: Gamepad2,
  story: Sparkles,
  task: ListChecks,
  friend: UserPlus,
};

function isComplete(challenge: DailyChallenge) {
  return challenge.current >= challenge.target;
}

function ChallengeCard({ challenge }: { challenge: DailyChallenge }) {
  const done = isComplete(challenge);
  const Icon = ICONS[challenge.icon];
  const progressPct = Math.min(
    100,
    (challenge.current / challenge.target) * 100
  );

  return (
    <article
      className={`flex w-[min(220px,78vw)] shrink-0 flex-col overflow-hidden rounded-2xl border ${
        done
          ? "border-brand-line-medium bg-brand-light/10"
          : "border-line bg-generic-heavy"
      }`}
    >
      <div
        className={`flex items-center justify-between px-3 py-2 text-xs font-medium ${
          done
            ? "bg-brand-medium text-on-brand"
            : "bg-page text-secondary"
        }`}
      >
        <span>{done ? "Выполнено" : "В процессе"}</span>
        <span className="tabular-nums">
          {Math.min(challenge.current, challenge.target)} / {challenge.target}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-4 pt-3">
        <Icon
          className={`absolute right-3 top-3 h-10 w-10 ${
            done ? "text-brand-text-medium opacity-40" : "text-hint opacity-30"
          }`}
          strokeWidth={1.25}
        />

        <h4 className="pr-12 font-roboto-flex text-base font-semibold leading-snug text-primary">
          {challenge.title}
        </h4>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-secondary">
          {challenge.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <span className="text-sm font-medium text-primary">
            {challenge.reward} П
          </span>
          {done ? (
            <Check className="h-5 w-5 text-positive-text-heavy" />
          ) : (
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-page">
              <div
                className="h-full rounded-full bg-brand-medium"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function DailyChallengesPanel() {
  return (
    <section>
      <h3 className="mb-4 font-roboto-flex text-base font-medium text-primary">
        Ежедневные задания
      </h3>

      <HorizontalCarousel gapClass="gap-3" showControls>
        {DAILY_CHALLENGES.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </HorizontalCarousel>
    </section>
  );
}
