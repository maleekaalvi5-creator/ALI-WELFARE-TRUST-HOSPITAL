import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Copy, 
  Check, 
  Building2, 
  User, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  Sparkles, 
  FileCheck, 
  AlertCircle, 
  Calendar, 
  Droplets, 
  Eye, 
  Stethoscope, 
  ChevronRight, 
  HelpCircle, 
  Send, 
  ExternalLink,
  Phone,
  Globe,
  Award,
  DollarSign
} from 'lucide-react';
import { BANK_DETAILS, DONATION_CAUSES, HOSPITAL_INFO } from '../data/hospitalData';
import { useHospitalContent } from '../context/HospitalContentContext';

interface DonatePageProps {
  onNavigateHome: () => void;
  onBookAppointment?: (departmentId?: string) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({
  onNavigateHome,
  onBookAppointment,
}) => {
  const { content } = useHospitalContent();
  const bank = content?.donation?.bank || BANK_DETAILS;
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedCauseId, setSelectedCauseId] = useState<string>(DONATION_CAUSES[0].id);
  const [donationAmount, setDonationAmount] = useState<number>(DONATION_CAUSES[0].suggestedAmount);
  const [selectedCategory, setSelectedCategory] = useState<'zakat' | 'sadaqah' | 'sadaqah-jariyah' | 'general'>('zakat');
  const [selectedCurrency, setSelectedCurrency] = useState<'PKR' | 'USD' | 'GBP' | 'AED' | 'SAR'>('PKR');
  
  // Deposit Slip notification state
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [slipSubmitted, setSlipSubmitted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeCause = DONATION_CAUSES.find(c => c.id === selectedCauseId) || DONATION_CAUSES[0];

  const currencyRates: Record<string, number> = {
    PKR: 1,
    USD: 280,
    GBP: 360,
    AED: 76,
    SAR: 75
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#087f8c', '#d7b56d', '#00b4d8', '#ffffff']
    });

    setTimeout(() => {
      setCopiedField(null);
    }, 3000);
  };

  const handlePresetAmount = (amount: number, causeId?: string) => {
    setDonationAmount(amount);
    if (causeId) {
      setSelectedCauseId(causeId);
    }
  };

  const formatCurrency = (amountPkr: number) => {
    if (selectedCurrency === 'PKR') {
      return `Rs. ${new Intl.NumberFormat('en-PK').format(amountPkr)}`;
    }
    const converted = Math.round(amountPkr / currencyRates[selectedCurrency]);
    const symbol = selectedCurrency === 'USD' ? '$' : selectedCurrency === 'GBP' ? '£' : `${selectedCurrency} `;
    return `~ ${symbol}${new Intl.NumberFormat('en-US').format(converted)} (Rs. ${new Intl.NumberFormat('en-PK').format(amountPkr)})`;
  };

  const getImpactDescription = (amount: number) => {
    if (amount >= 150000) {
      return "Sponsors major biomedical dialysis / ultrasound equipment endowment (Sadaqah Jariyah).";
    }
    if (amount >= 54000) {
      return "Completely funds 1 month of life-saving hemodialysis (12 sessions) for a chronic kidney patient.";
    }
    if (amount >= 18000) {
      const surgeries = Math.floor(amount / 18000);
      return `Restores vision for ${surgeries} elderly patient${surgeries > 1 ? 's' : ''} through sutureless phaco cataract surgery and lens implants.`;
    }
    if (amount >= 4500) {
      const sessions = Math.floor(amount / 4500);
      return `Funds ${sessions} complete hemodialysis session${sessions > 1 ? 's' : ''} (dialyzer, heparin, blood lines and nurse care).`;
    }
    if (amount >= 2500) {
      return "Provides 1 month of essential prescription medicines (hypertension, diabetes, heart care) for a needy patient.";
    }
    return "Supports the emergency patient care pool, diagnostic laboratory tests, and free pharmacy dispensary.";
  };

  const handleSendWhatsAppSlip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim()) {
      alert("Please provide your name and contact phone number.");
      return;
    }

    const message = encodeURIComponent(
      `*ALI WELFARE TRUST HOSPITAL — DONATION DEPOSIT NOTIFICATION*\n\n` +
      `*Donor Name:* ${donorName.trim()}\n` +
      `*Phone/WhatsApp:* ${donorPhone.trim()}\n` +
      `*Donation Purpose:* ${selectedCategory.toUpperCase()}\n` +
      `*Target Cause:* ${activeCause.title}\n` +
      `*Amount Donated:* Rs. ${new Intl.NumberFormat('en-PK').format(donationAmount)}\n` +
      `*Transaction Ref / ID:* ${transactionRef.trim() || 'Bank Transfer'}\n` +
      `*Bank:* Meezan Bank Ltd. (A/C: 09110108226635)\n\n` +
      `_Please acknowledge this donation and issue an official Trust Zakat receipt. JazakAllah Khair!_`
    );

    window.open(`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=${message}`, '_blank');
    setSlipSubmitted(true);
    setTimeout(() => setSlipSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: "Is Ali Welfare Trust Hospital 100% Zakat & Sadaqah eligible?",
      a: "Yes. Ali Welfare Trust Hospital is a registered welfare healthcare institution (Regd. #1142/GRW). We maintain a 100% Shariah-compliant Zakat governance model. Every rupee given as Zakat is strictly and exclusively utilized for deserving (Mustahiq) patients verified under Shariah principles."
    },
    {
      q: "Are any administrative fees deducted from Zakat donations?",
      a: "No. 0% administrative fee is deducted from Zakat. All administrative overheads, utility bills, and building maintenance are covered separately by trustee endowments and dedicated general funds. 100% of your Zakat directly finances patient medicines, dialysis consumables, and surgeries."
    },
    {
      q: "How are deserving patients verified?",
      a: "We have an on-ground Patient Welfare Assessment Committee that reviews patient financial circumstances, CNIC, employment status, and household dependencies before issuing a verified Free Healthcare Card."
    },
    {
      q: "Can overseas Pakistanis donate from the UK, USA, Canada, or Middle East?",
      a: "Yes. You can execute an international wire transfer using the official Meezan Bank IBAN: PK57MEZN0009110108226635 and Swift Code: MEZNPKKA. You can also send through Remitly, Wise, Western Union, or family accounts into this account."
    },
    {
      q: "Will I receive an official stamped donation receipt?",
      a: "Yes. Once you complete your bank transfer, submit your transaction ID via our WhatsApp finance desk (+92 345 2074974) or using the notification form on this page. Our accounts department issues an official stamped tax/zakat receipt within 24 hours."
    }
  ];

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
            <span className="text-white font-bold">100% Zakat & Donation Portal</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-teal-300">
            <span className="px-2 py-0.5 rounded bg-teal-900 border border-teal-700 text-amber-300 font-bold">
              Regd. Trust #1142/GRW
            </span>
            <span className="hidden sm:inline-block">•</span>
            <span className="hidden sm:inline-block text-teal-200">
              Shariah Compliant • 0% Admin Deduction on Zakat
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#02131a] via-[#08323e] to-[#041d24] text-white pt-12 pb-16 lg:pt-16 lg:pb-24 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(#087f8c_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="site-container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-900/80 border border-teal-600/50 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sadaqah Jariyah & Zakat Eligible Healthcare</span>
            </div>

            <div className="font-urdu text-2xl sm:text-3xl lg:text-4xl text-amber-300 leading-relaxed font-bold">
              وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا
            </div>
            
            <p className="font-urdu text-base sm:text-lg text-teal-200 font-medium leading-relaxed">
              ”اور جس نے کسی ایک انسان کی جان بچائی، گویا اس نے تمام انسانیت کو زندگی بخشی۔“ (سورۃ المائدہ: 32)
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-display">
              Save a Life Today With Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-200 to-cyan-200">
                Zakat, Sadaqah & Charitable Donations
              </span>
            </h1>

            <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Every single rupee directly provides life-saving kidney dialysis sessions, restores sight through cataract eye surgeries, and furnishes free prescription medicines for destitute patients at Ali Welfare Trust Hospital, Qila Didar Singh.
            </p>

            {/* Quick Currency Reference Toggle for Overseas Donors */}
            <div className="pt-2 flex items-center justify-center gap-2">
              <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Currency:</span>
              </span>
              {(['PKR', 'USD', 'GBP', 'AED', 'SAR'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCurrency === curr
                      ? 'bg-amber-400 text-[#0f172a] shadow-sm font-black'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAIN DONATION WORKBENCH: OFFICIAL BANK CARD + INTERACTIVE CALCULATOR */}
      <section className="py-12 site-container -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Corporate Meezan Bank Coordinates & 1-Click Copy */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl relative overflow-hidden">
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-600 to-teal-600" />

              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#0f172a] text-base leading-tight">
                      Official Bank Coordinates
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Direct Deposit & Online Wire Transfer
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Verified Trust
                </span>
              </div>

              {/* Bank Details Container */}
              <div className="space-y-3.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 text-xs">
                
                {/* Bank Name */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Bank Name</span>
                  <span className="font-extrabold text-[#0f172a] text-right">
                    {bank.bankName}
                  </span>
                </div>

                {/* Account Title */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Account Title</span>
                  <span className="font-black text-emerald-900 tracking-wide text-right">
                    {bank.accountTitle}
                  </span>
                </div>

                {/* Account Number with 1-Click Copy */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <span className="text-slate-500 font-medium block">Account Number</span>
                    <span className="font-mono font-bold text-sm text-[#0f172a]">
                      {bank.accountNo}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(bank.accountNo, 'acc')}
                    className="btn-3d-gold px-3 py-1.5 rounded-lg text-xs font-bold text-[#3a1d04] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* IBAN Number (International Banking) with 1-Click Copy */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="pr-2">
                    <span className="text-slate-500 font-medium block">IBAN (International Transfer)</span>
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-950 break-all">
                      {bank.iban}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(bank.iban, 'iban')}
                    className="btn-3d-gold px-3 py-1.5 rounded-lg text-xs font-bold text-[#3a1d04] flex items-center gap-1 cursor-pointer flex-shrink-0"
                  >
                    {copiedField === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'iban' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Branch & Swift */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Branch</span>
                  <span className="font-bold text-slate-800 text-right">
                    {bank.branchName} (Code: {bank.branchCode})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Swift / BIC Code</span>
                  <span className="font-mono font-bold text-slate-800">
                    MEZNPKKA
                  </span>
                </div>
              </div>

              {/* EasyPaisa / JazzCash & Instant Mobile Transfer Guide */}
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs space-y-1.5">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-800" />
                  <span>EasyPaisa / JazzCash / Raast Instructions</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Open your <strong>EasyPaisa</strong>, <strong>JazzCash</strong>, or mobile banking app → Select <strong>Bank Transfer</strong> → Choose <strong>Meezan Bank</strong> → Enter Account <strong>{bank.accountNo}</strong> or IBAN.
                </p>
                <div className="text-emerald-900 font-semibold pt-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Assistance Helpline: {HOSPITAL_INFO.helpline}</span>
                </div>
              </div>

            </div>

            {/* Tax Exemption & Shariah Credentials Card */}
            <div className="bg-[#031d24] rounded-2xl p-5 text-white border border-teal-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Shariah Governance & Transparency</span>
              </div>
              <ul className="space-y-2 text-xs text-teal-100/90">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Zero Admin Fee:</strong> 100% of Zakat is delivered directly into patient medical files.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Registered Welfare Body:</strong> Operating in full compliance under registration #1142/GRW.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Audited Accounts:</strong> Annual financial statements audited by external certified accountants.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column (7 Cols): Interactive Giving Programs, Calculator & Receipt Deposit Slip */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl">
              
              {/* Category Selector: Zakat, Sadaqah, Sadaqah Jariyah */}
              <div className="mb-6">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
                  Select Donation Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'zakat', label: 'Zakat (زکوٰۃ)', badge: '100% Eligible' },
                    { id: 'sadaqah', label: 'Sadaqah (صدقہ)', badge: 'Welfare Aid' },
                    { id: 'sadaqah-jariyah', label: 'Sadaqah Jariyah', badge: 'Perpetual' },
                    { id: 'general', label: 'General Fund', badge: 'Hospital Pool' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#087f8c] text-white border-[#087f8c] shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs leading-snug">{cat.label}</div>
                      <div className={`text-[10px] mt-0.5 ${selectedCategory === cat.id ? 'text-amber-300' : 'text-slate-400'}`}>
                        {cat.badge}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clinical Causes / Sponsorship Plans */}
              <div className="mb-6">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
                  Choose Life-Saving Sponsorship Cause:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DONATION_CAUSES.map((cause) => {
                    const isSelected = selectedCauseId === cause.id;
                    return (
                      <div
                        key={cause.id}
                        onClick={() => {
                          setSelectedCauseId(cause.id);
                          setDonationAmount(cause.suggestedAmount);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-1 ring-emerald-500'
                            : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {cause.badge}
                          </span>
                          <span className="font-extrabold text-xs text-emerald-900">
                            Rs. {new Intl.NumberFormat('en-PK').format(cause.suggestedAmount)}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] leading-snug mb-1">
                          {cause.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {cause.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Amount Selector & Quick Buttons */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                  Enter or Select Amount ({selectedCurrency}):
                </label>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {[2500, 4500, 9000, 18000, 54000, 100000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handlePresetAmount(amt)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        donationAmount === amt
                          ? 'bg-amber-400 text-[#0f172a] shadow-xs font-black'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      Rs. {new Intl.NumberFormat('en-PK').format(amt)}
                    </button>
                  ))}
                </div>

                {/* Custom Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                    PKR
                  </div>
                  <input
                    type="number"
                    value={donationAmount || ''}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    min="500"
                    step="500"
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-base text-[#0f172a] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Enter Custom Donation Amount"
                  />
                </div>

                {/* Live Real-Time Impact Metric */}
                <div className="mt-3 p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-950 flex items-start gap-2.5 text-xs font-medium">
                  <Heart className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-extrabold block text-emerald-900 mb-0.5">
                      Direct Human Impact:
                    </span>
                    <span>{getImpactDescription(donationAmount)}</span>
                    <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                      Value in {selectedCurrency}: {formatCurrency(donationAmount)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Deposit Slip Submission Form */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-black text-sm text-[#0f172a]">
                      Already Transferred? Notify Hospital Finance Desk
                    </h4>
                    <p className="text-xs text-slate-500">
                      Submit deposit details to receive your official stamped Trust tax/zakat receipt certificate via WhatsApp.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 whitespace-nowrap">
                    Instant Receipt
                  </span>
                </div>

                <form onSubmit={handleSendWhatsAppSlip} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 mb-1 block">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Muhammad Rafiq"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 mb-1 block">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        placeholder="e.g. 0300 1234567"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 mb-1 block">
                      Transaction Reference / Slip ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder="e.g. Online IBFT Ref: 20260914-XXXX or ATM Slip No."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="btn-3d-gold flex-1 py-3 rounded-xl font-black text-xs text-[#3a1d04] flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-900" />
                      <span>Send Deposit Slip via WhatsApp (+92 345 2074974)</span>
                    </button>
                  </div>

                  {slipSubmitted && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold text-center">
                      JazakAllah Khair! Opening WhatsApp to notify hospital accounts desk.
                    </div>
                  )}
                </form>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. WHERE DOES YOUR DONATION GO? FINANCIAL ALLOCATION PILLARS */}
      <section className="py-14 bg-white border-y border-slate-200/90">
        <div className="site-container">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase tracking-wider mb-2">
              <FileCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Financial Transparency</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Where Your Donation Saves Lives
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Every single rupee contributed to Ali Welfare Trust Hospital is governed by strict ethical audits and zero administrative deduction on Zakat funds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                percent: "45%",
                title: "Hemodialysis & Nephrology",
                desc: "High-flux dialyzers, heparin, blood lines, pure RO water maintenance, and intensive kidney nursing care.",
                icon: Droplets,
                color: "text-emerald-700 bg-emerald-50 border-emerald-200"
              },
              {
                percent: "25%",
                title: "Eye Care & Phaco Cataract Surgeries",
                desc: "Sterile stitchless phacoemulsification, imported intraocular lenses (IOLs), and post-operative eye recovery drops.",
                icon: Eye,
                color: "text-teal-700 bg-teal-50 border-teal-200"
              },
              {
                percent: "18%",
                title: "Free Prescription Medicines",
                desc: "Supplying daily insulin, cardiac treatments, antibiotics, and emergency trauma medications to indigent patients.",
                icon: Stethoscope,
                color: "text-blue-700 bg-blue-50 border-blue-200"
              },
              {
                percent: "12%",
                title: "Diagnostic Ultrasound & Blood Tests",
                desc: "Subsidizing 24/7 automated blood counts (CBC), liver/kidney profiles, hepatitis screening, and 4D sonology.",
                icon: Sparkles,
                color: "text-amber-700 bg-amber-50 border-amber-200"
              }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i}
                  className="bg-[#fbf9f5] rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${pillar.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xl font-black text-emerald-900">
                        {pillar.percent}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#0f172a] mb-1.5">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-800">
                    Direct Patient Subsidy
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Donor Questions & Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">
            Frequently Asked Questions on Zakat & Donations
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0f172a] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90 text-emerald-700' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM CALL-TO-ACTION STRIP */}
      <section className="site-container mt-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#02131a] via-[#08323e] to-[#041d24] p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-700/60">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-amber-300 font-extrabold text-xs tracking-wider uppercase">
              Ali Welfare Trust Hospital (Regd. #1142/GRW)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Need Personal Assistance with Large Endowments or Zakat Calculation?
            </h3>
            <p className="text-teal-100 text-xs sm:text-sm max-w-xl">
              Connect with our hospital director or finance trustees for customized patient sponsorship portfolios, donor naming rights, or direct bank transfer verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Ali%20Welfare%20Trust%20Hospital%2C%20I%20would%20like%20to%20discuss%20a%20major%20charitable%20donation%20or%20Zakat%20sponsorship.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-gold px-5 py-3 rounded-xl font-black text-xs sm:text-sm text-[#3a1d04] flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-950" />
              <span>WhatsApp Finance Desk</span>
            </a>

            <a
              href={`tel:${HOSPITAL_INFO.helpline}`}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call: {HOSPITAL_INFO.helpline}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
