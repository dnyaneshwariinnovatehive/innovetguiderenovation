'use client';

import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, BrainCircuit, Shield, Cloud } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

const services = [
  { icon: Code2, title: 'Web Development', desc: 'Responsive websites and web applications using modern frameworks.' },
  { icon: Smartphone, title: 'App Development', desc: 'Cross-platform mobile applications for Android and iOS.' },
  { icon: Globe, title: 'Web Applications', desc: 'Full-stack web apps with robust backend integration.' },
  { icon: BrainCircuit, title: 'AI & ML', desc: 'Intelligent solutions powered by machine learning.' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Secure code practices and vulnerability assessment.' },
  { icon: Cloud, title: 'Cloud Computing', desc: 'Scalable cloud-native applications and deployments.' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 sm:py-20 scroll-mt-[100px] bg-gradient-to-br from-bg-light to-[#f0f4f8]">
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
              className="bg-white rounded-card shadow-card p-8 text-center transition-all duration-500 group hover:-translate-y-2 hover:shadow-heavy"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:from-primary group-hover:to-accent">
                <service.icon className="w-8 h-8 text-primary transition-all duration-500 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
