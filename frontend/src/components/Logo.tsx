import { ArrowUpRight } from "lucide-react";

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  return (
    <a href="#top" className="group inline-flex items-center gap-2.5" aria-label="SkillBridge home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-[0_5px_14px_rgba(15,118,110,0.28)]">
        <span className="absolute left-[9px] top-[9px] h-3.5 w-3.5 rounded-[5px] border-[2.5px] border-white" />
        <span className="absolute bottom-[8px] right-[8px] h-3.5 w-3.5 rounded-[5px] border-[2.5px] border-orange-300" />
        <ArrowUpRight className="absolute h-3.5 w-3.5 text-orange-300" strokeWidth={3} />
      </span>
      <span className={`font-display text-[1.2rem] font-bold tracking-tight ${light ? "text-white" : "text-[#102a43]"}`}>
        Skill<span className="text-primary">Bridge</span>
      </span>
    </a>
  );
}