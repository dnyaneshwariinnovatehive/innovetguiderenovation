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

const filterSectionClass = 'text-xs font-bold text-text-primary uppercase tracking-wider mb-3';
const filterLabelClass = 'flex items-center gap-2.5 cursor-pointer text-sm text-text-secondary hover:text-text-primary transition-colors px-1 py-0.5 rounded-lg hover:bg-primary/[0.03]';
const filterInputClass = 'w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-text-primary outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/5';

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
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <Container>
        <SectionTitle title="Browse All Projects" subtitle="Explore our complete collection of projects." />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="lg:hidden inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {filterOpen ? <X className="w-4 h-4" /> : null}
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`lg:w-72 shrink-0 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-5 sm:p-6 space-y-6 lg:sticky lg:top-24 lg:self-start h-fit ${filterOpen ? 'block' : 'hidden'} lg:block`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-text-primary text-base">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="lg:hidden bg-transparent border-none cursor-pointer text-text-secondary hover:text-text-primary p-1 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close filters">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div>
              <label className={filterSectionClass}>Search</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className={`${filterInputClass} pl-10`}
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className={filterSectionClass}>Categories</h4>
              <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <label key={cat.name} className={filterLabelClass}>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                          className="accent-primary w-4 h-4 rounded border-border"
                        />
                        <span className="flex-1">{cat.name}</span>
                      </label>
                    ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h4 className={filterSectionClass}>Difficulty</h4>
              <div className="space-y-1">
                {DIFFICULTIES.map((d) => (
                  <label key={d} className={filterLabelClass}>
                    <input
                      type="checkbox"
                      checked={selectedDifficulties.includes(d)}
                      onChange={() => toggleDifficulty(d)}
                      className="accent-primary w-4 h-4 rounded border-border"
                    />
                    <span className="flex-1">{d}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className={filterSectionClass}>Price Range (₹)</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className={`${filterInputClass} w-full`}
                />
                <span className="text-text-light shrink-0">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === 100000 ? '' : priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 100000])}
                  className={`${filterInputClass} w-full`}
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className={filterSectionClass}>Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={filterInputClass}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* Project Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <p className="text-text-secondary text-base font-medium">No projects found matching your criteria.</p>
                <p className="text-text-light text-sm mt-1">Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-text-secondary text-sm"><span className="font-semibold text-text-primary">{totalCount}</span> project{totalCount !== 1 ? 's' : ''} found</p>
                </div>
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
                      className="px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-primary hover:text-primary cursor-pointer active:scale-95"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium border transition-all cursor-pointer active:scale-95 ${
                          p === page
                            ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-md'
                            : 'bg-white text-text-primary border-border hover:border-primary hover:text-primary'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-primary hover:text-primary cursor-pointer active:scale-95"
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