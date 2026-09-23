import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { Award, Heart, CheckCircle, Quote, ShieldCheck, Sparkles, Target, Compass, Camera, Upload, Check, Loader2, RefreshCw } from 'lucide-react';
import { LEADERSHIP, HOSPITAL_INFO, MISSION_AND_VALUES } from '../data/hospitalData';
import founderPhoto from '../assets/images/nazar.jpg';
import ceoPhoto from '../assets/images/zamin-alvi.jpg';
import directorPhoto from '../assets/images/khawar.jpg';

interface Leader3DMotionPhotoProps {
  photo: string;
  name: string;
  role: string;
}

const Leader3DMotionPhoto: React.FC<Leader3DMotionPhotoProps> = ({ photo, name, role }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. SCROLL 3D PERSPECTIVE ANIMATION:
  // Dynamically shifts subtle 3D tilt as user scrolls past the photo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);

  // 2. MOUSE 3D TILT ANIMATION WITH FLUID PHYSICS SPRINGS:
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 26 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const mouseRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [7, -7]);
  const mouseRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-7, 7]);

  // Combined 3D angles: Scroll tilt + Interactive mouse tilt
  const combinedRotateX = useTransform(
    [mouseRotateX, scrollRotateX],
    ([m, s]) => (m as number) + (s as number)
  );
  const combinedRotateY = useTransform(
    [mouseRotateY, scrollRotateY],
    ([m, s]) => (m as number) + (s as number)
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const badgeTitle = name.includes('Zamin') ? 'Chairman' : 'Director';

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: combinedRotateX,
        rotateY: combinedRotateY,
      }}
      className="w-full h-72 sm:h-80 md:h-84 lg:h-88 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border-3 sm:border-4 border-[#d7b56d] shadow-[0_16px_36px_-10px_rgba(9,47,58,0.25)] flex-shrink-0 relative transition-all duration-300 select-none box-border"
    >
      {/* Crystal-Clear Portrait */}
      <img
        src={photo}
        alt={name}
        className="w-full h-full object-cover object-[center_20%] select-none"
        style={{
          imageRendering: '-webkit-optimize-contrast',
          filter: 'contrast(1.03) brightness(1.01)',
        }}
      />

      {/* Role Badge (Chairman / Director) */}
      <div 
        className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08222b] border border-[#d7b56d] text-white shadow-md pointer-events-none select-none z-10"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 font-sans">
          {badgeTitle}
        </span>
      </div>
    </motion.div>
  );
};

export const FounderMemorial: React.FC = () => {
  const founder = LEADERSHIP.find((m) => m.id === 'nazar-alvi');
  const executiveTeam = LEADERSHIP.filter((m) => !m.isLate);

  const defaultLeaderPhotos: Record<string, string> = {
    'zamin-alvi': ceoPhoto,
    'khawar-awan': directorPhoto,
  };

  // State for uploaded/custom photos
  const [uploadedLeaderPhotos, setUploadedLeaderPhotos] = useState<Record<string, string>>(() => {
    try {
      const zamin = localStorage.getItem('ali_hospital_leader_zamin-alvi');
      const khawar = localStorage.getItem('ali_hospital_leader_khawar-awan');
      const map: Record<string, string> = {};
      if (zamin) map['zamin-alvi'] = zamin;
      if (khawar) map['khawar-awan'] = khawar;
      return map;
    } catch {
      return {};
    }
  });
  
  const [customFounderPhoto, setCustomFounderPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ali_hospital_founder_custom_photo');
    } catch {
      return null;
    }
  });

  const [savingTarget, setSavingTarget] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Hidden file inputs
  const founderInputRef = useRef<HTMLInputElement>(null);
  const zaminInputRef = useRef<HTMLInputElement>(null);
  const khawarInputRef = useRef<HTMLInputElement>(null);

  // Load saved photos from localStorage on mount
  useEffect(() => {
    const savedFounder = localStorage.getItem('ali_hospital_founder_custom_photo');
    if (savedFounder && savedFounder.startsWith('data:image')) {
      setCustomFounderPhoto(savedFounder);
    }
    const savedZamin = localStorage.getItem('ali_hospital_leader_zamin-alvi');
    const savedKhawar = localStorage.getItem('ali_hospital_leader_khawar-awan');
    setUploadedLeaderPhotos((prev) => {
      const updated = { ...prev };
      if (savedZamin && savedZamin.startsWith('data:image')) {
        updated['zamin-alvi'] = savedZamin;
      }
      if (savedKhawar && savedKhawar.startsWith('data:image')) {
        updated['khawar-awan'] = savedKhawar;
      }
      return updated;
    });
  }, []);

  const handleUploadPhoto = (id: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    setSavingTarget(id);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1400;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.90);

          if (id === 'nazar-alvi' || id === 'founder') {
            setCustomFounderPhoto(dataUrl);
            localStorage.setItem('ali_hospital_founder_custom_photo', dataUrl);
          } else {
            setUploadedLeaderPhotos((prev) => ({ ...prev, [id]: dataUrl }));
            localStorage.setItem(`ali_hospital_leader_${id}`, dataUrl);
          }

          setSavingTarget(null);
          setSyncStatus('Photo successfully saved to browser storage!');
          setTimeout(() => setSyncStatus(null), 4000);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const founderPhotoUrl = customFounderPhoto || founderPhoto;

  return (
    <section id="founder" className="py-8 sm:py-12 bg-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-teal-50/70 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-50/60 rounded-full blur-3xl -z-10" />

      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Award className="w-3.5 h-3.5 text-[#d7b56d]" />
            <span>Legacy of Devotion & Integrity</span>
          </div>

          <div className="font-urdu text-2xl sm:text-3xl font-bold text-[#087f8c] mb-1.5 drop-shadow-sm">
            بانی و سرپرستِ اعلیٰ — حاجی نذر حسین علوی (مرحوم)
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#092f3a] tracking-tight">
            Founded on Sincere Compassion <br />
            <span className="text-[#087f8c]">Guided by Exemplary Leadership</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6b7f84]">
            Established in 2005 to fulfill a sacred promise: delivering dignity, modern medicine, and free life-saving care to every underserved family in Qila Didar Singh.
          </p>
        </div>

        {/* Founder Tribute Hero Card (Late Nazar Hussain Alvi) */}
        {founder && (
          <div
            data-aos="fade-up"
            className="mb-8 sm:mb-10 bg-gradient-to-br from-[#092f3a] via-[#0b3b48] to-[#045d67] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-teal-500/20"
          >
            {/* Background watermark quote */}
            <Quote className="absolute -bottom-10 -right-8 w-64 h-64 text-white/5 pointer-events-none rotate-12" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Founder Authentic Image Frame - Permanently Embedded */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative group">
                  <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:w-[320px] h-80 sm:h-96 md:h-[420px] lg:h-[430px] rounded-2xl overflow-hidden border-4 sm:border-[5px] border-[#d7b56d] shadow-2xl bg-slate-900 relative mx-auto">
                    <img
                      src={founderPhotoUrl}
                      alt="Nazar Hussain Alvi (Late) - Late Founder & Visionary Patron"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.getAttribute('src') !== '/images/nazar.jpg') {
                          target.setAttribute('src', '/images/nazar.jpg');
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    {/* Status Pill on Photo */}
                    <div className="absolute bottom-3.5 left-3 right-3 text-center pointer-events-none">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#d7b56d] text-[#092f3a] shadow-xs inline-block">
                        Late Founder & Visionary
                      </span>
                    </div>
                  </div>

                  {/* Memorial Badge */}
                  <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-white text-[#092f3a] px-4 py-1.5 rounded-full text-xs font-extrabold shadow-lg border border-amber-300 whitespace-nowrap flex items-center gap-1.5 z-10 pointer-events-none">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>2005 – Eternal Legacy</span>
                  </div>
                </div>
              </div>

              {/* Founder Bio and Tribute */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-300 font-bold text-xs uppercase tracking-widest">
                    Tribute to the Founder
                  </span>
                </div>

                <div className="font-urdu text-xl sm:text-2xl text-amber-200 font-bold mb-1">
                  جناب نذر حسین علوی (مرحوم)
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">
                  {founder.name} <span className="text-amber-300 font-serif font-normal text-xl sm:text-2xl">(Late)</span>
                </h3>
                <p className="text-teal-200 text-sm font-semibold mb-4">
                  {founder.title} • Founder of Ali Welfare Trust Hospital (2005)
                </p>

                {/* Urdu Quote */}
                <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 mb-5">
                  <p className="font-urdu text-base sm:text-lg text-amber-100 mb-2 leading-relaxed">
                    &ldquo;دکھی انسانیت کی خدمت افضل ترین عبادت ہے، ہمارے دروازے ہمیشہ ہر ضرورت مند کے لیے کھلے رہنے چاہئیں۔&rdquo;
                  </p>
                  <p className="text-amber-200 text-sm sm:text-base font-serif italic mb-2">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                  <p className="text-xs text-slate-300">
                    — Nazar Hussain Alvi (Late), Founding Principles of Free Community Healthcare
                  </p>
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                  {founder.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-4 border-t border-teal-500/30">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-teal-100">
                    <CheckCircle className="w-4 h-4 text-[#d7b56d]" />
                    <span>Non-Profitable Registered Organization</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-teal-100">
                    <CheckCircle className="w-4 h-4 text-[#d7b56d]" />
                    <span>Serving Needy Patients Free of Charge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Mission & Values Section */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="font-urdu text-xl font-bold text-[#087f8c] mb-1">
              ہمارا مشن اور اقدار
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#092f3a] tracking-tight">
              Hospital Mission & Core Values
            </h3>
            <p className="text-xs sm:text-sm text-[#6b7f84] mt-1 max-w-2xl mx-auto">
              The enduring principles established by Nazar Hussain Alvi (Late) that shape every clinical service, treatment decision, and patient relationship today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission Card */}
            <div data-aos="fade-right" className="bg-gradient-to-br from-teal-50/90 to-cyan-50/40 rounded-3xl p-6 sm:p-8 border border-teal-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#087f8c] text-white flex items-center justify-center mb-4 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#087f8c]">
                    Foundational Purpose
                  </span>
                  <span className="font-urdu text-sm font-bold text-[#087f8c]">
                    ہمارا مشن
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#092f3a] tracking-tight mb-3">
                  Our Mission
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  {MISSION_AND_VALUES.mission}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-teal-200/60">
                <p className="font-urdu text-sm sm:text-base text-[#087f8c] font-semibold text-right leading-relaxed">
                  {MISSION_AND_VALUES.urduMission}
                </p>
              </div>
            </div>

            {/* Values & Vision Card */}
            <div data-aos="fade-left" className="bg-gradient-to-br from-amber-50/90 to-orange-50/40 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#d7b56d] text-[#092f3a] flex items-center justify-center mb-4 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-800">
                    Vision for Tomorrow
                  </span>
                  <span className="font-urdu text-sm font-bold text-amber-800">
                    اقدار اور وژن
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#092f3a] tracking-tight mb-3">
                  Values & Vision
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  {MISSION_AND_VALUES.vision}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60">
                <p className="font-urdu text-sm sm:text-base text-amber-800 font-semibold text-right leading-relaxed">
                  {MISSION_AND_VALUES.urduVision}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Executive Leadership (Chairman & CEO Zamin Ali Alvi, Director Khawar Abbas Awan) */}
        <div>
          <div className="text-center mb-8">
            <div className="font-urdu text-xl font-bold text-[#087f8c] mb-1">
              انتظامیہ اور بورڈ آف ٹرسٹیز
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#092f3a]">
              Board of Trustees & Executive Administration
            </h3>
            <p className="text-xs sm:text-sm text-[#6b7f84] mt-1">
              Guiding daily hospital management with uncompromising clinical and financial transparency
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1700px] mx-auto items-stretch">
            {executiveTeam.map((leader, index) => {
              const currentPhoto = uploadedLeaderPhotos[leader.id] || defaultLeaderPhotos[leader.id] || leader.imageUrl;

              return (
                <div
                  key={leader.id}
                  data-aos={index === 0 ? "fade-right" : "fade-left"}
                  className="bg-slate-50 hover:bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between box-border h-full"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-6 mb-5">
                      {/* Substantial, Dignified Portrait Frame with 3D Motion Reaction on Scroll and Mouse */}
                      <Leader3DMotionPhoto
                        photo={currentPhoto}
                        name={leader.name}
                        role={leader.role}
                      />

                      <div className="min-w-0 flex-1 text-left flex flex-col justify-start">
                        {/* 4K Ultra-Sharp Role Badge */}
                        <div className="flex items-center justify-between gap-3 mb-2.5">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 text-[#087f8c] text-xs font-extrabold uppercase tracking-wider border border-teal-200/80 shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                            <span>{leader.role}</span>
                          </span>
                          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 hidden sm:inline-block">
                            Board Member
                          </span>
                        </div>

                        <h4 className="text-2xl sm:text-3xl font-black text-[#092f3a] tracking-tight group-hover:text-[#087f8c] transition-colors leading-tight">
                          {leader.name}
                        </h4>

                        {/* Title (p:nth-of-type(1)) */}
                        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#087f8c] mt-1 mb-3.5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#d7b56d] flex-shrink-0" />
                          <span>{leader.title}</span>
                        </p>

                        {/* Uniform, Aligned Professional Description (p:nth-of-type(2)) */}
                        <p className="text-sm sm:text-[14.5px] text-slate-700 leading-relaxed font-normal text-left min-h-[4.75rem] flex items-start border-l-3 border-[#087f8c] pl-4 py-2.5 bg-white/95 rounded-r-xl shadow-2xs">
                          {leader.bio}
                        </p>
                      </div>
                    </div>
                  </div>

                  {leader.quote && (
                    <div className="pt-4 border-t border-slate-200/80 mt-auto">
                      <p className="text-xs sm:text-sm italic text-[#087f8c] font-medium text-left flex items-start gap-2">
                        <Quote className="w-4 h-4 text-[#d7b56d] flex-shrink-0 mt-0.5" />
                        <span>&ldquo;{leader.quote}&rdquo;</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
