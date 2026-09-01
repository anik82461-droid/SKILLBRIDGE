import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  LineChart,
  Network,
  Radar,
} from "lucide-react";

const icons = { map: Radar, demand: BarChart3, curriculum: GraduationCap, credentials: CheckCircle2, portal: BriefcaseBusiness, match: Network, analytics: LineChart };

export function FeatureIcon({ name }: { name: keyof typeof icons }) {
  const Icon = icons[name];
  return <Icon size={20} strokeWidth={1.8} />;
}