import { Zap, TrendingUp, Star } from 'lucide-react';

const LEVELS = {
  beginner: { icon: Zap, bg: 'bg-emerald-100 text-emerald-700' },
  easy: { icon: Zap, bg: 'bg-emerald-100 text-emerald-700' },
  intermediate: { icon: TrendingUp, bg: 'bg-amber-100 text-amber-700' },
  medium: { icon: TrendingUp, bg: 'bg-amber-100 text-amber-700' },
  advanced: { icon: Star, bg: 'bg-red-100 text-red-700' },
  hard: { icon: Star, bg: 'bg-red-100 text-red-700' },
};

export default function ProjectLevel({ difficulty = 'Beginner' }) {
  const key = difficulty.toLowerCase();
  const cfg = LEVELS[key] || LEVELS.beginner;
  const Icon = cfg.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold leading-none ${cfg.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {difficulty}
    </span>
  );
}
