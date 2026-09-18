import React from 'react';
import { MissionConfig } from '../../../types/content';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface MissionTabProps {
  mission: MissionConfig;
  onChange: (updated: MissionConfig) => void;
}

export const MissionTab: React.FC<MissionTabProps> = ({ mission, onChange }) => {
  const updateField = <K extends keyof MissionConfig>(field: K, value: MissionConfig[K]) => {
    onChange({ ...mission, [field]: value });
  };

  const updatePillar = (idx: number, field: 'title' | 'urdu' | 'desc', val: string) => {
    const updated = [...mission.pillars];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField('pillars', updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Hospital Mission, Vision & Core Values</h2>
        <p className="text-xs text-slate-500">
          Edit the institutional mission and vision statements in both English and Urdu, along with core value pillars.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Mission Statements</h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Mission (English)</label>
          <textarea
            rows={2}
            value={mission.missionEn}
            onChange={(e) => updateField('missionEn', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Mission (Urdu)</label>
          <textarea
            rows={2}
            dir="rtl"
            value={mission.missionUrdu}
            onChange={(e) => updateField('missionUrdu', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-urdu leading-relaxed"
          />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Vision Statements</h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Vision (English)</label>
          <textarea
            rows={2}
            value={mission.visionEn}
            onChange={(e) => updateField('visionEn', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Vision (Urdu)</label>
          <textarea
            rows={2}
            dir="rtl"
            value={mission.visionUrdu}
            onChange={(e) => updateField('visionUrdu', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-urdu leading-relaxed"
          />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Core Value Pillars</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mission.pillars.map((pillar, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold text-teal-800">Pillar {idx + 1}</span>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Title (English)</label>
                <input
                  type="text"
                  value={pillar.title}
                  onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Title (Urdu)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={pillar.urdu}
                  onChange={(e) => updatePillar(idx, 'urdu', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-urdu"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Pillar Description</label>
                <textarea
                  rows={2}
                  value={pillar.desc}
                  onChange={(e) => updatePillar(idx, 'desc', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
