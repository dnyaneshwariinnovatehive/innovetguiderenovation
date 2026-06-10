'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import { CATEGORIES } from '@/lib/constants';

const INITIAL_COUNT = 4;

export default function CategorySection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? CATEGORIES : CATEGORIES.slice(0, INITIAL_COUNT);

  return (
    <section id="categories" className="py-12 sm:py-20 scroll-mt-[100px] bg-bg-light">
      <Container>
        <SectionTitle
          title="Project Categories"
          subtitle="Browse projects by technology or domain — easily find projects that match your skill level, interest, or academic needs."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {visible.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                layout
                className="bg-white rounded-card shadow-card p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-500 group hover:-translate-y-2 hover:shadow-heavy"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 rounded-full bg-primary/5 flex items-center justify-center p-3 transition-all duration-500 group-hover:bg-primary/10 group-hover:scale-110">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-text-primary text-sm sm:text-base mb-1 sm:mb-2">{cat.name}</h3>
                <p className="text-text-secondary text-[10px] sm:text-xs mb-3 sm:mb-4">Explore {cat.name.toLowerCase()} projects</p>
                <Link
                  href={`/browse-all-projects?categories=${cat.slug}`}
                  className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-primary text-white text-[11px] sm:text-xs font-semibold no-underline transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
                >
                  Browse
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {CATEGORIES.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-primary text-primary font-semibold text-sm bg-transparent cursor-pointer transition-all hover:bg-primary hover:text-white"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>View All Categories <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
