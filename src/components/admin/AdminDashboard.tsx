import React, { useState, useEffect, useRef } from 'react';

type Content = any;

export function AdminDashboard({ onNavigateHome, onNavigateLogin }: any) {
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('header');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const saveTimeoutRef = useRef<any>(null);
  const isFirstLoad = useRef(true);

  // Load once
  useEffect(() => {
    const load = async () => {
      try {
        const saved = localStorage.getItem('awt_admin_content');
        if (saved) {
          setContent(JSON.parse(saved));
        } else {
          // Default minimal content
          setContent({
            header: { logo: '', brandName: 'Ali Welfare Trust Hospital', tagline: '(A Non-profitable, Regd, Orgniaztn Devoted to provide health facilities)' },
            navLinks: [
              { name: 'Home', url: '#hero' },
              { name: 'Departments', url: '#departments' },
              { name: 'Doctors', url: '#doctors' },
              { name: 'Founder', url: '#founder' },
            ]
          });
        }
      } catch {}
    };
    load();
  }, []);

  // STOP AUTO-SAVE LOOP - Only mark as unsaved, don't auto-save
  const markUnsaved = (newContent: any) => {
    setContent(newContent);
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    setHasUnsaved(true);
    setStatus('Unsaved Edits');
  };

  // MANUAL SAVE - Instant, with timeout protection
  const saveNow = async () => {
    if (!content) return;
    
    // Prevent double save
    if (saving) return;
    
    setSaving(true);
    setStatus('Saving...');
    
    // Timeout protection - if save takes more than 5 seconds, force stop
    const timeoutId = setTimeout(() => {
      setSaving(false);
      setStatus('⚠️ Save timeout - Saved locally');
      localStorage.setItem('awt_admin_content', JSON.stringify(content));
      setHasUnsaved(false);
    }, 5000);

    try {
      // 1. Save to localStorage instantly (always works)
      localStorage.setItem('awt_admin_content', JSON.stringify(content));
      localStorage.setItem('awt_content', JSON.stringify(content));
      
      // 2. Try to save to API with 3 second timeout
      const controller = new AbortController();
      const apiTimeout = setTimeout(() => controller.abort(), 3000);
      
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
        signal: controller.signal
      });
      
      clearTimeout(apiTimeout);
      clearTimeout(timeoutId);
      
      if (res.ok) {
        setStatus('✅ Saved to Live Site!');
        setHasUnsaved(false);
        // Trigger global update
        window.dispatchEvent(new Event('awt_content_updated'));
      } else {
        setStatus('💾 Saved Locally (API offline)');
        setHasUnsaved(false);
      }
    } catch (e: any) {
      clearTimeout(timeoutId);
      if (e.name === 'AbortError') {
        setStatus('💾 Saved Locally (API timeout - site will update from cache)');
      } else {
        setStatus('💾 Saved Locally');
      }
      setHasUnsaved(false);
      // Always save locally even if API fails
      localStorage.setItem('awt_admin_content', JSON.stringify(content));
    } finally {
      setSaving(false);
      setTimeout(() => {
        if (!hasUnsaved) setStatus('');
      }, 3000);
    }
  };

  // Force stop saving if stuck
  const forceStopSaving = () => {
    setSaving(false);
    setStatus('🛑 Stopped - Saved locally');
    if (content) {
      localStorage.setItem('awt_admin_content', JSON.stringify(content));
    }
    setHasUnsaved(false);
    setTimeout(() => setStatus(''), 2000);
  };

  if (!content) {
    return <div className="min-h-screen flex items-center justify-center">Loading admin...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      {/* TOP BAR - FIXED SAVING ISSUE */}
      <div className="bg-[#0f2e38] text-white px-4 py-2.5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm">Admin Portal</span>
          {hasUnsaved && <span className="text-[11px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-2.5 py-1 rounded-full">● Unsaved Edits</span>}
          {saving && <span className="text-[11px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full animate-pulse">Saving to Live Site...</span>}
          {status && !saving && <span className="text-[11px] bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full">{status}</span>}
        </div>
        <div className="flex items-center gap-2">
          {saving ? (
            <button onClick={forceStopSaving} className="px-4 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-xs hover:bg-red-500/30">🛑 Stop & Save Locally</button>
          ) : (
            <button onClick={saveNow} disabled={!hasUnsaved} className={`px-5 py-1.5 rounded-full text-xs font-bold ${hasUnsaved ? 'bg-[#14b8a6] text-white hover:bg-[#0d9488]' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}>💾 Save Now</button>
          )}
          <button onClick={()=>window.open('/', '_blank')} className="px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs">Preview Live Site</button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - simplified */}
        <div className="w-64 bg-white border-r p-4 hidden md:block">
          <div className="space-y-1">
            {[
              { id: 'header', label: 'Logo & Header', count: '' },
              { id: 'slides', label: 'Slides / Banner', count: '' },
              { id: 'departments', label: 'Departments', count: '12' },
              { id: 'doctors', label: 'Doctors', count: '12' },
            ].map(item=>(
              <button key={item.id} onClick={()=>setActiveTab(item.id)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex justify-between items-center ${activeTab===item.id ? 'bg-[#14b8a6]/10 text-[#0f6b62] font-bold border border-[#14b8a6]/20' : 'text-gray-600 hover:bg-gray-50'}`}>
                <span>{item.label}</span>
                {item.count && <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded-full">{item.count}</span>}
              </button>
            ))}
          </div>
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-[11px] text-yellow-800 font-bold">⚡ Fix Applied:</p>
            <p className="text-[11px] text-yellow-700 mt-1 leading-relaxed">Auto-save band hai. Ab "Save Now" dabao to 2 sec me save hoga. Agar atak jaye to "Stop & Save Locally" dabao.</p>
          </div>
        </div>

        {/* Main Content - Your existing Logo/Header section but with fixed save */}
        <div className="flex-1 p-4 md:p-6">
          {activeTab==='header' && (
            <div className="bg-white rounded-2xl border p-5">
              <h2 className="font-bold text-[#062e38]">Logo, Favicon, Header & Navigation Bar</h2>
              <p className="text-xs text-gray-500 mt-1">Ab har change par auto-save nahi hoga. Change karo, phir upar "Save Now" dabao.</p>
              
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-700">Hospital Main Brand Name</label>
                  <input 
                    value={content.header?.brandName || ''} 
                    onChange={e=>markUnsaved({ ...content, header: { ...content.header, brandName: e.target.value } })}
                    className="w-full mt-2 px-3 py-3 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Header Subtitle Tagline</label>
                  <input 
                    value={content.header?.tagline || ''} 
                    onChange={e=>markUnsaved({ ...content, header: { ...content.header, tagline: e.target.value } })}
                    className="w-full mt-2 px-3 py-3 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#062e38] text-white rounded-2xl">
                <h3 className="font-bold text-sm">🔧 Saving Stuck Fix:</h3>
                <ul className="text-xs mt-2 space-y-1 text-[#8ec5d1] list-disc pl-4">
                  <li>Auto-save band kar diya hai - ab loop nahi hoga</li>
                  <li>Change karo, phir upar "Save Now" dabao - 2 sec me save hoga</li>
                  <li>Agar 10 min se saving dikhaye to "Stop & Save Locally" dabao</li>
                  <li>Save hote hi har device/link par dikhega (global API se)</li>
                </ul>
                <button onClick={saveNow} className="mt-4 w-full py-3 bg-[#14b8a6] text-white rounded-xl font-bold">💾 Save All Changes Now (Instant)</button>
              </div>
            </div>
          )}

          {activeTab==='slides' && (
            <div className="bg-white rounded-2xl border p-5">
              <h2 className="font-bold">Slides</h2>
              <p className="text-xs text-gray-500 mt-2">Slides yahan manage karo, Save Now dabao to global save hoga</p>
              <button onClick={saveNow} className="mt-4 px-6 py-3 bg-[#062e38] text-white rounded-xl font-bold">🌍 Save Slides Globally</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
