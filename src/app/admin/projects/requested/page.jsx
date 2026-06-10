'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Check, X, Search } from 'lucide-react';
import Link from 'next/link';

export default function RequestedProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/projects/requested').then(r => r.json()).then(d => setProjects(d.projects || []));
  }, []);

  const handleAction = async (id, action) => {
    if (!confirm(`Are you sure you want to ${action} this project?`)) return;
    await fetch(`/api/admin/projects/${id}/${action}`, { method: 'POST' });
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const filtered = projects.filter(p =>
    !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.student_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Requests</h1>
          <p className="text-gray-500 text-sm mt-1">Pending project submissions from students</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none w-64" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Project Title</th>
                <th className="px-6 py-3 font-medium">Requester</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Domain</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{p.title}</td>
                  <td className="px-6 py-3 text-gray-600">{p.student_name || p.developer_name}</td>
                  <td className="px-6 py-3 text-gray-500">{p.student_email}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">${p.price}</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">{p.domain}</span></td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/projects/requested/${p.id}`} className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={15} className="text-blue-500" />
                      </Link>
                      <button onClick={() => handleAction(p.id, 'approve')} className="p-1.5 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Check size={15} className="text-emerald-500" />
                      </button>
                      <button onClick={() => handleAction(p.id, 'reject')} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <X size={15} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {!filtered.length && <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">No pending requests</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
