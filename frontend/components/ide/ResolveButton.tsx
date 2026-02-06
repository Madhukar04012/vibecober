'use client';

import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ResolveButton({
  label = 'Resolve',
  onClick,
  ariaLabel,
}: {
  label?: string;
  ariaLabel?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="primary"
      size="sm"
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      className="h-8 px-3"
    >
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
