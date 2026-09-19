import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Check, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  token: string;
  hint?: string;
  category?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  token,
  hint,
  category = "admin_upload"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setUploadError('File exceeds 20MB limit. Please choose a smaller photo.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      try {
        const res = await fetch('/api/admin/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            dataUrl,
            filename: file.name.replace(/\.[^/.]+$/, ""),
            category
          })
        });

        const data = await res.json();
        if (res.ok && data.url) {
          onChange(data.url);
        } else {
          setUploadError(data.error || 'Failed to upload photo to server');
        }
      } catch (err: any) {
        setUploadError(err.message || 'Network upload error');
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">{label}</label>
        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              mode === 'upload' ? 'bg-teal-100 text-teal-800 font-bold' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Upload File
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              mode === 'url' ? 'bg-teal-100 text-teal-800 font-bold' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Current Image Preview */}
        <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-xs relative group">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-400" />
          )}
        </div>

        {/* Input area */}
        <div className="flex-1 space-y-1">
          {mode === 'upload' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 rounded-xl border border-dashed border-teal-500/50 bg-teal-50/50 hover:bg-teal-50 text-teal-700 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving to server...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Choose Photo from Device</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="/images/example.jpg or https://..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-mono"
              />
              <LinkIcon className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            </div>
          )}

          {hint && <p className="text-[10px] text-slate-500">{hint}</p>}
          {value && (
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
                title="Remove photo from this item"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove Photo</span>
              </button>
            </div>
          )}
          {uploadError && <p className="text-[11px] text-rose-600 font-medium">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
};
