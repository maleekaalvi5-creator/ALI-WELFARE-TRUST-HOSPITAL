import React, { useState } from 'react';
import { HeroConfig, HeroSlide, MarqueeItem } from '../../../types/content';
import { ImageUploadField } from '../ImageUploadField';
import { Plus, Trash2, MoveUp, MoveDown, Layers, Sparkles } from 'lucide-react';

interface HeroSliderTabProps {
  hero: HeroConfig;
  marquee: MarqueeItem[];
  onHeroChange: (updated: HeroConfig) => void;
  onMarqueeChange: (updated: MarqueeItem[]) => void;
  token: string;
}

export const HeroSliderTab: React.FC<HeroSliderTabProps> = ({
  hero,
  marquee,
  onHeroChange,
  onMarqueeChange,
  token
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const updateHeroField = <K extends keyof HeroConfig>(field: K, value: HeroConfig[K]) => {
    onHeroChange({ ...hero, [field]: value });
  };

  const handleUpdateSlide = (idx: number, updated: HeroSlide) => {
    const newSlides = [...hero.slides];
    newSlides[idx] = updated;
    updateHeroField('slides', newSlides);
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      category: "Specialist Facility",
      title: "New Hospital Wing or Medical Equipment",
      urduTitle: "جدید طبی سہولیات و جدید شعبہ",
      urduTagline: "جدید طبی سہولیات و جدید شعبہ",
      headline: "Dedicated to Compassionate Patient Care,",
      highlight: "Modern Facilities & Skilled Staff",
      subline: "Serving Humanity with Dignity and Honor",
      location: "Ali Welfare Trust Hospital",
      tag: "24/7 Available",
      badge: "Hospital Facility",
      description: "Equipped with state-of-the-art medical instruments for patient diagnostic and therapeutic care.",
      image: "/images/hospital-interior-1.jpg"
    };
    const newSlides = [...hero.slides, newSlide];
    updateHeroField('slides', newSlides);
    setActiveSlideIndex(newSlides.length - 1);
  };

  const handleDeleteSlide = (idx: number) => {
    if (hero.slides.length <= 1) {
      alert("At least one slide must remain in the hero slider.");
      return;
    }
    if (confirm("Are you sure you want to delete this slider photo?")) {
      const newSlides = hero.slides.filter((_, i) => i !== idx);
      updateHeroField('slides', newSlides);
      setActiveSlideIndex(Math.max(0, idx - 1));
    }
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

  const currentSlide = hero.slides[activeSlideIndex] || hero.slides[0] || {} as HeroSlide;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Hero Section, Sliders & Infinite Marquee</h2>
        <p className="text-xs text-slate-500">
          Edit the main headline, call-to-action buttons, interactive photo slider, and second marquee ticker.
        </p>
      </div>

      {/* Main Hero Copy */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Hero Headline & Content</h3>

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
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-urdu text-base"
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

      {/* Slider Photos (Slider 1) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">
              Slider Photos After Hero ({hero.slides.length} Slides)
            </h3>
            <p className="text-[11px] text-slate-500">
              Add, remove, or edit photos and captions in the dynamic 3D hero showcase slider.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddSlide}
            className="px-3 py-1.5 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide Photo</span>
          </button>
        </div>

        {/* Slide Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
          {hero.slides.map((s, idx) => (
            <button
              key={s.id || idx}
              type="button"
              onClick={() => setActiveSlideIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeSlideIndex === idx
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>Slide {idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Currently Selected Slide Editor */}
        {currentSlide && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Editing Slide {activeSlideIndex + 1}: {currentSlide.title}</span>
              <button
                type="button"
                onClick={() => handleDeleteSlide(activeSlideIndex)}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Slide</span>
              </button>
            </div>

            <ImageUploadField
              label="Slide Image"
              value={currentSlide?.image || ''}
              onChange={(url) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, image: url })}
              token={token}
              category="hero_slide"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Slide Title (English)</label>
                <input
                  type="text"
                  value={currentSlide?.title || ''}
                  onChange={(e) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Slide Title / Tagline (Urdu)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={currentSlide?.urduTagline || currentSlide?.urduTitle || ''}
                  onChange={(e) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, urduTagline: e.target.value, urduTitle: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-urdu"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Headline (Line 1)</label>
                <input
                  type="text"
                  placeholder="e.g. Where Every Human Life is Sacred,"
                  value={currentSlide?.headline || ''}
                  onChange={(e) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, headline: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-amber-700 mb-1">Highlighted Words (Amber)</label>
                <input
                  type="text"
                  placeholder="e.g. Compassion Meets Clinical Excellence"
                  value={currentSlide?.highlight || ''}
                  onChange={(e) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, highlight: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-amber-300 bg-amber-50/50 text-amber-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Subline (Line 2)</label>
                <input
                  type="text"
                  placeholder="e.g. A Living Sanctuary of Healing"
                  value={currentSlide?.subline || ''}
                  onChange={(e) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, subline: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Category / Department</label>
                <input
                  type="text"
                  value={currentSlide?.category || ''}
                  onChange={(e) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, category: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={currentSlide?.tag || ''}
                  onChange={(e) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, tag: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Heart-Touching Description (Subtext)</label>
              <textarea
                rows={2}
                value={currentSlide?.description || ''}
                onChange={(e) => handleUpdateSlide(activeSlideIndex, { ...currentSlide, description: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* Second Slider: Infinite Marquee */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">
              Second Slider: Infinite Marquee Ribbon
            </h3>
            <p className="text-[11px] text-slate-500">
              The continuous scrolling ticker featuring services, trust highlights, and key hospital badges.
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
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
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
