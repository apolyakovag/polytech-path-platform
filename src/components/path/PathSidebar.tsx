import { DailyTasksWidget } from "@/components/path/DailyTasksWidget";
import { LeaderboardWidget } from "@/components/path/LeaderboardWidget";
import { GiveawayWidget } from "@/components/path/GiveawayWidget";

export function PathSidebar() {
  return (
    <aside className="flex w-full flex-col gap-6 lg:w-[320px] lg:shrink-0">
      <DailyTasksWidget />
      <LeaderboardWidget />
      <GiveawayWidget />
    </aside>
  );
}



