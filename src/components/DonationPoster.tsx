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

        {/* Clean, Centered Official Bank Donation Details Card */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12">
          
          {/* Interactive Bank Details Card (Meezan Bank) */}
          <motion.div
            whileHover={{ y: -4, scale: 1.005 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="bg-white text-[#092f3a] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-amber-400/40 flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_25px_60px_-15px_rgba(8,127,140,0.35)] transition-shadow duration-300"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#092f3a] tracking-tight">
                      {BANK_DETAILS.bankName}
                    </h3>
                    <p className="text-xs text-[#6b7f84] font-semibold">
                      {BANK_DETAILS.branchName} • Code: {BANK_DETAILS.branchCode}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-donation-banner'))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold transition-all cursor-pointer shadow-xs hover:scale-105 self-start sm:self-auto"
                  title="View Official Donation Poster Banner"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>View Official Banner</span>
                </button>
              </div>

              {/* Bank Attributes List */}
              <div className="space-y-3.5 mb-6 sm:mb-8">
                
                {/* Account Title */}
                <div className="bg-slate-50 hover:bg-teal-50/40 p-3.5 sm:p-4 rounded-2xl border border-slate-200 transition-colors flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <User className="w-5 h-5 text-[#087f8c] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#6b7f84]">
                        Account Title / Beneficiary Name
                      </p>
                      <p className="text-base sm:text-lg font-extrabold text-[#092f3a] tracking-wide truncate">
                        {BANK_DETAILS.accountTitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(BANK_DETAILS.accountTitle, 'title')}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-[#087f8c] hover:text-white text-[#092f3a] border border-slate-200 shadow-xs transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shrink-0"
                    title="Copy Account Title"
                  >
                    {copiedField === 'title' ? (
                      <>
                        <Check className="w-4 h-4 text-[#087f8c]" />
                        <span className="text-[#087f8c] hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Account Number */}
                <div className="bg-slate-50 hover:bg-teal-50/40 p-3.5 sm:p-4 rounded-2xl border border-slate-200 transition-colors flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Hash className="w-5 h-5 text-[#087f8c] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#6b7f84]">
                        Account Number
                      </p>
                      <p className="font-mono text-base sm:text-lg font-black text-[#092f3a] tracking-wider">
                        {BANK_DETAILS.accountNo}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(BANK_DETAILS.accountNo, 'accNo')}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-[#087f8c] hover:text-white text-[#092f3a] border border-slate-200 shadow-xs transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shrink-0"
                    title="Copy Account Number"
                  >
                    {copiedField === 'accNo' ? (
                      <>
                        <Check className="w-4 h-4 text-[#087f8c]" />
                        <span className="text-[#087f8c] hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* IBAN - Highlighted Hero Box with Radiant Shimmer */}
                <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-amber-50/50 p-4 sm:p-5 rounded-2xl border-2 border-[#087f8c]/40 relative shadow-sm overflow-hidden">
                  {/* Dynamic Shimmer Light Reflection Sweep */}
                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={{ x: "280%" }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: "linear", repeatDelay: 1.2 }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12 pointer-events-none z-0"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#087f8c]" />
                        <span className="text-xs font-black uppercase tracking-wider text-[#087f8c]">
                          International Bank Account Number (IBAN)
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-extrabold bg-[#087f8c]/15 text-[#087f8c] px-2 py-0.5 rounded">
                        Raast / Direct
                      </span>
                    </div>

                    <p className="font-mono text-sm sm:text-lg md:text-xl font-black text-[#092f3a] tracking-wider my-2 select-all break-all">
                      {BANK_DETAILS.iban}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-teal-200/60 mt-2">
                      <span className="text-xs text-[#6b7f84] font-medium">
                        Instant interbank transfer from any banking app
                      </span>

                      <button
                        onClick={() => handleCopy(BANK_DETAILS.iban, 'iban')}
                        className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer self-stretch sm:self-auto shrink-0"
                      >
                        {copiedField === 'iban' ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>IBAN Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy IBAN</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location & Tax Exemption Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#d7b56d] shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[#6b7f84] uppercase">Branch Location</p>
                      <p className="text-xs font-bold text-[#092f3a]">{BANK_DETAILS.city}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#087f8c] shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[#6b7f84] uppercase">Tax Exemption</p>
                      <p className="text-xs font-bold text-[#092f3a]">{BANK_DETAILS.taxStatus}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Proof Submission & Actions Bar */}
            <div className="bg-amber-50 p-3.5 sm:p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <span className="leading-snug">
                  After transfer, send your transaction receipt on WhatsApp for an official stamped voucher.
                </span>
              </div>

              <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPledgeModal(true)}
                  className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white font-bold transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Generate Voucher</span>
                </button>

                <a
                  href={generateWhatsAppDonationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all text-xs flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Slip</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Cause Selector & Donation Calculator Section (Seamlessly Structured Beneath 50/50 Grid) */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/15 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Select Donation Cause & Calculate Impact</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Choose How Your Donation Saves Lives
              </h3>
            </div>
            <div className="text-xs text-slate-300 max-w-sm">
              Select a verified healthcare program below to allocate your Zakat or Sadqah directly to those in need.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Causes Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-teal-200 mb-2">
                Healthcare Programs:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DONATION_CAUSES.map((cause) => {
                  const isSelected = selectedCause === cause.id;
                  return (
                    <div
                      key={cause.id}
                      onClick={() => handleSelectCause(cause.id, cause.suggestedAmount)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white text-[#092f3a] border-amber-400 shadow-xl scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-bold text-sm leading-tight">
                            {cause.title}
                          </span>
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded shrink-0 ${
                            isSelected ? 'bg-amber-100 text-amber-900' : 'bg-white/10 text-teal-200'
                          }`}>
                            {cause.badge}
                          </span>
                        </div>
                        <p className={`text-xs mb-3 line-clamp-2 ${isSelected ? 'text-[#6b7f84]' : 'text-slate-300'}`}>
                          {cause.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/40 flex items-center justify-between">
                        <span className={`text-[11px] font-semibold ${isSelected ? 'text-slate-500' : 'text-teal-200'}`}>
                          Suggested:
                        </span>
                        <span className={`font-mono text-sm font-black ${
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

            {/* Custom Amount & Calculator Column (5 cols) */}
            <div className="lg:col-span-5 bg-black/25 p-5 sm:p-6 rounded-2xl border border-white/15 flex flex-col justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Quick Amount Presets (PKR):
                </label>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {[1000, 3500, 7500, 15000, 50000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCustomAmount(amt)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        customAmount === amt
                          ? 'bg-amber-400 text-[#092f3a] shadow-md font-black'
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                      }`}
                    >
                      {amt >= 1000 ? `${amt / 1000}k` : amt}
                    </button>
                  ))}
                </div>

                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Custom Pledge Amount:
                </label>
                <div className="relative mb-3">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-teal-300 text-sm">
                    PKR
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Number(e.target.value))}
                    min={500}
                    step={500}
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-base sm:text-lg font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Impact Statement */}
                <div className="p-3 rounded-xl bg-teal-900/50 border border-teal-500/30 text-xs mb-4">
                  <span className="font-bold text-amber-300">Your Direct Impact: </span>
                  <span className="text-teal-100">
                    {customAmount >= 3500
                      ? `Sponsors approx. ${Math.max(1, Math.floor(customAmount / 3500))} full free Dialysis session(s) with medicine.`
                      : `Provides free medical consultation and essential prescription medicines for ${Math.max(1, Math.floor(customAmount / 500))} patient(s).`}
                  </span>
                </div>

                {/* Optional Donor Name */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Donor Name (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Haji Muhammad Aslam / Anonymous"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setShowPledgeModal(true)}
                  className="w-full py-3 rounded-xl bg-[#d7b56d] hover:bg-[#c9a65c] text-[#092f3a] font-extrabold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <FileCheck className="w-4 h-4 text-[#092f3a]" />
                  <span>Generate Donation Voucher</span>
                </button>
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
