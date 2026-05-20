import { Button } from "borrom-ds-test";
import { STREAM_TARGET } from "@/data/homeContent";
import { formatCountdown, useCountdown } from "@/hooks/useCountdown";

export function StreamBanner() {
  const countdown = useCountdown(STREAM_TARGET);

  return (
    <section>
      <div className="overflow-hidden rounded-2xl bg-generic-heavy">
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
            <p className="text-sm text-secondary">
              Прямой эфир:{" "}
              {STREAM_TARGET.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <h2 className="font-roboto-flex text-[28px] font-bold uppercase leading-tight tracking-tight text-primary lg:text-[32px]">
              ALABUGA POLYTECH CUP CS2: 5x5
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-secondary">
              Смотрите финал кибертурнира на платформе. Участвуйте в чате и
              получайте импульсы за активность. 🎮
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-1">
              <div
                className="font-mono text-2xl tabular-nums tracking-tight text-primary"
                aria-live="polite"
              >
                {countdown.finished
                  ? "Эфир начался"
                  : formatCountdown(countdown)}
              </div>
              <Button size="md" type="fill" color="inverse">
                Подробнее
              </Button>
            </div>
          </div>

          <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#ff6b35] via-[#f7931e] to-[#4a148c] p-8">
            <div className="text-center">
              <p className="text-lg font-bold uppercase tracking-[0.2em] text-white">
                Заходи на стрим
              </p>
              <p className="mt-3 font-roboto-flex text-5xl font-black italic text-white drop-shadow-lg">
                CS2
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



