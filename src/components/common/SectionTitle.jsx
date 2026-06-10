'use client';

import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`text-center mb-14 sm:mb-16 ${className}`}
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="hidden sm:block h-px w-12 bg-gradient-to-r from-transparent via-primary/40 to-primary/20" />
        <span className="hidden sm:block w-2 h-2 rounded-full bg-primary/30" />
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent relative inline-block pb-3 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full">
          {title}
        </h2>
        <span className="hidden sm:block w-2 h-2 rounded-full bg-primary/30" />
        <span className="hidden sm:block h-px w-12 bg-gradient-to-r from-primary/20 via-primary/40 to-transparent" />
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary max-w-[700px] mx-auto leading-relaxed text-sm sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}