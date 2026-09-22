import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Compass, 
  Wifi, 
  Zap, 
  Droplets, 
  Heart, 
  Award, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  Navigation, 
  Maximize2, 
  X,
  Stethoscope,
  Microscope,
  Eye,
  AlertCircle,
  MessageCircle,
  Truck,
  Layers,
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import { HOSPITAL_INFO, GALLERY_ITEMS, DEPARTMENTS } from '../data/hospitalData';
import { useHospitalContent } from '../context/HospitalContentContext';

interface CampusPageProps {
  onNavigateHome: () => void;
  onViewDepartment?: (departmentId: string) => void;
  onBookAppointment?: (departmentId?: string) => void;
  onOpenDonation: () => void;
}

export const CampusPage: React.FC<CampusPageProps> = ({
  onNavigateHome,
  onViewDepartment,
  onBookAppointment,
  onOpenDonation,
}) => {
  const [activeFloor, setActiveFloor] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [heroPhotoIndex, setHeroPhotoIndex] = useState<number>(0);
  const [isHeroTourPaused, setIsHeroTourPaused] = useState<boolean>(false);

  const floorPlans = [
    {
      id: 0,
      floorName: "Ground Floor (Level 0)",
      tag: "Emergency, Diagnostics & Primary Reception",
      color: "border-emerald-600 bg-emerald-50/70 text-emerald-950",
      description: "Immediate triage, emergency patient drop-off, diagnostic imaging and 24/7 registration.",
      zones: [
        {
          name: "24/7 Emergency Trauma Bay",
          code: "G-01",
          desc: "Multi-bed emergency resuscitation bay with cardiac defibrillators, centralized piped oxygen, and crash carts.",
          icon: AlertCircle,
          urgent: true
        },
        {
          name: "Automated Diagnostic Pathology Lab",
          code: "G-02",
          desc: "Precision hematology, biochemistry, CBC analyzer, and rapid blood testing facility.",
          icon: Microscope,
        },
        {
          name: "4D Ultrasound & Color Doppler Wing",
          code: "G-03",
          desc: "Dedicated sonology suite equipped with high-resolution acoustic imaging probes and digital reporting.",
          icon: Activity,
        },
        {
          name: "Central Patient Registration & Triage Desk",
          code: "G-04",
          desc: "Computerized token generation desk, wheelchair issuing booth, and reception hall.",
          icon: Building2,
        },
        {
          name: "24/7 Hospital Pharmacy & Dispensary",
          code: "G-05",
          desc: "Stocked pharmaceutical dispensary offering free and heavily subsidized essential life-saving medications.",
          icon: Stethoscope,
        },
        {
          name: "Dedicated Ambulance Dock & Ramp",
          code: "G-06",
          desc: "Barrier-free sloped ambulance driveway allowing immediate gurney transfers directly into trauma bays.",
          icon: Truck,
        },
      ]
    },
    {
      id: 1,
      floorName: "First Floor (Level 1)",
      tag: "Dialysis Pavilion & Specialist OPD Chambers",
      color: "border-teal-600 bg-teal-50/70 text-teal-950",
      description: "World-class hemodialysis suites, nephrology clinic, and daily consultant outpatient chambers.",
      zones: [
        {
          name: "Specialized Kidney Dialysis Center",
          code: "F1-01",
          desc: "High-flux hemodialysis stations running multiple shifts, with dedicated segregated units for Hepatitis B/C patients.",
          icon: Droplets,
          highlight: true
        },
        {
          name: "Specialist Consultant OPD Suites",
          code: "F1-02",
          desc: "Private consultation chambers for Nephrologists, Cardiologists, Gynaecologists, Paediatricians, and Orthopaedic Surgeons.",
          icon: Stethoscope,
        },
        {
          name: "Air-Conditioned Waiting Lounge",
          code: "F1-03",
          desc: "Spacious seating for 120+ attendants with digital queue status monitors and drinking water stations.",
          icon: UsersIcon,
        },
        {
          name: "ECG & Cardiac Monitoring Suite",
          code: "F1-04",
          desc: "12-lead digital electrocardiography suite for cardiac screening and vitals stability testing.",
          icon: Activity,
        },
      ]
    },
    {
      id: 2,
      floorName: "Second Floor (Level 2)",
      tag: "Modular Surgical Theatres & Inpatient Wards",
      color: "border-blue-600 bg-blue-50/70 text-blue-950",
      description: "Sterile surgical wing, eye phaco surgery suites, and hygienic inpatient recovery wards.",
      zones: [
        {
          name: "Modular Eye Surgery (Phaco) Theater",
          code: "F2-01",
          desc: "Microscopic stitchless phacoemulsification eye surgical theater for cataract restoration and intraocular lens implants.",
          icon: Eye,
          highlight: true
        },
        {
          name: "General Surgical Operation Theater",
          code: "F2-02",
          desc: "Fully equipped surgical suite with laminar air flow, autoclave sterilization, and modern anaesthesia monitoring.",
          icon: ShieldCheck,
        },
        {
          name: "Inpatient General & Post-Op Wards",
          code: "F2-03",
          desc: "Hygienic male and female inpatient wards with motorized patient beds and continuous nursing oversight.",
          icon: Building2,
        },
        {
          name: "Central Sterile Supply Department (CSSD)",
          code: "F2-04",
          desc: "Hospital-wide high-pressure autoclave sterilization ensuring sterile surgical linen and instruments.",
          icon: Sparkles,
        },
      ]
    },
    {
      id: 3,
      floorName: "Campus Grounds & Infrastructure",
      tag: "Green Grounds, Utilities, Mosque & Parking",
      color: "border-amber-600 bg-amber-50/70 text-amber-950",
      description: "Ancillary support systems ensuring 100% uninterrupted power, sterile water, and spiritual tranquility.",
      zones: [
        {
          name: "Reverse Osmosis (RO) Medical Water Plant",
          code: "UT-01",
          desc: "Industrial-grade double-pass RO water filtration producing ultra-pure water for dialysis stations and sterilizers.",
          icon: Droplets,
        },
        {
          name: "Standby 100 kVA Generator & Hybrid Solar Farm",
          code: "UT-02",
          desc: "Seamless dual-source backup power ensuring operation theaters, dialysis units, and oxygen pumps never lose power.",
          icon: Zap,
        },
        {
          name: "Jamia Mosque & Attendant Prayer Hall",
          code: "UT-03",
          desc: "Spacious on-campus prayer hall and ablution facilities welcoming up to 150 worshippers simultaneously.",
          icon: Heart,
        },
        {
          name: "Ample Secure Vehicle & Motorcycle Parking",
          code: "UT-04",
          desc: "Spacious paved parking area with 24/7 security guarding and camera monitoring for visitor peace of mind.",
          icon: Truck,
        },
      ]
    }
  ];

  const campusFeatures = [
    {
      title: "100% Uninterrupted Power Supply",
      desc: "Powered by a synchronized heavy-duty 100 kVA diesel generator and modern solar inverter farm, guaranteeing zero downtime for critical life support and dialysis.",
      icon: Zap,
      metric: "0 sec Downtime"
    },
    {
      title: "Medical Grade RO Water Purification",
      desc: "Double-pass reverse osmosis plant meeting strict international microbiological standards required for hemodialysis and central sterile supplies.",
      icon: Droplets,
      metric: "99.9% Purity"
    },
    {
      title: "Infection Control & HEPA Filtration",
      desc: "Strict aseptic zones with positive pressure ventilation and regular hospital-wide surface chemical disinfection protocols.",
      icon: ShieldCheck,
      metric: "Sterile Standard"
    },
    {
      title: "Centralized Medical Gases Pipeline",
      desc: "Continuous piped oxygen and medical suction piped directly into trauma bays, post-operative recovery, and dialysis beds.",
      icon: Activity,
      metric: "24/7 Central Supply"
    },
    {
      title: "Universal Wheelchair Accessibility",
      desc: "Graded entrance ramps, low-incline transitions, wide doorways, and barrier-free restrooms built specifically for mobility-impaired patients.",
      icon: CheckCircle2,
      metric: "Full Accessibility"
    },
    {
      title: "24/7 Security & CCTV Surveillance",
      desc: "Hospital-wide high-definition surveillance network and trained security staff stationed at all gates and ward entries round the clock.",
      icon: ShieldCheck,
      metric: "365-Day Vigilance"
    }
  ];

  const { content } = useHospitalContent();

  const defaultCampusPhotos = [
    {
      id: "cp-1",
      title: "Main Hospital Entrance & Urdu Signboard",
      category: "exterior",
      imageUrl: "/images/hospital-building.jpg",
      desc: "The welcoming main gate and reception building on Main Chahal Kalan Road, Qila Didar Singh."
    },
    {
      id: "cp-2",
      title: "Aerial View of Campus Complex",
      category: "campus",
      imageUrl: "/images/hospital-aerial.jpg",
      desc: "Elevated aerial perspective showing the multi-story medical facility, courtyards, and grounds."
    },
    {
      id: "cp-3",
      title: "Central Diagnostic & Reporting Wing",
      category: "diagnostics",
      imageUrl: "/images/hospital-interior-1.jpg",
      desc: "Modern reception, blood sample collection booths, and digital reporting hall."
    },
    {
      id: "cp-4",
      title: "Specialist OPD Consulting Chambers",
      category: "clinical",
      imageUrl: "/images/hospital-interior-2.jpg",
      desc: "Hygienic consulting rooms where senior specialists examine outpatient consultations daily."
    },
    {
      id: "cp-5",
      title: "Inpatient Recovery & Medical Wards",
      category: "wards",
      imageUrl: "/images/hospital-interior-3.jpg",
      desc: "Air-conditioned patient recovery wards maintained under strict clinical hygiene protocols."
    },
    {
      id: "cp-6",
      title: "Advanced Dialysis & Surgical Suites",
      category: "clinical",
      imageUrl: "/images/gallery-2.jpg",
      desc: "Specialized clinical stations with medical-grade lighting, oxygen lines, and sterile curtains."
    }
  ];

  const campusPhotos = content?.campus?.photoFrames?.length
    ? content.campus.photoFrames.map((f, idx) => ({
        id: f.id || `cp-${idx}`,
        title: f.title,
        category: (idx % 4 === 0) ? 'exterior' : (idx % 4 === 1) ? 'campus' : (idx % 4 === 2) ? 'clinical' : 'wards',
        imageUrl: f.imageUrl,
        desc: f.caption || f.dateAdded || "Hospital Campus View"
      }))
    : defaultCampusPhotos;

  const filteredPhotos = galleryFilter === 'all' 
    ? campusPhotos 
    : campusPhotos.filter(p => p.category === galleryFilter);

  // Auto-advance hero 3D campus photo tour slider
  useEffect(() => {
    if (isHeroTourPaused) return;
    const timer = setInterval(() => {
      setHeroPhotoIndex((prev) => (prev + 1) % campusPhotos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHeroTourPaused, campusPhotos.length]);

  const currentHeroPhoto = campusPhotos[heroPhotoIndex] || campusPhotos[0];

  return (
    <div className="bg-[#fbf9f5] min-h-screen text-[#0f172a] selection:bg-[#087f8c] selection:text-white pb-20">
      
      {/* 1. TOP BREADCRUMB & CONTEXT STRIP */}
      <div className="bg-[#031d24] text-teal-200 border-b border-teal-800/40 py-3 px-4 sm:px-6 lg:px-8 text-xs font-medium">
        <div className="site-container flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button 
              onClick={onNavigateHome}
              className="text-teal-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-teal-600" />
            <span className="text-white font-bold">Hospital Campus & Infrastructure</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-teal-300/80">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Chahal Kalan, Qila Didar Singh</span>
            </span>
            <span className="hidden sm:inline-block">•</span>
            <span className="hidden sm:flex items-center gap-1 text-teal-200 font-semibold">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>24/7 Emergency Wing Open</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION WITH INTERACTIVE 3D CAMPUS TOUR SLIDER & INFINITE SCROLL */}
      <section 
        className="relative overflow-hidden bg-[#02131a] text-white pt-10 pb-6 sm:pt-14 sm:pb-8 shadow-2xl"
        onMouseEnter={() => setIsHeroTourPaused(true)}
        onMouseLeave={() => setIsHeroTourPaused(false)}
      >
        {/* Dynamic High-Resolution Atmospheric Campus Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url('${currentHeroPhoto.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02131a]/95 via-[#04242c]/90 to-[#02131a]/98 pointer-events-none" />
        
        {/* Tech Grid & Glowing Orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(#087f8c_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading & Key Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-500/50 text-teal-200 text-xs font-bold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                <span>Purpose-Built Medical Complex</span>
              </div>

              <div className="font-urdu text-2xl sm:text-3xl text-amber-300 leading-relaxed font-bold drop-shadow-md">
                علی ویلفیئر ٹرسٹ ہسپتال — جدید ترین کیمپس و طبی سہولیات
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-display">
                Modern Hospital Campus <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-200 to-cyan-200">
                  Built for Healing, Hope & Dignity
                </span>
              </h1>

              <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Located in Chahal Kalan, Qila Didar Singh, Ali Welfare Trust Hospital is a multi-specialty healthcare sanctuary. Spanning 24/7 emergency trauma, sterile surgical suites, kidney hemodialysis pavilion, diagnostic sonology, and spacious green recovery courtyards—built to ensure that no patient is ever turned away.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onBookAppointment?.()}
                  className="btn-3d-red px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Campus Appointment</span>
                </button>

                <a
                  href={HOSPITAL_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-gold px-5 py-3 rounded-xl font-black text-xs sm:text-sm text-[#3a1d04] flex items-center gap-2 shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                </a>

                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>Emergency: {HOSPITAL_INFO.emergencyPhone}</span>
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-800/60">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">40,000+</div>
                  <div className="text-[11px] text-emerald-300 font-medium">Sq. Ft. Built Campus</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300">24/7</div>
                  <div className="text-[11px] text-emerald-300 font-medium">Emergency Trauma Bay</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-emerald-300 font-medium">Power & RO Water Backup</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300">18+</div>
                  <div className="text-[11px] text-emerald-300 font-medium">Clinical Wings & Labs</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Virtual Campus Tour Multi-Perspective Slider */}
            <div className="lg:col-span-5">
              <div className="perspective-1000">
                <div className="relative rounded-2xl overflow-hidden bg-[#032029]/90 backdrop-blur-md border-2 border-amber-500/40 shadow-2xl group transition-all duration-300">
                  
                  {/* Active Photo Container */}
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
                    <img
                      src={currentHeroPhoto.imageUrl}
                      alt={currentHeroPhoto.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02131a] via-[#02131a]/20 to-black/30" />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span>Angle {heroPhotoIndex + 1} of {campusPhotos.length}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedPhoto(currentHeroPhoto)}
                        className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 hover:bg-teal-600 text-white border border-white/20 backdrop-blur-md transition-all flex items-center gap-1 cursor-pointer"
                        title="Open Fullscreen Lightbox"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Fullscreen</span>
                      </button>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeroPhotoIndex((prev) => (prev - 1 + campusPhotos.length) % campusPhotos.length);
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 hover:bg-teal-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                        title="Previous View"
                        aria-label="Previous View"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeroPhotoIndex((prev) => (prev + 1) % campusPhotos.length);
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 hover:bg-teal-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                        title="Next View"
                        aria-label="Next View"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Floating Caption Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#031d24]/90 backdrop-blur-md border border-teal-700/50 text-white">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5 truncate">
                          <Building2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                          <span className="truncate">{currentHeroPhoto.title}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-teal-600 text-white flex-shrink-0">
                          {currentHeroPhoto.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-teal-100 line-clamp-1">
                        {currentHeroPhoto.desc}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Thumbnail Strip */}
                  <div className="p-3 bg-[#02131a] border-t border-teal-800/40">
                    <div className="flex items-center justify-between gap-1.5 mb-2">
                      <span className="text-[11px] font-bold text-slate-300">
                        Select Campus View:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsHeroTourPaused(!isHeroTourPaused)}
                          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                        >
                          {isHeroTourPaused ? <Play className="w-2.5 h-2.5 text-amber-300" /> : <Pause className="w-2.5 h-2.5" />}
                          <span>{isHeroTourPaused ? 'Play' : 'Pause'}</span>
                        </button>
                        <span className="text-[10px] font-mono text-slate-400">
                          {heroPhotoIndex + 1}/{campusPhotos.length}
                        </span>
                      </div>
                    </div>

                    {/* 6 Miniature Perspective Buttons */}
                    <div className="grid grid-cols-6 gap-1.5">
                      {campusPhotos.map((photo, idx) => (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => setHeroPhotoIndex(idx)}
                          className={`relative rounded-lg overflow-hidden h-10 border transition-all cursor-pointer group/thumb ${
                            idx === heroPhotoIndex 
                              ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105' 
                              : 'border-white/20 opacity-60 hover:opacity-100'
                          }`}
                          title={photo.title}
                        >
                          <img
                            src={photo.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Campus Address & Verification Bar */}
                  <div className="px-4 py-2.5 bg-[#010c10] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">Chahal Kalan Road, Qila Didar Singh</span>
                    </span>
                    <span className="font-mono text-emerald-400 font-bold flex-shrink-0">
                      24/7 Open
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Continuous Infinite Marquee Ribbon of Campus Engineering & Infrastructure Highlights */}
          <div className="mt-8 sm:mt-10 pt-4 border-t border-white/10 overflow-hidden relative group">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Engineering & Clinical Infrastructure Highlights</span>
            </div>

            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <div className="animate-marquee flex items-center gap-3 py-1">
                {/* Duplicate campusFeatures array for seamless infinite marquee */}
                {[...campusFeatures, ...campusFeatures].map((feat, i) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={`${feat.title}-${i}`}
                      className="flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-teal-900/60 border border-white/10 hover:border-amber-400/50 backdrop-blur-sm transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-500/40 flex items-center justify-center text-amber-300 flex-shrink-0">
                        <FeatIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white whitespace-nowrap">
                          {feat.title}
                        </div>
                        <div className="text-[10px] text-emerald-300 font-medium whitespace-nowrap">
                          {feat.metric}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE CAMPUS ARCHITECTURAL NAVIGATOR (FLOORS & WINGS) */}
      <section className="py-14 site-container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100 text-[#087f8c] text-xs font-extrabold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Campus Layout & Floor Guide</span>
          </div>

          <div className="font-urdu text-2xl text-teal-800 font-bold mb-1">
            ہسپتال کے مختلف شعبہ جات اور فلور کا نقشہ
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] tracking-tight">
            Explore Our Multi-Level Clinical Facilities
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Navigate through each level of our hospital to locate diagnostic laboratories, surgical suites, and specialized clinics.
          </p>
        </div>

        {/* Floor Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          {floorPlans.map((floor) => {
            const isActive = activeFloor === floor.id;
            return (
              <button
                key={floor.id}
                onClick={() => setActiveFloor(floor.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-[#087f8c] text-white border-[#087f8c] shadow-md shadow-teal-950/20'
                    : 'bg-white text-slate-700 hover:bg-teal-50/50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-black uppercase tracking-wider ${isActive ? 'text-amber-300' : 'text-teal-700'}`}>
                    Level {floor.id === 3 ? 'G-Ext' : floor.id}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
                <div className={`font-bold text-sm leading-snug ${isActive ? 'text-white' : 'text-[#0f172a]'}`}>
                  {floor.floorName}
                </div>
                <div className={`text-[11px] mt-1 line-clamp-1 ${isActive ? 'text-emerald-200' : 'text-slate-500'}`}>
                  {floor.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Floor Content Display */}
        {(() => {
          const current = floorPlans[activeFloor];
          return (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-black">
                      {current.floorName}
                    </span>
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                      • {current.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
                    {current.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => onBookAppointment?.()}
                    className="btn-3d-red px-4 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book on this Level</span>
                  </button>
                </div>
              </div>

              {/* Floor Zones Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {current.zones.map((zone, idx) => {
                  const Icon = zone.icon;
                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        zone.urgent
                          ? 'border-rose-300 bg-rose-50/40 hover:border-rose-400'
                          : zone.highlight
                          ? 'border-amber-300 bg-amber-50/40 hover:border-amber-400'
                          : 'border-slate-200/90 bg-slate-50/60 hover:bg-emerald-50/30 hover:border-emerald-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            zone.urgent 
                              ? 'bg-rose-600 text-white'
                              : zone.highlight
                              ? 'bg-amber-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {zone.code}
                          </span>
                          <Icon className={`w-4 h-4 ${
                            zone.urgent 
                              ? 'text-rose-600' 
                              : zone.highlight 
                              ? 'text-amber-700' 
                              : 'text-emerald-700'
                          }`} />
                        </div>

                        <h3 className="text-sm font-bold text-[#0f172a] leading-tight mb-1">
                          {zone.name}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {zone.desc}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Fully Operational</span>
                        </span>
                        {zone.urgent && (
                          <span className="font-extrabold text-rose-600 animate-pulse">
                            24/7 Resuscitation
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4. CAMPUS TECHNICAL & HYGIENE INFRASTRUCTURE SPECIFICATIONS */}
      <section className="py-12 bg-[#f4f7f6] border-y border-slate-200/80">
        <div className="site-container">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Engineering & Clinical Hygiene</span>
            </div>

            <div className="font-urdu text-2xl text-emerald-800 font-bold mb-1">
              جدید ٹیکنالوجی اور اعلیٰ سینیٹری و ہائجین معیارات
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Clinical Infrastructure & Safety Standards
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Engineered to meet stringent hospital hygiene protocols, uninterrupted power redundancy, and sterile patient recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {campusFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                        {feat.metric}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0f172a] mb-1.5">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Standard Operating Compliance</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. VISUAL PHOTO GALLERY OF CAMPUS & WARDS */}
      <section className="py-14 site-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Campus Photography</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Visual Tour of Hospital Facilities
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Authentic photographs of our main gate, diagnostic rooms, consultation chambers, and dialysis stations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'exterior', label: 'Exterior & Grounds' },
              { id: 'diagnostics', label: 'Diagnostics & Lab' },
              { id: 'clinical', label: 'Clinical Suites' },
              { id: 'wards', label: 'Patient Wards' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setGalleryFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === f.id
                    ? 'bg-[#087f8c] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer relative"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {photo.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-sm text-[#0f172a] mb-1 group-hover:text-emerald-700 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VISITING HOURS, AMENITIES & VISITOR POLICIES */}
      <section className="py-12 bg-white border-y border-slate-200/90">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Schedule & Visiting Rules */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  <span>Visitor Information</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">
                  Visiting Hours & Hospital Guidelines
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  We balance warm family support with strict sterile conditions to ensure rapid patient recovery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                  <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm mb-1">
                    <AlertCircle className="w-4 h-4 text-emerald-700" />
                    <span>Emergency & Trauma</span>
                  </div>
                  <div className="text-lg font-black text-emerald-900">24 Hours / 7 Days</div>
                  <p className="text-xs text-emerald-800/80 mt-1">
                    Always open, every single day including weekends and national holidays.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/70">
                  <div className="flex items-center gap-2 font-bold text-teal-950 text-sm mb-1">
                    <Stethoscope className="w-4 h-4 text-teal-700" />
                    <span>Specialist OPD Clinics</span>
                  </div>
                  <div className="text-lg font-black text-teal-900">8:00 AM – 10:00 PM</div>
                  <p className="text-xs text-teal-800/80 mt-1">
                    Monday to Saturday. Evening specialist consultations available.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70">
                  <div className="flex items-center gap-2 font-bold text-blue-950 text-sm mb-1">
                    <Clock className="w-4 h-4 text-blue-700" />
                    <span>Inpatient Ward Visiting Hours</span>
                  </div>
                  <div className="text-sm font-black text-blue-900">
                    11:00 AM – 1:00 PM & 5:00 PM – 7:00 PM
                  </div>
                  <p className="text-xs text-blue-800/80 mt-1">
                    Restricted hours to promote sterile infection control and rest.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70">
                  <div className="flex items-center gap-2 font-bold text-amber-950 text-sm mb-1">
                    <Droplets className="w-4 h-4 text-amber-800" />
                    <span>Dialysis Unit Shifts</span>
                  </div>
                  <div className="text-sm font-black text-amber-900">
                    Morning, Afternoon & Night Shifts
                  </div>
                  <p className="text-xs text-amber-800/80 mt-1">
                    Scheduled shifts to accommodate registered kidney patients round-the-clock.
                  </p>
                </div>
              </div>

              {/* Guidelines Checklist */}
              <div className="space-y-2 pt-2">
                <div className="font-bold text-sm text-[#0f172a]">Campus Visitor Protocols:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>1 attendant permitted per admitted patient</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>100% Smoke-Free & Tobacco-Free Campus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Hand sanitization mandatory at ward doors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Wheelchairs available free at Main Gate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Driving Directions & Distance Reference */}
            <div className="lg:col-span-5 bg-[#031d24] rounded-2xl p-6 text-white border border-teal-800/60 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4" />
                  Driving Times & Nearby Cities
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-800/80 text-teal-200">
                  Easy Highway Access
                </span>
              </div>

              <p className="text-xs text-teal-100/90 leading-relaxed">
                Ali Welfare Trust Hospital is conveniently located along Chahal Kalan Road in Qila Didar Singh, with prompt paved access from Gujranwala City, Hafizabad Road, and G.T. Road bypasses:
              </p>

              <div className="space-y-2.5">
                {[
                  { city: "Gujranwala City Center (G.T. Road)", time: "20 – 25 Minutes", dist: "~14 km" },
                  { city: "Hafizabad City", time: "30 – 35 Minutes", dist: "~28 km" },
                  { city: "Kamoke & Rahwali Cantonment", time: "30 – 35 Minutes", dist: "~24 km" },
                  { city: "Wazirabad Junction", time: "35 – 40 Minutes", dist: "~32 km" },
                ].map((route, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="font-bold text-white">{route.city}</span>
                    <div className="text-right">
                      <span className="text-amber-300 font-extrabold">{route.time}</span>
                      <span className="text-[10px] text-emerald-300/70 ml-1.5">({route.dist})</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={HOSPITAL_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-gold w-full py-2.5 rounded-xl font-black text-xs text-[#3a1d04] flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Live Navigation in Google Maps</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE GOOGLE MAPS EMBED & ADDRESS BAR */}
      <section className="py-14 site-container">
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                Hospital Geographic Location
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a]">
                Ali Welfare Trust Hospital, Main Campus
              </h3>
              <p className="text-xs text-slate-600">
                Chahal Kalan, Qila Didar Singh, Gujranwala, Punjab, Pakistan
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={HOSPITAL_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-gold px-4 py-2 rounded-xl text-xs font-black text-[#3a1d04] flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Maps App</span>
              </a>
            </div>
          </div>

          <div className="relative h-96 w-full bg-slate-200">
            <iframe
              src={HOSPITAL_INFO.mapEmbedUrl}
              title="Ali Welfare Trust Hospital Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* 8. PHOTO DETAIL MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-200 relative"
            >
              <div className="relative h-80 sm:h-96 bg-black">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-lg font-black text-[#0f172a]">
                    {selectedPhoto.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 uppercase">
                    {selectedPhoto.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  {selectedPhoto.desc}
                </p>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      onBookAppointment?.();
                    }}
                    className="btn-3d-red px-5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment on Campus</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. BOTTOM ACTION CTA STRIP */}
      <section className="mt-10 site-container">
        <div className="rounded-2xl bg-gradient-to-r from-[#031d24] via-[#08323e] to-[#092f3a] p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-700/60">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-display">
              Have Questions About Visiting or Admission?
            </h3>
            <p className="text-teal-100 text-xs sm:text-sm max-w-xl">
              Our 24/7 reception desk is always ready to guide you on doctor schedules, bed availability, ambulance dispatch, and free treatment registration.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Ali%20Welfare%20Trust%20Hospital%2C%20I%20have%20an%20inquiry%20regarding%20campus%20facilities.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Hospital Desk</span>
            </a>

            <button
              onClick={() => onBookAppointment?.()}
              className="btn-3d-red px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book OPD Token</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

function UsersIcon(props: any) {
  return <Building2 {...props} />;
}
