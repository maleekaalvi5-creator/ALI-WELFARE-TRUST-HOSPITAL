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
    {
      id: "slide-1",
      image: "/images/Slide-1.jpg",
      category: "Founding Vision & Poster",
      title: "Honoring the Eternal Legacy of Our Late Founder",
      urduTitle: "بانیِ ہسپتال حاجی نذر حسین علوی (مرحوم) — جنھوں نے 2005 میں اس فلاحی سفر کی بنیاد رکھی",
      subheading: "A Sacred Mission Started in 2005",
      description: "Ye tasveer hamare muhtaram bani Late Nazar Hussain Alvi ki yaad ko taaza karti hai jo is dunya se rukhsat hone se pehle qila didar singh mein dKhi insaniyat ke liye yeh shifa-khana chhor gaye. Is poster mein heart care, eye care aur ultrasound jaise ahem sections ke nishaan aur peechay aasmaan ke badal us pakeeza soch ki gawaahi dete hain jo aaj bhi zinda hai.",
      location: "Main Tribute Hall",
      active: true
    },
    {
      id: "slide-2",
      image: "/images/Slide-2.jpg",
      category: "Main Building",
      title: "Main Hospital Building and Campus Architecture",
      urduTitle: "ہسپتال کی مرکزی عمارت کا منظر — جہاں انسانیت کی خدمت دن رات جاری ہے",
      subheading: "Serving Humanity with Complete Dignity",
      description: "Hspatal ki grand aur khubsurat main building ka manzar, jahan har mariz ko baghair kisi bhed-bhav ke behtareen, saaf-suthra aur pur-sukoon mahol mein tibbi sahulat faraham ki jati hai.",
      location: "Qila Didar Singh Main Campus",
      active: true
    },
    {
      id: "slide-3",
      image: "/images/Slide-3.jpg",
      category: "Reception Desk",
      title: "Warm Reception Desk for Patient Care",
      urduTitle: "ریپشن اور رہنمائی کاؤنٹر — جہاں ہر آنے والے کا خلوص سے استقبال ہوتا ہے",
      subheading: "Guiding Every Visitor with Deep Empathy",
      description: "Hspatal ka reception area jahan marizon aur unke luvahqeen ko foran registration, checkup ki raahnumai aur munasib madad di jati hai taaki unka waqt zaya na ho.",
      location: "Entrance Lobby Level 1",
      active: true
    },
    {
      id: "slide-4",
      image: "/images/Slide-4.jpg",
      category: "Main Entrance Gate",
      title: "The Gateway of Hope — Sirf Ek Gate Ke Andar Har Tarhan Ki Shifa",
      urduTitle: "مرکزی دروازہ — صرف ایک گیٹ کے اندر ہر طرح کی شفا",
      subheading: "Complete Healthcare Under One Roof",
      description: "Hspatal ka woh markazi darwaza jo har dKhi aur zarortmand ke liye khula hai. Is gate ke andar qadam rakhte hi mariz ko lab, pharmacy, OPD, aur emergency ki saari sahulatein ek hi chhat ke neeche mil jati hain.",
      location: "Main Campus Gateway",
      active: true
    },
    {
      id: "slide-5",
      image: "/images/Slide-5.jpg",
      category: "Leadership & Continuity",
      title: "A Legacy That Lives On — وہ ورثہ جو آج بھی زندہ ہے",
      urduTitle: "وہ ورثہ جو آج بھی زندہ ہے — بانی اور موجودہ سی ای او کی ساتھ میں تصویر",
      subheading: "Passing the Torch of Devotion",
      description: "Late Nazar Hussain Alvi aur moujooda CEO Zamin Ali Alvi ki yeh tasveer is baat ka paigham hai ke khidmat ka yeh silsila kabhi nahi rukega. Jo pyara virsa bani chhor kar gaye thay, use aaj unki naseehat ke mutabiq behtareen andaz mein agay barhaya ja raha hai.",
      location: "Executive Administration",
      active: true
    },
    {
      id: "slide-6",
      image: "/images/Slide-6.jpg",
      category: "Emergency Fleet",
      title: "24/7 Wings of Hope — Active Emergency Ambulance Service",
      urduTitle: "امید کے بازو — ہنگامی حالات اور ٹراما کے لیے چوبیس گھنٹے تیار ایمبولینس",
      subheading: "Round-the-Clock Lifesaving Response",
      description: "Hspatal ki emergency ambulances jo din ho ya raat, fouri tor par mariz tak pahunch kar unki jaan bachane aur unhein mahfooz tareeqay se trauma unit tak laane ke liye hamesha tayar rehti hain.",
      location: "Emergency Bay 24/7",
      active: true
    },
    {
      id: "slide-7",
      image: "/images/Slide-7.jpg",
      category: "Aerial Drone View",
      title: "Aerial Drone View of the Hospital Complex",
      urduTitle: "ہسپتال کی عمارت کا ڈرون اور فضائی منظر",
      subheading: "Expansive Medical Infrastructure for the Region",
      description: "Drone view ke zariye dekhi gayi hspatal ki yeh vishal aur khubsurat imarat is baat ki gawaahi deti hai ke yeh fariq qila didar singh aur aas-paas ke 20 se zyada gaon ke logon ko kitni badi satah par saholat de rahi hai.",
      location: "Campus Overhead",
      active: true
    },
    {
      id: "slide-8",
      image: "/images/Slide-8.jpg",
      category: "Historical Heritage Block",
      title: "The Historical Foundation Building from 2005",
      urduTitle: "سال ۲۰۰۵ کی تاریخی عمارت — جہاں سے اس عظیم فلاحی سفر کا آغاز ہوا",
      subheading: "Rooted in Sincerity and Pure Sacrifice",
      description: "Hspatal ki woh ibtedayi imarat jo 2005 mein qaim ki gayi thi. Yeh tasveer yaad dilati hai ke kaise ek choti si shuruat aur sachhi niyat ne aage chal kar lakhon marizon ke liye shifa ka yeh behtareen markaz banaya.",
      location: "Original Foundation Site",
      active: true
   }
],
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
    banner: { enabled: true, headline: "Ali Welfare Trust Hospital", badge: "Non-Profit Healthcare Trust #1142", appealEnglish: "Help us save precious human lives through free hemodialysis sessions, subsidized medicines, and free cataract surgeries for the impoverished.", appealUrdu: "مستحق اور نادار مریضوں کے علاج اور ادویات کے لیے دل کھول کر عطیات دیں", backgroundImage: "/images/Slide-8.jpg", showLiveTime: true, autoPopupSeconds: 120 },
    bank: { bankName: BANK_DETAILS.bankName, accountTitle: BANK_DETAILS.accountTitle, iban: BANK_DETAILS.iban, accountNo: BANK_DETAILS.accountNo, branchName: BANK_DETAILS.branchName, branchCode: BANK_DETAILS.branchCode, city: BANK_DETAILS.city, currency: BANK_DETAILS.currency, taxStatus: BANK_DETAILS.taxStatus, appealUrdu: BANK_DETAILS.appealUrdu, appealEnglish: BANK_DETAILS.appealEnglish, easypaisaNo: "03452074974", jazzcashNo: "03324711101" },
    causes: DONATION_CAUSES
  },
  campus: {
    facilities: GALLERY_ITEMS,
    photoFrames: [
      { id: "frame-1", title: "Main Hospital Entrance & Grounds", caption: "Main entrance with dedicated ambulance ramp and 24/7 reception", imageUrl: "/images/Slide-2.jpg", dateAdded: "Official Campus" },
      { id: "frame-2", title: "Aerial View of Healthcare Campus", caption: "Multi-wing facility in Qila Didar Singh, Gujranwala", imageUrl: "/images/Slide-7.jpg", dateAdded: "Campus Aerial" },
      { id: "frame-3", title: "The Gateway of Hope", caption: "Stepping Through Doors Built on Sincerity, Dedicated to Total Healing", imageUrl: "/images/Slide-4.jpg", dateAdded: "Hospital Gate" },
      { id: "frame-4", title: "24/7 Wings of Hope", caption: "Always on the Move, Always Ready: Round-the-Clock Emergency Trauma Response", imageUrl: "/images/Slide-6.jpg", dateAdded: "Ambulance / Emergency Service" }
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
    ogImage: "/images/Slide-5.jpg",
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
 
  auditLogs: [
    { id: "log-init", timestamp: 1716200000000, user: "superadmin", role: "SuperAdmin", action: "System Initialized", section: "All Modules", details: "Central Content Engine synchronized across all client devices." }
  ],
 revision: 998,
    updatedAt: 1716200000000, 
  };
