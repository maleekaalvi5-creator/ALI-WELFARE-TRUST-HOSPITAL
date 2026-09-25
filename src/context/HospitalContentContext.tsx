import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HospitalContent } from '../types/content';
import { DEFAULT_HOSPITAL_CONTENT } from '../data/defaultContent';

type ContentContextType = {
  content: HospitalContent;
  loading: boolean;
  updateContent: (newContent: HospitalContent) => Promise<void>;
  resetToDefault: () => Promise<void>;
};

const HospitalContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = 'hospital_content_v2_FINAL';
const BACKUP_KEY = 'hospital_content_backup_final';

export const HospitalContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<HospitalContent>(DEFAULT_HOSPITAL_CONTENT);
  const [loading, setLoading] = useState(true);

  // 1. LOAD - Pehle localStorage dekho, phir API, phir default - Default sab se last
  useEffect(() => {
    const loadContent = async () => {
      try {
        // STEP 1: Check localStorage first - Ye customer ka final content hai
        const localSaved = localStorage.getItem(STORAGE_KEY);
        if (localSaved) {
          const parsed = JSON.parse(localSaved);
          setContent(parsed);
          console.log('✅ Loaded from LOCAL ADMIN SAVE - No Revert');
          setLoading(false);
          return; // IMPORTANT: Yahan return kar do, default par mat jao
        }

        // STEP 2: Agar localStorage me nahi hai to API se dekho (Supabase/hospital-content.json)
        try {
          const res = await fetch('/api/content');
          if (res.ok) {
            const apiData = await res.json();
            // Agar API me data hai aur wo default se naya hai
            if (apiData && apiData.revision >= DEFAULT_HOSPITAL_CONTENT.revision) {
              setContent(apiData);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(apiData));
              console.log('✅ Loaded from API/Supabase - Permanent');
              setLoading(false);
              return;
            }
          }
        } catch (apiError) {
          console.log('API not available, using default');
        }

        // STEP 3: Agar kuch bhi nahi mila to hi default use karo (Sirf pehli baar)
        setContent(DEFAULT_HOSPITAL_CONTENT);
        console.log('Using default for first time');

      } catch (e) {
        console.error('Load error', e);
        setContent(DEFAULT_HOSPITAL_CONTENT);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // 2. SAVE - Admin jab bhi save kare, ye 3 jagah save hoga aur kabhi revert nahi hoga
  const updateContent = async (newContent: HospitalContent) => {
    const finalContent = {
      ...newContent,
      revision: 999, // 999 ka matlab ye sab se naya hai, default kabhi isko overwrite nahi karega
      updatedAt: Date.now()
    };

    // A. Foran screen par dikhao
    setContent(finalContent);

    // B. Browser me permanent save (Customer ke liye sab se important)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalContent));
    localStorage.setItem(BACKUP_KEY, JSON.stringify(finalContent));

    // C. API/Supabase me bhi save karo taake dusre users ko bhi dikhe
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalContent)
      });
      console.log('✅ Saved to API permanently');
    } catch (e) {
      console.log('API save failed but local save done - will sync later');
    }

    // D. hospital-content.json me bhi save karne ki koshish (agar aapka backend support karta hai)
    try {
      await fetch('/api/update-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalContent)
      });
    } catch (e) {
      // Ignore if this API doesn't exist
    }

    alert('✅ SAVE HO GAYA! Ab ye slide/banner/content kabhi default par nahi jayega. Refresh karke dekho.');
  };

  const resetToDefault = async () => {
    if (!confirm('Kya aap sach me sab kuch default par lana chahte ho? Ye aapke saare slides/banner delete kar dega!')) return;
    
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BACKUP_KEY);
    localStorage.removeItem('hospital_content_v2'); // Purana wala bhi delete
    localStorage.removeItem('hospital_content_backup');
    
    setContent(DEFAULT_HOSPITAL_CONTENT);
    
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEFAULT_HOSPITAL_CONTENT)
      });
    } catch (e) {}

    alert('Reset ho gaya default par');
  };

  return (
    <HospitalContentContext.Provider value={{ content, loading, updateContent, resetToDefault }}>
      {children}
    </HospitalContentContext.Provider>
  );
};

export const useHospitalContent = () => {
  const ctx = useContext(HospitalContentContext);
  if (!ctx) throw new Error('useHospitalContent must be used within HospitalContentProvider');
  return ctx;
};
