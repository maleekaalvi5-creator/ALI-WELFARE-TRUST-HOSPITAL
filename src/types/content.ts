import { Department, Doctor, LeadershipMember, DonationCause, GalleryItem } from '../types';

export interface HeaderConfig {
  logoUrl: string;
  logoPosition: 'left' | 'center';
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
  updatedAt?: number;
  revision?: number;
}
