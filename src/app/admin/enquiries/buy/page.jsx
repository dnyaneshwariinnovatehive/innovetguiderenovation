'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function BuyEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');

  const load = () => fetch('/api/admin/enquiries/buy').then(r => r.json()).then(d => setEnquiries(d.enquiries || []));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    await fetch(`/api/admin/enquiries/buy/${id}`, { method: 'DELETE' });
    load();
  };

  const filtered = enquiries.filter(e => !search || e.buyer_name?.toLowerCase().includes(search.toLowerCase()) || e.project_title?.toLowerCase().includes(search.toLowerCase()) || e.buyer_email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buy Enquiries</h1>
          <p className="text-gray-500 text-sm mt-1">Purchase requests from buyers</p>
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
                <th className="px-6 py-3 font-medium">Buyer</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Project</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{e.buyer_name}</td>
                  <td className="px-6 py-3 text-gray-500 text-xs">{e.buyer_email}</td>
                  <td className="px-6 py-3 text-gray-700">{e.project_title || `Project #${e.project_id}`}</td>
                  <td className="px-6 py-3 text-gray-500 text-xs">{e.created_at?.split(' ')[0] || 'N/A'}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/enquiries/buy/${e.id}`} className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                        <Eye size={15} className="text-blue-500" />
                      </Link>
                      <button onClick={() => handleDelete(e.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors inline-block">
                        <Trash2 size={15} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {!filtered.length && <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">No buy enquiries</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
