# Development Guidelines

## Code Quality

- Clean, readable code with meaningful names
- No commented-out code
- No `console.log` in production
- Consistent formatting (Prettier)

## Component Conventions

- One component per file
- File name matches component name (PascalCase)
- Use `.jsx` extension for components
- Default export for main component

## Styling Conventions

- Use Tailwind utility classes exclusively
- No CSS modules or styled-components
- Use `cn()` utility for conditional classes
- Keep `@theme` overrides in `globals.css`

## Folder Naming

- `src/components/` — dash-case folders for each component group
- `src/app/` — Next.js App Router conventions
- `src/hooks/` — camelCase files prefixed with `use`
- `src/lib/` — camelCase files
- `src/data/` — camelCase files

## Import Conventions

```jsx
// 1. React / Next
import { useState } from 'react';
import Link from 'next/link';

// 2. Third-party
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

// 3. Internal
import Button from '@/components/common/Button';
import { API_BASE } from '@/lib/constants';
import useApi from '@/hooks/useApi';

// 4. Styles
import '@/styles/globals.css';
```

## Responsive Design

- Mobile-first approach
- Use Tailwind breakpoints: `sm`, `md`, `lg`, `xl`
- Avoid fixed widths; use `max-w-*` instead

## Accessibility Checklist

- [ ] All images have `alt` text
- [ ] Interactive elements have `aria-label`
- [ ] Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- [ ] Proper heading hierarchy
- [ ] Visible focus indicators
- [ ] Keyboard navigable
