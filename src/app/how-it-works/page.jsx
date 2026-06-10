import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata = {
  title: 'How It Works - InnovateGuide',
  description: 'Learn how InnovateGuide works — buying, selling, and custom projects.',
};

const steps = [
  { num: '01', title: 'Browse Projects', desc: 'Explore our collection of projects across various categories and technologies.' },
  { num: '02', title: 'Choose Your Project', desc: 'Filter by category, difficulty, price, and technology to find the perfect match.' },
  { num: '03', title: 'Purchase', desc: 'Fill in your details and submit a purchase request. We\'ll contact you with payment info.' },
  { num: '04', title: 'Get Access', desc: 'Once payment is confirmed, you\'ll receive the complete project files and documentation.' },
  { num: '05', title: 'Sell Your Project', desc: 'Have a project you\'d like to share? Submit it for review and earn money.' },
  { num: '06', title: 'Custom Projects', desc: 'Need something specific? Request a custom project tailored to your requirements.' },
];

export default function HowItWorksPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionTitle title="How It Works" subtitle="Simple steps to get started with InnovateGuide." />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="bg-white rounded-card shadow-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                {step.num}
              </div>
              <h3 className="font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
