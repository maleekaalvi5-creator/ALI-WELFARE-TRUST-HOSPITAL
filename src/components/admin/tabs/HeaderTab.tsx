import React from 'react';
import { HeaderConfig } from '../../../types/content';
import { ImageUploadField } from '../ImageUploadField';
import { AlignLeft, AlignCenter, Layout, Plus, Trash2, Globe, ExternalLink, Sliders } from 'lucide-react';

interface HeaderTabProps {
  header: HeaderConfig;
  onChange: (updated: HeaderConfig) => void;
  token: string;
}

export const HeaderTab: React.FC<HeaderTabProps> = ({ header, onChange, token }) => {
  const updateField = <K extends keyof HeaderConfig>(field: K, value: HeaderConfig[K]) => {
    onChange({ ...header, [field]: value });
  };

  const handleNavLinkChange = (idx: number, field: 'name' | 'href', val: string) => {
    const updatedLinks = [...header.navLinks];
    updatedLinks[idx] = { ...updatedLinks[idx], [field]: val };
    updateField('navLinks', updatedLinks);
  };

  const handleAddNavLink = () => {
    const newLinks = [
      ...header.navLinks,
      { name: "New Page / Section", href: "#" }
    ];
    updateField('navLinks', newLinks);
  };

  const handleDeleteNavLink = (idx: number) => {
    if (header.navLinks.length <= 1) {
      alert("At least one navigation link must remain.");
      return;
    }
    const newLinks = header.navLinks.filter((_, i) => i !== idx);
    updateField('navLinks', newLinks);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Logo, Favicon, Header & Navigation Bar</h2>
        <p className="text-xs text-slate-500">
          Configure the primary header logo, website browser favicon, logo height, navigation links, and emergency ticker alerts.
        </p>
      </div>

      {/* Logo & Favicon Management */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Logo & Browser Favicon</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUploadField
            label="Primary Header Logo"
            value={header.logoUrl}
            onChange={(url) => updateField('logoUrl', url)}
            token={token}
            hint="Displays on navbar. Recommended: PNG with transparent background."
            category="logo"
          />

          <ImageUploadField
            label="Browser Tab Favicon"
            value={header.faviconUrl || '/images/hospital-emblem-clean.png'}
            onChange={(url) => updateField('faviconUrl', url)}
            token={token}
            hint="Small icon shown on browser tab title and mobile bookmarks."
            category="logo"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Logo Height in Navigation Bar (px)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="36"
                max="80"
                value={header.logoHeight || 52}
                onChange={(e) => updateField('logoHeight', parseInt(e.target.value))}
                className="flex-1 accent-teal-600 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-700 w-12 text-right">
                {header.logoHeight || 52}px
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Logo Position on Header</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField('logoPosition', 'left')}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  header.logoPosition === 'left'
                    ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Left (Standard)</span>
              </button>

              <button
                type="button"
                onClick={() => updateField('logoPosition', 'center')}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  header.logoPosition === 'center'
                    ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
                <span>Centered</span>
              </button>
            </div>
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

      {/* Navigation Buttons & Links */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">
              Navigation Menu Links & Buttons ({header.navLinks.length})
            </h3>
            <p className="text-[11px] text-slate-500">
              Add, edit or reorder the links displayed in the desktop header and mobile menu drawer.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNavLink}
            className="px-3 py-1.5 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Menu Link</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {header.navLinks.map((link, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 w-6 shrink-0">#{idx + 1}</span>

              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5">Link Button Name</label>
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => handleNavLinkChange(idx, 'name', e.target.value)}
                  placeholder="e.g. Departments"
                  className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-[10px] text-slate-400 font-bold mb-0.5">Section Anchor or URL</label>
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => handleNavLinkChange(idx, 'href', e.target.value)}
                  placeholder="e.g. #departments or https://..."
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="button"
                onClick={() => handleDeleteNavLink(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg shrink-0 mt-3 sm:mt-4 cursor-pointer"
                title="Remove Link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-100">
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

