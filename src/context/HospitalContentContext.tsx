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

export const HospitalContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<HospitalContent>(DEFAULT_HOSPITAL_CONTENT);
  const [loading, setLoading] = useState(true);

  // Load from API (permanent storage) on start
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (e) {
        console.error('Failed to load from API, using default');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateContent = async (newContent: HospitalContent) => {
    const updated = {
      ...newContent,
      revision: (content.revision || 1) + 1,
      updatedAt: Date.now()
    };
    
    // Optimistic update - show immediately
    setContent(updated);
    
    // Save permanently for ALL users via API
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      
      if (!res.ok) throw new Error('Save failed');
      
      // Also keep backup in localStorage
      localStorage.setItem('hospital_content_backup', JSON.stringify(updated));
      
      alert('✅ Saved! Ab ye change puri website par sab ko nazar ayega');
    } catch (e) {
      alert('⚠️ Internet issue, lekin aapke browser me save ho gaya hai');
      localStorage.setItem('hospital_content_backup', JSON.stringify(updated));
    }
  };

  const resetToDefault = async () => {
    if (!confirm('Kya aap sab kuch default par wapas lana chahte ho?')) return;
    setContent(DEFAULT_HOSPITAL_CONTENT);
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(DEFAULT_HOSPITAL_CONTENT)
    });
    localStorage.removeItem('hospital_content_backup');
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
