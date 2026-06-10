'use client';

import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-label="Chat on WhatsApp"
    >
      <img src="/images/wp_logo.png" alt="WhatsApp Chat" className="w-full h-full" />
    </a>
  );
}
