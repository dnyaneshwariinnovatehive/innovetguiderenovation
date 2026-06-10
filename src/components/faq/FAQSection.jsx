'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
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
    <section id="faq" className="py-16 sm:py-24 scroll-mt-[100px] bg-gradient-to-br from-bg-light via-white to-[#f0f4f8] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

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
              className={`bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border transition-all duration-300 hover:shadow-md ${openIndex === i ? 'border-primary/20 shadow-md' : 'border-gray-100'}`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left bg-transparent border-none cursor-pointer transition-colors duration-300 rounded-2xl"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${openIndex === i ? 'text-primary' : 'text-gray-300'}`} />
                  <span className="font-semibold text-text-primary text-sm sm:text-base">{faq.q}</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-text-secondary shrink-0 transition-all duration-300 ${openIndex === i ? 'rotate-180 text-primary' : ''}`} />
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
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <div className="h-px bg-gradient-to-r from-primary/20 via-accent/20 to-transparent mb-4" />
                      <p className="text-text-secondary text-sm leading-relaxed pl-8">{faq.a}</p>
                    </div>
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