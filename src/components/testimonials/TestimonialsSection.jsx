'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

const testimonials = [
  { name: 'Rahul S.', role: 'CS Student', text: 'InnovateGuide helped me find the perfect project for my final year. The quality exceeded my expectations.' },
  { name: 'Priya M.', role: 'Developer', text: 'Selling my project on this platform was seamless. Great community and support team.' },
  { name: 'Amit K.', role: 'Engineering Student', text: 'The custom project service is amazing. They built exactly what I needed for my college submission.' },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 sm:py-20 scroll-mt-[100px]">
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
              className="bg-white rounded-card shadow-card p-8 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-bold text-text-primary text-sm">{t.name}</p>
                <p className="text-text-light text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
