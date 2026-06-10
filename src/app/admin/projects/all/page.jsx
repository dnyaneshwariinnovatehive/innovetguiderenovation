'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search } from 'lucide-react';
import Link from 'next/link';

export default function TotalProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch(`/api/admin/projects?type=${filter}`).then(r => r.json()).then(d => setProjects(d.projects || []));
  }, [filter]);

  const filtered = projects.filter(p => !search || p.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Total Projects</h1>
          <p className="text-gray-500 text-sm mt-1">All projects overview ({projects.length} total)</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none">
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none w-48" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Owner</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Domain</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{p.title}</td>
                  <td className="px-6 py-3"><span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    p.owner_type === 'admin' ? 'bg-emerald-50 text-emerald-600' : 'bg-violet-50 text-violet-600'
                  }`}>{p.owner_type}</span></td>
                  <td className="px-6 py-3 font-medium">${p.price}</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">{p.domain}</span></td>
                  <td className="px-6 py-3"><span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    p.status === 'active' ? 'bg-emerald-50 text-emerald-600' : p.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                  }`}>{p.status}</span></td>
                  <td className="px-6 py-3">
                    <Link href={`/admin/projects/${p.owner_type === 'student' ? 'student-list' : 'admin-list'}/${p.id}`}
                      className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                      <Eye size={15} className="text-blue-500" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
              {!filtered.length && <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">No projects found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
