import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Stethoscope, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Activity, 
  ChevronRight,
  ChevronLeft,
  Filter,
  UserCheck,
  Sparkles,
  Play,
  Pause,
  Maximize2
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { Department } from '../types';
import { getDepartment3DSign } from './Department3DSign';

interface DepartmentsPageProps {
  onNavigateHome: () => void;
  onViewDepartmentDetail: (departmentId: string) => void;
  onViewDoctorProfile: (doctorId: string) => void;
  onBookDepartment: (departmentId: string) => void;
  onOpenDonation: () => void;
}

const HERO_DEPARTMENT_SLIDES = [
  {
    id: 'dialysis',
    name: 'Kidney Dialysis Center',
    urdu: 'شعبہ ڈائیلاسز و امراض گردہ',
    tag: 'German RO Hemodialysis',
    badge: '24/7 Life Support',
    image: '/images/dept-3d-dialysis.jpg',
    desc: 'High-flux hemodialysis machines with dedicated positive/negative virus segregation and continuous nephrologist supervision.',
    specs: '6 Dedicated Machines • Free for Deserving'
  },
  {
    id: 'pathology',
    name: 'Diagnostic Blood Pathology',
    urdu: 'جدید پیتھالوجی و بلڈ ٹیسٹنگ لیب',
    tag: 'Automated Diagnostic Suite',
    badge: '24/7 Laboratory',
    image: '/images/dept-3d-radiology.jpg',
    desc: 'Fully automated biochemistry, haematology, electrolyte analyzers, and rapid digital test reporting.',
    specs: 'CBC in 15 Mins • Certified Results'
  },
  {
    id: 'emergency',
    name: '24/7 Emergency & Trauma Bay',
    urdu: 'ایمرجنسی و ٹراما سنٹر',
    tag: 'Immediate Resuscitation',
    badge: 'Round-the-Clock',
    image: '/images/dept-3d-emergency.jpg',
    desc: 'Equipped with multipara cardiac monitors, defibrillators, central suction, and piped oxygen lines.',
    specs: 'Dedicated Ambulance Dock • Zero Delay'
  },
  {
    id: 'eye-clinic',
    name: 'Specialized Eye Care & Phaco',
    urdu: 'شعبہ امراض چشم و فیکو سرجری',
    tag: 'Advanced Ophthalmic Theater',
    badge: 'Surgical Wing',
    image: '/images/dept-3d-eyecare.jpg',
    desc: 'Computerized refraction, slit lamp examination, and stitchless microscopic cataract phacoemulsification surgery.',
    specs: 'Daycare Discharge • High Success Rate'
  },
  {
    id: 'ultrasound-lab',
    name: '4D Sonology & Ultrasound',
    urdu: 'الٹراساؤنڈ و کلر ڈوپلر',
    tag: 'High-Resolution Acoustic Imaging',
    badge: 'Daily Morning & Evening',
    image: '/images/real-3d-ultrasound.jpg',
    desc: 'Multi-frequency probes, obstetrical anomaly scans, abdominal sonography, and peripheral vascular color Doppler.',
    specs: 'Qualified Lady Sonologist Available'
  },
  {
    id: 'pharmacy',
    name: '24/7 Hospital Pharmacy',
    urdu: 'مفت و رعایتی ادویات کی فراہمی',
    tag: 'Essential Drug Dispensary',
    badge: '24/7 Service',
    image: '/images/dept-3d-pharmacy.jpg',
    desc: 'Temperature-controlled storage of critical cardiovascular, antibiotic, emergency, and post-surgical drugs.',
    specs: '100% Genuine Medicine • Welfare Discount'
  },
  {
    id: 'general-opd',
    name: 'Cardiology & ECG Suite',
    urdu: 'امراض قلب و ڈیجیٹل ای سی جی',
    tag: 'Cardiac Diagnostic Wing',
    badge: 'Specialist OPD',
    image: '/images/real-3d-heart.jpg',
    desc: '12-lead digital electrocardiography, hypertension management, and pre-operative cardiac clearance assessments.',
    specs: 'Senior Cardiologist Review'
  }
];

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onNavigateHome,
  onViewDepartmentDetail,
  onViewDoctorProfile,
  onBookDepartment,
  onOpenDonation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // Auto-advance hero 3D department slider
  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_DEPARTMENT_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHeroPaused]);

  const currentHeroDept = HERO_DEPARTMENT_SLIDES[heroSlide];

  const categories = [
    { id: 'all', label: 'All Clinical Departments' },
    { id: 'diagnostics', label: 'Diagnostics & Blood Lab' },
    { id: 'critical', label: 'Dialysis & Emergency' },
    { id: 'maternal', label: 'Maternal & Pediatrics' },
    { id: 'specialist', label: 'Surgical & Specialists' },
  ];

  const filteredDepartments = useMemo(() => {
    return DEPARTMENTS.filter((dept) => {
      // Category filtering
      if (selectedCategory === 'diagnostics') {
        if (dept.id !== 'radiology' && dept.id !== 'pathology' && dept.id !== 'ultrasound-lab') return false;
      } else if (selectedCategory === 'critical') {
        if (dept.id !== 'dialysis' && dept.id !== 'emergency' && dept.id !== 'urology' && dept.id !== 'pharmacy') return false;
      } else if (selectedCategory === 'maternal') {
        if (dept.id !== 'gynecology' && dept.id !== 'pediatrics') return false;
      } else if (selectedCategory === 'specialist') {
        if (['radiology', 'pathology', 'ultrasound-lab', 'emergency', 'pharmacy', 'gynecology', 'pediatrics'].includes(dept.id)) {
          return false;
        }
      }

      // Search query filtering
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchName = dept.name.toLowerCase().includes(q);
      const matchUrdu = (dept.urduName || '').includes(q);
      const matchShort = dept.shortDesc.toLowerCase().includes(q);
      const matchFull = dept.fullDesc.toLowerCase().includes(q);
      const matchFeats = dept.features.some((f) => f.toLowerCase().includes(q));
      const matchHead = (dept.headDoctor || '').toLowerCase().includes(q);

      return matchName || matchUrdu || matchShort || matchFull || matchFeats || matchHead;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
      
      {/* Top Corporate Luxury Header Hero Banner with Interactive 3D Department Slider & Infinite Scroll */}
      <section 
        className="relative overflow-hidden bg-[#02131a] text-white border-b border-[#d5c7b2]/20 pt-10 pb-6 sm:pt-14 sm:pb-8 shadow-2xl"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >
        {/* Dynamic Atmospheric High-Resolution Clinical Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url('${currentHeroDept.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02131a]/95 via-[#08323e]/90 to-[#02131a]/98 pointer-events-none" />
        
        {/* Ambient Glowing Orbs & Tech Grid Overlay */}
        <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-teal-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#087f8c_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="site-container relative z-10">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#d5c7b2] mb-6">
            <button 
              onClick={onNavigateHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-teal-400/60" />
            <span className="text-white font-bold">Clinical Departments & Facilities</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-900/80 border border-teal-400/30 text-teal-200 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span>Modern Clinical Facilities & Specializations</span>
              </div>

              <div className="font-urdu text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-300 leading-relaxed drop-shadow-md">
                شعبہ جات و جدید طبی سہولیات
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Specialized Clinical Departments & Wards
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
                From emergency trauma stabilization and round-the-clock hemodialysis to advanced maternal-fetal suites, computerized diagnostic blood laboratories, and 4D Doppler sonology—explore each department’s isolated clinical scope, medical staff, and timings.
              </p>

              {/* Quick Facility Highlights Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'all' 
                      ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold' 
                      : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                  }`}
                >
                  All 12 Clinical Wings
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('critical')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'critical' 
                      ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold' 
                      : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                  }`}
                >
                  Dialysis & 24/7 Emergency
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('diagnostics')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'diagnostics' 
                      ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold' 
                      : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                  }`}
                >
                  Automated Blood Lab & Sonology
                </button>
              </div>
            </div>

            {/* Right Column: Interactive 3D Department Showcase Slider */}
            <div className="lg:col-span-5">
              <div className="perspective-1000">
                <div className="relative rounded-2xl overflow-hidden bg-[#032029]/90 backdrop-blur-md border-2 border-teal-500/40 shadow-2xl group transition-all duration-300">
                  
                  {/* Active Department 3D Photo Container */}
                  <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
                    <img
                      src={currentHeroDept.image}
                      alt={currentHeroDept.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#032029] via-[#032029]/30 to-black/40" />

                    {/* Department Badges Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{currentHeroDept.tag}</span>
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-900/90 text-teal-200 border border-teal-400/40 backdrop-blur-sm">
                        {currentHeroDept.badge}
                      </span>
                    </div>

                    {/* Slide Navigation Controls Overlay */}
                    <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeroSlide((prev) => (prev - 1 + HERO_DEPARTMENT_SLIDES.length) % HERO_DEPARTMENT_SLIDES.length);
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 hover:bg-teal-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                        title="Previous Department"
                        aria-label="Previous Department"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeroSlide((prev) => (prev + 1) % HERO_DEPARTMENT_SLIDES.length);
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 hover:bg-teal-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                        title="Next Department"
                        aria-label="Next Department"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Department Title Floating Over Image Bottom */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="font-urdu text-amber-300 text-sm font-bold text-right mb-0.5">
                        {currentHeroDept.urdu}
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-md">
                        {currentHeroDept.name}
                      </h3>
                    </div>
                  </div>

                  {/* Slider Content & Details */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {currentHeroDept.desc}
                    </p>

                    <div className="p-2.5 rounded-xl bg-teal-950/70 border border-teal-500/30 flex items-center justify-between text-xs text-teal-200">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{currentHeroDept.specs}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onViewDepartmentDetail(currentHeroDept.id)}
                        className="text-amber-300 hover:text-white font-black flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Controls Bar: Dots Indicator, Play/Pause, and Counter */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      {/* Interactive Slide Dots */}
                      <div className="flex items-center gap-1.5">
                        {HERO_DEPARTMENT_SLIDES.map((slide, idx) => (
                          <button
                            key={slide.id}
                            type="button"
                            onClick={() => setHeroSlide(idx)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              idx === heroSlide 
                                ? 'w-6 bg-amber-400' 
                                : 'w-2 bg-white/30 hover:bg-white/60'
                            }`}
                            aria-label={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      {/* Pause/Play and Slide Index */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsHeroPaused(!isHeroPaused)}
                          className="p-1 rounded-md text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          title={isHeroPaused ? "Resume slider" : "Pause slider"}
                        >
                          {isHeroPaused ? <Play className="w-3 h-3 text-amber-300" /> : <Pause className="w-3 h-3" />}
                          <span className="text-[10px] uppercase font-bold">{isHeroPaused ? "Play" : "Pause"}</span>
                        </button>

                        <span className="text-[11px] font-mono text-slate-400">
                          {heroSlide + 1} / {HERO_DEPARTMENT_SLIDES.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sleek Integrated Operational Stats Dock */}
                  <div className="bg-[#02131a] px-4 py-3 border-t border-teal-500/20 grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div>
                      <div className="text-amber-300 font-bold">24/7/365</div>
                      <div className="text-slate-400 text-[10px]">Emergency Wing</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold">Automated</div>
                      <div className="text-slate-400 text-[10px]">Blood Diagnostics</div>
                    </div>
                    <div>
                      <div className="text-teal-200 font-bold">0336-4711100</div>
                      <div className="text-slate-400 text-[10px]">Main Reception</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Continuous Infinite Marquee Image & Facility Ribbon */}
          <div className="mt-8 sm:mt-10 pt-4 border-t border-white/10 overflow-hidden relative group">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Clinical Wings Directory — Click to Jump</span>
            </div>

            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <div className="animate-marquee flex items-center gap-3 py-1">
                {/* Duplicate array for seamless infinite loop */}
                {[...DEPARTMENTS, ...DEPARTMENTS].map((dept, i) => (
                  <button
                    key={`${dept.id}-${i}`}
                    type="button"
                    onClick={() => onViewDepartmentDetail(dept.id)}
                    className="flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-teal-900/60 border border-white/10 hover:border-amber-400/50 backdrop-blur-sm transition-all cursor-pointer text-left group/item"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-teal-950 border border-teal-500/40 flex items-center justify-center flex-shrink-0">
                      <img 
                        src={dept.iconUrl} 
                        alt="" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover/item:text-amber-300 transition-colors whitespace-nowrap">
                        {dept.name}
                      </div>
                      <div className="text-[10px] text-teal-300/80 whitespace-nowrap">
                        {dept.urduName || dept.headDoctor || 'Specialist Wing'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 site-container py-10 sm:py-14">
        
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-md shadow-slate-200/40 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clinical capabilities, diagnostics, procedures, or departments..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-bold text-slate-500 shrink-0">
              Showing <strong className="text-emerald-700">{filteredDepartments.length}</strong> of {DEPARTMENTS.length} Departments
            </div>

          </div>

          {/* Filter Categories */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Wing:</span>
            </span>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#087f8c] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 2xl:gap-8 3xl:gap-10">
          {filteredDepartments.map((dept) => {
            // Find doctors assigned to this department
            const assignedDoctors = DOCTORS.filter((d) => d.departmentId === dept.id);

            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Department Header with 3D Sign & Status Badges */}
                <div className="p-6 pb-4 bg-gradient-to-br from-slate-50 via-white to-[#fbf9f5] border-b border-slate-100 flex items-start gap-4">
                  
                  {/* 3D Sign Icon */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-teal-50/50 border border-teal-200/80 p-2.5 flex items-center justify-center shadow-md shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={getDepartment3DSign(dept.id, dept.iconUrl)}
                      alt={`${dept.name} 3D Sign`}
                      className="w-full h-full object-contain drop-shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      {dept.emergencyAvailable ? (
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10.5px] font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                          <span>24/7 Priority</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10.5px] font-bold">
                          OPD Schedule
                        </span>
                      )}

                      {dept.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold truncate">
                          {dept.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-black text-[#0f172a] group-hover:text-[#087f8c] transition-colors leading-snug">
                      {dept.name}
                    </h2>

                    <p className="text-xs font-bold text-emerald-700 font-serif mt-0.5">
                      {dept.urduName}
                    </p>
                  </div>

                </div>

                {/* Body: Description, Timings, Features & Medical Team */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {dept.shortDesc}
                  </p>

                  {/* Timing Strip */}
                  <div className="bg-[#fdfbf7] p-2.5 rounded-xl border border-[#e8dfd1] text-xs flex items-center justify-between text-slate-700">
                    <span className="font-bold flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Timings:</span>
                    </span>
                    <span className="font-semibold text-slate-900">{dept.timings}</span>
                  </div>

                  {/* Key Capabilities List */}
                  <div className="space-y-1.5">
                    {dept.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Assigned Medical Specialists (Strict Data Isolation) */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Stethoscope className="w-3 h-3 text-emerald-600" />
                      <span>Medical Specialists in this Wing:</span>
                    </div>

                    {assignedDoctors.length > 0 ? (
                      <div className="space-y-2">
                        {assignedDoctors.map((doc) => (
                          <div
                            key={doc.id}
                            className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[#0f172a] truncate">{doc.name}</div>
                              <div className="text-[10.5px] text-emerald-700 truncate">{doc.specialty} • {doc.timing}</div>
                            </div>

                            <button
                              onClick={() => onViewDoctorProfile(doc.id)}
                              className="px-2 py-1 rounded-lg bg-white hover:bg-emerald-50 text-emerald-800 text-[10.5px] font-bold border border-slate-200 shrink-0 ml-2 cursor-pointer transition-colors"
                            >
                              Profile →
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-600">
                        <div className="font-bold text-emerald-900">{dept.headDoctor}</div>
                        <div className="text-[11px] text-slate-500">Supervised 24/7 by Duty Medical Officers & Certified Technicians</div>
                      </div>
                    )}
                  </div>

                  {/* Actions: 3D Gold (Explore Page) & 3D Red (Book Token) */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    {/* 3D Blood-Red Primary Action Trigger */}
                    <button
                      onClick={() => onBookDepartment(dept.id)}
                      className="btn-3d-red py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      title={`Book Consultation in ${dept.name}`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book OPD</span>
                    </button>

                    {/* 3D Shiny Real Gold CTA */}
                    <button
                      onClick={() => onViewDepartmentDetail(dept.id)}
                      className="btn-3d-gold py-2.5 px-3 rounded-xl font-black text-xs text-[#3a1d04] flex items-center justify-center gap-1.5 cursor-pointer"
                      title={`View full dedicated page for ${dept.name}`}
                    >
                      <span>Explore Wing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </main>

      {/* Welfare Assurance Section */}
      <section className="bg-gradient-to-r from-[#031d24] via-[#08323e] to-[#092f3a] text-white py-12 border-t border-teal-500/20">
        <div className="site-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Need Dialysis, Cataract Surgery, or Emergency Aid?</h4>
                <p className="text-xs sm:text-sm text-teal-100/80">
                  Our Welfare Board evaluates deserving patients daily for 100% free and subsidized treatment across all clinical wings.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenDonation}
              className="btn-3d-gold px-6 py-3 rounded-xl font-black text-xs sm:text-sm text-[#3a1d04] flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Donate for Patient Care</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
