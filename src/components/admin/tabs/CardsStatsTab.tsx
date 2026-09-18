import React from 'react';
import { QuickStatItem } from '../../../types/content';
import { Layers, Activity, Plus, Trash2 } from 'lucide-react';

interface CardsStatsTabProps {
  stats: QuickStatItem[];
  onChange: (updated: QuickStatItem[]) => void;
}

export const CardsStatsTab: React.FC<CardsStatsTabProps> = ({ stats, onChange }) => {
  const handleUpdateStat = (idx: number, field: keyof QuickStatItem, val: string) => {
    const updated = [...stats];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange(updated);
  };

  const handleAddStat = () => {
    onChange([
      ...stats,
      { label: "New Metric Card", value: "100+", sub: "Verified Stat", icon: "Activity" }
    ]);
  };

  const handleDeleteStat = (idx: number) => {
    if (stats.length <= 1) return;
    onChange(stats.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800">Heading 2 & Performance Metric Cards</h2>
          <p className="text-xs text-slate-500">
            Edit the 3D performance metric cards, numbers, and impact subtitles displayed below the hero marquee.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddStat}
          className="px-3 py-1.5 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Metric Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">Card {idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDeleteStat(idx)}
                className="text-slate-400 hover:text-rose-600 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Metric Number / Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-sm font-extrabold rounded-lg border border-slate-200 bg-white text-teal-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Label / Title</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtitle / Impact Note</label>
              <input
                type="text"
                value={stat.sub}
                onChange={(e) => handleUpdateStat(idx, 'sub', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
