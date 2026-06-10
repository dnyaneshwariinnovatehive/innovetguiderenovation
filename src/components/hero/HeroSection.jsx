'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Button from '@/components/common/Button';

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/browse-all-projects?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary to-accent bg-[length:200%_200%] text-white min-h-screen flex items-center justify-center text-center relative overflow-hidden" style={{ animation: 'gradientShift 8s ease infinite' }}>
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 1000 1000" className="w-full h-full" aria-hidden="true">
          <polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 w-full"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          Project Innovation Partner
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg sm:text-xl mb-12 opacity-95 font-light max-w-2xl mx-auto"
        >
          Buy, sell, and explore innovative IT projects made by students, for students.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl mx-auto mb-12 flex gap-3"
          role="search"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by technology, title, or keyword..."
            className="flex-1 h-[42px] px-3.5 rounded-lg text-sm text-text-primary bg-white/95 backdrop-blur shadow-card outline-none transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_10px_40px_rgba(27,85,115,0.3)]"
            aria-label="Search projects"
          />
          <button
            type="submit"
            className="h-[42px] px-[18px] rounded-lg text-sm font-semibold bg-secondary text-white border-none cursor-pointer transition-all duration-300 hover:bg-secondary-dark hover:-translate-y-0.5 shadow-[0_8px_25px_rgba(231,76,60,0.4)]"
            aria-label="Submit search"
          >
            <Search className="w-4 h-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/browse-all-projects" variant="cta">
            Browse All Projects
          </Button>
          <Button href="/sell-your-project" variant="cta">
            Sell Your Project
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
