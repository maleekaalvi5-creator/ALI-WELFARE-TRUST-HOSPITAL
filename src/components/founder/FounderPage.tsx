import React, { useState, useEffect } from 'react';
import { FounderHero3DLayered } from './FounderHero3DLayered';
import { HospitalLogo } from '../HospitalLogo';
import { Footer } from '../Footer';
import { AppointmentModal } from '../AppointmentModal';
import { MyAppointmentsModal } from '../MyAppointmentsModal';
import { DonationPopupBanner } from '../DonationPopupBanner';
import { HospitalAIAgent } from '../HospitalAIAgent';
import { HOSPITAL_INFO, BANK_DETAILS, LEADERSHIP } from '../../data/hospitalData';
import { Appointment } from '../../types';
import {
  ArrowLeft,
  Heart,
  Calendar,
  Phone,
  Clock,
  MapPin,
  Award,
  ShieldCheck,
  CheckCircle,
  MessageSquare,
  Sparkles,
  Send,
  User,
  Share2,
  Bookmark,
  FileText
} from 'lucide-react';

interface FounderPageProps {
  onNavigateHome: () => void;
  onOpenBooking: (departmentId?: string, doctorId?: string) => void;
  onOpenDonation: () => void;
  onOpenMyAppointments: () => void;
  appointmentsCount: number;
}

interface TributeMessage {
  id: string;
  author: string;
  city: string;
  date: string;
  message: string;
}

const DEFAULT_TRIBUTES: TributeMessage[] = [
  {
    id: 't-1',
    author: 'Haji Muhammad Akram',
    city: 'Qila Didar Singh',
    date: '2026',
    message:
      'May Allah Almighty grant Late Nazar Hussain Alvi the highest rank in Jannat-ul-Firdaus. My mother receives free dialysis every week because of his visionary hospital.',
  },
  {
    id: 't-2',
    author: 'Dr. Tariq Mehmood',
    city: 'Gujranwala',
    date: '2026',
    message:
      'A rare soul whose generosity transformed healthcare in our district. He built a hospital with the purest intention to serve the underprivileged.',
  },
  {
    id: 't-3',
    author: 'Zainab Bibi',
    city: 'Nowshera Virkan',
    date: '2026',
    message:
      'My grandfather regained his eyesight through free cataract surgery at Ali Welfare Trust Hospital. We pray for Nazar Hussain Alvi Sahib in every namaz.',
  },
];

export const FounderPage: React.FC<FounderPageProps> = ({
  onNavigateHome,
  onOpenBooking,
  onOpenDonation,
  onOpenMyAppointments,
  appointmentsCount,
}) => {
  const founder = LEADERSHIP.find((m) => m.id === 'nazar-alvi');

  // Tribute wall state
  const [tributes, setTributes] = useState<TributeMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ali_hospital_founder_tributes');
      return saved ? JSON.parse(saved) : DEFAULT_TRIBUTES;
    } catch {
      return DEFAULT_TRIBUTES;
    }
  });

  const [authorName, setAuthorName] = useState('');
  const [authorCity, setAuthorCity] = useState('');
  const [tributeText, setTributeText] = useState('');
  const [submittedTribute, setSubmittedTribute] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ali_hospital_founder_tributes', JSON.stringify(tributes));
    } catch (e) {
      console.warn(e);
    }
  }, [tributes]);

  const handleAddTribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !tributeText.trim()) return;

    const newTribute: TributeMessage = {
      id: `t-${Date.now()}`,
      author: authorName.trim(),
      city: authorCity.trim() || 'Pakistan',
      date: 'Just now',
      message: tributeText.trim(),
    };

    setTributes((prev) => [newTribute, ...prev]);
    setAuthorName('');
    setAuthorCity('');
    setTributeText('');
    setSubmittedTribute(true);
    setTimeout(() => setSubmittedTribute(false), 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#02080c] text-white flex flex-col selection:bg-teal-500 selection:text-white">
      {/* =========================================================================
          TOP DEDICATED FOUNDER PAGE NAVIGATION BAR
          Sticky, stabilized, zero jitter with responsive clamp scaling
          ========================================================================= */}
      <nav 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          willChange: 'transform',
        }}
        className="sticky top-0 z-[1000] will-change-transform bg-[#031017]/95 backdrop-blur-md border-b border-teal-500/20 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 shadow-xl box-border w-full"
      >
        <div className="site-container flex items-center justify-between gap-3 box-border">
          {/* Back to Home CTA & Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-donation-banner'));
                onNavigateHome();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-white/15 flex-shrink-0 active:scale-95"
              title="Return to Ali Welfare Trust Hospital Homepage"
            >
              <ArrowLeft className="w-4 h-4 text-teal-300" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="h-6 w-px bg-white/20 hidden sm:block flex-shrink-0" />

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-donation-banner'));
                onNavigateHome();
              }}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer text-left focus:outline-none group min-w-0"
              title="Return to Ali Welfare Trust Hospital Homepage"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-md overflow-hidden flex-shrink-0 transition-transform group-hover:scale-105">
                <HospitalLogo variant="emblem" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <span 
                  style={{ fontSize: 'clamp(13px, 1.8vw, 16px)' }}
                  className="font-black text-white tracking-tight leading-none block group-hover:text-teal-200 transition-colors truncate max-w-[160px] sm:max-w-[260px] md:max-w-none"
                >
                  Ali Welfare Trust Hospital
                </span>
                <span 
                  style={{ fontSize: 'clamp(9px, 1.1vw, 12px)' }}
                  className="text-amber-400 font-bold block truncate max-w-[160px] sm:max-w-[280px] md:max-w-none mt-0.5"
                >
                  Founder Page • Late Nazar Hussain Alvi (2005)
                </span>
              </div>
            </button>
          </div>

          {/* Quick Section Jump Links (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs font-semibold text-slate-300">
            <button
              onClick={() => scrollToSection('founder-hero-3d')}
              className="px-2.5 py-1.5 rounded-lg hover:text-teal-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              3D Vision
            </button>
            <button
              onClick={() => scrollToSection('founder-history')}
              className="px-2.5 py-1.5 rounded-lg hover:text-teal-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Biography
            </button>
            <button
              onClick={() => scrollToSection('milestones-timeline')}
              className="px-2.5 py-1.5 rounded-lg hover:text-teal-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Journey
            </button>
            <button
              onClick={() => scrollToSection('tribute-wall')}
              className="px-2.5 py-1.5 rounded-lg hover:text-teal-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Tributes
            </button>
          </div>

          {/* Action CTAs: Book & Donate */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Book Token</span>
            </button>

            <button
              onClick={onOpenDonation}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-900/30 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 border border-amber-300/40"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate</span>
            </button>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          CORE COMPONENT: 3-LAYER VISUAL COMPOSITION HERO SECTION
          Layer 1: Continuous Seamless Infinite 3D Anatomy Scroll
          Layer 2: Clean Glass/Depth Content Block with Typewriter/Reveal Animation
          Layer 3: Still Founder Foreground Photo (No animation on face/photo)
          ========================================================================= */}
      <FounderHero3DLayered
        onExploreHistory={() => scrollToSection('founder-history')}
        onOpenBooking={() => onOpenBooking()}
        onOpenDonation={onOpenDonation}
      />

      {/* =========================================================================
          SECTION 2: THE FOUNDER'S BIOGRAPHY & HUMANITARIAN COMPASSION
          ========================================================================= */}
      <section id="founder-history" className="py-20 sm:py-28 bg-[#041219] text-white relative overflow-hidden border-t border-teal-500/20">
        <div className="site-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-400/40 text-amber-300 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Sacred Foundation • 2005</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif">
              The Vision of Late Nazar Hussain Alvi
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              In 2005, seeing the pain of vulnerable families in Qila Didar Singh who had to travel miles or sell possessions to afford basic medical care, Late Nazar Hussain Alvi established Ali Welfare Trust Hospital as a permanent beacon of hope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Sacred Principle */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:border-teal-400/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">A Promise of Dignity</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                His foundational covenant was clear: no human soul entering these doors shall ever be turned away due to lack of money. Healthcare is a right ordained by humanity, never a commercial business.
              </p>
            </div>

            {/* Card 2: 3D Medical Anatomy Vision */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:border-amber-400/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">Every Part of You Matters</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                He recognized that true healthcare must encompass the entire body: the beating heart, the cleansing kidneys, the perceiving eyes, the respiratory breath, and the mind at peace.
              </p>
            </div>

            {/* Card 3: Free Care Forever */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:border-cyan-400/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">100% Non-Profit Trust</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every rupee donated, every Sadqah and Zakat given, goes directly into patient medicine, hemodialysis filters, surgical consumables, and state-of-the-art diagnostic equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 2005 - 2026 MILESTONES TIMELINE (THE JOURNEY)
          ========================================================================= */}
      <section id="milestones-timeline" className="py-20 sm:py-28 bg-[#02090e] text-white relative">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-serif">
              From Vision to Reality: 2005 – 2026
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Two decades of continuous medical expansion inspired by the founder&apos;s compassion.
            </p>
          </div>

          <div className="relative border-l-2 border-teal-500/30 ml-4 sm:ml-32 space-y-12">
            {/* 2005 Milestone */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#02090e] border-2 border-amber-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <span className="sm:absolute sm:-left-28 sm:top-1 text-sm font-mono font-bold text-amber-400 block mb-1">
                2005
              </span>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white font-serif">Cornerstone Laid & Initial OPD Clinic</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Late Nazar Hussain Alvi founded Ali Welfare Trust Hospital in Qila Didar Singh with general physician OPD, emergency triage, and free medicine dispensary for destitute patients.
                </p>
              </div>
            </div>

            {/* 2012 Milestone */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#02090e] border-2 border-teal-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
              </div>
              <span className="sm:absolute sm:-left-28 sm:top-1 text-sm font-mono font-bold text-teal-400 block mb-1">
                2012
              </span>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white font-serif">Inpatient Wards & 24/7 Maternity Emergency</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Expansion of dedicated indoor beds, sterile labor and delivery suites, and 24-hour round-the-clock emergency medical services.
                </p>
              </div>
            </div>

            {/* 2017 Milestone */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#02090e] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <span className="sm:absolute sm:-left-28 sm:top-1 text-sm font-mono font-bold text-cyan-400 block mb-1">
                2017
              </span>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white font-serif">State-of-the-Art Free Hemodialysis Center</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Inauguration of modern automated dialysis machines with reverse osmosis water purification plant, providing life-saving renal filtration completely free of cost.
                </p>
              </div>
            </div>

            {/* 2021 Milestone */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#02090e] border-2 border-emerald-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span className="sm:absolute sm:-left-28 sm:top-1 text-sm font-mono font-bold text-emerald-400 block mb-1">
                2021
              </span>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white font-serif">Digital X-Ray, 4D Ultrasound & Pathology Lab</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Equipping the hospital with computed radiography, high-resolution diagnostic ultrasound, and fully automated hematology & biochemistry analyzers.
                </p>
              </div>
            </div>

            {/* 2024 Milestone */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#02090e] border-2 border-amber-300 flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-amber-300" />
              </div>
              <span className="sm:absolute sm:-left-28 sm:top-1 text-sm font-mono font-bold text-amber-300 block mb-1">
                2024
              </span>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white font-serif">Advanced Eye Care Operation Theater & Phacoemulsification</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Micro-surgical eye department performing suture-less cataract lens implants and vision preservation for elderly and diabetic patients.
                </p>
              </div>
            </div>

            {/* 2026 Milestone */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#02090e] border-2 border-teal-300 flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-teal-300 animate-ping" />
              </div>
              <span className="sm:absolute sm:-left-28 sm:top-1 text-sm font-mono font-bold text-teal-300 block mb-1">
                2026
              </span>
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-950/60 to-cyan-950/60 border border-teal-400/40 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-teal-200 font-serif">Smart Patient Synchronization & AI-Assisted Care</h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                  Under the continuing leadership of Chairman Zamin Ali Alvi, modernizing hospital booking, online patient tokens, and 24/7 AI health support while keeping all humanitarian care 100% intact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: TRIBUTE WALL & DUA-E-KHAIR GUESTBOOK
          ========================================================================= */}
      <section id="tribute-wall" className="py-20 sm:py-28 bg-[#04141d] text-white border-t border-teal-500/20">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 text-xs font-mono mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Community Dua & Prayer Wall</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
              Tribute to Late Nazar Hussain Alvi
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              Share your prayers, grateful memories, or words of respect for the founder whose hospital continues to heal thousands.
            </p>
          </div>

          {/* Tribute Submission Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-12 shadow-2xl">
            <h3 className="text-lg font-bold text-amber-300 mb-4 font-serif flex items-center gap-2">
              <Heart className="w-4 h-4 fill-amber-300" />
              <span>Submit a Prayer or Tribute Message</span>
            </h3>

            <form onSubmit={handleAddTribute} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Muhammad Farooq"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Region</label>
                  <input
                    type="text"
                    value={authorCity}
                    onChange={(e) => setAuthorCity(e.target.value)}
                    placeholder="e.g. Gujranwala or Lahore"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Prayer / Message</label>
                <textarea
                  required
                  rows={3}
                  value={tributeText}
                  onChange={(e) => setTributeText(e.target.value)}
                  placeholder="Write a prayer (Dua) or tribute honoring the Late Founder..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-400 italic">
                  Messages are displayed respectfully in the memorial archive.
                </p>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Tribute</span>
                </button>
              </div>

              {submittedTribute && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-xs text-center font-medium animate-fadeIn">
                  JazakAllah Khair. Your tribute has been added to the Founder Memorial Wall.
                </div>
              )}
            </form>
          </div>

          {/* List of Tributes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tributes.map((trib) => (
              <div
                key={trib.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  &ldquo;{trib.message}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{trib.author}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{trib.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: LEADERSHIP CONTINUITY
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#02080c] text-white border-t border-white/10">
        <div className="site-container text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-serif mb-4">
            Upholding the Founder&apos;s Sacred Trust
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm leading-relaxed mb-10">
            Under the ongoing stewardship of Chairman &amp; CEO Zamin Ali Alvi and Hospital Director Khawar Abbas Awan, the hospital remains 100% committed to Late Nazar Hussain Alvi&apos;s founding mission.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-900/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment at Ali Hospital</span>
            </button>

            <button
              onClick={onOpenDonation}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-900/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 border border-amber-300/40"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support the Hospital Endowment</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hospital Website</span>
            </button>
          </div>
        </div>
      </section>

      {/* Hospital Footer */}
      <Footer
        onOpenBooking={(deptId) => onOpenBooking(deptId)}
        onOpenDonation={onOpenDonation}
      />
    </div>
  );
};
