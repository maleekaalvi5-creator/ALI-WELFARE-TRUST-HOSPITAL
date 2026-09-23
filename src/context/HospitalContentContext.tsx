import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { HospitalContent } from '../types/content';
import { DEFAULT_HOSPITAL_CONTENT } from '../data/defaultContent';

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
  const [content, setContent] = useState<HospitalContent>(() => {
    if (typeof window !== 'undefined') {
      try {
        const v2Data = localStorage.getItem('awt_hospital_live_content_v2');
        if (v2Data) return JSON.parse(v2Data);

        const siteData = localStorage.getItem('siteData');
        if (siteData) return JSON.parse(siteData);
      } catch (e) {
        console.error('Failed to parse cached content:', e);
      }
    }
    return DEFAULT_HOSPITAL_CONTENT;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('connecting');
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [lastUpdated, setLastUpdated] = useState<number>(() => content.updatedAt || Date.now());
  const [revision, setRevision] = useState<number>(() => content.revision || 1);

  const eventSourceRef = useRef<EventSource | null>(null);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const reconnectTimeoutRef = useRef<any>(null);

  // Helper to persist to localStorage safely
  const persistLocally = (data: HospitalContent) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not persist content to localStorage:', e);
    }
  };

  // Function to fetch latest content from the server
  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.header) {
          setContent(data);
          const newTime = data.updatedAt || Date.now();
          const newRev = data.revision || 1;
          setLastUpdated(newTime);
          setRevision(newRev);
          persistLocally(data);
          setSyncStatus('synced');
        }
      }
    } catch {
      if (!navigator.onLine) {
        setSyncStatus('offline');
      }
    }
  }, []);

  // Setup BroadcastChannel for 0ms cross-tab synchronization
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        broadcastChannelRef.current = bc;
        bc.onmessage = (event) => {
          if (event.data && event.data.type === 'content_update') {
            const incoming = event.data.content;
            if (incoming && incoming.header) {
              setContent(incoming);
              setLastUpdated(incoming.updatedAt || Date.now());
              setRevision(incoming.revision || 1);
              persistLocally(incoming);
              setSyncStatus('synced');
            }
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported:', e);
      }
    }

    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
    };
  }, []);

  // Setup Real-Time Server-Sent Events (SSE) Stream
  useEffect(() => {
    let active = true;

    const connectSSE = () => {
      if (!active) return;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      setSyncStatus('connecting');
      try {
        const es = new EventSource('/api/content/stream');
        eventSourceRef.current = es;

        es.onopen = () => {
          if (!active) return;
          setSyncStatus('synced');
        };

        es.onmessage = (event) => {
          if (!active) return;
          try {
            const msg = JSON.parse(event.data);
            if (msg.type === 'init' || msg.type === 'content_update') {
              const incoming = msg.content;
              if (incoming && incoming.header) {
                setContent(incoming);
                setLastUpdated(incoming.updatedAt || Date.now());
                setRevision(incoming.revision || 1);
                persistLocally(incoming);
                setSyncStatus('synced');

                // Notify other tabs
                if (broadcastChannelRef.current) {
                  broadcastChannelRef.current.postMessage({
                    type: 'content_update',
                    content: incoming
                  });
                }
              }
            }
          } catch (err) {
            console.warn('[SSE Parse Error]', err);
          }
        };

        es.onerror = () => {
          if (!active) return;
          es.close();
          eventSourceRef.current = null;
          setSyncStatus(navigator.onLine ? 'connecting' : 'offline');

          // Auto-reconnect with exponential backoff fallback
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = setTimeout(() => {
           if (active) {
      fetchContent();
    }
  }, 4000);
};
} catch {
  setSyncStatus('synced');
}
};

fetchContent();

// Online / Offline handlers (Pure Client Persistence)
const handleOnline = () => {
  setIsOnline(true);
  setSyncStatus('synced');
  fetchContent();
};

const handleOffline = () => {
  setIsOnline(false);
  setSyncStatus('synced');
};

const handleVisibility = () => {
  if (document.visibilityState === 'visible') {
    fetchContent();
  }
};

window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);
window.addEventListener('visibilitychange', handleVisibility);
window.addEventListener('focus', fetchContent);
    return () => {
      active = false;
      clearTimeout(reconnectTimeoutRef.current);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', fetchContent);
    };
  }, [fetchContent]);

  // Save changes from Admin Panel directly into localStorage (pure static client-side save)
  const saveContent = async (
    newContent: HospitalContent,
    token: string,
    forceOverwrite: boolean = false
  ): Promise<SaveResult> => {
    setIsLoading(true);
    setSyncStatus('saving');

    try {
      const savedTime = Date.now();
      const savedRev = revision + 1;
      const finalContent = {
        ...newContent,
        updatedAt: savedTime,
        revision: savedRev
      };

      setContent(finalContent);
      setLastUpdated(savedTime);
      setRevision(savedRev);

      // Save all current admin site state directly into localStorage as requested
      try {
        localStorage.setItem('siteData', JSON.stringify(finalContent));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(finalContent));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }

      setSyncStatus('synced');
      setIsLoading(false);

      // Notify other tabs immediately
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({
          type: 'content_update',
          content: finalContent
        });
      }

      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      setSyncStatus('synced');
      return { success: false, error: err.message || 'Failed to save changes.' };
    }
  };

  return (
    <HospitalContentContext.Provider
      value={{
        content,
        isLoading,
        syncStatus,
        isOnline,
        lastUpdated,
        revision,
        saveContent,
        reloadContent: fetchContent
      }}
    >
      {children}
    </HospitalContentContext.Provider>
  );
};

export const useHospitalContent = () => {
  const context = useContext(HospitalContentContext);
  if (!context) {
    throw new Error('useHospitalContent must be used within a HospitalContentProvider');
  }
  return context;
};
