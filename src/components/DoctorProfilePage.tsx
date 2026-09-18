import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  Stethoscope, 
  Phone, 
  MessageCircle, 
  Share2, 
  MapPin, 
  ShieldCheck,
  Star,
  FileCheck,
  Building2,
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { Doctor, Department } from '../types';
import { HOSPITAL_INFO, DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { Doctor3DAvatar } from './Doctor3DAvatar';

interface DoctorProfilePageProps {
  doctor: Doctor;
  department?: Department;
  onBack: () => void;
  onNavigateDoctors?: () => void;
  onViewDepartment?: (departmentId: string) => void;
  onBookAppointment: (deptId: string, docId: string) => void;
  onOpenDonation?: () => void;
}

export const DoctorProfilePage: React.FC<DoctorProfilePageProps> = ({
  doctor,
  department,
  onBack,
  onNavigateDoctors,
  onViewDepartment,
  onBookAppointment,
  onOpenDonation,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${doctor.name} - ${doctor.designation}`,
        text: `Consult with ${doctor.name} (${doctor.specialty}) at Ali Welfare Trust Hospital, Qila Didar Singh.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Doctor profile link copied to clipboard!');
    }
  };

  const resolvedDept = department || DEPARTMENTS.find((d) => d.id === doctor.departmentId);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
      
      {/* Top Corporate Luxury Breadcrumb & Doctor Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#02131a] via-[#08323e] to-[#041d24] text-white border-b border-[#d5c7b2]/20 py-8 sm:py-12 md:py-14 shadow-xl">
        {/* Soft luxury beige radial glow accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d5c7b2]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#d5c7b2]">
              <button 
                onClick={onBack}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-teal-400/60" />
              {onNavigateDoctors && (
                <>
                  <button 
                    onClick={onNavigateDoctors}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Doctors Directory
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400/60" />
                </>
              )}
              <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">{doctor.name}</span>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/20"
                title="Share Doctor Profile Link"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Share Profile</span>
              </button>
            </div>
          </div>

          {/* Quick Doctor Title Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
                <Stethoscope className="w-3.5 h-3.5 text-amber-300" />
                <span>Verified Consultant Specialist</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {doctor.name}
              </h1>
              <p className="text-emerald-200 text-sm sm:text-base font-semibold mt-1">
                {doctor.designation} • <span className="text-[#d5c7b2]">{doctor.specialty}</span>
              </p>
            </div>

            {resolvedDept && onViewDepartment && (
              <button
                onClick={() => onViewDepartment(resolvedDept.id)}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-emerald-300" />
                <span>View {resolvedDept.name} Department →</span>
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Main Doctor Profile Content */}
      <main className="flex-1 site-container py-8 sm:py-12">
        
        {/* Top Profile Card: Portrait, Qualifications & OPD Timings */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/50 mb-10 relative overflow-hidden">
          
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Doctor Portrait & Status Pillar */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative group w-full max-w-[260px]">
                <div className="w-full aspect-square rounded-3xl overflow-hidden bg-slate-100 border-4 border-emerald-600/30 shadow-2xl relative flex items-center justify-center">
                  {doctor.imageUrl ? (
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Doctor3DAvatar avatarType={doctor.avatarType || 'general'} className="w-full h-full p-3" />
                  )}
                </div>

                {/* Status Indicator */}
                {doctor.isAvailableToday && (
                  <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                    <span>Available for OPD Today</span>
                  </div>
                )}
              </div>

              {/* Department Pill */}
              <div className="mt-6 w-full max-w-[260px]">
                {resolvedDept && onViewDepartment ? (
                  <button
                    onClick={() => onViewDepartment(resolvedDept.id)}
                    className="w-full py-2 px-3 rounded-2xl bg-[#fdfbf7] border border-[#e8dfd1] hover:border-teal-600/50 text-[#087f8c] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#087f8c]" />
                    <span>Dept: {resolvedDept.name}</span>
                  </button>
                ) : (
                  <div className="w-full py-2 px-3 rounded-2xl bg-teal-50 border border-teal-200/80 text-[#087f8c] text-xs font-bold flex items-center justify-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#087f8c]" />
                    <span>Dept: {doctor.departmentName}</span>
                  </div>
                )}
              </div>

              {/* Verified Trust Badge */}
              <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 w-full max-w-[260px] text-center">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hospital Verification</div>
                <div className="text-xs font-black text-emerald-800 flex items-center justify-center gap-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Licensed Specialist • Regd. #1142</span>
                </div>
              </div>

            </div>

            {/* Doctor Info & Primary Details */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                
                {/* Rating & Specialty Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white text-slate-950 border-2 border-slate-900 text-xs font-black flex items-center gap-1.5 shadow-xs">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span>5.0 RATED (VERIFIED)</span>
                  </span>

                  <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-white text-xs font-black shadow-xs border border-slate-800">
                    <span className="text-slate-300 font-bold uppercase tracking-wider text-[10px] mr-1.5">Specialization:</span>
                    <span className="text-white font-black">{doctor.specialty}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight mb-2">
                  {doctor.name}
                </h2>

                <p className="text-base sm:text-lg font-black text-[#087f8c] mb-1">
                  {doctor.designation}
                </p>

                <p className="text-xs sm:text-sm font-bold text-slate-900 mb-6">
                  <strong className="text-black font-black uppercase text-xs tracking-wider mr-1">Clinical Department:</strong> {doctor.departmentName}
                </p>

                {/* Qualifications & Experience Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 sm:p-5 rounded-2xl border-2 border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-black font-black uppercase tracking-wider">Qualifications & Certifications</div>
                      <div className="text-xs sm:text-sm font-black text-slate-950 mt-1 leading-snug">
                        {doctor.qualification || 'MBBS, FCPS / Post-Graduate Specialization'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 border border-amber-300">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-black font-black uppercase tracking-wider">Clinical Experience & Scope</div>
                      <div className="text-xs sm:text-sm font-black text-slate-950 mt-1 leading-snug">
                        {doctor.experience || 'Senior Consultant with High Clinical Precision'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consultation Schedule Block */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border-2 border-slate-200 mb-6 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Calendar className="w-4 h-4 text-[#087f8c] shrink-0" />
                    <span className="font-black text-black uppercase tracking-wider text-[11px] w-36 shrink-0">Consultation Days:</span>
                    <span className="font-black text-slate-950">{doctor.consultationDays}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-900 pt-2 border-t border-slate-200">
                    <Clock className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="font-black text-black uppercase tracking-wider text-[11px] w-36 shrink-0">OPD Timings:</span>
                    <span className="font-black font-mono text-slate-950">{doctor.timing}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-900 pt-2 border-t border-slate-200">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-black text-black uppercase tracking-wider text-[11px] w-36 shrink-0">Consultation Room:</span>
                    <span className="font-bold text-slate-950">Ali Welfare Trust Hospital, Qila Didar Singh, Gujranwala</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons: 3D Blood-Red for Booking + 3D Gold for WhatsApp / Share */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
                {/* 3D Blood-Red Primary Action Trigger */}
                <button
                  onClick={() => onBookAppointment(doctor.departmentId, doctor.id)}
                  className="btn-3d-red px-6 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
                  title={`Book OPD Token for ${doctor.name}`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book OPD Consultation Token</span>
                </button>

                {/* 3D Shiny Real Gold CTA */}
                <a
                  href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Ali%20Welfare%20Trust%20Hospital%2C%20I%20want%20to%20inquire%20about%20consultation%20with%20${encodeURIComponent(doctor.name)}%20(${encodeURIComponent(doctor.specialty)})`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-3d-gold px-5 py-3.5 rounded-xl font-black text-xs sm:text-sm text-[#3a1d04] flex items-center gap-2 cursor-pointer"
                  title="Inquire via WhatsApp Desk"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-800 fill-emerald-800" />
                  <span>WhatsApp Inquiries</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Doctor Biography & Clinical Expertise (Isolated, Non-overlapping) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Bio Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Professional Biography Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Stethoscope className="w-5 h-5 text-emerald-700" />
                <span>Professional Biography & Scope of Practice</span>
              </h3>
              
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p>
                  {doctor.profile}
                </p>
                <p>
                  {doctor.name} conducts consultations on <strong>{doctor.consultationDays}</strong> from <strong>{doctor.timing}</strong>. Every patient undergoes structured medical evaluation, diagnostic correlation, and customized therapeutic planning in compliance with international clinical standards.
                </p>
              </div>
            </div>

            {/* Specialized Clinical Procedures Card */}
            {doctor.specialties && doctor.specialties.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
                <h3 className="text-lg font-extrabold text-[#0f172a] mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Clinical Competencies & Specialized Procedures</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.specialties.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#fdfbf7] text-slate-800 text-xs sm:text-sm font-bold border border-[#e8dfd1] flex items-center gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Patient Testimonial & Consultation Process */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h3 className="text-lg font-extrabold text-[#0f172a] mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Patient Consultation Process & Token Issuance</span>
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
                  <p><strong>Online Booking / Reception Desk:</strong> Reserve your token online or register at the main hospital OPD counter upon arrival.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
                  <p><strong>Vitals & Pre-Check:</strong> Duty nursing staff record vital signs, blood pressure, temperature, and blood sugar.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</div>
                  <p><strong>Consultant Review:</strong> Direct one-on-one medical examination with {doctor.name}, including prescription and immediate lab/ultrasound coordination.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar (4 cols): Department, Welfare Counter & Quick Contacts */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Subsidized Care Assurance Box */}
            <div className="bg-gradient-to-br from-[#02131a] via-[#08323e] to-[#041d24] text-white rounded-3xl p-6 shadow-xl border border-teal-500/30">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Welfare Guarantee</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                Zakat & Welfare Aid Available
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed mb-4">
                Ali Welfare Trust Hospital ensures that patients unable to afford medical fees can consult {doctor.name} free of charge through our dedicated Welfare Desk.
              </p>
              
              <div className="p-3 rounded-xl bg-white/10 text-xs text-teal-200 flex items-center gap-2 mb-4 border border-white/10">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Helpline: {HOSPITAL_INFO.emergencyPhone}</span>
              </div>

              {onOpenDonation && (
                <button
                  onClick={onOpenDonation}
                  className="btn-3d-gold w-full py-2.5 rounded-xl font-black text-xs text-[#3a1d04] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  <span>Support Needy Patients</span>
                </button>
              )}
            </div>

            {/* Department Summary Card */}
            {resolvedDept && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Affiliated Department</div>
                <h4 className="text-base font-bold text-[#0f172a] mb-1">
                  {resolvedDept.name}
                </h4>
                <p className="text-xs font-semibold text-teal-700 mb-3 font-serif">
                  {resolvedDept.urduName}
                </p>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-4">
                  {resolvedDept.shortDesc}
                </p>

                {onViewDepartment && (
                  <button
                    onClick={() => onViewDepartment(resolvedDept.id)}
                    className="w-full py-2.5 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Department Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Quick Navigation to Other Faculty */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
              <h4 className="text-sm font-bold text-[#0f172a] mb-3 flex items-center justify-between">
                <span>Medical Specialists Directory</span>
                {onNavigateDoctors && (
                  <button 
                    onClick={onNavigateDoctors}
                    className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    View All 12 →
                  </button>
                )}
              </h4>

              <div className="space-y-2">
                {DOCTORS.filter(d => d.id !== doctor.id).slice(0, 4).map((otherDoc) => (
                  <a
                    key={otherDoc.id}
                    href={`/doctor/${otherDoc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState({}, '', `/doctor/${otherDoc.id}`);
                      window.dispatchEvent(new Event('popstate'));
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 flex items-center justify-between transition-colors group text-left block"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#0f172a] group-hover:text-emerald-800 truncate">
                        {otherDoc.name}
                      </div>
                      <div className="text-[10.5px] text-slate-500 truncate">
                        {otherDoc.specialty}
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Hospital Footer Note */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        Ali Welfare Trust Hospital • Chahal Kalan, Main Campus, Qila Didar Singh, Gujranwala • Regd. #1142
      </footer>

    </div>
  );
};
