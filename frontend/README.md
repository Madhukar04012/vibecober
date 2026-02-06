# VibeCober Frontend

Modern, production-ready frontend built with Next.js 14, Tailwind CSS, and shadcn/ui components.

## Features

✅ Next.js 14 App Router  
✅ TypeScript for type safety  
✅ Tailwind CSS for styling  
✅ 3D Animated Background (Three.js)  
✅ Theme support (light/dark)  
✅ Fully responsive design  
✅ Production-ready  

## Getting Started

### Install Dependencies

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── components/
│   ├── theme-provider.tsx      # Theme provider wrapper
│   ├── ui/
│   │   └── dotted-surface.tsx  # 3D animated background
│   ├── Header.tsx              # Navigation
│   ├── Hero.tsx                # Hero section with animation
│   ├── HowItWorks.tsx          # Features section
│   ├── WhyDevelopers.tsx       # Benefits section
│   ├── Pricing.tsx             # Pricing tiers
│   ├── Trusted.tsx             # Testimonials
│   ├── FAQ.tsx                 # FAQ section
│   ├── CTA.tsx                 # Call to action
│   └── Footer.tsx              # Footer
├── lib/
│   └── utils.ts                # Utility functions (cn helper)
├── public/                     # Static assets
└── package.json
```

## Connect to Backend

Update the Hero component to connect to your backend API:

```typescript
// components/Hero.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('http://localhost:8000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  // Handle response
};
```

## Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build command: `npm run build`  
Start command: `npm start`  
Output directory: `.next`

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js
- **Theme**: next-themes
- **Utilities**: clsx, tailwind-merge

---

Built for VibeCober 🚀
