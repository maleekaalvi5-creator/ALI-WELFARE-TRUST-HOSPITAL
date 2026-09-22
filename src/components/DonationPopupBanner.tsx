import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Heart, 
  Banknote, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle,
  ExternalLink,
  Clock,
  ChevronRight
} from 'lucide-react';
import { HospitalLogo } from './HospitalLogo';
import { BANK_DETAILS, HOSPITAL_INFO } from '../data/hospitalData';
import { useHospitalContent } from '../context/HospitalContentContext';

interface DonationPopupBannerProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenFullDonation?: () => void;
}

export const DonationPopupBanner: React.FC<DonationPopupBannerProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onOpenFullDonation
}) => {
  const { content } = useHospitalContent();
  const banner = content?.donation?.banner;
  const bank = content?.donation?.bank;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Real-time live Pakistan Standard Time (PKT, UTC+5)
  const [livePktTime, setLivePktTime] = useState<string>('');
  const [livePktDate, setLivePktDate] = useState<string>('');

  useEffect(() => {
    const updatePakistanTime = () => {
      const now = new Date();
      try {
        setLivePktTime(
          now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Karachi',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })
        );
        setLivePktDate(
          now.toLocaleDateString('en-US', {
            timeZone: 'Asia/Karachi',
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        );
      } catch {
        // Fallback for environments lacking timeZone database
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const pktDate = new Date(utc + (3600000 * 5)); // UTC+5
        setLivePktTime(pktDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
        setLivePktDate(pktDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
      }
    };

    updatePakistanTime();
    const interval = setInterval(updatePakistanTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const bankName = bank?.bankName || BANK_DETAILS.bankName;
  const accountTitle = bank?.accountTitle || BANK_DETAILS.accountTitle;
  const iban = bank?.iban || BANK_DETAILS.iban;
  const city = bank?.city || BANK_DETAILS.city;
  const appealEn = banner?.appealEnglish || "Please donate generously for supporting poor and needy patients.";
  const bgImg = banner?.backgroundImage || "/images/hospital-building.jpg";
  const showClock = banner?.showLiveTime ?? true;

  // Is modal open (either controlled by parent or auto-triggered internally)
  const isVisible = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleClose = useCallback(() => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [controlledOnClose]);

  // Recurring 2 Minutes (120,000 ms) timer fallback
  useEffect(() => {
    // If controlled from parent, don't run duplicate internal timer
    if (controlledIsOpen !== undefined) return;

    // Trigger every 2 minutes recurring (120,000 ms)
    const interval = setInterval(() => {
      setInternalIsOpen(true);
    }, 120000);

    // Listen to custom global trigger so clicking logo or go back can open anywhere
    const handleGlobalTrigger = () => {
      setInternalIsOpen(true);
    };
    window.addEventListener('open-donation-banner', handleGlobalTrigger);

    return () => {
      clearInterval(interval);
      window.removeEventListener('open-donation-banner', handleGlobalTrigger);
    };
  }, [controlledIsOpen]);

  // Handle Copy to clipboard
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleWhatsAppSlip = () => {
    const message = encodeURIComponent(
      `Assalam-o-Alaikum! I want to donate to Ali Welfare Trust Hospital.\n` +
      `Bank: ${BANK_DETAILS.bankName}\n` +
      `Title: ${BANK_DETAILS.accountTitle}\n` +
      `IBAN: ${BANK_DETAILS.iban}\n` +
      `Please guide me regarding donation receipt.`
    );
    window.open(`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const handleDonateNowClick = () => {
    // Copy IBAN to clipboard automatically for convenient immediate paste
    handleCopy(BANK_DETAILS.iban, 'iban');
    // Scroll to donation section or trigger donation view
    if (onOpenFullDonation) {
      onOpenFullDonation();
      handleClose();
    } else {
      const donateSec = document.getElementById('donate');
      if (donateSec) {
        donateSec.scrollIntoView({ behavior: 'smooth' });
        handleClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
          aria-modal="true"
          role="dialog"
        >
          {/* Humble Soft Dimmed Backdrop - Covers full screen including header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 cursor-pointer z-0"
          />

          {/* Centered Luxury Animated Donation Card with smooth Spring transition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="relative w-full max-w-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400/80 z-10 my-auto text-left shadow-2xl bg-black/30 backdrop-blur-[2px]"
            style={{
              perspective: 1200,
              boxShadow: "0 25px 60px -10px rgba(0,0,0,0.7), 0 8px 25px -4px rgba(0,0,0,0.5)"
            }}
          >
            {/* Dynamic Specular Reflection Sheen Sweep Across Card on Entrance */}
            <motion.div
              initial={{ x: "-100%", opacity: 0.8 }}
              animate={{ x: "240%", opacity: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 w-3/4 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20 pointer-events-none z-30"
            />

            {/* ============================================================ */}
            {/* AUTHENTIC HOSPITAL BACKGROUND PHOTO (CLEARLY VISIBLE)         */}
            {/* ============================================================ */}
            <div className="absolute inset-0 z-0">
              <img
                src={bgImg}
                alt="Ali Welfare Trust Hospital Campus Building"
                className="w-full h-full object-cover object-center scale-100 opacity-100"
                style={{
                  filter: 'contrast(1.08) saturate(1.15) brightness(1.04)',
                  imageRendering: 'crisp-edges'
                }}
              />
              
              {/* Ultra-clear 8K HD Vignette Overlay: Hospital building shows brilliantly behind with maximum clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25" />
              <div className="absolute inset-0 bg-teal-950/15" />
              
              {/* Delicate Warm & Teal Ambient Highlights (Subtle & Non-Obtrusive) */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#087f8c]/20 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Top Close / Cancel Button (Prominent & High Z-Index) */}
            <button
              onClick={handleClose}
              className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-40 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-white/60 bg-black/70 hover:bg-black/90 active:bg-black text-white flex items-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl backdrop-blur-md group"
              aria-label="Cancel and Close Donation Banner"
              title="Cancel / Close (Proceed to Website)"
            >
              <span className="text-[10px] sm:text-xs font-bold text-slate-200 group-hover:text-white">
                Cancel
              </span>
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 group-hover:text-white" />
            </button>

            {/* Inner Content Area - Compact Notification-Style Layout */}
            <div className="relative z-10 p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
              
              <div>
                {/* [ DONATE NOW ] Tag with Amber Brackets & REAL-TIME PAKISTAN STANDARD TIME */}
                <div className="flex items-center gap-1.5 mb-2 flex-wrap pr-16 sm:pr-20">
                  <span className="text-[#f59e0b] font-black text-xs sm:text-sm tracking-wider font-mono select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    [&nbsp;DONATE NOW&nbsp;]
                  </span>

                  {/* Real-time Live Pakistan Standard Time Clock Badge */}
                  {showClock && livePktTime && (
                    <div 
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 border border-amber-400/60 backdrop-blur-md shadow-md text-amber-200 text-[9px] sm:text-[10px]"
                      title="Current Pakistan Standard Time (PKT, UTC+5)"
                    >
                      <Clock className="w-3 h-3 text-amber-400 animate-spin-slow" />
                      <span className="font-extrabold uppercase text-amber-300 tracking-wider">
                        PKT:
                      </span>
                      <span className="font-mono font-black tracking-wider text-white">
                        {livePktTime}
                      </span>
                    </div>
                  )}

                  {/* Real Logo Emblem Badge for Professional Authenticity */}
                  <div className="hidden xs:flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 border border-white/30 backdrop-blur-xs text-[9px] uppercase font-extrabold text-amber-200 tracking-wider">
                    <HospitalLogo variant="emblem" className="w-3.5 h-3.5" />
                    <span>{banner?.badge || "Tax Exempted / Zakat"}</span>
                  </div>
                </div>

                {/* Main Heading: Ali Welfare Trust Hospital */}
                <h2 
                  className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight font-sans drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]"
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 4px 18px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.3)"
                  }}
                >
                  {banner?.headline || "Ali Welfare Trust Hospital"}
                </h2>

                {/* Golden Underline Bar */}
                <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-[#f59e0b] to-[#d7b56d] rounded-full mt-1.5 mb-2.5 shadow-md shadow-amber-500/50" />

                {/* Humble Message (Translucent Glass over background photo) */}
                <div className="bg-black/45 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-teal-400/50 mb-2.5 shadow-xl">
                  <p 
                    className="text-white text-xs sm:text-sm leading-snug font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                  >
                    {appealEn}
                  </p>

                  {banner?.appealUrdu && (
                    <p 
                      dir="rtl"
                      className="text-amber-300 text-xs sm:text-sm leading-snug font-urdu font-bold mt-1.5 pt-1.5 border-t border-teal-500/40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                    >
                      {banner.appealUrdu}
                    </p>
                  )}
                </div>

                {/* "For Donation:" Subheading */}
                <div 
                  className="text-white font-black text-xs sm:text-sm tracking-tight mb-1.5 flex items-center gap-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                >
                  <span>For Donation:</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold shadow-sm">
                    100% Zakat & Sadqah
                  </span>
                </div>

                {/* ============================================================ */}
                {/* BANK DETAILS SECTION (TRANSLUCENT GLASS OVER HOSPITAL PHOTO)  */}
                {/* ============================================================ */}
                <div className="bg-black/55 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border-2 border-amber-400/80 space-y-1.5 text-white font-sans text-xs sm:text-sm font-bold leading-tight mb-3 shadow-2xl">
                  
                  {/* Bank Name */}
                  <div 
                    className="text-amber-300 text-sm sm:text-base font-black tracking-tight"
                  >
                    {bankName}
                  </div>

                  {/* Account Name */}
                  <div 
                    className="text-slate-100 font-bold text-xs sm:text-sm tracking-wide"
                  >
                    Name: <span className="text-white font-black">{accountTitle}</span>
                  </div>

                  {/* IBAN Number with Radiant Shimmer Effect */}
                  <div className="relative py-0.5">
                    <div 
                      className="text-amber-200 font-black text-xs sm:text-sm font-mono tracking-wider break-all flex items-center gap-1.5 flex-wrap"
                    >
                      <span>IBAN: PK57**** **** 6635</span>
                      
                      {/* One-Click Copy Quick Button */}
                      <button
                        onClick={() => handleCopy(iban, 'iban')}
                        className="px-2 py-0.5 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-black text-[10px] transition-all cursor-pointer flex items-center gap-1 shadow-md active:scale-95"
                        title="Copy IBAN to Clipboard"
                      >
                        {copiedField === 'iban' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-950 stroke-[3]" />
                            <span className="text-emerald-950 font-black">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Location / Branch */}
                  <div 
                    className="text-slate-200 font-bold text-[10px] sm:text-xs tracking-wider uppercase pt-1 border-t border-teal-500/30"
                  >
                    {city}
                  </div>
                </div>

              </div>

              {/* Bottom CTA Action Button Bar */}
              <div className="pt-1 flex items-center gap-1.5 sm:gap-2">
                {/* Vibrant Amber/Orange Donate Now Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDonateNowClick}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#d97706] hover:from-[#eab308] hover:to-[#f59e0b] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-950/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-amber-300/40 group"
                  style={{
                    textShadow: "0 1px 2px rgba(0,0,0,0.6)"
                  }}
                >
                  <Banknote className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                  <span>Donate Now</span>
                </motion.button>

                {/* Cancel & Proceed to Website Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer border border-white/35 backdrop-blur-xs group whitespace-nowrap"
                  title="Cancel and continue directly to hospital website"
                >
                  <span className="hidden xs:inline">Proceed to Website</span>
                  <span className="xs:hidden">Website</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* WhatsApp Receipt Quick Button */}
                <button
                  onClick={handleWhatsAppSlip}
                  className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer border border-emerald-400/40 whitespace-nowrap"
                  title="Submit Transfer Slip on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-100" />
                  <span className="hidden sm:inline">WhatsApp Slip</span>
                  <span className="sm:hidden">Slip</span>
                </button>
              </div>

              {/* Gentle closing note */}
              <div className="mt-2.5 pt-1.5 border-t border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-200">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>Regd. Charity • Sec 2(36)</span>
                </span>
                <button
                  onClick={handleClose}
                  className="text-amber-300 hover:text-white font-bold underline cursor-pointer hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors"
                >
                  Cancel & Proceed →
                </button>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
