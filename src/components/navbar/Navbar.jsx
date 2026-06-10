'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (window.location.pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-card' : 'bg-white'
    }`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3 hover:-translate-y-0.5 transition-transform duration-300 no-underline">
          <img src="/images/IG_LOGO.png" alt="InnovateGuide" className="h-[45px] w-auto" />
          <span className="text-[1.6rem] font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">InnovateGuide</span>
        </Link>

        <nav className="hidden lg:flex" aria-label="Main navigation">
          <ul className="flex list-none gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-text-primary font-medium no-underline relative py-2.5 transition-all duration-300 hover:text-primary hover:-translate-y-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-around w-[30px] h-[30px] bg-transparent border-none cursor-pointer p-0 z-[1001]"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <motion.span
            className="block w-full h-[3px] bg-primary rounded origin-center"
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-full h-[3px] bg-primary rounded"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-full h-[3px] bg-primary rounded origin-center"
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu onClose={() => setIsOpen(false)} onNavClick={handleNavClick} />
        )}
      </AnimatePresence>
    </header>
  );
}
