import { ArrowRight } from "lucide-react";
import { NEWS } from "@/data/homeContent";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function NewsSection() {
  const featured = NEWS.find((n) => n.featured)!;
  const list = NEWS.filter((n) => !n.featured);

  return (
    <section>
      <SectionHeader title="Последние новости Алабуга Политех" />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <article className="relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0"
            style={{ background: featured.accent }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
          <div className="relative z-10 flex flex-col gap-3 p-6">
            <span className="w-fit rounded-full bg-brand-medium px-3 py-1 text-xs text-on-brand">
              {featured.category}
            </span>
            <h3 className="max-w-lg font-roboto-flex text-2xl font-medium leading-snug text-primary">
              {featured.title}
            </h3>
            <p className="max-w-md text-sm text-secondary">{featured.excerpt}</p>
          </div>
        </article>

        <div className="flex flex-col">
          <ul className="flex flex-1 flex-col gap-5">
            {list.map((item) => (
              <li key={item.id}>
                <article className="flex flex-col gap-2 border-b border-generic pb-5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-brand-light px-2 py-0.5 text-xs text-brand-text-heavy">
                      {item.category}
                    </span>
                    <time className="text-xs text-hint">{item.date}</time>
                  </div>
                  <h4 className="font-roboto-flex text-base font-medium leading-snug text-primary">
                    {item.title}
                  </h4>
                  <p className="line-clamp-2 text-sm text-secondary">
                    {item.excerpt}
                  </p>
                </article>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-1 self-end text-sm text-brand-text-medium hover:underline"
          >
            Смотреть все
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}



