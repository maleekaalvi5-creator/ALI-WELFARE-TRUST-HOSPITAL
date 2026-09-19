import React from 'react';
import { ThemeConfig } from '../../../types/content';
import { Palette, Type, Check, RefreshCw, Sparkles, Sliders } from 'lucide-react';

interface ThemeTabProps {
  theme?: ThemeConfig;
  onChange: (updated: ThemeConfig) => void;
}

const DEFAULT_THEME: ThemeConfig = {
  primaryColor: "#087f8c",
  secondaryColor: "#092f3a",
  accentColor: "#d97706",
  headingFont: "Outfit",
  bodyFont: "Plus Jakarta Sans",
  fontUrdu: "Amiri",
  borderRadius: "rounded-2xl",
  darkNavMode: true
};

const COLOR_PRESETS = [
  { name: 'Original Trust Teal', primary: '#087f8c', secondary: '#092f3a', accent: '#d97706' },
  { name: 'Deep Sapphire Trust', primary: '#0284c7', secondary: '#082f49', accent: '#eab308' },
  { name: 'Emerald Healing', primary: '#059669', secondary: '#064e3b', accent: '#f59e0b' },
  { name: 'Compassionate Maroon', primary: '#be123c', secondary: '#4c0519', accent: '#d97706' },
  { name: 'Royal Islamic Teal', primary: '#0d9488', secondary: '#134e4a', accent: '#f59e0b' },
];

export const ThemeTab: React.FC<ThemeTabProps> = ({ theme = DEFAULT_THEME, onChange }) => {
  const current = { ...DEFAULT_THEME, ...theme };

  const updateField = <K extends keyof ThemeConfig>(field: K, value: ThemeConfig[K]) => {
    onChange({ ...current, [field]: value });
  };

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    onChange({
      ...current,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    });
  };

  const resetToDefault = () => {
    onChange(DEFAULT_THEME);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800">Theme Colors, Typography & Visual Styling</h2>
          <p className="text-xs text-slate-500">
            Control the hospital color palette, heading and body fonts, Urdu typography, and button corner radiuses across all screens.
          </p>
        </div>

        <button
          type="button"
          onClick={resetToDefault}
          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Original Theme</span>
        </button>
      </div>

      {/* Preset Palettes */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">
          One-Click Healthcare Color Palettes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COLOR_PRESETS.map((preset) => {
            const isSelected =
              current.primaryColor.toLowerCase() === preset.primary.toLowerCase() &&
              current.secondaryColor.toLowerCase() === preset.secondary.toLowerCase();

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/50 shadow-xs ring-1 ring-teal-500'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-800">{preset.name}</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-5 h-5 rounded-full shadow-xs" style={{ backgroundColor: preset.primary }} />
                    <span className="w-5 h-5 rounded-full shadow-xs" style={{ backgroundColor: preset.secondary }} />
                    <span className="w-5 h-5 rounded-full shadow-xs" style={{ backgroundColor: preset.accent }} />
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Codes */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Palette className="w-5 h-5 text-teal-700" />
          <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
            Custom Hex Color Codes
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Primary Color */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Primary Brand Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={current.primaryColor}
                onChange={(e) => updateField('primaryColor', e.target.value)}
                className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={current.primaryColor}
                onChange={(e) => updateField('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 bg-white uppercase text-slate-800"
              />
            </div>
            <p className="text-[10px] text-slate-400">Buttons, highlights, badges & links</p>
          </div>

          {/* Secondary Color */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Secondary Dark Shade</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={current.secondaryColor}
                onChange={(e) => updateField('secondaryColor', e.target.value)}
                className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={current.secondaryColor}
                onChange={(e) => updateField('secondaryColor', e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 bg-white uppercase text-slate-800"
              />
            </div>
            <p className="text-[10px] text-slate-400">Header dark background, deep headings</p>
          </div>

          {/* Accent Gold Color */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Accent Gold / Donation</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={current.accentColor}
                onChange={(e) => updateField('accentColor', e.target.value)}
                className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={current.accentColor}
                onChange={(e) => updateField('accentColor', e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 bg-white uppercase text-slate-800"
              />
            </div>
            <p className="text-[10px] text-slate-400">Zakat badges, donate highlights & stars</p>
          </div>
        </div>

        {/* Live UI Preview Card */}
        <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
            Live Component Color Preview
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md"
              style={{ backgroundColor: current.primaryColor }}
            >
              Primary Action Button
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md"
              style={{ backgroundColor: current.accentColor }}
            >
              Donate Now (Zakat)
            </button>

            <div
              className="px-3 py-1.5 rounded-lg text-xs font-bold border"
              style={{
                color: current.primaryColor,
                backgroundColor: `${current.primaryColor}15`,
                borderColor: `${current.primaryColor}30`
              }}
            >
              24/7 Registered Trust Badge
            </div>
          </div>
        </div>
      </div>

      {/* Typography & Fonts */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Type className="w-5 h-5 text-teal-700" />
          <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
            Hospital Typography & Font Pairings
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Heading Font Family</label>
            <select
              value={current.headingFont}
              onChange={(e) => updateField('headingFont', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold"
            >
              <option value="Outfit">Outfit (Clean, Modern Display - Default)</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Corporate Healthcare)</option>
              <option value="Playfair Display">Playfair Display (Prestigious Trust Serif)</option>
              <option value="Inter">Inter (Ultra Legible)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Body Text Font Family</label>
            <select
              value={current.bodyFont}
              onChange={(e) => updateField('bodyFont', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold"
            >
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (High Readability)</option>
              <option value="Inter">Inter (Precision Tech)</option>
              <option value="System UI">System Native San-Serif</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Urdu Calligraphy Style</label>
            <select
              value={current.fontUrdu}
              onChange={(e) => updateField('fontUrdu', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-urdu font-bold"
            >
              <option value="Amiri">عامری خط (Amiri Naskh Style)</option>
              <option value="Noto Nastaliq Urdu">نستعلیق نستعلیق (Noto Nastaliq)</option>
              <option value="Jameel Noori Nastaleeq">جمیل نوری نستعلیق (Traditional)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Card & Button Corner Radii</label>
            <select
              value={current.borderRadius}
              onChange={(e) => updateField('borderRadius', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold"
            >
              <option value="rounded-2xl">Modern Soft Curve (rounded-2xl - 16px)</option>
              <option value="rounded-xl">Classic Rounded (rounded-xl - 12px)</option>
              <option value="rounded-3xl">Pill & Organic (rounded-3xl - 24px)</option>
              <option value="rounded-lg">Compact Sharp (rounded-lg - 8px)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-5">
            <div>
              <span className="block text-xs font-bold text-slate-800">Dark Navigation Header</span>
              <span className="text-[11px] text-slate-500">Enable high-contrast navy dark theme for navigation</span>
            </div>
            <input
              type="checkbox"
              checked={current.darkNavMode !== false}
              onChange={(e) => updateField('darkNavMode', e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
