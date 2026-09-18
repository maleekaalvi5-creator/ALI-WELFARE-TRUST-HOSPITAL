import React from 'react';
import { 
  Stethoscope, 
  Building2, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Activity,
  HeartPulse
} from 'lucide-react';

interface BridgePair {
  deptId: string;
  deptName: string;
  deptUrdu: string;
  doctorName: string;
  designation: string;
  availability: string;
  statusBadge: string;
  statusColor: string;
}

interface DeptDoctorsBridgeScrollProps {
  onSelectDoctor?: (doctorId: string) => void;
  onSelectDepartment?: (departmentId: string) => void;
}

export const DeptDoctorsBridgeScroll: React.FC<DeptDoctorsBridgeScrollProps> = ({
  onSelectDoctor,
  onSelectDepartment,
}) => {
  const bridgePairs: BridgePair[] = [
    {
      deptId: 'dialysis',
      deptName: 'Dialysis & Nephrology',
      deptUrdu: 'گردہ و ڈائیلاسز',
      doctorName: 'Nephrology Clinical Team',
      designation: 'Fresenius Dialyzer Care',
      availability: '24/7 Active Shifts',
      statusBadge: '100% Free Zakat',
      statusColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
    },
    {
      deptId: 'gynecology',
      deptName: 'Gynecology & Obstetrics',
      deptUrdu: 'امراضِ نسواں',
      doctorName: 'Dr. Eman Salman',
      designation: 'FCPS Consultant Gynaecologist',
      availability: 'Sat & Mon 08:00 AM',
      statusBadge: 'OPD Verified',
      statusColor: 'bg-teal-950 text-teal-300 border-teal-500/40',
    },
    {
      deptId: 'surgery',
      deptName: 'General & Laparoscopic Surgery',
      deptUrdu: 'جنرل سرجری',
      doctorName: 'Dr. Ali Raza',
      designation: 'Consultant Laparoscopic Surgeon',
      availability: 'Mon - Sat 02:00 PM',
      statusBadge: 'Operation Theater',
      statusColor: 'bg-amber-950 text-amber-300 border-amber-500/40',
    },
    {
      deptId: 'pulmonology',
      deptName: 'Pulmonology & Chest Clinic',
      deptUrdu: 'امراضِ سینہ و سانس',
      doctorName: 'Dr. Jamshed Ahmed Cheema',
      designation: 'Senior Chest Specialist',
      availability: 'Sundays 08:30 AM',
      statusBadge: 'Specialist Clinic',
      statusColor: 'bg-blue-950 text-blue-300 border-blue-500/40',
    },
    {
      deptId: 'urology',
      deptName: 'Urology & Stone Center',
      deptUrdu: 'شعبہ یورالوجی',
      doctorName: 'Consultant Urologist',
      designation: 'Renal Calculi & Prostate Care',
      availability: 'Mon, Wed, Fri 02:00 PM',
      statusBadge: 'Active Clinic',
      statusColor: 'bg-cyan-950 text-cyan-300 border-cyan-500/40',
    },
    {
      deptId: 'eye',
      deptName: 'Ophthalmology & Phaco Suite',
      deptUrdu: 'شعبہ امراض چشم',
      doctorName: 'Ophthalmic Surgery Team',
      designation: 'Stitchless Cataract Laser',
      availability: 'Free Eye Camps & OPD',
      statusBadge: 'Sight Restoration',
      statusColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
    },
    {
      deptId: 'orthopedics',
      deptName: 'Orthopedic & Joint Care',
      deptUrdu: 'ہڈی و جوڑ',
      doctorName: 'Dr. Usama Saeed',
      designation: 'Orthopedic & Family Medicine',
      availability: 'Mon - Sat 09:30 AM',
      statusBadge: 'Joint & Trauma',
      statusColor: 'bg-amber-950 text-amber-300 border-amber-500/40',
    },
    {
      deptId: 'physiotherapy',
      deptName: 'Physical Therapy & Rehab',
      deptUrdu: 'فزیوتھراپی سنٹر',
      doctorName: 'Dr. Amara Anwar',
      designation: 'Consultant Physiotherapist',
      availability: 'Daily 03:00 PM - 06:00 PM',
      statusBadge: 'Rehab Unit',
      statusColor: 'bg-purple-950 text-purple-300 border-purple-500/40',
    },
    {
      deptId: 'neurosurgery',
      deptName: 'Neurosurgery & Spine Clinic',
      deptUrdu: 'نیورو سرجری و مہرہ',
      doctorName: 'Dr. Syed Jawad Haider',
      designation: 'Consultant Neurosurgeon',
      availability: 'Saturdays 10:00 AM',
      statusBadge: 'Tertiary Care',
      statusColor: 'bg-rose-950 text-rose-300 border-rose-500/40',
    },
    {
      deptId: 'ultrasound-lab',
      deptName: '24/7 Ultrasound & Pathology Lab',
      deptUrdu: 'تشخیصی الٹراساؤنڈ و لیب',
      doctorName: 'Senior Sonology & Pathologists',
      designation: 'Color Doppler & Automated Blood Tests',
      availability: '24 Hours Non-Stop',
      statusBadge: 'Immediate Results',
      statusColor: 'bg-teal-950 text-teal-300 border-teal-500/40',
    },
    {
      deptId: 'emergency',
      deptName: '24/7 Resuscitation & Trauma',
      deptUrdu: 'ایمرجنسی و ٹراما ۲۴ گھنٹے',
      doctorName: 'Emergency Medical Officers',
      designation: 'Central Oxygen & Critical Triage',
      availability: 'Always Open 365 Days',
      statusBadge: 'Critical Care',
      statusColor: 'bg-rose-950 text-rose-300 border-rose-500/40',
    },
  ];

  // Duplicate for continuous, gap-free infinite scrolling
  const marqueeItems = [...bridgePairs, ...bridgePairs];

  return (
    <div 
      className="bg-gradient-to-r from-[#041a21] via-[#092f3a] to-[#041a21] text-white py-2.5 sm:py-3 overflow-hidden border-y border-teal-500/30 relative select-none z-20 shadow-[0_8px_20px_-6px_rgba(9,47,58,0.4)]"
      role="region"
      aria-label="Department and Doctor Clinical Roster Marquee"
    >
      {/* Edge Gradient Fades for Smooth Infinite Blending */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#041a21] via-[#041a21]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#041a21] via-[#041a21]/80 to-transparent z-20 pointer-events-none" />

      {/* Center Track with Left Stationary Pill for Desktop */}
      <div className="flex items-center">
        
        {/* Left Indicator Tag: Seamlessly identifies the link between Departments and Faculty */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-1 bg-[#021318]/90 border-r border-teal-500/30 text-teal-200 text-xs font-bold shrink-0 z-30 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
          </span>
          <span className="uppercase tracking-wider text-[11px] font-black text-amber-300">
            Clinical Bridge
          </span>
          <span className="text-slate-400 text-[11px]">• Wing to Specialist Roster</span>
        </div>

        {/* Continuous Infinite Marquee Strip */}
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 will-change-transform">
          {marqueeItems.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium whitespace-nowrap text-slate-200 hover:text-white transition-colors py-0.5 group cursor-default"
            >
              {/* Department Wing Pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white shadow-xs group-hover:border-teal-400/50 transition-colors">
                <Building2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span className="font-bold text-xs text-white">{item.deptName}</span>
                <span className="text-[10px] text-teal-200/80 font-urdu hidden sm:inline" dir="rtl">
                  ({item.deptUrdu})
                </span>
              </div>

              {/* Connecting Arrow */}
              <div className="flex items-center justify-center text-amber-400 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 opacity-90" />
              </div>

              {/* Attending Doctor / Specialist Details */}
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <Stethoscope className="w-3 h-3" />
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide">
                  {item.doctorName}
                </span>
                <span className="text-xs text-slate-300 hidden md:inline">
                  • {item.designation}
                </span>
              </div>

              {/* Status / Timing Badge */}
              <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold border shadow-xs ${item.statusColor}`}>
                {item.availability}
              </span>

              {/* Separator Dot */}
              <span className="text-teal-500/50 font-black ml-2 sm:ml-3 text-base select-none">
                ✦
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
