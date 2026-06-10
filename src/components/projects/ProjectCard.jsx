'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import ProjectImage from './ProjectImage';
import ProjectInfoRow from './ProjectInfoRow';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden rounded-t-xl">
        <ProjectImage
          src={project.image || project.screenshots?.[0]}
          title={project.title}
          index={index}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center leading-snug line-clamp-2" data-test="new-project-card">
          {project.title}
        </h3>
        <ProjectInfoRow
          difficulty={project.difficulty || project.difficulty_level}
          price={project.price}
        />
        <div className="border-t border-gray-50" />
        <Link
          href={`/project/${project.id}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-xl no-underline transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
