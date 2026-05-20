import { PlatformNavBar } from "@/components/home/PlatformNavBar";
import { DreamTeamSection } from "@/components/path/DreamTeamSection";
import { DreamTeamGameView } from "@/components/path/dreamTeam/DreamTeamGameView";
import { FifteenPuzzleSection } from "@/components/path/FifteenPuzzleSection";
import { GamesSection } from "@/components/path/GamesSection";
import { TournamentsSection } from "@/components/path/TournamentsSection";
import { PathSidebar } from "@/components/path/PathSidebar";
import { PageContainer } from "@/layouts/PageContainer";
import { PATH_GAME, usePathSubRoute } from "@/routing/pathRoutes";

export function PolytechPathPage() {
  const sub = usePathSubRoute();

  if (sub === PATH_GAME.dreamTeam) {
    return (
      <div className="min-h-screen bg-page text-primary">
        <PlatformNavBar activeId="path" />
        <PageContainer className="py-8">
          <DreamTeamGameView />
        </PageContainer>
      </div>
    );
  }

  if (sub === PATH_GAME.fifteen) {
    return (
      <div className="min-h-screen bg-page text-primary">
        <PlatformNavBar activeId="path" />
        <PageContainer className="py-8">
          <div className="mx-auto max-w-3xl">
            <FifteenPuzzleSection />
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page text-primary">
      <PlatformNavBar activeId="path" />

      <PageContainer className="py-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
          <main className="flex min-w-0 flex-1 flex-col gap-10">
            <DreamTeamSection />
            <GamesSection />
            <TournamentsSection />
          </main>
          <PathSidebar />
        </div>
      </PageContainer>
    </div>
  );
}
