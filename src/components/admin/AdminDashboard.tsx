import React, { useState, useEffect } from 'react';
import { useHospitalContent } from '../../context/HospitalContentContext';
import { HospitalContent } from '../../types/content';
import { 
  ShieldCheck, 
  Save, 
  Eye, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Layout, 
  Heart, 
  Sparkles, 
  Layers, 
  Award, 
  BookOpen, 
  Stethoscope, 
  UserCheck, 
  Building, 
  Phone, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { HospitalLogo } from '../HospitalLogo';

// Tabs
import { HeaderTab } from './tabs/HeaderTab';
import { DonateBannerTab } from './tabs/DonateBannerTab';
import { HeroSliderTab } from './tabs/HeroSliderTab';
import { CardsStatsTab } from './tabs/CardsStatsTab';
import { FounderTrusteesTab } from './tabs/FounderTrusteesTab';
import { MissionTab } from './tabs/MissionTab';
import { DepartmentsTab } from './tabs/DepartmentsTab';
import { DoctorsTab } from './tabs/DoctorsTab';
import { DonationBoxTab } from './tabs/DonationBoxTab';
import { CampusGalleryTab } from './tabs/CampusGalleryTab';
import { ContactFooterTab } from './tabs/ContactFooterTab';
import { SeoTab } from './tabs/SeoTab';
import { ThemeTab } from './tabs/ThemeTab';
import { PagesSectionsTab } from './tabs/PagesSectionsTab';
import { VideosTab } from './tabs/VideosTab';
import { SecurityAuditTab } from './tabs/SecurityAuditTab';
import { Search, Palette, Video, ShieldAlert } from 'lucide-react';

type TabId = 
  | 'header' 
  | 'pages_sections'
  | 'theme'
  | 'seo'
  | 'donate_banner' 
  | 'hero_slider' 
  | 'cards_stats' 
  | 'founder_trustees' 
  | 'mission' 
  | 'departments' 
  | 'doctors' 
  | 'donation_box' 
  | 'campus_gallery' 
  | 'videos'
  | 'contact_footer'
  | 'security_audit';

interface AdminDashboardProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onPreviewDoctor: (doctorId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateHome,
  onNavigateLogin,
  onPreviewDoctor
}) => {
  const { content, saveContent, reloadContent, isLoading: isContextLoading } = useHospitalContent();
  const [draft, setDraft] = useState<HospitalContent>(content);
  const [activeTab, setActiveTab] = useState<TabId>('header');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [token, setToken] = useState<string>(() => {
    return localStorage.getItem('awt_admin_token') || sessionStorage.getItem('awt_admin_token') || '';
  });

  const [isVerifying, setIsVerifying] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync draft when initial content loads
  useEffect(() => {
    if (content) {
      setDraft(content);
    }
  }, [content]);

  // Verify authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('awt_admin_token') || sessionStorage.getItem('awt_admin_token');
      if (!storedToken) {
        onNavigateLogin();
        return;
      }

      try {
        const res = await fetch('/api/admin/verify', {
          headers: { 'Authorization': `Bearer ${storedToken}` }
        });
        if (!res.ok) {
          localStorage.removeItem('awt_admin_token');
          sessionStorage.removeItem('awt_admin_token');
          onNavigateLogin();
          return;
        }
        setToken(storedToken);
        setIsVerifying(false);
      } catch {
        // Network failure; if token exists allow local draft
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, [onNavigateLogin]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch {}
    localStorage.removeItem('awt_admin_token');
    sessionStorage.removeItem('awt_admin_token');
    onNavigateLogin();
  };

  // Save All Changes to Live Website
  const handleSaveLive = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    // Append an audit log entry for this modification
    const newAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      user: "superadmin",
      role: "SuperAdmin",
      action: "Content Saved",
      section: activeTab,
      details: `Saved changes to section: ${activeTab} across all connected devices.`
    };

    const payload: HospitalContent = {
      ...draft,
      auditLogs: [...(draft.auditLogs || []), newAuditLog],
      updatedAt: Date.now()
    };

    const result = await saveContent(payload, token);
    setIsSaving(false);

    if (result.success) {
      setDraft(payload);
      setHasUnsavedChanges(false);
      setStatusMessage({
        type: 'success',
        text: 'All changes saved successfully! Live website on all desktop, mobile, tablet and projector displays updated in real-time.'
      });
      setTimeout(() => setStatusMessage(null), 5000);
    } else {
      setStatusMessage({
        type: 'error',
        text: result.error || 'Failed to save changes to the server.'
      });
    }
  };

  // Mark changes
  const handleDraftChange = (newDraft: HospitalContent) => {
    setDraft(newDraft);
    setHasUnsavedChanges(true);
  };

  const navItems: { id: TabId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'header', label: 'Logo, Favicon & Header', icon: Layout },
    { id: 'pages_sections', label: 'Pages & Section Toggles', icon: Layers },
    { id: 'theme', label: 'Theme Colors & Fonts', icon: Palette },
    { id: 'seo', label: 'SEO & Social Share Cards', icon: Search },
    { id: 'donate_banner', label: 'Donate Banner & Time', icon: Clock },
    { id: 'hero_slider', label: 'Hero Slider & Photos', icon: Sparkles, badge: `${draft.hero?.slides?.length || 0} Photos` },
    { id: 'cards_stats', label: 'Heading 2 & Metric Cards', icon: Layers },
    { id: 'founder_trustees', label: 'Founder & Board of Trustees', icon: Award },
    { id: 'mission', label: 'Hospital Mission & Vision', icon: BookOpen },
    { id: 'departments', label: 'Departments & Photos', icon: Stethoscope, badge: `${draft.departments.length}` },
    { id: 'doctors', label: 'Doctors Directory & Pages', icon: UserCheck, badge: `${draft.doctors.length}` },
    { id: 'donation_box', label: 'Donation Box & Bank Info', icon: Heart },
    { id: 'campus_gallery', label: 'Campus, Facilities & Frames', icon: Building, badge: `${draft.campus.facilities.length}` },
    { id: 'videos', label: 'Videos & Virtual Tours', icon: Video, badge: `${draft.videos?.length || 2}` },
    { id: 'contact_footer', label: 'Phone Numbers, Map & Footer', icon: Phone },
    { id: 'security_audit', label: 'Security & Audit History', icon: ShieldCheck, badge: `${draft.auditLogs?.length || 0}` },
  ];

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#051c24] flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Verifying administrative security credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f7f9] text-[#12343b] flex flex-col selection:bg-[#087f8c] selection:text-white">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#051c24] text-white border-b border-teal-900/60 shadow-md">
        <div className="site-container-wide py-2.5 flex items-center justify-between gap-3">
          
          {/* Left: Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800/80 text-white hover:bg-slate-700"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white p-1 border border-teal-500/40 shrink-0">
                <HospitalLogo variant="emblem" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black tracking-tight">Ali Welfare Trust Hospital</span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
                    Admin Portal
                  </span>
                </div>
                <div className="text-[10px] text-teal-300/80 font-mono hidden sm:block">
                  Live Content Engine • scrypt Secured
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {hasUnsavedChanges && (
              <span className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Unsaved Edits</span>
              </span>
            )}

            {/* Save All Changes Button */}
            <button
              type="button"
              onClick={handleSaveLive}
              disabled={isSaving}
              className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all shadow-md active:scale-95 disabled:opacity-50 ${
                hasUnsavedChanges
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-900/40 ring-2 ring-emerald-400/40'
                  : 'bg-teal-700 hover:bg-teal-600 text-white'
              }`}
              title="Broadcast all edits instantly to the live website on all devices"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving to Live Site...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Live Changes</span>
                </>
              )}
            </button>

            {/* Preview Public Site */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700 transition-colors"
              title="Return to view the public website"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview Live Site</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-white border border-rose-800/40 transition-colors"
              title="Secure Admin Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Real-time Status Toast Alert */}
      {statusMessage && (
        <div className={`py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
          statusMessage.type === 'success'
            ? 'bg-emerald-600 text-white shadow-md'
            : 'bg-rose-600 text-white shadow-md'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Dashboard Workspace */}
      <div className="flex-1 site-container-wide py-6 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Navigation (Desktop & Mobile Drawer) */}
        <aside className={`lg:w-72 shrink-0 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs sticky top-20 space-y-1">
            <div className="px-3 py-2 text-[11px] font-black uppercase text-slate-400 tracking-wider">
              Website Management Sections
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-[#087f8c] shadow-xs border border-teal-200 font-black'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#087f8c]' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#087f8c] text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-100 mt-2 px-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Private unlisted entry</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Tab Editor Panel */}
        <main className="flex-1 min-w-0">
          
          {activeTab === 'header' && (
            <HeaderTab
              header={draft.header}
              onChange={(updated) => handleDraftChange({ ...draft, header: updated })}
              token={token}
            />
          )}

          {activeTab === 'pages_sections' && (
            <PagesSectionsTab
              pagesSections={draft.pagesSections}
              onChange={(updated) => handleDraftChange({ ...draft, pagesSections: updated })}
            />
          )}

          {activeTab === 'theme' && (
            <ThemeTab
              theme={draft.theme}
              onChange={(updated) => handleDraftChange({ ...draft, theme: updated })}
            />
          )}

          {activeTab === 'seo' && (
            <SeoTab
              seo={draft.seo}
              onChange={(updated) => handleDraftChange({ ...draft, seo: updated })}
              token={token}
            />
          )}

          {activeTab === 'donate_banner' && (
            <DonateBannerTab
              banner={draft.donation.banner}
              onChange={(updated) => handleDraftChange({
                ...draft,
                donation: { ...draft.donation, banner: updated }
              })}
              token={token}
            />
          )}

          {activeTab === 'hero_slider' && (
            <HeroSliderTab
              hero={draft.hero}
              marquee={draft.marquee}
              onHeroChange={(updated) => handleDraftChange({ ...draft, hero: updated })}
              onMarqueeChange={(updated) => handleDraftChange({ ...draft, marquee: updated })}
              token={token}
            />
          )}

          {activeTab === 'cards_stats' && (
            <CardsStatsTab
              stats={draft.quickStats}
              onChange={(updated) => handleDraftChange({ ...draft, quickStats: updated })}
            />
          )}

          {activeTab === 'founder_trustees' && (
            <FounderTrusteesTab
              founder={draft.founder}
              onChange={(updated) => handleDraftChange({ ...draft, founder: updated })}
              token={token}
            />
          )}

          {activeTab === 'mission' && (
            <MissionTab
              mission={draft.mission}
              onChange={(updated) => handleDraftChange({ ...draft, mission: updated })}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentsTab
              departments={draft.departments}
              onChange={(updated) => handleDraftChange({ ...draft, departments: updated })}
              token={token}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorsTab
              doctors={draft.doctors}
              departments={draft.departments}
              onChange={(updated) => handleDraftChange({ ...draft, doctors: updated })}
              onPreviewDoctor={onPreviewDoctor}
              token={token}
            />
          )}

          {activeTab === 'donation_box' && (
            <DonationBoxTab
              bank={draft.donation.bank}
              causes={draft.donation.causes}
              onBankChange={(updated) => handleDraftChange({
                ...draft,
                donation: { ...draft.donation, bank: updated }
              })}
              onCausesChange={(updated) => handleDraftChange({
                ...draft,
                donation: { ...draft.donation, causes: updated }
              })}
            />
          )}

          {activeTab === 'campus_gallery' && (
            <CampusGalleryTab
              campus={draft.campus}
              onChange={(updated) => handleDraftChange({ ...draft, campus: updated })}
              token={token}
            />
          )}

          {activeTab === 'videos' && (
            <VideosTab
              videos={draft.videos}
              onChange={(updated) => handleDraftChange({ ...draft, videos: updated })}
              token={token}
            />
          )}

          {activeTab === 'contact_footer' && (
            <ContactFooterTab
              contact={draft.contact}
              onChange={(updated) => handleDraftChange({ ...draft, contact: updated })}
            />
          )}

          {activeTab === 'security_audit' && (
            <SecurityAuditTab
              auditLogs={draft.auditLogs}
              token={token}
              onAuditLogsChange={(updated) => handleDraftChange({ ...draft, auditLogs: updated })}
            />
          )}

          {/* Bottom Floating Save Button for Mobile / Long Pages */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              {hasUnsavedChanges ? (
                <span className="text-amber-700 font-bold">You have unsaved changes in this tab.</span>
              ) : (
                <span>All changes currently saved and synchronized.</span>
              )}
            </div>

            <button
              type="button"
              onClick={handleSaveLive}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-[#087f8c] hover:from-teal-500 hover:to-[#066570] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Live Changes'}</span>
            </button>
          </div>

        </main>

      </div>
    </div>
  );
};
