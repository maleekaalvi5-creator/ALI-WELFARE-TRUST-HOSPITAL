export interface Department {
  id: string;
  name: string;
  urduName: string;
  shortDesc: string;
  fullDesc: string;
  iconUrl: string;
  badge: string;
  features: string[];
  headDoctor: string;
  timings: string;
  emergencyAvailable: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  consultationDays: string;
  timing: string;
  rating: string;
  ratingText: string;
  profile: string;
  qualification?: string;
  experience?: string;
  days: string[];
  imageUrl: string;
  specialties: string[];
  isAvailableToday: boolean;
  avatarType?: 'female' | 'ent' | 'kidney' | 'ortho' | 'physio' | 'neuro' | 'general' | 'chest' | 'child' | 'eye' | 'gastro' | 'surgeon';
}

export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  imageUrl: string;
  isLate?: boolean;
  quote?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  isEmergency: boolean;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface DonationCause {
  id: string;
  title: string;
  urduTitle: string;
  description: string;
  suggestedAmount: number;
  impactNote: string;
  badge: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'exterior' | 'facilities' | 'wards' | 'campus';
  imageUrl: string;
  description: string;
}
