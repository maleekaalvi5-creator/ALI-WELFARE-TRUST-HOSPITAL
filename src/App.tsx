import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { QuickStats } from './components/QuickStats';
import { FounderMemorial } from './components/FounderMemorial';
import { MemorialInfiniteScroll } from './components/MemorialInfiniteScroll';
import { DepartmentGrid } from './components/DepartmentGrid';
import { DeptDoctorsBridgeScroll } from './components/DeptDoctorsBridgeScroll';
import { SpecialistDoctors } from './components/SpecialistDoctors';
import { DonationPoster } from './components/DonationPoster';
import { HospitalGallery } from './components/HospitalGallery';
import { HospitalRouteNavigator } from './components/HospitalRouteNavigator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { DonationPopupBanner } from './components/DonationPopupBanner';
import { HospitalAIAgent } from './components/HospitalAIAgent';
import AdminLogin from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DoctorProfilePage } from './components/DoctorProfilePage';
import { FounderPage } from './components/founder/FounderPage';
import { DoctorsPage } from './components/DoctorsPage';
import { DepartmentsPage } from './components/DepartmentsPage';
import { DepartmentDetailPage } from './components/DepartmentDetailPage';
import { CampusPage } from './components/CampusPage';
import { DonatePage } from './components/DonatePage';
import { Appointment } from './types';
import { DOCTORS, DEPARTMENTS } from './data/hospitalData';
import { useHospitalContent } from './context/HospitalContentContext';

export default function App() {
  const getInitialRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('/admin-login') || hash.includes('/admin-login')) return '/admin-login';
    if (path.includes('/admin') || hash.includes('/admin')) {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      return isAdminLoggedIn? '/admin' : '/admin-login';
    }
    if (path.startsWith('/doctor/') || hash.includes('/doctor/')) {
      return path.startsWith('/doctor/')? path : hash.replace('#', '');
    }
    if (path === '/doctors' || hash === '#/doctors' || hash === '#doctors' || path.startsWith('/doctors')) {
      return '/doctors';
    }
    if (path.startsWith('/department/') || hash.includes('/department/')) {
      return path.startsWith('/department/')? path : hash.replace('#', '');
    }
    if (path === '/departments' || hash === '#/departments' || hash === '#departments' || path.startsWith('/departments')) {
      return '/departments';
    }
    if (path === '/campus' || hash === '#/campus' || hash === '#campus' || path.startsWith('/campus') || search.includes('page=campus')) {
      return '/campus';
    }
    if (path === '/donate' || hash === '#/donate' || hash === '#donate' || path.startsWith('/donate') || search.includes('page=donate')) {
      return '/donate';
    }
    if (path === '/founder' || path.startsWith('/founder') || hash === '#/founder' || hash === '#founder-page' || search.includes('page=founder')) {
      return '/founder';
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [activeDoctorId, setActiveDoctorId] = useState<string | null>(null);
  const { content } = useHospitalContent();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [donationBannerOpen, setDonationBannerOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<string | undefined>(undefined);
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>(undefined);
  const [myAppointmentsOpen, setMyAppointmentsOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('awt_hospital_appointments');
      return saved? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [bannerSecondsLeft, setBannerSecondsLeft] = useState<number>(120);

  useEffect(() => {
    if (content?.theme) {
      const root = document.documentElement;
      if (content.theme.primaryColor) root.style.setProperty('--color-primary', content.theme.primaryColor);
      if (content.theme.accentColor) root.style.setProperty('--color-accent', content.theme.accentColor);
      if (content.theme.backgroundColor) root.style.setProperty('--color-bg-base', content.theme.backgroundColor);
    }
    if (content?.seo?.metaTitle) {
      document.title = content.seo.metaTitle;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', content.seo.metaTitle);
    }
    if (content?.seo?.metaDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', content.seo.metaDescription);
    }
    if (content?.header?.logoFavicon?.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.href = content.header.logoFavicon.faviconUrl;
    }
  }, [content?.theme, content?.seo, content?.header?.logoFavicon]);

  useEffect(() => {
    const handleLocationChange = () => setCurrentRoute(getInitialRoute());
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (route: string) => {
    try { window.history.pushState({}, '', route); }
    catch { window.location.hash = route; }
    if (route.startsWith('/#')) {
      const id = route.replace('/#', '');
      setCurrentRoute('/');
      setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100);
      return;
    }
    if (route === '/' && currentRoute!== '/') setDonationBannerOpen(true);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('/api/appointments').then(res => res.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) setAppointments(data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const initialOpenTimer = setTimeout(() => setDonationBannerOpen(true), 1200);
    const recurringInterval = setInterval(() => { setDonationBannerOpen(true); setBannerSecondsLeft(120); }, 120000);
    return () => { clearTimeout(initialOpenTimer); clearInterval(recurringInterval); };
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setBannerSecondsLeft(prev => (prev > 1? prev - 1 : 120)), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    try { localStorage.setItem('awt_hospital_appointments', JSON.stringify(appointments)); } catch {}
  }, [appointments]);

  const handleOpenBooking = (deptId?: string, docId?: string) => {
    setSelectedDeptId(deptId); setSelectedDocId(docId); setBookingModalOpen(true);
  };
  const handleScrollToDonation = () => navigateTo('/donate');
  const handleAppointmentBooked = async (newAppt: Appointment) => {
    setAppointments(prev => [newAppt,...prev]);
    try { await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAppt) }); } catch {}
  };
  const handleCancelAppointment = async (id: string) => {
    setAppointments(prev => prev.filter(a => a.id!== id));
    try { await fetch(`/api/appointments/${id}`, { method: 'DELETE' }); } catch {}
  };

  if (currentRoute === '/admin-login') {
    return <AdminLogin onLoginSuccess={() => navigateTo('/admin')} onNavigateHome={() => navigateTo('/')} />;
  }

  // SECURE ADMIN PROTECTION - FIXED, NO DUPLICATE IF
  if (currentRoute === '/admin') {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    const loginTime = localStorage.getItem("adminLoginTime");
    const isExpired = loginTime? (Date.now() - parseInt(loginTime) > 2 * 60 * 60 * 1000) : true;
    if (!isAdminLoggedIn || isExpired) {
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminLoginTime");
      return <AdminLogin onLoginSuccess={() => {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminLoginTime", Date.now().toString());
        navigateTo('/admin');
      }} onNavigateHome={() => navigateTo('/')} />;
    }
    return <AdminDashboard onNavigateHome={() => navigateTo('/')} onNavigateLogin={() => {
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminLoginTime");
      navigateTo('/admin-login');
    }} onPreviewDoctor={(docId) => { setActiveDoctorId(docId); navigateTo(`/doctor/${docId}`); }} />;
  }

  const targetDocId = activeDoctorId || (currentRoute.startsWith('/doctor/')? currentRoute.replace('/doctor/', '') : null);
  const viewingDoctor = targetDocId? DOCTORS.find((d) => d.id === targetDocId) : null;
  if (viewingDoctor) {
    const dept = DEPARTMENTS.find((d) => d.id === viewingDoctor.departmentId);
    return (
      <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col">
        <div className="p-10 text-center">Doctor Profile - {viewingDoctor.name}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col">
      <div className="p-10">Main Website Content</div>
    </div>
  );
}
