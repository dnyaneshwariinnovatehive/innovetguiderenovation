'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import ProjectCard from '@/components/projects/ProjectCard';
import Loader from '@/components/common/Loader';
import { CATEGORIES } from '@/lib/constants';
import axios from '@/lib/axios';

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const SORT_OPTIONS = ['Newest First', 'Oldest First', 'Price Low to High', 'Price High to Low', 'Name A-Z', 'Name Z-A'];

export default function BrowseAllProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sort, setSort] = useState('Newest First');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const perPage = 12;

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setPage(1);
  };

  const toggleDifficulty = (d) => {
    setSelectedDifficulties((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
    setPage(1);
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: perPage,
        search: search || undefined,
        categories: selectedCategories.length ? selectedCategories.join(',') : undefined,
        difficulties: selectedDifficulties.length ? selectedDifficulties.join(',') : undefined,
        min_price: priceRange[0] || undefined,
        max_price: priceRange[1] < 100000 ? priceRange[1] : undefined,
        sort,
      };
      const { data } = await axios.get('/api/filter_projects', { params });
      setProjects(data.projects || []);
      setTotalCount(data.total_count || 0);
    } catch {
      setProjects([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedCategories, selectedDifficulties, priceRange, sort]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <section className="py-12 sm:py-20 bg-bg-white">
      <Container>
        <SectionTitle title="Browse All Projects" subtitle="Explore our complete collection of projects." />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="lg:hidden flex items-center gap-2 self-start bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold border-none cursor-pointer transition-all hover:bg-primary-dark mb-4"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`lg:w-72 shrink-0 bg-bg-light rounded-card p-6 space-y-6 lg:sticky lg:top-24 lg:self-start ${filterOpen ? 'block' : 'hidden'} lg:block`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-text-primary text-lg">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="lg:hidden bg-transparent border-none cursor-pointer text-text-secondary hover:text-text-primary" aria-label="Close filters">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Categories</h4>
              <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <label key={cat.name} className="flex items-center gap-2 cursor-pointer text-sm text-text-secondary hover:text-text-primary transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                          className="accent-primary"
                        />
                        {cat.name}
                      </label>
                    ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Difficulty</h4>
              <div className="space-y-2">
                {DIFFICULTIES.map((d) => (
                  <label key={d} className="flex items-center gap-2 cursor-pointer text-sm text-text-secondary hover:text-text-primary transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedDifficulties.includes(d)}
                      onChange={() => toggleDifficulty(d)}
                      className="accent-primary"
                    />
                    {d}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Price Range (₹)</h4>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-text-primary outline-none transition-colors focus:border-primary"
                />
                <span className="text-text-light">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === 100000 ? '' : priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 100000])}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-text-primary outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none transition-colors focus:border-primary"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* Project Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-secondary text-lg">No projects found matching your criteria.</p>
              </div>
            ) : (
              <>
                <p className="text-text-secondary text-sm mb-6">{totalCount} project{totalCount !== 1 ? 's' : ''} found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project, i) => (
                    <motion.div
                      key={project.id || i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-border bg-white text-sm font-medium text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-primary cursor-pointer"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                          p === page
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-text-primary border-border hover:border-primary'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-border bg-white text-sm font-medium text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-primary cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
