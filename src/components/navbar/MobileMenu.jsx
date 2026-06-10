'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';

export default function MobileMenu({ onClose, onNavClick }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-t border-gray-100"
      aria-label="Mobile navigation"
    >
      <ul className="flex flex-col list-none gap-1 p-5">
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
              className="block text-text-primary font-medium no-underline py-3 px-5 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-primary active:bg-primary/10"
            >
              {link.label}
            </a>
          </motion.li>
        ))}
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: NAV_LINKS.length * 0.05 }}
        >
          <Link
            href="/sell-your-project"
            onClick={onClose}
            className="block text-center mt-2 py-3 px-5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-accent no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
          >
            Sell Project
          </Link>
        </motion.li>
      </ul>
    </motion.nav>
  );
}