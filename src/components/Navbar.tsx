import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Heart, 
  Menu, 
  X, 
  MessageCircle,
  FileText,
  ChevronRight,
  Activity,
  Droplets,
  Eye,
  Microscope,
  Stethoscope
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { HospitalLogo } from './HospitalLogo';
import { useHospitalContent } from '../context/HospitalContentContext';

interface NavbarProps {
  onOpenBooking: (departmentId?: string, doctorId?: string) => void;
  onOpenDonation: () => void;
  onOpenMyAppointments: () => void;
  appointmentsCount: number;
  onNavigateRoute?: (route: string) => void;
  currentRoute?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenDonation,
  onOpenMyAppointments,
  appointmentsCount,
  onNavigateRoute,
  currentRoute = '/',
}) => {
  const { content } = useHospitalContent();
  const header = content?.header;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = (header?.navLinks || [
    { name: "Home", href: "/" },
    { name: "Departments", href: "/departments" },
    { name: "Doctors", href: "/doctors" },
    { name: "Campus", href: "/campus" },
    { name: "Founder", href: "/founder" },
    { name: "Contact Us", href: "/#contact" },
  ]).filter(link => link.name.toLowerCase().trim() !== 'donate');

  const emergencyPhone = header?.emergencyPhone || HOSPITAL_INFO.emergencyPhone;
  const whatsappNumber = header?.whatsappNumber || HOSPITAL_INFO.whatsapp;
  const hospitalName = header?.hospitalName || "Ali Welfare Trust Hospital";
  const tagline = header?.tagline || "( A Non-profitable ,Regd,Orginaztion Devoted to provide health facilities)";
  const donateBtnText = header?.donateButtonText || "DONATE NOW";
  const logoPosition = header?.logoPosition || 'left';

  // Live Pakistan Standard Time (PKT, UTC+5)
  const [pakistanTime, setPakistanTime] = useState<string>('');
  useEffect(() => {
    const updatePkt = () => {
      const now = new Date();
      try {
        setPakistanTime(
          now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Karachi',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })
        );
      } catch {
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const pktDate = new Date(utc + (3600000 * 5));
        setPakistanTime(pktDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      }
    };
    updatePkt();
    const timer = setInterval(updatePkt, 1000);
    return () => clearInterval(timer);
  }, []);

  const topMarqueeItems = [
    {
      icon: Clock,
      text: "Pakistan Standard Time (PKT)",
      badge: pakistanTime ? `PKT: ${pakistanTime}` : "UTC+5 PKT",
      badgeColor: "bg-teal-950/90 text-teal-200 border-teal-400/40",
    },
    {
      icon: Phone,
      text: "24/7 Emergency & Trauma Center Active",
      badge: "Call: 0300-6421447",
      badgeColor: "bg-rose-600/80 text-white border-rose-400/40",
      href: `tel:${emergencyPhone}`,
    },
    {
      icon: Droplets,
      text: "Kidney Dialysis Center Operating",
      badge: "24/7 Shifts (Free for Deserving)",
      badgeColor: "bg-teal-900/90 text-teal-300 border-teal-400/40",
      href: "#departments",
    },
    {
      icon: Activity,
      text: "Laboratory for Blood Tests & CBC",
      badge: "24/7 Automated Blood Tests",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-500/40",
      href: "#departments",
    },
    {
      icon: Microscope,
      text: "Ultrasound & Color Doppler Available",
      badge: "Daily & On-Call Sonology",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-400/40",
      href: "#departments",
    },
    {
      icon: Stethoscope,
      text: "General Physician & Specialist OPD",
      badge: "Daily Consultations",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-400/40",
      href: "#doctors",
    },
    {
      icon: MessageCircle,
      text: "WhatsApp Medical Guidance Desk",
      badge: "0300-6421447",
      badgeColor: "bg-[#087f8c]/70 text-teal-100 border-teal-400/30",
      href: `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20am%20contacting%20Ali%20Welfare%20Trust%20Hospital%20Qila%20Didar%20Singh`,
      target: "_blank",
    },
    {
      icon: MapPin,
      text: "Live GPS & In-House Route Navigation",
      badge: "Chahal Kalan Road, Qila Didar Singh",
      badgeColor: "bg-teal-950 text-teal-300 border-teal-500/40",
      href: "#hospital-route-navigator",
    },
    {
      icon: Clock,
      text: "Daily OPD Hours",
      badge: "8:00 AM – 10:00 PM",
      badgeColor: "bg-slate-800 text-slate-200 border-slate-600/40",
      href: "#doctors",
    },
    {
      icon: Eye,
      text: "Phaco Eye Clinic & Cataract Surgeries",
      badge: "Free Camps Available",
      badgeColor: "bg-teal-950 text-teal-300 border-teal-500/40",
      href: "#departments",
    },
    {
      icon: Heart,
      text: "Ali Welfare Trust Hospital (Regd. #1142)",
      badge: "100% Zakat Eligible",
      badgeColor: "bg-amber-900/80 text-amber-200 border-amber-400/40",
      onClick: onOpenDonation,
    },
  ];

  // Seamless duplication for 100% gapless continuous infinite loop
  const topMarqueeLoop = [...topMarqueeItems, ...topMarqueeItems];

  return (
    <div className="w-full relative">
      {/* Layout Spacer to guarantee zero layout shift while navbar is fixed */}
      <div className="h-[96px] sm:h-[102px] md:h-[106px] w-full pointer-events-none" aria-hidden="true" />

      {/* Main Sticky/Fixed Glass Navigation Bar with Periodic Shine Effect */}
      <header className="navbar w-full box-border">
        {/* Top Notification / Emergency Bar - Solid Crisp High-Contrast Bar */}
        <div className="bg-[#041a21] text-white text-[11px] sm:text-xs border-b border-amber-400/40 relative z-10 shadow-sm w-full h-7 sm:h-7.5 md:h-8 overflow-hidden select-none flex items-center box-border">
        
        {/* Left Pinned Live Indicator Badge (Ultra-Slim & Compact) */}
        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 bg-[#021116] text-teal-300 border-r border-amber-400/40 z-20 h-full">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          </span>
          <span className="font-extrabold uppercase tracking-wider text-[9px] sm:text-[10px] md:text-[10.5px] text-amber-300 whitespace-nowrap">
            <span className="hidden sm:inline">24/7 Live</span>
            <span className="sm:hidden">24/7</span>
          </span>
        </div>

        {/* Continuous Infinite Scrolling Track with Soft Gradient Fade Edges */}
        <div className="relative flex-1 h-full overflow-hidden flex items-center">
          {/* Subtle Left & Right Edge Vignette Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-6 md:w-8 bg-gradient-to-r from-[#041a21] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-6 md:w-8 bg-gradient-to-l from-[#041a21] to-transparent z-10 pointer-events-none" />

          {/* Marquee Motion Track */}
          <div className="animate-top-marquee flex items-center gap-5 sm:gap-7 md:gap-8">
            {topMarqueeLoop.map((item, idx) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-slate-200 hover:text-white transition-colors cursor-pointer py-0.5 group">
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-teal-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 border border-teal-400/30">
                    <Icon className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  </div>
                  <span className="font-medium text-[9.5px] sm:text-[10.5px] md:text-[11px] text-slate-100 group-hover:text-amber-200 transition-colors">
                    {item.text}
                  </span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] sm:text-[9.5px] md:text-[10px] font-semibold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  <span className="text-amber-400/60 font-bold text-[8.5px] sm:text-[9.5px] ml-1 sm:ml-1.5">•</span>
                </div>
              );

              if (item.href) {
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target={item.target}
                    rel={item.target ? "noreferrer" : undefined}
                    className="inline-flex items-center no-underline"
                  >
                    {content}
                  </a>
                );
              }
              return (
                <div key={idx} onClick={item.onClick} className="inline-flex items-center">
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pinned Emergency & Action Controls (Ultra-Slim & Responsive) */}
        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 md:px-2.5 bg-[#021116]/95 border-l border-amber-500/25 z-20 h-full">
          <a 
            href={`tel:${emergencyPhone}`}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all text-[9px] sm:text-[10px] md:text-[10.5px] shadow-xs animate-pulse whitespace-nowrap"
            title="Call 24/7 Emergency Line"
          >
            <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">{emergencyPhone}</span>
            <span className="sm:hidden">Emergency</span>
          </a>

          <a 
            href={`https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20am%20contacting%20Ali%20Welfare%20Trust%20Hospital%20Qila%20Didar%20Singh`}
            target="_blank" 
            rel="noreferrer"
            className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#087f8c]/40 hover:bg-[#087f8c]/60 text-teal-200 transition-colors border border-teal-400/30 text-[10px] md:text-[10.5px] font-semibold whitespace-nowrap"
            title="WhatsApp Doctor Desk"
          >
            <MessageCircle className="w-2.5 h-2.5" />
            <span>WhatsApp</span>
          </a>

          {appointmentsCount > 0 && (
            <button
              onClick={onOpenMyAppointments}
              className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#087f8c] hover:bg-[#045d67] text-white text-[10px] md:text-[10.5px] font-medium transition-colors border border-teal-400/30 cursor-pointer whitespace-nowrap"
              title="View your booked appointments"
            >
              <FileText className="w-2.5 h-2.5" />
              <span>Bookings ({appointmentsCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Solid High-Contrast Header Row */}
      <div
        className="w-full bg-white border-b-2 border-slate-200 shadow-sm py-2 sm:py-2.5 relative z-10 overflow-hidden box-border transition-colors duration-200"
      >
        {/* 3D Glass Specular Reflection Sheen Streak Across Entire Header */}
        <div className="absolute -inset-y-20 -left-1/3 w-[160%] bg-gradient-to-r from-transparent via-white/50 to-transparent -rotate-12 pointer-events-none opacity-60" />

        {/* Top Specular Micro-Highlight Strip */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white via-amber-300/80 to-transparent pointer-events-none" />

        {/* Bottom Luxury Golden Bevel Accent Line */}
        <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-teal-400/40 via-[#d7b56d] via-amber-400 to-teal-400/40 opacity-95 shadow-[0_1.5px_8px_rgba(215,181,109,0.5)] pointer-events-none" />

        {/* Fluid Responsive Inner Wrapper (Responsive across mobile, desktop, 2K/4K and wide displays) */}
        <div className={`site-container-wide flex items-center justify-between gap-2.5 sm:gap-3 ${logoPosition === 'center' ? 'lg:justify-around' : ''} relative z-10 box-border`}>
          
          {/* Logo & Brand Identity (Clicking triggers donation banner with right-to-center animation) */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('open-donation-banner'));
              onOpenDonation();
              if (onNavigateRoute) {
                onNavigateRoute('/');
              } else {
                const el = document.getElementById('hero');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group focus:outline-none flex-shrink-0 cursor-pointer min-w-0"
            title="Ali Welfare Trust Hospital - Click to open Donation Appeal"
          >
            <div className="relative flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-white/95 p-1 flex items-center justify-center border border-white/90 shadow-[0_3px_10px_rgba(8,127,140,0.15),inset_0_1px_1px_rgba(255,255,255,1)] transition-transform group-hover:scale-105 overflow-hidden backdrop-blur-xs">
              {header?.logoUrl && header.logoUrl !== '/images/ali-hospital-logo.png' && header.logoUrl !== '/images/hospital-logo.png' && header.logoUrl !== '/images/logo_ali_1789203525887.webp' ? (
                <img 
                  src={header.logoUrl} 
                  alt="Hospital Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <HospitalLogo variant="emblem" className="w-full h-full object-contain" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span 
                  style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}
                  className="font-extrabold text-[#392444] tracking-tight leading-tight group-hover:text-[#a61c52] transition-colors truncate max-w-[175px] sm:max-w-[280px] md:max-w-none block"
                >
                  {hospitalName}
                </span>
              </div>
              <p 
                style={{ fontSize: 'clamp(9px, 1.2vw, 12px)' }}
                className="text-[#a61c52] font-bold flex items-center gap-1 mt-0.5 truncate max-w-[185px] sm:max-w-[300px] md:max-w-none leading-none"
              >
                <span className="truncate">{tagline}</span>
              </p>
            </div>
          </a>

          {/* =========================================================================
              MULTI-DEVICE NAVIGATION BAR
              - Tablets (768px – 1024px): Condensed horizontal navigation bar with truncated link padding
              - Desktops (> 1024px): Full fluid inline links with active 3D states
              - Mobile (< 768px): Hidden here, accessible in slide-out drawer
              ========================================================================= */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200 shadow-xs box-border">
            {navLinks.map((link) => {
              const lower = link.name.toLowerCase().trim();
              const isFounder = lower === 'founder';
              const isDonate = lower === 'donate';
              const isCampus = lower === 'campus';
              const targetRoute = 
                lower === 'home' ? '/' :
                lower === 'departments' ? '/departments' :
                lower === 'doctors' ? '/doctors' :
                lower === 'campus' ? '/campus' :
                lower === 'donate' ? '/donate' :
                lower === 'founder' ? '/founder' :
                lower.includes('contact') ? '/#contact' : link.href;

              const isActive = 
                (targetRoute === '/' && (currentRoute === '/' || currentRoute === '')) ||
                (targetRoute !== '/' && !targetRoute.startsWith('/#') && currentRoute === targetRoute);

              return (
                <a
                  key={link.name}
                  href={targetRoute}
                  onClick={(e) => {
                    if (onNavigateRoute) {
                      e.preventDefault();
                      if (targetRoute.startsWith('/#')) {
                        if (window.location.pathname === '/' || window.location.pathname === '') {
                          const id = targetRoute.replace('/#', '');
                          const el = document.getElementById(id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          onNavigateRoute(targetRoute);
                        }
                      } else {
                        onNavigateRoute(targetRoute);
                      }
                    }
                  }}
                  className={`px-2 py-1 lg:px-3 lg:py-1.5 rounded-xl text-xs lg:text-[13px] font-bold transition-all duration-200 flex items-center gap-1 lg:gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#087f8c] text-white shadow-xs font-black'
                      : isFounder
                      ? 'text-[#092f3a] bg-amber-100/90 hover:bg-amber-100 border border-amber-300/80 shadow-xs'
                      : 'text-[#0f172a] hover:text-[#087f8c] hover:bg-white/85 border border-transparent hover:border-white/80 hover:shadow-[0_2px_6px_rgba(8,127,140,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isFounder && (
                    <span className="px-1.5 py-0.2 rounded text-[8.5px] lg:text-[9px] font-black font-mono uppercase bg-amber-500 text-white shadow-xs">
                      3D
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Area: SLIM, SMART 3D GOLD DONATE BUTTON WITH RED EMERGENCY LIGHT & MOBILE TOGGLE */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateRoute) {
                  onNavigateRoute('/donate');
                } else {
                  onOpenDonation();
                }
              }}
              type="button"
              className="btn-3d-gold relative group overflow-hidden px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 select-none flex-shrink-0"
              title="Donate Now to Ali Welfare Trust Hospital (Zakat & Sadqah Eligible)"
              aria-label="Donate Now to Ali Welfare Trust Hospital"
            >
              {/* Shimmering Metallic Specular Gleam */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-gold-shimmer" />
              </div>

              {/* 3D RED EMERGENCY BEACON LIGHT - Slim & Radiant */}
              <div className="relative flex items-center justify-center flex-shrink-0">
                {/* Outer Siren Pulse Halo */}
                <span className="absolute -inset-1 rounded-full bg-red-500/80 animate-ping pointer-events-none" />
                
                {/* Chrome / Metallic Ring Collar */}
                <div className="relative p-[1.5px] rounded-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-800 shadow-[0_1.5px_3px_rgba(0,0,0,0.5)]">
                  {/* Glowing 3D Red Beacon Dome */}
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-gradient-to-b from-red-400 via-red-600 to-red-950 relative flex items-center justify-center animate-emergency-beacon border border-red-300/70">
                    {/* Inner Jewel Specular Glass Highlight */}
                    <div className="absolute top-0.5 left-0.5 w-1 h-0.5 rounded-full bg-white/95 filter blur-[0.2px]" />
                    {/* Inner Core Blinking Filament */}
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Embossed 3D Gold Button Typography with CSS Clamp Protection */}
              <span 
                style={{ fontSize: 'clamp(10px, 1.4vw, 13px)' }}
                className="font-black tracking-wider uppercase text-[#3a1d04] drop-shadow-[0_1px_0_rgba(255,255,255,0.7)] flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
              >
                <span className="hidden xs:inline">{donateBtnText}</span>
                <span className="xs:hidden">DONATE</span>
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-600 fill-red-600 inline-block drop-shadow-2xs flex-shrink-0" />
              </span>
            </button>

            {/* Mobile Navigation Drawer Toggle (@media max-width: 768px) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-[#092f3a] bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none border border-slate-200 cursor-pointer active:scale-95"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

      {/* =========================================================================
          COLLAPSIBLE SLIDE-OUT MOBILE DRAWER (< 768px)
          Smooth backdrop blur overlay, stacked items, touch-friendly targets
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[96px] sm:top-[102px] md:top-[106px] bg-black/60 backdrop-blur-sm z-[1001] md:hidden"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white/98 backdrop-blur-2xl border-t border-slate-200/80 px-4 pt-4 pb-6 shadow-2xl fixed top-[96px] sm:top-[102px] md:top-[106px] left-0 right-0 z-[1002] max-h-[calc(100vh-105px)] overflow-y-auto"
            >
                <div className="flex flex-col gap-2 max-w-lg mx-auto">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 pb-1 border-b border-slate-100">
                    Hospital Navigation
                  </div>

                  {navLinks.map((link) => {
                    const lower = link.name.toLowerCase().trim();
                    const isFounder = lower === 'founder';
                    const isDonate = lower === 'donate';
                    const isCampus = lower === 'campus';
                    const targetRoute = 
                      lower === 'home' ? '/' :
                      lower === 'departments' ? '/departments' :
                      lower === 'doctors' ? '/doctors' :
                      lower === 'campus' ? '/campus' :
                      lower === 'donate' ? '/donate' :
                      lower === 'founder' ? '/founder' :
                      lower.includes('contact') ? '/#contact' : link.href;

                    const isActive = 
                      (targetRoute === '/' && (currentRoute === '/' || currentRoute === '')) ||
                      (targetRoute !== '/' && !targetRoute.startsWith('/#') && currentRoute === targetRoute);

                    return (
                      <a
                        key={link.name}
                        href={targetRoute}
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          if (onNavigateRoute) {
                            e.preventDefault();
                            if (targetRoute.startsWith('/#')) {
                              if (window.location.pathname === '/' || window.location.pathname === '') {
                                const id = targetRoute.replace('/#', '');
                                const el = document.getElementById(id);
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              } else {
                                onNavigateRoute(targetRoute);
                              }
                            } else {
                              onNavigateRoute(targetRoute);
                            }
                          }
                        }}
                        className={`px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-[#087f8c] text-white shadow-sm font-black'
                            : isFounder
                            ? 'text-[#092f3a] bg-amber-50 border border-amber-300/80'
                            : 'text-[#0f172a] hover:bg-slate-100/80 active:bg-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.name}
                        </span>
                        {isFounder ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono uppercase bg-amber-500 text-white shadow-xs">
                            New 3D
                          </span>
                        ) : isDonate ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono uppercase bg-[#087f8c] text-white shadow-xs">
                            100% Zakat
                          </span>
                        ) : isCampus ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-[#087f8c] bg-teal-50 border border-teal-200">
                            Facilities
                          </span>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </a>
                    );
                  })}

                  <div className="pt-3 mt-1 border-t border-slate-100 flex flex-col gap-2.5">
                    {/* 3D Gold Donate Button in Mobile Menu */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenDonation();
                      }}
                      className="btn-3d-gold w-full py-3 rounded-xl flex items-center justify-center gap-2.5 shadow-md font-black text-sm text-[#3a1d04] cursor-pointer"
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-red-600 border border-red-300 animate-emergency-beacon shadow-[0_0_10px_#ef4444]" />
                      <span>DONATE NOW (MEEZAN BANK)</span>
                      <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenBooking();
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Doctor Appointment</span>
                    </button>

                    <a 
                      href={`tel:${emergencyPhone}`}
                      className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Hospital 24/7: {emergencyPhone}</span>
                    </a>

                    {appointmentsCount > 0 && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenMyAppointments();
                        }}
                        className="w-full py-2 rounded-xl bg-slate-100 text-[#092f3a] font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#087f8c]" />
                        <span>View My Bookings ({appointmentsCount})</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </div>
  );
};
