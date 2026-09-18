import React from 'react';
import { ContactConfig } from '../../../types/content';
import { MapPin, Phone, Plus, Trash2, Globe, Mail, Clock } from 'lucide-react';

interface ContactFooterTabProps {
  contact: ContactConfig;
  onChange: (updated: ContactConfig) => void;
}

export const ContactFooterTab: React.FC<ContactFooterTabProps> = ({ contact, onChange }) => {
  const updateField = <K extends keyof ContactConfig>(field: K, value: ContactConfig[K]) => {
    onChange({ ...contact, [field]: value });
  };

  const handleUpdateNumber = (idx: number, val: string) => {
    const list = [...contact.contactNumbers];
    list[idx] = val;
    updateField('contactNumbers', list);
  };

  const handleAddNumber = () => {
    updateField('contactNumbers', [...contact.contactNumbers, "03001234567"]);
  };

  const handleDeleteNumber = (idx: number) => {
    if (contact.contactNumbers.length <= 1) {
      alert("At least one contact phone number must remain.");
      return;
    }
    updateField('contactNumbers', contact.contactNumbers.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Hospital Location, Phone Numbers & Footer</h2>
        <p className="text-xs text-slate-500">
          Add or remove contact phone numbers, update hospital geographical location, address, Google Maps links, and footer copy.
        </p>
      </div>

      {/* Multiple Phone Numbers Management */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-teal-700" />
            <div>
              <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
                Hospital Contact Phone Numbers ({contact.contactNumbers.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                You can add as many phone numbers as needed. Displays in the contact section and footer.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddNumber}
            className="px-3 py-1.5 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Phone Number</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {contact.contactNumbers.map((num, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 w-5 text-center shrink-0">#{idx + 1}</span>
              <input
                type="text"
                value={num}
                onChange={(e) => handleUpdateNumber(idx, e.target.value)}
                placeholder="e.g. 03324711101"
                className="flex-1 px-2.5 py-1.5 text-xs font-bold font-mono rounded-lg border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              />
              <button
                type="button"
                onClick={() => handleDeleteNumber(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg shrink-0"
                title="Remove this phone number"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Emergency 24/7 Phone</label>
            <input
              type="text"
              value={contact.emergencyPhone}
              onChange={(e) => updateField('emergencyPhone', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold font-mono rounded-xl border border-slate-200 bg-white text-rose-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Helpline Phone</label>
            <input
              type="text"
              value={contact.helpline}
              onChange={(e) => updateField('helpline', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold font-mono rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Official</label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold font-mono rounded-xl border border-slate-200 bg-white text-emerald-700"
            />
          </div>
        </div>
      </div>

      {/* Address & Geographical Location */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <MapPin className="w-5 h-5 text-teal-700" />
          <div>
            <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">Hospital Physical Location</h3>
            <p className="text-[11px] text-slate-500">Official campus location and Google Maps integration</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Campus Address</label>
          <input
            type="text"
            value={contact.address}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Location Short Summary (Header / Ticker)</label>
          <input
            type="text"
            value={contact.locationDescription}
            onChange={(e) => updateField('locationDescription', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">OPD Operating Hours</label>
            <input
              type="text"
              value={contact.opdHours}
              onChange={(e) => updateField('opdHours', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Direct Link</label>
          <input
            type="text"
            value={contact.googleMapsLink}
            onChange={(e) => updateField('googleMapsLink', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Embed URL</label>
          <input
            type="text"
            value={contact.mapEmbedUrl}
            onChange={(e) => updateField('mapEmbedUrl', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
          />
        </div>
      </div>

      {/* Footer Copy & Rights */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Footer Copyright & Description</h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Footer Hospital Description</label>
          <textarea
            rows={2}
            value={contact.footerDescription}
            onChange={(e) => updateField('footerDescription', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Copyright Statement</label>
          <input
            type="text"
            value={contact.copyrightText}
            onChange={(e) => updateField('copyrightText', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
          />
        </div>
      </div>
    </div>
  );
};
