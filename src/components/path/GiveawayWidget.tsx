import { Button } from "borrom-ds-test";
import { PathCard } from "@/components/path/PathCard";

export function GiveawayWidget() {
  return (
    <PathCard className="flex flex-col items-center text-center">
      <h2 className="mb-6 w-full text-left font-roboto-flex text-lg font-medium text-primary">
        Розыгрыш
      </h2>
      <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-full border-2 border-dashed border-line bg-generic-heavy">
        <span className="text-sm text-hint">Приз</span>
      </div>
      <Button size="md" type="fill" color="brand" className="w-full">
        Принять участие
      </Button>
      <p className="mt-4 text-xs leading-relaxed text-secondary">
        Розыгрыши мерча и приглашений на мероприятия — механика удержания из
        программы сопровождения абитуриента.
      </p>
    </PathCard>
  );
}



