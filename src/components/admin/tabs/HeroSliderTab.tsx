import React, { useState } from 'react';
import { HeroConfig, HeroSlide, MarqueeItem } from '../../../types/content';
import { ImageUploadField } from '../ImageUploadField';
import { 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Image as ImageIcon, 
  Check, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  FolderOpen,
  Layers,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  X
} from 'lucide-react';

interface HeroSliderTabProps {
  hero: HeroConfig;
  marquee: MarqueeItem[];
  onHeroChange: (updated: HeroConfig) => void;
  onMarqueeChange: (updated: MarqueeItem[]) => void;
  token: string;
}

// Pre-loaded high-resolution hospital photography available in the project
const PRESET_HOSPITAL_PHOTOS = [
  {
    url: '/images/hospital-building.jpg',
    name: 'Main Hospital Building & Front Elevation',
    category: 'Architecture & Campus',
    defaultTitle: 'Main Medical Campus & Executive Hospital Complex',
    defaultUrdu: 'مرکزی عمارت، او پی ڈی اور تشخیصی شعبہ'
  },
  {
    url: '/images/dept-3d-dialysis.jpg',
    name: '16-Bed Hemodialysis & Renal Care Center',
    category: 'Renal Care & Dialysis',
    defaultTitle: '16-Bed Modern Hemodialysis & Renal Care Center',
    defaultUrdu: 'جدید ہیمو ڈائیلاسز سنٹر — تاحیات مفت علاج'
  },
  {
    url: '/images/hospital-interior-1.jpg',
    name: 'Automated Clinical Pathology & Diagnostic Lab',
    category: 'Diagnostics & Lab',
    defaultTitle: 'Automated Clinical Pathology & Diagnostic Laboratory',
    defaultUrdu: 'کمپیوٹرائزڈ پیتھالوجی لیب اور جدید الٹراساؤنڈ سنٹر'
  },
  {
    url: '/images/hospital-interior-2.jpg',
    name: 'Specialist Consultant Outpatient Chambers',
    category: 'Specialist OPD',
    defaultTitle: 'Specialist Consultant Outpatient Examination Chambers',
    defaultUrdu: 'ماہرینِ امراض کا او پی ڈی کلینک — ہمدردانہ معائنہ'
  },
  {
    url: '/images/hospital-interior-3.jpg',
    name: 'Inpatient Medical & Surgical Recovery Ward',
    category: 'Inpatient Ward',
    defaultTitle: 'General Medical & Surgical Inpatient Recovery Ward',
    defaultUrdu: 'مریضوں کا انڈور وارڈ اور آرام دہ بیڈز'
  },
  {
    url: '/images/dept-3d-emergency.jpg',
    name: '24/7 Emergency Triage & Acute Trauma Resuscitation',
    category: 'Emergency & Trauma',
    defaultTitle: '24/7 Emergency Triage & Acute Trauma Resuscitation Unit',
    defaultUrdu: 'ایمرجنسی و فوری طبی امداد کا شعبہ'
  },
  {
    url: '/images/hospital-aerial.jpg',
    name: 'Aerial View of Hospital Campus & Open Grounds',
    category: 'Aerial & Grounds',
    defaultTitle: 'Spacious Multi-Story Hospital Campus & Open Grounds',
    defaultUrdu: 'ہسپتال کی وسیع عمارت اور سرسبز احاطہ'
  },
  {
    url: '/images/dept-3d-eyecare.jpg',
    name: 'Eye Care & Phaco Cataract Surgery Wing',
    category: 'Surgical Wing',
    defaultTitle: 'Advanced Ophthalmology & Stitchless Eye Surgery',
    defaultUrdu: 'شعبہ امراضِ چشم اور جدید فیکو آپریشن تھیٹر'
  },
  {
    url: '/images/dept-3d-pharmacy.jpg',
    name: 'Hospital Pharmacy & Free Medicine Desk',
    category: 'Pharmacy',
    defaultTitle: '24/7 Hospital Pharmacy & Free Medicine Desk',
    defaultUrdu: '24 گھنٹے فارمیسی اور مستحق مریضوں کے لیے مفت ادویات'
  },
  {
    url: '/images/dept-3d-radiology.jpg',
    name: 'Digital Radiology & Color Doppler Imaging',
    category: 'Imaging & Ultrasound',
    defaultTitle: 'Digital X-Ray & 4D Color Doppler Sonology',
    defaultUrdu: 'ڈیجیٹل ایکسرے اور جدید کلر ڈوپلر الٹراساؤنڈ'
  },
  {
    url: '/images/gallery-1.jpg',
    name: 'Hospital Patient Care & Compassion Gallery 1',
    category: 'Patient Care',
    defaultTitle: 'Dignified Charitable Healthcare for Every Family',
    defaultUrdu: 'بلا تفریق اور باوقار علاج ہر مستحق خاندان کے لیے'
  },
  {
    url: '/images/gallery-2.jpg',
    name: 'Dialysis Machine Station & Clinical Treatment',
    category: 'Renal Care',
    defaultTitle: '100% Free Lifesaving Kidney Dialysis Sessions',
    defaultUrdu: 'مستحق گردوں کے مریضوں کے لیے تاحیات مفت علاج'
  },
  {
    url: '/images/gallery-3.jpg',
    name: 'Maternal Delivery & Pediatric Observation Unit',
    category: 'Maternal & Child Health',
    defaultTitle: 'Safe Maternal Care & Specialized Pediatric Wing',
    defaultUrdu: 'شعبہ اطفال و زچگی اور نوزائیدہ بچوں کی دیکھ بھال'
  }
];

export const HeroSliderTab: React.FC<HeroSliderTabProps> = ({
  hero,
  marquee,
  onHeroChange,
  onMarqueeChange,
  token
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [slidePendingDelete, setSlidePendingDelete] = useState<number | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Safety fallback: ensure slides array exists
  const slides = Array.isArray(hero.slides) && hero.slides.length > 0 ? hero.slides : [];

  const updateHeroField = <K extends keyof HeroConfig>(field: K, value: HeroConfig[K]) => {
    onHeroChange({ ...hero, [field]: value });
  };

  const handleUpdateSlide = (idx: number, updated: HeroSlide) => {
    const newSlides = [...slides];
    newSlides[idx] = updated;
    updateHeroField('slides', newSlides);
  };

  // Add a brand new slide
  const handleAddSlide = (presetPhoto?: typeof PRESET_HOSPITAL_PHOTOS[0]) => {
    const timestamp = Date.now();
    const newSlide: HeroSlide = {
      id: `slide-${timestamp}`,
      order: slides.length + 1,
      active: true,
      image: presetPhoto ? presetPhoto.url : "/images/hospital-building.jpg",
      heading: presetPhoto ? presetPhoto.defaultTitle : "Specialist Medical Facility & Modern Wing",
      title: presetPhoto ? presetPhoto.defaultTitle : "Specialist Medical Facility & Modern Wing",
      headline: presetPhoto ? presetPhoto.defaultTitle : "Specialist Medical Facility & Modern Wing",
      subheading: "Serving Humanity with Dignity & 100% Free Medical Care",
      subline: "Serving Humanity with Dignity & 100% Free Medical Care",
      highlight: "100% Free Medical Care",
      description: "Equipped with modern medical instruments, dedicated doctors, and state-of-the-art charitable healthcare facilities.",
      category: presetPhoto ? presetPhoto.category : "Hospital Facility",
      badge: presetPhoto ? presetPhoto.category : "Hospital Facility",
      urduTitle: presetPhoto ? presetPhoto.defaultUrdu : "جدید طبی سہولیات اور ہمدردانہ دیکھ بھال",
      urduTagline: presetPhoto ? presetPhoto.defaultUrdu : "جدید طبی سہولیات اور ہمدردانہ دیکھ بھال",
      location: "Ali Welfare Trust Hospital, Qila Didar Singh",
      tag: "24/7 Available",
      buttonText: "Book OPD Consultation",
      buttonUrl: "#booking"
    };

    const newSlides = [...slides, newSlide];
    updateHeroField('slides', newSlides);
    setActiveSlideIndex(newSlides.length - 1);
    setShowLibraryModal(false);
    setNoticeMessage({
      type: 'success',
      text: `New slide photo added! Click "Save Live Changes" to broadcast to the live website.`
    });
    setTimeout(() => setNoticeMessage(null), 5000);
  };

  // Trigger slide deletion (In-app modal, safe in iframe)
  const promptDeleteSlide = (idx: number) => {
    if (slides.length <= 1) {
      setNoticeMessage({
        type: 'error',
        text: 'Cannot delete: At least one slide photo must remain in the hero slider.'
      });
      setTimeout(() => setNoticeMessage(null), 5000);
      return;
    }
    setSlidePendingDelete(idx);
  };

  // Execute slide deletion
  const confirmDeleteSlide = () => {
    if (slidePendingDelete === null || !slides[slidePendingDelete]) return;
    const idx = slidePendingDelete;
    const slideToDelete = slides[idx];
    const slideName = slideToDelete.heading || slideToDelete.title || `Slide ${idx + 1}`;

    const newSlides = slides.filter((_, i) => i !== idx);
    // Renumber orders
    newSlides.forEach((s, i) => {
      s.order = i + 1;
    });

    updateHeroField('slides', newSlides);
    setActiveSlideIndex(Math.max(0, Math.min(idx, newSlides.length - 1)));
    setSlidePendingDelete(null);
    setNoticeMessage({
      type: 'success',
      text: `Slide #${idx + 1} ("${slideName}") was deleted. Click "Save Live Changes" to update the live site.`
    });
    setTimeout(() => setNoticeMessage(null), 6000);
  };

  // Move slide position (left / right in sequence)
  const handleMoveSlide = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;

    const newSlides = [...slides];
    const temp = newSlides[idx];
    newSlides[idx] = newSlides[targetIdx];
    newSlides[targetIdx] = temp;

    // Update order values
    newSlides.forEach((s, i) => {
      s.order = i + 1;
    });

    updateHeroField('slides', newSlides);
    setActiveSlideIndex(targetIdx);
  };

  // Toggle active / hidden status of a slide
  const handleToggleActive = (idx: number) => {
    const slide = slides[idx];
    const updated = { ...slide, active: slide.active === false ? true : false };
    handleUpdateSlide(idx, updated);
  };

  // Marquee item handlers
  const handleUpdateMarquee = (idx: number, field: keyof MarqueeItem, val: string) => {
    const updated = [...marquee];
    updated[idx] = { ...updated[idx], [field]: val };
    onMarqueeChange(updated);
  };

  const handleAddMarquee = () => {
    onMarqueeChange([
      ...marquee,
      { text: "New Quality Healthcare Service", highlight: "Active" }
    ]);
  };

  const handleDeleteMarquee = (idx: number) => {
    if (marquee.length <= 1) return;
    onMarqueeChange(marquee.filter((_, i) => i !== idx));
  };

  const safeIndex = Math.min(Math.max(0, activeSlideIndex), Math.max(0, slides.length - 1));
  const currentSlide = slides[safeIndex] || {} as HeroSlide;

  // Resolved titles for display
  const currentHeading = currentSlide.heading || currentSlide.title || currentSlide.headline || '';
  const currentSubheading = currentSlide.subheading || currentSlide.subline || currentSlide.highlight || '';
  const currentUrdu = currentSlide.urduTagline || currentSlide.urduTitle || '';

  return (
    <div className="space-y-8">
      {/* Top Banner & Instructions */}
      <div className="bg-gradient-to-r from-[#087f8c] to-[#045d67] p-5 sm:p-6 rounded-2xl text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Hero Section Showcase</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Hero Slider Photos & Captions Manager
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 max-w-2xl mt-1 leading-relaxed">
            Change existing photos, upload new ones from your computer or phone, delete slides, reorder sequence, and edit Urdu and English headlines for the homepage hero showcase.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowLibraryModal(true)}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-white/20 shadow-xs"
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Photo Library</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddSlide()}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#092f3a] text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Slide Photo</span>
          </button>
        </div>
      </div>

      {/* In-app Notification / Alert Banner (Safe in iframe) */}
      {noticeMessage && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 shadow-md border animate-in fade-in duration-200 ${
          noticeMessage.type === 'error'
            ? 'bg-rose-50 text-rose-900 border-rose-200'
            : 'bg-emerald-50 text-emerald-900 border-emerald-200'
        }`}>
          <div className="flex items-center gap-2.5 text-xs font-bold">
            {noticeMessage.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            <span>{noticeMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setNoticeMessage(null)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. VISUAL SLIDER PHOTO GALLERY STRIP & SELECTOR                          */}
      {/* ========================================================================= */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#087f8c]" />
              <span>Current Slider Photos ({slides.length} Slides in Showcase)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Click any photo card below to edit its image, headlines, Urdu translation, and order.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Active & Visible</span>
            <span className="text-slate-300">|</span>
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>Hidden</span>
          </div>
        </div>

        {/* Thumbnail Carousel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {slides.map((s, idx) => {
            const isSelected = safeIndex === idx;
            const isSlideActive = s.active !== false;
            const heading = s.heading || s.title || s.headline || `Slide ${idx + 1}`;
            const category = s.category || s.badge || "Hospital Facility";

            return (
              <div
                key={s.id || idx}
                onClick={() => setActiveSlideIndex(idx)}
                className={`group relative rounded-2xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#087f8c] bg-teal-50/40 shadow-lg ring-2 ring-[#087f8c]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                }`}
              >
                {/* Photo Thumbnail Image */}
                <div className="relative h-28 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={s.image}
                    alt={heading}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/hospital-building.jpg';
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Slide number pill */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10.5px] font-mono font-bold">
                    #{idx + 1}
                  </span>

                  {/* Active status indicator badge */}
                  <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 ${
                    isSlideActive 
                      ? 'bg-emerald-500 text-white shadow-xs' 
                      : 'bg-slate-700/80 text-slate-300'
                  }`}>
                    {isSlideActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{isSlideActive ? 'Active' : 'Hidden'}</span>
                  </span>

                  {/* Category pill bottom left */}
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-amber-300 truncate max-w-[85%]">
                    {category}
                  </span>
                </div>

                {/* Details Footer */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-bold text-slate-800 line-clamp-2 mb-2 leading-snug">
                    {heading}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-xs">
                    {/* Reorder controls */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveSlide(idx, 'up');
                        }}
                        disabled={idx === 0}
                        className="p-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600"
                        title="Move Left / Earlier"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveSlide(idx, 'down');
                        }}
                        disabled={idx === slides.length - 1}
                        className="p-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600"
                        title="Move Right / Later"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        promptDeleteSlide(idx);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete this slide photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Quick Add Slide Card */}
          <div
            onClick={() => handleAddSlide()}
            className="rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#087f8c] bg-slate-50/50 hover:bg-teal-50/30 p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[160px] group"
          >
            <div className="w-10 h-10 rounded-full bg-teal-100 text-[#087f8c] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-[#087f8c]">
              Add Another Slide Photo
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              Upload file or pick from library
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DEDICATED SLIDE EDITOR FOR SELECTED SLIDE                              */}
      {/* ========================================================================= */}
      {currentSlide && (
        <div className="bg-white p-6 rounded-2xl border-2 border-[#087f8c]/30 shadow-md space-y-6">
          {/* Editor Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-[#087f8c] text-white font-mono font-black text-xs">
                Slide #{safeIndex + 1} of {slides.length}
              </span>
              <h3 className="text-base font-black text-slate-800 truncate">
                Editing: {currentHeading || "Untitled Slide"}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {/* Active Toggle */}
              <button
                type="button"
                onClick={() => handleToggleActive(safeIndex)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentSlide.active !== false
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}
              >
                {currentSlide.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{currentSlide.active !== false ? 'Shown on Homepage' : 'Hidden from Homepage'}</span>
              </button>

              {/* Move Buttons */}
              <button
                type="button"
                onClick={() => handleMoveSlide(safeIndex, 'up')}
                disabled={safeIndex === 0}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Move slide earlier"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Move Up</span>
              </button>

              <button
                type="button"
                onClick={() => handleMoveSlide(safeIndex, 'down')}
                disabled={safeIndex === slides.length - 1}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Move slide later"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Move Down</span>
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => promptDeleteSlide(safeIndex)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Delete this slide"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Slide</span>
              </button>
            </div>
          </div>

          {/* 2-Column Grid: Left is Photo Manager, Right is Content & Captions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Photo Upload & Presets (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#087f8c]" />
                    <span>Slide Photo / Image</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowLibraryModal(true)}
                    className="text-[11px] font-bold text-[#087f8c] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Browse Library</span>
                  </button>
                </div>

                {/* Upload Field (Direct file or URL) */}
                <ImageUploadField
                  label="Upload or Paste Photo URL"
                  value={currentSlide.image || ''}
                  onChange={(url) => handleUpdateSlide(safeIndex, { ...currentSlide, image: url })}
                  token={token}
                  category="hero_slide"
                />

                {/* Quick 1-Click Preset Hospital Photo Selector */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-600 mb-2">
                    Quick Pick Hospital Photo:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PRESET_HOSPITAL_PHOTOS.slice(0, 8).map((preset, pIdx) => {
                      const isCurrent = currentSlide.image === preset.url;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleUpdateSlide(safeIndex, { 
                            ...currentSlide, 
                            image: preset.url,
                            category: currentSlide.category || preset.category
                          })}
                          className={`relative h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer group ${
                            isCurrent ? 'border-[#087f8c] ring-2 ring-[#087f8c]/30' : 'border-slate-200 hover:border-teal-400'
                          }`}
                          title={preset.name}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-[#087f8c]/60 flex items-center justify-center text-white">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1.5">
                    Click any thumbnail above to quickly apply that hospital photo to this slide.
                  </p>
                </div>
              </div>

              {/* Live Card Mini-Preview */}
              <div className="bg-[#020b10] p-4 rounded-2xl border border-teal-900/60 text-white relative overflow-hidden shadow-inner">
                <p className="text-[10px] font-mono font-bold uppercase text-teal-400 mb-2 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Live Hero Slide Preview</span>
                </p>

                {/* Background image preview */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={currentSlide.image}
                    alt="Preview"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/hospital-building.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                  {/* Contrast gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent p-3 flex flex-col justify-between" />

                  {/* Overlay text simulation */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 border border-teal-500/40 text-[9px] font-bold text-teal-200">
                        {currentSlide.category || "Official Facility"}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p dir="rtl" className="font-urdu text-sm font-bold text-[#5eead4] leading-snug">
                        {currentUrdu || "خدمتِ خلق — معیاری علاج اور شفا کا مرکز"}
                      </p>
                      <h4 className="text-xs font-black text-white leading-tight line-clamp-2">
                        {currentHeading || "Ali Welfare Trust Hospital"}
                      </h4>
                      <p className="text-[10px] font-semibold text-amber-300 line-clamp-1">
                        {currentSubheading || "Serving Humanity with Dignity"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Slide Titles, Urdu, & Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  Headlines, Urdu & Descriptions for this Slide
                </h4>

                {/* Slide English Heading (Main line on Hero) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Main Slide Heading (English) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 16-Bed Modern Hemodialysis & Renal Care Center"
                    value={currentHeading}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleUpdateSlide(safeIndex, {
                        ...currentSlide,
                        heading: val,
                        title: val,
                        headline: val
                      });
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 font-bold focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  />
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    The large prominent white title animated with the typewriter effect on the hero section.
                  </p>
                </div>

                {/* Urdu Calligraphy Tagline */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Urdu Tagline / Calligraphy Heading <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    placeholder="مثال: جدید ہیمو ڈائیلاسز سنٹر — تاحیات مفت علاج"
                    value={currentUrdu}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleUpdateSlide(safeIndex, {
                        ...currentSlide,
                        urduTagline: val,
                        urduTitle: val
                      });
                    }}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-slate-800 font-urdu focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-right"
                  />
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    Displays in glowing cyan Urdu Naskh/Nastaliq script directly above the English heading.
                  </p>
                </div>

                {/* Subheading (Amber Accent Line) */}
                <div>
                  <label className="block text-xs font-bold text-amber-800 mb-1">
                    Subheading / Golden Highlight Line
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Free Lifesaving Kidney Dialysis for Underprivileged Patients"
                    value={currentSubheading}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleUpdateSlide(safeIndex, {
                        ...currentSlide,
                        subheading: val,
                        subline: val,
                        highlight: val
                      });
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    Highlighted in warm golden amber font directly beneath the main heading.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Category / Badge */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Department / Category Badge
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Renal Care & Dialysis Wing"
                      value={currentSlide.category || currentSlide.badge || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        handleUpdateSlide(safeIndex, {
                          ...currentSlide,
                          category: val,
                          badge: val
                        });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  {/* Location / Tag */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Location / Hospital Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ground Floor, Specialized Dialysis Wing"
                      value={currentSlide.location || currentSlide.tag || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        handleUpdateSlide(safeIndex, {
                          ...currentSlide,
                          location: val,
                          tag: val
                        });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* Heart-Touching Detailed Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Slide Description (Paragraph)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about the medical machinery, doctor staff, or services offered in this photograph..."
                    value={currentSlide.description || ''}
                    onChange={(e) => handleUpdateSlide(safeIndex, { ...currentSlide, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-600 leading-relaxed"
                  />
                </div>

                {/* Action Button Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Button Text (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sponsor a Dialysis"
                      value={currentSlide.buttonText || ''}
                      onChange={(e) => handleUpdateSlide(safeIndex, { ...currentSlide, buttonText: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Button Link / Action URL
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. #booking, /donate, /departments"
                      value={currentSlide.buttonUrl || ''}
                      onChange={(e) => handleUpdateSlide(safeIndex, { ...currentSlide, buttonUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-600 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. HOSPITAL PHOTO LIBRARY MODAL (One-Click Selection)                     */}
      {/* ========================================================================= */}
      {showLibraryModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowLibraryModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-[#087f8c]" />
                  <span>Official Hospital Photo Library</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Select any high-resolution hospital photo below to add it as a new slide, or assign it to the currently edited slide.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowLibraryModal(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
              {PRESET_HOSPITAL_PHOTOS.map((photo, pIdx) => (
                <div
                  key={pIdx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 hover:bg-white hover:border-[#087f8c] transition-all flex flex-col justify-between group"
                >
                  <div className="h-32 bg-slate-900 overflow-hidden relative">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-amber-300 font-bold">
                      {photo.category}
                    </span>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1 mb-2">
                      {photo.name}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateSlide(safeIndex, {
                            ...currentSlide,
                            image: photo.url,
                            category: currentSlide.category || photo.category
                          });
                          setShowLibraryModal(false);
                        }}
                        className="px-2 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#087f8c] text-[11px] font-bold transition-colors cursor-pointer text-center"
                      >
                        Set on Slide #{safeIndex + 1}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddSlide(photo)}
                        className="px-2 py-1.5 rounded-lg bg-[#087f8c] hover:bg-[#066570] text-white text-[11px] font-bold transition-colors cursor-pointer text-center"
                      >
                        + Add as New
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3B. DELETE SLIDE CONFIRMATION MODAL (Safe for iframes, no window.confirm) */}
      {/* ========================================================================= */}
      {slidePendingDelete !== null && slides[slidePendingDelete] && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSlidePendingDelete(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-black text-slate-900">
                  Delete Hero Slide #{slidePendingDelete + 1}?
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Are you sure you want to remove this slide and photo from the homepage hero carousel?
                </p>
              </div>
            </div>

            {/* Slide Preview Box */}
            <div className="my-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-16 h-14 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-200">
                <img
                  src={slides[slidePendingDelete]?.image}
                  alt="Slide preview"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/hospital-building.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {slides[slidePendingDelete]?.heading || slides[slidePendingDelete]?.title || `Slide #${slidePendingDelete + 1}`}
                </p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {slides[slidePendingDelete]?.category || "Hospital Facility"}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                  Will be removed
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSlidePendingDelete(null)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteSlide}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer text-center shadow-md hover:shadow-rose-600/30 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete Slide</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MAIN HERO SECTION HEADLINE & CALL-TO-ACTION BUTTONS                    */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#087f8c]" />
          <span>General Hero Copy & Call-to-Action Buttons</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Title Line 1</label>
            <input
              type="text"
              value={hero.titleLine1 || ''}
              onChange={(e) => updateHeroField('titleLine1', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#087f8c] mb-1">Highlighted Words</label>
            <input
              type="text"
              value={hero.titleHighlight || ''}
              onChange={(e) => updateHeroField('titleHighlight', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-teal-300 bg-teal-50/50 text-teal-900 font-bold focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Title Line 2</label>
            <input
              type="text"
              value={hero.titleLine2 || ''}
              onChange={(e) => updateHeroField('titleLine2', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Urdu Sub-Tagline</label>
          <input
            type="text"
            dir="rtl"
            value={hero.urduTagline || ''}
            onChange={(e) => updateHeroField('urduTagline', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-urdu text-base text-right"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Comprehensive Description</label>
          <textarea
            rows={2}
            value={hero.description || ''}
            onChange={(e) => updateHeroField('description', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">OPD Booking Button Label</label>
            <input
              type="text"
              value={hero.opdButtonText || ''}
              onChange={(e) => updateHeroField('opdButtonText', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Donation Button Label</label>
            <input
              type="text"
              value={hero.donateButtonText || ''}
              onChange={(e) => updateHeroField('donateButtonText', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. SECOND SLIDER: INFINITE MARQUEE TICKER                                 */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">
              Continuous Infinite Marquee Ribbon
            </h3>
            <p className="text-[11px] text-slate-500">
              The scrolling ticker ribbon featuring services, trust highlights, and key hospital badges.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddMarquee}
            className="px-3 py-1.5 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Marquee Item</span>
          </button>
        </div>

        <div className="space-y-2">
          {marquee.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-xs font-mono text-slate-400 w-5 text-center shrink-0">{idx + 1}</span>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Service description"
                  value={item.text}
                  onChange={(e) => handleUpdateMarquee(idx, 'text', e.target.value)}
                  className="sm:col-span-2 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
                <input
                  type="text"
                  placeholder="Badge pill (e.g. 24/7 Shifts)"
                  value={item.highlight}
                  onChange={(e) => handleUpdateMarquee(idx, 'highlight', e.target.value)}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-teal-700"
                />
              </div>
              <button
                type="button"
                onClick={() => handleDeleteMarquee(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                title="Delete marquee item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
