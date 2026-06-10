import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import ContactSection from '@/components/contact/ContactSection';

export const metadata = {
  title: 'Contact Us - InnovateGuide',
  description: 'Get in touch with InnovateGuide for support and inquiries.',
};

export default function ContactPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionTitle title="Contact Us" subtitle="We&apos;d love to hear from you." />
        <ContactSection />
      </Container>
    </section>
  );
}
