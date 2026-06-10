'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search } from 'lucide-react';
import Link from 'next/link';

export default function CustomEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/enquiries/custom').then(r => r.json()).then(d => setEnquiries(d.enquiries || []));
  }, []);

  const filtered = enquiries.filter(e => !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase()) || e.project_title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Enquiries</h1>
          <p className="text-gray-500 text-sm mt-1">Custom project requests from clients</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none w-64" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Project Title</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{e.name}</td>
                  <td className="px-6 py-3 text-gray-500 text-xs">{e.email}</td>
                  <td className="px-6 py-3 text-gray-700">{e.project_title}</td>
                  <td className="px-6 py-3 text-gray-500 text-xs">{e.created_at?.split(' ')[0] || 'N/A'}</td>
                  <td className="px-6 py-3">
                    <Link href={`/admin/enquiries/custom/${e.id}`} className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                      <Eye size={15} className="text-blue-500" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
              {!filtered.length && <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">No custom enquiries</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
