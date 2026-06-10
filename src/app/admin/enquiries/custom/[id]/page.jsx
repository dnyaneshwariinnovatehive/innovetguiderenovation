'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CustomEnquiryDetail() {
  const params = useParams();
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/enquiries/custom/${params.id}`).then(r => r.json()).then(d => setEnquiry(d.enquiry || d));
  }, [params.id]);

  if (!enquiry) return <div className="text-center py-12 text-gray-400">Loading...</div>;

  const fields = [
    { label: 'Name', value: enquiry.name },
    { label: 'Email', value: enquiry.email },
    { label: 'Phone', value: enquiry.phone },
    { label: 'College', value: enquiry.college },
    { label: 'Course', value: enquiry.course },
    { label: 'Year', value: enquiry.year_of_study },
    { label: 'Project Title', value: enquiry.project_title },
    { label: 'Project Type', value: enquiry.project_type },
    { label: 'Description', value: enquiry.description },
    { label: 'Technologies', value: enquiry.technologies },
    { label: 'Timeline', value: enquiry.timeline },
    { label: 'Budget', value: enquiry.budget },
    { label: 'Reference', value: enquiry.reference },
    { label: 'Submitted', value: enquiry.created_at },
    { label: 'Status', value: enquiry.status },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/enquiries/custom" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Enquiry #{enquiry.id}</h1>
          <p className="text-gray-500 text-sm">Custom project request from {enquiry.name}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.filter(f => f.value).map(f => (
            <div key={f.label}>
              <label className="text-xs text-gray-400 uppercase">{f.label}</label>
              <p className="text-gray-900 mt-0.5">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
