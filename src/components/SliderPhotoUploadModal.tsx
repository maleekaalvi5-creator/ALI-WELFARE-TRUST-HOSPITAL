import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Trash2, 
  Check, 
  X, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  RefreshCw,
  Loader2,
  Camera,
  Eye,
  Building2
} from 'lucide-react';
import { HeroSlide } from '../types/content';
import { useHospitalContent } from '../context/HospitalContentContext';

interface SliderPhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlideIndex: number;
  slides: HeroSlide[];
  onSlideUpdated: (newSlideIndex?: number) => void;
}

export const SliderPhotoUploadModal: React.FC<SliderPhotoUploadModalProps> = ({
  isOpen,
  onClose,
  currentSlideIndex,
  slides,
  onSlideUpdated
}) => {
  const { reloadContent } = useHospitalContent();

  const [activeTab, setActiveTab] = useState<number>(0);
  
  // Slide Form State
  const [heading, setHeading] = useState<string>('');
  const [subheading, setSubheading] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [urduTagline, setUrduTagline] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [badge, setBadge] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('');
  const [buttonUrl, setButtonUrl] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  
  // Image State
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [hasNewFile, setHasNewFile] = useState<boolean>(false);
  const [newFileDataUrl, setNewFileDataUrl] = useState<string>('');
  const [newFileName, setNewFileName] = useState<string>('');
  const [imageSizeLabel, setImageSizeLabel] = useState<string>('');

  // Status & Progress
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load a given slide into the editable form
  const loadSlide = useCallback((slide: HeroSlide | undefined, idx: number) => {
    if (!slide) return;
    setActiveTab(idx);
    setHeading(slide.heading || slide.headline || slide.title || "Ali Welfare Trust Hospital Facility");
    setSubheading(slide.subheading || slide.highlight || slide.subline || "Serving Humanity with Dignity & 100% Free Medical Care");
    setDescription(slide.description || "Multi-specialty charitable hospital providing subsidized and 100% free treatment.");
    setUrduTagline(slide.urduTagline || slide.urduTitle || "خدمتِ خلق — معیاری علاج اور شفا کا مرکز");
    setCategory(slide.category || "Hospital Facility");
    setBadge(slide.badge || "Official Facility");
    setButtonText(slide.buttonText || "Book OPD Consultation");
    setButtonUrl(slide.buttonUrl || "#booking");
    setIsActive(slide.active !== false);

    setPreviewUrl(slide.image || '');
    setHasNewFile(false);
    setNewFileDataUrl('');
    setNewFileName('');
    setImageSizeLabel('Current Hospital Photo');
    setIsConfirmingDelete(false);
    setStatusMessage(null);
  }, []);

  // When modal opens, sync with current slide
  useEffect(() => {
    if (isOpen && slides.length > 0) {
      const targetIdx = Math.min(Math.max(0, currentSlideIndex), slides.length - 1);
      loadSlide(slides[targetIdx] || slides[0], targetIdx);
    } else if (!isOpen) {
      setStatusMessage(null);
      setIsConfirmingDelete(false);
      setHasNewFile(false);
    }
  }, [isOpen, currentSlideIndex, slides, loadSlide]);

  // Clean stale local storage on mount
  useEffect(() => {
    try {
      localStorage.removeItem('awt_custom_hero_slides');
    } catch {
      // ignore
    }
  }, []);

  // Image File Compression & Upload Preparation
  // CRITICAL: FILENAME NEVER OVERWRITES HEADING OR DESCRIPTION
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ type: 'error', text: 'Please select a valid photo file (JPG, PNG, WEBP).' });
      return;
    }

    setStatusMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) return;

      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 2560;
        const MAX_HEIGHT = 1600;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.88);
          setPreviewUrl(compressed);
          setNewFileDataUrl(compressed);
          setHasNewFile(true);
          // Store filename purely for disk storage identifier, NOT for heading
          setNewFileName(file.name);
          setImageSizeLabel(`${width} × ${height} px • ${(file.size / 1024).toFixed(0)} KB`);
          setStatusMessage({ type: 'success', text: 'New photo loaded! Click "Save Slide Changes" below to apply.' });
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Switch to another slide
  const handleTabClick = (idx: number) => {
    if (idx === activeTab) return;
    loadSlide(slides[idx], idx);
  };

  // Add a new slide to the deck (supports 7+ slides)
  const handleAddNewSlide = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const newSlideData: HeroSlide = {
        id: `slide-${Date.now()}`,
        order: slides.length + 1,
        active: true,
        image: "/images/hospital-building.jpg",
        heading: "New Specialized Hospital Wing",
        subheading: "Advanced Healthcare Infrastructure Dedicated to Deserving Patients",
        description: "Equipped with state-of-the-art medical instruments for diagnostic and therapeutic patient care.",
        category: "Hospital Department",
        badge: "Official Facility",
        urduTitle: "جدید ہسپتال وینگ اور طبی سہولیات",
        urduTagline: "جدید ہسپتال وینگ اور طبی سہولیات — خدمتِ خلق ہمارا نصب العین",
        location: "Ali Welfare Trust Hospital, Qila Didar Singh",
        tag: "Active Department",
        buttonText: "Book OPD Consultation",
        buttonUrl: "#booking"
      };

      const res = await fetch('/api/upload-slider-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: newSlideData.image,
          isNewSlide: true,
          slideData: newSlideData
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create new slide on server.");
      }

      await reloadContent();
      const newIndex = slides.length;
      loadSlide(newSlideData, newIndex);
      onSlideUpdated(newIndex);
      setStatusMessage({ type: 'success', text: 'New slide created successfully!' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || "Failed to add slide." });
    } finally {
      setIsSaving(false);
    }
  };

  // Save current slide edits (Image + Text)
  const handleSaveCurrentSlide = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    const targetSlide = slides[activeTab] || slides[0];

    const slideDataPayload: HeroSlide = {
      id: targetSlide?.id || `slide-${Date.now()}`,
      order: activeTab + 1,
      active: isActive,
      image: hasNewFile ? previewUrl : targetSlide.image,
      heading: heading.trim() || "Ali Welfare Trust Hospital",
      subheading: subheading.trim() || "Serving Humanity with Dignity & 100% Free Medical Care",
      description: description.trim() || "Providing subsidized and free treatment to all patients in need.",
      urduTitle: urduTagline.trim() || "خدمتِ خلق — معیاری علاج اور شفا کا مرکز",
      urduTagline: urduTagline.trim() || "خدمتِ خلق — معیاری علاج اور شفا کا مرکز",
      category: category.trim() || "Hospital Facility",
      badge: badge.trim() || "Official Facility",
      buttonText: buttonText.trim() || "Book OPD Consultation",
      buttonUrl: buttonUrl.trim() || "#booking",
      location: targetSlide?.location || "Chahal Kalan Road, Main Campus, Qila Didar Singh",
      tag: targetSlide?.tag || "State-of-the-Art Charitable Healthcare Infrastructure",
      // Compatibility aliases
      title: heading.trim(),
      headline: heading.trim(),
      highlight: subheading.trim()
    };

    try {
      const response = await fetch('/api/upload-slider-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataUrl: hasNewFile ? newFileDataUrl : undefined,
          imageUrl: !hasNewFile ? targetSlide.image : undefined,
          filename: newFileName || 'slide_photo',
          slideIndex: activeTab,
          isNewSlide: false,
          slideData: slideDataPayload
        })
      });

      const resJson = await response.json();
      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || "Failed to save slide to server.");
      }

      // Purge any stale localStorage
      try {
        localStorage.removeItem('awt_custom_hero_slides');
      } catch {}

      await reloadContent();

      setStatusMessage({ type: 'success', text: 'Slide successfully saved and synchronized!' });
      setHasNewFile(false);
      onSlideUpdated(activeTab);

      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    } catch (err: any) {
      console.error("Save slide error:", err);
      setIsSaving(false);
      setStatusMessage({ type: 'error', text: err.message || "Failed to save slide." });
    }
  };

  // Permanently Delete Slide: Removes record from server JSON, recalculates order, zero blank slides
  const handleDeleteCurrentSlide = async () => {
    if (slides.length <= 1) {
      setStatusMessage({ type: 'error', text: 'At least one slide must remain in the hero slider.' });
      setIsConfirmingDelete(false);
      return;
    }

    setIsDeleting(true);
    setStatusMessage(null);

    const targetSlide = slides[activeTab];

    try {
      const response = await fetch('/api/delete-slider-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slideIndex: activeTab,
          slideId: targetSlide?.id
        })
      });

      const resJson = await response.json();
      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || "Failed to delete slide from server.");
      }

      // Remove stale localStorage
      try {
        localStorage.removeItem('awt_custom_hero_slides');
      } catch {}

      await reloadContent();

      const nextActive = Math.max(0, activeTab - 1);
      setActiveTab(nextActive);
      setIsConfirmingDelete(false);
      setStatusMessage({ type: 'success', text: 'Slide permanently deleted! Hero slider updated.' });
      onSlideUpdated(nextActive);
    } catch (err: any) {
      console.error("Delete slide error:", err);
      setStatusMessage({ type: 'error', text: err.message || "Failed to delete slide." });
    } finally {
      setIsDeleting(false);
    }
  };

  // Reorder: Move Up
  const handleMoveUp = async () => {
    if (activeTab <= 0) return;
    const reordered = [...slides];
    const temp = reordered[activeTab];
    reordered[activeTab] = reordered[activeTab - 1];
    reordered[activeTab - 1] = temp;

    setIsSaving(true);
    try {
      const res = await fetch('/api/save-hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides: reordered })
      });
      if (!res.ok) throw new Error("Failed to reorder slides.");
      await reloadContent();
      const newIdx = activeTab - 1;
      setActiveTab(newIdx);
      loadSlide(reordered[newIdx], newIdx);
      onSlideUpdated(newIdx);
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message || "Could not reorder." });
    } finally {
      setIsSaving(false);
    }
  };

  // Reorder: Move Down
  const handleMoveDown = async () => {
    if (activeTab >= slides.length - 1) return;
    const reordered = [...slides];
    const temp = reordered[activeTab];
    reordered[activeTab] = reordered[activeTab + 1];
    reordered[activeTab + 1] = temp;

    setIsSaving(true);
    try {
      const res = await fetch('/api/save-hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides: reordered })
      });
      if (!res.ok) throw new Error("Failed to reorder slides.");
      await reloadContent();
      const newIdx = activeTab + 1;
      setActiveTab(newIdx);
      loadSlide(reordered[newIdx], newIdx);
      onSlideUpdated(newIdx);
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message || "Could not reorder." });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      id="slider-manager-modal"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#02131a] border border-teal-500/30 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#031d24] border-b border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Hero Slider Studio
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {slides.length} Slides
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Manage high-resolution photography, typewriter headings & descriptions independently.
              </p>
            </div>
          </div>
          <button
            id="close-slider-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Selector Tabs (Horizontal Ribbon) */}
        <div className="px-4 py-2.5 bg-[#020e14] border-b border-teal-900/40 flex items-center gap-2 overflow-x-auto select-none">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-teal-400" /> Slides:
          </span>
          {slides.map((s, idx) => {
            const isCurrent = idx === activeTab;
            return (
              <button
                key={s.id || idx}
                id={`slider-tab-btn-${idx}`}
                onClick={() => handleTabClick(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-teal-600 text-white shadow-md border border-teal-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>Slide {String(idx + 1).padStart(2, '0')}</span>
                {s.active === false && (
                  <span className="text-[10px] px-1 py-0.2 rounded bg-amber-500/30 text-amber-300">Off</span>
                )}
              </button>
            );
          })}

          {/* Add Slide Button */}
          <button
            id="slider-add-slide-tab-btn"
            onClick={handleAddNewSlide}
            disabled={isSaving}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-teal-300 bg-teal-950/60 hover:bg-teal-900 border border-teal-500/40 shrink-0 flex items-center gap-1 transition-all cursor-pointer hover:scale-105"
            title="Add a new slide to the hero slider"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Status Message Banner */}
          {statusMessage && (
            <div 
              id="slider-status-banner"
              className={`p-3 rounded-xl border flex items-center gap-2 text-xs sm:text-sm font-semibold animate-in fade-in ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span className="flex-1">{statusMessage.text}</span>
              <button 
                onClick={() => setStatusMessage(null)}
                className="text-white/60 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Top Section: Photo Preview & Upload Zone */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Left Col (5 cols): Photo Preview */}
            <div className="md:col-span-5 flex flex-col">
              <label className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Slide Photograph</span>
                <span className="text-[11px] text-slate-400 normal-case">{imageSizeLabel}</span>
              </label>
              
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-teal-500/30 group">
                <img
                  src={previewUrl || '/images/hospital-building.jpg'}
                  alt="Slide preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.src = '/images/hospital-building.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white/90">
                  <span className="truncate max-w-[180px] font-mono bg-black/60 px-2 py-0.5 rounded">
                    {previewUrl.split('/').pop()?.split('?')[0] || 'hospital-photo.jpg'}
                  </span>
                  {hasNewFile && (
                    <span className="bg-emerald-500/80 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">
                      New Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Reorder Buttons */}
              <div className="flex items-center gap-2 mt-2.5">
                <button
                  id="slide-move-up-btn"
                  onClick={handleMoveUp}
                  disabled={activeTab === 0 || isSaving}
                  className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs font-semibold text-slate-200 border border-white/10 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  title="Move slide earlier in rotation"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-teal-300" />
                  <span>Move Up</span>
                </button>
                <button
                  id="slide-move-down-btn"
                  onClick={handleMoveDown}
                  disabled={activeTab >= slides.length - 1 || isSaving}
                  className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs font-semibold text-slate-200 border border-white/10 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  title="Move slide later in rotation"
                >
                  <ArrowDown className="w-3.5 h-3.5 text-teal-300" />
                  <span>Move Down</span>
                </button>
              </div>
            </div>

            {/* Right Col (7 cols): Dropzone / Replace Image */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <label className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 block">
                  Replace Photograph (Drag & Drop or Click)
                </label>
                
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleFileSelect(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px] ${
                    isDragging
                      ? 'border-teal-400 bg-teal-950/40'
                      : 'border-teal-500/40 hover:border-teal-400 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Upload className="w-8 h-8 text-teal-400 mb-2" />
                  <p className="text-xs sm:text-sm font-bold text-white mb-1">
                    Click to browse or drop an image file here
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-xs">
                    Supports JPG, PNG, WEBP. The file name is ONLY used for storage and will never overwrite your custom headings!
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />
              </div>

              {/* Active Toggle */}
              <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs">
                  <span className="font-bold text-white block">Slide Active in Rotation</span>
                  <span className="text-[11px] text-slate-400">Temporarily hide without deleting</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isActive ? 'bg-teal-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>

          {/* Form Fields: Independent Text Fields */}
          <div className="space-y-3.5 pt-2 border-t border-teal-900/40">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Editable Slide Content (Independently Managed)</span>
            </h3>

            {/* 1. Main Heading (Letter-by-Letter Typewriter) */}
            <div>
              <label className="text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
                <span>Primary Heading (Animated Letter-by-Letter)</span>
                <span className="text-[10px] text-amber-300">Independent Field</span>
              </label>
              <input
                id="slide-heading-input"
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="e.g. 16-Bed Modern Hemodialysis & Renal Care Center"
                className="w-full px-3.5 py-2 rounded-xl bg-[#031d24] border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>

            {/* 2. Subheading */}
            <div>
              <label className="text-xs font-semibold text-slate-200 mb-1 block">
                Subheading / Mission Highlight
              </label>
              <input
                id="slide-subheading-input"
                type="text"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                placeholder="e.g. 100% Free Lifesaving Kidney Dialysis for Underprivileged Patients"
                className="w-full px-3.5 py-2 rounded-xl bg-[#031d24] border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>

            {/* 3. Description */}
            <div>
              <label className="text-xs font-semibold text-slate-200 mb-1 block">
                Slide Description Text
              </label>
              <textarea
                id="slide-description-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of facilities, specialists, and charitable impact..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#031d24] border border-teal-500/30 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors resize-none"
              />
            </div>

            {/* 4. Urdu Calligraphy Tagline */}
            <div>
              <label className="text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
                <span>Urdu Tagline / Calligraphy Banner</span>
                <span className="text-[10px] text-teal-300 font-mono">Nastaliq Format</span>
              </label>
              <input
                id="slide-urdu-input"
                type="text"
                dir="rtl"
                value={urduTagline}
                onChange={(e) => setUrduTagline(e.target.value)}
                placeholder="مرکزی عمارت، او پی ڈی اور تشخیصی شعبہ — خدمتِ خلق ہمارا نصب العین"
                className="w-full px-3.5 py-2 rounded-xl bg-[#031d24] border border-teal-500/30 text-[#5eead4] font-urdu text-base sm:text-lg focus:outline-none focus:border-teal-400 transition-colors text-right"
              />
            </div>

            {/* 5. Category & Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-200 mb-1 block">
                  Facility Category
                </label>
                <input
                  id="slide-category-input"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Renal Care & Dialysis Wing"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#031d24] border border-teal-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-200 mb-1 block">
                  Badge Label
                </label>
                <input
                  id="slide-badge-input"
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. 100% Free Dialysis"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#031d24] border border-teal-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* 6. Button Text & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-200 mb-1 block">
                  Action Button Label
                </label>
                <input
                  id="slide-button-text-input"
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="e.g. Book OPD Consultation"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#031d24] border border-teal-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-200 mb-1 block">
                  Button Action URL / Anchor
                </label>
                <input
                  id="slide-button-url-input"
                  type="text"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  placeholder="e.g. #booking, /donate, /doctors"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#031d24] border border-teal-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-4 bg-[#031d24] border-t border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Left: Delete Slide (Inline Confirmation) */}
          <div className="w-full sm:w-auto">
            {isConfirmingDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-300">Permanently delete Slide {activeTab + 1}?</span>
                <button
                  id="confirm-delete-slide-btn"
                  onClick={handleDeleteCurrentSlide}
                  disabled={isDeleting}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  <span>Yes, Delete</span>
                </button>
                <button
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                id="trigger-delete-slide-btn"
                onClick={() => setIsConfirmingDelete(true)}
                disabled={slides.length <= 1 || isSaving}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 disabled:opacity-30 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                title={slides.length <= 1 ? "At least one slide must remain" : "Permanently remove this slide"}
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Delete Slide {activeTab + 1}</span>
              </button>
            )}
          </div>

          {/* Right: Close & Save Changes */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Cancel
            </button>

            <button
              id="save-slide-changes-btn"
              onClick={handleSaveCurrentSlide}
              disabled={isSaving || isDeleting}
              className="px-5 py-2 rounded-xl bg-[#087f8c] hover:bg-[#066570] disabled:opacity-60 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-105 border border-teal-400/50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Saving to Server...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Save Slide Changes</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
