import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'NOVA AI IDE',
  description: 'AI-powered IDE UI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
