import React from 'react';
import { HeaderConfig } from '../../../types/content';
import { ImageUploadField } from '../ImageUploadField';
import { AlignLeft, AlignCenter, Layout } from 'lucide-react';

interface HeaderTabProps {
  header: HeaderConfig;
  onChange: (updated: HeaderConfig) => void;
  token: string;
}

export const HeaderTab: React.FC<HeaderTabProps> = ({ header, onChange, token }) => {
  const updateField = <K extends keyof HeaderConfig>(field: K, value: HeaderConfig[K]) => {
    onChange({ ...header, [field]: value });
  };

  const handleNavLinkNameChange = (idx: number, newName: string) => {
    const updatedLinks = [...header.navLinks];
    updatedLinks[idx] = { ...updatedLinks[idx], name: newName };
    updateField('navLinks', updatedLinks);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Header, Logo & Navigation Bar</h2>
        <p className="text-xs text-slate-500">
          Configure the primary header logo, position (left or center), button names, and emergency ticker alert.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Logo & Brand Identity</h3>
        
        <ImageUploadField
          label="Header Logo Photo"
          value={header.logoUrl}
          onChange={(url) => updateField('logoUrl', url)}
          token={token}
          hint="Supported formats: PNG, JPG, WebP. Recommended: Square or circular crest with transparent/white background."
          category="logo"
        />

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Logo Position on Header</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateField('logoPosition', 'left')}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                header.logoPosition === 'left'
                  ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <AlignLeft className="w-4 h-4" />
              <span>Left-Aligned (Standard)</span>
            </button>

            <button
              type="button"
              onClick={() => updateField('logoPosition', 'center')}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                header.logoPosition === 'center'
                  ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <AlignCenter className="w-4 h-4" />
              <span>Centered Logo</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Main Brand Name</label>
            <input
              type="text"
              value={header.hospitalName}
              onChange={(e) => updateField('hospitalName', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Header Subtitle Tagline</label>
            <input
              type="text"
              value={header.tagline}
              onChange={(e) => updateField('tagline', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons & Names */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Navigation Bar Buttons & Labels</h3>
        <p className="text-[11px] text-slate-500">
          Customize the names displayed on the header navigation menu buttons.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {header.navLinks.map((link, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block text-[11px] text-slate-500 font-medium mb-1">Button {idx + 1} ({link.href})</label>
              <input
                type="text"
                value={link.name}
                onChange={(e) => handleNavLinkNameChange(idx, e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
          ))}
        </div>

        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Header Golden Action Button Name</label>
          <input
            type="text"
            value={header.donateButtonText}
            onChange={(e) => updateField('donateButtonText', e.target.value)}
            className="w-full max-w-sm px-3 py-2 text-xs font-black rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Top Notification / Emergency Ticker */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Top Header Emergency Ticker</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Status Alert Ticker Text</label>
            <input
              type="text"
              value={header.tickerText}
              onChange={(e) => updateField('tickerText', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Badge Text</label>
            <input
              type="text"
              value={header.emergencyBadge}
              onChange={(e) => updateField('emergencyBadge', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Phone Hotline</label>
            <input
              type="text"
              value={header.emergencyPhone}
              onChange={(e) => updateField('emergencyPhone', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Hotline</label>
            <input
              type="text"
              value={header.whatsappNumber}
              onChange={(e) => updateField('whatsappNumber', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
