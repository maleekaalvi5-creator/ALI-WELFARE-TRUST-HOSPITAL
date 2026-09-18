import React, { useState, useMemo } from 'react';
import { 
  Stethoscope, 
  Search, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, HOSPITAL_INFO } from '../data/hospitalData';
import { Doctor } from '../types';
import { Doctor3DAvatar } from './Doctor3DAvatar';

interface DoctorsPageProps {
  onNavigateHome: () => void;
  onViewDoctorProfile: (doctorId: string) => void;
  onViewDepartment: (departmentId: string) => void;
  onBookDoctor: (departmentId: string, doctorId: string) => void;
  onOpenDonation: () => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onNavigateHome,
  onViewDoctorProfile,
  onViewDepartment,
  onBookDoctor,
  onOpenDonation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);

  // Departments list for filter pills
  const filterDepartments = useMemo(() => {
    const deptMap = new Map<string, string>();
    DOCTORS.forEach((doc) => {
      if (!deptMap.has(doc.departmentId)) {
        deptMap.set(doc.departmentId, doc.departmentName);
      }
    });
    return Array.from(deptMap.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  // Filtered doctors based on search, department, and availability
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      if (selectedDeptFilter !== 'all' && doc.departmentId !== selectedDeptFilter) {
        return false;
      }
      if (onlyAvailableToday && !doc.isAvailableToday) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSpecialty = doc.specialty.toLowerCase().includes(q);
      const matchDept = doc.departmentName.toLowerCase().includes(q);
      const matchDays = (doc.consultationDays || '').toLowerCase().includes(q);
      const matchSpecs = doc.specialties?.some((s) => s.toLowerCase().includes(q)) ?? false;
      const matchBio = (doc.profile || '').toLowerCase().includes(q);

      return matchName || matchSpecialty || matchDept || matchDays || matchSpecs || matchBio;
    });
  }, [searchQuery, selectedDeptFilter, onlyAvailableToday]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
      
      {/* Top Corporate Luxury Breadcrumb & Header Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#02131a] via-[#08323e] to-[#041d24] text-white border-b border-[#d5c7b2]/20 py-12 sm:py-16 md:py-20 shadow-xl">
        {/* Soft luxury beige radial glow accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d5c7b2]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          
          {/* Breadcrumb Bar */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#d5c7b2] mb-6">
            <button 
              onClick={onNavigateHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-teal-400/60" />
            <span className="text-white font-bold">Medical Faculty & Doctors Directory</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-900/80 border border-teal-400/30 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                <Stethoscope className="w-4 h-4 text-amber-300" />
                <span>Verified Specialist Consultants (12 Independent Departments)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2">
                Distinguished Medical Specialists & Consultants
              </h1>

              <div 
                dir="rtl" 
                className="font-urdu text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-300 mb-4 leading-relaxed drop-shadow-sm"
              >
                علی ویلفیئر ٹرسٹ ہسپتال کے ماہر کنسلٹنٹ ڈاکٹرز
              </div>

              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
                Compassionate, accredited physicians and surgeons dedicated to ethical healthcare. Every doctor manages their verified consultation schedule, specialized diagnostic procedures, and personalized outpatient treatment at Ali Welfare Trust Hospital, Qila Didar Singh.
              </p>
            </div>

            {/* Quick Stats Pill Panel */}
            <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/20 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Registered Faculty</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  12 Specialists
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-amber-300">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Verified Credentials</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-emerald-400">★ 5.0</div>
                  <div className="text-[11px] text-slate-300 font-medium">Patient Satisfaction</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>OPD & Welfare Helpdesk</span>
                </span>
                <span className="font-bold text-amber-300 font-mono">0332-4711101</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Area: Search, Department Filters & Doctor Cards Grid */}
      <main className="flex-1 site-container py-10 sm:py-14">
        
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-md shadow-slate-200/40 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialty, condition, or consultation day..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-bold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailableToday}
                  onChange={(e) => setOnlyAvailableToday(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available Today Only</span>
                </span>
              </label>

              <span className="text-slate-300 hidden md:inline">|</span>

              <div className="text-xs font-bold text-slate-500">
                Showing <strong className="text-emerald-700">{filteredDoctors.length}</strong> of {DOCTORS.length} Specialists
              </div>
            </div>

          </div>

          {/* Department Filter Chips */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Specialty:</span>
            </span>

            <button
              onClick={() => setSelectedDeptFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDeptFilter === 'all'
                  ? 'bg-[#087f8c] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              All 12 Specialists
            </button>

            {filterDepartments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptFilter(dept.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDeptFilter === dept.id
                    ? 'bg-[#087f8c] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Profiles Grid (Exactly 12 Verified Subpages Available) */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto">
            <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Medical Specialist Found</h3>
            <p className="text-sm text-slate-500 mb-6">
              We couldn't find any doctor matching "{searchQuery}". Please try another search term or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDeptFilter('all');
                setOnlyAvailableToday(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#087f8c] text-white text-xs font-bold hover:bg-[#066570] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 2xl:gap-8 3xl:gap-10">
            {filteredDoctors.map((doc) => {
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Top Doctor Visual Header with Portrait & Availability Status */}
                  <div className="relative p-6 pb-4 bg-gradient-to-br from-slate-50 via-white to-[#fbf9f5] border-b border-slate-100 flex items-start gap-4">
                    
                    {/* Portrait Avatar Container */}
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-slate-100 border-2 border-teal-600/30 shadow-md flex items-center justify-center">
                        {doc.imageUrl ? (
                          <img
                            src={doc.imageUrl}
                            alt={doc.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <Doctor3DAvatar avatarType={doc.avatarType || 'general'} className="w-full h-full p-1" />
                        )}
                      </div>

                      {/* Online/OPD Badge */}
                      {doc.isAvailableToday && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center shadow-xs" title="Available for OPD Consultations Today">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        </div>
                      )}
                    </div>

                    {/* Basic Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-black flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>5.0</span>
                        </span>
                        
                        <button
                          onClick={() => onViewDepartment(doc.departmentId)}
                          className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[10.5px] font-bold truncate hover:bg-teal-100 transition-colors"
                          title={`View ${doc.departmentName} Department`}
                        >
                          {doc.departmentName}
                        </button>
                      </div>

                      <h2 className="text-base sm:text-lg font-black text-black group-hover:text-[#087f8c] transition-colors leading-snug truncate">
                        {doc.name}
                      </h2>

                      <p className="text-xs font-black text-[#087f8c] truncate mt-0.5">
                        {doc.designation}
                      </p>

                      <p className="text-[11.5px] text-slate-800 font-bold truncate mt-0.5">
                        <span className="text-black font-black uppercase text-[10px] tracking-wider">Specialty: </span>
                        <strong className="text-black font-black">{doc.specialty}</strong>
                      </p>
                    </div>

                  </div>

                  {/* Body Details: Schedule, Qualifications & Scopes */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    
                    {/* Clinical Schedule Box */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between text-black">
                        <span className="font-black flex items-center gap-1.5 text-black uppercase text-[10.5px] tracking-wider">
                          <Calendar className="w-3.5 h-3.5 text-[#087f8c]" />
                          <span>Days:</span>
                        </span>
                        <span className="font-black text-slate-950 text-right">{doc.consultationDays}</span>
                      </div>

                      <div className="flex items-center justify-between text-black pt-1.5 border-t border-slate-200">
                        <span className="font-black flex items-center gap-1.5 text-black uppercase text-[10.5px] tracking-wider">
                          <Clock className="w-3.5 h-3.5 text-rose-600" />
                          <span>OPD Timing:</span>
                        </span>
                        <span className="font-black font-mono text-xs text-slate-950 text-right">{doc.timing}</span>
                      </div>
                    </div>

                    {/* Qualifications & Experience */}
                    <div className="text-xs space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-start gap-1.5 text-slate-950">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1 font-bold text-xs text-slate-950">
                          <strong className="text-black font-black uppercase text-[10px] tracking-wider mr-1">Qual:</strong> {doc.qualification}
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5 text-slate-950">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1 font-bold text-xs text-slate-950">
                          <strong className="text-black font-black uppercase text-[10px] tracking-wider mr-1">Exp:</strong> {doc.experience}
                        </span>
                      </div>
                    </div>

                    {/* Specialties Pills */}
                    {doc.specialties && doc.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {doc.specialties.slice(0, 3).map((spec, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-slate-900 text-white text-[10.5px] font-bold border border-slate-800"
                          >
                            {spec}
                          </span>
                        ))}
                        {doc.specialties.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-lg bg-slate-100 text-slate-900 border border-slate-300 text-[10px] font-black">
                            +{doc.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons: 3D Blood-Red for Booking + 3D Real Gold for Dedicated Profile */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                      
                      <div className="grid grid-cols-2 gap-2">
                        {/* 3D Blood-Red Primary Action Trigger */}
                        <button
                          onClick={() => onBookDoctor(doc.departmentId, doc.id)}
                          className="btn-3d-red py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          title={`Book OPD Token for ${doc.name}`}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Token</span>
                        </button>

                        {/* 3D Shiny Real Gold CTA: View Dedicated Subpage */}
                        <button
                          onClick={() => onViewDoctorProfile(doc.id)}
                          className="btn-3d-gold py-2.5 px-3 rounded-xl font-black text-xs text-[#3a1d04] flex items-center justify-center gap-1.5 cursor-pointer"
                          title={`View dedicated isolated subpage for ${doc.name}`}
                        >
                          <span>Full Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Direct WhatsApp Consultation Query */}
                      <a
                        href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Ali%20Welfare%20Trust%20Hospital%2C%20I%20would%20like%20to%20consult%20with%20${encodeURIComponent(doc.name)}%20(${encodeURIComponent(doc.specialty)})`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200/80 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Direct WhatsApp OPD Desk</span>
                      </a>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Welfare Assurance Section */}
      <section className="bg-gradient-to-r from-[#031d24] via-[#08323e] to-[#092f3a] text-white py-12 border-t border-teal-500/20">
        <div className="site-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">100% Free & Subsidized Treatment for Needy Patients</h4>
                <p className="text-xs sm:text-sm text-teal-100/80">
                  Deserving individuals receive free doctor consultations, laboratory blood tests, and life-saving medications via Zakat and Sadqah funds.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenDonation}
              className="btn-3d-gold px-6 py-3 rounded-xl font-black text-xs sm:text-sm text-[#3a1d04] flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Support Patient Care (Donate)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
