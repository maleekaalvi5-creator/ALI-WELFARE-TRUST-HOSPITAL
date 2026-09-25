import React, { useState, useEffect } from 'react';

export function AdminLogin({ onLoginSuccess }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [readonly, setReadonly] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setReadonly(false), 600);
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
        setError('Invalid User ID or Password. Access Denied.');
      }
    } catch {
      setError('Server error, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1f1f] px-4 relative">
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px rgba(0,0,0,0.4) inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      
      <div className="w-full max-w-[440px] bg-[#102e2e]/90 rounded-[20px] p-8 border border-teal-900/50 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3">
            <span className="text-2xl">🏥</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/40 border border-green-700/50 text-[11px] text-green-300">
            🔒 Secure Admin V4.0 - Build Fixed - Anti Fill
          </div>
          <h1 className="text-[22px] font-bold text-white mt-4">Ali Welfare Trust Hospital</h1>
          <p className="text-teal-200/60 text-[13px] mt-1">Management & Live Content Control Center</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <input type="text" style={{display:'none'}} autoComplete="off" />
          <input type="password" style={{display:'none'}} autoComplete="off" />
          
          <div>
            <label className="text-[13px] text-gray-300">Administrative User ID *</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">👤</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setReadonly(false)}
                readOnly={readonly}
                autoComplete="off"
                data-lpignore="true"
                name="awt_user_v4_secure_123"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-700/60 rounded-xl text-white text-sm outline-none focus:border-teal-500"
                placeholder="Enter User ID"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[13px] text-gray-300">Administrative Password *</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔑</span>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setReadonly(false)}
                readOnly={readonly}
                autoComplete="new-password"
                data-lpignore="true"
                name="awt_pass_v4_secure_123"
                className="w-full pl-10 pr-12 py-3 bg-black/40 border border-gray-700/60 rounded-xl text-white text-sm outline-none focus:border-teal-500"
                placeholder="Enter Password"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-[13px] text-center bg-red-950/30 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-bold rounded-xl transition text-sm"
          >
            {isLoading ? 'Verifying...' : 'Sign In to Admin Dashboard →'}
          </button>
        </form>

        <p className="text-[11px] text-gray-500 text-center mt-6">
          V4.0 Secure - Fill Removed - Anti AutoFill Active
        </p>
      </div>
    </div>
  );
}

// BOTH exports - to fix build error permanently
export default AdminLogin;
