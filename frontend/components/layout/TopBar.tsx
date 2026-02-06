'use client';

import Link from 'next/link';
import { ChevronRight, Rocket } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function TopBar({
  productName = 'NOVA AI',
  ctaLabel = 'Launch App',
  className,
}: {
  productName?: string;
  ctaLabel?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/50 backdrop-blur-xl',
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
            <Rocket className="h-4 w-4 text-violet-300" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-slate-100">{productName}</span>
        </div>

        <nav className="ml-auto flex items-center gap-1 text-sm text-slate-300">
          <Link
            href="#features"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            Contact
          </Link>

          <div className="ml-2">
            <Button aria-label={ctaLabel} className="group">
              <span>{ctaLabel}</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
