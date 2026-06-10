'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FolderKanban, Hourglass, UserCheck, Users, ShoppingCart, ClipboardList, Plus, Eye, ArrowRight, Sparkles } from 'lucide-react';

const statCards = [
  { key: 'total_projects', label: 'Total Projects', href: '/admin/projects/all', icon: FolderKanban, color: 'from-blue-500 to-cyan-400' },
  { key: 'requested_projects', label: 'Requested Projects', href: '/admin/projects/requested', icon: Hourglass, color: 'from-amber-500 to-orange-400' },
  { key: 'admin_projects', label: 'Admin Projects', href: '/admin/projects/admin-list', icon: UserCheck, color: 'from-emerald-500 to-teal-400' },
  { key: 'student_projects', label: 'Student Projects', href: '/admin/projects/student-list', icon: Users, color: 'from-violet-500 to-purple-400' },
  { key: 'buy_enquiries', label: 'Buy Enquiries', href: '/admin/enquiries/buy', icon: ShoppingCart, color: 'from-rose-500 to-pink-400' },
  { key: 'custom_project_enquiries', label: 'Custom Enquiries', href: '/admin/enquiries/custom', icon: ClipboardList, color: 'from-cyan-500 to-teal-400' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(data => {
      setStats(data.stats);
      setProjects(data.recent_projects || []);
    });
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent">
            Dashboard
          </motion.h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Admin &mdash; here&apos;s your overview</p>
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/admin/projects/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary via-[#1e6385] to-accent text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300">
            <Plus size={16} /> Add New Project
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          const value = stats ? stats[card.key] : '...';
          return (
            <motion.div key={card.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
              <Link href={card.href} className="block group">
                <div className="relative bg-white rounded-2xl p-5 border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-transparent">
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <motion.span initial={{ scale: 1 }} whileHover={{ scale: 1.1 }}
                        className="text-2xl font-bold text-gray-900">{value}</motion.span>
                    </div>
                    <div className="mt-3 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">{card.label}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent" />
            <h2 className="font-semibold text-gray-900">Recent Projects</h2>
          </div>
          <Link href="/admin/projects/all" className="text-sm text-primary hover:text-accent font-medium inline-flex items-center gap-1 transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Domain</th>
                <th className="px-6 py-3 font-medium">Owner</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{p.title}</td>
                  <td className="px-6 py-3 font-semibold text-emerald-600">${p.price}</td>
                  <td className="px-6 py-3">
                    <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">{p.domain}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                      p.owner_type === 'admin' ? 'bg-emerald-50 text-emerald-600' : 'bg-violet-50 text-violet-600'
                    }`}>{p.owner_type}</span>
                  </td>
                  <td className="px-6 py-3">
                    <Link href={`/admin/projects/${p.owner_type === 'student' ? 'student-list/' : 'admin-list/'}${p.id}`}
                      className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors inline-flex">
                      <Eye size={15} className="text-blue-500" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
              {!projects.length && (
                <tr><td colSpan="5" className="px-6 py-10 text-center"><p className="text-gray-400">No projects yet</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
