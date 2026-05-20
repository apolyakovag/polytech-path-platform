import { LEADERBOARD, USER_LEADERBOARD_RANK } from "@/data/pathContent";
import { Avatar } from "borrom-ds-test";
import { PathCard } from "@/components/path/PathCard";

export function LeaderboardWidget() {
  return (
    <PathCard>
      <h2 className="mb-2 font-roboto-flex text-lg font-medium text-primary">
        Доска лидеров
      </h2>
      <p className="mb-5 text-sm text-secondary">
        Твоё место{" "}
        <span className="font-medium text-primary">#{USER_LEADERBOARD_RANK}</span>
      </p>

      <ul className="space-y-3">
        {LEADERBOARD.map((player) => (
          <li key={player.id} className="flex items-center gap-3">
            <Avatar size={36} src="" initials="ИГ" alt={player.name} />
            <span className="flex-1 text-sm text-primary">{player.name}</span>
            <span className="text-sm text-secondary">#{player.rank}</span>
          </li>
        ))}
      </ul>
    </PathCard>
  );
}



