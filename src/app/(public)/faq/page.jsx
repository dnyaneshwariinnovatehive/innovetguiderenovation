import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import FAQSection from '@/components/faq/FAQSection';

export const metadata = {
  title: 'FAQ - InnovateGuide',
  description: 'Frequently asked questions about InnovateGuide.',
};

export default function FAQPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionTitle title="FAQ" subtitle="Find answers to common questions." />
        <FAQSection />
      </Container>
    </section>
  );
}
