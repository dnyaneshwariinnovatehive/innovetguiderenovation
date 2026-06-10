# InnovateGuide Frontend

Modern Next.js frontend for the InnovateGuide platform.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion**
- **Swiper.js**
- **Lucide React**
- **Axios**
- **React Hook Form + Zod**
- **Zustand**

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Environment

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## Backend

The Flask backend must be running on the port specified in `NEXT_PUBLIC_API_URL`.

## Project Structure

See `PROJECT_STRUCTURE.md` for full layout.

Key directories:

| Directory | Contents |
|---|---|
| `src/app/` | App Router pages |
| `src/components/` | Reusable UI components |
| `src/hooks/` | Custom React hooks |
| `src/lib/` | Utilities and configuration |
| `src/data/` | Static data and constants |
| `public/` | Static assets |
