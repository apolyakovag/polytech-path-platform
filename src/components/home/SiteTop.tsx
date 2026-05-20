import { PlatformNavBar } from "@/components/home/PlatformNavBar";
import { STORIES } from "@/data/homeContent";
import { PageContainer } from "@/layouts/PageContainer";
import { HorizontalCarousel } from "@/components/ui/HorizontalCarousel";

/** Шапка раздела «Про Алабугу»: навигация + сторис */
export function SiteTop() {
  return (
    <header className="bg-page">
      <PlatformNavBar activeId="about" />

      <PageContainer className="border-b border-generic pb-5 pt-4">
        <div aria-label="Сторис">
          <HorizontalCarousel showControls={false} gapClass="gap-3">
            {STORIES.map((story) => (
              <button
                key={story.id}
                type="button"
                className="group shrink-0"
                aria-label={story.label ?? `Сторис ${story.id}`}
              >
                <span
                  className="block h-16 w-16 rounded-2xl border-2 border-brand-medium transition-transform group-hover:scale-105"
                  style={{ background: story.accent }}
                />
              </button>
            ))}
          </HorizontalCarousel>
        </div>
      </PageContainer>
    </header>
  );
}



