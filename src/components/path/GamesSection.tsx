import { GAMES } from "@/data/pathContent";
import { HorizontalCarousel } from "@/components/ui/HorizontalCarousel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PATH_GAME, pathGameHref } from "@/routing/pathRoutes";

const GAME_ROUTES: Partial<Record<(typeof GAMES)[number]["id"], string>> = {
  team: pathGameHref(PATH_GAME.dreamTeam),
  fifteen: pathGameHref(PATH_GAME.fifteen),
};

export function GamesSection() {
  return (
    <section>
      <SectionHeader title="Игры" />
      <HorizontalCarousel gapClass="gap-4">
        {GAMES.map((game) => {
          const href = GAME_ROUTES[game.id];
          const CardTag = href ? "a" : "article";

          return (
            <CardTag
              key={game.id}
              href={href}
              className={`flex w-[min(280px,85vw)] shrink-0 flex-col rounded-2xl bg-generic-heavy p-5 ${
                href
                  ? "cursor-pointer transition-colors hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-line-heavy"
                  : ""
              }`}
            >
              <div className="mb-4 h-40 rounded-xl bg-page" />
              <h3 className="mb-2 font-roboto-flex text-lg font-medium text-primary">
                {game.title}
              </h3>
              <p className="text-sm leading-relaxed text-secondary">
                {game.description}
              </p>
              {href ? (
                <span className="mt-4 text-sm font-medium text-brand-text-heavy">
                  Играть →
                </span>
              ) : null}
            </CardTag>
          );
        })}
      </HorizontalCarousel>
    </section>
  );
}
