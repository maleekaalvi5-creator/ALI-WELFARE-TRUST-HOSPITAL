import React from 'react';
import { 
  MapPin, 
  Phone, 
  ArrowUp, 
  Heart,
  Calendar,
  ExternalLink,
  Clock,
  Lock
} from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../data/hospitalData';
import { HospitalLogo } from './HospitalLogo';

interface FooterProps {
  onOpenBooking: (deptId?: string) => void;
  onOpenDonation: () => void;
  onNavigateRoute?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenDonation, onNavigateRoute }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Departments", href: "/departments" },
    { name: "Doctors", href: "/doctors" },
    { name: "Campus", href: "/campus" },
    { name: "Founder", href: "/founder" },
    { name: "Donate", href: "/donate" },
  ];

  return (
    <footer className="bg-[#041d24] text-white py-8 sm:py-10 border-t border-teal-900/50 relative">
      <div className="site-container">
        {/* Main Slim Grid: Brand, Navigation, & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-teal-900/60">
          
          {/* Col 1: Brand & Registration Badge (Slim) */}
          <div className="md:col-span-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs shrink-0">
              <HospitalLogo variant="emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-extrabold text-white tracking-tight leading-tight">
                  Ali Welfare Trust Hospital
                </h4>
              </div>
              <p className="text-[11px] text-teal-300 font-serif leading-none mt-0.5">
                {HOSPITAL_INFO.urduName} • <span className="text-slate-300">Reg: 2005 (Trust)</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Serving Humanity with Dignity, Free Dialysis & Quality Care
              </p>
            </div>
          </div>

          {/* Col 2: Smart Navigation Links */}
          <div className="md:col-span-5 flex flex-wrap items-center justify-start md:justify-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (onNavigateRoute) {
                    e.preventDefault();
                    onNavigateRoute(link.href);
                  }
                }}
                className="hover:text-teal-300 transition-colors py-1 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => onOpenBooking()}
              className="hover:text-teal-300 text-teal-400 font-bold transition-colors py-1 cursor-pointer"
            >
              Book OPD
            </button>
          </div>

          {/* Col 3: Direct Contact & Emergency (Slim & Clean) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center gap-1 text-xs">
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
              className="inline-flex items-center gap-1.5 text-rose-300 hover:text-rose-200 font-bold transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>24/7 Helpline: {HOSPITAL_INFO.emergencyPhone}</span>
            </a>
            <div className="text-slate-400 text-[11px] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
              <span>Chahal Kalan Rd, Qila Didar Singh</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-medium">
          <p>
            © {new Date().getFullYear()} Ali Welfare Trust Hospital. Registered Non-Profit Healthcare Trust. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#hospital-route-navigator"
              className="text-teal-300 hover:underline cursor-pointer"
            >
              GPS Directions
            </a>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigateRoute ? onNavigateRoute('/admin-login') : window.location.assign('/admin-login')}
              className="text-slate-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Secure Staff & Admin Management Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
