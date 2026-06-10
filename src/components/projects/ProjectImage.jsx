'use client';

import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { API_BASE } from '@/lib/constants';

const GRADIENTS = [
  'bg-gradient-to-br from-[#1B5573] to-[#2a7fa3]',
  'bg-gradient-to-br from-[#0f2c3a] to-[#1B5573]',
  'bg-gradient-to-br from-[#2a7fa3] to-[#0f2c3a]',
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
      <div className={`w-full h-full ${GRADIENTS[(index % GRADIENTS.length + GRADIENTS.length) % GRADIENTS.length]} flex items-center justify-center`}>
        <div className="text-center">
          <ImageIcon className="w-10 h-10 mx-auto mb-2 text-white/30" />
          <p className="text-white/40 text-xs font-medium px-2 text-center leading-tight">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={title}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
