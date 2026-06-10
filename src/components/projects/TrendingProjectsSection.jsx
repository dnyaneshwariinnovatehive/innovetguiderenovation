'use client';

import SectionTitle from '@/components/common/SectionTitle';
import ProjectCarousel from './ProjectCarousel';

export default function TrendingProjectsSection({ title, subtitle, projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 scroll-mt-[100px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative">
        <SectionTitle title={title} subtitle={subtitle} />
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}