import React from 'react';
import { 
  Building2, 
  Stethoscope, 
  HeartHandshake, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Clock, 
  Droplet, 
  Syringe, 
  CheckCircle2, 
  Heart,
  Baby,
  Eye,
  Microscope,
  Ambulance
} from 'lucide-react';

interface QualityPillar {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  description: string;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
  accentGlow: string;
}

export const MemorialInfiniteScroll: React.FC = () => {
  const pillars: QualityPillar[] = [
    {
      id: 'dialysis-3d',
      badge: 'Nephrology Wing',
      badgeColor: 'from-cyan-500 to-blue-600',
      title: 'Free Dialysis Station',
      subtitle: 'Charity Hemodialysis Care',
      metric: '30,000+',
      metricLabel: 'Dialysis Sessions Done',
      description: 'Zero-fee hemodialysis sessions operated with imported Fresenius multi-stage dialyzers.',
      iconBg: 'from-blue-600 to-cyan-500',
      iconColor: 'text-cyan-200',
      icon: Droplet,
      accentGlow: 'rgba(6, 182, 212, 0.28)'
    },
    {
      id: 'eye-camps-3d',
      badge: 'Surgical Ophthalmology',
      badgeColor: 'from-[#087f8c] to-teal-700',
      title: 'Phaco Cataract Suite',
      subtitle: 'Stitchless Laser Vision',
      metric: '100% Free',
      metricLabel: 'Needy Patient Procedures',
      description: 'Foldable high-grade intraocular lens implantation preserving eyesight across Punjab.',
      iconBg: 'from-[#087f8c] to-[#045d67]',
      iconColor: 'text-teal-200',
      icon: Eye,
      accentGlow: 'rgba(8, 127, 140, 0.28)'
    },
    {
      id: 'emergency-3d',
      badge: 'Critical Emergency',
      badgeColor: 'from-rose-500 to-red-600',
      title: '24/7 Trauma Resuscitation',
      subtitle: 'Immediate ICU & Triage',
      metric: '< 3 Mins',
      metricLabel: 'Response Door-to-Doctor',
      description: 'Round-the-clock emergency medical officers, oxygen pipeline grids, and trauma stabilization.',
      iconBg: 'from-rose-600 to-red-700',
      iconColor: 'text-rose-200',
      icon: Ambulance,
      accentGlow: 'rgba(244, 63, 94, 0.28)'
    },
    {
      id: 'maternity-3d',
      badge: 'Maternal & Neonatal',
      badgeColor: 'from-purple-500 to-pink-600',
      title: 'Gynecology & Incubator',
      subtitle: 'Safe Motherhood Unit',
      metric: '24/7',
      metricLabel: 'Female Surgeon On Duty',
      description: 'Private labor suites, phototherapy baby warmers, ultrasound baby heartbeat surveillance.',
      iconBg: 'from-purple-600 to-pink-600',
      iconColor: 'text-purple-200',
      icon: Baby,
      accentGlow: 'rgba(168, 85, 247, 0.28)'
    },
    {
      id: 'diagnostic-3d',
      badge: 'Diagnostic Excellence',
      badgeColor: 'from-[#087f8c] to-cyan-600',
      title: 'Automated Pathology & Doppler',
      subtitle: 'Internal Imaging Core',
      metric: '99.8%',
      metricLabel: 'Diagnostic Precision',
      description: 'Fully automated Roche and Sysmex analyzers for complete blood counts, HbA1c, and organ panels.',
      iconBg: 'from-[#087f8c] to-cyan-700',
      iconColor: 'text-cyan-200',
      icon: Microscope,
      accentGlow: 'rgba(8, 127, 140, 0.28)'
    },
    {
      id: 'zakat-3d',
      badge: 'Transparent Philanthropy',
      badgeColor: 'from-amber-500 to-orange-600',
      title: '100% Shariah Zakat Fund',
      subtitle: 'Audited Beneficiary Care',
      metric: 'Rs 0 Admin',
      metricLabel: 'Deduction from Zakat',
      description: 'Direct medical bill settlement for destitute families with verified Shariah advisory audit.',
      iconBg: 'from-amber-500 to-amber-700',
      iconColor: 'text-amber-200',
      icon: Heart,
      accentGlow: 'rgba(245, 158, 11, 0.28)'
    },
    {
      id: 'trust-3d',
      badge: 'Non-Profit Integrity',
      badgeColor: 'from-sky-500 to-indigo-600',
      title: 'Govt Registered Hospital',
      subtitle: 'Qila Didar Singh Hub',
      metric: 'Reg #1142',
      metricLabel: 'Welfare Directorate',
      description: 'Serving over 20+ surrounding rural communities with subsidised medicines and subsidized OPD.',
      iconBg: 'from-indigo-600 to-sky-700',
      iconColor: 'text-sky-200',
      icon: ShieldCheck,
      accentGlow: 'rgba(99, 102, 241, 0.28)'
    },
  ];

  // Tripled sequence for smooth infinite scrolling loop
  const loopPillars = [...pillars, ...pillars, ...pillars];

  return (
    <section 
      aria-label="Hospital 3D Excellence Carousel" 
      className="relative py-8 sm:py-10 bg-gradient-to-b from-[#092f3a] via-[#052129] to-[#092f3a] overflow-hidden border-y border-teal-500/20 select-none"
    >
      {/* Dynamic 3D Atmospheric Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(8,127,140,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,rgba(215,181,109,0.12),transparent_70%)] pointer-events-none" />
      
      {/* Subtle 3D Perspective Isometric Mesh Lines */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Edge Blur Gradients for Seamless Depth */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#092f3a] via-[#092f3a]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#092f3a] via-[#092f3a]/90 to-transparent z-20 pointer-events-none" />

      {/* Header Eyebrow & Title */}
      <div className="site-container mb-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-black tracking-wider uppercase backdrop-blur-xs mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Live Healthcare Excellence & Quality Pillars</span>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
          Continuing The Founder’s Vision With <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-amber-200 to-teal-200">Modern Clinical Facilities</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/80 max-w-2xl mx-auto mt-1">
          Continuous 24/7 charitable hospital operations serving patients across Qila Didar Singh and Gujranwala district.
        </p>
      </div>

      {/* 3D Infinite Perspective Marquee Track */}
      <div className="perspective-1000 overflow-hidden py-4">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 px-4">
          {loopPillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${index}`}
                className="group relative w-[310px] sm:w-[350px] shrink-0 rounded-2xl sm:rounded-3xl p-5 bg-gradient-to-b from-white/[0.10] to-white/[0.03] backdrop-blur-md border border-white/15 hover:border-teal-400/50 transition-all duration-300 transform-gpu hover:-translate-y-2 cursor-default"
                style={{
                  boxShadow: `0 14px 32px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 10px 24px -6px ${item.accentGlow}`
                }}
              >
                {/* 3D Specular Sheen Effect on Top Edge */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl" />
                
                {/* Ambient dynamic glow bubble inside card */}
                <div 
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: item.accentGlow }}
                />

                {/* Top Card Row: 3D Floating Icon + Specialty Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  {/* 3D Layered Isometric Icon Badge */}
                  <div 
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.iconBg} flex items-center justify-center p-2.5 shadow-lg border border-white/20 transform-gpu group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    style={{
                      boxShadow: `0 8px 18px -4px ${item.accentGlow}, inset 0 2px 2px rgba(255,255,255,0.4)`
                    }}
                  >
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>

                  {/* Specialty Badge */}
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r ${item.badgeColor} text-white shadow-xs`}>
                    {item.badge}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <h4 className="text-base sm:text-lg font-black text-white group-hover:text-teal-200 transition-colors tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs font-semibold text-teal-300/90 mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{item.subtitle}</span>
                </p>

                {/* Description */}
                <p className="text-xs text-slate-200/80 leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* 3D Highlight Metric Ribbon */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                      {item.metricLabel}
                    </span>
                    <span className="text-sm font-black text-amber-300 font-mono tracking-wide">
                      {item.metric}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-teal-300 group-hover:translate-x-1 transition-transform">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Quality</span>
                  </div>
                </div>

                {/* Bottom 3D Bevel Edge Reflection */}
                <div className="absolute inset-x-4 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Live Activity Status Pill */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-teal-500/30 text-[11px] font-bold text-slate-300 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Ali Welfare Trust Hospital • Continuous 24-Hour Active OPD & Emergency Inpatient Services</span>
        </div>
      </div>
    </section>
  );
};
