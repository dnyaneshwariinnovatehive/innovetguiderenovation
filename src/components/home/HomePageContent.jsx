'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import AboutUsSection from '@/components/about/AboutUsSection';
import ProjectCarouselSection from '@/components/projects/ProjectCarouselSection';
import CategorySection from '@/components/categories/CategorySection';
import CustomProjectSection from '@/components/categories/CustomProjectSection';
import Loader from '@/components/common/Loader';
import axios from '@/lib/axios';

export default function HomePageContent() {
  const [trending, setTrending] = useState([]);
  const [newProjects, setNewProjects] = useState([]);
  const [miniProjects, setMiniProjects] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/filter_projects', {
          params: { per_page: 50 },
        });
        const projects = data.projects || [];

        const diff = (p) => (p.difficulty || p.difficulty_level || '').toLowerCase();

        setTrending(
          projects.filter((p) => diff(p) === 'advanced').slice(0, 8)
        );
        setNewProjects(
          [...projects].sort((a, b) => new Date(b.date_added || b.created_at) - new Date(a.date_added || a.created_at)).slice(0, 8)
        );
        setMiniProjects(
          projects.filter((p) => diff(p) === 'beginner' || diff(p) === 'easy').slice(0, 8)
        );
        setTopSelling(
          [...projects].sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0)).slice(0, 6)
        );
      } catch {
        // Silently handle — sections will just show empty
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <>
      <HeroSection />

      <AboutUsSection />

      <ProjectCarouselSection
        sectionId="trending-projects"
        title="Trending Projects"
        subtitle="These are projects that are currently getting the most views, downloads, and interest. Stay inspired by what's trending across the InnovateGuide community."
        projects={trending}
      />

      <ProjectCarouselSection
        sectionId="new-projects"
        title="Newly Added Projects"
        subtitle="Discover the latest IT projects uploaded by students and developers. Fresh ideas, new technologies, and innovative concepts."
        projects={newProjects}
        buttonClass="new-view-btn"
      />

      <ProjectCarouselSection
        sectionId="mini"
        title="Explore Mini Projects"
        subtitle="Discover affordable, beginner-friendly projects to kickstart your learning journey."
        projects={miniProjects}
        buttonClass="new-view-mini"
      />

      <CategorySection />

      <ProjectCarouselSection
        sectionId="top-selling"
        title="Top Selling Projects"
        subtitle="Discover the most purchased and highly rated projects that students love the most."
        projects={topSelling}
        badge="Top Selling"
        badgeClass="bg-gradient-to-r from-amber-500 to-orange-600 text-white"
        buttonClass="top-selling-btn"
      />

      <CustomProjectSection />
    </>
  );
}
