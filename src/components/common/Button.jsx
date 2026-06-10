'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-primary to-accent text-white shadow-[0_10px_30px_rgba(27,85,115,0.4)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_40px_rgba(27,85,115,0.6)]',
  secondary: 'bg-white text-text-primary border-2 border-border hover:-translate-y-1 hover:shadow-lg',
  cta: 'bg-gradient-to-r from-[#7b2cbf] to-[#e056fd] text-white shadow-[0_6px_18px_rgba(27,85,115,0.25)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(27,85,115,0.32)]',
  danger: 'bg-secondary text-white hover:bg-secondary-dark',
};

const sizes = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
};

export default function Button({ children, variant = 'primary', size = 'md', href, className = '', onClick, type = 'button', disabled = false }) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl no-underline transition-all duration-300 border-none cursor-pointer';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
