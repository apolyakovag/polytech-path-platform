import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
  filters?: ReactNode;
}

export function SectionHeader({ title, action, filters }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-roboto-flex text-heading-h2 font-heading-h2-medium leading-heading-h2 tracking-heading-h2 text-primary">
          {title}
        </h2>
        {filters ? (
          <div className="flex flex-wrap items-center gap-2">{filters}</div>
        ) : null}
        {!filters && action ? action : null}
      </div>
      {filters && action ? (
        <div className="flex justify-end">{action}</div>
      ) : null}
    </div>
  );
}



