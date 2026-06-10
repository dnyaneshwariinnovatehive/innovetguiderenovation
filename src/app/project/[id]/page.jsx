'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Share2, Check, X, Play, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import ProjectImage from '@/components/projects/ProjectImage';
import { API_BASE } from '@/lib/constants';
import axios from '@/lib/axios';

function resolveUrl(url) {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

const THEME_COLOR = '#1B5573';

export default function ProjectDetailsPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const descRef = useRef(null);

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

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: project?.title, url: window.location.href });
    } else {
      setShareOpen(true);
    }
  }, [project]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, []);

  const shareVia = useCallback((platform) => {
    const url = window.location.href;
    const title = project?.title || '';
    const text = encodeURIComponent(`${title} ${url}`);
    const links = {
      whatsapp: `https://wa.me/?text=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };
    if (links[platform]) window.open(links[platform], '_blank');
    setShareOpen(false);
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Project Not Found</h2>
          <p className="text-text-secondary mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/browse-all-projects">
            <Button variant="primary">Browse Projects</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const technologies = typeof project.technologies === 'string'
    ? project.technologies.split(',').map((t) => t.trim())
    : Array.isArray(project.technologies)
      ? project.technologies
      : typeof project.technology === 'string'
        ? project.technology.split(',').map((t) => t.trim())
        : Array.isArray(project.technology)
          ? project.technology
          : [];

  const screenshots = Array.isArray(project.screenshots) && project.screenshots.length > 0
    ? project.screenshots
    : project.image
      ? [project.image]
      : [];

  const projectType = project.price < 40 ? 'Mini Project' : 'Major Project';
  const domain = Array.isArray(technologies) && technologies.length > 0
    ? technologies[0]
    : project.domain || 'Web Development';

  const fallbackDescription = project.description || project.long_description ||
    `Explore the ${project.title} project — a ${project.difficulty_level || 'beginner'}-friendly project in the ${domain} domain. This project covers practical concepts using ${technologies.length > 0 ? technologies.join(', ') : 'modern development tools'} to help you build real-world skills through hands-on learning.`;

  return (
    <section className="py-12 sm:py-20">
      <Container>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
          <div>
            <Link href="/browse-all-projects" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary no-underline transition-colors mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Projects
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{project.title}</h1>
          </div>
          <button
            onClick={handleShare}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary text-primary font-semibold text-sm bg-transparent cursor-pointer transition-all hover:bg-primary hover:text-white"
            aria-label="Share project"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Images + Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Images */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-4">Project Images</h2>
              <div
                className="relative rounded-xl overflow-hidden mb-3 aspect-video bg-bg-light cursor-pointer"
                onClick={() => setImageModalOpen(true)}
              >
                <ProjectImage
                  src={allImages[selectedImage] || project.image}
                  title={project.title}
                  index={selectedImage}
                />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        i === selectedImage
                          ? 'border-primary opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-90'
                      }`}
                    >
                      <ProjectImage src={img} title={`${project.title} ${i + 1}`} index={i} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-text-primary mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span key={tech} className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Middle Column - Description + Demo/Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-4">Description</h2>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div ref={descRef} className={`relative overflow-hidden transition-all duration-300 ${descExpanded ? '' : 'max-h-[7.5rem]'}`}>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {fallbackDescription}
                  </p>
                  {!descExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                  )}
                </div>
                <button
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-primary font-semibold bg-transparent border-none cursor-pointer hover:underline"
                >
                  {descExpanded ? (
                    <>Read Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Read More <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>

            {/* Demo & Resources */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-4">Demo &amp; Resources</h2>
              <div className="flex flex-wrap gap-3">
                {project.video_tutorial && (
                  <a
                    href={resolveUrl(project.video_tutorial)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm no-underline transition-all hover:bg-primary-dark"
                  >
                    <Play className="w-4 h-4" />
                    View Demo Video
                  </a>
                )}
                {project.zip_file && (
                  <a
                    href={resolveUrl(project.zip_file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm no-underline transition-all hover:bg-primary hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Download Project Files
                  </a>
                )}
                {!project.video_tutorial && !project.zip_file && (
                  <p className="text-text-light text-sm">No demo or resources available for this project.</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Sticky Purchase Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 sticky top-24 space-y-5">
              {/* Price */}
              <div className="text-center pb-4 border-b border-gray-100">
                <p className="text-text-light text-xs uppercase tracking-wider mb-1">Price</p>
                <p className="text-3xl sm:text-4xl font-bold text-primary">₹{project.price?.toLocaleString() || 'N/A'}</p>
              </div>

              {/* Buy Now */}
              <Link href={`/buy-now/${project.id}`} className="block">
                <Button variant="primary" className="w-full text-center text-base py-3">
                  Buy Now
                </Button>
              </Link>

              {/* Share */}
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm bg-transparent cursor-pointer transition-all hover:bg-primary hover:text-white"
                aria-label="Share project"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {/* Info List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-bg-light">
                  <span className="text-text-light text-xs uppercase tracking-wider">Project Type</span>
                  <span className="text-text-primary font-semibold text-sm">{projectType}</span>
                </div>
                {project.difficulty_level && (
                  <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-bg-light">
                    <span className="text-text-light text-xs uppercase tracking-wider">Difficulty</span>
                    <span className="text-text-primary font-semibold text-sm capitalize">{project.difficulty_level}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-bg-light">
                  <span className="text-text-light text-xs uppercase tracking-wider">Domain</span>
                  <span className="text-text-primary font-semibold text-sm">{domain}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Share Modal */}
        {shareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShareOpen(false)}>
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-heavy" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-text-primary">Share this project</h3>
                <button onClick={() => setShareOpen(false)} className="bg-transparent border-none cursor-pointer text-text-secondary hover:text-text-primary p-1" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { key: 'whatsapp', label: 'WhatsApp', bg: '#25D366', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-1.102-1.025-1.847-2.29-2.064-2.677-.217-.387-.024-.597.163-.79.168-.174.373-.454.56-.68.187-.227.249-.39.374-.65.124-.26.062-.483-.031-.676-.094-.193-.672-1.622-.92-2.22-.24-.584-.487-.506-.668-.506-.177-.002-.38-.002-.582-.002-.202 0-.53.076-.808.38s-1.063 1.038-1.063 2.532c0 1.493 1.088 2.937 1.24 3.14.152.203 2.104 3.317 5.2 4.515 3.096 1.198 3.096.798 3.654.748.558-.05 1.8-.734 2.054-1.444.254-.71.254-1.32.177-1.447-.068-.126-.258-.202-.555-.35z' },
                  { key: 'twitter', label: 'Twitter', bg: '#1DA1F2', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                  { key: 'facebook', label: 'Facebook', bg: '#1877F2', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { key: 'linkedin', label: 'LinkedIn', bg: '#0A66C2', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { key: 'email', label: 'Email', bg: '#EA4335', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
                ].map(({ key, label, bg, icon }) => (
                  <button
                    key={key}
                    onClick={() => shareVia(key)}
                    className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border-none cursor-pointer"
                    aria-label={`Share on ${label}`}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill={bg}>
                      <path d={icon} />
                    </svg>
                    <span className="text-[10px] font-medium text-text-secondary">{label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-bg-light text-sm text-text-primary outline-none"
                />
                <button
                  onClick={copyLink}
                  className="shrink-0 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold border-none cursor-pointer transition-all hover:bg-primary-dark flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4" /> : null}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {imageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4" onClick={() => setImageModalOpen(false)}>
            <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setImageModalOpen(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white bg-transparent border-none cursor-pointer text-lg p-1"
                aria-label="Close image"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={resolveUrl(allImages[selectedImage] || project.image)}
                alt={project.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}