import React from 'react';
import { 
  Building2, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Stethoscope, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Share2, 
  ChevronRight,
  Star,
  Award,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { Department, Doctor } from '../types';
import { DOCTORS, DEPARTMENTS, HOSPITAL_INFO } from '../data/hospitalData';
import { getDepartment3DSign } from './Department3DSign';
import { Doctor3DAvatar } from './Doctor3DAvatar';

interface DepartmentDetailPageProps {
  department: Department;
  onBack: () => void;
  onNavigateDepartments: () => void;
  onViewDoctorProfile: (doctorId: string) => void;
  onViewDepartment: (departmentId: string) => void;
  onBookAppointment: (departmentId: string, doctorId?: string) => void;
  onOpenDonation?: () => void;
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({
  department,
  onBack,
  onNavigateDepartments,
  onViewDoctorProfile,
  onViewDepartment,
  onBookAppointment,
  onOpenDonation,
}) => {
  // Strict Data Isolation: ONLY get doctors assigned to THIS specific department
  const assignedDoctors = DOCTORS.filter((d) => d.departmentId === department.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${department.name} - Ali Welfare Trust Hospital`,
        text: `Clinical details, diagnostic scope and specialist team for ${department.name} at Ali Welfare Trust Hospital, Qila Didar Singh.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Department page link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
      
      {/* Top Corporate Luxury Header Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#02131a] via-[#08323e] to-[#041d24] text-white border-b border-[#d5c7b2]/20 py-8 sm:py-12 md:py-16 shadow-xl">
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
              <button 
                onClick={onNavigateDepartments}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Departments Directory
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-teal-400/60" />
              <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">{department.name}</span>
            </nav>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/20"
              title="Share Department Link"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Share Wing</span>
            </button>
          </div>

          {/* Department Hero Title Block */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-t border-white/10 pt-6">
            
            {/* 3D Sign Emblem */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/95 p-3 flex items-center justify-center border-2 border-amber-300/40 shadow-2xl shrink-0">
              <img
                src={getDepartment3DSign(department.id, department.iconUrl)}
                alt={`${department.name} 3D Sign`}
                className="w-full h-full object-contain drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {department.emergencyAvailable ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40 text-xs font-extrabold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    <span>24/7 Emergency Wing</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/40 text-xs font-bold">
                    Specialist OPD Schedule
                  </span>
                )}

                {department.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold">
                    {department.badge}
                  </span>
                )}
              </div>

              <div className="font-urdu text-xl sm:text-2xl font-bold text-amber-300 mb-1 drop-shadow-xs">
                {department.urduName}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {department.name}
              </h1>

              <p className="text-teal-100 text-xs sm:text-sm font-medium mt-1">
                Timings: <span className="font-bold text-white">{department.timings}</span> • Incharge: <span className="font-bold text-[#d5c7b2]">{department.headDoctor}</span>
              </p>
            </div>

            {/* Quick Action Trigger */}
            <div className="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
              <button
                onClick={() => onBookAppointment(department.id)}
                className="btn-3d-red px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex-1 sm:flex-initial flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book OPD Token</span>
              </button>

              <a
                href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Ali%20Welfare%20Trust%20Hospital%2C%20I%20want%20to%20inquire%20about%20services%20in%20${encodeURIComponent(department.name)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-3d-gold px-4 py-2.5 rounded-xl font-black text-xs text-[#3a1d04] flex-1 sm:flex-initial flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#087f8c] fill-[#087f8c]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Main Subpage Content */}
      <main className="flex-1 site-container py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column (8 cols): Clinical Details, Features & Assigned Medical Team */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview & Clinical Scope Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-xl font-extrabold text-[#0f172a] mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Building2 className="w-5 h-5 text-[#087f8c]" />
                <span>Clinical Mandate & Departmental Scope</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                {department.fullDesc}
              </p>

              {/* Operational Timings & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#fdfbf7] p-4 rounded-2xl border border-[#e8dfd1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#087f8c] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Operational Hours</div>
                    <div className="text-xs sm:text-sm font-bold text-[#0f172a]">{department.timings}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Emergency Status</div>
                    <div className="text-xs sm:text-sm font-bold text-[#0f172a]">
                      {department.emergencyAvailable ? '24/7 Dedicated Emergency & Trauma Active' : 'Available During Scheduled OPD Hours'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialized Capabilities & Protocols Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <h3 className="text-lg font-extrabold text-[#0f172a] mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle className="w-5 h-5 text-[#087f8c]" />
                <span>Specialized Capabilities, Equipment & Procedures</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {department.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                  >
                    <CheckCircle className="w-4 h-4 text-[#087f8c] shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* STRICT DATA ISOLATION: Assigned Medical Specialists */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-[#0f172a] flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-[#087f8c]" />
                    <span>Dedicated Medical Faculty & Specialists</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Strictly assigned clinical consultants for {department.name} (Zero cross-contamination)
                  </p>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#087f8c] border border-teal-200 text-xs font-bold">
                  {assignedDoctors.length} Specialist{assignedDoctors.length === 1 ? '' : 's'}
                </span>
              </div>

              {assignedDoctors.length > 0 ? (
                <div className="space-y-6">
                  {assignedDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-5 sm:p-6 rounded-3xl bg-[#fdfbf7] border border-[#e8dfd1] hover:border-[#087f8c]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
                    >
                      <div className="flex items-start gap-4">
                        {/* Portrait */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#087f8c]/30 shadow-md shrink-0 flex items-center justify-center">
                          {doc.imageUrl ? (
                            <img
                              src={doc.imageUrl}
                              alt={doc.name}
                              className="w-full h-full object-cover object-top"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Doctor3DAvatar avatarType={doc.avatarType || 'general'} className="w-full h-full p-1" />
                          )}
                        </div>

                        {/* Details */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.2 rounded bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>5.0</span>
                            </span>
                            <span className="text-xs font-bold text-[#087f8c]">{doc.specialty}</span>
                          </div>

                          <h4 className="text-base sm:text-lg font-black text-[#0f172a]">{doc.name}</h4>
                          <p className="text-xs font-semibold text-slate-600 mb-2">{doc.designation}</p>

                          <div className="text-xs text-slate-700 space-y-1">
                            <div><strong>Days:</strong> {doc.consultationDays}</div>
                            <div><strong>Timing:</strong> <span className="font-mono">{doc.timing}</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Doctor Actions */}
                      <div className="flex sm:flex-col gap-2 w-full sm:w-44 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                        <button
                          onClick={() => onBookAppointment(department.id, doc.id)}
                          className="btn-3d-red py-2 px-3 rounded-xl font-bold text-xs flex-1 sm:flex-initial flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Token</span>
                        </button>

                        <button
                          onClick={() => onViewDoctorProfile(doc.id)}
                          className="btn-3d-gold py-2 px-3 rounded-xl font-black text-xs text-[#3a1d04] flex-1 sm:flex-initial flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Full Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-200 text-center">
                  <Stethoscope className="w-10 h-10 text-[#087f8c] mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-[#092f3a] mb-1">
                    Continuous Supervision by Senior Department Staff
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
                    {department.headDoctor} oversees this clinical wing alongside resident medical officers, emergency technologists, and nursing teams on round-the-clock shift rotations.
                  </p>

                  <button
                    onClick={() => onBookAppointment(department.id)}
                    className="btn-3d-red px-5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book OPD / Test Appointment</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar (4 cols): Hospital Welfare, Helpline & Other Departments */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Welfare Counter Support */}
            <div className="bg-gradient-to-br from-[#02131a] via-[#08323e] to-[#041d24] text-white rounded-3xl p-6 shadow-xl border border-teal-500/30">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Welfare Support</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Zakat & Sadqah Healthcare Aid
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed mb-4">
                Deserving patients requiring treatment, procedures, or medications in {department.name} are supported 100% free of charge through trust donations.
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
                  <span>Support {department.name} Patients</span>
                </button>
              )}
            </div>

            {/* Other Departments Navigation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
              <h4 className="text-sm font-bold text-[#0f172a] mb-3 flex items-center justify-between">
                <span>Explore Other Wings</span>
                <button 
                  onClick={onNavigateDepartments}
                  className="text-xs text-[#087f8c] font-bold hover:underline cursor-pointer"
                >
                  All {DEPARTMENTS.length} →
                </button>
              </h4>

              <div className="space-y-2">
                {DEPARTMENTS.filter(d => d.id !== department.id).slice(0, 6).map((otherDept) => (
                  <button
                    key={otherDept.id}
                    onClick={() => onViewDepartment(otherDept.id)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 flex items-center justify-between transition-colors group text-left cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#0f172a] group-hover:text-[#087f8c] truncate">
                        {otherDept.name}
                      </div>
                      <div className="text-[10.5px] text-slate-500 font-serif truncate">
                        {otherDept.urduName}
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#087f8c] shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        Ali Welfare Trust Hospital • Chahal Kalan, Main Campus, Qila Didar Singh, Gujranwala • Regd. #1142
      </footer>

    </div>
  );
};
