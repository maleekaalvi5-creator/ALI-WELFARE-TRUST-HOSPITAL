import React from 'react';
import { 
  Activity, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  Building2,
  Droplets,
  Eye,
  Award
} from 'lucide-react';

export const InfiniteMarquee: React.FC = () => {
  const items = [
    { icon: Droplets, text: "Advanced Kidney Hemodialysis Unit", highlight: "24/7 Shifts" },
    { icon: Eye, text: "Phaco Stitchless Cataract Eye Surgery", highlight: "Free Camps" },
    { icon: Clock, text: "Round the Clock Emergency & Trauma", highlight: "Open 24/7" },
    { icon: Heart, text: "Meezan Bank Zakat & Sadqah Portal", highlight: "100% Direct Impact" },
    { icon: Activity, text: "4D Color Doppler & Digital Diagnostic Lab", highlight: "Precise Imaging" },
    { icon: ShieldCheck, text: "Registered Healthcare Trust #1142", highlight: "Est. 2005" },
    { icon: Award, text: "Founded by Late Nazar Hussain Alvi", highlight: "Compassionate Care" },
    { icon: Building2, text: "Main Campus: Qila Didar Singh Gujranwala", highlight: "Accessible" },
  ];

  // Duplicate for seamless looping
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="bg-[#052129] text-white py-4 overflow-hidden border-y border-teal-500/30 relative select-none z-10 shadow-md">
      {/* Edge gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#052129] via-[#052129]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#052129] via-[#052129]/80 to-transparent z-20 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8 sm:gap-12">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap text-slate-100 hover:text-white transition-colors py-0.5"
            >
              <div className="w-7 h-7 rounded-full bg-[#087f8c]/35 flex items-center justify-center text-amber-300 flex-shrink-0 border border-teal-400/30 shadow-xs">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-slate-100">{item.text}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 text-[11px] font-bold border border-teal-500/40 shadow-xs">
                {item.highlight}
              </span>
              <span className="text-amber-400/60 font-bold ml-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
