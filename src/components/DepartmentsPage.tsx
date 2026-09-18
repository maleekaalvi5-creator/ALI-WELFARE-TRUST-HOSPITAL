import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Stethoscope, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Activity, 
  ChevronRight,
  Filter,
  UserCheck
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { Department } from '../types';
import { getDepartment3DSign } from './Department3DSign';

interface DepartmentsPageProps {
  onNavigateHome: () => void;
  onViewDepartmentDetail: (departmentId: string) => void;
  onViewDoctorProfile: (doctorId: string) => void;
  onBookDepartment: (departmentId: string) => void;
  onOpenDonation: () => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onNavigateHome,
  onViewDepartmentDetail,
  onViewDoctorProfile,
  onBookDepartment,
  onOpenDonation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Clinical Departments' },
    { id: 'diagnostics', label: 'Diagnostics & Blood Lab' },
    { id: 'critical', label: 'Dialysis & Emergency' },
    { id: 'maternal', label: 'Maternal & Pediatrics' },
    { id: 'specialist', label: 'Surgical & Specialists' },
  ];

  const filteredDepartments = useMemo(() => {
    return DEPARTMENTS.filter((dept) => {
      // Category filtering
      if (selectedCategory === 'diagnostics') {
        if (dept.id !== 'radiology' && dept.id !== 'pathology' && dept.id !== 'ultrasound-lab') return false;
      } else if (selectedCategory === 'critical') {
        if (dept.id !== 'dialysis' && dept.id !== 'emergency' && dept.id !== 'urology' && dept.id !== 'pharmacy') return false;
      } else if (selectedCategory === 'maternal') {
        if (dept.id !== 'gynecology' && dept.id !== 'pediatrics') return false;
      } else if (selectedCategory === 'specialist') {
        if (['radiology', 'pathology', 'ultrasound-lab', 'emergency', 'pharmacy', 'gynecology', 'pediatrics'].includes(dept.id)) {
          return false;
        }
      }

      // Search query filtering
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchName = dept.name.toLowerCase().includes(q);
      const matchUrdu = (dept.urduName || '').includes(q);
      const matchShort = dept.shortDesc.toLowerCase().includes(q);
      const matchFull = dept.fullDesc.toLowerCase().includes(q);
      const matchFeats = dept.features.some((f) => f.toLowerCase().includes(q));
      const matchHead = (dept.headDoctor || '').toLowerCase().includes(q);

      return matchName || matchUrdu || matchShort || matchFull || matchFeats || matchHead;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
      
      {/* Top Corporate Luxury Header Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#02131a] via-[#08323e] to-[#041d24] text-white border-b border-[#d5c7b2]/20 py-12 sm:py-16 md:py-20 shadow-xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d5c7b2]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#d5c7b2] mb-6">
            <button 
              onClick={onNavigateHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-teal-400/60" />
            <span className="text-white font-bold">Clinical Departments & Facilities</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-900/80 border border-teal-400/30 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>Modern Clinical Facilities & Specializations</span>
              </div>

              <div className="font-urdu text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-300 mb-2 leading-relaxed drop-shadow-sm">
                شعبہ جات و جدید طبی سہولیات
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Specialized Clinical Departments & Wards
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
                From emergency trauma stabilization and round-the-clock hemodialysis to advanced maternal-fetal suites, computerized diagnostic blood laboratories, and 4D Doppler sonology—explore each department’s isolated clinical scope, medical staff, and timings.
              </p>
            </div>

            {/* Quick Overview Card */}
            <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/20 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Operational Facilities</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  {DEPARTMENTS.length} Specialized Wings
                </span>
              </div>

              <div className="space-y-2.5 pt-3 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Emergency & Trauma:</span>
                  <span className="font-bold text-emerald-400">24/7/365 Non-Stop</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Diagnostic Blood Lab:</span>
                  <span className="font-bold text-emerald-400">24/7 Automated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Kidney Dialysis Unit:</span>
                  <span className="font-bold text-amber-300">German RO Hemodialysis</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Welfare Medicine:</span>
                  <span className="font-bold text-amber-300">Free / Subsidized</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Central Reception</span>
                </span>
                <span className="font-bold text-amber-300 font-mono">0336-4711100</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Area */}
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
                placeholder="Search clinical capabilities, diagnostics, procedures, or departments..."
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

            <div className="text-xs font-bold text-slate-500 shrink-0">
              Showing <strong className="text-emerald-700">{filteredDepartments.length}</strong> of {DEPARTMENTS.length} Departments
            </div>

          </div>

          {/* Filter Categories */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Wing:</span>
            </span>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#087f8c] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 2xl:gap-8 3xl:gap-10">
          {filteredDepartments.map((dept) => {
            // Find doctors assigned to this department
            const assignedDoctors = DOCTORS.filter((d) => d.departmentId === dept.id);

            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Department Header with 3D Sign & Status Badges */}
                <div className="p-6 pb-4 bg-gradient-to-br from-slate-50 via-white to-[#fbf9f5] border-b border-slate-100 flex items-start gap-4">
                  
                  {/* 3D Sign Icon */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-teal-50/50 border border-teal-200/80 p-2.5 flex items-center justify-center shadow-md shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={getDepartment3DSign(dept.id, dept.iconUrl)}
                      alt={`${dept.name} 3D Sign`}
                      className="w-full h-full object-contain drop-shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      {dept.emergencyAvailable ? (
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10.5px] font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                          <span>24/7 Priority</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10.5px] font-bold">
                          OPD Schedule
                        </span>
                      )}

                      {dept.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold truncate">
                          {dept.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-black text-[#0f172a] group-hover:text-[#087f8c] transition-colors leading-snug">
                      {dept.name}
                    </h2>

                    <p className="text-xs font-bold text-emerald-700 font-serif mt-0.5">
                      {dept.urduName}
                    </p>
                  </div>

                </div>

                {/* Body: Description, Timings, Features & Medical Team */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {dept.shortDesc}
                  </p>

                  {/* Timing Strip */}
                  <div className="bg-[#fdfbf7] p-2.5 rounded-xl border border-[#e8dfd1] text-xs flex items-center justify-between text-slate-700">
                    <span className="font-bold flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Timings:</span>
                    </span>
                    <span className="font-semibold text-slate-900">{dept.timings}</span>
                  </div>

                  {/* Key Capabilities List */}
                  <div className="space-y-1.5">
                    {dept.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Assigned Medical Specialists (Strict Data Isolation) */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Stethoscope className="w-3 h-3 text-emerald-600" />
                      <span>Medical Specialists in this Wing:</span>
                    </div>

                    {assignedDoctors.length > 0 ? (
                      <div className="space-y-2">
                        {assignedDoctors.map((doc) => (
                          <div
                            key={doc.id}
                            className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[#0f172a] truncate">{doc.name}</div>
                              <div className="text-[10.5px] text-emerald-700 truncate">{doc.specialty} • {doc.timing}</div>
                            </div>

                            <button
                              onClick={() => onViewDoctorProfile(doc.id)}
                              className="px-2 py-1 rounded-lg bg-white hover:bg-emerald-50 text-emerald-800 text-[10.5px] font-bold border border-slate-200 shrink-0 ml-2 cursor-pointer transition-colors"
                            >
                              Profile →
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-600">
                        <div className="font-bold text-emerald-900">{dept.headDoctor}</div>
                        <div className="text-[11px] text-slate-500">Supervised 24/7 by Duty Medical Officers & Certified Technicians</div>
                      </div>
                    )}
                  </div>

                  {/* Actions: 3D Gold (Explore Page) & 3D Red (Book Token) */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    {/* 3D Blood-Red Primary Action Trigger */}
                    <button
                      onClick={() => onBookDepartment(dept.id)}
                      className="btn-3d-red py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      title={`Book Consultation in ${dept.name}`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book OPD</span>
                    </button>

                    {/* 3D Shiny Real Gold CTA */}
                    <button
                      onClick={() => onViewDepartmentDetail(dept.id)}
                      className="btn-3d-gold py-2.5 px-3 rounded-xl font-black text-xs text-[#3a1d04] flex items-center justify-center gap-1.5 cursor-pointer"
                      title={`View full dedicated page for ${dept.name}`}
                    >
                      <span>Explore Wing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

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
                <h4 className="text-lg font-bold text-white">Need Dialysis, Cataract Surgery, or Emergency Aid?</h4>
                <p className="text-xs sm:text-sm text-teal-100/80">
                  Our Welfare Board evaluates deserving patients daily for 100% free and subsidized treatment across all clinical wings.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenDonation}
              className="btn-3d-gold px-6 py-3 rounded-xl font-black text-xs sm:text-sm text-[#3a1d04] flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Donate for Patient Care</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
