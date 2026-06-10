'use client';

import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`text-center mb-10 ${className}`}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent relative inline-block pb-2 after:content-[''] after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-primary after:to-accent after:rounded">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary max-w-[700px] mx-auto leading-relaxed mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
