'use client';

import SectionTitle from '@/components/common/SectionTitle';
import ProjectCarousel from './ProjectCarousel';

export default function ProjectCarouselSection({ projects, title, subtitle, badge, badgeClass, buttonClass, sectionId }) {
  return (
    <section id={sectionId} className="py-16 sm:py-24 scroll-mt-[100px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className={`absolute inset-0 ${sectionId === 'top-selling' ? 'bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-500/[0.03] via-transparent to-transparent' : 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/[0.02] via-transparent to-transparent'} pointer-events-none`} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionTitle title={title} subtitle={subtitle} />
        {projects && projects.length > 0 ? (
          <ProjectCarousel
            projects={projects}
            badge={badge}
            badgeClass={badgeClass}
            buttonClass={buttonClass}
          />
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <p className="text-text-light text-sm">No projects available at this time. Check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}