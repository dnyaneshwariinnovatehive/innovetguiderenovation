'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';
import { CONTACT_INFO } from '@/lib/constants';
import axios from '@/lib/axios';

const PROJECT_TYPES = [
  { value: '', label: 'Select project type' },
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'desktop', label: 'Desktop Application' },
  { value: 'ai', label: 'AI/ML Project' },
  { value: 'data', label: 'Data Science' },
  { value: 'iot', label: 'IoT Project' },
  { value: 'game', label: 'Game Development' },
  { value: 'other', label: 'Other' },
];

const BUDGETS = [
  { value: '', label: 'Select budget range' },
  { value: 'under-50', label: 'Under ₹50' },
  { value: '50-100', label: '₹50 - ₹100' },
  { value: '100-200', label: '₹100 - ₹200' },
  { value: '200-500', label: '₹200 - ₹500' },
  { value: 'over-500', label: 'Over ₹500' },
];

export default function CustomProjectSection() {
  const [form, setForm] = useState({
    name: '', email: '', project_type: '', budget: '', technologies: '',
    deadline: '', description: '', additional_info: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val));
      await axios.post('/api/custom_project_request', fd);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Submission failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="custom-project" className="py-12 sm:py-20 scroll-mt-[100px]">
        <Container>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Request Submitted!</h2>
            <p className="text-text-secondary max-w-md mx-auto">Your custom project request has been submitted! We will contact you soon.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="custom-project" className="py-12 sm:py-20 scroll-mt-[100px] bg-gradient-to-br from-bg-light to-[#f0f4f8]">
      <Container>
        <SectionTitle
          title="Make Custom Project for You"
          subtitle="Need a project tailored to your specific requirements? Our student developers can create custom solutions just for you."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {error && (
            <div className="p-4 rounded-lg bg-secondary/10 text-secondary text-sm mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Panel - Info */}
              <div className="lg:col-span-2 bg-white rounded-card shadow-card p-8 space-y-6">
                <h3 className="text-xl font-bold text-text-primary">Custom Project Support</h3>
                <ul className="space-y-3">
                  {['24×7 Project Assistance', 'Student & Industry Solutions', 'Mentor-Guided Execution'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-text-secondary text-sm">
                      <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0 text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="bg-bg-light rounded-lg p-4 space-y-2">
                  <p className="text-sm text-text-secondary"><strong>Phone:</strong> {CONTACT_INFO.phone}</p>
                  <p className="text-sm text-text-secondary"><strong>Email:</strong> {CONTACT_INFO.supportEmail}</p>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary text-sm">
                  &ldquo;Because every great project starts with your idea.&rdquo;
                  <span className="block text-text-light text-xs mt-1 not-italic">Custom-built. Mentor-guided. Result-driven.</span>
                </blockquote>

                <div>
                  <h4 className="font-bold text-text-primary mb-3">How It Works:</h4>
                  <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
                    <li>Submit your requirements</li>
                    <li>We review & respond</li>
                    <li>Get your custom project</li>
                  </ol>
                </div>
              </div>

              {/* Right Panel - Form */}
              <div className="lg:col-span-3 bg-white rounded-card shadow-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cp-name" className="block text-sm font-semibold text-text-primary mb-1.5">Your Name</label>
                    <input id="cp-name" type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="cp-email" className="block text-sm font-semibold text-text-primary mb-1.5">Email Address</label>
                    <input id="cp-email" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Enter your email address" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="cp-type" className="block text-sm font-semibold text-text-primary mb-1.5">Project Type</label>
                    <select id="cp-type" name="project_type" required value={form.project_type} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors">
                      {PROJECT_TYPES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cp-budget" className="block text-sm font-semibold text-text-primary mb-1.5">Budget Range</label>
                    <select id="cp-budget" name="budget" required value={form.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors">
                      {BUDGETS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="cp-tech" className="block text-sm font-semibold text-text-primary mb-1.5">Preferred Technologies</label>
                  <input id="cp-tech" type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="e.g., Python, React, MongoDB, etc." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  <small className="text-text-light text-xs mt-1 block">Separate technologies with commas</small>
                </div>

                <div>
                  <label htmlFor="cp-deadline" className="block text-sm font-semibold text-text-primary mb-1.5">Project Deadline</label>
                  <input id="cp-deadline" type="date" name="deadline" required value={form.deadline} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                </div>

                <div>
                  <label htmlFor="cp-desc" className="block text-sm font-semibold text-text-primary mb-1.5">Project Requirements</label>
                  <textarea id="cp-desc" name="description" required rows={4} value={form.description} onChange={handleChange} placeholder="Describe your project requirements in detail. Include features, functionalities, and any specific needs..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors resize-y" />
                </div>

                <div>
                  <label htmlFor="cp-additional" className="block text-sm font-semibold text-text-primary mb-1.5">Additional Information</label>
                  <textarea id="cp-additional" name="additional_info" rows={3} value={form.additional_info} onChange={handleChange} placeholder="Any additional requirements, constraints, or special considerations..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors resize-y" />
                </div>

                <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Request Custom Project'}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
