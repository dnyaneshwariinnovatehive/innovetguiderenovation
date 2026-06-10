'use client';

import { useState } from 'react';
import { ImageIcon, Code2 } from 'lucide-react';
import { API_BASE } from '@/lib/constants';

const GRADIENTS = [
  'bg-gradient-to-br from-[#1B5573] to-[#2a7fa3]',
  'bg-gradient-to-br from-[#0f2c3a] to-[#1B5573]',
  'bg-gradient-to-br from-[#2a7fa3] to-[#1a5f7a]',
  'bg-gradient-to-br from-[#1B5573] to-[#0f2c3a]',
];

export default function ProjectImage({ src, title, index = 0, className = '' }) {
  const [failed, setFailed] = useState(false);

  function resolve(url) {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  const resolved = resolve(src);

  if (!resolved || failed) {
    return (
      <div className={`w-full h-full ${GRADIENTS[(index % GRADIENTS.length + GRADIENTS.length) % GRADIENTS.length]} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div className="text-center relative">
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-white/10 flex items-center justify-center">
            <Code2 className="w-7 h-7 text-white/40" />
          </div>
          <p className="text-white/50 text-xs font-medium px-4 text-center leading-tight line-clamp-2">{title || 'Project Image'}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={title}
      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}