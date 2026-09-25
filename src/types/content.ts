// src/types/content.ts - FIXED: No circular import, Vercel crash-proof

// FIX: Pehle wale import ko hata ke yahan local types define kiye - circular khatam
export interface Department {
  id: string;
  name: string;
  urduName?: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  services?: string[];
  doctorsCount?: number;
  [key: string]: any;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  department?: string;
  imageUrl?: string;
  experience?: string;
  availability?: string;
  [key: string]: any;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  bio?: string;
  [key: string]: any;
}

export interface DonationCause {
  id: string;
  title: string;
  description: string;
  targetAmount?: number;
  raisedAmount?: number;
  imageUrl?: string;
  [key: string]: any;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  description?: string;
  [key: string]: any;
}

// Ab aapka asal code - bina kisi change ke, sirf upar wale 5 types fix kiye
export interface HeaderConfig {
  logoUrl: string;
  logoPosition: 'left' | 'center';
  logoHeight?: number;
  faviconUrl?: string;
  logoFavicon?: LogoFaviconConfig;
  hospitalName: string;
  tagline: string;
  tickerText: string;
  emergencyBadge: string;
  locationBadge: string;
  opdHoursBadge: string;
  whatsappNumber: string;
  emergencyPhone: string;
  navLinks: { name: string; href: string }[];
  donateButtonText: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  heading?: string;
  subheading?: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
  order?: number;
  active?: boolean;
  category?: string;
  title?: string;
  urduTitle?: string;
  location?: string;
  tag?: string;
  badge?: string;
  headline?: string;
  highlight?: string;
  subline?: string;
  urduTagline?: string;
}

export interface HeroConfig {
  badgeText: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  urduTagline: string;
  description: string;
  opdButtonText: string;
  donateButtonText: string;
  stats: {
    label: string;
    value: string;
    sub: string;
  }[];
  slides: HeroSlide[];
}

export interface MarqueeItem {
  text: string;
  highlight: string;
}

export interface QuickStatItem {
  label: string;
  value: string;
  sub: string;
  icon: string;
}

export interface FounderConfig {
  name: string;
  title: string;
  role: string;
  urduTitle: string;
  quote: string;
  bio: string;
  imageUrl: string;
  memorialPillars: {
    title: string;
    desc: string;
    icon: string;
  }[];
  executiveTeam: LeadershipMember[];
}

export interface MissionConfig {
  missionEn: string;
  missionUrdu: string;
  visionEn: string;
  visionUrdu: string;
  pillars: {
    title: string;
    urdu: string;
    desc: string;
  }[];
}

export interface DonationPopupConfig {
  enabled: boolean;
  headline: string;
  badge: string;
  appealEnglish: string;
  appealUrdu: string;
  backgroundImage: string;
  showLiveTime: boolean;
  autoPopupSeconds: number;
}

export interface BankConfig {
  bankName: string;
  accountTitle: string;
  iban: string;
  accountNo: string;
  branchName: string;
  branchCode: string;
  city: string;
  currency: string;
  taxStatus: string;
  appealUrdu: string;
  appealEnglish: string;
  easypaisaNo?: string;
  jazzcashNo?: string;
}

export interface PhotoFrameItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  dateAdded?: string;
}

export interface CampusConfig {
  facilities: GalleryItem[];
  photoFrames: PhotoFrameItem[];
}

export interface ContactConfig {
  address: string;
  locationDescription: string;
  contactNumbers: string[];
  emergencyPhone: string;
  helpline: string;
  whatsapp: string;
  email: string;
  opdHours: string;
  emergencyHours: string;
  googleMapsLink: string;
  mapEmbedUrl: string;
  footerDescription: string;
  copyrightText: string;
}

export interface AISettingsConfig {
  enabled: boolean;
  assistantName: string;
  welcomePrayerMessage: string;
  welcomeUrduMessage: string;
  tone: 'compassionate' | 'professional' | 'concise' | 'detailed';
  enableVoiceInput: boolean;
  enableVoiceOutput: boolean;
  enableWebSearch: boolean;
  enableAppointmentBooking: boolean;
  customSystemInstructions: string;
  suggestedQuestions: string[];
}

export interface HospitalContent {
  header: HeaderConfig;
  hero: HeroConfig;
  marquee: MarqueeItem[];
  quickStats: QuickStatItem[];
  founder: FounderConfig;
  mission: MissionConfig;
  departments: Department[];
  doctors: Doctor[];
  donation: {
    banner: DonationPopupConfig;
    bank: BankConfig;
    causes: DonationCause[];
  };
  campus: CampusConfig;
  contact: ContactConfig;
  aiSettings?: AISettingsConfig;
  logoFavicon?: LogoFaviconConfig;
  seo?: SEOConfig;
  theme?: ThemeConfig;
  pagesSections?: PagesSectionsConfig;
  videos?: HospitalVideoItem[];
  auditLogs?: AuditLogEntry[];
  updatedAt?: number;
  revision?: number;
}

export interface LogoFaviconConfig {
  logoUrl: string;
  faviconUrl: string;
  emblemUrl: string;
  logoHeight: number;
  altText: string;
  customBrandUrdu: string;
  showEmblemOnMobile: boolean;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  author: string;
  robots: string;
  googleSiteVerification: string;
  jsonLdSchemaEnabled: boolean;
  hospitalType: string;
  priceRange: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headingFont: 'Outfit' | 'Plus Jakarta Sans' | 'Playfair Display' | 'Inter';
  bodyFont: 'Plus Jakarta Sans' | 'Inter' | 'System UI';
  fontUrdu: 'Amiri' | 'Noto Nastaliq Urdu' | 'Jameel Noori Nastaleeq';
  borderRadius: 'rounded-xl' | 'rounded-2xl' | 'rounded-lg' | 'rounded-3xl';
  darkNavMode: boolean;
}

export interface SectionToggle {
  enabled: boolean;
  title?: string;
  urduTitle?: string;
  subtitle?: string;
  badge?: string;
}

export interface PagesSectionsConfig {
  topBar: SectionToggle;
  heroSlider: SectionToggle;
  marquee: SectionToggle;
  quickStats: SectionToggle;
  founderMemorial: SectionToggle;
  memorialInfiniteScroll: SectionToggle;
  departments: SectionToggle;
  deptDoctorsBridge: SectionToggle;
  specialistDoctors: SectionToggle;
  donationPoster: SectionToggle;
  campusGallery: SectionToggle;
  videoTours: SectionToggle;
  routeNavigator: SectionToggle;
  contactSection: SectionToggle;
  footer: SectionToggle;
  donationPopupBanner: SectionToggle;
  aiAgent: SectionToggle;
}

export interface HospitalVideoItem {
  id: string;
  title: string;
  urduTitle?: string;
  category: string;
  youtubeId?: string;
  videoUrl?: string;
  posterUrl?: string;
  duration?: string;
  description: string;
  isFeatured: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: number;
  user: string;
  role: string;
  action: string;
  section: string;
  details?: string;
}

export interface AdminUserRecord {
  id: string;
  username: string;
  fullName: string;
  role: 'SuperAdmin' | 'ContentEditor' | 'MedicalRegistrar';
  lastLogin?: number;
  active: boolean;
}
