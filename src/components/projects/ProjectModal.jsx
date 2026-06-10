'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, BookOpen, Clock, Award } from 'lucide-react';
import ProjectImage from './ProjectImage';
import ProjectLevel from './ProjectLevel';
import ProjectPrice from './ProjectPrice';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const techs = Array.isArray(project.technology)
    ? project.technology
    : Array.isArray(project.technologies)
      ? project.technologies
      : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center cursor-pointer border-none transition-all duration-200 hover:bg-black/60 hover:scale-105"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Image */}
          <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
            <ProjectImage src={project.image || project.screenshots?.[0]} title={project.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {project.description && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{project.description}</p>
              </div>
            )}

            {techs.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-lg border border-primary/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-gray-400 text-xs mb-1">Level</p>
                <ProjectLevel difficulty={project.difficulty || project.difficulty_level} />
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-gray-400 text-xs mb-1">Price</p>
                <ProjectPrice price={project.price} />
              </div>
              {project.project_type && (
                <div className="bg-gray-50 rounded-xl p-3.5">
                  <p className="text-gray-400 text-xs mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Type
                  </p>
                  <p className="text-gray-900 text-sm font-semibold capitalize">
                    {project.project_type.replace(/_/g, ' ')}
                  </p>
                </div>
              )}
              {project.status && (
                <div className="bg-gray-50 rounded-xl p-3.5">
                  <p className="text-gray-400 text-xs mb-1 flex items-center gap-1">
                    <Award className="w-3 h-3" /> Status
                  </p>
                  <p className="text-gray-900 text-sm font-semibold capitalize">
                    {project.status}
                  </p>
                </div>
              )}
            </div>

            {project.requirements && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Requirements
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{project.requirements}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
