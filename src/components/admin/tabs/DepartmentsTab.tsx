import React, { useState } from 'react';
import { Department } from '../../../types';
import { ImageUploadField } from '../ImageUploadField';
import { Plus, Trash2, Stethoscope, Clock, ShieldCheck, Check } from 'lucide-react';

interface DepartmentsTabProps {
  departments: Department[];
  onChange: (updated: Department[]) => void;
  token: string;
}

export const DepartmentsTab: React.FC<DepartmentsTabProps> = ({
  departments,
  onChange,
  token
}) => {
  const [activeDeptIndex, setActiveDeptIndex] = useState(0);

  const handleUpdateDept = (idx: number, updated: Department) => {
    const list = [...departments];
    list[idx] = updated;
    onChange(list);
  };

  const handleAddDept = () => {
    const newDept: Department = {
      id: `dept-${Date.now()}`,
      name: "New Clinical Department",
      urduName: "نیا طبی شعبہ",
      shortDesc: "High standard specialized clinical and outpatient diagnostic department.",
      fullDesc: "Equipped with state-of-the-art diagnostic instruments and experienced consultants providing round-the-clock outpatient and inpatient healthcare.",
      iconUrl: "/images/dept-3d-dialysis.jpg",
      badge: "Clinical Center",
      features: [
        "Qualified Medical Specialists",
        "Modern Diagnostic Instruments",
        "Subsidized & Free Care for Needy Patients"
      ],
      headDoctor: "Senior Consultant",
      timings: "Monday - Saturday: 8:00 AM - 8:00 PM",
      emergencyAvailable: true
    };
    const list = [...departments, newDept];
    onChange(list);
    setActiveDeptIndex(list.length - 1);
  };

  const handleDeleteDept = (idx: number) => {
    if (departments.length <= 1) {
      alert("At least one department must remain in the hospital directory.");
      return;
    }
    const deptToDelete = departments[idx];
    if (confirm(`Are you sure you want to permanently delete the department "${deptToDelete.name}"?`)) {
      const list = departments.filter((_, i) => i !== idx);
      onChange(list);
      setActiveDeptIndex(Math.max(0, idx - 1));
    }
  };

  const handleFeatureChange = (deptIdx: number, featIdx: number, val: string) => {
    const dept = departments[deptIdx];
    const newFeatures = [...dept.features];
    newFeatures[featIdx] = val;
    handleUpdateDept(deptIdx, { ...dept, features: newFeatures });
  };

  const handleAddFeature = (deptIdx: number) => {
    const dept = departments[deptIdx];
    handleUpdateDept(deptIdx, { ...dept, features: [...dept.features, "New Service Feature"] });
  };

  const handleDeleteFeature = (deptIdx: number, featIdx: number) => {
    const dept = departments[deptIdx];
    handleUpdateDept(deptIdx, { ...dept, features: dept.features.filter((_, i) => i !== featIdx) });
  };

  const currentDept = departments[activeDeptIndex] || departments[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800">Departments Directory ({departments.length})</h2>
          <p className="text-xs text-slate-500">
            Add new hospital departments, delete obsolete ones, edit clinical descriptions, timings, and upload 3D department photos.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddDept}
          className="px-3.5 py-2 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Department</span>
        </button>
      </div>

      {/* Department Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        {departments.map((d, idx) => (
          <button
            key={d.id || idx}
            type="button"
            onClick={() => setActiveDeptIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
              activeDeptIndex === idx
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{d.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Department Editor */}
      {currentDept && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-400">Department #{activeDeptIndex + 1}</span>
              <h3 className="text-sm font-black text-slate-800">{currentDept.name}</h3>
            </div>
            
            <button
              type="button"
              onClick={() => handleDeleteDept(activeDeptIndex)}
              className="px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Department</span>
            </button>
          </div>

          <ImageUploadField
            label="Department 3D Icon / Photograph"
            value={currentDept.iconUrl}
            onChange={(url) => handleUpdateDept(activeDeptIndex, { ...currentDept, iconUrl: url })}
            token={token}
            hint="Square 3D icon or photograph representing this medical department."
            category="department"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department Name (English)</label>
              <input
                type="text"
                value={currentDept.name}
                onChange={(e) => handleUpdateDept(activeDeptIndex, { ...currentDept, name: e.target.value })}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department Name (Urdu)</label>
              <input
                type="text"
                dir="rtl"
                value={currentDept.urduName}
                onChange={(e) => handleUpdateDept(activeDeptIndex, { ...currentDept, urduName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-urdu"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
              <input
                type="text"
                value={currentDept.badge}
                onChange={(e) => handleUpdateDept(activeDeptIndex, { ...currentDept, badge: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Head Doctor / Senior Lead</label>
              <input
                type="text"
                value={currentDept.headDoctor || ''}
                onChange={(e) => handleUpdateDept(activeDeptIndex, { ...currentDept, headDoctor: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Timings & Availability</label>
              <input
                type="text"
                value={currentDept.timings}
                onChange={(e) => handleUpdateDept(activeDeptIndex, { ...currentDept, timings: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentDept.emergencyAvailable}
                  onChange={(e) => handleUpdateDept(activeDeptIndex, { ...currentDept, emergencyAvailable: e.target.checked })}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs font-bold text-slate-700">24/7 Emergency Available</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Short Summary (Grid Cards)</label>
            <textarea
              rows={2}
              value={currentDept.shortDesc}
              onChange={(e) => handleUpdateDept(activeDeptIndex, { ...currentDept, shortDesc: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Clinical Details (Details Modal)</label>
            <textarea
              rows={3}
              value={currentDept.fullDesc}
              onChange={(e) => handleUpdateDept(activeDeptIndex, { ...currentDept, fullDesc: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed"
            />
          </div>

          {/* Department Features */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700">Key Equipment & Clinical Features</label>
              <button
                type="button"
                onClick={() => handleAddFeature(activeDeptIndex)}
                className="text-xs text-teal-700 font-bold hover:underline"
              >
                + Add Feature
              </button>
            </div>

            <div className="space-y-2">
              {currentDept.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(activeDeptIndex, fIdx, e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(activeDeptIndex, fIdx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
