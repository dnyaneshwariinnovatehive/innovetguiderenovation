'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

const testimonials = [
  {
    name: 'Rahul S.',
    role: 'CS Student',
    text: 'InnovateGuide helped me find the perfect project for my final year. The quality exceeded my expectations.',
    rating: 5,
    initials: 'RS',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    name: 'Priya M.',
    role: 'Developer',
    text: 'Selling my project on this platform was seamless. Great community and support team.',
    rating: 5,
    initials: 'PM',
    color: 'from-purple-500 to-pink-400',
  },
  {
    name: 'Amit K.',
    role: 'Engineering Student',
    text: 'The custom project service is amazing. They built exactly what I needed for my college submission.',
    rating: 4,
    initials: 'AK',
    color: 'from-emerald-500 to-teal-400',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 scroll-mt-[100px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/[0.02] via-transparent to-transparent pointer-events-none" />

      <Container>
        <SectionTitle title="What Our Users Say" subtitle="Hear from students and developers who use InnovateGuide." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
            >
              <Quote className="w-8 h-8 text-primary/[0.07] absolute top-4 right-4 group-hover:text-primary/[0.12] transition-colors duration-500" />
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-text-primary text-sm">{t.name}</p>
                  <p className="text-text-light text-xs">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}