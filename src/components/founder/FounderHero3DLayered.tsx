import React, { useState } from 'react';
import { Anatomy3DCanvas } from './Anatomy3DCanvas';
import { FounderHeroContentBlock } from './FounderHeroContentBlock';
import { FounderPhotoForeground } from './FounderPhotoForeground';
import { Layers, Sparkles, Activity, ShieldCheck, Heart } from 'lucide-react';

interface FounderHero3DLayeredProps {
  onExploreHistory: () => void;
  onOpenBooking: () => void;
  onOpenDonation: () => void;
}

export const FounderHero3DLayered: React.FC<FounderHero3DLayeredProps> = ({
  onExploreHistory,
  onOpenBooking,
  onOpenDonation,
}) => {
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);
  const [showLayersInspector, setShowLayersInspector] = useState(false);

  return (
    <section
      id="founder-hero-3d"
      className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#030c12] text-white py-12 sm:py-16 lg:py-20"
      aria-label="3-Layer Founder Experience"
    >
      {/* =========================================================================
          LAYER 1 — BACKGROUND: CONTINUOUS SEAMLESS INFINITE 3D ANATOMY SCROLL
          Realistic Medical 3D Visuals: Heart, Brain, Eyes, Kidneys, Lungs,
          Bones/Skeleton, Digestive System, Ultrasound, Dialysis, Blood Vessels,
          and Full Human Anatomy with Multi-Depth Cinematic Parallax.
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Anatomy3DCanvas
          interactive={true}
          onHoverOrgan={setHoveredOrgan}
          className="w-full h-full"
        />
      </div>

      {/* Atmospheric Medical Lighting & Contrast Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#02080c] via-transparent to-[#02080c]/80" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-at-c from-transparent via-[#02080c]/30 to-[#02080c]/90" />

      {/* =========================================================================
          FOREGROUND COMPOSITION CONTAINER (LAYERS 2 & 3)
          Desktop: Side-by-side with Layer 2 (Content) & Layer 3 (Still Photo)
          Mobile & Tablet: Vertical stacking with Layer 3 prominently anchored
          ========================================================================= */}
      <div className="relative z-20 site-container-wide w-full flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12 pt-8 sm:pt-4">
        {/* =====================================================================
            LAYER 2 — CONTENT: CLEAN GLASS / DEPTH-STYLE CONTENT BLOCK
            Typewriter / Reveal Animation Line by Line with Smooth Transitions:
            - “Every Part of You Matters.”
            - “Advanced Care. Human Compassion.”
            - “Complete Healthcare for Every Part of You.”
            ===================================================================== */}
        <div className="w-full lg:w-1/2 flex-shrink-0 flex justify-center lg:justify-start">
          <FounderHeroContentBlock
            onExploreHistory={onExploreHistory}
            onOpenBooking={onOpenBooking}
            onOpenDonation={onOpenDonation}
            activeOrganHover={hoveredOrgan}
          />
        </div>

        {/* =====================================================================
            LAYER 3 — FOUNDER PHOTO: STILL FOREGROUND PHOTO (NO ANIMATION ON FACE)
            Keeps permanent photo sharp, realistic, and clearly visible as the main
            human focus with architectural museum matting and brass dedication plate.
            Scaled prominently and large according to screen.
            ===================================================================== */}
        <div className="w-full lg:w-1/2 flex-shrink-0 flex justify-center lg:justify-end">
          <FounderPhotoForeground />
        </div>
      </div>

      {/* Floating 3-Layer Visual Composition Explainer Badge (Toggleable) */}
      <div className="absolute top-4 right-4 z-30 hidden sm:block">
        <button
          onClick={() => setShowLayersInspector(!showLayersInspector)}
          className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-teal-300 border border-teal-500/30 text-xs font-mono flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-all shadow-lg"
          title="Inspect 3-Layer Visual Architecture"
        >
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          <span>3-Layer Composition</span>
        </button>

        {showLayersInspector && (
          <div className="absolute right-0 mt-2 w-72 p-3.5 rounded-2xl bg-[#051822]/95 backdrop-blur-xl border border-teal-400/40 shadow-2xl text-xs text-slate-200 z-50 animate-fadeIn">
            <div className="font-bold text-teal-300 text-[11px] uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
              <span>Architectural Layers</span>
              <span className="text-[10px] text-amber-400">Production Ready</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 rounded-lg bg-white/5 border-l-2 border-teal-400">
                <span className="font-bold text-teal-300 block">Layer 1: Background</span>
                <span className="text-slate-300">
                  Continuous infinite 3D anatomy scroll (Heart, Brain, Eyes, Kidneys, Lungs, Bones, Digestive, Dialysis, Ultrasound, Blood Vessels & Full Hologram).
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border-l-2 border-cyan-400">
                <span className="font-bold text-cyan-300 block">Layer 2: Content Block</span>
                <span className="text-slate-300">
                  Clean glass depth panel with line-by-line typewriter reveal (&ldquo;Every Part of You Matters&rdquo;).
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border-l-2 border-amber-400">
                <span className="font-bold text-amber-300 block">Layer 3: Foreground Portrait</span>
                <span className="text-slate-300">
                  Still founder photo of Late Nazar Hussain Alvi, sharp & realistic without distortion or face animations.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Scroll Down Cue */}
      <div className="absolute bottom-3 inset-x-0 z-20 flex flex-col items-center justify-center pointer-events-none text-slate-400/70 text-xs">
        <button
          onClick={onExploreHistory}
          className="pointer-events-auto flex flex-col items-center gap-1 hover:text-teal-300 transition-colors cursor-pointer group"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-teal-300">
            Scroll To Memorial Chronicle
          </span>
          <div className="w-5 h-8 rounded-full border border-slate-500 group-hover:border-teal-400 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-teal-400 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
