import { useMemo, useState } from "react";
import { Segmented } from "borrom-ds-test";
import {
  DIRECTIONS,
  DIRECTION_TRACKS,
  type DirectionTrack,
} from "@/data/homeContent";
import { HorizontalCarousel } from "@/components/ui/HorizontalCarousel";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function DirectionsSection() {
  const [track, setTrack] = useState<DirectionTrack>("all");

  const items = useMemo(
    () =>
      track === "all"
        ? DIRECTIONS
        : DIRECTIONS.filter((d) => d.track === track),
    [track]
  );

  return (
    <section>
      <SectionHeader
        title="20 направлений для успешной карьеры"
        filters={
          <Segmented
            value={track}
            onChange={setTrack}
            shape="round"
            options={DIRECTION_TRACKS.map((t) => ({
              value: t.id,
              label: t.label,
            }))}
          />
        }
      />

      <HorizontalCarousel showControls={false} gapClass="gap-6">
        {items.map((direction) => (
          <article
            key={direction.id}
            className="flex w-[min(330px,calc((100%-72px)/4))] shrink-0 flex-col overflow-hidden rounded-2xl bg-generic"
          >
            <div
              className="h-[200px] w-full shrink-0"
              style={{ background: direction.accent }}
            />
            <div className="flex flex-col gap-3 p-5 pt-4">
              <span className="w-fit rounded-full bg-inverse-heavy px-3 py-1 text-xs font-medium text-inverse-additional-heavy">
                {direction.tag}
              </span>
              <h3 className="font-roboto-flex text-lg font-medium leading-snug text-primary">
                {direction.title}
              </h3>
              <p className="line-clamp-4 text-sm leading-relaxed text-secondary">
                {direction.description}
              </p>
            </div>
          </article>
        ))}
      </HorizontalCarousel>
    </section>
  );
}



