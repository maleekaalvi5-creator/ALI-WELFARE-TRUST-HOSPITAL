import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Upload file to Supabase storage bucket ('site-assets' or 'hospital-images')
 */
export async function uploadToSupabaseStorage(file: File | Blob, bucket: 'site-assets' | 'hospital-images', pathName: string) {
  if (!supabase) {
    throw new Error("Supabase client is not initialized. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase.storage.from(bucket).upload(pathName, file, {
    cacheControl: '3600',
    upsert: true
  });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return publicUrlData.publicUrl;
}
