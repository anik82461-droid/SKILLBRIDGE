import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  light?: boolean;
}

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-teal-200" : "text-teal-700"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-teal-300" : "bg-orange-400"}`} />
      {children}
    </span>
  );
}