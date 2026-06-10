'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';
import axios from '@/lib/axios';

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const DOMAINS = ['Web Development', 'App Development', 'Web Application', 'Data Science', 'AIML', 'Blockchain', 'Cyber Security', 'Cloud Computing'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_SCREENSHOT_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
const ALLOWED_ZIP_TYPES = ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed', 'application/x-tar', 'application/gzip'];

export default function SellYourProjectPage() {
  const [form, setForm] = useState({
    student_name: '', email: '', mobile: '', college_name: '', course: '', year: '',
    project_title: '', developer: '', difficulty: '', price: '', domain: '',
    description: '', technologies: '', video_url: '', github_url: '',
    requirements: '', instructions: '',
  });
  const [screenshots, setScreenshots] = useState([]);
  const [zipFile, setZipFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleScreenshots = (e) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => {
      if (!ALLOWED_IMAGE_TYPES.includes(f.type)) { setError(`${f.name}: Invalid image type.`); return false; }
      if (f.size > MAX_SCREENSHOT_SIZE) { setError(`${f.name}: Max 2MB per image.`); return false; }
      return true;
    });
    setScreenshots((prev) => [...prev, ...valid].slice(0, 5));
    setError('');
  };

  const removeScreenshot = (i) => setScreenshots((prev) => prev.filter((_, idx) => idx !== i));

  const handleZip = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      if (!ALLOWED_ZIP_TYPES.includes(f.type) && !f.name.match(/\.(zip|rar|7z|tar|gz)$/i)) {
        setError('Invalid project file type. Allowed: ZIP, RAR, 7Z, TAR, GZ.');
        return;
      }
      if (f.size > MAX_FILE_SIZE) { setError('Project file size too large. Maximum 10MB.'); return; }
      setZipFile(f);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val));
      screenshots.forEach((f) => fd.append('screenshots', f));
      if (zipFile) fd.append('zip_file', zipFile);
      await axios.post('/api/sell_your_project', fd);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Project Submitted Successfully!</h2>
          <p className="text-text-secondary max-w-md mx-auto">We will review it and contact you soon.</p>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-12 sm:py-20 bg-bg-light">
      <Container>
        <SectionTitle title="Sell Your Project" subtitle="Share your project with the community and earn." />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white rounded-card shadow-card p-8 space-y-6"
        >
          {error && <div className="p-4 rounded-lg bg-secondary/10 text-secondary text-sm">{error}</div>}

          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-3">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'student_name', label: 'Student Name', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'mobile', label: 'Mobile', type: 'tel', required: true },
              { name: 'college_name', label: 'College Name', type: 'text', required: true },
              { name: 'course', label: 'Course', type: 'text', required: true },
              { name: 'year', label: 'Year', type: 'text', required: true },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">{f.label} *</label>
                <input type={f.type} name={f.name} required={f.required} value={form[f.name]} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-3">Project Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Project Title *</label>
              <input type="text" name="project_title" required value={form.project_title} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Developer Name *</label>
              <input type="text" name="developer" required value={form.developer} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Difficulty *</label>
              <select name="difficulty" required value={form.difficulty} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors">
                <option value="">Select Difficulty</option>
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Price (₹) *</label>
              <input type="number" name="price" required min="0" step="0.01" value={form.price} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Domain *</label>
              <select name="domain" required value={form.domain} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors">
                <option value="">Select Domain</option>
                {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Technologies (comma-separated)</label>
              <input type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="e.g., Python, Flask, MySQL" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Description *</label>
            <textarea name="description" required rows={4} value={form.description} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors resize-y" />
          </div>

          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-3">Links & References</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Video URL (Demo)</label>
              <input type="url" name="video_url" value={form.video_url} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">GitHub URL</label>
              <input type="url" name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Requirements</label>
            <textarea name="requirements" rows={3} value={form.requirements} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors resize-y" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Setup Instructions</label>
            <textarea name="instructions" rows={3} value={form.instructions} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors resize-y" />
          </div>

          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-3">Uploads</h3>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Screenshots (up to 5, max 2MB each)</label>
            <div className="border-2 border-dashed border-border rounded-card p-6 text-center transition-colors hover:border-primary">
              {screenshots.length > 0 ? (
                <div className="space-y-2">
                  {screenshots.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-bg-light rounded-lg px-4 py-2">
                      <span className="text-sm text-text-primary truncate mr-2">{f.name}</span>
                      <button type="button" onClick={() => removeScreenshot(i)} className="bg-transparent border-none cursor-pointer text-secondary hover:text-secondary-dark shrink-0" aria-label="Remove screenshot"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                  {screenshots.length < 5 && (
                    <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-primary font-medium mt-2">
                      <Upload className="w-4 h-4" /> Add more
                      <input type="file" accept="image/*" multiple onChange={handleScreenshots} className="hidden" />
                    </label>
                  )}
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-text-light" />
                  <span className="text-sm text-text-secondary">Click to upload screenshots</span>
                  <input type="file" accept="image/*" multiple onChange={handleScreenshots} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Project File (ZIP/RAR/7Z, max 10MB)</label>
            <div className="border-2 border-dashed border-border rounded-card p-6 text-center transition-colors hover:border-primary">
              {zipFile ? (
                <div className="flex items-center justify-between bg-bg-light rounded-lg px-4 py-3">
                  <span className="text-sm text-text-primary truncate mr-4">{zipFile.name}</span>
                  <button type="button" onClick={() => setZipFile(null)} className="bg-transparent border-none cursor-pointer text-secondary hover:text-secondary-dark" aria-label="Remove file"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-text-light" />
                  <span className="text-sm text-text-secondary">Click to upload or drag and drop</span>
                  <input type="file" accept=".zip,.rar,.7z,.tar,.gz" onChange={handleZip} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Project'}
          </Button>
        </motion.form>
      </Container>
    </section>
  );
}
