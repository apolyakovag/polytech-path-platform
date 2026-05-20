import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/** Контейнер страницы: 1440px, боковые отступы 24px */
export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 ${className}`}>
      {children}
    </div>
  );
}



