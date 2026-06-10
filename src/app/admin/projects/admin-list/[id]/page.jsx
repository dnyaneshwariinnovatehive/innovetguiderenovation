'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, Trash2, Edit3, X, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function AdminProjectDetail() {
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
    router.push('/admin/projects/admin-list');
  };

  if (!project) return <div className="text-center py-12"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" /></div>;

  const fields = [
    { label: 'Title', name: 'title' },
    { label: 'Price', name: 'price' },
    { label: 'Domain', name: 'domain' },
    { label: 'Project Type', name: 'project_type' },
    { label: 'Difficulty', name: 'difficulty_level' },
    { label: 'Status', name: 'status' },
    { label: 'Phase', name: 'phase' },
    { label: 'Developer', name: 'developer_name' },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects/admin-list" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent">{project.title}</h1>
            <p className="text-gray-500 text-sm">Admin Project Details</p>
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

      {/* Project Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {fields.map(field => (
            <div key={field.name}>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">{field.label}</label>
              {editing ? (
                <input type="text" name={field.name} value={form[field.name] || ''} onChange={handleChange}
                  className="w-full mt-1 px-3.5 py-2.5 border border-border rounded-xl text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
              ) : (
                <p className="text-gray-900 mt-0.5 font-medium">{project[field.name] || 'N/A'}</p>
              )}
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Description</label>
            {editing ? (
              <textarea name="description" value={form.description || ''} onChange={handleChange} rows={4}
                className="w-full mt-1 px-3.5 py-2.5 border border-border rounded-xl text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
            ) : (
              <p className="text-gray-600 mt-1 leading-relaxed">{project.description || 'No description'}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Technologies</label>
            {editing ? (
              <input type="text" name="technologies" value={form.technologies || ''} onChange={handleChange}
                className="w-full mt-1 px-3.5 py-2.5 border border-border rounded-xl text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
            ) : (
              <p className="text-gray-600 mt-1">{project.technologies || 'N/A'}</p>
            )}
          </div>
        </div>
      </motion.div>

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
                <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete &quot;{project.title}&quot;? This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleDelete}
                    className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-rose-700 transition-all duration-300">
                    Delete
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
