import { FileText } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata = {
  title: 'Terms of Service - InnovateGuide',
  description: 'Terms of service for InnovateGuide.',
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <Container>
        <SectionTitle title="Terms of Service" subtitle="Please read these terms carefully." />
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 sm:p-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="text-text-secondary leading-relaxed space-y-6 text-sm sm:text-base">
            <p>By using InnovateGuide, you agree to these terms. Please read them carefully.</p>
            {[
              { title: 'User Responsibilities', text: 'Users must provide accurate information when buying, selling, or contacting us. Sellers must submit original projects. Plagiarism or copyright infringement is strictly prohibited.' },
              { title: 'Transactions', text: 'All transactions are facilitated through our platform. Payment terms are communicated during the purchase process. InnovateGuide acts as an intermediary and is not responsible for disputes between buyers and sellers beyond standard mediation.' },
              { title: 'Intellectual Property', text: 'Sellers retain rights to their projects. Buyers receive a license to use the purchased project. Redistribution or resale of purchased projects is prohibited without explicit permission.' },
              { title: 'Limitation of Liability', text: 'InnovateGuide is provided "as is" without any warranty. We are not liable for any damages arising from the use of our platform.' },
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