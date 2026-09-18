import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ShieldCheck, ArrowRight, Activity, Award, CheckCircle } from 'lucide-react';

interface FounderHeroContentBlockProps {
  onExploreHistory: () => void;
  onOpenBooking: () => void;
  onOpenDonation: () => void;
  activeOrganHover?: string | null;
}

const CYCLIC_MESSAGES = [
  {
    primary: 'Every Part of You Matters.',
    secondary: 'Advanced Care. Human Compassion.',
    accent: 'Complete Healthcare for Every Part of You.',
    detail:
      'From complex neuro-vascular treatment and life-saving hemodialysis to restorative eye care and emergency medicine — founded to heal the whole person.',
  },
  {
    primary: 'Advanced Care. Human Compassion.',
    secondary: 'Complete Healthcare for Every Part of You.',
    accent: 'Every Part of You Matters.',
    detail:
      'Late Nazar Hussain Alvi envisioned a charitable sanctuary where advanced technology is guided by pure benevolence, providing free & dignified care since 2005.',
  },
  {
    primary: 'Complete Healthcare for Every Part of You.',
    secondary: 'Every Part of You Matters.',
    accent: 'Advanced Care. Human Compassion.',
    detail:
      'A multi-specialty institution serving Qila Didar Singh and thousands of surrounding families with cutting-edge diagnostics, surgical theaters, and charitable care.',
  },
];

export const FounderHeroContentBlock: React.FC<FounderHeroContentBlockProps> = ({
  onExploreHistory,
  onOpenBooking,
  onOpenDonation,
  activeOrganHover,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fadeState, setFadeState] = useState<'entering' | 'visible' | 'exiting'>('visible');

  const currentMsg = CYCLIC_MESSAGES[currentIdx];
  const fullText = currentMsg.primary;

  // Typewriter line-by-line reveal animation with smooth cyclic transition
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (charCount < fullText.length) {
        // Typing forward smoothly
        timer = setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, 55);
      } else {
        // Hold on complete text smoothly before gently transitioning
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 4200);
      }
    } else {
      if (charCount > 0) {
        // Soft backspace/erase
        timer = setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, 25);
      } else {
        // Switch message without sudden jump
        setIsDeleting(false);
        setCurrentIdx((prev) => (prev + 1) % CYCLIC_MESSAGES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, fullText]);

  const displayedPrimary = fullText.slice(0, charCount);

  return (
    <div
      className="relative z-20 w-full max-w-2xl backdrop-blur-xl bg-[#061b24]/75 sm:bg-[#071f2b]/70 border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] text-white overflow-hidden transition-[box-shadow,border-color] duration-500 ease-out"
      style={{
        boxShadow: activeOrganHover
          ? '0 25px 70px rgba(0, 240, 255, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          : '0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
    >
      {/* Specular Ambient Glow Top Stripe */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 via-amber-300 to-teal-400 opacity-80" />

      {/* Subtle Background Radial Light Pulse */}
      <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-teal-500/10 filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-amber-500/10 filter blur-3xl pointer-events-none" />

      {/* Top Header Eyebrow Badge */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-400/40 text-teal-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Ali Welfare Trust Hospital</span>
          <span className="text-amber-400 font-bold">• Est. 2005</span>
        </div>

        {activeOrganHover ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-900/60 border border-cyan-400/50 text-cyan-200 text-[11px] font-mono">
            <Activity className="w-3 h-3 text-cyan-300" />
            <span>Telemetry: {activeOrganHover}</span>
          </div>
        ) : (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 text-[11px] font-medium">
            <Award className="w-3 h-3 text-amber-400" />
            <span>Honoring Late Nazar Hussain Alvi</span>
          </div>
        )}
      </div>

      {/* Main Animated Headings with Smooth Fixed-Top Alignment */}
      <div className="min-h-[145px] sm:min-h-[165px] flex flex-col justify-start">
        {/* Line 1: Primary Dynamic Typewriter Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md min-h-[72px] sm:min-h-[96px]">
          <span>{displayedPrimary}</span>
          <span className="inline-block w-1 h-7 sm:h-9 ml-1.5 bg-cyan-400 align-middle animate-pulse shadow-[0_0_10px_#00f0ff]" />
        </h1>

        {/* Line 2: Secondary Supporting Reveal Heading */}
        <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 tracking-tight leading-snug">
          {currentMsg.secondary}
        </h2>

        {/* Line 3: Deep Philosophy Accent */}
        <p className="mt-1 text-sm sm:text-base font-semibold text-teal-300/90 tracking-wide">
          &ldquo;{currentMsg.accent}&rdquo;
        </p>
      </div>

      {/* Supporting Text Block */}
      <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
        {currentMsg.detail}
      </p>

      {/* Founder Tribute Core Dedication Badge */}
      <div className="mt-6 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
          <Heart className="w-5 h-5 text-white fill-white" />
        </div>
        <div className="text-xs sm:text-sm">
          <span className="font-bold text-amber-300 block">The Founder&apos;s Core Principle (2005):</span>
          <span className="text-slate-300 italic">
            &ldquo;Serving humanity in distress is the highest form of worship. Our doors must always remain open to every human soul in need.&rdquo;
          </span>
        </div>
      </div>

      {/* Key Vital Pillars Strip */}
      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 py-3 border-y border-white/10 text-center">
        <div className="px-2">
          <div className="text-base sm:text-xl font-extrabold text-teal-300 font-mono">2005</div>
          <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Established</div>
        </div>
        <div className="px-2 border-x border-white/10">
          <div className="text-base sm:text-xl font-extrabold text-amber-300 font-mono">500,000+</div>
          <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Patients Treated</div>
        </div>
        <div className="px-2">
          <div className="text-base sm:text-xl font-extrabold text-emerald-400 font-mono">100%</div>
          <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Charitable Trust</div>
        </div>
      </div>

      {/* Interactive Action Controls */}
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
        <button
          onClick={onExploreHistory}
          className="px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-900/40 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <span>Explore Founder&apos;s Story</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenBooking}
          className="px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <span>Book Consultation</span>
        </button>

        <button
          onClick={onOpenDonation}
          className="px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-900/30 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <Heart className="w-3.5 h-3.5 fill-white" />
          <span>Donate to Mission</span>
        </button>
      </div>
    </div>
  );
};
