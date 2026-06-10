'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-primary via-[#1e6385] to-accent text-white shadow-[0_8px_25px_rgba(27,85,115,0.35)] hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_16px_40px_rgba(27,85,115,0.5)] active:scale-[0.97] active:shadow-[0_4px_12px_rgba(27,85,115,0.3)]',
  secondary: 'bg-white text-text-primary border-2 border-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 active:scale-[0.97]',
  cta: 'bg-gradient-to-r from-[#7b2cbf] via-[#9b30ff] to-[#e056fd] text-white shadow-[0_8px_25px_rgba(123,44,191,0.35)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(123,44,191,0.5)] hover:scale-[1.03] active:scale-[0.97]',
  danger: 'bg-gradient-to-r from-secondary to-[#ff6b5a] text-white shadow-[0_8px_25px_rgba(231,76,60,0.35)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(231,76,60,0.5)] hover:scale-[1.03] active:scale-[0.97]',
  outline: 'bg-transparent text-primary border-2 border-primary/40 hover:bg-primary/5 hover:border-primary hover:-translate-y-1 active:scale-[0.97]',
};

const sizes = {
  sm: 'px-5 py-2 text-xs gap-1.5',
  md: 'px-7 py-3 text-sm gap-2',
  lg: 'px-10 py-4 text-base gap-2.5',
};

export default function Button({ children, variant = 'primary', size = 'md', href, className = '', onClick, type = 'button', disabled = false }) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl no-underline transition-all duration-300 border-none cursor-pointer select-none relative overflow-hidden';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors duration-300" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classes}
    >
      {content}
    </motion.button>
  );
}