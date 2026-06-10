import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata = {
  title: 'About Us - InnovateGuide',
  description: 'Learn about InnovateGuide, your project innovation partner.',
};

export default function AboutPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionTitle title="About InnovateGuide" subtitle="Your trusted platform for project innovation and collaboration." />

        <div className="max-w-4xl mx-auto space-y-8 text-text-secondary leading-relaxed">
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
      </Container>
    </section>
  );
}
