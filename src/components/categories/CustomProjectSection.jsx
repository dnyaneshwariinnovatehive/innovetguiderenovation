'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, Clock, Lightbulb, Target, Rocket } from 'lucide-react';
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

const highlights = [
  { icon: Lightbulb, text: '24×7 Project Assistance' },
  { icon: Target, text: 'Student & Industry Solutions' },
  { icon: Rocket, text: 'Mentor-Guided Execution' },
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
      <section id="custom-project" className="py-16 sm:py-24 scroll-mt-[100px]">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-success/20 to-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">Request Submitted! 🎉</h2>
            <p className="text-text-secondary max-w-md mx-auto text-sm sm:text-base">Your custom project request has been received! Our team will review it and get back to you within 24 hours.</p>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section id="custom-project" className="py-16 sm:py-24 scroll-mt-[100px] bg-gradient-to-br from-bg-light via-white to-[#f0f4f8] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

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
            <div className="p-4 rounded-xl bg-secondary/10 text-secondary text-sm mb-6 border border-secondary/20">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Panel - Info */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">Custom Project Support</h3>
                  <p className="text-text-secondary text-sm">We bring your ideas to life</p>
                </div>

                <ul className="space-y-3">
                  {highlights.map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-text-secondary text-sm group">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-success/10 to-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-4 h-4 text-success" />
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>

                <div className="bg-gradient-to-br from-bg-light to-white rounded-xl p-4 sm:p-5 space-y-3 border border-border/50">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary/60" />
                    <p className="text-sm text-text-secondary"><span className="font-semibold text-text-primary">Phone:</span> {CONTACT_INFO.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary/60" />
                    <p className="text-sm text-text-secondary"><span className="font-semibold text-text-primary">Email:</span> {CONTACT_INFO.supportEmail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary/60" />
                    <p className="text-sm text-text-secondary"><span className="font-semibold text-text-primary">Hours:</span> Mon-Sat, 10AM-7PM</p>
                  </div>
                </div>

                <blockquote className="relative pl-5 italic text-text-secondary text-sm leading-relaxed border-l-4 border-primary/40">
                  <span className="text-primary text-lg leading-none absolute -top-1 left-2">&ldquo;</span>
                  Because every great project starts with your idea.
                  <span className="block text-text-light text-[11px] mt-1.5 not-italic font-medium">&mdash; Custom-built. Mentor-guided. Result-driven.</span>
                </blockquote>

                <div>
                  <h4 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-primary" />
                    How It Works
                  </h4>
                  <ol className="space-y-2.5 text-sm text-text-secondary">
                    {['Submit your requirements', 'We review & respond', 'Get your custom project'].map((step, i) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5 shadow-sm">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Right Panel - Form */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="cp-name" className="block text-sm font-semibold text-text-primary mb-1.5">Your Name</label>
                    <input id="cp-name" type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
                  </div>
                  <div>
                    <label htmlFor="cp-email" className="block text-sm font-semibold text-text-primary mb-1.5">Email Address</label>
                    <input id="cp-email" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Enter your email address" className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
                  </div>
                  <div>
                    <label htmlFor="cp-type" className="block text-sm font-semibold text-text-primary mb-1.5">Project Type</label>
                    <select id="cp-type" name="project_type" required value={form.project_type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]">
                      {PROJECT_TYPES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cp-budget" className="block text-sm font-semibold text-text-primary mb-1.5">Budget Range</label>
                    <select id="cp-budget" name="budget" required value={form.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]">
                      {BUDGETS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="cp-tech" className="block text-sm font-semibold text-text-primary mb-1.5">Preferred Technologies</label>
                  <input id="cp-tech" type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="e.g., Python, React, MongoDB, etc." className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
                  <small className="text-text-light text-xs mt-1 block">Separate technologies with commas</small>
                </div>

                <div>
                  <label htmlFor="cp-deadline" className="block text-sm font-semibold text-text-primary mb-1.5">Project Deadline</label>
                  <input id="cp-deadline" type="date" name="deadline" required value={form.deadline} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)]" />
                </div>

                <div>
                  <label htmlFor="cp-desc" className="block text-sm font-semibold text-text-primary mb-1.5">Project Requirements</label>
                  <textarea id="cp-desc" name="description" required rows={4} value={form.description} onChange={handleChange} placeholder="Describe your project requirements in detail. Include features, functionalities, and any specific needs..." className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)] resize-y min-h-[100px]" />
                </div>

                <div>
                  <label htmlFor="cp-additional" className="block text-sm font-semibold text-text-primary mb-1.5">Additional Information</label>
                  <textarea id="cp-additional" name="additional_info" rows={3} value={form.additional_info} onChange={handleChange} placeholder="Any additional requirements, constraints, or special considerations..." className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:shadow-[0_0_0_3px_rgba(27,85,115,0.08)] resize-y min-h-[80px]" />
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