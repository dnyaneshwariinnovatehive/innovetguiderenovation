'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function BuyEnquiryDetail() {
  const params = useParams();
  const router = useRouter();
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/enquiries/buy/${params.id}`).then(r => r.json()).then(d => setEnquiry(d.enquiry || d));
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Delete this enquiry permanently?')) return;
    await fetch(`/api/admin/enquiries/buy/${params.id}`, { method: 'DELETE' });
    router.push('/admin/enquiries/buy');
  };

  // const handleFulfill = async () => {
  //   await fetch(`/api/admin/enquiries/buy/${params.id}/fulfill`, { method: 'POST' });
  //   alert('Marked as fulfilled');
  // };

  if (!enquiry) return <div className="text-center py-12 text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/enquiries/buy" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buy Enquiry #{enquiry.id}</h1>
            <p className="text-gray-500 text-sm">Purchase request details</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <button onClick={handleFulfill} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600">
            <CheckCircle size={16} /> Fulfill
          </button> */}
          <button onClick={handleDelete} className="p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} className="text-red-500" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Buyer Information</h2>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-400 uppercase">Name</label><p className="text-gray-900 mt-0.5">{enquiry.buyer_name}</p></div>
              <div><label className="text-xs text-gray-400 uppercase">Email</label><p className="text-gray-900 mt-0.5">{enquiry.buyer_email}</p></div>
              <div><label className="text-xs text-gray-400 uppercase">Phone</label><p className="text-gray-900 mt-0.5">{enquiry.buyer_phone || 'N/A'}</p></div>
              <div><label className="text-xs text-gray-400 uppercase">Submitted</label><p className="text-gray-900 mt-0.5">{enquiry.created_at || 'N/A'}</p></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Project Information</h2>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-400 uppercase">Project</label>
                <p className="text-gray-900 mt-0.5">
                  {enquiry.project_title
                    ? <Link href={`/projects/${enquiry.project_id}`} className="text-primary hover:underline">{enquiry.project_title}</Link>
                    : `Project #${enquiry.project_id}`}
                </p>
              </div>
              <div><label className="text-xs text-gray-400 uppercase">Project ID</label><p className="text-gray-900 mt-0.5">{enquiry.project_id}</p></div>
              <div><label className="text-xs text-gray-400 uppercase">Message</label><p className="text-gray-600 mt-0.5">{enquiry.message || 'No message'}</p></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Actions</h2>
            <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors text-sm font-medium">
              <Trash2 size={16} /> Delete Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
