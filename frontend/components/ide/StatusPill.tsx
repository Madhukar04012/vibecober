'use client';

import { cn } from '@/lib/utils';

type StatusVariant = 'info' | 'success' | 'warning' | 'error';

const styles: Record<StatusVariant, string> = {
  info: 'border-violet-400/10 bg-violet-500/5 text-violet-200/90',
  success: 'border-emerald-400/10 bg-emerald-500/5 text-emerald-200/90',
  warning: 'border-amber-400/10 bg-amber-500/5 text-amber-200/90',
  error: 'border-rose-400/10 bg-rose-500/5 text-rose-200/90',
};

export function StatusPill({ label, variant = 'info', className }: { label: string; variant?: StatusVariant; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium tracking-wide',
        styles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
