# Component Architecture

## Component Tree

```
RootLayout
 ├── Navbar
 │    └── MobileMenu (responsive overlay)
 ├── Page Content
 │    ├── HeroSection
 │    ├── AboutUsSection
 │    ├── TrendingProjectsSection (server-wrapped data fetcher)
 │    │    └── ProjectCarousel
 │    │         ├── ProjectCard (reusable)
 │    │         └── CustomNavigation (prev/next buttons)
 │    ├── ServicesSection
 │    ├── TestimonialsSection
 │    ├── FAQSection
 │    ├── ContactSection
 │    └── Footer
 └── WhatsAppButton (floating)
```

## Server vs Client Components

| Component | Type | Reason |
|---|---|---|
| `TrendingProjectsWrapper` | Server | Fetches data near source |
| `RootLayout` | Server | Metadata, fonts |
| `Navbar` | Client | Interactivity, scroll state |
| `HeroSection` | Client | Search form interactivity |
| `ProjectCard` | Client | Hover animations |
| `ProjectCarousel` | Client | Scroll/slide behavior |
| All section components | Client | Scroll animations (Framer Motion) |

## Data Flow

```
Server Component
  ├── fetches from Flask API (/api/filter_projects)
  ├── transforms/paginates data
  └── passes props to Client Component
       └── Client Component renders UI
            └── User interactions trigger local state OR
                 form submissions POST to Flask endpoints
```

## Reusable Components (src/components/common/)

| Component | Props | Purpose |
|---|---|---|
| `Button` | `variant`, `size`, `children`, `onClick` | Consistent buttons |
| `SectionTitle` | `title`, `subtitle` | Section headings |
| `Container` | `children`, `className` | Max-width wrapper |
| `Loader` | `size` | Loading spinner |

## Hooks

| Hook | Purpose |
|---|---|
| `useScrollAnimation` | IntersectionObserver for fade-in |
| `useApi` | Generic fetch wrapper with loading/error states |

## State Management

- **Zustand store** for shared state (cart, filters, etc.)
- **useState/useEffect** for component-local state
- **Context API** only if truly needed (avoid unless required)
