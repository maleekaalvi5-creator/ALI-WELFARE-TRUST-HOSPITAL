import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Eye, MapPin, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/hospitalData';
import { GalleryItem } from '../types';
import { useHospitalContent } from '../context/HospitalContentContext';

export const HospitalGallery: React.FC = () => {
  const { content } = useHospitalContent();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems = content?.campus?.facilities?.length ? content.campus.facilities : GALLERY_ITEMS;

  const filters = [
    { id: 'all', label: 'All Views' },
    { id: 'exterior', label: 'Exterior & Entrance' },
    { id: 'campus', label: 'Aerial & Grounds' },
    { id: 'facilities', label: 'Clinical Suites' },
    { id: 'wards', label: 'Patient Wards' },
  ];

  const filteredItems = selectedFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-8 sm:py-12 bg-[#f7fafb] relative">
      <div className="site-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-[#087f8c] text-xs font-bold uppercase tracking-wider mb-2.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Tour & Infrastructure</span>
          </div>

          <div className="font-urdu text-2xl sm:text-3xl font-bold text-[#087f8c] mb-1.5 drop-shadow-xs">
            ہسپتال کی عمارات، لیب اور وارڈز کے مناظر
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#092f3a] tracking-tight">
            Our Hospital Campus & Facilities <br />
            <span className="text-[#087f8c]">Designed for Comfort & Hygiene</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6b7f84]">
            Take a visual tour through our purpose-built medical complex in Qila Didar Singh, engineered to deliver sterile, modern patient comfort.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-[#087f8c] text-white shadow-md shadow-teal-900/20'
                  : 'bg-white text-[#12343b] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: (index % 3) * 0.15, 
                ease: "easeOut" 
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 group cursor-pointer"
              onClick={() => setActivePhoto(item)}
            >
              <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#092f3a]/80 via-[#092f3a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-[#092f3a]/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h4 className="font-bold text-base text-[#092f3a] group-hover:text-[#087f8c] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6b7f84] mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActivePhoto(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-[400px] sm:h-[480px] bg-black">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-white">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-[#087f8c]">
                  {activePhoto.category}
                </span>
                <h3 className="text-xl font-bold text-[#092f3a] mt-1.5 mb-1">
                  {activePhoto.title}
                </h3>
                <p className="text-sm text-[#6b7f84]">
                  {activePhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
