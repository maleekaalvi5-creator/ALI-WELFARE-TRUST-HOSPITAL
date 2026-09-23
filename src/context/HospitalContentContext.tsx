import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { HospitalContent } from '../types/content';
import { DEFAULT_HOSPITAL_CONTENT } from '../data/defaultContent';
import { supabase } from '../lib/supabase';

export type SyncStatus = 'synced' | 'connecting' | 'saving' | 'offline' | 'conflict';

interface SaveResult {
  success: boolean;
  conflict?: boolean;
  error?: string;
  serverUpdatedAt?: number;
  serverRevision?: number;
}

interface HospitalContentContextType {
  content: HospitalContent;
  isLoading: boolean;
  syncStatus: SyncStatus;
  isOnline: boolean;
  lastUpdated: number;
  revision: number;
  saveContent: (newContent: HospitalContent, token: string, forceOverwrite?: boolean) => Promise<SaveResult>;
  reloadContent: () => Promise<void>;
}

const HospitalContentContext = createContext<HospitalContentContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = 'awt_hospital_live_content_v2';
const BROADCAST_CHANNEL_NAME = 'awt_hospital_cross_tab_sync';

export const HospitalContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<HospitalContent>(DEFAULT_HOSPITAL_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('connecting');
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [revision, setRevision] = useState<number>(0);
  const broadcastRef = useRef<BroadcastChannel | null>(null);

  const loadFromSupabase = useCallback(async () => {
    try {
      setSyncStatus('connecting');
      const { data, error } = await supabase
       .from('hospital_content')
       .select('data')
       .eq('id', 1)
       .single();

      if (!error && data && data.data && Object.keys(data.data).length > 0) {
        // Supabase me data mil gaya
        setContent(data.data as HospitalContent);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.data));
        setSyncStatus('synced');
        setLastUpdated(Date.now());
        return true;
      } else {
        // Pehli baar hai, default ko Supabase me daal do
        const local = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (local) {
          setContent(JSON.parse(local));
        }
        setSyncStatus('synced');
        return false;
      }
    } catch (e) {
      // Offline fallback
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        try { setContent(JSON.parse(local)); } catch {}
      }
      setSyncStatus('offline');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromSupabase();

    // Realtime listener - Admin jese hi save kare, website auto update
    const channel = supabase
     .channel('hospital_content_live')
     .on('postgres_changes', { event: '*', schema: 'public', table: 'hospital_content', filter: 'id=eq.1' }, (payload: any) => {
        if (payload.new && payload.new.data) {
          setContent(payload.new.data as HospitalContent);
          setLastUpdated(Date.now());
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload.new.data));
        }
      })
     .subscribe();

    try {
      broadcastRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      broadcastRef.current.onmessage = (ev) => {
        if (ev.data?.type === 'content_updated') {
          setContent(ev.data.content);
        }
      };
    } catch {}

    return () => {
      supabase.removeChannel(channel);
      broadcastRef.current?.close();
    };
  }, [loadFromSupabase]);

  const saveContent = useCallback(async (newContent: HospitalContent, token: string, forceOverwrite?: boolean): Promise<SaveResult> => {
    try {
      setSyncStatus('saving');

      // 1. Supabase me permanent save (YE SAB SE IMPORTANT HAI)
      const { error } = await supabase
       .from('hospital_content')
       .upsert({ id: 1, data: newContent, updated_at: Date.now() }, { onConflict: 'id' });

      if (error) throw error;

      // 2. Local bhi save
      setContent(newContent);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
      setLastUpdated(Date.now());
      setRevision(r => r + 1);
      setSyncStatus('synced');

      try {
        broadcastRef.current?.postMessage({ type: 'content_updated', content: newContent });
      } catch {}

      return { success: true, serverUpdatedAt: Date.now() };
    } catch (err: any) {
      setSyncStatus('offline');
      return { success: false, error: err.message };
    }
  }, []);

  const reloadContent = useCallback(async () => {
    setIsLoading(true);
    await loadFromSupabase();
  }, [loadFromSupabase]);

  return (
    <HospitalContentContext.Provider value={{ content, isLoading, syncStatus, isOnline, lastUpdated, revision, saveContent, reloadContent }}>
      {children}
    </HospitalContentContext.Provider>
  );
};

export const useHospitalContent = () => {
  const ctx = useContext(HospitalContentContext);
  if (!ctx) throw new Error('useHospitalContent must be used within HospitalContentProvider');
  return ctx;
};
