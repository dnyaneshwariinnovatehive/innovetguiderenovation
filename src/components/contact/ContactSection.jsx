'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import { CONTACT_INFO } from '@/lib/constants';

const contactItems = [
  { icon: Mail, label: 'Email', value: CONTACT_INFO.supportEmail, gradient: 'from-blue-500/10 to-cyan-500/10', iconBg: 'from-blue-500 to-cyan-400' },
  { icon: Phone, label: 'Phone', value: CONTACT_INFO.phone, gradient: 'from-purple-500/10 to-pink-500/10', iconBg: 'from-purple-500 to-pink-400' },
  { icon: Clock, label: 'Support Hours', value: 'Monday – Saturday (10 AM – 7 PM)', gradient: 'from-amber-500/10 to-orange-500/10', iconBg: 'from-amber-500 to-orange-400' },
  { icon: MapPin, label: 'Location', value: 'India', gradient: 'from-emerald-500/10 to-teal-500/10', iconBg: 'from-emerald-500 to-teal-400' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 scroll-mt-[100px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

      <Container>
        <SectionTitle title="Contact Us" subtitle="Have questions or need support? We&apos;re here to help." />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-transparent overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.iconBg} bg-opacity-10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                    style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--tw-gradient-from) 15%, transparent), color-mix(in srgb, var(--tw-gradient-to) 15%, transparent))` }}
                  >
                    <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-light font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-text-primary font-medium text-sm truncate">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}