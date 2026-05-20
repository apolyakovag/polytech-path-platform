import { SiteTop } from "@/components/home/SiteTop";
import { DirectionsSection } from "@/components/home/DirectionsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { NewsSection } from "@/components/home/NewsSection";
import { StreamBanner } from "@/components/home/StreamBanner";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { PageContainer } from "@/layouts/PageContainer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-page text-primary">
      <SiteTop />
      <PageContainer className="flex flex-col gap-10 py-10">
        <DirectionsSection />
        <EventsSection />
        <NewsSection />
        <StreamBanner />
        <ArticlesSection />
      </PageContainer>
    </div>
  );
}



