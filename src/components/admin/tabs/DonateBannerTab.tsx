import React from 'react';
import { DonationPopupConfig } from '../../../types/content';
import { ImageUploadField } from '../ImageUploadField';
import { Clock, Eye, Sparkles, Heart } from 'lucide-react';

interface DonateBannerTabProps {
  banner: DonationPopupConfig;
  onChange: (updated: DonationPopupConfig) => void;
  token: string;
}

export const DonateBannerTab: React.FC<DonateBannerTabProps> = ({ banner, onChange, token }) => {
  const updateField = <K extends keyof DonationPopupConfig>(field: K, value: DonationPopupConfig[K]) => {
    onChange({ ...banner, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Donate Now Modal & Luxury Banner</h2>
        <p className="text-xs text-slate-500">
          Configure the official donation pop-up card, live time display, appeal statements, and background photo.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Banner Display & Live Clock Settings</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={banner.enabled}
              onChange={(e) => updateField('enabled', e.target.checked)}
              className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-800">Enable Auto-Popup Banner</div>
              <div className="text-[10px] text-slate-500">Automatically presents donation appeal to website visitors</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 cursor-pointer">
            <input
              type="checkbox"
              checked={banner.showLiveTime}
              onChange={(e) => updateField('showLiveTime', e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
            />
            <div>
              <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Show Live Current Time on Banner</span>
              </div>
              <div className="text-[10px] text-amber-800">Displays real-time digital clock and date badge</div>
            </div>
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Auto-Popup Trigger Delay (Seconds)</label>
          <input
            type="number"
            min={10}
            max={600}
            value={banner.autoPopupSeconds}
            onChange={(e) => updateField('autoPopupSeconds', Number(e.target.value) || 120)}
            className="w-full max-w-xs px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
          />
          <p className="text-[10px] text-slate-500 mt-1">Default is 120 seconds (2 minutes). Banner also opens whenever a user clicks "Donate Now".</p>
        </div>

        <div className="pt-2">
          <ImageUploadField
            label="Banner Hospital Background Photo"
            value={banner.backgroundImage}
            onChange={(url) => updateField('backgroundImage', url)}
            token={token}
            hint="The background campus photograph behind the luxury donation appeal."
            category="donation_banner"
          />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Titles & Appeal Statements</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Banner Title</label>
            <input
              type="text"
              value={banner.headline}
              onChange={(e) => updateField('headline', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Trust Badge Text</label>
            <input
              type="text"
              value={banner.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Urdu Appeal Message</label>
          <input
            type="text"
            dir="rtl"
            value={banner.appealUrdu}
            onChange={(e) => updateField('appealUrdu', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-urdu text-base"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">English Appeal Statement</label>
          <textarea
            rows={2}
            value={banner.appealEnglish}
            onChange={(e) => updateField('appealEnglish', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
