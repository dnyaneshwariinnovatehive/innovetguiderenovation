# Frontend Migration Specification

## Goal

Migrate the existing Jinja2/Flask frontend to a modern Next.js stack while preserving every existing feature, API, database, and user experience.

## Preserve

- Theme (colors, fonts, branding, logo)
- All existing features
- User experience and flow
- Backend APIs (unchanged)
- Brand identity

## Keep Unchanged

- Flask backend (`app.py`, `models.py`, `config.py`)
- Database schema and models
- AdminSide module
- API endpoints
- Authentication flow
- Business logic

## New Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Framework (App Router) |
| React 19 | UI library |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations |
| Swiper.js | Carousels and sliders |
| Lucide React | Icons |
| Axios | HTTP client |
| React Hook Form + Zod | Form handling + validation |
| Zustand | Lightweight state management |

## Responsive Design

Breakpoints:

| Device | Tailwind |
|---|---|
| Mobile | `sm:` (640px) |
| Tablet | `md:` (768px) |
| Desktop | `lg:` (1024px) |
| Large | `xl:` (1280px) |

No fixed widths. Use Tailwind responsive utilities throughout.

## Animation Guidelines

- Fade-in on scroll using Framer Motion `whileInView`
- Hover effects on cards and buttons
- Smooth section transitions
- Subtle and professional — no flashy animations

## Performance

- Lazy load components with `next/dynamic`
- Use `next/image` for optimized images
- Dynamic imports for heavy components
- Component splitting by route

## SEO

- Metadata API for each page
- Semantic HTML5 elements
- Proper heading hierarchy (h1 → h2 → h3)
- Open Graph tags on key pages

## Accessibility

- `aria-label` on interactive elements
- `alt` attributes on all images
- Keyboard-navigable menus
- Visible focus states
- Color contrast compliance
