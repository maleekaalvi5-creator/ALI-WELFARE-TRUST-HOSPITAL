import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  ShieldCheck, 
  X,
  Eye
} from 'lucide-react';
import { useHospitalContent } from '../context/HospitalContentContext';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { HeroSlide } from '../types/content';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenDonation: () => void;
}

// 7 Pristine Default Slides guaranteed to exist on disk as bulletproof fallback
const DEFAULT_7_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    order: 1,
    active: true,
    image: "/images/hospital-building.jpg",
    heading: "Main Medical Campus & Executive Hospital Complex",
    subheading: "Serving Humanity with Dignity & 100% Free Medical Care",
    description: "Multi-specialty charitable hospital established to provide dignified, subsidized, and 100% free medical treatment for deserving families across Gujranwala.",
    category: "Main Medical Campus",
    badge: "Official Facility",
    urduTitle: "مرکزی عمارت، او پی ڈی اور تشخیصی شعبہ",
    urduTagline: "مرکزی عمارت، او پی ڈی اور تشخیصی شعبہ — خدمتِ خلق ہمارا نصب العین",
    location: "Chahal Kalan Road, Main Campus, Qila Didar Singh",
    tag: "State-of-the-Art Charitable Healthcare Infrastructure",
    buttonText: "Book OPD Consultation",
    buttonUrl: "#booking"
  },
  {
    id: "slide-2",
    order: 2,
    active: true,
    image: "/images/dept-3d-dialysis.jpg",
    heading: "16-Bed Modern Hemodialysis & Renal Care Center",
    subheading: "100% Free Lifesaving Kidney Dialysis for Underprivileged Patients",
    description: "Equipped with automated hemodialysis machines and certified nephrology specialists, providing 100% free Zakat-sponsored life-saving hemodialysis sessions.",
    category: "Renal Care & Dialysis Wing",
    badge: "100% Free Dialysis",
    urduTitle: "جدید ہیمو ڈائیلاسز سنٹر — تاحیات مفت علاج",
    urduTagline: "مستحق گردوں کے مریضوں کے لیے تاحیات مفت ڈائیلاسز اور شفا کی امید",
    location: "Specialized Dialysis Wing, Ground Floor",
    tag: "100% Free Lifesaving Kidney Dialysis",
    buttonText: "Sponsor a Dialysis",
    buttonUrl: "/donate"
  },
  {
    id: "slide-3",
    order: 3,
    active: true,
    image: "/images/hospital-interior-1.jpg",
    heading: "Automated Clinical Pathology & Diagnostic Laboratory",
    subheading: "24/7 Accurate Diagnostics, Hematology & Color Doppler Sonology",
    description: "High-precision automated biochemistry analyzers, computerized reporting counters, and clinical sonology delivering prompt diagnostic accuracy.",
    category: "Pathology & Diagnostics",
    badge: "24/7 Diagnostics",
    urduTitle: "کمپیوٹرائزڈ پیتھالوجی لیب اور جدید الٹراساؤنڈ سنٹر",
    urduTagline: "تیز رفتار اور 100 فیصد مستند تشخیصی سہولیات چوبیس گھنٹے دستیاب",
    location: "Diagnostic Wing, Main Campus",
    tag: "Advanced Diagnostic Sonology & Pathology",
    buttonText: "View Lab Tests",
    buttonUrl: "/departments"
  },
  {
    id: "slide-4",
    order: 4,
    active: true,
    image: "/images/hospital-interior-2.jpg",
    heading: "Specialist Consultant Outpatient Examination Chambers",
    subheading: "Senior Medical Specialists Across Cardiology, Nephrology & Surgery",
    description: "Senior specialist consultants conducting thorough examinations with modern clinical instruments, subsidized consultations, and free medicines for the needy.",
    category: "Specialist Consultant OPD",
    badge: "Specialist Faculty",
    urduTitle: "ماہرینِ امراض کا او پی ڈی کلینک — ہمدردانہ معائنہ",
    urduTagline: "معیاری طبی مشاورت، تجربہ کار کنسلٹنٹس اور مفت ادویات کی فراہمی",
    location: "Consultant OPD Suites, First Floor",
    tag: "Subsidized & Free Specialist Consultations",
    buttonText: "Explore Specialist Doctors",
    buttonUrl: "/doctors"
  },
  {
    id: "slide-5",
    order: 5,
    active: true,
    image: "/images/hospital-interior-3.jpg",
    heading: "General Medical & Surgical Inpatient Recovery Ward",
    subheading: "Hygienic Patient Rooms, Round-the-Clock Nursing & Oxygen Manifold",
    description: "Clean inpatient recovery ward providing round-the-clock nursing care, post-surgical monitoring, and comfortable beds in a calm and dignified setting.",
    category: "Inpatient Care Ward",
    badge: "Inpatient Care",
    urduTitle: "مریضوں کا انڈور وارڈ اور آرام دہ بیڈز",
    urduTagline: "صاف ستھرا اور پرسکون وارڈ، 24 گھنٹے نرسنگ اور مریضوں کی دیکھ بھال",
    location: "First Floor Inpatient Wing",
    tag: "Clean & Sterile Care",
    buttonText: "Explore Campus Facilities",
    buttonUrl: "/campus"
  },
  {
    id: "slide-6",
    order: 6,
    active: true,
    image: "/images/dept-3d-emergency.jpg",
    heading: "24/7 Emergency Triage & Acute Trauma Resuscitation Unit",
    subheading: "Immediate Resuscitation, Cardiac Monitoring & Trauma Care",
    description: "Equipped for critical medical emergencies with dedicated doctor teams, central oxygen supply, emergency medication reserve, and ambulance response.",
    category: "Emergency & Trauma",
    badge: "24/7 Emergency",
    urduTitle: "ایمرجنسی و فوری طبی امداد کا شعبہ",
    urduTagline: "ہر لمحہ تیار — فوری ایمرجنسی طبی امداد اور ٹراما ریسوسیٹیشن",
    location: "Ground Floor Emergency Entrance",
    tag: "Immediate Emergency Care",
    buttonText: "Emergency Helpline",
    buttonUrl: "tel:+923007421142"
  },
  {
    id: "slide-7",
    order: 7,
    active: true,
    image: "/images/hospital-aerial.jpg",
    heading: "Spacious Multi-Story Hospital Campus & Open Grounds",
    subheading: "Modern Architecture with Dedicated Ambulance Access & Patient Ramps",
    description: "Thoughtfully designed healthcare campus featuring wheelchair access, wide patient waiting corridors, on-site pharmacy, and serene open grounds.",
    category: "Hospital Complex & Grounds",
    badge: "Registered Trust #1142",
    urduTitle: "ہسپتال کی وسیع عمارت اور سرسبز احاطہ",
    urduTagline: "کشادہ ملٹی سٹوری کیمپس اور سرسبز فلاحی ماحول — شفا کا قابلِ اعتماد مرکز",
    location: "Chahal Kalan Road, Qila Didar Singh",
    tag: "Registered Charitable Trust #1142",
    buttonText: "View Campus Map",
    buttonUrl: "/campus"
  }
];

const SLIDE_DURATION = 4000; // Faster brisk slide interval
const PROGRESS_TICK = 40;

/**
 * Letter-by-Letter Typewriter Heading Animation
 * Smoothly reveals heading characters with micro-stagger and opacity
 */
const TypewriterHeading: React.FC<{ text: string }> = ({ text }) => {
  const characters = useMemo(() => Array.from(text), [text]);

  return (
    <h1 
      id="hero-typewriter-heading"
      className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-black tracking-tight leading-[1.14] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.22,
            delay: Math.min(index * 0.016, 0.9), // quick elegant stagger
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenDonation }) => {
  const { content } = useHospitalContent();
  const heroConfig = content?.hero;
  const headerConfig = content?.header;

  // Single Source of Truth: Central Content Store slides, with validation & fallback
  const activeSlides = useMemo<HeroSlide[]>(() => {
    const rawSlides = heroConfig?.slides;
    if (Array.isArray(rawSlides) && rawSlides.length > 0) {
      // Validate: slide must not be null, must have image string, must be active
      const valid = rawSlides.filter(
        (s: any) => s && s.active !== false && s.image && typeof s.image === 'string' && s.image.trim().length > 0
      );
      if (valid.length > 0) {
        return valid;
      }
    }
    return DEFAULT_7_SLIDES;
  }, [heroConfig?.slides]);

  // Clean up legacy localStorage cache on mount so no corrupt state ever lingers
  useEffect(() => {
    try {
      localStorage.removeItem('awt_custom_hero_slides');
    } catch {
      // ignore
    }
  }, []);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Bounds safety
  const safeIndex = Math.min(Math.max(0, currentSlide), Math.max(0, activeSlides.length - 1));
  const activeSlide: HeroSlide = activeSlides[safeIndex] || DEFAULT_7_SLIDES[0];

  // Touch Swipe Handlers
  const touchStartX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setDirection('next');
    setProgress(0);
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setProgress(0);
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  const handleSelectSlide = (index: number) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 'next' : 'prev');
    setProgress(0);
    setCurrentSlide(index);
  };

  // Automatic Slider Engine: Runs smoothly and continuously, pauses on hover/lightbox
  useEffect(() => {
    if (isHovered || fullscreenImage) {
      return;
    }

    const progressTimer = setInterval(() => {
      setProgress((old) => {
        const next = old + (PROGRESS_TICK / SLIDE_DURATION) * 100;
        return next >= 100 ? 100 : next;
      });
    }, PROGRESS_TICK);

    const slideTimer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [isHovered, fullscreenImage, handleNext, currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const slideHeading = activeSlide.heading || activeSlide.headline || activeSlide.title || "Ali Welfare Trust Hospital";
  const slideSubheading = activeSlide.subheading || activeSlide.highlight || activeSlide.subline || "Serving Humanity with Dignity & 100% Free Medical Care";
  const slideUrdu = activeSlide.urduTagline || activeSlide.urduTitle || "خدمتِ خلق — معیاری علاج اور شفا کا مرکز";

  return (
    <section
      id="hero"
      aria-label="Ali Welfare Trust Hospital Hero Showcase"
      className="relative h-[530px] sm:h-[590px] md:h-[640px] lg:h-[680px] 2xl:h-[740px] 3xl:h-[820px] max-h-[90vh] bg-[#020b10] border-b border-teal-950/60 text-white overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsHeroDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsHeroDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsHeroDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          setIsUploadModalOpen(true);
        }
      }}
    >
      {/* Full Hero Drag & Drop Photo Indicator Overlay */}
      {isHeroDragging && (
        <div 
          id="hero-drag-overlay"
          className="absolute inset-0 z-50 bg-[#02131a]/95 backdrop-blur-md border-4 border-dashed border-teal-400 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200"
        >
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-3 border border-teal-400 shadow-2xl">
            <Upload className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
            Drop Image to Update Slider Photo
          </h3>
          <p className="text-xs sm:text-sm text-teal-200 font-bold max-w-md">
            Release your photo here to open the 7-Slide Manager and apply it immediately!
          </p>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. CINEMATIC 3D PERSPECTIVE & TRAVELING REVEAL STAGE        */}
      {/* Right side has zero heavy color wash: 100% natural, crisp!  */}
      {/* ============================================================ */}
      <div 
        id="hero-slider-perspective-stage"
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
        style={{ perspective: '1400px' }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`${activeSlide.id}-${safeIndex}-${activeSlide.image}`}
            custom={direction}
            initial={{
              opacity: 0.2,
              clipPath: direction === 'next' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
              scale: 1.05,
              z: 40,
              filter: 'brightness(1.05)'
            }}
            animate={{
              opacity: 1,
              clipPath: 'inset(0 0% 0 0%)',
              scale: 1,
              z: 0,
              filter: 'brightness(1)',
              transition: {
                clipPath: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.35, ease: 'easeOut' },
                scale: { duration: 4.5, ease: 'easeOut' },
                z: { duration: 0.52, ease: 'easeOut' }
              }
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              z: -50,
              filter: 'brightness(0.9)',
              transition: {
                opacity: { duration: 0.42, ease: 'easeInOut' },
                scale: { duration: 0.42, ease: 'easeInOut' },
                z: { duration: 0.42, ease: 'easeInOut' }
              }
            }}
            className="absolute inset-0 w-full h-full bg-[#020b10]"
          >
            <img
              id={`hero-slide-img-${safeIndex}`}
              src={activeSlide.image}
              alt={slideHeading}
              loading="eager"
              decoding="async"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (!el.src.includes('hospital-building.jpg')) {
                  el.src = '/images/hospital-building.jpg';
                }
              }}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Traveling Reveal Boundary Accent Line (Luminous blue-teal edge) */}
            <motion.div
              initial={{ opacity: 0.8, x: direction === 'next' ? '100vw' : '-100vw' }}
              animate={{ opacity: [0.8, 1, 0], x: direction === 'next' ? '-50vw' : '50vw' }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 w-1.5 bg-gradient-to-b from-transparent via-[#087f8c] to-transparent blur-[1px] pointer-events-none shadow-[0_0_15px_#087f8c]"
            />
          </motion.div>
        </AnimatePresence>

        {/* ============================================================ */}
        {/* 2. DUAL-ZONE ADAPTIVE GRADIENT OVERLAY                       */}
        {/* Left: Deep rich contrast gradient so text & Urdu pop!        */}
        {/* Center: Blends to 0% transparency                            */}
        {/* Right: ZERO heavy color wash so photography is crystal clear */}
        {/* ============================================================ */}
        {/* Desktop / Large Screen: Left 42% contrast gradient */}
        <div 
          id="hero-contrast-gradient-desktop"
          className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#020b10]/95 via-[#020b10]/80 via-42% to-transparent to-65% pointer-events-none" 
        />

        {/* Mobile / Tablet Portrait: Vertical contrast gradient */}
        <div 
          id="hero-contrast-gradient-mobile"
          className="sm:hidden absolute inset-0 bg-gradient-to-b from-[#020b10]/92 via-[#020b10]/65 via-55% to-transparent pointer-events-none" 
        />

        {/* Bottom subtle bar gradient for minimal controls readability */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#020b10]/80 via-[#020b10]/30 to-transparent pointer-events-none" />

        {/* Ambient Surgical-Teal Glow Orb: confined strictly behind top-left copy */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#087f8c]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {fullscreenImage && (
        <div 
          id="hero-fullscreen-lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            id="hero-lightbox-close"
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all cursor-pointer z-10"
            title="Close Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={fullscreenImage} 
            alt="Hospital View Fullscreen" 
            className="max-w-[96vw] max-h-[92vh] object-contain rounded-2xl shadow-2xl border border-white/20"
          />

          <button
            id="hero-lightbox-prev"
            onClick={(e) => { 
              e.stopPropagation(); 
              handlePrev(); 
              setFullscreenImage(activeSlides[(safeIndex - 1 + activeSlides.length) % activeSlides.length].image); 
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/25 cursor-pointer shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            id="hero-lightbox-next"
            onClick={(e) => { 
              e.stopPropagation(); 
              handleNext(); 
              setFullscreenImage(activeSlides[(safeIndex + 1) % activeSlides.length].image); 
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/25 cursor-pointer shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. HERO OVERLAY CONTENT CONTAINER                            */}
      {/* ============================================================ */}
      <div 
        id="hero-slider-overlay-container"
        className="absolute inset-0 flex flex-col justify-between p-4 sm:p-7 md:p-10 lg:p-12 2xl:p-16 z-20 site-container-wide w-full pointer-events-none"
      >
        
        {/* ============================================================ */}
        {/* TOP ROW: BADGES & PERMANENT SLIDE DISPLAY CONTROLS           */}
        {/* ============================================================ */}
        <div className="flex items-center justify-between gap-3 w-full pointer-events-auto">
          {/* Left: Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* 1. Official Facility Badge */}
            <div 
              id="hero-official-badge"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-teal-500/30 backdrop-blur-md text-xs font-bold text-slate-100 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
              <span>{activeSlide.category || activeSlide.badge || "Official Facility"}</span>
            </div>

            {/* 2. Zakat Verified Badge */}
            <div 
              id="hero-zakat-verified-badge"
              className="hidden xs:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-teal-500/30 backdrop-blur-md text-xs font-bold text-teal-200 shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <span>100% Zakat & Sadqah Verified</span>
            </div>
          </div>

          {/* Right: Display Controls (Fullscreen, Monospace Counter) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Fullscreen Button */}
            <button
              id="hero-fullscreen-btn"
              onClick={() => setFullscreenImage(activeSlide.image)}
              className="hidden xs:flex p-2 rounded-xl bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              title="View Image Fullscreen"
              aria-label="View Fullscreen"
            >
              <Eye className="w-3.5 h-3.5 text-teal-200" />
            </button>

            {/* Minimalist Slide Counter (e.g. 01 / 07) */}
            <span 
              id="hero-slide-counter"
              className="font-mono text-xs font-bold text-teal-300 px-3 py-1.5 rounded-xl bg-black/60 border border-teal-500/30 backdrop-blur-md shadow-inner"
            >
              {String(safeIndex + 1).padStart(2, '0')} / {String(activeSlides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MIDDLE SECTION: TYPOGRAPHY, TYPEWRITER & ACTION BUTTONS     */}
        {/* ============================================================ */}
        <div 
          id="hero-content-column"
          className="w-full max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mb-4 sm:mb-6 pointer-events-auto"
        >
          <div className="space-y-3 2xl:space-y-4">
            {/* 1. Urdu Calligraphy Tagline (dir="rtl") */}
            <motion.div
              key={`urdu-${activeSlide.id}-${safeIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              dir="rtl"
              className="font-urdu text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold leading-relaxed text-[#5eead4] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] text-right sm:text-left"
            >
              {slideUrdu}
            </motion.div>

            {/* 2. Interactive Letter-by-Letter Typewriter Heading */}
            <TypewriterHeading 
              key={`heading-${activeSlide.id}-${safeIndex}`} 
              text={slideHeading} 
            />

            {/* 3. Subheading (Stage 4) */}
            <motion.p
              key={`subheading-${activeSlide.id}-${safeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
              className="font-sans text-sm sm:text-base 2xl:text-lg font-semibold text-amber-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
            >
              {slideSubheading}
            </motion.p>

            {/* 4. Description (Stage 5) */}
            <motion.p
              key={`desc-${activeSlide.id}-${safeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              className="font-sans text-xs sm:text-sm md:text-base 2xl:text-lg leading-relaxed max-w-xl 2xl:max-w-2xl text-slate-200 drop-shadow-md font-medium"
            >
              {activeSlide.description}
            </motion.p>

            {/* 5. Tactile 3D Action Buttons (Header buttons remain untouched) */}
            <div 
              id="hero-action-buttons-group"
              className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2"
            >
              {/* Donate Now Button */}
              <motion.button
                id="hero-donate-now-btn"
                whileTap={{ scale: 0.94 }}
                onClick={onOpenDonation}
                className="btn-3d-gold relative px-5 py-2.5 sm:py-3 2xl:px-7 2xl:py-3.5 rounded-xl uppercase text-[#3a1d04] font-black text-xs sm:text-sm 2xl:text-base inline-flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg select-none group"
              >
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse shadow-[0_0_8px_#ef4444]" />
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600 group-hover:scale-110 transition-transform" />
                <span>{heroConfig?.donateButtonText || "DONATE NOW"}</span>
              </motion.button>

              {/* Book OPD Appointment */}
              <button
                id="hero-book-opd-btn"
                onClick={onOpenBooking}
                className="bg-[#087f8c] hover:bg-[#066570] px-5 py-2.5 sm:py-3 2xl:px-7 2xl:py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm 2xl:text-base flex items-center gap-2 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group border border-teal-400/40"
              >
                <Calendar className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>{activeSlide.buttonText || heroConfig?.opdButtonText || "Book OPD Consultation"}</span>
              </button>

              {/* 24/7 Helpline */}
              <a
                id="hero-247-emergency-btn"
                href={`tel:${headerConfig?.emergencyPhone || HOSPITAL_INFO.emergencyPhone}`}
                className="bg-black/60 hover:bg-black/90 backdrop-blur-xs border border-white/20 text-white font-bold text-xs sm:text-sm 2xl:text-base px-4 py-2.5 sm:py-3 2xl:px-6 2xl:py-3.5 rounded-xl flex items-center gap-2 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>24/7 Helpline: {headerConfig?.emergencyPhone || HOSPITAL_INFO.emergencyPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM NAVIGATION: LOCATION, SLIDE PILLS & PREV/NEXT         */}
        {/* ============================================================ */}
        <div 
          id="hero-bottom-controls-bar"
          className="w-full border-t border-white/10 pt-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-auto"
        >
          {/* Left: Location & Department Tag */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <div className="text-xs font-medium inline-flex items-center gap-1.5 text-amber-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{activeSlide.location || "Chahal Kalan Road, Main Campus, Qila Didar Singh"}</span>
            </div>
            <div className="text-xs font-semibold border-l border-white/20 pl-3 text-[#5eead4] truncate max-w-xs sm:max-w-md">
              {activeSlide.tag || "State-of-the-Art Charitable Healthcare Infrastructure"}
            </div>
          </div>

          {/* Right: Slide Indicators & Navigation Arrows */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Slim Animated Progress Bar */}
            <div className="hidden md:block w-24 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div 
                className="h-full bg-teal-400 rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Slide Indicator Pills */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide Selection">
              {activeSlides.map((s, idx) => (
                <button
                  key={s.id || idx}
                  id={`hero-slide-dot-${idx}`}
                  onClick={() => handleSelectSlide(idx)}
                  role="tab"
                  aria-selected={idx === safeIndex}
                  aria-label={`Go to slide ${idx + 1}: ${s.heading || s.title || `Slide ${idx + 1}`}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    idx === safeIndex
                      ? 'w-7 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]'
                      : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Navigation Arrows */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                id="hero-slider-prev-btn"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="p-2 rounded-full bg-black/60 hover:bg-teal-900/80 text-white border border-teal-500/30 backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="hero-slider-next-btn"
                onClick={handleNext}
                aria-label="Next Slide"
                className="p-2 rounded-full bg-black/60 hover:bg-teal-900/80 text-white border border-teal-500/30 backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
