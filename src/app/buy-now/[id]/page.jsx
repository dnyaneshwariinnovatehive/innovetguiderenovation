'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import axios from '@/lib/axios';

export default function BuyNowPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ full_name: '', email: '', mobile: '', college: '', branch: '', year: '', city_state: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params?.id) return;
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/project/${params.id}`);
        setProject(data.project || data);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [params?.id]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val));
      await axios.post(`/api/buy_now/${params.id}`, fd);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Submission failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader size="lg" /></div>;

  if (!project) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Project Not Found</h2>
          <Link href="/browse-all-projects"><Button variant="primary">Browse Projects</Button></Link>
        </div>
      </Container>
    );
  }

  if (success) {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Purchase Request Submitted!</h2>
          <p className="text-text-secondary max-w-md mx-auto">We&apos;ll contact you shortly with payment details and project access.</p>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-12 sm:py-20 bg-bg-light">
      <Container>
        <Link href={`/project/${params.id}`} className="inline-flex items-center gap-2 text-text-secondary hover:text-primary no-underline transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Project
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-card shadow-card p-8">
              <h1 className="text-2xl font-bold text-text-primary mb-6">Buy Now</h1>
              <p className="text-text-secondary mb-6">Fill in your details to purchase the project.</p>
              {error && <div className="p-4 rounded-lg bg-secondary/10 text-secondary text-sm mb-4">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Full Name *</label>
                    <input type="text" name="full_name" required value={form.full_name} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Email Address *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Enter your email address" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Mobile Number *</label>
                    <input type="tel" name="mobile" required value={form.mobile} onChange={handleChange} placeholder="Enter your mobile number" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">College / University Name *</label>
                    <input type="text" name="college" required value={form.college} onChange={handleChange} placeholder="Enter your college/university name" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Branch / Department *</label>
                    <input type="text" name="branch" required value={form.branch} onChange={handleChange} placeholder="Enter your branch/department" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Year / Semester *</label>
                    <input type="text" name="year" required value={form.year} onChange={handleChange} placeholder="Enter your year/semester" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">City / State (optional)</label>
                  <input type="text" name="city_state" value={form.city_state} onChange={handleChange} placeholder="Enter your city/state" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:border-primary transition-colors" />
                </div>
                <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                  {submitting ? 'Processing...' : `Submit Purchase - ₹${project.price?.toLocaleString() || 'N/A'}`}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
              <h3 className="font-bold text-text-primary mb-4">Order Summary</h3>
              <div className="aspect-video rounded-lg bg-bg-light overflow-hidden mb-4">
                {project.image_path ? (
                  <img src={project.image_path} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-light text-sm">No Image</div>
                )}
              </div>
              <h4 className="font-semibold text-text-primary mb-1">{project.title}</h4>
              <p className="text-text-secondary text-sm mb-4">{project.description?.slice(0, 120)}...</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-text-light text-sm">Total</span>
                <span className="text-2xl font-bold text-primary">₹{project.price?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
