import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TOURNAMENTS } from "@/data/pathContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PathCard } from "@/components/path/PathCard";

export function TournamentsSection() {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <section>
      <SectionHeader
        title="Турниры"
        action={
          <button
            type="button"
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-secondary transition-colors hover:bg-generic hover:text-primary"
          >
            Сортировка
            <ChevronDown
              className={`h-4 w-4 transition-transform ${sortOpen ? "rotate-180" : ""}`}
            />
          </button>
        }
      />

      <div className="flex flex-col gap-3">
        {TOURNAMENTS.map((item) => (
          <PathCard key={item.id} className="!p-4">
            <div className="flex gap-4">
              <div className="h-16 w-16 shrink-0 rounded-xl bg-generic-heavy" />
              <div className="min-w-0 flex-1">
                <h3 className="font-roboto-flex text-base font-medium text-primary">
                  {item.name}
                </h3>
                <dl className="mt-2 space-y-1 text-sm text-secondary">
                  <div className="flex gap-2">
                    <dt className="text-hint">Дата:</dt>
                    <dd>{item.date}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-hint">Участники:</dt>
                    <dd>{item.participants}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-hint">Призы:</dt>
                    <dd>{item.prizes}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </PathCard>
        ))}
      </div>
    </section>
  );
}



