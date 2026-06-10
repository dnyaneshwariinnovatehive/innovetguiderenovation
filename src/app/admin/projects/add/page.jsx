'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Upload } from 'lucide-react';
import Link from 'next/link';

export default function AddProject() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', project_type: 'mini', difficulty_level: 'intermediate', price: '', domain: '',
    description: '', technologies: '', video_tutorial: '', developer_name: 'Admin',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
          owner_type: 'admin',
          status: 'active',
          phase: 'planning',
          screenshots: '[]',
        }),
      });
      router.push('/admin/projects/admin-list');
    } catch {
      alert('Failed to add project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Project</h1>
          <p className="text-gray-500 text-sm">Create a new project listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="text-xs text-gray-400 uppercase font-medium">Project Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required
              className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Enter project title" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-medium">Type *</label>
              <select name="project_type" value={form.project_type} onChange={handleChange} className="w-full mt-1.5 px-3 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none">
                <option value="mini">Mini Project</option><option value="major">Major Project</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-medium">Difficulty *</label>
              <select name="difficulty_level" value={form.difficulty_level} onChange={handleChange} className="w-full mt-1.5 px-3 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none">
                <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-medium">Price *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} required
                className="w-full mt-1.5 px-3 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none" placeholder="0" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-medium">Domain *</label>
              <select name="domain" value={form.domain} onChange={handleChange} required className="w-full mt-1.5 px-3 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none">
                <option value="">Choose...</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Desktop Application">Desktop Application</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase font-medium">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} required
              className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Describe the project" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase font-medium">Technologies *</label>
            <input type="text" name="technologies" value={form.technologies} onChange={handleChange} required
              className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. React, Node.js, MongoDB" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-medium">Video URL</label>
              <input type="url" name="video_tutorial" value={form.video_tutorial} onChange={handleChange}
                className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-medium">Developer Name</label>
              <input type="text" name="developer_name" value={form.developer_name} onChange={handleChange}
                className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary outline-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
          <button type="submit" disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-60">
            <Plus size={16} /> {submitting ? 'Adding...' : 'Add Project'}
          </button>
          <Link href="/admin/dashboard" className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
