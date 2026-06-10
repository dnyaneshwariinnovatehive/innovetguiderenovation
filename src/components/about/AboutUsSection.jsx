'use client';

import { motion } from 'framer-motion';
import Container from '@/components/common/Container';

export default function AboutUsSection() {
  return (
    <section id="about-us" className="py-12 sm:py-20 scroll-mt-[100px]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-4xl mx-auto bg-white rounded-card shadow-card p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent relative after:content-[''] after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-primary after:to-accent after:rounded pb-2">
              About Us
            </h2>
            <p className="text-center text-text-secondary mb-8 max-w-[700px] mx-auto leading-relaxed">
              Empowering Innovation in Tech Education
            </p>
            <p className="mb-4 leading-relaxed text-text-primary">
              <strong className="text-primary">InnovateGuide</strong> is a premier platform dedicated to buying and selling innovative tech projects. Focused on fostering <em className="text-primary">innovation</em>, we cater to students, developers, and professionals seeking real-world projects across diverse domains.
            </p>
            <p className="leading-relaxed text-text-primary">
              Our marketplace encompasses cutting-edge areas including Web development, AI/ML, Software engineering, Cloud computing, and more. We provide a trusted environment where creativity thrives, enabling users to exchange knowledge, build portfolios, and drive technological advancement.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
