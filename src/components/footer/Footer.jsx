import Link from 'next/link';
import { SOCIAL_LINKS } from '@/lib/constants';

const sections = [
  {
    title: 'Explore',
    links: [
      { href: '/#trending-projects', label: 'Trending Projects' },
      { href: '/#new-projects', label: 'New Projects' },
      { href: '/#categories', label: 'Categories' },
      { href: '/#top-selling', label: 'Top Selling' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/#custom-project', label: 'Custom Project' },
      { href: '/sell-your-project', label: 'Sell Your Project' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0f2d3f] via-[#143C50] to-primary text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="relative pt-16 pb-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12">
            <div className="flex-1 max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-md" />
                  <img src="/images/IG_LOGO.png" alt="InnovateGuide" className="h-[45px] brightness-100 relative" />
                </div>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">InnovateGuide</h3>
              <p className="text-white/60 text-sm leading-relaxed">Your trusted platform for buying, selling, and exploring innovative tech projects.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 flex-[2] lg:justify-end">
              {sections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full">{section.title}</h4>
                  <ul className="list-none space-y-3 mt-5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-white/50 no-underline text-[0.9rem] transition-all duration-300 hover:text-white hover:translate-x-1.5 inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full">Find Us On</h4>
                <div className="flex gap-3 mt-5">
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10 border border-white/10" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10 border border-white/10" aria-label="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10 border border-white/10" aria-label="WhatsApp">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.105 3.317 5.2 4.515 3.096 1.198 3.096.798 3.654.748.558-.05 1.8-.734 2.054-1.444.254-.71.254-1.32.177-1.447-.068-.126-.258-.202-.555-.35z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10 text-white/60 text-sm">
            <p>&copy; 2023 InnovateGuide. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}