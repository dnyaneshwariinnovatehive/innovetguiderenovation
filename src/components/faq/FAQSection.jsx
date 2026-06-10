'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

const faqs = [
  { q: 'Is InnovateGuide only for students?', a: 'No. InnovateGuide is open to students, developers, and professionals.' },
  { q: 'Do you provide custom projects?', a: 'Yes, users can request custom projects based on their requirements.' },
  { q: 'Are projects original?', a: 'Yes. Sellers are required to upload original and genuine projects.' },
  { q: 'Is payment secure?', a: 'Yes. Payments are handled via secure third-party gateways.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-12 sm:py-20 scroll-mt-[100px] bg-bg-light">
      <Container>
        <SectionTitle title="Frequently Asked Questions" subtitle="Quick answers to common questions about InnovateGuide." />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-card shadow-card overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left bg-transparent border-none cursor-pointer transition-colors duration-300 hover:bg-bg-light"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-semibold text-text-primary text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-text-secondary shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-text-secondary text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
