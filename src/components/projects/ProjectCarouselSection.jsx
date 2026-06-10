'use client';

import { motion } from 'framer-motion';
import ProjectCarousel from './ProjectCarousel';

export default function ProjectCarouselSection({ projects, title, subtitle, badge, badgeClass, buttonClass, sectionId }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id={sectionId} className="py-12 sm:py-20 scroll-mt-[100px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-text-primary text-center mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
        <ProjectCarousel
          projects={projects}
          badge={badge}
          badgeClass={badgeClass}
          buttonClass={buttonClass}
        />
      </div>
    </section>
  );
}
