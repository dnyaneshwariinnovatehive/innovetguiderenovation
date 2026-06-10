import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata = {
  title: 'Privacy Policy - InnovateGuide',
  description: 'Privacy policy for InnovateGuide.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionTitle title="Privacy Policy" subtitle="How we handle your data." />
        <div className="max-w-4xl mx-auto text-text-secondary leading-relaxed space-y-6">
          <p>InnovateGuide respects your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
          <h3 className="text-lg font-bold text-text-primary">Information We Collect</h3>
          <p>We collect information you provide directly, such as your name, email address, phone number, and project details when you buy, sell, or request custom projects.</p>
          <h3 className="text-lg font-bold text-text-primary">How We Use Your Information</h3>
          <p>Your information is used to process transactions, communicate with you about your orders, improve our services, and send relevant updates with your consent.</p>
          <h3 className="text-lg font-bold text-text-primary">Data Protection</h3>
          <p>We implement appropriate security measures to protect your personal data. We do not share your information with third parties except as required to process transactions or comply with legal obligations.</p>
          <h3 className="text-lg font-bold text-text-primary">Contact</h3>
          <p>If you have questions about this policy, please contact us through our website.</p>
        </div>
      </Container>
    </section>
  );
}
