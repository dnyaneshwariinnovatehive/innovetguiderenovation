'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, Trash2, Edit3, X, AlertTriangle, User, Code, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function StudentProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/projects/${params.id}`).then(r => r.json()).then(d => {
      if (d.project) { setProject(d.project); setForm(d.project); }
    });
  }, [params.id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await fetch(`/api/admin/projects/${params.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    });
    setEditing(false);
    setProject({ ...form });
  };

  const handleDelete = async () => {
    await fetch(`/api/admin/projects/${params.id}`, { method: 'DELETE' });
    setShowDeleteModal(false);
    router.push('/admin/projects/student-list');
  };

  if (!project) return <div className="text-center py-12"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" /></div>;

  const projectFields = [
    { label: 'Title', name: 'title' }, { label: 'Price', name: 'price' },
    { label: 'Domain', name: 'domain' }, { label: 'Type', name: 'project_type' },
    { label: 'Difficulty', name: 'difficulty_level' }, { label: 'Status', name: 'status' },
    { label: 'Phase', name: 'phase' }, { label: 'Developer', name: 'developer_name' },
  ];

  const studentFields = [
    { label: 'Name', value: 'student_name' }, { label: 'Email', value: 'student_email' },
    { label: 'Phone', value: 'student_phone' }, { label: 'College', value: 'student_college' },
    { label: 'Course', value: 'student_course' }, { label: 'Year', value: 'student_year' },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects/student-list" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent">{project.title}</h1>
            <p className="text-gray-500 text-sm">Student Project Details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!editing ? (
            <>
              <button onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <Edit3 size={15} /> Edit
              </button>
              <button onClick={() => setShowDeleteModal(true)}
                className="p-2 hover:bg-red-50 rounded-xl transition-colors">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <Save size={15} /> Save
              </button>
              <button onClick={() => { setEditing(false); setForm({ ...project }); }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                <X size={15} /> Cancel
              </button>
            </>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Project Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Code size={16} className="text-blue-500" />
              </div>
              <h2 className="font-semibold text-gray-900">Project Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {projectFields.map(f => (
                <div key={f.name}>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">{f.label}</label>
                  {editing ? (
                    <input type="text" name={f.name} value={form[f.name] || ''} onChange={handleChange}
                      className="w-full mt-1 px-3.5 py-2.5 border border-border rounded-xl text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
                  ) : (
                    <p className="text-gray-900 mt-0.5 font-medium">{project[f.name] || 'N/A'}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Description</label>
              {editing ? (
                <textarea name="description" value={form.description || ''} onChange={handleChange} rows={4}
                  className="w-full mt-1 px-3.5 py-2.5 border border-border rounded-xl text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
              ) : (
                <p className="text-gray-600 mt-1 leading-relaxed">{project.description || 'No description'}</p>
              )}
            </div>
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
              {studentFields.filter(f => project[f.value]).map(f => (
                <div key={f.label}>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">{f.label}</label>
                  <p className="text-gray-900 mt-0.5 font-medium">{project[f.value]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <button onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <Trash2 size={16} /> Delete Project
            </button>
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
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}>
            <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle size={28} className="text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Project</h3>
                <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete &quot;{project.title}&quot;?</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">Cancel</button>
                  <button onClick={handleDelete}
                    className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl text-sm font-medium">Delete</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
