import React from 'react';
import { Award } from 'lucide-react';
import founderPhotoFallback from '../../assets/images/nazar.jpg';

interface FounderPhotoForegroundProps {
  className?: string;
}

export const FounderPhotoForeground: React.FC<FounderPhotoForegroundProps> = ({
  className = '',
}) => {
  // Permanent, pristine archival founder portrait of Late Nazar Hussain Alvi
  const permanentPhotoSrc =
    founderPhotoFallback ||
    '/images/nazar.jpg' ||
    '/images/nazar.jpg';

  return (
    <div
      className={`relative z-30 flex flex-col items-center select-none w-full ${className}`}
    >
      {/* Museum Glass & Architectural Gold Matting Pedestal - Large, Prominent Scale */}
      <div className="relative w-full max-w-[360px] sm:max-w-[460px] md:max-w-[520px] lg:max-w-[560px] xl:max-w-[620px] transition-transform duration-500 ease-out">
        {/* Layer 3 Depth Shadow & Multi-Rim Gold Highlight */}
        <div className="absolute -inset-2 sm:-inset-4 rounded-3xl bg-gradient-to-b from-amber-400/35 via-teal-500/25 to-amber-600/35 blur-xl opacity-75 pointer-events-none" />

        {/* Outer Sculpted Frame */}
        <div className="relative rounded-3xl p-3.5 sm:p-5 md:p-6 bg-gradient-to-b from-[#1c2c35] via-[#0f1d24] to-[#081217] border-2 border-amber-400/70 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.2)]">
          {/* Inner Golden Bevel Inset */}
          <div className="relative rounded-2xl overflow-hidden border border-amber-300/50 bg-[#02080c] shadow-[inset_0_0_25px_rgba(0,0,0,0.95)]">
            {/* The Still Permanent Founder Photo: Big, crystal sharp, uncompressed, unretouched */}
            <img
              src={permanentPhotoSrc}
              alt="Late Nazar Hussain Alvi - Founder of Ali Welfare Trust Hospital"
              className="w-full h-auto aspect-[4/5] object-cover object-top block transition-none filter-none"
              style={{
                imageRendering: 'auto',
                WebkitFontSmoothing: 'antialiased',
              }}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== '/images/nazar.jpg') {
                  target.src = '/images/nazar.jpg';
                }
              }}
            />

            {/* Subtle Corner Vignette to anchor photo naturally without touching the face */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Respectful Memorial Ribbon Badge (Corner) */}
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 px-3 py-1.5 rounded-full bg-[#051822]/90 backdrop-blur-md border border-amber-400/70 text-amber-300 text-[11px] sm:text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Founder (Late)</span>
            </div>
          </div>

          {/* Commemorative Memorial Brass Plaque */}
          <div className="mt-3.5 sm:mt-5 pt-3.5 sm:pt-4 border-t border-amber-400/35 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-amber-400 tracking-wider uppercase font-mono">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Visionary Patron & Philanthropist</span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-1 font-serif">
              Nazar Hussain Alvi <span className="text-amber-300 font-normal text-sm sm:text-lg">(Late)</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              Founder • Ali Welfare Trust Hospital (2005)
            </p>

            <p className="text-[11px] sm:text-xs text-amber-200/90 italic mt-1.5 px-3 max-w-lg mx-auto">
              &ldquo;His compassion lives on in every life saved, every dialyzed kidney, and every restored sight.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
