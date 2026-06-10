'use client';

import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
        Chat with us
        <div className="absolute top-full right-4 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
      </div>
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 animate-[pulse-soft_3s_ease-in-out_infinite] flex items-center justify-center p-3">
        <img src="/images/wp_logo.png" alt="WhatsApp Chat" className="w-full h-full rounded-full" />
      </div>
    </a>
  );
}