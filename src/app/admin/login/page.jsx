'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
        return;
      }
      router.push('/admin/dashboard');
    } catch {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2a3b] via-[#0d3b4f] to-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white/15 rounded-full" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">IG</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent">Admin Login</h1>
            <p className="text-gray-500 mt-1 text-sm">Sign in to access the admin dashboard</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]"
                placeholder="admin@123" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]"
                placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary via-[#1e6385] to-accent text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} InnovateGuide. All rights reserved.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
