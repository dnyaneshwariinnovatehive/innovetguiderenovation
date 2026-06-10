'use client';

import { motion } from 'framer-motion';
import { Users, ShoppingBag, Award, Building2 } from 'lucide-react';
import Container from '@/components/common/Container';

const stats = [
  { icon: Users, value: '500+', label: 'Active Users' },
  { icon: ShoppingBag, value: '200+', label: 'Projects Listed' },
  { icon: Award, value: '50+', label: 'Domains Covered' },
  { icon: Building2, value: '100+', label: 'Colleges Reached' },
];

export default function AboutUsSection() {
  return (
    <section id="about-us" className="py-16 sm:py-24 scroll-mt-[100px] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/[0.03] to-transparent rounded-full blur-3xl" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-gray-100/80 p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-primary/[0.04] to-accent/[0.04] rounded-full" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent relative pb-3 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full">
                About Us
              </h2>
              <p className="text-center text-text-secondary mb-10 max-w-[700px] mx-auto leading-relaxed text-base">
                Empowering Innovation in Tech Education
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <p className="leading-relaxed text-text-primary">
                    <strong className="text-primary">InnovateGuide</strong> is a premier platform dedicated to buying and selling innovative tech projects. Focused on fostering <em className="text-primary font-medium">innovation</em>, we cater to students, developers, and professionals seeking real-world projects across diverse domains.
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-text-secondary text-sm">Trusted by students and developers across India</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-text-secondary text-sm">Wide range of domains from Web dev to AI/ML</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed text-text-primary">
                    Our marketplace encompasses cutting-edge areas including Web development, AI/ML, Software engineering, Cloud computing, and more. We provide a trusted environment where creativity thrives, enabling users to exchange knowledge, build portfolios, and drive technological advancement.
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-text-secondary text-sm">24/7 support and mentor-guided project execution</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-text-secondary text-sm">Secure and verified project listings</p>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-center p-4 sm:p-5 rounded-xl bg-gradient-to-br from-bg-light to-white border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.value}</p>
                    <p className="text-text-secondary text-[11px] sm:text-xs font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}