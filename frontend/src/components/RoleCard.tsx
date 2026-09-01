import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RoleCardProps {
  icon: LucideIcon;
  role: string;
  description: string;
  accent: string;
  iconClass: string;
}

export function RoleCard({ icon: Icon, role, description, accent, iconClass }: RoleCardProps) {
  return (
    <Card className={`group relative overflow-hidden border-0 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-float`}>
      <div className={`absolute inset-x-0 top-0 h-1 ${accent}`} />
      <CardContent className="p-7">
        <div className={`mb-7 flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}>
          <Icon size={23} strokeWidth={1.9} />
        </div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-[#102a43]">{role}</h3>
          <ArrowUpRight size={19} className="text-slate-300 transition-colors group-hover:text-primary" />
        </div>
        <p className="max-w-[260px] text-sm leading-6 text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}