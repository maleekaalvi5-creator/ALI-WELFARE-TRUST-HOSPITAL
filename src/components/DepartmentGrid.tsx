import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Calendar, 
  Check, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Info, 
  ChevronRight, 
  Filter, 
  Sparkles 
} from 'lucide-react';
import { DEPARTMENTS } from '../data/hospitalData';
import { Department } from '../types';
import { getDepartment3DSign } from './Department3DSign';
import { Interactive3DCard } from './Interactive3DCard';
import { Scroll3DReveal } from './Scroll3DReveal';

interface DepartmentGridProps {
  onSelectDepartmentForBooking: (departmentId: string) => void;
  onViewDepartmentDetail?: (departmentId: string) => void;
  onViewDepartmentsDirectory?: () => void;
}

export const DepartmentGrid: React.FC<DepartmentGridProps> = ({
  onSelectDepartmentForBooking,
  onViewDepartmentDetail,
  onViewDepartmentsDirectory,
}) => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'general', label: 'General Physician & OPD' },
    { id: 'ultrasound', label: 'Ultrasound & Imaging' },
    { id: 'laboratory', label: 'Laboratory for Blood Tests' },
    { id: 'critical', label: 'Dialysis & Emergency' },
    { id: 'specialist', label: 'Specialist Care' },
  ];

  const filteredDepartments = DEPARTMENTS.filter((dept) => {
    if (activeCategory === 'general') return dept.id === 'medicine' || dept.id === 'orthopaedics';
    if (activeCategory === 'ultrasound') return dept.id === 'radiology';
    if (activeCategory === 'laboratory') return dept.id === 'pathology';
    if (activeCategory === 'critical') return dept.id === 'dialysis' || dept.id === 'emergency' || dept.id === 'pharmacy';
    if (activeCategory === 'specialist') return dept.id !== 'medicine' && dept.id !== 'radiology' && dept.id !== 'pathology';
    return true;
  });

  return (
    <section id="departments" className="py-8 sm:py-12 bg-[#f3fafb] relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="site-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/90 text-[#087f8c] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-[#087f8c] shrink-0" />
            <span>Specialized Clinical Services</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#092f3a] tracking-tight leading-[1.25]">
            Comprehensive Medical Departments <br className="hidden sm:inline" />
            <span className="text-[#087f8c]">Tailored for Complete Healing</span>
          </h2>

          <div 
            dir="rtl" 
            className="font-urdu text-xl sm:text-2xl lg:text-[26px] font-bold text-[#087f8c] mt-2 sm:mt-2.5 mb-1.5 leading-relaxed tracking-normal"
          >
            ہسپتال کے اہم شعبہ جات اور جدید طبی سہولیات
          </div>

          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Every department is staffed by qualified physicians, registered nurses, and equipped with precision medical technology under international sterilization standards.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#087f8c] text-white shadow-md shadow-teal-900/20'
                  : 'bg-white text-[#12343b] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Department Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 2xl:gap-8 3xl:gap-10"
        >
          {filteredDepartments.map((dept) => (
            <motion.div
              key={dept.id}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
              }}
              className="h-full"
            >
              <Interactive3DCard
                tiltMax={9}
                scaleHover={1.02}
                glowColor="rgba(8, 127, 140, 0.22)"
                className="h-full"
              >
                <div
                  className="h-full bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border border-slate-100 hover:border-teal-300 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                >
                {/* Top Accent Strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#087f8c] via-[#11a7a0] to-[#d7b56d] opacity-80 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Header row: 3D Sign, Badge, Urdu */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-teal-50/50 border border-teal-200/80 p-2 flex items-center justify-center group-hover:scale-105 group-hover:border-teal-400 group-hover:shadow-xl transition-all duration-300 shadow-[0_8px_16px_-2px_rgba(8,127,140,0.18),inset_0_1.5px_2px_rgba(255,255,255,1)] flex-shrink-0 relative overflow-hidden">
                      <img
                        src={getDepartment3DSign(dept.id, dept.iconUrl)}
                        alt={`${dept.name} 3D Sign`}
                        className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.22)] transition-transform duration-300 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[#092f3a] text-[11px] font-bold">
                        {dept.badge}
                      </span>
                      <p className="font-urdu text-sm text-[#087f8c] font-bold mt-1">
                        {dept.urduName}
                      </p>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-black text-[#092f3a] group-hover:text-[#087f8c] transition-colors mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-4">
                    {dept.shortDesc}
                  </p>

                  {/* Key Features List */}
                  <ul className="space-y-1.5 mb-5 pt-3 border-t border-slate-200">
                    {dept.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-900 font-bold">
                        <div className="w-4 h-4 rounded-full bg-teal-100 text-[#087f8c] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Actions & Timings */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-4 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-[#087f8c]" />
                      <span>{dept.timings}</span>
                    </div>
                    {dept.emergencyAvailable && (
                      <span className="text-rose-700 font-black text-[11px] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        24/7 Priority
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        if (onViewDepartmentDetail) {
                          onViewDepartmentDetail(dept.id);
                        } else {
                          setSelectedDept(dept);
                        }
                      }}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-[#087f8c] text-[#0f172a] hover:text-[#087f8c] text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer bg-white shadow-xs"
                      title={`View isolated subpage for ${dept.name}`}
                    >
                      <Info className="w-3.5 h-3.5 text-teal-700" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onSelectDepartmentForBooking(dept.id)}
                      className="btn-3d-red py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book OPD</span>
                    </button>
                  </div>
                </div>
              </div>
            </Interactive3DCard>
          </motion.div>
          ))}
        </motion.div>

        {/* Detailed Department Modal */}
        {selectedDept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
              
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-teal-50 border border-teal-200/80 p-2 flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden">
                    <img
                      src={getDepartment3DSign(selectedDept.id, selectedDept.iconUrl)}
                      alt={`${selectedDept.name} 3D Sign`}
                      className="w-full h-full object-contain drop-shadow-md"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#092f3a]">
                      {selectedDept.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#087f8c] font-serif">
                      {selectedDept.urduName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDept(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-[#12343b] leading-relaxed mb-5">
                {selectedDept.fullDesc}
              </p>

              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6b7f84] mb-3">
                  Specialized Capabilities & Equipment:
                </h4>
                <div className="space-y-2">
                  {selectedDept.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#092f3a] bg-slate-50 p-2.5 rounded-xl">
                      <Check className="w-4 h-4 text-[#087f8c] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-100 flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-[#6b7f84]">Supervising Head</p>
                  <p className="text-sm font-bold text-[#092f3a]">{selectedDept.headDoctor}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6b7f84]">Operational Hours</p>
                  <p className="text-sm font-bold text-[#087f8c]">{selectedDept.timings}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {onViewDepartmentDetail && (
                  <button
                    onClick={() => {
                      const id = selectedDept.id;
                      setSelectedDept(null);
                      onViewDepartmentDetail(id);
                    }}
                    className="btn-3d-gold px-4 py-2 rounded-xl text-xs font-black text-[#3a1d04] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Dedicated Wing Subpage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setSelectedDept(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const id = selectedDept.id;
                      setSelectedDept(null);
                      onSelectDepartmentForBooking(id);
                    }}
                    className="btn-3d-red px-5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book for this Department</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
