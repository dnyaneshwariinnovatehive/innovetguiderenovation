'use client';

import SectionTitle from '@/components/common/SectionTitle';
import ProjectCarousel from './ProjectCarousel';

export default function TrendingProjectsSection({ title, subtitle, projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 scroll-mt-[100px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionTitle title={title} subtitle={subtitle} />
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
