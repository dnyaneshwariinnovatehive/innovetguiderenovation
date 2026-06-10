# InnovateGuide Frontend - Project Structure

```
innovateguide-frontend/
│
├── public/
│   ├── images/                  # Static images (logo, icons, assets)
│   ├── icons/categories/        # Category icons
│   └── favicon.ico
│
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.jsx           # Root layout
│   │   ├── page.jsx             # Homepage
│   │   ├── loading.jsx          # Global loading state
│   │   ├── not-found.jsx        # 404 page
│   │   ├── browse-all-projects/
│   │   │   └── page.jsx
│   │   ├── project/
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   ├── sell-your-project/
│   │   │   └── page.jsx
│   │   ├── buy-now/
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   ├── about/
│   │   │   └── page.jsx
│   │   ├── contact/
│   │   │   └── page.jsx
│   │   ├── faq/
│   │   │   └── page.jsx
│   │   ├── how-it-works/
│   │   │   └── page.jsx
│   │   ├── privacy-policy/
│   │   │   └── page.jsx
│   │   └── terms-of-service/
│   │       └── page.jsx
│   │
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── MobileMenu.jsx
│   │   ├── hero/
│   │   │   └── HeroSection.jsx
│   │   ├── about/
│   │   │   └── AboutUsSection.jsx
│   │   ├── projects/
│   │   │   ├── TrendingProjectsSection.jsx
│   │   │   ├── ProjectCarousel.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── CustomNavigation.jsx
│   │   ├── services/
│   │   │   └── ServicesSection.jsx
│   │   ├── testimonials/
│   │   │   └── TestimonialsSection.jsx
│   │   ├── faq/
│   │   │   └── FAQSection.jsx
│   │   ├── footer/
│   │   │   └── Footer.jsx
│   │   ├── contact/
│   │   │   └── ContactSection.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── SectionTitle.jsx
│   │       ├── Container.jsx
│   │       └── Loader.jsx
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.js
│   │   └── useApi.js
│   │
│   ├── lib/
│   │   ├── axios.js
│   │   └── constants.js
│   │
│   ├── data/
│   │   ├── projects.js
│   │   └── services.js
│   │
│   └── styles/
│       └── globals.css
│
├── PROJECT_STRUCTURE.md
├── FRONTEND_MIGRATION_SPEC.md
├── COMPONENT_ARCHITECTURE.md
├── API_INTEGRATION_GUIDE.md
├── DEVELOPMENT_GUIDELINES.md
├── DEPENDENCIES.md
├── README.md
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
├── jsconfig.json
└── .env.local
```
