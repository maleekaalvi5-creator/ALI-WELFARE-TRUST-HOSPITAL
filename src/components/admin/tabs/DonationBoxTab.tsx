import React from 'react';
import { BankConfig } from '../../../types/content';
import { DonationCause } from '../../../types';
import { Building2, Plus, Trash2, HeartHandshake, CheckCircle } from 'lucide-react';

interface DonationBoxTabProps {
  bank: BankConfig;
  causes: DonationCause[];
  onBankChange: (updated: BankConfig) => void;
  onCausesChange: (updated: DonationCause[]) => void;
}

export const DonationBoxTab: React.FC<DonationBoxTabProps> = ({
  bank,
  causes,
  onBankChange,
  onCausesChange
}) => {
  const updateBank = <K extends keyof BankConfig>(field: K, value: BankConfig[K]) => {
    onBankChange({ ...bank, [field]: value });
  };

  const handleUpdateCause = (idx: number, field: keyof DonationCause, val: any) => {
    const list = [...causes];
    list[idx] = { ...list[idx], [field]: val };
    onCausesChange(list);
  };

  const handleAddCause = () => {
    const newCause: DonationCause = {
      id: `cause-${Date.now()}`,
      title: "New Welfare Healthcare Fund",
      urduTitle: "مستحق مریضوں کے لیے خصوصی فنڈ",
      description: "Direct patient sponsorship for life-saving clinical and surgical treatments.",
      suggestedAmount: 5000,
      impactNote: "Directly funds emergency medications and procedures",
      badge: "Zakat Eligible"
    };
    onCausesChange([...causes, newCause]);
  };

  const handleDeleteCause = (idx: number) => {
    if (causes.length <= 1) return;
    onCausesChange(causes.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Donation Box & Bank Account Details</h2>
        <p className="text-xs text-slate-500">
          Fully configure the official banking channels, Meezan Bank IBAN, account numbers, EasyPaisa, and charitable causes.
        </p>
      </div>

      {/* Official Bank Account Information */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Meezan Bank Account Credentials</h3>
            <p className="text-[11px] text-slate-500">Official charitable trust account details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Bank Name</label>
            <input
              type="text"
              value={bank.bankName}
              onChange={(e) => updateBank('bankName', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Account Title</label>
            <input
              type="text"
              value={bank.accountTitle}
              onChange={(e) => updateBank('accountTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Account Number</label>
            <input
              type="text"
              value={bank.accountNo}
              onChange={(e) => updateBank('accountNo', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Official IBAN (24 Characters)</label>
            <input
              type="text"
              value={bank.iban}
              onChange={(e) => updateBank('iban', e.target.value)}
              className="w-full px-3 py-2 text-xs font-extrabold rounded-xl border border-teal-300 bg-teal-50/40 text-teal-950 font-mono tracking-wider"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Branch Name</label>
            <input
              type="text"
              value={bank.branchName}
              onChange={(e) => updateBank('branchName', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Branch Code</label>
            <input
              type="text"
              value={bank.branchCode}
              onChange={(e) => updateBank('branchCode', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">City / Location</label>
            <input
              type="text"
              value={bank.city}
              onChange={(e) => updateBank('city', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tax / Charity Status</label>
            <input
              type="text"
              value={bank.taxStatus}
              onChange={(e) => updateBank('taxStatus', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>
        </div>

        {/* Mobile Banking Options */}
        <div className="pt-3 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 mb-3">Mobile Wallets & Microfinance Options</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-emerald-800 mb-1">EasyPaisa Account Number</label>
              <input
                type="text"
                value={bank.easypaisaNo || ''}
                onChange={(e) => updateBank('easypaisaNo', e.target.value)}
                placeholder="0345..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-emerald-50/40 text-slate-800 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-red-800 mb-1">JazzCash Account Number</label>
              <input
                type="text"
                value={bank.jazzcashNo || ''}
                onChange={(e) => updateBank('jazzcashNo', e.target.value)}
                placeholder="0332..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-red-300 bg-red-50/40 text-slate-800 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Donation Appeals */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Urdu Donation Appeal Statement</label>
            <input
              type="text"
              dir="rtl"
              value={bank.appealUrdu}
              onChange={(e) => updateBank('appealUrdu', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-urdu text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">English Donation Appeal Statement</label>
            <textarea
              rows={2}
              value={bank.appealEnglish}
              onChange={(e) => updateBank('appealEnglish', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Charitable Causes */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">
              Charitable Causes & Sponsorship Programs ({causes.length})
            </h3>
            <p className="text-[11px] text-slate-500">
              Preset donation amounts and cause descriptions shown in the donation section.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddCause}
            className="px-3 py-1.5 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Cause</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {causes.map((cause, idx) => (
            <div key={cause.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800">Cause #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteCause(idx)}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Cause Title (English)</label>
                <input
                  type="text"
                  value={cause.title}
                  onChange={(e) => handleUpdateCause(idx, 'title', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Cause Title (Urdu)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={cause.urduTitle}
                  onChange={(e) => handleUpdateCause(idx, 'urduTitle', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-urdu"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Suggested Amount (PKR)</label>
                  <input
                    type="number"
                    value={cause.suggestedAmount}
                    onChange={(e) => handleUpdateCause(idx, 'suggestedAmount', Number(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={cause.badge}
                    onChange={(e) => handleUpdateCause(idx, 'badge', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Impact Description</label>
                <textarea
                  rows={2}
                  value={cause.description}
                  onChange={(e) => handleUpdateCause(idx, 'description', e.target.value)}
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
