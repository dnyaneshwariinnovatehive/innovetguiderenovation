import { Building2 } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata = {
  title: 'About Us - InnovateGuide',
  description: 'Learn about InnovateGuide, your project innovation partner.',
};

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <Container>
        <SectionTitle title="About InnovateGuide" subtitle="Your trusted platform for project innovation and collaboration." />

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 sm:p-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="text-text-secondary leading-relaxed space-y-6 text-sm sm:text-base">
            <p>
              InnovateGuide is a platform dedicated to helping students and developers find, buy, and sell innovative tech projects.
              We bridge the gap between project creators and those looking for quality academic or professional projects.
            </p>
            <p>
              Our mission is to foster innovation and collaboration within the tech community by providing a
              marketplace where high-quality projects are easily accessible. Whether you are a student looking
              for a final year project or a developer wanting to showcase your work, InnovateGuide is the place for you.
            </p>
            <p>
              We carefully review all projects submitted to our platform to ensure quality and originality.
              Our team is committed to providing excellent support and ensuring a safe, secure environment
              for all transactions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}