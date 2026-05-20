import { useCallback, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "borrom-ds-test";

interface HorizontalCarouselProps {
  children: ReactNode;
  className?: string;
  gapClass?: string;
  showControls?: boolean;
  controlsClassName?: string;
}

export function HorizontalCarousel({
  children,
  className = "",
  gapClass = "gap-6",
  showControls = true,
  controlsClassName = "absolute -top-[52px] right-0 flex gap-1",
}: HorizontalCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(300, track.clientWidth * 0.8) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <div className={`relative ${className}`}>
      {showControls ? (
        <div className={controlsClassName}>
          <IconButton
            type="flat"
            color="inverse"
            size="sm"
            icon={ChevronLeft}
            aria-label="Назад"
            onClick={() => scrollBy(-1)}
          />
          <IconButton
            type="flat"
            color="inverse"
            size="sm"
            icon={ChevronRight}
            aria-label="Вперёд"
            onClick={() => scrollBy(1)}
          />
        </div>
      ) : null}
      <div
        ref={trackRef}
        className={`flex overflow-x-auto scroll-smooth pb-1 ${gapClass} [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {children}
      </div>
    </div>
  );
}

export function CarouselControls({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex gap-1">
      <IconButton
        type="flat"
        color="inverse"
        size="sm"
        icon={ChevronLeft}
        aria-label="Назад"
        onClick={onPrev}
      />
      <IconButton
        type="flat"
        color="inverse"
        size="sm"
        icon={ChevronRight}
        aria-label="Вперёд"
        onClick={onNext}
      />
    </div>
  );
}



