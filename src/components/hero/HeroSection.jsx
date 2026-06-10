'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/common/Button';

const floatingShapes = [
  { className: 'top-[15%] left-[8%] w-16 h-16 border-2 border-white/10 rounded-full animate-[float_6s_ease-in-out_infinite]' },
  { className: 'top-[25%] right-[12%] w-10 h-10 border-2 border-white/10 rotate-45 animate-[float_8s_ease-in-out_infinite_1s]' },
  { className: 'bottom-[30%] left-[5%] w-20 h-20 border border-white/5 rounded-full animate-[float_7s_ease-in-out_infinite_0.5s]' },
  { className: 'bottom-[20%] right-[8%] w-12 h-12 bg-white/5 rounded-lg rotate-12 animate-[float_9s_ease-in-out_infinite_2s]' },
  { className: 'top-[40%] left-[15%] w-6 h-6 bg-white/5 rounded-full animate-[float_5s_ease-in-out_infinite_1.5s]' },
  { className: 'top-[60%] right-[18%] w-8 h-8 bg-white/5 rounded-full animate-[float_7s_ease-in-out_infinite_0.8s]' },
];

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
    <section className="bg-gradient-to-br from-[#0f2d3f] via-primary to-accent bg-[length:200%_200%] text-white min-h-screen flex items-center justify-center text-center relative overflow-hidden" style={{ animation: 'gradientShift 10s ease infinite' }}>
      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black/10 to-transparent" />

      {/* Floating decorative shapes */}
      {floatingShapes.map((shape, i) => (
        <div key={i} className={`absolute z-0 ${shape.className}`} />
      ))}

      {/* Large background circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs sm:text-sm font-medium mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Student Marketplace — Buy & Sell Projects
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-[1.1] text-balance" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
          <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Project Innovation</span>{' '}
          <span className="bg-gradient-to-r from-[#ffd700] to-[#ffaa00] bg-clip-text text-transparent">Partner</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-base sm:text-lg md:text-xl mb-10 sm:mb-12 opacity-90 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Buy, sell, and explore innovative IT projects made by students, for students.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-xl mx-auto mb-10 sm:mb-12 flex gap-3"
          role="search"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by technology, title, or keyword..."
              className="w-full h-[52px] pl-11 pr-4 rounded-xl text-sm text-white bg-white/10 backdrop-blur-md border border-white/10 shadow-lg outline-none transition-all duration-300 placeholder:text-white/40 focus:bg-white/15 focus:border-white/30 focus:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
              aria-label="Search projects"
            />
          </div>
          <button
            type="submit"
            className="h-[52px] w-[52px] rounded-xl text-sm font-semibold bg-gradient-to-r from-secondary to-[#ff6b5a] text-white border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(231,76,60,0.5)] active:scale-95 shadow-[0_8px_25px_rgba(231,76,60,0.4)] flex items-center justify-center shrink-0"
            aria-label="Submit search"
          >
            <Search className="w-4 h-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            href="/browse-all-projects"
            variant="secondary"
            className="!bg-white/10 !backdrop-blur-md !border-white/20 !text-white hover:!bg-white/20 hover:!border-white/40 !shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:!shadow-[0_16px_48px_rgba(255,255,255,0.2)]"
          >
            Browse All Projects <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            href="/sell-your-project"
            variant="secondary"
            className="!bg-white !text-gray-800 !border-transparent !shadow-[0_8px_32px_rgba(255,255,255,0.3)] hover:!shadow-[0_16px_48px_rgba(255,255,255,0.4)]"
          >
            Sell Your Project
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}