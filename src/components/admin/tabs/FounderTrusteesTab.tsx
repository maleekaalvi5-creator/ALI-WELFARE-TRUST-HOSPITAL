import React, { useState } from 'react';
import { FounderConfig } from '../../../types/content';
import { LeadershipMember } from '../../../types';
import { ImageUploadField } from '../ImageUploadField';
import { Award, Plus, Trash2, Heart, ShieldCheck } from 'lucide-react';

interface FounderTrusteesTabProps {
  founder: FounderConfig;
  onChange: (updated: FounderConfig) => void;
  token: string;
}

export const FounderTrusteesTab: React.FC<FounderTrusteesTabProps> = ({
  founder,
  onChange,
  token
}) => {
  const [activeTrusteeIndex, setActiveTrusteeIndex] = useState(0);

  const updateFounderField = <K extends keyof FounderConfig>(field: K, value: FounderConfig[K]) => {
    onChange({ ...founder, [field]: value });
  };

  const handleUpdateTrustee = (idx: number, updated: LeadershipMember) => {
    const list = [...founder.executiveTeam];
    list[idx] = updated;
    updateFounderField('executiveTeam', list);
  };

  const handleAddTrustee = () => {
    const newTrustee: LeadershipMember = {
      id: `trustee-${Date.now()}`,
      name: "New Trustee / Director Name",
      title: "Board of Trustees Member",
      role: "Trustee",
      bio: "Dedicated to community welfare healthcare governance and development.",
      imageUrl: "/images/director-khawar-awan.jpg",
      quote: "Serving humanity with unwavering integrity and devotion."
    };
    const list = [...founder.executiveTeam, newTrustee];
    updateFounderField('executiveTeam', list);
    setActiveTrusteeIndex(list.length - 1);
  };

  const handleDeleteTrustee = (idx: number) => {
    if (founder.executiveTeam.length <= 1) {
      alert("At least one trustee/executive member must remain.");
      return;
    }
    if (confirm("Are you sure you want to remove this Board of Trustee member?")) {
      const list = founder.executiveTeam.filter((_, i) => i !== idx);
      updateFounderField('executiveTeam', list);
      setActiveTrusteeIndex(Math.max(0, idx - 1));
    }
  };

  const currentTrustee = founder.executiveTeam[activeTrusteeIndex] || founder.executiveTeam[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Founder Memorial Tribute & Board of Trustees</h2>
        <p className="text-xs text-slate-500">
          Edit the memorial section for Late Nazar Hussain Alvi, upload founder portrait, and manage the Board of Trustees with their photos and bios.
        </p>
      </div>

      {/* Founder Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-amber-900 tracking-wider">Late Founder Memorial</h3>
            <p className="text-[11px] text-slate-500">Cornerstone visionary patron (2005)</p>
          </div>
        </div>

        <ImageUploadField
          label="Founder Memorial Photograph"
          value={founder.imageUrl}
          onChange={(url) => updateFounderField('imageUrl', url)}
          token={token}
          hint="Portrait photograph of Late Nazar Hussain Alvi displayed in the memorial tribute card."
          category="founder"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Founder Full Name</label>
            <input
              type="text"
              value={founder.name}
              onChange={(e) => updateFounderField('name', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Designation & Title</label>
            <input
              type="text"
              value={founder.title}
              onChange={(e) => updateFounderField('title', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Urdu Honorific Title</label>
            <input
              type="text"
              dir="rtl"
              value={founder.urduTitle}
              onChange={(e) => updateFounderField('urduTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-urdu"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Founder Role Badge</label>
            <input
              type="text"
              value={founder.role}
              onChange={(e) => updateFounderField('role', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Founder Inspiring Quote</label>
          <input
            type="text"
            value={founder.quote}
            onChange={(e) => updateFounderField('quote', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 italic"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Founder Biography & Memorial Tribute</label>
          <textarea
            rows={3}
            value={founder.bio}
            onChange={(e) => updateFounderField('bio', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed"
          />
        </div>
      </div>

      {/* Board of Trustees Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">
              Board of Trustees & Leadership Team ({founder.executiveTeam.length} Members)
            </h3>
            <p className="text-[11px] text-slate-500">
              Add, remove, or edit trustee profiles, leadership roles, and their individual photos.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddTrustee}
            className="px-3 py-1.5 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Trustee</span>
          </button>
        </div>

        {/* Trustee Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
          {founder.executiveTeam.map((m, idx) => (
            <button
              key={m.id || idx}
              type="button"
              onClick={() => setActiveTrusteeIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
                activeTrusteeIndex === idx
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{m.name || `Member ${idx + 1}`}</span>
            </button>
          ))}
        </div>

        {/* Selected Trustee Editor */}
        {currentTrustee && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Editing: {currentTrustee.name}</span>
              <button
                type="button"
                onClick={() => handleDeleteTrustee(activeTrusteeIndex)}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Trustee</span>
              </button>
            </div>

            <ImageUploadField
              label="Trustee / Director Photo"
              value={currentTrustee.imageUrl}
              onChange={(url) => handleUpdateTrustee(activeTrusteeIndex, { ...currentTrustee, imageUrl: url })}
              token={token}
              category="trustee"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={currentTrustee.name}
                  onChange={(e) => handleUpdateTrustee(activeTrusteeIndex, { ...currentTrustee, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Executive Title</label>
                <input
                  type="text"
                  value={currentTrustee.title}
                  onChange={(e) => handleUpdateTrustee(activeTrusteeIndex, { ...currentTrustee, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Role / Department</label>
                <input
                  type="text"
                  value={currentTrustee.role}
                  onChange={(e) => handleUpdateTrustee(activeTrusteeIndex, { ...currentTrustee, role: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Personal Quote</label>
                <input
                  type="text"
                  value={currentTrustee.quote || ''}
                  onChange={(e) => handleUpdateTrustee(activeTrusteeIndex, { ...currentTrustee, quote: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Trustee Profile Biography</label>
              <textarea
                rows={3}
                value={currentTrustee.bio}
                onChange={(e) => handleUpdateTrustee(activeTrusteeIndex, { ...currentTrustee, bio: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
