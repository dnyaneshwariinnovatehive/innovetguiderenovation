import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata = {
  title: 'Terms of Service - InnovateGuide',
  description: 'Terms of service for InnovateGuide.',
};

export default function TermsOfServicePage() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionTitle title="Terms of Service" subtitle="Please read these terms carefully." />
        <div className="max-w-4xl mx-auto text-text-secondary leading-relaxed space-y-6">
          <p>By using InnovateGuide, you agree to these terms. Please read them carefully.</p>
          <h3 className="text-lg font-bold text-text-primary">User Responsibilities</h3>
          <p>Users must provide accurate information when buying, selling, or contacting us. Sellers must submit original projects. Plagiarism or copyright infringement is strictly prohibited.</p>
          <h3 className="text-lg font-bold text-text-primary">Transactions</h3>
          <p>All transactions are facilitated through our platform. Payment terms are communicated during the purchase process. InnovateGuide acts as an intermediary and is not responsible for disputes between buyers and sellers beyond standard mediation.</p>
          <h3 className="text-lg font-bold text-text-primary">Intellectual Property</h3>
          <p>Sellers retain rights to their projects. Buyers receive a license to use the purchased project. Redistribution or resale of purchased projects is prohibited without explicit permission.</p>
          <h3 className="text-lg font-bold text-text-primary">Limitation of Liability</h3>
          <p>InnovateGuide is provided &ldquo;as is&rdquo; without any warranty. We are not liable for any damages arising from the use of our platform.</p>
        </div>
      </Container>
    </section>
  );
}
