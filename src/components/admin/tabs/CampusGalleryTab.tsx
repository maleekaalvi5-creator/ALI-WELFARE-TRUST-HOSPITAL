import React, { useState } from 'react';
import { CampusConfig, PhotoFrameItem } from '../../../types/content';
import { GalleryItem } from '../../../types';
import { ImageUploadField } from '../ImageUploadField';
import { Plus, Trash2, Image as ImageIcon, Frame, Building } from 'lucide-react';

interface CampusGalleryTabProps {
  campus: CampusConfig;
  onChange: (updated: CampusConfig) => void;
  token: string;
}

export const CampusGalleryTab: React.FC<CampusGalleryTabProps> = ({
  campus,
  onChange,
  token
}) => {
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  // Facility handlers
  const handleUpdateFacility = (idx: number, updated: GalleryItem) => {
    const list = [...campus.facilities];
    list[idx] = updated;
    onChange({ ...campus, facilities: list });
  };

  const handleAddFacility = () => {
    const newFacility: GalleryItem = {
      id: `facility-${Date.now()}`,
      title: "New Campus Facility Wing",
      category: "facilities",
      imageUrl: "/images/hospital-building.jpg",
      description: "Equipped with modern healthcare amenities and comfortable patient rooms."
    };
    const list = [...campus.facilities, newFacility];
    onChange({ ...campus, facilities: list });
    setActiveFacilityIndex(list.length - 1);
  };

  const handleDeleteFacility = (idx: number) => {
    if (campus.facilities.length <= 1) {
      alert("At least one facility card must remain.");
      return;
    }
    const list = campus.facilities.filter((_, i) => i !== idx);
    onChange({ ...campus, facilities: list });
    setActiveFacilityIndex(Math.max(0, idx - 1));
  };

  // Photo frame handlers
  const handleUpdateFrame = (idx: number, updated: PhotoFrameItem) => {
    const list = [...campus.photoFrames];
    list[idx] = updated;
    onChange({ ...campus, photoFrames: list });
  };

  const handleAddFrame = () => {
    const newFrame: PhotoFrameItem = {
      id: `frame-${Date.now()}`,
      title: "Hospital Photo Frame",
      caption: "View of hospital facilities and patient care",
      imageUrl: "/images/hospital-aerial.jpg",
      dateAdded: "Hospital Campus"
    };
    const list = [...campus.photoFrames, newFrame];
    onChange({ ...campus, photoFrames: list });
    setActiveFrameIndex(list.length - 1);
  };

  const handleDeleteFrame = (idx: number) => {
    if (campus.photoFrames.length <= 1) {
      alert("At least one photo frame must remain.");
      return;
    }
    const list = campus.photoFrames.filter((_, i) => i !== idx);
    onChange({ ...campus, photoFrames: list });
    setActiveFrameIndex(Math.max(0, idx - 1));
  };

  const currentFacility = campus.facilities[activeFacilityIndex] || campus.facilities[0];
  const currentFrame = campus.photoFrames[activeFrameIndex] || campus.photoFrames[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Hospital Campus, Facilities & Photo Frames</h2>
        <p className="text-xs text-slate-500">
          Edit campus facility cards, add or remove sections, and manage decorative photo frames and hospital pictures.
        </p>
      </div>

      {/* Campus & Facilities Cards */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-teal-700" />
            <div>
              <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
                Campus Facilities & Department Cards ({campus.facilities.length})
              </h3>
              <p className="text-[11px] text-slate-500">Add or remove facility showcase sections with photos.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddFacility}
            className="px-3 py-1.5 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Facility Section</span>
          </button>
        </div>

        {/* Facility Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 no-scrollbar">
          {campus.facilities.map((fac, idx) => (
            <button
              key={fac.id || idx}
              type="button"
              onClick={() => setActiveFacilityIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                activeFacilityIndex === idx
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{fac.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Facility Editor */}
        {currentFacility && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Editing: {currentFacility.title}</span>
              <button
                type="button"
                onClick={() => handleDeleteFacility(activeFacilityIndex)}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Facility Section</span>
              </button>
            </div>

            <ImageUploadField
              label="Facility Photograph"
              value={currentFacility.imageUrl}
              onChange={(url) => handleUpdateFacility(activeFacilityIndex, { ...currentFacility, imageUrl: url })}
              token={token}
              category="facility"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Facility Title</label>
                <input
                  type="text"
                  value={currentFacility.title}
                  onChange={(e) => handleUpdateFacility(activeFacilityIndex, { ...currentFacility, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Category</label>
                <select
                  value={currentFacility.category}
                  onChange={(e) => handleUpdateFacility(activeFacilityIndex, { ...currentFacility, category: e.target.value as any })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                >
                  <option value="exterior">Exterior Campus & Buildings</option>
                  <option value="facilities">Clinical Facilities & Equipment</option>
                  <option value="wards">Inpatient Wards & Rooms</option>
                  <option value="campus">General Campus Grounds</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
              <textarea
                rows={2}
                value={currentFacility.description}
                onChange={(e) => handleUpdateFacility(activeFacilityIndex, { ...currentFacility, description: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* Decorative Photo Frames Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Frame className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="text-xs font-black uppercase text-amber-900 tracking-wider">
                Photo Frames & Picture Showcase ({campus.photoFrames.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Add photo frames with photographs and descriptive badges to the website gallery.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddFrame}
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Photo Frame</span>
          </button>
        </div>

        {/* Frames Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 no-scrollbar">
          {campus.photoFrames.map((frame, idx) => (
            <button
              key={frame.id || idx}
              type="button"
              onClick={() => setActiveFrameIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                activeFrameIndex === idx
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{frame.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Frame Editor */}
        {currentFrame && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Editing Photo Frame: {currentFrame.title}</span>
              <button
                type="button"
                onClick={() => handleDeleteFrame(activeFrameIndex)}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Frame</span>
              </button>
            </div>

            <ImageUploadField
              label="Photo Frame Picture"
              value={currentFrame.imageUrl}
              onChange={(url) => handleUpdateFrame(activeFrameIndex, { ...currentFrame, imageUrl: url })}
              token={token}
              category="photo_frame"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Frame Title</label>
                <input
                  type="text"
                  value={currentFrame.title}
                  onChange={(e) => handleUpdateFrame(activeFrameIndex, { ...currentFrame, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Frame Tag / Badge</label>
                <input
                  type="text"
                  value={currentFrame.dateAdded || ''}
                  onChange={(e) => handleUpdateFrame(activeFrameIndex, { ...currentFrame, dateAdded: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Caption</label>
              <input
                type="text"
                value={currentFrame.caption}
                onChange={(e) => handleUpdateFrame(activeFrameIndex, { ...currentFrame, caption: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
