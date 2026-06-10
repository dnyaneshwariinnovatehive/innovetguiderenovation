'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Eye, User, Code, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function RequestedProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/projects/${params.id}`).then(r => r.json()).then(d => {
      setProject(d.project);
      setLoading(false);
    });
  }, [params.id]);

  const confirmAction = async () => {
    setActionLoading(true);
    await fetch(`/api/admin/projects/${params.id}/${modalAction}`, { method: 'POST' });
    setActionLoading(false);
    setShowModal(false);
    router.push('/admin/projects/requested');
  };

  if (loading) return <div className="text-center py-12"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" /></div>;
  if (!project) return <div className="text-center py-12 text-gray-400">Project not found</div>;

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-6">
        <Link href="/admin/projects/requested" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft size={20} className="text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent">{project.title}</h1>
          <p className="text-gray-500 text-sm">Project Request Details</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Project Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Code size={16} className="text-blue-500" />
              </div>
              <h2 className="font-semibold text-gray-900">Project Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: 'Title', value: project.title, bold: true },
                { label: 'Price', value: `$${project.price}`, bold: true, color: 'text-emerald-600' },
                { label: 'Domain', value: project.domain, badge: true },
                { label: 'Type', value: project.project_type },
                { label: 'Difficulty', value: project.difficulty_level },
                { label: 'Phase', value: project.phase || 'N/A' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">{f.label}</label>
                  <p className={`mt-0.5 ${f.bold ? 'font-semibold' : ''} ${f.color || 'text-gray-900'}`}>
                    {f.badge ? <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">{f.value}</span> : f.value}
                  </p>
                </div>
              ))}
            </div>
            {project.description && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Description</label>
                <p className="text-gray-600 mt-1 leading-relaxed">{project.description}</p>
              </div>
            )}
            {project.technologies && (
              <div className="mt-4">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Technologies</label>
                <p className="text-gray-600 mt-1">{project.technologies}</p>
              </div>
            )}
          </motion.div>

          {/* Student Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
                <User size={16} className="text-violet-500" />
              </div>
              <h2 className="font-semibold text-gray-900">Student Information</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
              {[
                { label: 'Name', value: project.student_name },
                { label: 'Email', value: project.student_email },
                { label: 'Phone', value: project.student_phone },
                { label: 'College', value: project.student_college },
                { label: 'Course', value: project.student_course },
                { label: 'Year', value: project.student_year },
              ].filter(f => f.value).map(f => (
                <div key={f.label}>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">{f.label}</label>
                  <p className="text-gray-900 mt-0.5 font-medium">{f.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="font-semibold text-gray-900 mb-4">Actions</h2>
            <div className="space-y-3">
              <button onClick={() => { setModalAction('approve'); setShowModal(true); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg">
                <Check size={16} /> Approve Project
              </button>
              <button onClick={() => { setModalAction('reject'); setShowModal(true); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg">
                <X size={16} /> Reject Project
              </button>
              <Link href="/admin/projects/requested"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors text-sm font-medium border border-gray-200">
                <ArrowLeft size={16} /> Back
              </Link>
            </div>
          </motion.div>

          {/* Screenshots */}
          {project.screenshots && project.screenshots !== '[]' && project.screenshots !== 'null' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <ImageIcon size={16} className="text-amber-500" />
                </div>
                <h2 className="font-semibold text-gray-900">Screenshots</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(JSON.parse(project.screenshots) || []).map((s, i) => (
                  <img key={i} src={s} alt="" className="rounded-xl w-full h-24 object-cover border border-gray-100" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Status Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="font-semibold text-gray-900 mb-3">Status</h2>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium ${
              project.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
              project.status === 'pending' ? 'bg-amber-50 text-amber-600' :
              'bg-red-50 text-red-600'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                project.status === 'active' ? 'bg-emerald-500' :
                project.status === 'pending' ? 'bg-amber-500' :
                'bg-red-500'
              }`} />
              {project.status}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => !actionLoading && setShowModal(false)}>
            <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  modalAction === 'approve' ? 'bg-emerald-50' : 'bg-red-50'
                }`}>
                  {modalAction === 'approve'
                    ? <Check size={28} className="text-emerald-500" />
                    : <X size={28} className="text-red-500" />
                  }
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {modalAction === 'approve' ? 'Approve Project' : 'Reject Project'}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  {modalAction === 'approve'
                    ? 'This will make the project visible to all users.'
                    : 'This will mark the project as rejected.'
                  }
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setShowModal(false)} disabled={actionLoading}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button onClick={confirmAction} disabled={actionLoading}
                    className={`flex-1 py-2.5 text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      modalAction === 'approve'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
                        : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
                    }`}>
                    {actionLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : modalAction === 'approve' ? 'Approve' : 'Reject'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
