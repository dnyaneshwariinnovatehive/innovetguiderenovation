'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import { CATEGORIES } from '@/lib/constants';

const INITIAL_COUNT = 4;

const categoryGradients = {
  web_development: 'from-blue-500/10 to-cyan-500/10',
  app_development: 'from-purple-500/10 to-pink-500/10',
  web_application: 'from-emerald-500/10 to-teal-500/10',
  data_science: 'from-orange-500/10 to-amber-500/10',
  aiml: 'from-rose-500/10 to-red-500/10',
  blockchain: 'from-indigo-500/10 to-violet-500/10',
  cyber_security: 'from-slate-500/10 to-gray-500/10',
  cloud_computing: 'from-sky-500/10 to-blue-500/10',
};

export default function CategorySection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? CATEGORIES : CATEGORIES.slice(0, INITIAL_COUNT);

  return (
    <section id="categories" className="py-16 sm:py-24 scroll-mt-[100px] bg-gradient-to-br from-bg-light via-white to-[#f0f4f8] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

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
                className="relative group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-transparent overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[cat.slug] || 'from-primary/5 to-accent/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-3 transition-all duration-500 group-hover:scale-110 group-hover:from-primary/15 group-hover:to-accent/15 group-hover:shadow-lg">
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-bold text-text-primary text-sm sm:text-base mb-1.5 group-hover:text-primary transition-colors duration-300">{cat.name}</h3>
                  <p className="text-text-secondary text-[10px] sm:text-xs mb-3 sm:mb-4 leading-relaxed">Explore {cat.name.toLowerCase()} projects</p>
                  <Link
                    href={`/browse-all-projects?categories=${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white text-[11px] sm:text-xs font-semibold no-underline transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                  >
                    Browse <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {CATEGORIES.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-8 sm:mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-primary/30 text-primary font-semibold text-sm bg-transparent cursor-pointer transition-all hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95"
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