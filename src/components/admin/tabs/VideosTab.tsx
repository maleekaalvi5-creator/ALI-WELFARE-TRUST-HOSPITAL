import React, { useState } from 'react';
import { HospitalVideoItem } from '../../../types/content';
import { ImageUploadField } from '../ImageUploadField';
import { Video, Plus, Trash2, Play, ExternalLink, Film, Star } from 'lucide-react';

interface VideosTabProps {
  videos?: HospitalVideoItem[];
  onChange: (updated: HospitalVideoItem[]) => void;
  token: string;
}

const DEFAULT_VIDEOS: HospitalVideoItem[] = [
  {
    id: "vid-1",
    title: "Ali Welfare Trust Hospital Campus Documentary",
    urduTitle: "ہسپتال کی دستاویزی فلم اور خدمات کا جائزہ",
    category: "Documentary",
    youtubeId: "dQw4w9WgXcQ",
    posterUrl: "/images/hospital-building.jpg",
    duration: "04:15",
    description: "A comprehensive documentary showing the founding vision, 24/7 dialysis unit, modern emergency ward, and patient care facilities.",
    isFeatured: true
  },
  {
    id: "vid-2",
    title: "Advanced Kidney Hemodialysis Unit Virtual Tour",
    urduTitle: "جدید ہیمو ڈائیلاسز سینٹر کا تفصیلی معائنہ",
    category: "Renal Center",
    youtubeId: "dQw4w9WgXcQ",
    posterUrl: "/images/gallery-2.jpg",
    duration: "03:40",
    description: "Take a virtual step inside the specialized renal center where deserving patients receive 100% free hemodialysis sessions daily.",
    isFeatured: false
  }
];

export const VideosTab: React.FC<VideosTabProps> = ({
  videos = DEFAULT_VIDEOS,
  onChange,
  token
}) => {
  const currentVideos = videos && videos.length > 0 ? videos : DEFAULT_VIDEOS;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewVideo, setPreviewVideo] = useState<HospitalVideoItem | null>(null);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);

  const activeVideo = currentVideos[selectedIndex] || currentVideos[0];

  const handleUpdate = (updated: HospitalVideoItem) => {
    const list = [...currentVideos];
    list[selectedIndex] = updated;
    onChange(list);
  };

  const handleAddVideo = () => {
    const newVideo: HospitalVideoItem = {
      id: `vid-${Date.now()}`,
      title: "New Video Tour or Medical Camp",
      urduTitle: "ہسپتال کی نئی ویڈیو",
      category: "Campus Tour",
      youtubeId: "",
      videoUrl: "",
      posterUrl: "/images/hospital-building.jpg",
      duration: "03:00",
      description: "Virtual tour showing hospital facilities, doctors, and compassionate patient healthcare.",
      isFeatured: false
    };
    const list = [...currentVideos, newVideo];
    onChange(list);
    setSelectedIndex(list.length - 1);
  };

  const handleDeleteVideo = (idx: number) => {
    if (currentVideos.length <= 1) return;
    const list = currentVideos.filter((_, i) => i !== idx);
    onChange(list);
    setSelectedIndex(Math.max(0, idx - 1));
    setConfirmDeleteIdx(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800">Hospital Video Tours & Documentaries</h2>
          <p className="text-xs text-slate-500">
            Embed YouTube videos, campus documentary tours, free dialysis center videos, and surgical camp footage.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddVideo}
          className="px-3.5 py-2 rounded-xl bg-[#087f8c] hover:bg-[#066570] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video</span>
        </button>
      </div>

      {/* Video Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {currentVideos.map((vid, idx) => (
          <button
            key={vid.id || idx}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2 cursor-pointer transition-all ${
              idx === selectedIndex
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span className="max-w-[180px] truncate">{vid.title || `Video #${idx + 1}`}</span>
            {vid.isFeatured && <Star className="w-3 h-3 fill-amber-300 text-amber-300" />}
          </button>
        ))}
      </div>

      {/* Active Video Editor */}
      {activeVideo && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-teal-700" />
              <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
                Editing: {activeVideo.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewVideo(activeVideo)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-teal-800 flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Test Video Player</span>
              </button>

              {confirmDeleteIdx === selectedIndex ? (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-rose-600">Delete video?</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteVideo(selectedIndex)}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-rose-700"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Yes, Delete</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteIdx(null)}
                    className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDeleteIdx(selectedIndex)}
                  className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Delete this video"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Video Title (English)</label>
              <input
                type="text"
                value={activeVideo.title}
                onChange={(e) => handleUpdate({ ...activeVideo, title: e.target.value })}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Video Title (Urdu)</label>
              <input
                type="text"
                value={activeVideo.urduTitle || ''}
                onChange={(e) => handleUpdate({ ...activeVideo, urduTitle: e.target.value })}
                className="w-full px-3 py-2 text-xs font-urdu font-bold rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Video ID</label>
              <input
                type="text"
                value={activeVideo.youtubeId || ''}
                onChange={(e) => handleUpdate({ ...activeVideo, youtubeId: e.target.value })}
                placeholder="e.g. dQw4w9WgXcQ"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Found at youtube.com/watch?v=<strong>ID</strong></p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category / Tag</label>
              <input
                type="text"
                value={activeVideo.category}
                onChange={(e) => handleUpdate({ ...activeVideo, category: e.target.value })}
                placeholder="e.g. Documentary, Dialysis Unit, Surgery Camp"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Video Duration</label>
              <input
                type="text"
                value={activeVideo.duration || '03:30'}
                onChange={(e) => handleUpdate({ ...activeVideo, duration: e.target.value })}
                placeholder="e.g. 04:15"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Direct MP4/WebM Video URL (Alternative)</label>
            <input
              type="url"
              value={activeVideo.videoUrl || ''}
              onChange={(e) => handleUpdate({ ...activeVideo, videoUrl: e.target.value })}
              placeholder="https://example.com/video.mp4"
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Video Description</label>
            <textarea
              rows={3}
              value={activeVideo.description}
              onChange={(e) => handleUpdate({ ...activeVideo, description: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500 leading-relaxed"
            />
          </div>

          {/* Poster Image */}
          <ImageUploadField
            label="Video Thumbnail Poster Image"
            value={activeVideo.posterUrl || '/images/hospital-building.jpg'}
            onChange={(url) => handleUpdate({ ...activeVideo, posterUrl: url })}
            token={token}
            hint="Display image shown before the user clicks to play the video."
            category="general"
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={activeVideo.isFeatured === true}
              onChange={(e) => handleUpdate({ ...activeVideo, isFeatured: e.target.checked })}
              className="w-4 h-4 text-teal-600 rounded cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs font-bold text-slate-800 cursor-pointer">
              Mark as Featured Showcase Video (Displays prominently in video section)
            </label>
          </div>
        </div>
      )}

      {/* Interactive Modal Video Preview */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="p-3 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <span className="text-xs font-bold truncate">{previewVideo.title}</span>
              <button
                type="button"
                onClick={() => setPreviewVideo(null)}
                className="text-slate-400 hover:text-white px-2 py-0.5 rounded-lg text-xs"
              >
                Close
              </button>
            </div>

            <div className="aspect-video w-full bg-black flex items-center justify-center">
              {previewVideo.youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${previewVideo.youtubeId}?autoplay=1`}
                  title={previewVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : previewVideo.videoUrl ? (
                <video
                  controls
                  autoPlay
                  src={previewVideo.videoUrl}
                  poster={previewVideo.posterUrl}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-6 text-slate-400">
                  <Film className="w-12 h-12 mx-auto mb-2 text-slate-600" />
                  <p className="text-xs">Please provide a YouTube ID or MP4 URL to preview this video.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
