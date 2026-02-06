'use client';

import { Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ResolveButton({
  label = 'Resolve',
  isLoading,
  onClick,
  ariaLabel,
}: {
  label?: string;
  ariaLabel?: string;
  isLoading?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="primary"
      size="sm"
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      disabled={isLoading}
      className="h-8 px-3"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden={true} /> : <Sparkles className="h-4 w-4" aria-hidden={true} />}
      {isLoading ? 'Resolving…' : label}
    </Button>
  );
}
