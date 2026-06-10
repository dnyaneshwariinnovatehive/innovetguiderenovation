'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, UserCheck, Users, FolderOpen,
  ShoppingCart, ClipboardList, LogOut, Menu, X, ChevronRight, PlusCircle,
} from 'lucide-react';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects/requested', label: 'Project Requests', icon: FolderKanban },
  { href: '/admin/projects/add', label: 'Add Project', icon: PlusCircle },
  { href: '/admin/projects/admin-list', label: 'Admin Projects', icon: UserCheck },
  { href: '/admin/projects/student-list', label: 'Student Projects', icon: Users },
  { href: '/admin/projects/all', label: 'Total Projects', icon: FolderOpen },
  { href: '/admin/enquiries/buy', label: 'Buy Enquiries', icon: ShoppingCart },
  { href: '/admin/enquiries/custom', label: 'Custom Enquiries', icon: ClipboardList },
];

const sidebarVariants = {
  open: { width: 256, transition: { duration: 0.3, ease: 'easeInOut' } },
  closed: { width: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
};

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authed, setAuthed] = useState(null);

  const isLoginPage = pathname === '/admin/login';
  const [initialized, setInitialized] = useState(isLoginPage);

  useEffect(() => {
    if (isLoginPage) { setInitialized(true); setAuthed(true); return; }
    fetch('/api/admin/stats', { cache: 'no-store' })
      .then(r => { if (!r.ok) throw new Error(); setAuthed(true); setInitialized(true); })
      .catch(() => router.push('/admin/login'));
  }, [isLoginPage]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (!initialized) {
    return <div className="min-h-screen bg-gradient-to-br from-bg-light via-white to-[#f0f4f8]" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light via-white to-[#f0f4f8] flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed md:relative md:ml-0 h-screen bg-gradient-to-b from-[#0a2a3b] via-[#0d3b4f] to-primary text-white z-50 overflow-hidden flex flex-col shadow-[4px_0_20px_rgba(0,0,0,0.1)]"
      >
        {sidebarOpen && (
          <>
            <div className="p-5 border-b border-white/10">
              <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-white/20 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-lg font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">IG</span>
                </div>
                <div>
                  <span className="font-semibold text-base block">InnovateGuide</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest">Admin Panel</span>
                </div>
              </Link>
            </div>

            <nav className="flex-1 py-3 overflow-y-auto">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} className={`relative flex items-center gap-3 px-5 py-2.5 text-sm transition-all duration-200 group ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}>
                    {isActive && (
                      <motion.div layoutId="activeNav" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-white rounded-r-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                    )}
                    <div className={`relative z-10 flex items-center gap-3 ${isActive ? 'translate-x-1' : ''} transition-transform`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-white/15' : 'group-hover:bg-white/5'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <span className="font-medium">{link.label}</span>
                      {isActive && <ChevronRight size={12} className="ml-auto text-white/40" />}
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <button onClick={handleLogout} className="flex items-center gap-3 text-white/40 hover:text-white text-sm transition-colors w-full px-2 py-2 rounded-lg hover:bg-white/5">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </>
        )}
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-4 md:px-6 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            {sidebarOpen ? <X size={20} className="text-gray-500" /> : <Menu size={20} className="text-gray-500" />}
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900 bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent">Admin User</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider">Administrator</div>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
