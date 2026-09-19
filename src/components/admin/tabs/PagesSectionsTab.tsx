import React from 'react';
import { PagesSectionsConfig, SectionToggle } from '../../../types/content';
import { Layers, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

interface PagesSectionsTabProps {
  pagesSections?: PagesSectionsConfig;
  onChange: (updated: PagesSectionsConfig) => void;
}

const DEFAULT_SECTIONS: PagesSectionsConfig = {
  topBar: { enabled: true, title: "Emergency & Timings Bar" },
  heroSlider: { enabled: true, title: "Cinematic 3D Hero Showcase", badge: "Primary Entrance" },
  marquee: { enabled: true, title: "Live Medical Facilities Marquee" },
  quickStats: { enabled: true, title: "Hospital Metrics & Impact Stats" },
  founderMemorial: { enabled: true, title: "Founder Memorial & Vision", urduTitle: "بانیِ ادارہ — محترم نذر حسین علوی" },
  memorialInfiniteScroll: { enabled: true, title: "Memorial Continuous Tribute" },
  departments: { enabled: true, title: "Specialized Medical Departments", subtitle: "Equipped with modern clinical diagnostics" },
  deptDoctorsBridge: { enabled: true, title: "Clinical Bridge & Quality Pledge" },
  specialistDoctors: { enabled: true, title: "Consultant Doctors Directory", subtitle: "Senior medical faculty and specialist physicians" },
  donationPoster: { enabled: true, title: "Zakat & Sadqah Appeal Box" },
  campusGallery: { enabled: true, title: "Hospital Campus & Modern Facilities" },
  videoTours: { enabled: true, title: "Campus Video Tours & Documentary" },
  routeNavigator: { enabled: true, title: "Location & Patient Route Navigator" },
  contactSection: { enabled: true, title: "Contact Us & Emergency Help" },
  footer: { enabled: true, title: "Official Hospital Footer" },
  donationPopupBanner: { enabled: true, title: "2-Minute Recurring Donation Modal" },
  aiAgent: { enabled: true, title: "Ali Care 24/7 AI Health Consultant" }
};

interface SectionItemMeta {
  key: keyof PagesSectionsConfig;
  label: string;
  description: string;
  location: string;
}

const SECTIONS_LIST: SectionItemMeta[] = [
  { key: 'topBar', label: 'Top Utility Bar', description: 'Displays 24/7 emergency phone, OPD hours, and WhatsApp link above navigation.', location: 'Header Top' },
  { key: 'heroSlider', label: 'Cinematic 3D Hero Slider', description: 'Full showcase featuring hospital building, aerial view, labs, and interactive slide controls.', location: 'Top Screen' },
  { key: 'marquee', label: 'Infinite Scrolling Facilities Marquee', description: 'Smooth looping ticker showing key hospital accreditations and departments.', location: 'Below Hero' },
  { key: 'quickStats', label: 'Hospital Impact & Metric Cards', description: '3D tilt cards displaying patient count, free dialysis stats, and trust registration year.', location: 'Above Founder' },
  { key: 'founderMemorial', label: 'Founder Memorial & Board of Trustees', description: 'Tribute to Late Nazar Hussain Alvi, founding vision, and executive team leadership.', location: 'Founder Section' },
  { key: 'memorialInfiniteScroll', label: 'Memorial Quote Looping Ribbon', description: 'Decorative running ribbon with founder values and Islamic compassion quotes.', location: 'Below Founder' },
  { key: 'departments', label: 'Specialized Medical Departments Grid', description: 'Interactive cards with 3D signs for dialysis, eye surgery, radiology, laboratory, etc.', location: 'Departments Section' },
  { key: 'deptDoctorsBridge', label: 'Clinical Excellence Quality Bridge', description: 'Visual bridge highlighting patient-first healthcare standards.', location: 'Midway' },
  { key: 'specialistDoctors', label: 'Specialist Doctors & Faculty Directory', description: 'Doctor cards with degrees, OPD timings, consultant profiles, and direct appointment booking.', location: 'Doctors Section' },
  { key: 'donationPoster', label: 'Zakat & Sadqah Meezan Bank Poster', description: 'Bank transfer information, IBAN, account title, Easypaisa, and 100% donation guarantee.', location: 'Donation Section' },
  { key: 'campusGallery', label: 'Hospital Campus & Modern Facilities Gallery', description: 'Photo showcase of medical wings, patient beds, and campus facilities.', location: 'Gallery Section' },
  { key: 'videoTours', label: 'Video Tours & Documentary Section', description: 'Embedded video player for hospital documentary, dialysis tours, and patient stories.', location: 'Video Section' },
  { key: 'routeNavigator', label: 'Interactive Hospital Route Navigator', description: 'Driving directions, bus routes from Gujranwala, and geographical orientation.', location: 'Above Contact' },
  { key: 'contactSection', label: 'Contact Us, Emergency Hotlines & Location', description: 'Hospital physical address, direct Google Maps embed, phone directory, and inquiry form.', location: 'Contact Section' },
  { key: 'footer', label: 'Official Hospital Footer', description: 'Footer brand emblem, navigation links, registered charity tax status, and copyright text.', location: 'Page Bottom' },
  { key: 'donationPopupBanner', label: 'Recurring 2-Minute Donation Modal', description: 'Right-to-center sliding donation modal that prompts visitors every 2 minutes.', location: 'Global Overlay' },
  { key: 'aiAgent', label: 'Ali Care 24/7 AI Health Consultant', description: 'Floating interactive AI consultant capable of scheduling appointments and medical guidance.', location: 'Floating Widget' },
];

export const PagesSectionsTab: React.FC<PagesSectionsTabProps> = ({
  pagesSections = DEFAULT_SECTIONS,
  onChange
}) => {
  const current = { ...DEFAULT_SECTIONS, ...pagesSections };

  const updateSection = (key: keyof PagesSectionsConfig, updated: Partial<SectionToggle>) => {
    const existing = current[key] || { enabled: true };
    onChange({
      ...current,
      [key]: { ...existing, ...updated }
    });
  };

  const handleToggleAll = (enable: boolean) => {
    const updated: any = {};
    for (const item of SECTIONS_LIST) {
      updated[item.key] = { ...(current[item.key] || {}), enabled: enable };
    }
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-800">Pages & Section Visibility Manager</h2>
          <p className="text-xs text-slate-500">
            Show, hide, or customize titles and subtitles for every section on the public website. Changes apply immediately.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleToggleAll(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-teal-800 text-xs font-bold"
          >
            Show All Sections
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {SECTIONS_LIST.map((item) => {
          const config = current[item.key] || { enabled: true };
          const isEnabled = config.enabled !== false;

          return (
            <div
              key={item.key}
              className={`p-4 rounded-2xl border transition-all ${
                isEnabled
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-slate-100/70 border-slate-200/80 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`p-2 rounded-xl mt-0.5 ${
                    isEnabled ? 'bg-teal-50 text-teal-700' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.label}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        {item.location}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                {/* Enable / Disable Switch */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[11px] font-bold ${isEnabled ? 'text-teal-700' : 'text-slate-400'}`}>
                    {isEnabled ? 'Active (Visible)' : 'Hidden'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={(e) => updateSection(item.key, { enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>

              {/* Editable titles if section is enabled */}
              {isEnabled && (
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Custom Section Heading</label>
                    <input
                      type="text"
                      value={config.title || ''}
                      onChange={(e) => updateSection(item.key, { title: e.target.value })}
                      placeholder={item.label}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Urdu Heading (Optional)</label>
                    <input
                      type="text"
                      value={config.urduTitle || ''}
                      onChange={(e) => updateSection(item.key, { urduTitle: e.target.value })}
                      placeholder="اردو عنوان"
                      className="w-full px-2.5 py-1.5 text-xs font-urdu font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge or Subtitle</label>
                    <input
                      type="text"
                      value={config.subtitle || config.badge || ''}
                      onChange={(e) => updateSection(item.key, { subtitle: e.target.value })}
                      placeholder="e.g. 24/7 Service"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:border-teal-500"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
