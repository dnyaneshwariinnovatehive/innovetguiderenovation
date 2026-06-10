import { Search, ShoppingCart, Download, DollarSign, FileCode, Settings } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';

const steps = [
  { icon: Search, title: 'Browse Projects', desc: 'Explore our collection of projects across various categories and technologies.', gradient: 'from-blue-500 to-cyan-400' },
  { icon: FileCode, title: 'Choose Your Project', desc: 'Filter by category, difficulty, price, and technology to find the perfect match.', gradient: 'from-purple-500 to-pink-400' },
  { icon: ShoppingCart, title: 'Purchase', desc: 'Fill in your details and submit a purchase request. We\'ll contact you with payment info.', gradient: 'from-emerald-500 to-teal-400' },
  { icon: Download, title: 'Get Access', desc: 'Once payment is confirmed, you\'ll receive the complete project files and documentation.', gradient: 'from-orange-500 to-amber-400' },
  { icon: DollarSign, title: 'Sell Your Project', desc: 'Have a project you\'d like to share? Submit it for review and earn money.', gradient: 'from-rose-500 to-red-400' },
  { icon: Settings, title: 'Custom Projects', desc: 'Need something specific? Request a custom project tailored to your requirements.', gradient: 'from-indigo-500 to-violet-400' },
];

export default function HowItWorksPage() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <Container>
        <SectionTitle title="How It Works" subtitle="Simple steps to get started with InnovateGuide." />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="group relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="relative">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-500`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="w-8 h-8 absolute -top-2 -right-2 rounded-full bg-primary/5 flex items-center justify-center text-xs font-bold text-primary/60 border border-primary/10">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}