'use client';

import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

export default function MobileMenu({ onClose, onNavClick }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="lg:hidden absolute top-full left-0 w-full bg-white shadow-card"
      aria-label="Mobile navigation"
    >
      <ul className="flex flex-col list-none gap-2 p-6 text-center">
        {NAV_LINKS.map((link, i) => (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <a
              href={link.href}
              onClick={(e) => {
                onNavClick(e, link.href);
                onClose();
              }}
              className="block text-text-primary font-medium no-underline py-3 px-4 rounded-lg transition-all duration-200 hover:bg-bg-light hover:text-primary"
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
