import { useMemo, useState } from "react";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { Chips, IconButton } from "borrom-ds-test";
import {
  ARTICLES,
  ARTICLE_FILTERS,
  type ArticleItem,
} from "@/data/homeContent";
import { SectionHeader } from "@/components/ui/SectionHeader";

type ArticleFilter = ArticleItem["category"];

export function ArticlesSection() {
  const [filter, setFilter] = useState<ArticleFilter>("all");

  const items = useMemo(
    () =>
      filter === "all"
        ? ARTICLES
        : ARTICLES.filter((article) => article.category === filter),
    [filter]
  );

  return (
    <section className="pb-4">
      <SectionHeader
        title="Статьи"
        filters={
          <>
            {ARTICLE_FILTERS.map((chip) => (
              <Chips
                key={chip.id}
                size="sm"
                type="outline"
                selected={filter === chip.id}
                onClick={() => setFilter(chip.id)}
              >
                {chip.label}
              </Chips>
            ))}
          </>
        }
        action={
          <IconButton
            type="ghost"
            color="inverse"
            size="sm"
            icon={LayoutGrid}
            aria-label="Сетка"
          />
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col overflow-hidden rounded-2xl bg-generic"
          >
            <div
              className="h-[140px] w-full"
              style={{ background: article.accent }}
            />
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="font-roboto-flex text-base font-medium leading-snug text-primary line-clamp-3">
                {article.title}
              </h3>
              <p className="line-clamp-3 flex-1 text-sm text-secondary">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-end">
                <ArrowUpRight className="h-5 w-5 text-hint transition-colors group-hover:text-brand-text-medium" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}



