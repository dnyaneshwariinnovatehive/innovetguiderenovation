'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Clock } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import { CONTACT_INFO } from '@/lib/constants';

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-20 scroll-mt-[100px]">
      <Container>
        <SectionTitle title="Contact Us" subtitle="Have questions or need support? We&apos;re here to help." />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto bg-white rounded-card shadow-card p-8 space-y-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-light">Email</p>
              <p className="text-text-primary font-medium">{CONTACT_INFO.supportEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-light">Phone</p>
              <p className="text-text-primary font-medium">{CONTACT_INFO.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-light">Support Hours</p>
              <p className="text-text-primary font-medium">Monday – Saturday (10 AM – 7 PM)</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
