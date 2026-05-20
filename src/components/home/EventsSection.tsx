import { EVENTS } from "@/data/homeContent";
import { HorizontalCarousel } from "@/components/ui/HorizontalCarousel";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function EventsSection() {
  return (
    <section>
      <SectionHeader title="Ближайшие мероприятия" />

      <HorizontalCarousel gapClass="gap-6">
        {EVENTS.map((event) => (
          <article
            key={event.id}
            className="group relative flex h-[200px] w-[330px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl"
          >
            <div
              className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ background: event.accent }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="relative z-10 flex flex-col gap-3 p-5">
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-medium px-3 py-1 text-xs font-medium text-on-brand"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-roboto-flex text-lg font-medium leading-snug text-primary">
                {event.title}
              </h3>
            </div>
          </article>
        ))}
      </HorizontalCarousel>
    </section>
  );
}



