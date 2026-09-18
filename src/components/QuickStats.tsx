import React from 'react';
import { Clock, Users, HeartHandshake, ShieldAlert, Activity } from 'lucide-react';
import { STATS } from '../data/hospitalData';
import { Interactive3DCard } from './Interactive3DCard';
import { Scroll3DReveal } from './Scroll3DReveal';

export const QuickStats: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Clock: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#087f8c]" />,
    Users: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#087f8c]" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-[#d7b56d]" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />,
    Activity: <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-[#11a7a0]" />,
  };

  return (
    <Scroll3DReveal 
      direction="up" 
      intensity="gentle" 
      className="relative pt-6 sm:pt-8 md:pt-10 pb-4 site-container box-border"
    >
      {/* Multi-device metric container:
          - Mobile (< 768px): Stacked single-column or 2-col touch-optimized cards
          - Tablet (768px - 1024px): 3-column / 2-row layout with scaled down gaps (gap-3) for touch targeting
          - Desktop (> 1024px): Full fluid 5-column grid with generous spacing and 3D hover states
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4 box-border">
        {STATS.map((stat) => (
          <Interactive3DCard
            key={stat.label}
            tiltMax={10}
            glowColor="rgba(8, 127, 140, 0.22)"
            className="h-full w-full"
          >
            <div className="h-full bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 sm:p-4 md:p-5 shadow-sm hover:shadow-md shadow-slate-200/60 border border-slate-100 hover:border-teal-300 transition-all duration-200 group cursor-default flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-0 box-border">
              <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-teal-50/80 group-hover:bg-teal-100/90 flex items-center justify-center flex-shrink-0 sm:mb-3 transition-colors">
                {iconMap[stat.icon]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#092f3a] tracking-tight group-hover:text-[#087f8c] transition-colors leading-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#12343b] mt-0.5 truncate">
                  {stat.label}
                </p>
                <p className="text-[11px] text-[#6b7f84] mt-0.5 truncate">
                  {stat.sub}
                </p>
              </div>
            </div>
          </Interactive3DCard>
        ))}
      </div>
    </Scroll3DReveal>
  );
};
