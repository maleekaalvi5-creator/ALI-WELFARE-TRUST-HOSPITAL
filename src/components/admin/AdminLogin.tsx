import React, { useState, useEffect } from 'react';

export function AdminLogin({ onLoginSuccess }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [readonly, setReadonly] = useState(true);
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReadonly(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Heartbeat animation every 1.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setBeat(true);
      setTimeout(() => setBeat(false), 400);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('awt_admin_token', data.token);
        sessionStorage.setItem('awt_admin_token', data.token);
        localStorage.setItem('isAdmin', 'true');
        if (onLoginSuccess) onLoginSuccess(data.token);
        else window.location.href = '/admin';
      } else {
        setError(data.message || 'Invalid User ID or Password. Access Denied.');
      }
    } catch {
      setError('Server error, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#062e38] px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-xs text-[#c7d8dc] hover:text-white bg-[#0c3d4a]/70 px-4 py-2 rounded-full border border-[#1a4e5e]/40 backdrop-blur">
          ← Return to Hospital Website
        </a>
        <div className="text-[11px] text-[#5fb4c8]/80 flex items-center gap-1.5 bg-[#0c3d4a]/50 px-3 py-1 rounded-full border border-[#1a4e5e]/30">
          🛡️ AES-256 / scrypt Encrypted
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.12); }
          28% { transform: scale(1); }
          42% { transform: scale(1.12); }
          70% { transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(20,184,166,0.15), 0 0 40px rgba(20,184,166,0.08); }
          50% { box-shadow: 0 0 30px rgba(20,184,166,0.35), 0 0 60px rgba(20,184,166,0.18), 0 0 80px rgba(20,184,166,0.08); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .logo-beat {
          animation: heartbeat 0.8s ease-in-out;
        }
        .logo-glow {
          animation: glowPulse 1.5s ease-in-out infinite;
        }
        .logo-float {
          animation: float 3s ease-in-out infinite;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2.2s ease-in-out infinite;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #0a3a48 inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      
      <div className="w-full max-w-[420px] bg-[#0c3d4a]/90 rounded-[24px] p-8 border border-[#1a5a6b]/40 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          {/* ANIMATED LOGO - EXACT SAME LOGO WITH HEARTBEAT */}
          <div 
            className={`relative w-[80px] h-[80px] bg-white rounded-[20px] flex items-center justify-center mb-5 shadow-xl border border-white/20 cursor-pointer logo-float logo-glow overflow-hidden ${beat ? 'logo-beat' : ''}`}
            onClick={() => { setBeat(true); setTimeout(()=>setBeat(false), 800); }}
            title="Click for heartbeat"
          >
            {/* Shimmer layer */}
            <div className="absolute inset-0 shimmer pointer-events-none rounded-[20px] overflow-hidden"></div>
            
            {/* Pulse rings on beat */}
            {beat && (
              <>
                <div className="absolute inset-0 rounded-[20px] border-2 border-[#14b8a6]/40 animate-ping"></div>
                <div className="absolute -inset-3 rounded-[24px] border border-[#14b8a6]/20 animate-ping" style={{animationDelay: '0.1s'}}></div>
              </>
            )}

            <img 
              src="/logo.png" 
              alt="Ali Welfare Trust Hospital" 
              className={`w-[58px] h-[58px] object-contain relative z-10 transition-transform duration-200 ${beat ? 'scale-110' : 'scale-100'}`}
              onError={(e:any)=>{
                e.target.style.display='none';
                const fb = e.target.parentElement.querySelector('.fallback-logo');
                if(fb) fb.style.display='flex';
              }}
            />
            {/* Fallback - your red crescent heart logo */}
            <div className={`fallback-logo hidden w-full h-full items-center justify-center relative z-10 ${beat ? 'scale-110' : 'scale-100'} transition-transform`}>
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
                <path d="M24 6C13 6 6 13 6 24C6 35 13 42 24 42C21 38 19 31 19 24C19 17 21 10 24 6Z" fill="#a51c30" opacity="0.95"/>
                <path d="M18 18C18 18 16 22 18 26C20 30 24 32 28 32C28 32 26 28 24 24C22 20 20 18 18 18Z" fill="#4a0f1a"/>
                <path d="M22 20C22 20 20 24 22 28C24 30 26 31 29 31" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                <circle cx="30" cy="14" r="3" fill="#1a8a9e"/>
                <circle cx="36" cy="17" r="1.8" fill="#1a8a9e"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#082f3b] border border-[#1a5a6b]/50 text-[11px] text-[#7ec8d8]">
            🔒 Private Administrative Portal
          </div>
          <h1 className="text-[22px] font-bold text-white mt-5 tracking-tight">Ali Welfare Trust Hospital</h1>
          <p className="text-[#7ec8d8]/70 text-[12px] mt-1.5 font-medium">Management & Live Content Control Center</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          <input type="text" style={{display:'none'}} tabIndex={-1} autoComplete="off" />
          <input type="password" style={{display:'none'}} tabIndex={-1} autoComplete="off" />
          
          <div>
            <label className="text-[12px] text-[#c7d8dc] font-medium">Administrative User ID *</label>
            <div className="relative mt-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a7d87]">👤</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setReadonly(false)}
                readOnly={readonly}
                autoComplete="off"
                data-lpignore="true"
                name="awt_teal_user_v8_anim"
                className="w-full pl-10 pr-4 py-3.5 bg-[#082f3b] border border-[#1a4e5e] rounded-xl text-white text-[14px] outline-none focus:border-[#2a8aa3] focus:bg-[#0a3a48] transition placeholder:text-[#5a7d87]"
                placeholder="Enter User ID"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] text-[#c7d8dc] font-medium">Administrative Password *</label>
            <div className="relative mt-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a7d87]">🔑</span>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setReadonly(false)}
                readOnly={readonly}
                autoComplete="new-password"
                data-lpignore="true"
                name="awt_teal_pass_v8_anim"
                className="w-full pl-10 pr-11 py-3.5 bg-[#082f3b] border border-[#1a4e5e] rounded-xl text-white text-[14px] outline-none focus:border-[#2a8aa3] focus:bg-[#0a3a48] transition placeholder:text-[#5a7d87]"
                placeholder="Enter Password"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a7d87] hover:text-[#8ec5d1] text-[16px] transition">
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-300 text-[12px] text-center bg-red-950/40 py-2.5 rounded-xl border border-red-900/30 animate-pulse">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#14b8a6] to-[#0d8a9e] hover:from-[#0d8a9e] hover:to-[#0a6e82] text-white font-bold rounded-xl transition text-[14px] shadow-[0_4px_20px_rgba(20,184,166,0.3)] active:scale-[0.98]"
          >
            {isLoading ? 'Verifying...' : 'Sign In to Admin Dashboard →'}
          </button>
        </form>

        <p className="text-[10px] text-[#5a8a96] text-center mt-6 leading-relaxed px-2">
          Unlisted security route for authorized hospital leadership only. All access attempts are recorded with cryptographic session hashes.
        </p>
        <p className="text-[10px] text-[#4a7580] text-center mt-4">© 2026 Ali Welfare Trust Hospital • Non-Profit Healthcare Trust #1142</p>
      </div>
    </div>
  );
}
export default AdminLogin;
