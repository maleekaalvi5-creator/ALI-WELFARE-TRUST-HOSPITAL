import React, { useState, useEffect } from 'react';

export function AdminLogin({ onLoginSuccess }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [readonly, setReadonly] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setReadonly(false), 700);
    return () => clearTimeout(timer);
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
    } catch (err) {
      setError('Server error, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#051a1a] px-4 relative overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-[#102e2e]/50 px-4 py-2 rounded-full border border-teal-900/30">
          ← Return to Hospital Website
        </a>
        <div className="text-[11px] text-teal-400/70 flex items-center gap-2">
          <span>🛡️ AES-256 / scrypt Encrypted</span>
        </div>
      </div>

      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #0f2a2a inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      
      <div className="w-full max-w-[420px] bg-[#0f2a2a]/90 rounded-[24px] p-8 border border-teal-900/40 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-[64px] h-[64px] bg-white rounded-[16px] flex items-center justify-center mb-4 shadow-lg">
            <img src="/logo.png" alt="Hospital Logo" className="w-10 h-10 object-contain" onError={(e:any)=>{e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
            <span style={{display:'none'}} className="text-2xl">🏥</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#102e2e] border border-teal-800/50 text-[11px] text-teal-300">
            🔒 Private Administrative Portal
          </div>
          <h1 className="text-[22px] font-bold text-white mt-4 tracking-tight">Ali Welfare Trust Hospital</h1>
          <p className="text-teal-200/50 text-[12px] mt-1">Management & Live Content Control Center</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          {/* TRAP inputs for Chrome */}
          <input type="text" name="prevent_autofill_1" style={{display:'none'}} tabIndex={-1} autoComplete="off" />
          <input type="password" name="prevent_autofill_2" style={{display:'none'}} tabIndex={-1} autoComplete="off" />
          
          <div>
            <label className="text-[12px] text-gray-300 font-medium">Administrative User ID *</label>
            <div className="relative mt-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-[14px]">👤</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setReadonly(false)}
                readOnly={readonly}
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                name="awt_user_final_no_fill_2026"
                className="w-full pl-10 pr-4 py-3 bg-[#081f1f] border border-gray-700/50 rounded-xl text-white text-[14px] outline-none focus:border-teal-500/70 focus:bg-[#0a2626] transition"
                placeholder="Enter User ID"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] text-gray-300 font-medium">Administrative Password *</label>
            <div className="relative mt-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-[14px]">🔑</span>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setReadonly(false)}
                readOnly={readonly}
                autoComplete="new-password"
                data-lpignore="true"
                data-form-type="other"
                name="awt_pass_final_no_fill_2026"
                className="w-full pl-10 pr-11 py-3 bg-[#081f1f] border border-gray-700/50 rounded-xl text-white text-[14px] outline-none focus:border-teal-500/70 focus:bg-[#0a2626] transition"
                placeholder="Enter Password"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-[12px] text-center bg-red-950/40 py-2.5 rounded-xl border border-red-900/30">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] hover:from-[#0d9488] hover:to-[#0f766e] text-white font-bold rounded-xl transition text-[14px] shadow-lg"
          >
            {isLoading ? 'Verifying...' : 'Sign In to Admin Dashboard →'}
          </button>
        </form>

        <p className="text-[10px] text-gray-500 text-center mt-6 leading-relaxed">
          Unlisted security route for authorized hospital leadership only. All access<br/>attempts are recorded with cryptographic session hashes.
        </p>
        <p className="text-[10px] text-gray-600 text-center mt-4">© 2026 Ali Welfare Trust Hospital • Non-Profit Healthcare Trust #1142</p>
      </div>
    </div>
  );
}
export default AdminLogin;
