import React from 'react';
import { SEOConfig } from '../../../types/content';
import { ImageUploadField } from '../ImageUploadField';
import { Search, Globe, Share2, CheckCircle2, ShieldAlert, Code2, ExternalLink } from 'lucide-react';

interface SeoTabProps {
  seo?: SEOConfig;
  onChange: (updated: SEOConfig) => void;
  token: string;
}

const DEFAULT_SEO: SEOConfig = {
  metaTitle: "Ali Welfare Trust Hospital | 100% Free Kidney Dialysis & Emergency Care in Gujranwala",
  metaDescription: "Registered Non-Profit Healthcare Trust #1142 in Qila Didar Singh, Gujranwala. Offering 24/7 emergency care, 100% free hemodialysis, specialist doctors, and modern laboratory diagnostics.",
  keywords: "Ali Welfare Trust Hospital, Qila Didar Singh, free dialysis hospital, Gujranwala hospital, non profit hospital Pakistan, zakat hospital Pakistan, free eye surgery",
  ogImage: "/images/hospital-building.jpg",
  ogTitle: "Ali Welfare Trust Hospital — Serving Humanity with Dignity",
  ogDescription: "Dedicated registered non-profit medical trust providing free hemodialysis, round-the-clock emergency care, and modern healthcare facilities.",
  canonicalUrl: "https://aliwelfaretrust.org",
  author: "Ali Welfare Trust",
  robots: "index, follow",
  googleSiteVerification: "",
  jsonLdSchemaEnabled: true,
  hospitalType: "MedicalOrganization",
  priceRange: "Free & Subsidized"
};

export const SeoTab: React.FC<SeoTabProps> = ({ seo = DEFAULT_SEO, onChange, token }) => {
  const current = { ...DEFAULT_SEO, ...seo };

  const updateField = <K extends keyof SEOConfig>(field: K, value: SEOConfig[K]) => {
    onChange({ ...current, [field]: value });
  };

  const titleLength = current.metaTitle?.length || 0;
  const descLength = current.metaDescription?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Search Engine Optimization (SEO) & Social Sharing</h2>
        <p className="text-xs text-slate-500">
          Optimize search engine ranking on Google, configure OpenGraph social preview cards for WhatsApp & Facebook, and inspect Schema.org structured metadata.
        </p>
      </div>

      {/* Live Google Search Result Preview */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-black uppercase text-teal-900 tracking-wider">
              Google Search Result Snippet Preview
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Desktop & Mobile View</span>
        </div>

        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
          <div className="flex items-center gap-2 text-[11px] text-[#202124]">
            <div className="w-4 h-4 rounded-full bg-teal-800 text-white flex items-center justify-center text-[9px] font-black">
              A
            </div>
            <span className="font-semibold">{current.canonicalUrl || 'https://aliwelfaretrust.org'}</span>
            <span className="text-slate-400">› qila-didar-singh</span>
          </div>
          <h4 className="text-base sm:text-lg text-[#1a0dab] hover:underline font-medium cursor-pointer line-clamp-1">
            {current.metaTitle || 'Ali Welfare Trust Hospital | Qila Didar Singh'}
          </h4>
          <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
            {current.metaDescription || 'Registered non-profit healthcare trust in Qila Didar Singh Gujranwala.'}
          </p>
        </div>
      </div>

      {/* Meta Title & Meta Description Inputs */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-teal-800 tracking-wider">Meta Tags & Search Directives</h3>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700">Meta Title (Browser Tab & Google Headline)</label>
            <span className={`text-[11px] font-mono font-bold ${
              titleLength >= 40 && titleLength <= 65 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {titleLength} / 60 chars {titleLength >= 40 && titleLength <= 65 ? '(Optimal)' : ''}
            </span>
          </div>
          <input
            type="text"
            value={current.metaTitle}
            onChange={(e) => updateField('metaTitle', e.target.value)}
            className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 font-sans"
            placeholder="e.g. Ali Welfare Trust Hospital | 100% Free Kidney Dialysis & Emergency Care"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700">Meta Description (Search Snippet Summary)</label>
            <span className={`text-[11px] font-mono font-bold ${
              descLength >= 120 && descLength <= 165 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {descLength} / 160 chars {descLength >= 120 && descLength <= 165 ? '(Optimal)' : ''}
            </span>
          </div>
          <textarea
            rows={3}
            value={current.metaDescription}
            onChange={(e) => updateField('metaDescription', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500 leading-relaxed"
            placeholder="Describe the hospital mission, free dialysis, 24/7 emergency, location, and non-profit registration status."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Search Keywords (Comma-Separated)</label>
          <input
            type="text"
            value={current.keywords}
            onChange={(e) => updateField('keywords', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-teal-500"
            placeholder="Ali Welfare Trust, dialysis Gujranwala, zakat hospital, Qila Didar Singh doctors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Canonical Web Address</label>
            <input
              type="url"
              value={current.canonicalUrl}
              onChange={(e) => updateField('canonicalUrl', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
              placeholder="https://aliwelfaretrust.org"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Robots Search Crawler Directives</label>
            <select
              value={current.robots}
              onChange={(e) => updateField('robots', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            >
              <option value="index, follow">index, follow (Allow full indexing - Recommended)</option>
              <option value="noindex, follow">noindex, follow (Don't index, follow links)</option>
              <option value="noindex, nofollow">noindex, nofollow (Private/Draft)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Google Site Verification Code (Optional)</label>
          <input
            type="text"
            value={current.googleSiteVerification}
            onChange={(e) => updateField('googleSiteVerification', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
            placeholder="google-site-verification token from Google Search Console"
          />
        </div>
      </div>

      {/* Social Media & WhatsApp Sharing Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Share2 className="w-5 h-5 text-teal-700" />
          <div>
            <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
              Social Media & WhatsApp Share Card (OpenGraph)
            </h3>
            <p className="text-[11px] text-slate-500">
              How the hospital link appears when shared on WhatsApp, Facebook, Twitter/X, and LinkedIn.
            </p>
          </div>
        </div>

        <ImageUploadField
          label="Social Share Banner Photo (1200 x 630 px recommended)"
          value={current.ogImage}
          onChange={(url) => updateField('ogImage', url)}
          token={token}
          hint="Clear photo of the hospital campus or dialysis center. Displayed automatically in WhatsApp link previews."
          category="general"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Social Card Title</label>
            <input
              type="text"
              value={current.ogTitle}
              onChange={(e) => updateField('ogTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Social Card Description</label>
            <input
              type="text"
              value={current.ogDescription}
              onChange={(e) => updateField('ogDescription', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>
        </div>

        {/* WhatsApp Preview Simulation */}
        <div className="p-3 bg-[#e5ddd5]/30 rounded-xl border border-emerald-100 max-w-sm">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1.5">
            WhatsApp Link Preview Simulation
          </span>
          <div className="bg-white rounded-lg overflow-hidden shadow-xs border border-slate-200">
            {current.ogImage && (
              <img
                src={current.ogImage}
                alt="Social Card"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            )}
            <div className="p-2.5">
              <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{current.ogTitle || current.metaTitle}</h5>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{current.ogDescription || current.metaDescription}</p>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">aliwelfaretrust.org</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-teal-700" />
            <div>
              <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
                Schema.org MedicalOrganization JSON-LD
              </h3>
              <p className="text-[11px] text-slate-500">
                Helps search engines understand hospital opening hours, telephone numbers, and free emergency services.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={current.jsonLdSchemaEnabled !== false}
              onChange={(e) => updateField('jsonLdSchemaEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        {current.jsonLdSchemaEnabled !== false && (
          <div className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
            <pre>{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "Ali Welfare Trust Hospital",
              "url": current.canonicalUrl || "https://aliwelfaretrust.org",
              "logo": "https://aliwelfaretrust.org/images/hospital-logo-clean.png",
              "description": current.metaDescription,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Chahal Kalan Road, Qila Didar Singh",
                "addressLocality": "Gujranwala",
                "addressRegion": "Punjab",
                "addressCountry": "PK"
              },
              "telephone": "+923324711101",
              "priceRange": current.priceRange || "Free & Subsidized",
              "openingHours": "Mo-Su 00:00-23:59"
            }, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
