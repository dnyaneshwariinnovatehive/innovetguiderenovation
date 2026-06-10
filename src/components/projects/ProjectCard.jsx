'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Star } from 'lucide-react';
import ProjectImage from './ProjectImage';
import ProjectInfoRow from './ProjectInfoRow';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20 relative"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden rounded-t-2xl">
        <ProjectImage
          src={project.image || project.screenshots?.[0]}
          title={project.title}
          index={index}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-primary shadow-sm">
            <Star className="w-3 h-3 fill-primary/30" />
            {project.rating || 4.0}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3.5">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300" data-test="new-project-card">
          {project.title}
        </h3>
        <ProjectInfoRow
          difficulty={project.difficulty || project.difficulty_level}
          price={project.price}
        />
        <div className="border-t border-gray-100 pt-3.5 mt-auto">
          <Link
            href={`/project/${project.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-semibold text-white bg-gradient-to-r from-primary via-[#1e6385] to-accent rounded-xl no-underline transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </span>
            <span className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}