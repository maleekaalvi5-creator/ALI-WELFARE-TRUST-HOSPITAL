import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  User, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  Sparkles, 
  Printer, 
  FileCheck, 
  AlertCircle, 
  Hash, 
  Copy, 
  Check 
} from 'lucide-react';
import { BANK_DETAILS, DONATION_CAUSES, HOSPITAL_INFO } from '../data/hospitalData';
import { HospitalLogo } from './HospitalLogo';

export const DonationPoster: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedCause, setSelectedCause] = useState<string>(DONATION_CAUSES[0].id);
  const [customAmount, setCustomAmount] = useState<number>(DONATION_CAUSES[0].suggestedAmount);
  const [donorName, setDonorName] = useState<string>('');
  const [showPledgeModal, setShowPledgeModal] = useState<boolean>(false);

  const activeCause = DONATION_CAUSES.find((c) => c.id === selectedCause) || DONATION_CAUSES[0];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);

    // Fire celebratory confetti on IBAN copy!
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#087f8c', '#11a7a0', '#d7b56d', '#ffffff']
    });

    setTimeout(() => {
      setCopiedField(null);
    }, 3000);
  };

  const handleSelectCause = (causeId: string, amount: number) => {
    setSelectedCause(causeId);
    setCustomAmount(amount);
  };

  const formatPKR = (val: number) => {
    return new Intl.NumberFormat('en-PK').format(val);
  };

  const generateWhatsAppDonationUrl = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Ali Welfare Trust Hospital,\n\nI have initiated a donation via Meezan Bank:\n- Cause: ${activeCause.title}\n- Amount: PKR ${formatPKR(customAmount)}\n- Donor Name: ${donorName || 'Anonymous Donor'}\n- Bank: Meezan Bank (Account: MUHAMMAD RAFAY AWAN)\n- IBAN: ${BANK_DETAILS.iban}\n\nPlease find my transfer receipt attached. JazakAllah Khair!`
    );
    return `https://wa.me/${HOSPITAL_INFO.whatsapp}?text=${text}`;
  };

  return (
    <section id="donate" className="py-10 sm:py-14 bg-gradient-to-b from-[#092f3a] via-[#0b3b48] to-[#045d67] text-white relative overflow-hidden">
      
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#087f8c]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#d7b56d]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#d7b56d]" />
            <span>Zakat, Sadqah & General Healthcare Donations</span>
          </div>

          <div className="font-urdu text-2xl sm:text-3xl text-amber-300 font-bold mb-2 drop-shadow-sm">
            عطیات، زکوٰۃ و صدقات برائے علی ویلفیئر ٹرسٹ ہسپتال
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Donate Generously <br />
            <span className="text-[#d7b56d]">Save a Life Today</span>
          </h2>

          <p className="text-sm sm:text-lg text-teal-100 max-w-2xl mx-auto leading-relaxed">
            {BANK_DETAILS.appealEnglish}
          </p>

          <p className="font-urdu text-lg sm:text-xl text-amber-200 mt-3 font-semibold leading-relaxed">
            {BANK_DETAILS.appealUrdu}
          </p>
        </div>

        {/* 2-Column Side-by-Side: Bank Donation Box (Left) + Cause Selector & Impact Calculator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-10">
          
          {/* Left Column: Interactive Bank Details Card (Meezan Bank) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            <motion.div
              whileHover={{ y: -4, scale: 1.005 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="bg-white text-[#092f3a] rounded-3xl p-6 sm:p-7 lg:p-8 shadow-2xl border-2 border-amber-400/40 flex flex-col justify-between h-full relative overflow-hidden group hover:shadow-[0_25px_60px_-15px_rgba(8,127,140,0.35)] transition-shadow duration-300"
            >
              {/* Ambient Shimmer Sweep across the card */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "250%" }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", repeatDelay: 2 }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-300/15 to-transparent -skew-x-12 pointer-events-none z-10"
              />

              {/* Corner Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-[#d7b56d] text-[#092f3a] px-4 sm:px-5 py-1.5 rounded-bl-2xl text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm z-20">
                Official Bank Account
              </div>

              <div>
                {/* Header inside bank card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#092f3a] tracking-tight">
                        {BANK_DETAILS.bankName}
                      </h3>
                      <p className="text-xs text-[#6b7f84] font-semibold">
                        {BANK_DETAILS.branchName} • Code: {BANK_DETAILS.branchCode}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-donation-banner'))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-xs hover:scale-105 self-start sm:self-auto"
                    title="View Official Donation Poster Banner"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Banner</span>
                  </button>
                </div>

                {/* Bank Attributes List */}
                <div className="space-y-3 mb-5">
                  
                  {/* Account Title */}
                  <div className="bg-slate-50 hover:bg-teal-50/40 p-3 sm:p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <User className="w-4 h-4 text-[#087f8c] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b7f84]">
                          Account Title / Beneficiary
                        </p>
                        <p className="text-sm sm:text-base font-extrabold text-[#092f3a] tracking-wide truncate">
                          {BANK_DETAILS.accountTitle}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(BANK_DETAILS.accountTitle, 'title')}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white hover:bg-[#087f8c] hover:text-white text-[#092f3a] border border-slate-200 shadow-xs transition-all flex items-center gap-1 text-[11px] font-bold cursor-pointer shrink-0"
                      title="Copy Account Title"
                    >
                      {copiedField === 'title' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#087f8c]" />
                          <span className="text-[#087f8c] hidden sm:inline">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Account Number */}
                  <div className="bg-slate-50 hover:bg-teal-50/40 p-3 sm:p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Hash className="w-4 h-4 text-[#087f8c] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b7f84]">
                          Account Number
                        </p>
                        <p className="font-mono text-sm sm:text-base font-black text-[#092f3a] tracking-wider">
                          {BANK_DETAILS.accountNo}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(BANK_DETAILS.accountNo, 'accNo')}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white hover:bg-[#087f8c] hover:text-white text-[#092f3a] border border-slate-200 shadow-xs transition-all flex items-center gap-1 text-[11px] font-bold cursor-pointer shrink-0"
                      title="Copy Account Number"
                    >
                      {copiedField === 'accNo' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#087f8c]" />
                          <span className="text-[#087f8c] hidden sm:inline">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* IBAN - Highlighted Hero Box with Radiant Shimmer */}
                  <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-amber-50/50 p-3.5 sm:p-4 rounded-2xl border-2 border-[#087f8c]/40 relative shadow-sm overflow-hidden">
                    {/* Dynamic Shimmer Light Reflection Sweep */}
                    <motion.div
                      initial={{ x: "-120%" }}
                      animate={{ x: "280%" }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: "linear", repeatDelay: 1.2 }}
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12 pointer-events-none z-0"
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#087f8c]" />
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#087f8c]">
                            Direct IBAN (Raast)
                          </span>
                        </div>
                        <span className="text-[9.5px] uppercase font-extrabold bg-[#087f8c]/15 text-[#087f8c] px-2 py-0.5 rounded">
                          24/7 Transfer
                        </span>
                      </div>

                      <p className="font-mono text-xs sm:text-sm md:text-base font-black text-[#092f3a] tracking-wider my-1.5 select-all break-all">
                        {BANK_DETAILS.iban}
                      </p>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-teal-200/60 mt-2">
                        <span className="text-[11px] text-[#6b7f84] font-medium truncate">
                          Meezan Bank Ltd.
                        </span>

                        <button
                          onClick={() => handleCopy(BANK_DETAILS.iban, 'iban')}
                          className="px-3 py-1.5 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                        >
                          {copiedField === 'iban' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy IBAN</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Location & Tax Exemption Badges */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#d7b56d] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9.5px] font-bold text-[#6b7f84] uppercase">Location</p>
                        <p className="text-xs font-bold text-[#092f3a] truncate">{BANK_DETAILS.city}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#087f8c] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9.5px] font-bold text-[#6b7f84] uppercase">Tax Status</p>
                        <p className="text-xs font-bold text-[#092f3a] truncate">{BANK_DETAILS.taxStatus}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Proof Submission & Actions Bar */}
              <div className="bg-amber-50 p-3 sm:p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mt-auto">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-[11px] leading-snug">
                    Send transfer receipt on WhatsApp for your stamped voucher.
                  </span>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowPledgeModal(true)}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white font-bold transition-all text-xs flex items-center justify-center gap-1 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Voucher</span>
                  </button>

                  <a
                    href={generateWhatsAppDonationUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all text-xs flex items-center justify-center gap-1 whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send Slip</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Cause Selector & Donation Impact Calculator (Targeted Focus Element) */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-7 lg:p-8 border border-white/15 shadow-2xl flex flex-col justify-between h-full">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3.5 border-b border-white/15">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3 text-teal-300" />
                    <span>Select Cause & Impact Calculator</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Choose How Your Donation Saves Lives
                  </h3>
                </div>
                <span className="text-[11px] text-amber-300 font-semibold bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full self-start sm:self-auto">
                  Zakat & Sadqah Verified
                </span>
              </div>

              {/* Causes Grid (2x2 Compact Cards) */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-200 mb-2">
                  Healthcare Programs:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DONATION_CAUSES.map((cause) => {
                    const isSelected = selectedCause === cause.id;
                    return (
                      <div
                        key={cause.id}
                        onClick={() => handleSelectCause(cause.id, cause.suggestedAmount)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white text-[#092f3a] border-amber-400 shadow-xl scale-[1.01]'
                            : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1.5 mb-1">
                            <span className="font-bold text-xs sm:text-sm leading-tight">
                              {cause.title}
                            </span>
                            <span className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded shrink-0 ${
                              isSelected ? 'bg-amber-100 text-amber-900' : 'bg-white/10 text-teal-200'
                            }`}>
                              {cause.badge}
                            </span>
                          </div>
                          <p className={`text-[11px] mb-2 line-clamp-2 leading-relaxed ${isSelected ? 'text-[#6b7f84]' : 'text-slate-300'}`}>
                            {cause.description}
                          </p>
                        </div>

                        <div className="pt-1.5 border-t border-slate-200/40 flex items-center justify-between text-xs">
                          <span className={`text-[10px] font-semibold ${isSelected ? 'text-slate-500' : 'text-teal-200'}`}>
                            Suggested:
                          </span>
                          <span className={`font-mono text-xs sm:text-sm font-black ${
                            isSelected ? 'text-[#087f8c]' : 'text-amber-300'
                          }`}>
                            PKR {formatPKR(cause.suggestedAmount)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Amount & Calculator Box */}
              <div className="bg-black/30 p-4 sm:p-4.5 rounded-2xl border border-white/15 flex flex-col justify-between mt-auto">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Quick Presets (PKR):
                    </label>
                    <span className="text-[11px] text-teal-300 font-mono font-bold">
                      PKR {formatPKR(customAmount)}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 mb-3">
                    {[1000, 3500, 7500, 15000, 50000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setCustomAmount(amt)}
                        className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          customAmount === amt
                            ? 'bg-amber-400 text-[#092f3a] shadow-md font-black'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                        }`}
                      >
                        {amt >= 1000 ? `${amt / 1000}k` : amt}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Custom Amount:
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-teal-300 text-xs">
                          PKR
                        </span>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(Number(e.target.value))}
                          min={500}
                          step={500}
                          className="w-full pl-11 pr-3 py-1.5 sm:py-2 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-sm font-bold focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Donor Name (Optional):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Anonymous / Haji M."
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-3 py-1.5 sm:py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Impact Statement */}
                  <div className="p-2.5 rounded-xl bg-teal-950/60 border border-teal-500/30 text-xs mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                    <p className="text-teal-100 text-[11px] sm:text-xs">
                      <strong className="text-amber-300">Direct Impact: </strong>
                      {customAmount >= 3500
                        ? `Sponsors approx. ${Math.max(1, Math.floor(customAmount / 3500))} full free Dialysis session(s) with medicine.`
                        : `Provides free medical consultation & essential medicines for ${Math.max(1, Math.floor(customAmount / 500))} patient(s).`}
                    </p>
                  </div>
                </div>

                {/* Actions inside Calculator */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPledgeModal(true)}
                    className="py-2.5 px-3 rounded-xl bg-[#d7b56d] hover:bg-[#c9a65c] text-[#092f3a] font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <FileCheck className="w-4 h-4 text-[#092f3a]" />
                    <span>Generate Voucher</span>
                  </button>

                  <a
                    href={generateWhatsAppDonationUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Slip via WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Donation Pledge / Receipt Slip Modal */}
        {showPledgeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white text-[#092f3a] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[95vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
              
              {/* Slip Header */}
              <div className="text-center border-b border-slate-200 pb-5 mb-5">
                <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-xs">
                  <HospitalLogo variant="emblem" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-extrabold text-[#392444]">
                  Ali Welfare Trust Hospital
                </h3>
                <p className="text-xs text-[#a61c52] font-semibold">
                  (Regd. Non-Profit Health Organization • Qila Didar Singh)
                </p>
                <div className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                  Donation Pledge Voucher
                </div>
              </div>

              {/* Slip Details Table */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#6b7f84]">Pledge Date:</span>
                  <span className="font-bold text-[#092f3a]">{new Date().toLocaleDateString('en-PK', { dateStyle: 'long' })}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#6b7f84]">Donor Name:</span>
                  <span className="font-bold text-[#092f3a]">{donorName || 'Generous Community Donor'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#6b7f84]">Designated Cause:</span>
                  <span className="font-bold text-[#087f8c]">{activeCause.title}</span>
                </div>
                <div className="flex justify-between py-2 border-b-2 border-teal-600 bg-teal-50/50 px-2 rounded">
                  <span className="font-bold text-[#092f3a]">Total Donation Amount:</span>
                  <span className="font-mono text-lg font-black text-[#087f8c]">PKR {formatPKR(customAmount)}</span>
                </div>

                {/* Bank Transfer Instructions */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mt-3 text-xs">
                  <p className="font-bold text-[#092f3a] mb-1">Transfer Destination Details:</p>
                  <p><span className="text-[#6b7f84]">Bank:</span> <strong className="text-[#092f3a]">Meezan Bank Ltd.</strong></p>
                  <p><span className="text-[#6b7f84]">Account Title:</span> <strong className="text-[#092f3a]">MUHAMMAD RAFAY AWAN</strong></p>
                  <p><span className="text-[#6b7f84]">IBAN:</span> <strong className="font-mono text-[#087f8c]">PK57MEZN0009110108226635</strong></p>
                  <p><span className="text-[#6b7f84]">City:</span> Qila Didar Singh, Gujranwala</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-1/2 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-[#092f3a] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>

                <a
                  href={generateWhatsAppDonationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Transfer</span>
                </a>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowPledgeModal(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
                >
                  Close Voucher
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
