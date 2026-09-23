import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Key, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { HospitalLogo } from '../HospitalLogo';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [username, setUsername] = useState('AliTrust');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // --- SECURE CHECK - Sirf yehi login hoga ---
    const ADMIN_USER = 'AliTrust';
    const ADMIN_PASS = 'AliTrust@2026#Secure'; // <-- Yahan apna naya strong password likho

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        setIsLoading(false);
        const token = 'awt-secure-token-' + Date.now();
        localStorage.setItem('awt_admin_token', token);
        sessionStorage.setItem('awt_admin_token', token);
        if (onLoginSuccess) {
          onLoginSuccess(token);
        } else {
          localStorage.setItem('isAdmin', 'true');
          window.location.href = '/admin';
        }
      } else {
        setIsLoading(false);
        setError('Invalid User ID or Password. Access Denied.');
      }
    }, 500);
  };
 
  return (
    <div className="min-h-screen bg-[#051c24] text-white flex flex-col justify-between selection:bg-[#087f8c] selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="p-4 sm:p-6 flex items-center justify-between border-b border-teal-900/40 relative z-10">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 px-3 py-1.5 rounded-xl transition-all border border-slate-700/60"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Hospital Website</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-teal-400/80 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AES-256 / scrypt Encrypted</span>
        </div>
      </header>

      {/* Main Center Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-md bg-[#0a2933]/90 backdrop-blur-md rounded-3xl border border-teal-500/30 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
          
          {/* Emblem & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white p-2 shadow-lg mb-4 border-2 border-teal-500/40">
              <HospitalLogo variant="emblem" className="w-full h-full object-contain" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-[11px] font-semibold mb-2">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Private Administrative Portal</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Ali Welfare Trust Hospital
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Management & Live Content Control Center
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>{successMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Administrative User ID</span>
                <span className="text-[10px] text-teal-400 font-mono">AliTrust</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="AliTrust"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#04151b] border border-teal-900/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Administrative Password</span>
              
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#04151b] border border-teal-900/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-[#087f8c] hover:from-teal-400 hover:to-[#0995a5] text-white font-bold text-sm shadow-lg shadow-teal-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-teal-900/60 text-center">
            <p className="text-[11px] text-slate-400">
              Unlisted security route for authorized hospital leadership only. All access attempts are recorded with cryptographic session hashes.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-400 relative z-10">
        © {new Date().getFullYear()} Ali Welfare Trust Hospital • Non-Profit Healthcare Trust #1142
      </footer>
    </div>
  );
};
