import React, { useState } from 'react';

export default function AdminLogin({ onLoginSuccess }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Secure API call - password frontend me check nahi hoga
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('awt_admin_token', data.token);
        sessionStorage.setItem('awt_admin_token', data.token);
        localStorage.setItem('isAdmin', 'true');
        if (onLoginSuccess) {
          onLoginSuccess(data.token);
        } else {
          window.location.href = '/admin';
        }
      } else {
        setError('Invalid User ID or Password. Access Denied.');
      }
    } catch (err) {
      setError('Server error, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1f1f] px-4">
      <div className="w-full max-w-md bg-[#102e2e] rounded-2xl p-8 border border-teal-900">
        <h1 className="text-2xl font-bold text-white text-center mb-2">Ali Welfare Trust Hospital</h1>
        <p className="text-center text-teal-200/60 text-sm mb-8">Management & Live Content Control Center</p>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Administrative User ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              name="awt_user_id_secure"
              className="w-full mt-2 px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white outline-none focus:border-teal-500"
              placeholder="Enter User ID"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Administrative Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              name="awt_pass_secure_new"
              className="w-full mt-2 px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white outline-none focus:border-teal-500"
              placeholder="Enter Password"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition"
          >
            {isLoading ? 'Checking...' : 'Sign In to Admin Dashboard →'}
          </button>
        </form>

        <p className="text-[11px] text-gray-500 text-center mt-6">
          Unlisted security route for authorized hospital leadership only.
        </p>
      </div>
    </div>
  );
}
