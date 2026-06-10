import { Shield } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata = {
  title: 'Privacy Policy - InnovateGuide',
  description: 'Privacy policy for InnovateGuide.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <Container>
        <SectionTitle title="Privacy Policy" subtitle="How we handle your data." />
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 sm:p-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="text-text-secondary leading-relaxed space-y-6 text-sm sm:text-base">
            <p>InnovateGuide respects your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
            {[
              { title: 'Information We Collect', text: 'We collect information you provide directly, such as your name, email address, phone number, and project details when you buy, sell, or request custom projects.' },
              { title: 'How We Use Your Information', text: 'Your information is used to process transactions, communicate with you about your orders, improve our services, and send relevant updates with your consent.' },
              { title: 'Data Protection', text: 'We implement appropriate security measures to protect your personal data. We do not share your information with third parties except as required to process transactions or comply with legal obligations.' },
              { title: 'Contact', text: 'If you have questions about this policy, please contact us through our website.' },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-base sm:text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
                  {section.title}
                </h3>
                <p>{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}