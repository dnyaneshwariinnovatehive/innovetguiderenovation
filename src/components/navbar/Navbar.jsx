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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-white/20'
        : 'bg-white/60 backdrop-blur-md'
    }`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3 hover:-translate-y-0.5 transition-transform duration-300 no-underline">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-md" />
            <img src="/images/IG_LOGO.png" alt="InnovateGuide" className="h-[42px] w-auto sm:h-[45px] relative" />
          </div>
          <span className="text-[1.4rem] sm:text-[1.6rem] font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-[slide-bg_4s_ease_infinite]">InnovateGuide</span>
        </Link>

        <nav className="hidden lg:flex" aria-label="Main navigation">
          <ul className="flex list-none gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-text-secondary font-medium no-underline relative px-4 py-2 text-[0.95rem] transition-all duration-300 hover:text-primary rounded-lg hover:bg-primary/5 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-accent after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/sell-your-project"
                className="ml-3 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-xl no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(27,85,115,0.4)] active:scale-[0.97]"
              >
                Sell Project
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-around w-[30px] h-[30px] bg-transparent border-none cursor-pointer p-0 z-[1001]"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <motion.span
            className="block w-full h-[3px] bg-gradient-to-r from-primary to-accent rounded origin-center"
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-full h-[3px] bg-gradient-to-r from-primary to-accent rounded"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-full h-[3px] bg-gradient-to-r from-primary to-accent rounded origin-center"
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