'use client';

import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, BrainCircuit, Shield, Cloud } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

const services = [
  { icon: Code2, title: 'Web Development', desc: 'Responsive websites and web applications using modern frameworks.', gradient: 'from-blue-500/10 to-cyan-500/10', iconGradient: 'from-blue-500 to-cyan-400' },
  { icon: Smartphone, title: 'App Development', desc: 'Cross-platform mobile applications for Android and iOS.', gradient: 'from-purple-500/10 to-pink-500/10', iconGradient: 'from-purple-500 to-pink-400' },
  { icon: Globe, title: 'Web Applications', desc: 'Full-stack web apps with robust backend integration.', gradient: 'from-emerald-500/10 to-teal-500/10', iconGradient: 'from-emerald-500 to-teal-400' },
  { icon: BrainCircuit, title: 'AI & ML', desc: 'Intelligent solutions powered by machine learning.', gradient: 'from-orange-500/10 to-red-500/10', iconGradient: 'from-orange-500 to-red-400' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Secure code practices and vulnerability assessment.', gradient: 'from-indigo-500/10 to-violet-500/10', iconGradient: 'from-indigo-500 to-violet-400' },
  { icon: Cloud, title: 'Cloud Computing', desc: 'Scalable cloud-native applications and deployments.', gradient: 'from-sky-500/10 to-blue-500/10', iconGradient: 'from-sky-500 to-blue-400' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 scroll-mt-[100px] bg-gradient-to-br from-bg-light via-white to-[#f0f4f8] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <Container>
        <SectionTitle title="Our Services" subtitle="Comprehensive tech solutions for students and professionals." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-transparent overflow-hidden"
            >
              {/* Gradient hover background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${service.iconGradient} bg-opacity-10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                  style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--tw-gradient-from) 15%, transparent), color-mix(in srgb, var(--tw-gradient-to) 15%, transparent))` }}
                >
                  <service.icon className="w-8 h-8 text-primary transition-all duration-500 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed group-hover:text-text-primary/80 transition-colors duration-300">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}