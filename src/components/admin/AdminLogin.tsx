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

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat(true);
      setTimeout(() => setBeat(false), 450);
    }, 1600);
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
        @keyframes heartbeat { 0% { transform: scale(1); } 14% { transform: scale(1.12); } 28% { transform: scale(1); } 42% { transform: scale(1.12); } 70% { transform: scale(1); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 22px rgba(20,184,166,0.18); } 50% { box-shadow: 0 0 32px rgba(20,184,166,0.38); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
        .logo-beat { animation: heartbeat 0.8s ease-in-out; }
        .logo-glow { animation: glowPulse 1.6s ease-in-out infinite; }
        .logo-float { animation: float 3.2s ease-in-out infinite; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px #0a3a48 inset !important; -webkit-text-fill-color: white !important; }
      `}</style>
      
      <div className="w-full max-w-[420px] bg-[#0c3d4a]/92 rounded-[24px] p-8 border border-[#1a5a6b]/45 shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
        <div className="flex flex-col items-center mb-8">
          <div className={`relative w-[84px] h-[84px] bg-white rounded-[22px] flex items-center justify-center mb-5 shadow-xl border border-white/25 cursor-pointer logo-float logo-glow ${beat ? 'logo-beat' : ''}`} onClick={() => { setBeat(true); setTimeout(()=>setBeat(false), 800); }}>
            {beat && <div className="absolute inset-0 rounded-[22px] border-2 border-[#14b8a6]/40 animate-ping"></div>}
            <img 
              src="/images/hospital-emblem-clean.png"
              alt="Ali Welfare Trust Hospital"
              className={`w-[62px] h-[62px] object-contain relative z-10 ${beat ? 'scale-110' : 'scale-100'} transition-transform duration-200`}
              onError={(e:any)=>{
                e.currentTarget.style.display='none';
                const fallback = e.currentTarget.parentElement.querySelector('.svg-fallback');
                if(fallback) fallback.style.display='block';
              }}
            />
            <div className="svg-fallback hidden">
              <svg width="62" height="62" viewBox="0 0 200 200">
                <path d="M100 15 C 35 15, 10 70, 10 105 C 10 140, 35 185, 100 185 C 160 165, 185 135, 190 120 C 150 135, 60 145, 35 105 C 10 65, 60 20, 130 30 C 145 32, 160 35, 175 38 C 150 28, 125 15, 100 15 Z" fill="#A51C30"/>
                <path d="M85 75 C 55 75, 35 95, 40 120 C 45 145, 85 175, 125 190 C 100 175, 50 145, 55 120 C 60 95, 85 85, 115 85 C 105 80, 95 75, 85 75 Z" fill="#3D1F4A"/>
                <path d="M115 85 C 130 85, 145 92, 150 110 C 155 128, 130 155, 95 175 C 120 155, 140 130, 135 110 C 130 95, 115 88, 95 90 C 100 87, 107 85, 115 85 Z" fill="#3D1F4A"/>
                <circle cx="95" cy="55" r="14" fill="#0E8A8A"/>
                <circle cx="140" cy="75" r="10" fill="#0E8A8A"/>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#082f3b] border border-[#1a5a6b]/50 text-[11px] text-[#7ec8d8]">🔒 Private Administrative Portal</div>
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
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} onFocus={() => setReadonly(false)} readOnly={readonly} autoComplete="off" data-lpignore="true" name="awt_exact_v12_user" className="w-full pl-10 pr-4 py-3.5 bg-[#082f3b] border border-[#1a4e5e] rounded-xl text-white text-[14px] outline-none focus:border-[#2a8aa3] focus:bg-[#0a3a48] transition placeholder:text-[#5a7d87]" placeholder="Enter User ID" required />
            </div>
          </div>
          <div>
            <label className="text-[12px] text-[#c7d8dc] font-medium">Administrative Password *</label>
            <div className="relative mt-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a7d87]">🔑</span>
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setReadonly(false)} readOnly={readonly} autoComplete="new-password" data-lpignore="true" name="awt_exact_v12_pass" className="w-full pl-10 pr-11 py-3.5 bg-[#082f3b] border border-[#1a4e5e] rounded-xl text-white text-[14px] outline-none focus:border-[#2a8aa3] focus:bg-[#0a3a48] transition placeholder:text-[#5a7d87]" placeholder="Enter Password" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a7d87] hover:text-[#8ec5d1] text-[16px]">{showPass ? "🙈" : "👁️"}</button>
            </div>
          </div>
          {error && <p className="text-red-300 text-[12px] text-center bg-red-950/40 py-2.5 rounded-xl border border-red-900/30">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-gradient-to-r from-[#14b8a6] to-[#0d8a9e] hover:from-[#0d8a9e] hover:to-[#0a6e82] text-white font-bold rounded-xl transition text-[14px] shadow-[0_4px_20px_rgba(20,184,166,0.3)] active:scale-[0.98]">{isLoading ? 'Verifying...' : 'Sign In to Admin Dashboard →'}</button>
        </form>
      </div>
    </div>
  );
}
export default AdminLogin;
