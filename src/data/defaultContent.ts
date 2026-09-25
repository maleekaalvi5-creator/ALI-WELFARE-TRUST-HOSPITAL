import { HospitalContent } from '../types/content';
import { 
  HOSPITAL_INFO, 
  BANK_DETAILS, 
  MISSION_AND_VALUES, 
  LEADERSHIP, 
  DEPARTMENTS, 
  DOCTORS, 
  DONATION_CAUSES, 
  GALLERY_ITEMS,
  STATS
} from './hospitalData';

export const DEFAULT_HOSPITAL_CONTENT: HospitalContent = {
  header: {
    logoUrl: '/images/hospital-logo.png',
    logoPosition: 'left',
    hospitalName: HOSPITAL_INFO.name,
    tagline: '( A Non-profitable ,Regd,Orginaztion Devoted to provide health facilities)',
    tickerText: '24/7 Emergency & Dialysis Active',
    emergencyBadge: 'Emergency 24/7',
    locationBadge: 'Qila Didar Singh, Gujranwala',
    opdHoursBadge: 'OPD: 8:00 AM – 10:00 PM',
    whatsappNumber: HOSPITAL_INFO.whatsapp,
    emergencyPhone: HOSPITAL_INFO.emergencyPhone,
    navLinks: [
      { name: "Home", href: "#hero" },
      { name: "Departments", href: "#departments" },
      { name: "Doctors", href: "#doctors" },
      { name: "Founder", href: "#founder" },
      { name: "Campus", href: "#gallery" },
      { name: "Donate", href: "#donate" },
      { name: "Contact Us", href: "#contact" },
    ],
    donateButtonText: 'Donate Now',
  },
  hero: {
    badgeText: 'Registered Healthcare Trust #1142 • Serving Humanity Since 2005',
    titleLine1: 'Excellence in Healthcare,',
    titleHighlight: 'Compassion in Service',
    titleLine2: 'for Every Human Life',
    urduTagline: 'خدمتِ خلق — بلا تفریق، معیاری اور ہمدردانہ علاج',
    description: 'Providing advanced kidney dialysis, modern clinical departments, stitchless phaco eye surgeries, computerized laboratory diagnostics, and subsidized treatments to deserving patients in Qila Didar Singh and surrounding rural areas.',
    opdButtonText: 'Book Specialist OPD',
    donateButtonText: 'Donate for Dialysis',
    stats: [
      { label: 'Registered Trust', value: 'Since 2005', sub: 'Non-Profit Healthcare' },
      { label: 'Free Dialysis', value: '100% Free', sub: 'For Deserving Renal Patients' },
      { label: 'Medical Facilities', value: '24/7 Ready', sub: 'Emergency, Lab & Pharmacy' },
    ],
    slides: [
      { id: "slide-1", image: "/images/hospital-building.jpg", category: "Main Campus Entrance", title: "Official Hospital Compound & Reception Gate", urduTitle: "علی ویلفیئر ٹرسٹ ہسپتال — مرکزی گیٹ اور استقبالیہ", location: "Chahal Kalan Road, Qila Didar Singh", tag: "24/7 Access", description: "Official entrance compound of Ali Welfare Trust Hospital providing round-the-clock emergency vehicle and patient access." },
      { id: "slide-2", image: "/images/hospital-aerial.jpg", category: "Hospital Complex & Grounds", title: "Aerial View of Main Hospital Campus", urduTitle: "ہسپتال کی مرکزی عمارت کا فضائی منظر", location: "Campus Grounds & Patient Access", tag: "Registered Facility", description: "Spacious multi-story hospital complex with ambulance driveway, accessible ramps, and green open surroundings." },
      { id: "slide-3", image: "/images/hospital-interior-1.jpg", category: "Diagnostic & Pathology Lab", title: "Central Diagnostic Laboratory & Computerized Reporting", urduTitle: "استقبالیہ و جدید تشخیصی لیبارٹری", location: "Ground Floor Diagnostic Wing", tag: "Subsidized & Free", description: "Pathology testing, registration counter, computerized reporting, and comfortable waiting hall." },
      { id: "slide-4", image: "/images/hospital-interior-2.jpg", category: "Specialist Consultation OPD", title: "Specialist Consultant Examination Chambers", urduTitle: "ماہرینِ طب کا معائنہ و طبی مشاورت", location: "Outpatient Department (OPD)", tag: "Specialist Care", description: "Experienced medical specialists conducting thorough examinations with modern clinical instruments." },
      { id: "slide-5", image: "/images/hospital-interior-3.jpg", category: "Inpatient Care Ward", title: "General Medical & Surgical Inpatient Ward", urduTitle: "مریضوں کا انڈور وارڈ اور آرام دہ بیڈز", location: "First Floor Inpatient Wing", tag: "Clean & Sterile", description: "Hygienic patient recovery ward providing round-the-clock nursing care and comfortable patient beds." },
      { id: "slide-6", image: "/images/gallery-2.jpg", category: "Dialysis & Renal Center", title: "Advanced Hemodialysis Suite & Procedure Center", urduTitle: "جدید ڈائیلاسز یونٹ و آپریشن روم", location: "Specialized Dialysis Centre", tag: "100% Free Dialysis", description: "Dedicated dialysis machines and procedural beds offering free hemodialysis to underprivileged renal patients." },
      { id: "slide-7", image: "/images/gallery-1.jpg", category: "Emergency & Acute Trauma", title: "24/7 Emergency Triage & Trauma Resuscitation Unit", urduTitle: "ایمرجنسی و فوری طبی امداد کا شعبہ", location: "Emergency Ground Wing", tag: "24/7 Emergency", description: "Round-the-clock emergency medical response with central oxygen manifold and acute trauma stabilization beds." },
      { id: "slide-8", image: "/images/gallery-3.jpg", category: "Maternal & Child Health", title: "Maternal Delivery & Pediatric Observation Wing", urduTitle: "شعبہ اطفال و زچگی و نوزائیدہ نگہداشت", location: "Maternity & Pediatric Section", tag: "Specialized Care", description: "Safe, sterile labor and recovery rooms with experienced female gynecologists and trained healthcare staff." }
    ]
  },
  marquee: [
    { text: "Advanced Kidney Hemodialysis Unit", highlight: "24/7 Shifts" },
    { text: "Phaco Stitchless Cataract Eye Surgery", highlight: "Free Camps" },
    { text: "Round the Clock Emergency & Trauma", highlight: "Open 24/7" },
    { text: "Meezan Bank Zakat & Sadqah Portal", highlight: "100% Direct Impact" },
    { text: "4D Color Doppler & Digital Diagnostic Lab", highlight: "Precise Imaging" },
    { text: "Registered Healthcare Trust #1142", highlight: "Est. 2005" },
    { text: "Founded by Late Nazar Hussain Alvi", highlight: "Compassionate Care" },
    { text: "Main Campus: Qila Didar Singh Gujranwala", highlight: "Accessible" },
  ],
  quickStats: STATS.map(s => ({ label: s.label, value: s.value, sub: s.sub, icon: s.icon })),
  founder: {
    name: "Nazar Hussain Alvi",
    title: "Late Founder & Visionary Patron",
    role: "Founder (2005)",
    urduTitle: "بانیِ ادارہ: محترم نذر حسین علوی (مرحوم)",
    quote: "Serving humanity in distress is the highest form of worship. Our doors must always remain open to the needy.",
    bio: "The benevolent founder whose compassion and devotion laid the cornerstone of Ali Welfare Trust Hospital in 2005, ensuring that no patient in Qila Didar Singh and surrounding villages is ever denied world-class healthcare due to lack of funds.",
    imageUrl: "/images/founder-nazar-alvi.jpg",
    memorialPillars: [
      { title: "Foundation of Compassion (2005)", desc: "Established with a solemn pledge that financial constraints should never prevent a human being from receiving dignified healthcare.", icon: "ShieldCheck" },
      { title: "Free Dialysis & Eye Care Legacy", desc: "Pioneered community welfare health camps, subsidized dialysis programs, and free cataract eye surgeries across Gujranwala district.", icon: "Heart" },
      { title: "Perpetual Sadqah-e-Jariyah", desc: "Operating purely on non-profit principles with transparent zakat governance and audited community trust accountability.", icon: "Award" }
    ],
    executiveTeam: LEADERSHIP
  },
  mission: {
    missionEn: MISSION_AND_VALUES.mission,
    missionUrdu: MISSION_AND_VALUES.urduMission,
    visionEn: MISSION_AND_VALUES.vision,
    visionUrdu: MISSION_AND_VALUES.urduVision,
    pillars: [
      { title: "Compassionate Care", urdu: "ہمدردانہ نگہداشت", desc: "Treating every patient with dignity, warmth, and clinical sensitivity regardless of socioeconomic standing." },
      { title: "Clinical Excellence", urdu: "معیاری طبی مہارت", desc: "Modern diagnostic imaging, international sterilization protocols, and qualified medical specialists." },
      { title: "Transparent Welfare", urdu: "شفاف رفاہی نظام", desc: "Every rupee of Zakat and Sadqah directly utilized for patient treatments, dialysis sessions, and free medicine." }
    ]
  },
  departments: DEPARTMENTS,
  doctors: DOCTORS,
  donation: {
    banner: { enabled: true, headline: "Ali Welfare Trust Hospital", badge: "Non-Profit Healthcare Trust #1142", appealEnglish: "Help us save precious human lives through free hemodialysis sessions, subsidized medicines, and free cataract surgeries for the impoverished.", appealUrdu: "مستحق اور نادار مریضوں کے علاج اور ادویات کے لیے دل کھول کر عطیات دیں", backgroundImage: "/images/hospital-building.jpg", showLiveTime: true, autoPopupSeconds: 120 },
    bank: { bankName: BANK_DETAILS.bankName, accountTitle: BANK_DETAILS.accountTitle, iban: BANK_DETAILS.iban, accountNo: BANK_DETAILS.accountNo, branchName: BANK_DETAILS.branchName, branchCode: BANK_DETAILS.branchCode, city: BANK_DETAILS.city, currency: BANK_DETAILS.currency, taxStatus: BANK_DETAILS.taxStatus, appealUrdu: BANK_DETAILS.appealUrdu, appealEnglish: BANK_DETAILS.appealEnglish, easypaisaNo: "03452074974", jazzcashNo: "03324711101" },
    causes: DONATION_CAUSES
  },
  campus: {
    facilities: GALLERY_ITEMS,
    photoFrames: [
      { id: "frame-1", title: "Main Hospital Entrance & Grounds", caption: "Main entrance with dedicated ambulance ramp and 24/7 reception", imageUrl: "/images/hospital-building.jpg", dateAdded: "Official Campus" },
      { id: "frame-2", title: "Aerial View of Healthcare Campus", caption: "Multi-wing facility in Qila Didar Singh, Gujranwala", imageUrl: "/images/hospital-aerial.jpg", dateAdded: "Campus Aerial" },
      { id: "frame-3", title: "Hemodialysis Treatment Wing", caption: "Modern German-engineered dialysis stations providing free sessions", imageUrl: "/images/hospital-interior-1.jpg", dateAdded: "Renal Wing" },
      { id: "frame-4", title: "Sterile Inpatient Recovery Ward", caption: "Air-conditioned recovery rooms with central oxygen monitoring", imageUrl: "/images/hospital-interior-2.jpg", dateAdded: "Inpatient Care" }
    ]
  },
  contact: {
    address: HOSPITAL_INFO.address,
    locationDescription: HOSPITAL_INFO.location,
    contactNumbers: HOSPITAL_INFO.contactNumbers,
    emergencyPhone: HOSPITAL_INFO.emergencyPhone,
    helpline: HOSPITAL_INFO.helpline,
    whatsapp: HOSPITAL_INFO.whatsapp,
    email: HOSPITAL_INFO.email,
    opdHours: HOSPITAL_INFO.opdHours,
    emergencyHours: HOSPITAL_INFO.hours,
    googleMapsLink: HOSPITAL_INFO.googleMapsLink,
    mapEmbedUrl: HOSPITAL_INFO.mapEmbedUrl,
    footerDescription: "Ali Welfare Trust Hospital is a dedicated non-profit registered healthcare institution committed to delivering accessible, high-standard clinical treatments, free kidney dialysis, and subsidized healthcare to humanity.",
    copyrightText: "© 2026 Ali Welfare Trust Hospital (Regd. #1142). All rights reserved."
  },
  aiSettings: {
    enabled: true,
    assistantName: "Ali Care",
    welcomePrayerMessage: "Peace be upon you, Sir. I am Ali Care, your 24/7 dedicated AI Consultant for Ali Welfare Trust Hospital. I can schedule specialist appointments, answer any medical or general question from the internet, guide your Zakat & Sadqah donations, provide appointment reminders, and connect emergency calls. How may I serve you today, Sir?",
    welcomeUrduMessage: "السلام علیکم محترم جناب! میں علی کیئر ہوں، علی ویلفیئر ٹرسٹ ہسپتال کا 24/7 ذہین اے آئی کنسلٹنٹ۔ میں ڈاکٹرز کے معائنے کا وقت، عطیات، یاد دہانی اور انٹرنیٹ سے تمام معلومات فراہم کر سکتا ہوں۔ فرمائیے میں آپ کی کیا خدمت کر سکتا ہوں؟",
    tone: "super-intelligent",
    enableVoiceInput: true,
    enableVoiceOutput: true,
    enableWebSearch: true,
    enableAppointmentBooking: true,
    customSystemInstructions: "You are Ali Care, a Super Intelligent 24/7 AI healthcare consultant for Ali Welfare Trust Hospital, Qila Didar Singh, Gujranwala. You are an expert doctor assistant, receptionist, and donation guide. RULES: 1. Always be respectful, call user Sir/Madam. 2. Speak in user's language - Urdu, Roman Urdu, or English. 3. You can answer ANY question via web search - medical, general, Islamic. 4. For emergencies, immediately give emergency number and tell to call 1122 or hospital emergency. 5. Guide for appointments - ask department, doctor, date, phone number. 6. Guide for Zakat/Sadqah - give Meezan Bank IBAN, Easypaisa, JazzCash. 7. Be concise but super helpful. 8. Never say you cannot do something - always try to help. 9. Remember hospital is non-profit Trust #1142 since 2005, founded by Nazar Hussain Alvi. 10. Promote free dialysis, free eye camps, 24/7 emergency.",
    suggestedQuestions: [
      "Book an appointment with specialist doctor",
      "Free dialysis registration process & timings",
      "Meezan Bank Zakat & Sadqah donation details",
      "Call emergency desk or ambulance now",
      "Check patient appointment reminder tips",
      "Ask any general medical or internet question"
    ]
  },
  logoFavicon: {
    logoUrl: "/images/hospital-logo-clean.png",
    faviconUrl: "/images/hospital-emblem-clean.png",
    emblemUrl: "/images/hospital-emblem-clean.png",
    logoHeight: 52,
    altText: "Ali Welfare Trust Hospital Logo",
    customBrandUrdu: "علی ویلفیئر ٹرسٹ ہسپتال",
    showEmblemOnMobile: true
  },
  seo: {
    metaTitle: "Ali Welfare Trust Hospital | 100% Free Kidney Dialysis & Emergency Care in Gujranwala",
    metaDescription: "Registered Non-Profit Healthcare Trust #1142 in Qila Didar Singh, Gujranwala. Offering 24/7 emergency care, 100% free hemodialysis, specialist doctors, and modern laboratory diagnostics.",
    keywords: "Ali Welfare Trust Hospital, Qila Didar Singh, free dialysis hospital, Gujranwala hospital, non profit hospital Pakistan, zakat hospital Pakistan, free eye surgery",
    ogImage: "/images/hospital-building.jpg",
    ogTitle: "Ali Welfare Trust Hospital — Serving Humanity with Dignity",
    ogDescription: "Dedicated registered non-profit medical trust providing free hemodialysis, round-the-clock emergency care, and modern healthcare facilities.",
    canonicalUrl: "https://aliwelfaretrust.org",
    author: "Ali Welfare Trust",
    robots: "index, follow",
    googleSiteVerification: "",
    jsonLdSchemaEnabled: true,
    hospitalType: "MedicalOrganization",
    priceRange: "Free & Subsidized"
  },
  theme: {
    primaryColor: "#087f8c",
    secondaryColor: "#092f3a",
    accentColor: "#d97706",
    headingFont: "Outfit",
    bodyFont: "Plus Jakarta Sans",
    fontUrdu: "Amiri",
    borderRadius: "rounded-2xl",
    darkNavMode: true
  },
  pagesSections: {
    topBar: { enabled: true, title: "Emergency & Timings Bar" },
    heroSlider: { enabled: true, title: "Cinematic 3D Hero Showcase", badge: "Primary Entrance" },
    marquee: { enabled: true, title: "Live Medical Facilities Marquee" },
    quickStats: { enabled: true, title: "Hospital Metrics & Impact Stats" },
    founderMemorial: { enabled: true, title: "Founder Memorial & Vision", urduTitle: "بانیِ ادارہ — محترم نذر حسین علوی" },
    memorialInfiniteScroll: { enabled: true, title: "Memorial Continuous Tribute" },
    departments: { enabled: true, title: "Specialized Medical Departments", subtitle: "Equipped with modern clinical diagnostics" },
    deptDoctorsBridge: { enabled: true, title: "Clinical Bridge & Quality Pledge" },
    specialistDoctors: { enabled: true, title: "Consultant Doctors Directory", subtitle: "Senior medical faculty and specialist physicians" },
    donationPoster: { enabled: true, title: "Zakat & Sadqah Appeal Box" },
    campusGallery: { enabled: true, title: "Hospital Campus & Modern Facilities" },
    videoTours: { enabled: true, title: "Campus Video Tours & Documentary" },
    routeNavigator: { enabled: true, title: "Location & Patient Route Navigator" },
    contactSection: { enabled: true, title: "Contact Us & Emergency Help" },
    footer: { enabled: true, title: "Official Hospital Footer" },
    donationPopupBanner: { enabled: true, title: "2-Minute Recurring Donation Modal" },
    aiAgent: { enabled: true, title: "Ali Care 24/7 AI Health Consultant" }
  },
  videos: [
    { id: "vid-1", title: "Ali Welfare Trust Hospital Campus Documentary", urduTitle: "ہسپتال کی دستاویزی فلم اور خدمات کا جائزہ", category: "Documentary", youtubeId: "dQw4w9WgXcQ", posterUrl: "/images/hospital-building.jpg", duration: "04:15", description: "A comprehensive documentary showing the founding vision, 24/7 dialysis unit, modern emergency ward, and patient care facilities.", isFeatured: true },
    { id: "vid-2", title: "Advanced Kidney Hemodialysis Unit Virtual Tour", urduTitle: "جدید ہیمو ڈائیلاسز سینٹر کا تفصیلی معائنہ", category: "Renal Center", youtubeId: "dQw4w9WgXcQ", posterUrl: "/images/gallery-2.jpg", duration: "03:40", description: "Take a virtual step inside the specialized renal center where deserving patients receive 100% free hemodialysis sessions daily.", isFeatured: false }
  ],
  auditLogs: [
    { id: "log-init", timestamp: 1716200000000, user: "superadmin", role: "SuperAdmin", action: "System Initialized", section: "All Modules", details: "Central Content Engine synchronized across all client devices." }
  ],
  revision: 998,
  updatedAt: 1716200000000
};
