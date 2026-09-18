import React, { useState } from 'react';
import { Doctor, Department } from '../../../types';
import { ImageUploadField } from '../ImageUploadField';
import { Plus, Trash2, ExternalLink, Stethoscope, Star, Calendar, Clock } from 'lucide-react';

interface DoctorsTabProps {
  doctors: Doctor[];
  departments: Department[];
  onChange: (updated: Doctor[]) => void;
  onPreviewDoctor: (doctorId: string) => void;
  token: string;
}

export const DoctorsTab: React.FC<DoctorsTabProps> = ({
  doctors,
  departments,
  onChange,
  onPreviewDoctor,
  token
}) => {
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);

  const handleUpdateDoctor = (idx: number, updated: Doctor) => {
    const list = [...doctors];
    list[idx] = updated;
    onChange(list);
  };

  const handleAddDoctor = () => {
    const firstDept = departments[0] || { id: 'general', name: 'General Medicine' };
    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: "Dr. New Consultant",
      specialty: "Clinical Specialist & Surgeon",
      designation: "Senior Consultant Physician",
      departmentId: firstDept.id,
      departmentName: firstDept.name,
      consultationDays: "Monday to Saturday",
      timing: "10:00 AM - 2:00 PM & 6:00 PM - 9:00 PM",
      rating: "4.9",
      ratingText: "Expert Care",
      profile: "Distinguished specialist physician providing dedicated clinical patient consultations, diagnostic assessments, and modern treatment plans at Ali Welfare Trust Hospital.",
      qualification: "MBBS, FCPS / Relevant Post-Graduate Specialization",
      experience: "10+ Years Experience",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      imageUrl: "/images/doctor-male-1.jpg",
      specialties: ["Clinical Consultations", "Emergency Care", "Patient Rehabilitation"],
      isAvailableToday: true
    };
    const list = [...doctors, newDoc];
    onChange(list);
    setActiveDoctorIndex(list.length - 1);
  };

  const handleDeleteDoctor = (idx: number) => {
    if (doctors.length <= 1) {
      alert("At least one doctor must remain in the specialist directory.");
      return;
    }
    const docToDelete = doctors[idx];
    if (confirm(`Are you sure you want to permanently delete Dr. ${docToDelete.name}?`)) {
      const list = doctors.filter((_, i) => i !== idx);
      onChange(list);
      setActiveDoctorIndex(Math.max(0, idx - 1));
    }
  };

  const handleDeptSelect = (idx: number, deptId: string) => {
    const selectedDept = departments.find(d => d.id === deptId);
    if (selectedDept) {
      handleUpdateDoctor(idx, {
        ...doctors[idx],
        departmentId: deptId,
        departmentName: selectedDept.name
      });
    }
  };

  const currentDoctor = doctors[activeDoctorIndex] || doctors[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800">Specialist Doctors Directory ({doctors.length})</h2>
          <p className="text-xs text-slate-500">
            Add new medical consultants, delete entries, update high-resolution photos, clinical schedules, and preview their full individual profile page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddDoctor}
          className="px-3.5 py-2 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Doctor Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        {doctors.map((doc, idx) => (
          <button
            key={doc.id || idx}
            type="button"
            onClick={() => setActiveDoctorIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
              activeDoctorIndex === idx
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{doc.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Doctor Editor */}
      {currentDoctor && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-400">Doctor Profile #{activeDoctorIndex + 1}</span>
              <h3 className="text-base font-black text-slate-800">{currentDoctor.name}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPreviewDoctor(currentDoctor.id)}
                className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors border border-teal-200"
                title="Preview this doctor's complete individual page"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Doctor's Full Page</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteDoctor(activeDoctorIndex)}
                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Doctor</span>
              </button>
            </div>
          </div>

          <ImageUploadField
            label="Doctor High-Definition Photograph"
            value={currentDoctor.imageUrl}
            onChange={(url) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, imageUrl: url })}
            token={token}
            hint="Upload doctor's clinical portrait picture. Displays on both the grid card and their full profile page."
            category="doctor"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Doctor Full Name</label>
              <input
                type="text"
                value={currentDoctor.name}
                onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, name: e.target.value })}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Specialty & Field</label>
              <input
                type="text"
                value={currentDoctor.specialty}
                onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, specialty: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Designation & Rank</label>
              <input
                type="text"
                value={currentDoctor.designation}
                onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, designation: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Department</label>
              <select
                value={currentDoctor.departmentId}
                onChange={(e) => handleDeptSelect(activeDoctorIndex, e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Qualifications</label>
              <input
                type="text"
                value={currentDoctor.qualification || ''}
                onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, qualification: e.target.value })}
                placeholder="e.g. MBBS, FCPS (Surgery)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Experience</label>
              <input
                type="text"
                value={currentDoctor.experience || ''}
                onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, experience: e.target.value })}
                placeholder="e.g. 15+ Years Clinical Practice"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Days</label>
              <input
                type="text"
                value={currentDoctor.consultationDays}
                onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, consultationDays: e.target.value })}
                placeholder="Monday to Saturday"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">OPD Hours & Timings</label>
              <input
                type="text"
                value={currentDoctor.timing}
                onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, timing: e.target.value })}
                placeholder="9:00 AM - 2:00 PM"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentDoctor.isAvailableToday}
                  onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, isAvailableToday: e.target.checked })}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs font-bold text-slate-700">Available Today for OPD</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Doctor Full Profile & Biography (Shown on Complete Doctor Page)
            </label>
            <textarea
              rows={3}
              value={currentDoctor.profile}
              onChange={(e) => handleUpdateDoctor(activeDoctorIndex, { ...currentDoctor, profile: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Clinical Procedures & Sub-Specialties (comma-separated)
            </label>
            <input
              type="text"
              value={currentDoctor.specialties ? currentDoctor.specialties.join(', ') : ''}
              onChange={(e) => handleUpdateDoctor(activeDoctorIndex, {
                ...currentDoctor,
                specialties: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
              })}
              placeholder="e.g. Endoscopy, Laparoscopy, General Surgery"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
};
