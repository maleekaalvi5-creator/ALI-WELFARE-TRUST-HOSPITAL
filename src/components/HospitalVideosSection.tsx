import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Video, Play, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { useHospitalContent } from '../context/HospitalContentContext';
import { HospitalVideoItem } from '../types/content';

export const HospitalVideosSection: React.FC = () => {
  const { content } = useHospitalContent();
  const videos = content.videos || [];
  const [activeVideo, setActiveVideo] = useState<HospitalVideoItem | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section id="videos" className="py-10 sm:py-14 bg-gradient-to-b from-[#f7fafb] to-white relative">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-[#087f8c] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Video className="w-3.5 h-3.5" />
            <span>Video Tours & Documentaries</span>
          </div>

          <div className="font-urdu text-2xl sm:text-3xl font-bold text-[#087f8c] mb-1.5 drop-shadow-xs">
            ہسپتال کے مناظر، ڈاکومنٹری اور ٹور
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#092f3a] tracking-tight">
            Watch Ali Welfare Trust Hospital in Action <br />
            <span className="text-[#087f8c]">Real Patient Care & Modern Facilities</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6b7f84]">
            Explore our state-of-the-art dialysis center, diagnostic laboratories, and welfare initiatives through authentic video documentaries and tours.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {videos.map((vid, idx) => (
            <motion.div
              key={vid.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all group flex flex-col"
            >
              {/* Video Thumbnail / Embed Preview */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img
                  src={vid.thumbnail || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button Overlay */}
                <button
                  type="button"
                  onClick={() => setActiveVideo(vid)}
                  className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-500/90 hover:bg-teal-400 text-white flex items-center justify-center shadow-xl shadow-teal-950/40 hover:scale-110 transition-transform cursor-pointer"
                  aria-label={`Play ${vid.title}`}
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                </button>

                {/* Duration Badge */}
                {vid.duration && (
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-mono font-bold backdrop-blur-xs">
                    {vid.duration}
                  </span>
                )}
              </div>

              {/* Video Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#092f3a] line-clamp-1 group-hover:text-[#087f8c] transition-colors">
                    {vid.title}
                  </h3>
                  {vid.description && (
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {vid.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Official Media
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveVideo(vid)}
                    className="text-[#087f8c] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Watch Video</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-teal-400" />
                <h4 className="font-bold text-sm truncate max-w-md">{activeVideo.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="aspect-video w-full bg-black">
              {activeVideo.embedUrl ? (
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center space-y-3">
                  <Play className="w-12 h-12 text-slate-600" />
                  <p className="text-sm">Video URL: {activeVideo.videoUrl || 'Not provided'}</p>
                  {activeVideo.videoUrl && (
                    <a
                      href={activeVideo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs inline-flex items-center gap-1.5"
                    >
                      <span>Open Video Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
