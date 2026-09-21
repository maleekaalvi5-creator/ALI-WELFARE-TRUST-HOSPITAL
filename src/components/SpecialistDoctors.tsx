import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle, 
  Stethoscope, 
  Sparkles, 
  PhoneCall, 
  Star, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { Doctor } from '../types';
import { Doctor3DAvatar } from './Doctor3DAvatar';
import { Interactive3DCard } from './Interactive3DCard';
import { Scroll3DReveal } from './Scroll3DReveal';

interface SpecialistDoctorsProps {
  onBookDoctor: (departmentId: string, doctorId: string) => void;
  onViewDoctorProfile?: (doctorId: string) => void;
  onViewDoctorsDirectory?: () => void;
}

export const SpecialistDoctors: React.FC<SpecialistDoctorsProps> = ({ 
  onBookDoctor,
  onViewDoctorProfile,
  onViewDoctorsDirectory,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');

  const filteredDoctors = selectedDeptId === 'all'
    ? DOCTORS
    : DOCTORS.filter((d) => d.departmentId === selectedDeptId);

  return (
    <section id="doctors" className="py-8 sm:py-12 bg-[#f8fafc] relative">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center mb-6 sm:mb-8 flex flex-col items-center">
          {/* 1. Category Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-white text-xs font-black uppercase tracking-wider mb-2.5 shadow-xs">
            <Stethoscope className="w-3.5 h-3.5 text-teal-300 shrink-0" />
            <span>Official Medical Faculty (12 Specialists)</span>
          </div>

          {/* 2. Main English Heading */}
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-[1.2]">
            Distinguished Medical Specialists <br className="hidden sm:inline" />
            <span className="text-[#087f8c]">Devoted to Patient Recovery</span>
          </h2>

          {/* 3. Urdu Subheading */}
          <div 
            dir="rtl" 
            className="font-urdu text-xl sm:text-2xl lg:text-[26px] font-black text-black mt-2 sm:mt-2.5 mb-2 leading-relaxed tracking-normal flex items-center justify-center gap-2 text-center"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#087f8c] shrink-0" />
            <span>ماہر کنسلٹنٹ ڈاکٹرز اور سرجنز برائے ان ڈور و آؤٹ ڈور علاج</span>
          </div>

          {/* 4. Description strictly placed under Heading & Subheading */}
          <p className="text-center text-sm sm:text-base text-slate-900 font-semibold leading-relaxed max-w-2xl mx-auto">
            Highly experienced consultants providing specialized inpatient and outpatient care with verified clinical schedules at Ali Welfare Trust Hospital, Qila Didar Singh.
          </p>

          {/* 5. Direct Directory Action CTA on the same flow */}
          {onViewDoctorsDirectory && (
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onViewDoctorsDirectory}
                className="btn-3d-gold px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-[#3a1d04] whitespace-nowrap shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Full Doctors Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-700 font-bold">
                Detailed profiles, timings & consultation fees
              </span>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center sm:justify-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar">
          <button
            onClick={() => setSelectedDeptId('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer border-2 ${
              selectedDeptId === 'all'
                ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                : 'bg-white text-slate-900 hover:bg-slate-100 border-slate-300'
            }`}
          >
            All Specialists ({DOCTORS.length})
          </button>

          {DEPARTMENTS.filter(dept => DOCTORS.some(d => d.departmentId === dept.id)).map((dept) => {
            const count = DOCTORS.filter((d) => d.departmentId === dept.id).length;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer border-2 ${
                  selectedDeptId === dept.id
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                    : 'bg-white text-slate-900 hover:bg-slate-100 border-slate-300'
                }`}
              >
                {dept.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Doctors Grid */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 2xl:gap-8 3xl:gap-10"
        >
          {filteredDoctors.map((doc) => (
            <motion.div
              key={doc.id}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
              }}
              className="h-full"
            >
              <Interactive3DCard
                tiltMax={8}
                scaleHover={1.02}
                glowColor="rgba(8, 127, 140, 0.22)"
                className="h-full"
              >
                <div
                  className="h-full bg-white rounded-3xl p-6 border-2 border-slate-300/80 hover:border-[#087f8c] shadow-sm hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group relative"
                >
                <div>
                  {/* Doctor Portrait Photo */}
                  <div className="relative mb-5 flex justify-center">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-800/20 shadow-md group-hover:scale-105 transition-transform duration-300 relative flex items-center justify-center">
                      {doc.imageUrl ? (
                        <img
                          src={doc.imageUrl}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Doctor3DAvatar avatarType={doc.avatarType || 'general'} className="w-full h-full" />
                      )}
                    </div>

                    {/* Rating Badge on Card Image */}
                    <div className="absolute -bottom-2.5 bg-white text-slate-950 border-2 border-slate-900 px-3 py-0.5 rounded-full text-[11px] font-black shadow-xs flex items-center gap-1.5">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="tracking-tight">5.0 RATED</span>
                    </div>
                  </div>

                  {/* Doctor Identity */}
                  <div className="text-center mb-3">
                    <h3 className="text-xl font-black text-black group-hover:text-[#087f8c] transition-colors tracking-tight">
                      {doc.name}
                    </h3>

                    {/* Specialization Field Subheading Badge */}
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 text-white text-xs font-black tracking-tight shadow-xs border border-slate-900">
                      <Stethoscope className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                      <span className="text-slate-300 font-bold uppercase tracking-wider text-[10px]">Specialization:</span>
                      <span className="text-white font-black">{doc.specialty}</span>
                    </div>

                    {/* Verified Status Banner */}
                    <div className="flex items-center justify-center gap-1.5 mt-2.5 text-xs">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-black font-black">Rated 5.0 out of 5</span>
                      <span className="text-emerald-700 font-black flex items-center gap-0.5 ml-1 text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Department & Qualifications Box */}
                    <div className="mt-3.5 text-left bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 text-xs space-y-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-black font-black uppercase tracking-wider text-[11px] shrink-0">
                          Department:
                        </span>
                        <span className="text-slate-950 font-black text-right">
                          {doc.departmentName}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-2 pt-2 border-t border-slate-200">
                        <span className="text-black font-black uppercase tracking-wider text-[11px] shrink-0">
                          Qualifications:
                        </span>
                        <span className="text-[#087f8c] font-black text-right text-xs bg-teal-50 px-2 py-0.5 rounded-md border border-teal-300/80">
                          {doc.qualification || 'Consultant Specialist'}
                        </span>
                      </div>
                    </div>

                    {/* Professional Clinical Profile & CV Summary */}
                    {doc.profile && (
                      <div className="mt-3 text-left bg-slate-50/80 p-3 rounded-2xl border-2 border-slate-200">
                        <div className="text-[11px] font-black text-black uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#087f8c]" />
                          <span>Clinical Expertise:</span>
                        </div>
                        <p className="text-xs text-slate-950 font-semibold leading-relaxed line-clamp-3">
                          {doc.profile}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Timing & Availability Schedule Box */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 mb-4 border-2 border-slate-200 text-xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-black font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-[#087f8c] shrink-0" />
                        <span>Days:</span>
                      </span>
                      <span className="text-slate-950 font-black text-right">
                        {doc.consultationDays || doc.days.join(', ')}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2 pt-2 border-t border-slate-200">
                      <span className="text-black font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Clinic Timing:</span>
                      </span>
                      <span className="text-slate-950 font-black text-right">
                        {doc.timing}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions: Book Appointment & View Full Profile */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewDoctorProfile?.(doc.id)}
                    className="btn-3d-gold w-full py-2.5 rounded-xl font-black text-[#3a1d04] text-xs flex items-center justify-center gap-1 cursor-pointer"
                    title={`View dedicated isolated subpage for ${doc.name}`}
                  >
                    <Award className="w-3.5 h-3.5 text-amber-800" />
                    <span>View Profile</span>
                  </button>

                  <button
                    onClick={() => onBookDoctor(doc.departmentId, doc.id)}
                    className="btn-3d-red w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Token</span>
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="mt-2 text-[10px] text-slate-500 italic text-center">
                  Note: Images are for representation only. Actual doctor on duty may vary as per roster.
                </p>
              </div>
            </Interactive3DCard>
          </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

