import { Flame, Info, X, Check, Star, Clock } from "lucide-react";
import { DAILY_TASKS, WEEK_STREAK } from "@/data/pathContent";
import { PathCard } from "@/components/path/PathCard";

function WeekdayIcon({ status }: { status: (typeof WEEK_STREAK)[number]["status"] }) {
  if (status === "missed") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-danger-light text-danger-text-heavy">
        <X className="h-4 w-4" />
      </span>
    );
  }
  if (status === "done") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-positive-light text-positive-text-heavy">
        <Check className="h-4 w-4" />
      </span>
    );
  }
  if (status === "today") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-medium text-on-brand ring-2 ring-brand-line-medium">
        <Star className="h-4 w-4 fill-current" />
      </span>
    );
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-generic-heavy text-hint">
      <Clock className="h-4 w-4" />
    </span>
  );
}

export function DailyTasksWidget() {
  return (
    <PathCard>
      <h2 className="mb-4 font-roboto-flex text-lg font-medium text-primary">
        Ежедневки
      </h2>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-warning-text-heavy" />
          <span className="text-sm font-medium text-primary">x1 комбо</span>
        </div>
        <button
          type="button"
          className="text-hint transition-colors hover:text-secondary"
          aria-label="Подсказка о комбо"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-6 flex justify-between gap-1">
        {WEEK_STREAK.map((day) => (
          <div key={day.id} className="flex flex-col items-center gap-1.5">
            <WeekdayIcon status={day.status} />
            <span className="text-xs text-secondary">{day.label}</span>
          </div>
        ))}
      </div>

      <ul className="space-y-4">
        {DAILY_TASKS.map((task) => (
          <li
            key={task.id}
            className="flex items-start justify-between gap-3 border-t border-line pt-4 first:border-0 first:pt-0"
          >
            <span className="text-sm text-primary">{task.title}</span>
            <div className="flex shrink-0 flex-col items-end gap-1 text-xs">
              <span className="text-secondary">{task.coins} 🪙</span>
              <span className="text-brand-text-medium">{task.energy} ⚡</span>
            </div>
          </li>
        ))}
      </ul>
    </PathCard>
  );
}



