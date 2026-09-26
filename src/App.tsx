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
import { Phone, Calendar, Heart, MessageCircle, Sparkles, Clock } from 'lucide-react';
import { HOSPITAL_INFO, BANK_DETAILS, DOCTORS, DEPARTMENTS } from './data/hospitalData';
import { useHospitalContent } from './context/HospitalContentContext';

export default function App() {
  // Current route detection: supports paths (/admin, /founder, /doctors, /doctor/..., /departments, /department/..., /campus, /donate) & hashes
  const getInitialRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    
    if (path.includes('/admin-login') || hash.includes('/admin-login')) return '/admin-login';

if (path.includes('/admin') || hash.includes('/admin')) {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAdminLoggedIn ? '/admin' : '/admin-login';
}
    
    if (path.startsWith('/doctor/') || hash.includes('/doctor/')) {
      return path.startsWith('/doctor/') ? path : hash.replace('#', '');
    }
    if (path === '/doctors' || hash === '#/doctors' || hash === '#doctors' || path.startsWith('/doctors')) {
      return '/doctors';
    }
    if (path.startsWith('/department/') || hash.includes('/department/')) {
      return path.startsWith('/department/') ? path : hash.replace('#', '');
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
    if (
      path === '/founder' ||
      path.startsWith('/founder') ||
      hash === '#/founder' ||
      hash === '#founder-page' ||
      search.includes('page=founder')
    ) {
      return '/founder';
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [activeDoctorId, setActiveDoctorId] = useState<string | null>(null);
  const { content } = useHospitalContent();

  // Dynamically synchronize live CMS Theme, Favicon, Title and SEO meta tags
  useEffect(() => {
    if (content?.theme) {
      const root = document.documentElement;
      if (content.theme.primaryColor) {
        root.style.setProperty('--color-primary', content.theme.primaryColor);
      }
      if (content.theme.accentColor) {
        root.style.setProperty('--color-accent', content.theme.accentColor);
      }
      if (content.theme.backgroundColor) {
        root.style.setProperty('--color-bg-base', content.theme.backgroundColor);
      }
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
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', content.seo.metaDescription);
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
    const handleLocationChange = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (route: string) => {
    try {
      window.history.pushState({}, '', route);
    } catch {
      window.location.hash = route;
    }
    
    // Handle section hash navigation (e.g. /#contact)
    if (route.startsWith('/#')) {
      const id = route.replace('/#', '');
      setCurrentRoute('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (route === '/' && currentRoute !== '/') {
      setDonationBannerOpen(true);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [donationBannerOpen, setDonationBannerOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<string | undefined>(undefined);
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>(undefined);
  
  const [myAppointmentsOpen, setMyAppointmentsOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('awt_hospital_appointments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch initial appointments from backend /api/appointments
  useEffect(() => {
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAppointments(data);
        }
      })
      .catch((err) => console.warn('Could not fetch server appointments:', err));
  }, []);

  // Countdown timer in seconds (120s = 2 minutes) until auto-open or quick prompt
  const [bannerSecondsLeft, setBannerSecondsLeft] = useState<number>(120);

  // 1. Initial trigger on opening website + recurring every 2 minutes (120,000 ms)
  useEffect(() => {
    // Show banner on opening website with smooth right-to-center entrance
    const initialOpenTimer = setTimeout(() => {
      setDonationBannerOpen(true);
    }, 1200);

    // Recurring trigger every 2 minutes (120,000 ms)
    const recurringInterval = setInterval(() => {
      setDonationBannerOpen(true);
      setBannerSecondsLeft(120);
    }, 120000);

    return () => {
      clearTimeout(initialOpenTimer);
      clearInterval(recurringInterval);
    };
  }, []);

  // 2. Real-time 2-minute countdown ticker
  useEffect(() => {
    const tick = setInterval(() => {
      setBannerSecondsLeft((prev) => (prev > 1 ? prev - 1 : 120));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  // 3. Trigger banner if user hits browser back button (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setDonationBannerOpen(true);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 4. Trigger banner on custom event (e.g. clicking logo or return button)
  useEffect(() => {
    const handleGlobalBannerTrigger = () => {
      setDonationBannerOpen(true);
    };
    window.addEventListener('open-donation-banner', handleGlobalBannerTrigger);
    return () => window.removeEventListener('open-donation-banner', handleGlobalBannerTrigger);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('awt_hospital_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error('Failed to persist appointments:', e);
    }
  }, [appointments]);

  const handleOpenBooking = (deptId?: string, docId?: string) => {
    setSelectedDeptId(deptId);
    setSelectedDocId(docId);
    setBookingModalOpen(true);
  };

  const handleScrollToDonation = () => {
    navigateTo('/donate');
  };

  const handleAppointmentBooked = async (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppt)
      });
    } catch (e) {
      console.warn('Failed to post appointment to backend:', e);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Failed to delete appointment on backend:', e);
    }
  };

  if (currentRoute === '/admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={() => navigateTo('/admin')}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }
if (currentRoute === '/admin') {
  if (currentRoute === '/admin') {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  
  if (!isAdminLoggedIn) {
    return (
      <AdminLogin
        onLoginSuccess={() => navigateTo('/admin')}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  return (
    <AdminDashboard
      onNavigateHome={() => navigateTo('/')}
      onNavigateLogin={() => navigateTo('/admin-login')}
      onPreviewDoctor={(docId) => {
        setActiveDoctorId(docId);
        navigateTo(`/doctor/${docId}`);
      }}
    />
  );
}

  // Doctor Detail Page View (Dedicated Subpage)
  const targetDocId = activeDoctorId || (currentRoute.startsWith('/doctor/') ? currentRoute.replace('/doctor/', '') : null);
  const viewingDoctor = targetDocId ? DOCTORS.find((d) => d.id === targetDocId) : null;

  if (viewingDoctor) {
    const dept = DEPARTMENTS.find((d) => d.id === viewingDoctor.departmentId);
    return (
      <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
        <Navbar
          onOpenBooking={() => handleOpenBooking(viewingDoctor.departmentId, viewingDoctor.id)}
          onOpenDonation={handleScrollToDonation}
          onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
          appointmentsCount={appointments.length}
          onNavigateRoute={navigateTo}
          currentRoute={currentRoute}
        />

        <main className="flex-1">
          <DoctorProfilePage
            doctor={viewingDoctor}
            department={dept}
            onBack={() => {
              setActiveDoctorId(null);
              navigateTo('/doctors');
            }}
            onNavigateDoctors={() => navigateTo('/doctors')}
            onViewDepartment={(deptId) => navigateTo(`/department/${deptId}`)}
            onBookAppointment={(deptId, docId) => {
              handleOpenBooking(deptId, docId);
            }}
            onOpenDonation={handleScrollToDonation}
          />
        </main>

        <Footer
          onOpenBooking={(deptId) => handleOpenBooking(deptId)}
          onOpenDonation={handleScrollToDonation}
        />

        {/* Appointment Booking Modal */}
        {bookingModalOpen && (
          <AppointmentModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            onAppointmentBooked={handleAppointmentBooked}
            defaultDepartmentId={selectedDeptId}
            defaultDoctorId={selectedDocId}
          />
        )}

        {/* 2 Minutes Auto/Manual Donation Modal */}
        <DonationPopupBanner
          isOpen={donationBannerOpen}
          onClose={() => setDonationBannerOpen(false)}
          onOpenFullDonation={() => setDonationBannerOpen(false)}
        />

        {/* Appointments Drawer */}
        <MyAppointmentsModal
          isOpen={myAppointmentsOpen}
          onClose={() => setMyAppointmentsOpen(false)}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onBookNew={() => {
            setMyAppointmentsOpen(false);
            handleOpenBooking();
          }}
        />

        {/* 24/7 AI Hospital Care Agent */}
        <HospitalAIAgent
          onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onOpenDonation={handleScrollToDonation}
        />
      </div>
    );
  }

  // Dedicated Doctors Directory Page Subpage
  if (currentRoute === '/doctors' || currentRoute.startsWith('/doctors')) {
    return (
      <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onOpenDonation={handleScrollToDonation}
          onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
          appointmentsCount={appointments.length}
          onNavigateRoute={navigateTo}
          currentRoute={currentRoute}
        />

        <main className="flex-1">
          <DoctorsPage
            onNavigateHome={() => navigateTo('/')}
            onViewDoctorProfile={(docId) => {
              setActiveDoctorId(docId);
              navigateTo(`/doctor/${docId}`);
            }}
            onViewDepartment={(deptId) => navigateTo(`/department/${deptId}`)}
            onBookDoctor={(deptId, docId) => handleOpenBooking(deptId, docId)}
            onOpenDonation={handleScrollToDonation}
          />
        </main>

        <Footer
          onOpenBooking={(deptId) => handleOpenBooking(deptId)}
          onOpenDonation={handleScrollToDonation}
        />

        {bookingModalOpen && (
          <AppointmentModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            onAppointmentBooked={handleAppointmentBooked}
            defaultDepartmentId={selectedDeptId}
            defaultDoctorId={selectedDocId}
          />
        )}

        <DonationPopupBanner
          isOpen={donationBannerOpen}
          onClose={() => setDonationBannerOpen(false)}
          onOpenFullDonation={() => setDonationBannerOpen(false)}
        />

        <MyAppointmentsModal
          isOpen={myAppointmentsOpen}
          onClose={() => setMyAppointmentsOpen(false)}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onBookNew={() => {
            setMyAppointmentsOpen(false);
            handleOpenBooking();
          }}
        />

        <HospitalAIAgent
          onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onOpenDonation={handleScrollToDonation}
        />
      </div>
    );
  }

  // Department Detail Page View (Dedicated Subpage)
  const targetDeptId = currentRoute.startsWith('/department/') ? currentRoute.replace('/department/', '') : null;
  const viewingDept = targetDeptId ? DEPARTMENTS.find((d) => d.id === targetDeptId) : null;

  if (viewingDept) {
    return (
      <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
        <Navbar
          onOpenBooking={() => handleOpenBooking(viewingDept.id)}
          onOpenDonation={handleScrollToDonation}
          onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
          appointmentsCount={appointments.length}
          onNavigateRoute={navigateTo}
          currentRoute={currentRoute}
        />

        <main className="flex-1">
          <DepartmentDetailPage
            department={viewingDept}
            onBack={() => navigateTo('/departments')}
            onNavigateDepartments={() => navigateTo('/departments')}
            onViewDoctorProfile={(docId) => {
              setActiveDoctorId(docId);
              navigateTo(`/doctor/${docId}`);
            }}
            onViewDepartment={(id) => navigateTo(`/department/${id}`)}
            onBookAppointment={(deptId, docId) => handleOpenBooking(deptId, docId)}
            onOpenDonation={handleScrollToDonation}
          />
        </main>

        <Footer
          onOpenBooking={(deptId) => handleOpenBooking(deptId)}
          onOpenDonation={handleScrollToDonation}
        />

        {bookingModalOpen && (
          <AppointmentModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            onAppointmentBooked={handleAppointmentBooked}
            defaultDepartmentId={selectedDeptId}
            defaultDoctorId={selectedDocId}
          />
        )}

        <DonationPopupBanner
          isOpen={donationBannerOpen}
          onClose={() => setDonationBannerOpen(false)}
          onOpenFullDonation={() => setDonationBannerOpen(false)}
        />

        <MyAppointmentsModal
          isOpen={myAppointmentsOpen}
          onClose={() => setMyAppointmentsOpen(false)}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onBookNew={() => {
            setMyAppointmentsOpen(false);
            handleOpenBooking();
          }}
        />

        <HospitalAIAgent
          onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onOpenDonation={handleScrollToDonation}
        />
      </div>
    );
  }

  // Dedicated Departments Directory Page Subpage
  if (currentRoute === '/departments' || currentRoute.startsWith('/departments')) {
    return (
      <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onOpenDonation={handleScrollToDonation}
          onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
          appointmentsCount={appointments.length}
          onNavigateRoute={navigateTo}
          currentRoute={currentRoute}
        />

        <main className="flex-1">
          <DepartmentsPage
            onNavigateHome={() => navigateTo('/')}
            onViewDepartmentDetail={(deptId) => navigateTo(`/department/${deptId}`)}
            onViewDoctorProfile={(docId) => {
              setActiveDoctorId(docId);
              navigateTo(`/doctor/${docId}`);
            }}
            onBookDepartment={(deptId) => handleOpenBooking(deptId)}
            onOpenDonation={handleScrollToDonation}
          />
        </main>

        <Footer
          onOpenBooking={(deptId) => handleOpenBooking(deptId)}
          onOpenDonation={handleScrollToDonation}
        />

        {bookingModalOpen && (
          <AppointmentModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            onAppointmentBooked={handleAppointmentBooked}
            defaultDepartmentId={selectedDeptId}
            defaultDoctorId={selectedDocId}
          />
        )}

        <DonationPopupBanner
          isOpen={donationBannerOpen}
          onClose={() => setDonationBannerOpen(false)}
          onOpenFullDonation={() => setDonationBannerOpen(false)}
        />

        <MyAppointmentsModal
          isOpen={myAppointmentsOpen}
          onClose={() => setMyAppointmentsOpen(false)}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onBookNew={() => {
            setMyAppointmentsOpen(false);
            handleOpenBooking();
          }}
        />

        <HospitalAIAgent
          onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onOpenDonation={handleScrollToDonation}
        />
      </div>
    );
  }

  // Dedicated Founder Page View (3-Layer Visual Composition)
  if (currentRoute === '/founder') {
    return (
      <>
        <FounderPage
          onNavigateHome={() => navigateTo('/')}
          onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onOpenDonation={handleScrollToDonation}
          onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
          appointmentsCount={appointments.length}
        />

        {/* Appointment Booking Modal */}
        {bookingModalOpen && (
          <AppointmentModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            onAppointmentBooked={handleAppointmentBooked}
            defaultDepartmentId={selectedDeptId}
            defaultDoctorId={selectedDocId}
          />
        )}

        {/* 2 Minutes Auto/Manual Donation Modal */}
        <DonationPopupBanner
          isOpen={donationBannerOpen}
          onClose={() => setDonationBannerOpen(false)}
          onOpenFullDonation={() => {
            setDonationBannerOpen(false);
          }}
        />

        {/* Appointments Drawer */}
        <MyAppointmentsModal
          isOpen={myAppointmentsOpen}
          onClose={() => setMyAppointmentsOpen(false)}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onBookNew={() => {
            setMyAppointmentsOpen(false);
            handleOpenBooking();
          }}
        />

        {/* 24/7 AI Hospital Care Agent */}
        <HospitalAIAgent
          onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onOpenDonation={handleScrollToDonation}
        />
      </>
    );
  }

  // Dedicated Campus & Infrastructure Page Subpage
  if (currentRoute === '/campus' || currentRoute.startsWith('/campus')) {
    return (
      <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onOpenDonation={() => navigateTo('/donate')}
          onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
          appointmentsCount={appointments.length}
          onNavigateRoute={navigateTo}
          currentRoute={currentRoute}
        />

        <main className="flex-1">
          <CampusPage
            onNavigateHome={() => navigateTo('/')}
            onViewDepartment={(deptId) => navigateTo(`/department/${deptId}`)}
            onBookAppointment={(deptId) => handleOpenBooking(deptId)}
            onOpenDonation={() => navigateTo('/donate')}
          />
        </main>

        <Footer
          onOpenBooking={(deptId) => handleOpenBooking(deptId)}
          onOpenDonation={() => navigateTo('/donate')}
        />

        {bookingModalOpen && (
          <AppointmentModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            onAppointmentBooked={handleAppointmentBooked}
            defaultDepartmentId={selectedDeptId}
            defaultDoctorId={selectedDocId}
          />
        )}

        <DonationPopupBanner
          isOpen={donationBannerOpen}
          onClose={() => setDonationBannerOpen(false)}
          onOpenFullDonation={() => {
            setDonationBannerOpen(false);
            navigateTo('/donate');
          }}
        />

        <MyAppointmentsModal
          isOpen={myAppointmentsOpen}
          onClose={() => setMyAppointmentsOpen(false)}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onBookNew={() => {
            setMyAppointmentsOpen(false);
            handleOpenBooking();
          }}
        />

        <HospitalAIAgent
          onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onOpenDonation={() => navigateTo('/donate')}
        />
      </div>
    );
  }

  // Dedicated Donate & Zakat Portal Page Subpage
  if (currentRoute === '/donate' || currentRoute.startsWith('/donate')) {
    return (
      <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onOpenDonation={() => {}}
          onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
          appointmentsCount={appointments.length}
          onNavigateRoute={navigateTo}
          currentRoute={currentRoute}
        />

        <main className="flex-1">
          <DonatePage
            onNavigateHome={() => navigateTo('/')}
            onBookAppointment={(deptId) => handleOpenBooking(deptId)}
          />
        </main>

        <Footer
          onOpenBooking={(deptId) => handleOpenBooking(deptId)}
          onOpenDonation={() => {}}
        />

        {bookingModalOpen && (
          <AppointmentModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            onAppointmentBooked={handleAppointmentBooked}
            defaultDepartmentId={selectedDeptId}
            defaultDoctorId={selectedDocId}
          />
        )}

        <MyAppointmentsModal
          isOpen={myAppointmentsOpen}
          onClose={() => setMyAppointmentsOpen(false)}
          appointments={appointments}
          onCancelAppointment={handleCancelAppointment}
          onBookNew={() => {
            setMyAppointmentsOpen(false);
            handleOpenBooking();
          }}
        />

        <HospitalAIAgent
          onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onOpenDonation={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#0f172a] flex flex-col selection:bg-[#087f8c] selection:text-white">
      
      {/* Top Header Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenDonation={handleScrollToDonation}
        onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
        appointmentsCount={appointments.length}
        onNavigateRoute={navigateTo}
        currentRoute={currentRoute}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Showcase with 3D Badges */}
        {content?.pagesSections?.heroVisible !== false && (
          <Hero
            onOpenBooking={() => handleOpenBooking()}
            onOpenDonation={handleScrollToDonation}
          />
        )}

        {/* 2. Infinite Continuous Scroll Marquee */}
        {content?.pagesSections?.marqueeVisible !== false && <InfiniteMarquee />}

        {/* 3. Interactive Quick Stats */}
        {content?.pagesSections?.quickStatsVisible !== false && <QuickStats />}

        {/* 4. Founder Memorial Tribute (Late Nazar Hussain Alvi) & Leadership */}
        {content?.pagesSections?.founderMemorialVisible !== false && <FounderMemorial />}

        {/* 4b. 3D Infinite Perspective Quality & Service Pillars Scroll */}
        {content?.pagesSections?.memorialScrollVisible !== false && <MemorialInfiniteScroll />}

        {/* 5. 3D Department Grid & Capabilities */}
        {content?.pagesSections?.departmentGridVisible !== false && (
          <DepartmentGrid
            onSelectDepartmentForBooking={(deptId) => handleOpenBooking(deptId)}
            onViewDepartmentDetail={(deptId) => navigateTo(`/department/${deptId}`)}
            onViewDepartmentsDirectory={() => navigateTo('/departments')}
          />
        )}

        {/* 5b. Slim Infinite Clinical Bridge Scroll (Unites Departments & Specialist Doctors) */}
        {content?.pagesSections?.bridgeScrollVisible !== false && (
          <DeptDoctorsBridgeScroll
            onSelectDoctor={(docId) => {
              setActiveDoctorId(docId);
              navigateTo(`/doctor/${docId}`);
            }}
            onSelectDepartment={(deptId) => navigateTo(`/department/${deptId}`)}
          />
        )}

        {/* 6. Medical Specialists & Consultants */}
        {content?.pagesSections?.specialistDoctorsVisible !== false && (
          <SpecialistDoctors
            onBookDoctor={(deptId, docId) => handleOpenBooking(deptId, docId)}
            onViewDoctorProfile={(docId) => {
              setActiveDoctorId(docId);
              navigateTo(`/doctor/${docId}`);
            }}
            onViewDoctorsDirectory={() => navigateTo('/doctors')}
          />
        )}

        {/* 7. Animated "Donate Now" Poster with Meezan Bank Quick Details */}
        {content?.pagesSections?.donationPosterVisible !== false && <DonationPoster />}

        {/* 8. Campus & Facilities Gallery */}
        {content?.pagesSections?.campusGalleryVisible !== false && <HospitalGallery />}

        {/* 9. In-House Leaflet & OSRM GPS Navigation System */}
        {content?.pagesSections?.navigatorVisible !== false && <HospitalRouteNavigator />}

        {/* 10. Interactive Contact & Location Section */}
        {content?.pagesSections?.contactSectionVisible !== false && <ContactSection />}

      </main>

      {/* Comprehensive Footer */}
      <Footer
        onOpenBooking={(deptId) => handleOpenBooking(deptId)}
        onOpenDonation={handleScrollToDonation}
        onNavigateRoute={navigateTo}
      />



      {/* Official Luxury 3D Soft Animated Donation Banner Modal (Matches User Screenshot Exactly) */}
      <DonationPopupBanner
        isOpen={donationBannerOpen}
        onClose={() => setDonationBannerOpen(false)}
        onOpenFullDonation={() => {
          const el = document.getElementById('donate');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

{/* 24/7 AI Hospital Care Agent */}
      <HospitalAIAgent
        onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
        onOpenDonation={handleScrollToDonation}
      />

      {/* Booking Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialDepartmentId={selectedDeptId}
        initialDoctorId={selectedDocId}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* My Booked Appointments Drawer / Modal */}
      <AppointmentsModal
        isOpen={myAppointmentsOpen}
        onClose={() => setMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={() => {
          setMyAppointmentsOpen(false);
          handleOpenBooking();
        }}
      />
    </div>
  );
}
