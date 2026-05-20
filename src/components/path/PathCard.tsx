import type { ReactNode } from "react";

interface PathCardProps {
  children: ReactNode;
  className?: string;
}

export function PathCard({ children, className = "" }: PathCardProps) {
  return (
    <div className={`rounded-2xl bg-generic p-6 ${className}`}>{children}</div>
  );
}



